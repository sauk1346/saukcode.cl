// Explora una página de la intranet con la sesión guardada: guarda su texto, enlaces e iframes en
// salida/ para diseñar los extractores específicos (ramos, material, evaluaciones…).
//   node scripts/inacap/explorar.mjs                (portal de inicio)
//   node scripts/inacap/explorar.mjs <url> [--shot] (otra página; --shot guarda una captura)
import { mkdirSync, writeFileSync } from 'node:fs';
import { OUT_DIR, PORTAL_URL, conSesion } from './sesion.mjs';

const url = process.argv.slice(2).find((a) => !a.startsWith('--')) ?? PORTAL_URL;
const shot = process.argv.includes('--shot');

await conSesion(async ({ page }) => {
  if (url !== PORTAL_URL) await page.goto(url, { waitUntil: 'networkidle' });

  // El portal arma partes de la página en iframes: se recorren todos los frames
  const frames = [];
  for (const frame of page.frames()) {
    const data = await frame
      .evaluate(() => ({
        texto: document.body?.innerText ?? '',
        enlaces: [...document.querySelectorAll('a[href]')]
          .map((a) => ({ texto: a.innerText.trim().replace(/\s+/g, ' '), href: a.href }))
          .filter((a) => a.texto || !a.href.startsWith('javascript:')),
      }))
      .catch(() => null);
    if (data) frames.push({ url: frame.url(), ...data });
  }

  const slug = new URL(page.url()).pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'inicio';
  mkdirSync(OUT_DIR, { recursive: true });
  const file = `${OUT_DIR}${slug}.json`;
  writeFileSync(file, JSON.stringify({ url: page.url(), titulo: await page.title(), frames }, null, 2));
  if (shot) await page.screenshot({ path: `${OUT_DIR}${slug}.png`, fullPage: true });

  console.log(`✓ ${await page.title()} — ${page.url()}`);
  for (const f of frames) console.log(`  frame ${f.url}: ${f.texto.length} caracteres, ${f.enlaces.length} enlaces`);
  console.log(`  Guardado en ${file}${shot ? ' (+ captura)' : ''}`);
});
