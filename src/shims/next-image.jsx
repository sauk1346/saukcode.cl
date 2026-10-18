// Shim de next/image: el sitio original nunca activó la optimización
// (optimized=false en todos los usos), así que un <img> es equivalente.
import React from 'react';

export default function Image({ src, alt = '', width, height, priority, quality, placeholder, blurDataURL, sizes, loading, ...props }) {
  return <img src={src} alt={alt} width={width} height={height} loading={loading ?? 'lazy'} {...props} />;
}
