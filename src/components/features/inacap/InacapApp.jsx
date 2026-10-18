'use client'

import React, { useState } from 'react';
import { subjects, categories, statusConfig, semesters } from '@/data/inacap/inacapData';
import Calendar from './Calendar';
import InacapStats from './InacapStats';
import SemesterTabs from './SemesterTabs';
import SubjectsGrid from './SubjectsGrid';
import calendar25 from '@/data/inacap/calendar25.js';
import styles from './Inacap.module.css';

const Inacap = () => {
  const currentSemester = semesters.find(s => s.status === 'current')?.number ?? semesters[0].number;
  const [selectedSemester, setSelectedSemester] = useState(currentSemester);

  // Filtrado de materias (solo por semestre)
  const filteredSubjects = subjects.filter(subject => {
    return subject.semester === selectedSemester;
  });

  // Handler para cambio de semestre
  const handleSemesterChange = (semesterNumber) => {
    setSelectedSemester(semesterNumber);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Título principal */}
        <h1 className={styles.title}>Malla Curricular</h1>

        {/* Componente de estadísticas */}
        <section className={styles.section}>
          <InacapStats subjects={subjects} />
        </section>

        {/* Navegación por semestres con pestañas */}
        <section className={styles.section}>
          <SemesterTabs
            semesters={semesters}
            subjects={subjects}
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
          />
        </section>

        {/* Componente de grid de materias */}
        <section className={styles.section}>
          <SubjectsGrid
            subjects={filteredSubjects}
            categories={categories}
            statusConfig={statusConfig}
            layout="default"
          />
        </section>

        {/* Sección del calendario */}
        <section className={styles.section}>
          <h2 className={styles.title}>Calendario 2026</h2>
          <div className={styles.calendarPlaceholder}>
            <Calendar eventos={calendar25} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inacap;
