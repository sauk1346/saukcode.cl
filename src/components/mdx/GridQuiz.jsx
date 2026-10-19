'use client'
import React, { useState, useEffect, useRef } from 'react';
import QuizHearts from './QuizHearts.jsx';
import styles from './GridQuiz.module.css';

const GridRow = ({ label, columns, correctIndex, selected, onSelect }) => {
  return (
    <tr className={styles.row}>
      <td className={styles.termCell}>{label}</td>
      {columns.map((_, index) => {
        const isSelected = selected === index;
        let cellClass = styles.cell;
        if (isSelected) {
          cellClass += ` ${index === correctIndex ? styles.correctCell : styles.incorrectCell}`;
        }

        return (
          <td
            key={index}
            className={cellClass}
            onClick={() => onSelect(index)}
            role="button"
            aria-label={`${label} - ${columns[index]}`}
          >
            {isSelected && (index === correctIndex ? '✓' : '✗')}
          </td>
        );
      })}
    </tr>
  );
};

export const GridQuiz = ({ title, columns, rows }) => {
  const [selections, setSelections] = useState(() => rows.map(() => null));
  const [heartsLost, setHeartsLost] = useState(0);
  const wrongRowsRef = useRef(new Set());
  const confettiCanvasRef = useRef(null);
  const celebratedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.confettiLoaded) {
      import('canvas-confetti').then(module => {
        window.confetti = module.default;
        window.confettiLoaded = true;
      }).catch(error => {
        console.warn('Error al cargar canvas-confetti:', error);
      });
    }
  }, []);

  const triggerConfetti = () => {
    if (typeof window !== 'undefined' && window.confetti) {
      try {
        // Confeti pixel: cuadrados planos en la paleta del sistema
        const pixelConfetti = {
          shapes: ['square'],
          flat: true,
          scalar: 1.4,
          gravity: 1.3,
          ticks: 130,
          colors: ['#66cf7a', '#7e96f2', '#f2c14e', '#e887bc', '#67c7db'],
          disableForReducedMotion: true,
        };
        const myConfetti = window.confetti.create(confettiCanvasRef.current, {
          resize: true,
          useWorker: true
        });
        myConfetti({ ...pixelConfetti, particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (error) {
        console.warn('Error al disparar confetti:', error);
      }
    }
  };

  const handleSelect = (rowIndex, colIndex) => {
    // máx. una vida perdida por término
    if (colIndex !== rows[rowIndex].correct && !wrongRowsRef.current.has(rowIndex)) {
      wrongRowsRef.current.add(rowIndex);
      setHeartsLost((h) => Math.min(h + 1, 3));
    }
    setSelections((prev) => {
      const next = [...prev];
      next[rowIndex] = colIndex;
      return next;
    });
  };

  const answeredCount = selections.filter((s) => s !== null).length;
  const correctCount = selections.filter((s, i) => s === rows[i].correct).length;
  const allAnswered = answeredCount === rows.length;
  const allCorrect = allAnswered && correctCount === rows.length;

  useEffect(() => {
    if (allCorrect && !celebratedRef.current) {
      celebratedRef.current = true;
      triggerConfetti();
    }
    if (!allCorrect) {
      celebratedRef.current = false;
    }
  }, [allCorrect]);

  return (
    <div className={styles.gridQuizContainer}>
      <canvas ref={confettiCanvasRef} className={styles.confettiCanvas} />
      {title && <div className={styles.title}>{title}</div>}
      <QuizHearts lost={heartsLost} />
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.termHeader}>Término</th>
              {columns.map((col, i) => (
                <th key={i} className={styles.colHeader}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <GridRow
                key={i}
                label={row.label}
                columns={columns}
                correctIndex={row.correct}
                selected={selections[i]}
                onSelect={(colIndex) => handleSelect(i, colIndex)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {allCorrect && heartsLost === 0 && <div className={styles.perfectPop}>PERFECT</div>}
      {allAnswered && (
        <div className={`${styles.feedback} ${allCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
          {allCorrect
            ? '¡Correcto! Clasificaste todos los términos correctamente.'
            : `Obtuviste ${correctCount} de ${rows.length} correctas. Puedes cambiar tus respuestas cuando quieras.`}
        </div>
      )}
    </div>
  );
};

export default GridQuiz;
