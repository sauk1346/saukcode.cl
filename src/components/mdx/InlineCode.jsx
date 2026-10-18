import React from 'react';
import codeStyles from './CodeBlock.module.css';
import styles from './CodeComponents.module.css';

// `code` dentro de un bloque resaltado (language-*) pasa tal cual;
// `code` inline lleva el estilo inlineCode del sitio Next.
export const Code = ({ children, className = '', ...props }) => {
  if (/language-/.test(className)) {
    return (
      <code className={`${className} ${codeStyles.code}`} {...props}>
        {children}
      </code>
    );
  }
  return (
    <code className={styles.inlineCode} {...props}>
      {children}
    </code>
  );
};
