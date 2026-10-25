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
      <div className={styles.tabsContainer} role="group" aria-label="Selector de semestre">
        <div className={styles.tabsTrack}>
        {semesters.map((semester, idx) => {
          const isSelected = selectedSemester === semester.number;
          const progress = getProgress(semester.number);

          const tabClasses = [
            'pixel-press',
            styles.tab,
            isSelected && styles.activeTab,
            styles[semester.status]
          ].filter(Boolean).join(' ');

          return (
            <React.Fragment key={semester.number}>
              {/* Sendero del mapa: sólido hasta donde se ha llegado */}
              {idx > 0 && (
                <span
                  className={`${styles.path} ${semester.status !== 'pending' ? styles.pathDone : ''}`}
                  aria-hidden="true"
                ></span>
              )}
              <button
                onClick={() => onSemesterChange(semester.number)}
                className={tabClasses}
                aria-pressed={isSelected}
                aria-label={`Semestre ${semester.number}, ${progress.percent}% completado`}
              >
                {semester.number}
              </button>
            </React.Fragment>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default SemesterTabs;
