import React from 'react';
import PixelGlyph from '../ui/PixelGlyph.jsx';
import styles from './QuizHearts.module.css';

// Vidas del quiz: se pierden de derecha a izquierda, nunca bloquean.
const QuizHearts = ({ total = 3, lost = 0 }) => (
  <div className={styles.hearts} role="img" aria-label={`${total - lost} de ${total} vidas`}>
    {Array.from({ length: total }, (_, i) => (
      <span key={i} className={`${styles.heart} ${i >= total - lost ? styles.lostHeart : ''}`}>
        <PixelGlyph name="corazon" size={16} />
      </span>
    ))}
  </div>
);

export default QuizHearts;
