import React from 'react';
import { pixelIconPath } from './pixelIcons.js';

// Versión React de PixelIcon.astro, para las islas (calendario, etc.).
// El tamaño debe ser múltiplo de 16: con escala no entera, crispEdges
// redondea y los píxeles salen desparejos.
const PixelGlyph = ({ name, size = 32, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    shapeRendering="crispEdges"
    aria-hidden="true"
    className={className}
  >
    <path d={pixelIconPath(name)} />
  </svg>
);

export default PixelGlyph;
