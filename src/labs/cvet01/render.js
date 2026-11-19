// Dibuja los bloques de una lámina como HTML (en la compilación, no en el
// navegador): así el buscador del sitio indexa todo el contenido.
import katex from 'katex';
import dims from './imagenes.json';

const IMG = '/labs/cvet01/img/';

export const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function figura(img, cap, grow) {
  const [w, h] = dims[img] || [];
  const size = w ? ` width="${w}" height="${h}"` : '';
  return (
    `<figure class="xl-fig">` +
    `<button type="button" class="xl-shot${grow ? ' grow' : ''}" aria-label="Ampliar captura: ${esc(cap)}">` +
    `<img src="${IMG}${img}.webp" alt="${esc(cap)}"${size} loading="lazy" decoding="async"></button>` +
    `<figcaption>${cap}</figcaption></figure>`
  );
}

// Bloque «Cómo leerlo»: el contenido llega como '<b>Cómo leerlo</b>texto'
function lectura(h) {
  const m = /^<b>(.*?)<\/b>(.*)$/s.exec(h);
  return `<div class="xl-read"><b class="xl-lbl">${m ? m[1] : 'Cómo leerlo'}</b><p>${m ? m[2] : h}</p></div>`;
}

export function bloques(blocks) {
  let n = 0;
  return blocks
    .map((b) => {
      switch (b.k) {
        case 'p':
          return `<p>${b.h}</p>`;
        case 'h':
          return `<h3>${b.h}</h3>`;
        case 't':
          return `<div class="xl-tip">${b.h}</div>`;
        case 'r':
          return lectura(b.h);
        case 'i':
          return figura(b.img, b.cap, b.grow);
        case 's':
          n++;
          return (
            `<div class="xl-step"><span class="xl-num" aria-hidden="true">${n}</span>` +
            `<div class="xl-txt"><span class="xl-sr">Paso ${n}: </span>${b.h}</div>` +
            (b.img ? figura(b.img, b.cap, b.grow) : '') +
            `</div>`
          );
        case 'f':
          return (
            `<div class="xl-fx"><span class="xl-fx-l" aria-hidden="true">fx</span><code>${esc(b.f)}</code>` +
            (b.r ? `<span class="xl-fx-r"><small>${b.w || 'resultado'}</small>${esc(b.r)}</span>` : '') +
            `<button type="button" class="xl-copy">Copiar</button></div>`
          );
        case 'x':
          return b.h;
        case 'm':
          return `<div class="xl-math">${katex.renderToString(b.tex, { displayMode: true, throwOnError: true })}</div>`;
        case 'tb':
          return (
            `<div class="xl-scroll"><table class="xl-table"><thead><tr>` +
            b.head.map((h) => `<th>${h}</th>`).join('') +
            `</tr></thead><tbody>` +
            b.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('') +
            `</tbody></table></div>`
          );
        default:
          return '';
      }
    })
    .join('');
}
