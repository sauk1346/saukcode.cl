// Shim de next/link para componentes React portados del sitio Next:
// en Astro (MPA) un <a> plano es equivalente.
import React from 'react';

export default function Link({ href, children, ...props }) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
