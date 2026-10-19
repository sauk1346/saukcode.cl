// Lluvia de monedas pixel con cinemática de confeti: abanico amplio,
// alturas variadas y caída flotada. Sprite propio, cero dependencias;
// estilos .px-coin-* en global.css.
import { pixelIconPath } from './pixelIcons.js';

export function spawnCoinBurst(originEl, coins = 24) {
  if (typeof window === 'undefined' || !originEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect = originEl.getBoundingClientRect();
  const y0 = rect.top + rect.height / 2;
  const gold =
    getComputedStyle(document.documentElement).getPropertyValue('--warning-fill').trim() || '#f2c14e';
  const d = pixelIconPath('moneda');

  for (let i = 0; i < coins; i++) {
    const wrap = document.createElement('div');
    const arc = document.createElement('div');
    const coin = document.createElement('div');
    wrap.className = 'px-coin-wrap';
    arc.className = 'px-coin-arc';
    coin.className = 'px-coin';
    coin.innerHTML =
      `<svg width="24" height="24" viewBox="0 0 16 16" fill="${gold}" ` +
      `shape-rendering="crispEdges" aria-hidden="true"><path d="${d}"/></svg>`;

    // Cañón de confeti: origen a lo ancho, abanico amplio, vuelo largo
    const x = rect.left + rect.width * (0.1 + Math.random() * 0.8);
    const dx = (Math.random() * 2 - 1) * 220;
    const up = 110 + Math.random() * 130;
    const dur = 1100 + Math.random() * 500;
    const delay = Math.random() * 150; // estallido, no cola india

    wrap.style.cssText = `left:${x}px;top:${y0}px;--dx:${dx}px;animation-duration:${dur}ms;animation-delay:${delay}ms;`;
    arc.style.cssText = `--up:${-up}px;animation-duration:${dur}ms;animation-delay:${delay}ms;`;
    coin.style.cssText = `animation-delay:${delay}ms;`;

    wrap.appendChild(arc);
    arc.appendChild(coin);
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), dur + delay + 120);
  }
}
