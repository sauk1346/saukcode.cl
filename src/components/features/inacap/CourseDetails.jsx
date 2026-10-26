'use client'

import React, { useState, useEffect } from 'react';
import { SmartLink } from '@/components/ui/SmartLink';
import { buildCourseResourceLink } from '@/utils/linkBuilder';
import ProfessorCard from './ProfessorCard';
import styles from './CourseDetails.module.css';

// Parse de fechas en español: 'Martes 20, Oct 2026' / 'Mar 11, Ago 2026'
const MESES = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 };
const parseFecha = (str) => {
  const m = /(\d{1,2}),\s*([A-Za-z]+)\s+(\d{4})/.exec(str || '');
  if (!m) return null;
  const mes = MESES[m[2].slice(0, 3).toLowerCase()];
  return mes == null ? null : new Date(Number(m[3]), mes, Number(m[1]));
};

// Semana "actual": la más próxima cuyo último día aún no pasó
const getCurrentWeek = (byWeek) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let best = null;
  for (const [week, items] of Object.entries(byWeek)) {
    const dates = items.map((i) => parseFecha(i.date)).filter(Boolean);
    if (!dates.length) continue;
    const max = Math.max(...dates.map((d) => d.getTime()));
    if (max >= today.getTime() && (best === null || max < best.max)) best = { week, max };
  }
  return best ? best.week : null;
};

const CourseDetails = ({
  courseCode,
  courseTitle,
  courseDescription,
  professorData,
  unitsData,
  evaluationsData,
  classData = [],
  lectureData = [],
}) => {
  
  // Helper function para renderizar un elemento individual de contenido
  const renderContentItem = (item, index) => {
    if (!item) return null;

    const key = `content-${index}`;
    // `sub: true`: ítem anidado bajo el anterior (p. ej., los Excel de una actividad)
    const itemClass = item.sub ? `${styles.contentItem} ${styles.contentSubItem}` : styles.contentItem;

    // La viñeta la pinta CSS (::before ▸); se limpia cualquier guion de los datos
    const displayText = item.text.replace(/^\s*[-•*]\s*/, '');

    // Inferir el tipo basado en la presencia de href
    if (item.href) {
      // Construir la ruta completa si es una ruta interna relativa
      let fullHref = item.href;

      // Si no empieza con '/' ni 'http', es una ruta relativa que necesita el prefijo /inacap/courseCode/
      if (!item.href.startsWith('/') && !item.href.startsWith('http')) {
        fullHref = buildCourseResourceLink('inacap', courseCode.toLowerCase(), item.href);
      }

      const linkContent = <SmartLink href={fullHref}>{displayText}</SmartLink>;
      return (
        <div key={key} className={itemClass}>
          {item.strikethrough ? <del>{linkContent}</del> : linkContent}
        </div>
      );
    } else {
      // Es texto simple
      const textContent = <span>{displayText}</span>;
      return (
        <div key={key} className={itemClass}>
          {item.strikethrough ? <del>{textContent}</del> : textContent}
        </div>
      );
    }
  };

  // Helper function principal para renderizar cualquier tipo de contenido
  const renderContent = (content) => {
    if (!content) return '';
    
    // Si es un string simple (retrocompatibilidad)
    if (typeof content === 'string') {
      return <span>{content}</span>;
    }
    
    // Si es un objeto individual con la estructura esperada {text, href, external}
    if (typeof content === 'object' && !Array.isArray(content) && content.text !== undefined) {
      return (
        <div className={styles.contentList}>
          {renderContentItem(content, 0)}
        </div>
      );
    }
    
    // Description y quickGuide son SIEMPRE arrays
    if (Array.isArray(content)) {
      return (
        <div className={styles.contentList}>
          {content.map((item, index) => renderContentItem(item, index))}
        </div>
      );
    }
    
    // Fallback para JSX directo (retrocompatibilidad)
    // Solo si es un elemento React válido
    if (React.isValidElement(content)) {
      return content;
    }
    
    // Si llegamos aquí, probablemente es un objeto que no podemos renderizar
    console.warn('Contenido no válido para renderizar:', content);
    return <span>Contenido no disponible</span>;
  };

  // Determinamos qué pestañas están disponibles
  const hasClasses = Array.isArray(classData) && classData.length > 0;
  const hasLectures = Array.isArray(lectureData) && lectureData.length > 0;
  
  // Configuramos la pestaña activa inicial
  const [activeTab, setActiveTab] = useState('general');
  
  // Aseguramos que la pestaña activa sea válida
  useEffect(() => {
    if (activeTab === 'clases' && !hasClasses) {
      setActiveTab('general');
    }
    if (activeTab === 'lecturas' && !hasLectures) {
      setActiveTab('general');
    }
  }, [activeTab, hasClasses, hasLectures]);

  // Semana en curso (calculada tras montar: la fecha es del visitante,
  // no del build estático)
  const [currentWeeks, setCurrentWeeks] = useState({ clases: null, lecturas: null });

  // Agrupamos clases por semana (solo si hay clases)
  const classesByWeek = hasClasses 
    ? classData.reduce((acc, classItem, index) => {
        if (classItem.week) {
          if (!acc[classItem.week]) {
            acc[classItem.week] = [];
          }
          acc[classItem.week].push(classItem);
        } else {
          // Buscar la semana anterior
          let weekToUse = '';
          for (let i = index - 1; i >= 0; i--) {
            if (classData[i].week) {
              weekToUse = classData[i].week;
              break;
            }
          }
          
          if (weekToUse && acc[weekToUse]) {
            acc[weekToUse].push(classItem);
          }
        }
        return acc;
      }, {})
    : {};

  // Agrupamos lecturas por semana (solo si hay lecturas)
  const lecturesByWeek = hasLectures
    ? lectureData.reduce((acc, lecture) => {
        if (lecture.week) {
          if (!acc[lecture.week]) {
            acc[lecture.week] = [];
          }
          acc[lecture.week].push(lecture);
        } else {
          const lastWeek = Object.keys(acc).pop();
          if (lastWeek) {
            acc[lastWeek].push(lecture);
          }
        }
        return acc;
      }, {})
    : {};

  useEffect(() => {
    setCurrentWeeks({
      clases: getCurrentWeek(classesByWeek),
      lecturas: getCurrentWeek(lecturesByWeek),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classData, lectureData]);

  return (
    <div className={styles.container}>
      {/* Encabezado: carátula del ramo (código + título + descripción) */}
      <header className={`pixel-box ${styles.courseHeader}`}>
        <p className={styles.courseCode}>{courseCode}</p>
        <h1 className={styles.title}>{courseTitle}</h1>
        <p className={styles.description}>{courseDescription}</p>
      </header>

      {/* Navegación por pestañas: selector estilo consola (la activa va
          "presionada", las inactivas levantadas con sombra dura) */}
      <div className={styles.tabNavigation}>
        <div className={styles.tabButtons} role="tablist" aria-label="Secciones del ramo">
          {[
            { id: 'general', label: 'General' },
            { id: 'evaluaciones', label: 'Evaluaciones' },
            ...(hasClasses ? [{ id: 'clases', label: 'Clases' }] : []),
            ...(hasLectures ? [{ id: 'lecturas', label: 'Lecturas' }] : []),
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`pixel-press ${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {activeTab === tab.id && (
                <span aria-hidden="true" className={styles.tabMarker}>▸</span>
              )}
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Pestaña General */}
        {activeTab === 'general' && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Información General</h2>
            <div className={styles.cardGroup}>
              {/* Profesor */}
              <ProfessorCard professorData={professorData} />
              
              {/* Vista general de unidades */}
              <div className={`pixel-box ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Unidades</h2>
                </div>
                <div className={styles.cardBody}>
                  <ul className={styles.listNoStyle}>
                    {unitsData.map((unit, index) => (
                      <li key={index} className={styles.unitItem}>
                        <span className={styles.unitNumber}>{unit.unit}</span>
                        <span>{unit.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
                
        {/* Pestaña Evaluaciones */}
        {activeTab === 'evaluaciones' && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Evaluaciones</h2>
            
            <div className={styles.evaluationGrid}>
              {evaluationsData.map((evaluation, index) => {
                // Calcular porcentaje para la barra visual
                let weightStr = evaluation.weighting.split('*')[0].trim();
                const weightValue = parseInt(weightStr.replace('%', '')) || 0;
                
                // Nivel de amenaza según el peso: verde ≤15%, ámbar 20-30%, rojo ≥35%
                const weightTier =
                  weightValue >= 35 ? 'weightHigh' : weightValue >= 20 ? 'weightMid' : 'weightLow';
                const filledCells = Math.round(weightValue / 10);

                return (
                  <div key={index} className={`pixel-box ${styles.evaluationCard}`}>
                    <div className={styles.evaluationHeader}>
                      <div className={styles.evaluationBadge}>
                        <span>{evaluation.evaluationNumber}</span>
                      </div>
                      <div className={styles.evaluationMeta}>
                        <h3 className={styles.evaluationTitle}>
                          Evaluación {evaluation.evaluationNumber}
                        </h3>
                        <span className={styles.evaluationDate}>{evaluation.date}</span>
                      </div>
                    </div>

                    <div className={styles.evaluationBody}>
                      <div className={styles.evaluationDescription}>
                        {renderContent(evaluation.description)}
                      </div>

                      {evaluation.quickGuide && (
                        <div className={styles.evaluationGuides}>
                          <h4 className={styles.guidesTitle}>Guías de estudio:</h4>
                          <div className={styles.guidesList}>
                            {renderContent(evaluation.quickGuide)}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className={styles.evaluationFooter}>
                      <div className={styles.weightWrapper}>
                        <span className={styles.weightLabel}>ponderación</span>
                        <span className={styles.evaluationWeight}>{evaluation.weighting}</span>
                      </div>
                      {/* Barra de energía: 10 segmentos, 1 por cada 10% */}
                      <div
                        className={styles.weightBarContainer}
                        role="img"
                        aria-label={`Ponderación ${evaluation.weighting}`}
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <span
                            key={i}
                            className={`${styles.weightCell} ${i < filledCells ? styles[weightTier] : ''} ${
                              i === filledCells - 1 ? styles.weightTip : ''
                            }`}
                          ></span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Pestaña Clases */}
        {activeTab === 'clases' && hasClasses && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Calendario de clases</h2>
            <div className={styles.twoColumnContainer}>
              {Object.entries(classesByWeek)
                .sort(([weekA], [weekB]) => parseInt(weekA) - parseInt(weekB))
                .map(([week, classes]) => (
                  <div
                    key={week}
                    className={`pixel-box ${styles.card} ${week === currentWeeks.clases ? styles.currentWeekCard : ''}`}
                  >
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>Semana {week}</h3>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.classList}>
                        {classes.map((classItem, idx) => (
                          <div key={idx} className={styles.classItem}>
                            <div className={styles.classHeader}>
                              <span className={styles.classNumber}>Clase {classItem.class}:</span>
                              <span className={styles.itemDate}>{classItem.date}</span>
                            </div>
                            <div className={styles.classDescription}>
                              {renderContent(classItem.description)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Pestaña Lecturas */}
        {activeTab === 'lecturas' && hasLectures && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Calendario de lecturas</h2>
            <div className={styles.twoColumnContainer}>
              {Object.entries(lecturesByWeek)
                .sort(([weekA], [weekB]) => parseInt(weekA) - parseInt(weekB))
                .map(([week, lectures]) => (
                  <div
                    key={week}
                    className={`pixel-box ${styles.card} ${week === currentWeeks.lecturas ? styles.currentWeekCard : ''}`}
                  >
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>Semana {week}</h3>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.lectureList}>
                        {lectures.map((lecture, idx) => (
                          <div key={idx} className={styles.lectureItem}>
                            <div className={styles.lectureHeader}>
                              <span className={styles.lectureNumber}>Lectura {lecture.lecture}:</span>
                              <span className={styles.itemDate}>{lecture.date}</span>
                            </div>
                            <div className={styles.lectureDescription}>
                              {renderContent(lecture.description)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;