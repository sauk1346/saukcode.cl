'use client'

import React, { useState, useEffect } from 'react';
import { Calendar, Book, CheckSquare, User, Grid3x3, Monitor, FileText, Clock, Percent, Layers } from 'lucide-react';
import { SmartLink } from '@/components/ui/SmartLink';
import { buildCourseResourceLink } from '@/utils/linkBuilder';
import Link from 'next/link';
import ProfessorCard from './ProfessorCard';
import styles from './CourseDetails.module.css';

const CourseDetails = ({
  courseCode,
  courseTitle,
  courseDescription,
  professorData,
  unitsData,
  evaluationsData,
  classData = [],
  lectureData = [],
  flashcardTopics = [],
  courseId = '',
}) => {
  
  // Helper function para renderizar un elemento individual de contenido
  const renderContentItem = (item, index) => {
    if (!item) return null;

    const key = `content-${index}`;

    // Agregar viñeta automáticamente - siempre uniforme
    const displayText = !item.text.startsWith('-') && !item.text.startsWith('•') && !item.text.startsWith('*')
      ? `- ${item.text}`
      : item.text;

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
        <div key={key} className={styles.contentItem}>
          {item.strikethrough ? <del>{linkContent}</del> : linkContent}
        </div>
      );
    } else {
      // Es texto simple
      const textContent = <span>{displayText}</span>;
      return (
        <div key={key} className={styles.contentItem}>
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
  const hasFlashcards = Array.isArray(flashcardTopics) && flashcardTopics.length > 0;
  
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
    if (activeTab === 'flashcards' && !hasFlashcards) {
      setActiveTab('general');
    }
  }, [activeTab, hasClasses, hasLectures, hasFlashcards]);

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

  return (
    <div className={styles.container}>
      {/* Encabezado con Hero Section */}
      <div className={styles.description}>
        <h1 className={styles.title}>{courseTitle}</h1>
        <p className={styles.subheading}>{courseCode}</p>
        <p>{courseDescription}</p>
      </div>

      {/* Navegación por pestañas */}
      <div className={styles.tabNavigation}>
        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'general' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <Grid3x3 size={18} />
            <span>General</span>
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'evaluaciones' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('evaluaciones')}
          >
            <CheckSquare size={18} />
            <span>Evaluaciones</span>
          </button>
          
          {hasClasses && (
            <button 
              className={`${styles.tabButton} ${activeTab === 'clases' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('clases')}
            >
              <Monitor size={18} />
              <span>Clases</span>
            </button>
          )}
          
          {hasLectures && (
            <button
              className={`${styles.tabButton} ${activeTab === 'lecturas' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('lecturas')}
            >
              <Book size={18} />
              <span>Lecturas</span>
            </button>
          )}

          {hasFlashcards && (
            <button
              className={`${styles.tabButton} ${activeTab === 'flashcards' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('flashcards')}
            >
              <Layers size={18} />
              <span>Flashcards</span>
            </button>
          )}
        </div>
        
        {/* Pestaña General */}
        {activeTab === 'general' && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Información General</h2>
            <div className={styles.cardGroup}>
              {/* Profesor */}
              <ProfessorCard professorData={professorData} />
              
              {/* Vista general de unidades */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>
                    <Book size={20} />
                    Unidades
                  </h2>
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
                
                return (
                  <div key={index} className={styles.evaluationCard}>
                    <div className={styles.evaluationHeader}>
                      <div className={styles.evaluationBadge}>
                        <span>{evaluation.evaluationNumber}</span>
                      </div>
                      <div className={styles.evaluationMeta}>
                        <div className={styles.evaluationDateWrapper}>
                          <Clock size={14} />
                          <span className={styles.evaluationDate}>{evaluation.date}</span>
                        </div>
                        <h3 className={styles.evaluationTitle}>
                          Evaluación {evaluation.evaluationNumber}
                        </h3>
                      </div>
                    </div>
                    
                    <div className={styles.evaluationBody}>
                      <div className={styles.evaluationDescription}>
                        <FileText size={16} />
                        <div>{renderContent(evaluation.description)}</div>
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
                        <Percent size={14} />
                        <span className={styles.evaluationWeight}>{evaluation.weighting}</span>
                      </div>
                      <div className={styles.weightBarContainer}>
                        <div 
                          className={styles.weightBar} 
                          style={{width: `${weightValue}%`}}
                        ></div>
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
                  <div key={week} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>
                        <Monitor size={20} />
                        <span>Semana {week}</span>
                      </h3>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.classList}>
                        {classes.map((classItem, idx) => (
                          <div key={idx} className={styles.classItem}>
                            <div className={styles.classHeader}>
                              <span className={styles.classNumber}>Clase {classItem.class}:</span>
                              <div className={styles.dateContainer}>
                                <div className={styles.evaluationDateWrapper}>
                                  <Clock size={14} />
                                  <span className={styles.evaluationDate}>{classItem.date}</span>
                                </div>
                              </div>
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
                  <div key={week} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>
                        <Calendar size={20} />
                        <span>Semana {week}</span>
                      </h3>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.lectureList}>
                        {lectures.map((lecture, idx) => (
                          <div key={idx} className={styles.lectureItem}>
                            <div className={styles.lectureHeader}>
                              <span className={styles.lectureNumber}>Lectura {lecture.lecture}:</span>
                              <div className={styles.dateContainer}>
                                <div className={styles.evaluationDateWrapper}>
                                  <Clock size={14} />
                                  <span className={styles.evaluationDate}>{lecture.date}</span>
                                </div>
                              </div>
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
        {/* Pestaña Flashcards */}
        {activeTab === 'flashcards' && hasFlashcards && (
          <div className={styles.tabContent}>
            <h2 className={styles.sectionTitle}>Flashcards</h2>
            {flashcardTopics.map(topic => (
              <div key={topic.slug} className={styles.flashcardTopic}>
                <h3 className={styles.flashcardTopicName}>{topic.name}</h3>
                <div className={styles.flashcardDecks}>
                  {topic.decks.map(deck => (
                    <Link
                      key={deck.id}
                      href={`/inacap/${courseId}/flashcards/${topic.slug}/${deck.number}`}
                      className={styles.flashcardDeckCard}
                    >
                      <Layers size={18} />
                      <span>Mazo {deck.number}</span>
                      <span className={styles.flashcardDeckCount}>{deck.cardCount} cartas</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;