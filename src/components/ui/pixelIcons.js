// Iconos sprite propios: dibujados en grilla de 16×16 como segmentos
// horizontales [x, y, ancho] de 1px de alto. Los consumen PixelIcon.astro
// (páginas Astro) y PixelGlyph.jsx (islas React).
export const pixelIcons = {
  // Birrete de graduación, vista frontal: tabla + gorro + borla (INACAP)
  birrete: [
    [7, 3, 2],
    [4, 4, 8],
    [1, 5, 14],
    [1, 6, 14],
    [4, 7, 8], [14, 7, 1],
    [4, 8, 8], [14, 8, 1],
    [4, 9, 8], [14, 9, 1],
    [13, 10, 2],
    [13, 11, 2],
  ],
  // Llaves de código { } con trazo de 2px (ejercicios de programación)
  codigo: [
    [4, 3, 2], [10, 3, 2],
    [3, 4, 2], [11, 4, 2],
    [3, 5, 2], [11, 5, 2],
    [3, 6, 2], [11, 6, 2],
    [2, 7, 2], [12, 7, 2],
    [2, 8, 2], [12, 8, 2],
    [3, 9, 2], [11, 9, 2],
    [3, 10, 2], [11, 10, 2],
    [3, 11, 2], [11, 11, 2],
    [4, 12, 2], [10, 12, 2],
  ],
  // Corazón (vidas de los quizzes)
  corazon: [
    [3, 1, 4], [9, 1, 4],
    [3, 2, 4], [9, 2, 4],
    [1, 3, 14], [1, 4, 14], [1, 5, 14],
    [1, 6, 14], [1, 7, 14], [1, 8, 14],
    [3, 9, 10], [3, 10, 10],
    [5, 11, 6], [5, 12, 6],
    [7, 13, 2], [7, 14, 2],
  ],
  // Moneda (celebraciones): círculo de 14px con ranura central de 2px
  moneda: [
    [5, 1, 6],
    [3, 2, 10],
    [2, 3, 12],
    [2, 4, 5], [9, 4, 5],
    [1, 5, 6], [9, 5, 6],
    [1, 6, 6], [9, 6, 6],
    [1, 7, 6], [9, 7, 6],
    [1, 8, 6], [9, 8, 6],
    [1, 9, 6], [9, 9, 6],
    [1, 10, 6], [9, 10, 6],
    [2, 11, 5], [9, 11, 5],
    [2, 12, 12],
    [3, 13, 10],
    [5, 14, 6],
  ],
  // Calendario (planificación académica)
  calendario: [
    [4, 1, 2], [10, 1, 2],
    [2, 3, 12],
    [2, 4, 12],
    [2, 6, 12],
    [2, 7, 1], [13, 7, 1],
    [2, 8, 1], [4, 8, 2], [7, 8, 2], [10, 8, 2], [13, 8, 1],
    [2, 9, 1], [13, 9, 1],
    [2, 10, 1], [4, 10, 2], [7, 10, 2], [13, 10, 1],
    [2, 11, 1], [13, 11, 1],
    [2, 12, 12],
  ],
};

// Compila los segmentos a un path SVG (un rectángulo de 1px de alto por segmento)
export const pixelIconPath = (name) =>
  (pixelIcons[name] ?? []).map(([x, y, w]) => `M${x} ${y}h${w}v1H${x}z`).join('');
