'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './SubjectsGrid.module.css';
import { staggerContainer } from '@/utils/animations';

// Variantes para cada tarjeta - solo entrada, sin exit
const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const SubjectsGrid = ({
  subjects,
  categories,
  statusConfig,
  layout = 'default',
  className = ''
}) => {
  const containerClasses = [
    layout !== 'default' && styles[layout],
    className
  ].filter(Boolean).join(' ');

  // Componente para estado sin resultados
  const NoResults = () => (
    <div className={styles.noResults}>
      <h3 className={styles.noResultsTitle}>No hay materias disponibles</h3>
      <p className={styles.noResultsText}>Este semestre no tiene materias registradas</p>
    </div>
  );

  // Componente para tarjeta individual
  const SubjectCard = ({ subject }) => {
    const category = categories[subject.category];
    const status = statusConfig[subject.status];

    const cardClasses = [
      'pixel-box',
      subject.href && 'pixel-press',
      styles.subjectCard,
      subject.href && styles.clickable,
      styles[subject.status]
    ].filter(Boolean).join(' ');

    return (
      <motion.div className={cardClasses} variants={cardVariants}>
        {subject.href && (
          <Link href={subject.href} className={styles.cardLink} aria-label={subject.name} />
        )}
        <div className={`${styles.categoryBar} ${styles[subject.category]}`} />

        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <div className={styles.code}>{subject.code}</div>
            <div className={`${styles.statusBadge} ${styles[subject.status]}`}>
              {status.name}
            </div>
          </div>

          <h3 className={styles.cardTitle}>
            {subject.name}
          </h3>

          <div className={styles.cardFooter}>
            <span className={styles.categoryLabel}>
              <span className={`${styles.catSquare} ${styles[subject.category]}`} aria-hidden="true"></span>
              {category.name}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!subjects || subjects.length === 0) {
    return <NoResults />;
  }

  // Key basada en el semestre para re-montar y animar al cambiar
  const semesterKey = subjects[0]?.semester || 'default';

  return (
    <div className={containerClasses}>
      <motion.div
        className={styles.grid}
        key={semesterKey}
        initial="initial"
        animate="animate"
        variants={staggerContainer(0.08, 0.1)}
      >
        {subjects.map(subject => (
          <SubjectCard key={subject.code} subject={subject} />
        ))}
      </motion.div>
    </div>
  );
};

export default SubjectsGrid;
