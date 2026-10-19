'use client';

import { useState, useCallback } from 'react';
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
    const pct = Math.round((correct / total) * 100);
    // Rango arcade: S dorado (≥90), A verde, B azul, C gris
    const rank = pct >= 90 ? 'S' : pct >= 70 ? 'A' : pct >= 50 ? 'B' : 'C';
    const rankClass = { S: styles.rankS, A: styles.rankA, B: styles.rankB, C: styles.rankC }[rank];
    return (
      <div className={styles.finished}>
        <div className={styles.finishedCard}>
          <h2 className={styles.finishedTitle}>DECK CLEAR</h2>
          <div className={styles.rankRow}>
            <span className={styles.rankLabel}>rank</span>
            <span className={`${styles.rankLetter} ${rankClass}`}>{rank}</span>
          </div>
          <div className={styles.score}>
            <span className={styles.scoreNumber}>{correct}</span>
            <span className={styles.scoreTotal}>/{total}</span>
          </div>
          <div className={styles.scorePct}>{pct}%</div>
          {pct === 100 && <div className={styles.perfectPop}>PERFECT</div>}
          <div className={styles.scoreSummary}>
            <span className={styles.correctCount}>✓ {correct} correctas</span>
            <span className={styles.incorrectCount}>✗ {incorrect} incorrectas</span>
          </div>
          <button className={styles.retryBtn} onClick={restart}>
            ⟲ Reintentar
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
          <span className={styles.scoreLive} aria-label={`${correct} correctas, ${incorrect} incorrectas`}>
            <span className={styles.okCount}>✓ {correct}</span>
            <span className={styles.badCount}>✗ {incorrect}</span>
          </span>
          <button
            className={`${styles.shuffleBtn} ${shuffled ? styles.shuffleActive : ''}`}
            onClick={toggleShuffle}
            title="Barajar"
            aria-pressed={shuffled}
          >
            ⇄
          </button>
          <span className={styles.progress}>{index + 1}/{total}</span>
        </div>
      </div>

      {/* Barra de progreso: una celda por carta */}
      <div
        className={`${styles.progressBar} ${
          (index + 1) / total >= 0.7
            ? styles.tierHigh
            : (index + 1) / total >= 0.35
              ? styles.tierMid
              : styles.tierLow
        }`}
        role="img"
        aria-label={`Carta ${index + 1} de ${total}`}
      >
        {deck.map((_, i) => (
          <span
            key={i}
            className={`${styles.progressCell} ${i < index ? styles.cellDone : ''} ${i === index ? styles.cellCurrent : ''}`}
          ></span>
        ))}
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
          ✗ Incorrecto
        </button>
        <button
          className={`${styles.answerBtn} ${styles.correctBtn}`}
          onClick={() => markAnswer(true)}
        >
          ✓ Correcto
        </button>
      </div>

    </div>
  );
}
