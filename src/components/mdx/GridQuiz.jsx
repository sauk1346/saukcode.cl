'use client'
import React, { useState, useEffect, useRef } from 'react';
import QuizHearts from './QuizHearts.jsx';
import { spawnCoinBurst } from '../ui/coinBurst.js';
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
  const rootRef = useRef(null);
  const celebratedRef = useRef(false);

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
      spawnCoinBurst(rootRef.current, 30);
    }
    if (!allCorrect) {
      celebratedRef.current = false;
    }
  }, [allCorrect]);

  return (
    <div className={styles.gridQuizContainer} ref={rootRef}>
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
