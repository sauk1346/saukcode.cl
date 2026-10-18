import React from 'react';
import styles from './Box.module.css';

const Box = ({ title, children }) => (
  <div className={styles.box}>
    {title && <div className={styles.title}>{title}</div>}
    <div className={styles.content}>{children}</div>
  </div>
);

export default Box;
