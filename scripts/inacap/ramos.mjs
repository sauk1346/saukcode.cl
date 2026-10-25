// Ramos del semestre y su material en el Ambiente de Aprendizaje (Moodle, aai.inacap.cl): secciones
// (presentación, unidades) con sus recursos. Guarda salida/ramos.json y muestra un resumen.
//   node scripts/inacap/ramos.mjs              (todos los ramos)
//   node scripts/inacap/ramos.mjs AVFI01 TI3V62 (solo esos códigos)
import { mkdirSync, writeFileSync } from 'node:fs';
import { OUT_DIR, conSesion } from './sesion.mjs';
import { entrarMoodle, leerCurso, listarCursos } from './moodle.mjs';

const filtro = process.argv.slice(2).map((c) => c.toUpperCase());

await conSesion(async ({ page }) => {
  await entrarMoodle(page);
  const ramos = [];
  for (const curso of await listarCursos(page)) {
    if (filtro.length && !filtro.includes(curso.codigo)) continue;
    ramos.push(await leerCurso(page, curso));
  }

  mkdirSync(OUT_DIR, { recursive: true });
  const file = `${OUT_DIR}ramos.json`;
  writeFileSync(file, JSON.stringify({ extraido: new Date().toISOString(), ramos }, null, 2));

  for (const r of ramos) {
    const total = r.secciones.reduce((n, s) => n + s.recursos.length, 0);
    console.log(`\n${r.codigo ?? '(sin código)'} — ${r.nombre} (${total} recursos)`);
    for (const s of r.secciones) console.log(`  · ${s.nombre || '(sin título)'}: ${s.recursos.length}`);
  }
  console.log(`\n✓ ${ramos.length} ramos guardados en ${file}`);
});
