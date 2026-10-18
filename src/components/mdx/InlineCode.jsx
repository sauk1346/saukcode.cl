import React from 'react';
import codeStyles from './CodeBlock.module.css';
import styles from './CodeComponents.module.css';

// El runtime MDX de Astro pasa SOLO children (como wrapper StaticHtml) a los
// componentes que mapean elementos intrínsecos — sin class ni data-*. Bloque
// vs inline se decide mirando el HTML interno: los bloques resaltados por
// rehype-prism-plus contienen spans (code-line/token); el inline es texto.
function innerHtml(node) {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(innerHtml).join('');
  if (typeof node === 'object' && node.props) {
    const v = node.props.value;
    if (typeof v === 'string' || v instanceof String) return String(v);
    return innerHtml(node.props.children);
  }
  return '';
}

export const Code = ({ children, ...props }) => {
  const isBlock = /<span/.test(innerHtml(children));
  if (isBlock) {
    return (
      <code className={codeStyles.code} {...props}>
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
