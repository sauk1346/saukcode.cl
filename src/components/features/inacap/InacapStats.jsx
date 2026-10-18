import React from 'react';
import styles from './InacapStats.module.css';

// Barra de XP de la carrera: una celda por materia, en orden de malla.
const InacapStats = ({ subjects, className = '' }) => {
  const total = subjects.length;
  const completed = subjects.filter((s) => s.status === 'completed').length;
  const playing = subjects.filter((s) => s.status === 'current').length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  // La barra se llena de izquierda a derecha: CLEAR, luego PLAYING, luego vacío
  const order = { completed: 0, current: 1, pending: 2 };
  const cells = [...subjects].sort((a, b) => (order[a.status] ?? 2) - (order[b.status] ?? 2));

  return (
    <div className={[styles.statsBar, className].filter(Boolean).join(' ')}>
      <div
        className={styles.xpBar}
        role="img"
        aria-label={`${completed} de ${total} materias completadas (${pct}%), ${playing} en curso`}
      >
        {cells.map((s) => (
          <span key={s.code} className={`${styles.xpCell} ${styles[s.status] ?? ''}`}></span>
        ))}
      </div>
      <span className={styles.statsText}>
        <span className={styles.highlight}>{completed}/{total} CLEAR</span>
        {playing > 0 && <> · <span className={styles.playing}>{playing} PLAYING</span></>} · {pct}%
      </span>
    </div>
  );
};

export default InacapStats;
