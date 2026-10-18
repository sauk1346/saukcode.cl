import React from 'react';
import styles from './Blockquote.module.css';

export const Blockquote = ({ children, ...props }) => (
  <blockquote className={styles.blockquote} {...props}>
    {children}
  </blockquote>
);