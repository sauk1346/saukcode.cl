import React from 'react';
import styles from './InacapStats.module.css';

const InacapStats = ({
  subjects,
  className = ''
}) => {
  const totalSubjects = subjects.length;
  const completedSubjects = subjects.filter(s => s.status === 'completed').length;
  const progressPercentage = totalSubjects > 0 ? Math.round((completedSubjects / totalSubjects) * 100) : 0;

  const containerClasses = [
    styles.statsBar,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <span className={styles.statsText}>
        <span className={styles.highlight}>{completedSubjects}</span>
        <span className={styles.separator}>/</span>
        <span>{totalSubjects}</span>
        <span className={styles.label}>materias completadas</span>
        <span className={styles.percentage}>({progressPercentage}%)</span>
      </span>
    </div>
  );
};

export default InacapStats;