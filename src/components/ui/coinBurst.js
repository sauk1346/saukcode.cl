// Lluvia de monedas pixel: brotan del elemento origen con arco físico,
// giro de sprite en steps y desvanecimiento. Sin dependencias; los
// estilos .px-coin-* viven en global.css.
import { pixelIconPath } from './pixelIcons.js';

export function spawnCoinBurst(originEl, count = 6) {
  if (typeof window === 'undefined' || !originEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect = originEl.getBoundingClientRect();
  const x0 = rect.left + rect.width / 2;
  const y0 = rect.top + rect.height / 2;
  const color =
    getComputedStyle(document.documentElement).getPropertyValue('--warning-fill').trim() || '#f2c14e';
  const d = pixelIconPath('moneda');

  for (let i = 0; i < count; i++) {
    const wrap = document.createElement('div'); // deriva horizontal (lineal)
    const arc = document.createElement('div'); // arco vertical (sube y cae)
    const coin = document.createElement('div'); // pop + giro de sprite

    wrap.className = 'px-coin-wrap';
    arc.className = 'px-coin-arc';
    coin.className = 'px-coin';
    coin.innerHTML =
      `<svg width="24" height="24" viewBox="0 0 16 16" fill="${color}" ` +
      `shape-rendering="crispEdges" aria-hidden="true"><path d="${d}"/></svg>`;

    const dx = (Math.random() * 2 - 1) * 90; // deriva ±90px
    const up = 90 + Math.random() * 55; // altura del arco
    const dur = 850 + Math.random() * 150;
    const delay = i * 40; // fuente escalonada

    wrap.style.cssText = `left:${x0}px;top:${y0}px;--dx:${dx}px;animation-duration:${dur}ms;animation-delay:${delay}ms;`;
    arc.style.cssText = `--up:${-up}px;animation-duration:${dur}ms;animation-delay:${delay}ms;`;
    coin.style.cssText = `animation-delay:${delay}ms;`;

    wrap.appendChild(arc);
    arc.appendChild(coin);
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), dur + delay + 120);
  }
}
