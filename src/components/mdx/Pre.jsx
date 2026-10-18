import React from 'react';
import styles from './CodeBlock.module.css';

// Bloques de código: el resaltado ya viene hecho del build (rehype-prism-plus,
// mismas clases que el Prism cliente del sitio Next). Aquí solo se agrega el
// contenedor, el theme CSS y el botón de copiar (manejado por un script global
// con delegación de eventos en el layout de lección).
// Nota: el MDX de Astro entrega el atributo como `class`, no `className`.
export const PreBlock = ({ children, className, class: classAttr, ...props }) => {
  const cls = className ?? classAttr ?? '';
  return (
    <div className={styles.codeBlockContainer}>
      <button
        type="button"
        className={`${styles.copyButton} ${styles.buttonLight} js-copy-code`}
        aria-label="Copiar código"
      >
        Copiar
      </button>
      <pre className={`${cls} ${styles.relative} ${styles.pre} ${styles.lightTheme}`} {...props}>
        {children}
      </pre>
    </div>
  );
};
