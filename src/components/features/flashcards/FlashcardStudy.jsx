'use client';

import { useState, useCallback } from 'react';
import { RotateCcw, Check, X, Shuffle } from 'lucide-react';
import CardRenderer from './CardRenderer';
import styles from './FlashcardStudy.module.css';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardStudy({ cards, topicName, deckNumber, layout }) {
  const [shuffled, setShuffled] = useState(false);
  const [deck, setDeck] = useState(cards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = deck[index];
  const total = deck.length;

  const toggleShuffle = useCallback(() => {
    setShuffled(prev => {
      const next = !prev;
      setDeck(next ? shuffleArray(cards) : [...cards]);
      setIndex(0);
      setFlipped(false);
      setTransitioning(false);
      setCorrect(0);
      setIncorrect(0);
      setFinished(false);
      return next;
    });
  }, [cards]);

  const markAnswer = useCallback((isCorrect) => {
    if (isCorrect) setCorrect(c => c + 1);
    else setIncorrect(i => i + 1);

    const isLast = index === total - 1;

    if (isLast) {
      setFlipped(false);
      setTimeout(() => setFinished(true), 500);
    } else {
      setTransitioning(true);
      // Cambia el contenido cuando la carta está de canto (~270°), invisible
      setTimeout(() => setIndex(i => i + 1), 225);
    }
  }, [index, total]);

  const handleAnimationEnd = useCallback(() => {
    setTransitioning(false);
    setFlipped(false);
  }, []);

  const restart = useCallback(() => {
    const nextDeck = shuffled ? shuffleArray(cards) : [...cards];
    setDeck(nextDeck);
    setIndex(0);
    setFlipped(false);
    setTransitioning(false);
    setCorrect(0);
    setIncorrect(0);
    setFinished(false);
  }, [cards, shuffled]);

  if (finished) {
    const score = correct;
    const pct = Math.round((correct / total) * 100);
    return (
      <div className={styles.finished}>
        <div className={styles.finishedCard}>
          <h2 className={styles.finishedTitle}>Resultado</h2>
          <div className={styles.score}>
            <span className={styles.scoreNumber}>{score}</span>
            <span className={styles.scoreTotal}>/ {total}</span>
          </div>
          <div className={styles.scorePct}>{pct}%</div>
          <div className={styles.scoreSummary}>
            <span className={styles.correctCount}><Check size={16} /> {correct} correctas</span>
            <span className={styles.incorrectCount}><X size={16} /> {incorrect} incorrectas</span>
          </div>
          <button className={styles.retryBtn} onClick={restart}>
            <RotateCcw size={16} />
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Cabecera */}
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.topicName}>{topicName}</span>
          <span className={styles.deckLabel}>Mazo {deckNumber}</span>
        </div>
        <div className={styles.controls}>
          <button
            className={`${styles.shuffleBtn} ${shuffled ? styles.shuffleActive : ''}`}
            onClick={toggleShuffle}
            title="Barajar"
          >
            <Shuffle size={16} />
          </button>
          <span className={styles.progress}>{index + 1} / {total}</span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>

      {/* Carta */}
      <div
        className={`${styles.cardWrapper} ${flipped && !transitioning ? styles.flipped : ''} ${transitioning ? styles.transitioning : ''}`}
        onClick={() => !transitioning && setFlipped(f => !f)}
      >
        <div className={styles.cardInner} onAnimationEnd={handleAnimationEnd}>
          <div className={styles.cardFront}>
            <div className={styles.cardContent}>
              <div className={styles.cardSideLabel}>Pregunta</div>
              <CardRenderer content={current.front} layout={layout} />
            </div>
          </div>
          <div className={styles.cardBack}>
            <div className={styles.cardContent}>
              <div className={styles.cardSideLabel}>Respuesta</div>
              <CardRenderer content={current.back} layout={layout} />
            </div>
          </div>
        </div>
      </div>

      <p className={styles.flipHint}>Haz clic en la carta para voltearla</p>

      {/* Botones correcto / incorrecto */}
      <div className={styles.answerButtons} style={{ visibility: flipped && !transitioning ? 'visible' : 'hidden' }}>
        <button
          className={`${styles.answerBtn} ${styles.incorrectBtn}`}
          onClick={() => markAnswer(false)}
        >
          <X size={20} />
          Incorrecto
        </button>
        <button
          className={`${styles.answerBtn} ${styles.correctBtn}`}
          onClick={() => markAnswer(true)}
        >
          <Check size={20} />
          Correcto
        </button>
      </div>

    </div>
  );
}
