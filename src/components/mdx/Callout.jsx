import React from 'react';
import styles from './Callout.module.css';

const VARIANTS = {
  info:    { label: 'Información' },
  tip:     { label: 'Consejo'     },
  warning: { label: 'Advertencia' },
  danger:  { label: 'Peligro'     },
  note:    { label: 'Nota'        },
};

const Callout = ({ type = 'info', title, children }) => {
  const variant = VARIANTS[type] ?? VARIANTS.info;
  const displayTitle = title ?? variant.label;

  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{displayTitle}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Callout;
