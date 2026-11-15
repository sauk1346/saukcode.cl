#!/usr/bin/env node
// Convierte un cuaderno Jupyter (.ipynb) en un borrador MDX para una clase.
//
//   node scripts/ipynb-to-mdx.mjs <cuaderno.ipynb> [--out borrador.mdx]
//        [--img-dir public/inacap/<ramo>/img/<clase>] [--img-url /inacap/<ramo>/img/<clase>] [--plain]
//
// - Celdas de texto: se copian tal cual.
// - Celdas de código: bloque con el lenguaje del cuaderno (r, python…).
//   Las celdas sin salida se unen con la celda de código siguiente.
// - Salidas de texto y errores: bloque `terminal` (la salida de terminal del sitio).
// - Tablas HTML (data frames): tabla Markdown; con --plain, el texto de consola.
// - Gráficos: se guardan en --img-dir y se enlazan con --img-url (sin esas
//   opciones se deja un comentario indicando que la celda tenía un gráfico).
//
// El resultado es un borrador: hay que ordenarlo en secciones y pasarlo en
// limpio antes de publicarlo.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, join } from 'node:path';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
if (!file) {
  console.error('Uso: node scripts/ipynb-to-mdx.mjs <cuaderno.ipynb> [--out f.mdx] [--img-dir d] [--img-url u]');
  process.exit(1);
}

const nb = JSON.parse(readFileSync(file, 'utf8'));
const lang = (nb.metadata?.language_info?.name || nb.metadata?.kernelspec?.language || nb.metadata?.kernelspec?.name || 'text')
  .toLowerCase()
  .replace(/^ir$/, 'r');
const imgDir = opt('img-dir');
const imgUrl = opt('img-url');
// --plain: matrices y data frames como los imprime la consola de R, en vez de tabla Markdown
const plainTables = args.includes('--plain');
const slug = basename(file, '.ipynb').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const text = (v) => (Array.isArray(v) ? v.join('') : v || '');
// La cerca debe ser más larga que cualquier racha de acentos graves del contenido
const fence = (body) => '`'.repeat(Math.max(3, ...(body.match(/`+/g) || []).map((m) => m.length + 1)));
const block = (tag, body) => {
  const f = fence(body);
  return `${f}${tag}\n${body.replace(/\s+$/, '')}\n${f}`;
};
const decode = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const cellText = (html) => decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim().replace(/\|/g, '\\|');

// Tabla HTML → tabla Markdown (la primera fila con <th> es el encabezado)
function tableToMd(html) {
  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((c) => cellText(c[1]))
  ).filter((r) => r.length);
  if (!rows.length) return null;
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r) => [...r, ...Array(width - r.length).fill('')];
  const [head, ...body] = rows;
  return [`| ${pad(head).join(' | ')} |`, `| ${Array(width).fill('---').join(' | ')} |`, ...body.map((r) => `| ${pad(r).join(' | ')} |`)].join('\n');
}

// Tabla HTML del cuaderno → texto como lo imprime la consola de R.
// El cuaderno guarda las matrices y data frames ya formateados por columna; aquí solo se
// reconstruye la disposición de print(): etiquetas [i,] y [,j], alineación y corte a 80 columnas.
function tableToConsole(html) {
  const caption = decode((html.match(/<caption>([\s\S]*?)<\/caption>/i) || [])[1] || '');
  const isMatrix = /matrix/i.test(caption);
  const isChr = isMatrix && /of type chr/i.test(caption);
  const cells = (row, tag) => [...row.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'gi'))].map((c) => decode(c[1].replace(/<[^>]+>/g, '')).trim());
  const head = (html.match(/<thead>([\s\S]*?)<\/thead>/i) || [])[1];
  const body = (html.match(/<tbody>([\s\S]*?)<\/tbody>/i) || [])[1];
  if (!body) return null;
  const rows = [...body.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) => ({ label: cells(r[1], 'th')[0], values: cells(r[1], 'td') }));
  if (!rows.length) return null;
  const n = Math.max(...rows.map((r) => r.values.length));
  const hasRowNames = rows.some((r) => r.label !== undefined);
  let names = null;
  if (head) {
    const first = cells((head.match(/<tr[^>]*>([\s\S]*?)<\/tr>/i) || [])[1] || '', 'th');
    names = first.slice(first.length - n); // descarta la celda vacía sobre los nombres de fila
  }
  const header = Array.from({ length: n }, (_, j) => (names ? names[j] || '' : isMatrix ? `[,${j + 1}]` : ''));
  const labels = rows.map((r, i) => (hasRowNames ? r.label || '' : isMatrix ? `[${i + 1},]` : String(i + 1)));
  const value = (v) => (isChr && v !== 'NA' ? `"${v}"` : v);
  const cols = header.map((h, j) => {
    const vals = rows.map((r) => value(r.values[j] ?? ''));
    const width = Math.max(h.length, ...vals.map((v) => v.length));
    const fit = (t) => (isChr ? t.padEnd(width) : t.padStart(width));
    return { width, head: fit(h), vals: vals.map(fit) };
  });
  const labelWidth = Math.max(...labels.map((l) => l.length));
  // print() corta las tablas anchas en bloques de columnas que caben en 80 caracteres
  const blocks = [];
  let current = [], used = labelWidth;
  cols.forEach((c) => {
    if (current.length && used + 1 + c.width > 80) { blocks.push(current); current = []; used = labelWidth; }
    current.push(c); used += 1 + c.width;
  });
  blocks.push(current);
  return blocks.map((block) => [
    [''.padEnd(labelWidth), ...block.map((c) => c.head)].join(' '),
    ...rows.map((_, i) => [labels[i].padEnd(labelWidth), ...block.map((c) => c.vals[i])].join(' ')),
  ].map((l) => l.replace(/\s+$/, isChr ? ' ' : '')).join('\n')).join('\n');
}

const out = [];
let images = 0;
let pending = '';
nb.cells.forEach((cell, index) => {
  const source = text(cell.source).replace(/\s+$/, '');
  if (cell.cell_type === 'markdown') {
    if (source.trim()) out.push(source);
    return;
  }
  if (cell.cell_type !== 'code' || !source.trim()) return;
  // Una celda sin salida seguida de otra de código (p. ej. asignar y luego mostrar) va en el mismo bloque
  const code = pending ? `${pending}\n${source}` : source;
  pending = '';
  const next = nb.cells[index + 1];
  if (!(cell.outputs || []).length && next?.cell_type === 'code' && text(next.source).trim()) {
    pending = code;
    return;
  }
  out.push(block(lang, code));

  const plain = [];
  const flush = () => {
    if (plain.length) out.push(block('terminal', plain.join('\n')));
    plain.length = 0;
  };
  for (const o of cell.outputs || []) {
    const data = o.data || {};
    // Algunos cuadernos traen el PNG vacío y el gráfico solo en JPEG o SVG
    const image = ['image/png', 'image/jpeg', 'image/svg+xml'].find((k) => text(data[k]).trim());
    const html = text(data['text/html']);
    if (o.output_type === 'stream') {
      plain.push(text(o.text).replace(/\s+$/, ''));
    } else if (o.output_type === 'error') {
      // Sin los códigos de color ANSI ni el rastro vacío
      plain.push(text(o.traceback).replace(/\u001b\[[0-9;]*m/g, '').replace(/\n?Traceback:\s*$/, '').trim() || `${o.ename}: ${o.evalue}`);
    } else if (image) {
      flush();
      images += 1;
      const ext = image.split('/')[1].replace('svg+xml', 'svg').replace('jpeg', 'jpg');
      const name = `${slug}-${String(images).padStart(2, '0')}.${ext}`;
      if (imgDir && imgUrl) {
        mkdirSync(imgDir, { recursive: true });
        const raw = text(data[image]);
        writeFileSync(join(imgDir, name), ext === 'svg' ? raw : Buffer.from(raw, 'base64'));
        out.push(`![Gráfico de la celda ${index + 1}](${imgUrl.replace(/\/$/, '')}/${name})`);
      } else {
        out.push(`{/* Celda ${index + 1}: gráfico (${image}). Repite con --img-dir y --img-url para extraerlo. */}`);
      }
    } else if (/^\s*<table/i.test(html) && plainTables) {
      plain.push(tableToConsole(html) || text(data['text/plain']).replace(/\s+$/, ''));
    } else if (/^\s*<table/i.test(html)) {
      flush();
      out.push(tableToMd(html) || block('terminal', text(data['text/plain'])));
    } else if (data['text/plain']) {
      plain.push(text(data['text/plain']).replace(/\s+$/, ''));
    }
  }
  flush();
});

const mdx = `# ${basename(file, '.ipynb')}\n\n${out.join('\n\n')}\n`;
const dest = opt('out');
if (dest) {
  writeFileSync(dest, mdx);
  console.error(`${dest}: ${nb.cells.length} celdas, ${images} gráfico(s), lenguaje «${lang}».`);
} else {
  process.stdout.write(mdx);
}
