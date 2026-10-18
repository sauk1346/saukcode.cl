'use client';

import React from 'react';
import styles from './SemesterTabs.module.css';

const SemesterTabs = ({
  semesters,
  subjects,
  selectedSemester,
  onSemesterChange,
  className = ''
}) => {
  // Calcular progreso del semestre
  const getProgress = (semesterNumber) => {
    const semesterSubjects = subjects.filter(s => s.semester === semesterNumber);
    const completedCount = semesterSubjects.filter(s => s.status === 'completed').length;
    const totalCount = semesterSubjects.length;
    return {
      completed: completedCount,
      total: totalCount,
      percent: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
    };
  };

  const containerClasses = [
    styles.semesterTabs,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.tabsContainer}>
        {semesters.map(semester => {
          const isSelected = selectedSemester === semester.number;
          const progress = getProgress(semester.number);

          const tabClasses = [
            styles.tab,
            isSelected && styles.activeTab,
            styles[semester.status]
          ].filter(Boolean).join(' ');

          return (
            <button
              key={semester.number}
              onClick={() => onSemesterChange(semester.number)}
              className={tabClasses}
              aria-pressed={isSelected}
              aria-label={`Semestre ${semester.number}, ${progress.percent}% completado`}
            >
              <span className={styles.tabNumber}>
                <span className={styles.fullText}>{semester.number}° Semestre</span>
                <span className={styles.shortText}>{semester.number}° Sem</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SemesterTabs;
