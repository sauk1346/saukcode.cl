// Ráfaga de celebración pixel: monedas (sprite propio) + confeti de
// chispas cuadradas en la paleta, con arco físico, brotando a lo ancho
// del elemento origen. Sin dependencias; estilos .px-coin-* en global.css.
import { pixelIconPath } from './pixelIcons.js';

const SPARK_VARS = ['--success', '--primary', '--accent', '--cyan', '--warning-fill'];

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function spawnPiece({ x, y, dx, up, dur, delay, inner }) {
  const wrap = document.createElement('div');
  const arc = document.createElement('div');
  wrap.className = 'px-coin-wrap';
  arc.className = 'px-coin-arc';
  wrap.style.cssText = `left:${x}px;top:${y}px;--dx:${dx}px;animation-duration:${dur}ms;animation-delay:${delay}ms;`;
  arc.style.cssText = `--up:${-up}px;animation-duration:${dur}ms;animation-delay:${delay}ms;`;
  arc.appendChild(inner);
  wrap.appendChild(arc);
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), dur + delay + 120);
}

export function spawnCoinBurst(originEl, coins = 8, sparks = 18) {
  if (typeof window === 'undefined' || !originEl) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rect = originEl.getBoundingClientRect();
  const y0 = rect.top + rect.height / 2;
  const originX = () => rect.left + rect.width * (0.1 + Math.random() * 0.8);
  const gold = cssVar('--warning-fill', '#f2c14e');
  const d = pixelIconPath('moneda');

  // Monedas: las protagonistas
  for (let i = 0; i < coins; i++) {
    const coin = document.createElement('div');
    coin.className = 'px-coin';
    coin.innerHTML =
      `<svg width="24" height="24" viewBox="0 0 16 16" fill="${gold}" ` +
      `shape-rendering="crispEdges" aria-hidden="true"><path d="${d}"/></svg>`;
    const delay = i * 40;
    coin.style.cssText = `animation-delay:${delay}ms;`;
    spawnPiece({
      x: originX(),
      y: y0,
      dx: (Math.random() * 2 - 1) * 120,
      up: 100 + Math.random() * 70,
      dur: 850 + Math.random() * 180,
      delay,
      inner: coin,
    });
  }

  // Chispas: confeti pixel de acompañamiento
  for (let i = 0; i < sparks; i++) {
    const spark = document.createElement('div');
    spark.className = 'px-spark';
    const size = 4 + Math.round(Math.random() * 3);
    const color = cssVar(SPARK_VARS[i % SPARK_VARS.length], '#7e96f2');
    spark.style.cssText = `width:${size}px;height:${size}px;background:${color};`;
    spawnPiece({
      x: originX(),
      y: y0,
      dx: (Math.random() * 2 - 1) * 170,
      up: 70 + Math.random() * 120,
      dur: 700 + Math.random() * 250,
      delay: Math.random() * 120,
      inner: spark,
    });
  }
}
