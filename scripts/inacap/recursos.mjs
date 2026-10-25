// Extrae los "Recurso digital" de un ramo (cursos Articulate Rise en virtual.inacap.cl, con
// infografías Genially embebidas) a Markdown fuente, y los cruza con las lecturas de
// src/data/inacap/<ramo>.js (pestaña Lecturas). Los .md son material de trabajo para redactar
// las lecturas del sitio; quedan en salida/recursos/<RAMO>/ (no se versionan).
//   node scripts/inacap/recursos.mjs AVFI01                 (todos los recursos digitales)
//   node scripts/inacap/recursos.mjs AVFI01 --pendientes    (solo los de lecturas con href vacío)
//   node scripts/inacap/recursos.mjs AVFI01 "punto de equilibrio"   (filtro por título)
import { mkdirSync, writeFileSync } from 'node:fs';
import { OUT_DIR, conSesion } from './sesion.mjs';
import { MOODLE, entrarMoodle, listarCursos, leerCurso } from './moodle.mjs';

const [codigoArg, ...resto] = process.argv.slice(2);
if (!codigoArg) {
  console.error('Uso: node scripts/inacap/recursos.mjs <RAMO> [--pendientes] ["filtro de título"]');
  process.exit(1);
}
const codigo = codigoArg.toUpperCase();
const pendientes = resto.includes('--pendientes');
const filtro = resto.find((a) => !a.startsWith('--'));

const normalizar = (s = '') =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/^recurso digital:\s*/, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const slug = (s) => normalizar(s).replace(/ /g, '-').slice(0, 60);

// --- HTML de Rise/Genially → Markdown -----------------------------------------------------------

const ENTIDADES = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'" };
const entidades = (s) =>
  s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
    return ENTIDADES[e] ?? m;
  });

function md(html = '') {
  return entidades(
    html
      .replace(/&nbsp;/g, ' ')
      // Tablas: una fila por línea, celdas separadas por | (los <p> de cada celda quedan en línea)
      .replace(/<t([dh])[^>]*>([\s\S]*?)<\/t\1>/gi, (_, __, celda) => ` ${celda.replace(/<\/?(p|div|br)[^>]*>/gi, ' ')} |`)
      .replace(/<tr[^>]*>/gi, '\n|')
      .replace(/<br[^>]*>/gi, '\n')
      .replace(/<li[^>]*>/gi, '\n- ')
      .replace(/<\/(p|div|h\d|li|ul|ol)>/gi, '\n')
      .replace(/<(strong|b)(\s[^>]*)?>\s*/gi, '**')
      .replace(/\s*<\/(strong|b)>/gi, '**')
      .replace(/<(em|i)(\s[^>]*)?>\s*/gi, '*')
      .replace(/\s*<\/(em|i)>/gi, '*')
      .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\*{4,}/g, '**')
    .replace(/\*\*\s*\*\*/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// --- Genially -----------------------------------------------------------------------------------

const px = (v) => parseFloat(v) || 0;

/** Textos de un Genially agrupados por diapositiva, en orden de diapositiva y de lectura. */
async function genially(request, id) {
  const r = await request.get(`https://view.genially.com/api/view/${id}`);
  if (!r.ok()) return `> [Genially ${id}: HTTP ${r.status()}]`;
  const d = await r.json();
  const slides = (d.Slides ?? []).filter((s) => !s.Hidden).sort((a, b) => a.Order - b.Order);
  const out = [];
  for (const s of slides) {
    const textos = (d.Texts ?? [])
      .filter((t) => t.IdSlide === s.Id && !t.IsHidden)
      .sort(
        (a, b) =>
          (a.ReadingOrder ?? 1e9) - (b.ReadingOrder ?? 1e9) ||
          px(a.Position?.PositionTop) - px(b.Position?.PositionTop) ||
          px(a.Position?.PositionLeft) - px(b.Position?.PositionLeft),
      )
      .map((t) => md(t.TextMessage))
      .filter(Boolean);
    if (textos.length) out.push(`#### ${s.Popup ? 'Ventana' : 'Diapositiva'} ${s.Name || s.Order}\n\n${textos.join('\n\n')}`);
  }
  return out.join('\n\n');
}

const GENIALLY = /view\.genially\.com\/([0-9a-f]{24})/g;

// --- Rise ---------------------------------------------------------------------------------------

/** Curso Rise (runtime-data.js, JSON en base64) → Markdown. */
async function rise(request, contentUrl) {
  // El index fija la sesión del repositorio (?sci=…); runtime-data.js trae el curso completo
  await request.get(contentUrl);
  const runtime = await (await request.get(new URL('runtime-data.js', contentUrl).href)).text();
  const b64 = runtime.match(/__jsonp\("runtime-data\.js","([^"]+)"/)?.[1];
  if (!b64) throw new Error(`runtime-data.js sin datos en ${contentUrl}`);
  const { course } = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));

  const partes = [`# ${course.title}`, md(course.description)];
  const vistos = new Set(); // un Genially embebido más de una vez se extrae una sola vez
  for (const lesson of course.lessons ?? []) {
    if (/^índice de contenido$/i.test(lesson.title.trim())) continue;
    partes.push(`## ${lesson.title.trim()}`);
    for (const block of lesson.items ?? []) {
      const items = block.items ?? [];
      const variant = block.variant ?? block.family;
      if (block.type === 'divider') continue;
      if (block.type === 'text' || block.type === 'quote' || block.type === 'image') {
        for (const it of items) {
          const titulo = md(it.heading ?? it.title ?? '');
          const cuerpo = md(it.paragraph ?? it.description ?? it.caption ?? '');
          const texto = [titulo && (/^\*\*[\s\S]*\*\*$/.test(titulo) ? titulo : `**${titulo}**`), cuerpo].filter(Boolean).join('\n\n');
          if (!texto) continue;
          if (block.type === 'quote') partes.push(texto.replace(/^/gm, '> '));
          else if (variant === 'note' || block.family === 'impact') partes.push(`> **Nota:** ${texto}`);
          else partes.push(texto);
        }
      } else if (block.type === 'list') {
        const marca = variant === 'numbered' ? (i) => `${i + 1}.` : () => '-';
        partes.push(items.map((it, i) => `${marca(i)} ${md(it.paragraph ?? it.description ?? '').replace(/\n+/g, ' ')}`).join('\n'));
      } else if (block.type === 'interactive') {
        // Flashcards, acordeones, pestañas, procesos, botones: título + contenido de cada ítem
        for (const it of items) {
          const frente = md(it.front?.description ?? it.title ?? it.label ?? it.heading ?? '');
          const reverso = md(it.back?.description ?? it.description ?? it.paragraph ?? '');
          const destino = it.destination ?? it.url ?? '';
          partes.push(`- **${frente.replace(/\n+/g, ' ')}**${reverso ? `: ${reverso.replace(/\n+/g, ' ')}` : ''}${/^https?:/.test(destino) ? ` (${destino})` : ''}`);
        }
      } else if (block.type === 'multimedia' || block.type === 'html') {
        for (const it of items) {
          if (variant === 'attachment') partes.push(`- Adjunto: ${it.media?.attachment?.originalUrl ?? it.media?.attachment?.key ?? md(it.description ?? '')}`);
          else if (variant === 'audio' || variant === 'video') {
            const titulo = md(it.caption ?? it.title ?? it.description ?? '');
            if (titulo) partes.push(`> [${variant}] ${titulo}`);
          }
          const html = it.srcdoc ?? it.media?.embed?.html ?? JSON.stringify(it.media?.embed ?? '');
          for (const [, id] of String(html).matchAll(GENIALLY)) {
            if (vistos.has(id)) continue;
            vistos.add(id);
            const titulo = String(html).match(/title="([^"]+)"/)?.[1] ?? id;
            partes.push(`### [Genially: ${titulo}]\n\n${await genially(request, id)}`);
          }
        }
      }
    }
  }
  return { titulo: course.title, markdown: partes.filter(Boolean).join('\n\n') + '\n' };
}

// --- Principal ----------------------------------------------------------------------------------

const lecturas = await import(`../../src/data/inacap/${codigo.toLowerCase()}.js`)
  .then((m) => m.default?.lectureData ?? [])
  .catch(() => []);

await conSesion(async ({ page, context }) => {
  await entrarMoodle(page);
  const curso = (await listarCursos(page)).find((c) => c.codigo === codigo);
  if (!curso) throw new Error(`No encontré ${codigo} entre los cursos de Moodle.`);
  const { secciones } = await leerCurso(page, curso);

  let recursos = secciones.flatMap((s) =>
    s.recursos.filter((r) => r.tipo === 'url' && /^recurso digital/i.test(r.nombre)).map((r) => ({ ...r, seccion: s.nombre })),
  );

  // Cruce con la pestaña Lecturas: cada lectura toma el primer recurso libre con el mismo título
  // (hay títulos repetidos en distintas semanas)
  const libres = [...recursos];
  for (const l of lecturas) {
    const i = libres.findIndex((r) => normalizar(r.nombre) === normalizar(l.description?.text));
    if (i >= 0) libres.splice(i, 1)[0].lectura = l;
  }
  if (pendientes) recursos = recursos.filter((r) => r.lectura && !r.lectura.description?.href);
  if (filtro) recursos = recursos.filter((r) => normalizar(r.nombre).includes(normalizar(filtro)));

  const dir = `${OUT_DIR}recursos/${codigo}/`;
  mkdirSync(dir, { recursive: true });
  const resumen = [];
  for (const r of recursos) {
    await page.goto(r.url, { waitUntil: 'networkidle' });
    const destino = page.url().startsWith(MOODLE)
      ? await page.$eval('.urlworkaround a, #region-main a[href*="virtual.inacap.cl"]', (a) => a.href).catch(() => null)
      : page.url();
    if (!destino) {
      console.warn(`⚠ ${r.nombre}: no encontré el enlace al contenido`);
      continue;
    }
    const { markdown } = await rise(context.request, destino);
    const l = r.lectura;
    const nombre = `${l ? `semana${l.week}-lectura${l.lecture}-` : ''}${slug(r.nombre)}.md`;
    const cabecera = [
      `<!-- Fuente: ${destino.split('?')[0]}`,
      `     Moodle: ${r.url} (${r.seccion})`,
      l ? `     Lectura: semana ${l.week}, lectura ${l.lecture}, ${l.date}, href actual "${l.description?.href ?? ''}"` : '     Lectura: sin entrada en lectureData',
      '-->',
    ].join('\n');
    writeFileSync(dir + nombre, `${cabecera}\n\n${markdown}`);
    resumen.push(`  ${l ? `S${l.week} L${l.lecture}` : 'sin lectura'}  ${r.nombre.replace(/^Recurso digital:\s*/i, '')} → ${nombre}`);
  }

  console.log(`${codigo} — ${recursos.length} recurso(s) digital(es) en ${dir}`);
  console.log(resumen.join('\n'));
  const sinRecurso = lecturas.filter((l) => !recursos.some((r) => r.lectura === l) && !pendientes && !filtro);
  if (sinRecurso.length)
    console.log(`  Lecturas sin recurso digital: ${sinRecurso.map((l) => `L${l.lecture} "${l.description?.text}"`).join(', ')}`);
});
