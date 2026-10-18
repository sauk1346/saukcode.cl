import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertCircle, StickyNote } from 'lucide-react';
import styles from './Callout.module.css';

const VARIANTS = {
  info:    { icon: Info,          label: 'Información' },
  tip:     { icon: Lightbulb,     label: 'Consejo'     },
  warning: { icon: AlertTriangle, label: 'Advertencia' },
  danger:  { icon: AlertCircle,   label: 'Peligro'     },
  note:    { icon: StickyNote,    label: 'Nota'        },
};

const Callout = ({ type = 'info', title, children }) => {
  const variant = VARIANTS[type] ?? VARIANTS.info;
  const Icon = variant.icon;
  const displayTitle = title ?? variant.label;

  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <div className={styles.header}>
        <Icon size={16} className={styles.icon} />
        <span className={styles.title}>{displayTitle}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Callout;
