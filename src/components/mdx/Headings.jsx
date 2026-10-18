import React from 'react';
import { getSlug } from './slugify';
import styles from './Headings.module.css';

export const H1 = ({ children, ...props }) => (
  <h1 id={props.id || getSlug(children)} className={styles.h1} {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, ...props }) => (
  <h2 id={props.id || getSlug(children)} className={styles.h2} {...props}>
    {children}
  </h2>
);

export const H3 = ({ children, ...props }) => (
  <h3 id={props.id || getSlug(children)} className={styles.h3} {...props}>
    {children}
  </h3>
);