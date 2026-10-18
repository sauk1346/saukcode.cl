import { useMemo } from 'react';
import styles from './ProblemStats.module.css';

const ProblemStats = ({ problems }) => {
  const stats = useMemo(() => {
    const problemList = Object.values(problems);
    return {
      total: problemList.length,
      easy: problemList.filter(p => p.difficulty === "Easy").length,
      medium: problemList.filter(p => p.difficulty === "Medium").length,
      hard: problemList.filter(p => p.difficulty === "Hard").length
    };
  }, [problems]);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statItem}>
        <span className={styles.statNumber}>{stats.total}</span>
        <span className={styles.statLabel}>Problemas</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statNumber}>{stats.easy}</span>
        <span className={styles.statLabel}>Fácil</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statNumber}>{stats.medium}</span>
        <span className={styles.statLabel}>Medio</span>
      </div>
      
      <div className={styles.statItem}>
        <span className={styles.statNumber}>{stats.hard}</span>
        <span className={styles.statLabel}>Difícil</span>
      </div>
    </div>
  );
};

export default ProblemStats;