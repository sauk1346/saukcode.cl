'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './SemesterNavigation.module.css';

const SemesterNavigation = ({
  semesters,
  subjects,
  selectedSemester,
  onSemesterChange,
  layout = 'default',
  showProgress = true,
  className = ''
}) => {
  // Encontrar el semestre actual seleccionado
  const currentSemesterData = semesters.find(s => s.number === selectedSemester);
  const currentIndex = semesters.findIndex(s => s.number === selectedSemester);

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

  const currentProgress = getProgress(selectedSemester);

  // Navegación rápida
  const goToPrevious = () => {
    if (currentIndex > 0) {
      onSemesterChange(semesters[currentIndex - 1].number);
    }
  };

  const goToNext = () => {
    if (currentIndex < semesters.length - 1) {
      onSemesterChange(semesters[currentIndex + 1].number);
    }
  };

  // Clases del contenedor
  const containerClasses = [
    styles.semesterNavigation,
    styles.collapsed,
    layout !== 'default' && styles[layout],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {/* Vista colapsada - Solo semestre actual con navegación */}
      <div className={styles.collapsedView}>
        <button
          className={styles.navArrow}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          aria-label="Semestre anterior"
        >
          ‹
        </button>

        <div
          className={`${styles.currentSemester} ${styles[currentSemesterData?.status || 'pending']}`}
        >
          <div className={styles.currentSemesterInfo}>
            <span className={styles.currentNumber}>
              {selectedSemester}° Semestre
            </span>
            <span className={styles.currentYear}>
              {currentSemesterData?.year}
            </span>
          </div>

          {showProgress && (
            <div className={styles.currentProgress}>
              <div className={styles.currentProgressBar}>
                <motion.div
                  className={styles.currentProgressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress.percent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className={styles.currentProgressText}>
                {currentProgress.completed}/{currentProgress.total} • {currentProgress.percent}%
              </span>
            </div>
          )}
        </div>

        <button
          className={styles.navArrow}
          onClick={goToNext}
          disabled={currentIndex === semesters.length - 1}
          aria-label="Semestre siguiente"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default SemesterNavigation;
