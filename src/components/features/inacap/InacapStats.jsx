import React from 'react';
import styles from './InacapStats.module.css';

// Barra de XP de la carrera: una celda por materia, en orden de malla.
const InacapStats = ({ subjects, className = '' }) => {
  const total = subjects.length;
  const completed = subjects.filter((s) => s.status === 'completed').length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={[styles.statsBar, className].filter(Boolean).join(' ')}>
      <div
        className={styles.xpBar}
        role="img"
        aria-label={`${completed} de ${total} materias completadas (${pct}%)`}
      >
        {subjects.map((s) => (
          <span key={s.code} className={`${styles.xpCell} ${styles[s.status] ?? ''}`}></span>
        ))}
      </div>
      <span className={styles.statsText}>
        <span className={styles.highlight}>{completed}/{total} CLEAR</span> · {pct}%
      </span>
    </div>
  );
};

export default InacapStats;
