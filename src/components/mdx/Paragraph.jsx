import React from 'react';
import styles from './Paragraph.module.css';

export const Paragraph = ({ children, ...props }) => (
  <p className={styles.paragraph} {...props}>
    {children}
  </p>
);

export const P = ({ children, indent = 1, ml }) => (
  <div
    className={styles.pContainer}
    data-indent={Math.min(Math.max(indent, 1), 4)}
    style={ml !== undefined ? { marginLeft: ml } : undefined}
  >
    {children}
  </div>
);