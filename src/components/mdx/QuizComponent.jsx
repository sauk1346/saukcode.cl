import React, { useState, useRef } from 'react';
import QuizHearts from './QuizHearts.jsx';
import { spawnCoinBurst } from '../ui/coinBurst.js';
import styles from './QuizComponent.module.css';

export const QuizQuestion = ({ question, questionItems, questionSuffix, options, correctIndex, questionNumber, onWrong, onCorrect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const wrongOnceRef = useRef(false); // máx. una vida perdida por pregunta
  
  
  const handleOptionClick = (index, buttonEl) => {
    setSelectedOption(index);
    if (index === correctIndex) {
      spawnCoinBurst(buttonEl);
      onCorrect?.();
    } else if (!wrongOnceRef.current) {
      wrongOnceRef.current = true;
      onWrong?.();
    }
  };
  
  return (
    <div className={styles.questionContainer}>
      {/* Estructura modificada para mejorar la sangría */}
      <div className={styles.questionTitleWrapper}>
        <span className={styles.questionNumber}>{questionNumber}.</span>
        <div className={styles.questionText}>
          {questionItems ? (
            <>
              <p>{question}</p>
              <ol className={styles.questionList}>
                {questionItems.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
              {questionSuffix && <p>{questionSuffix}</p>}
            </>
          ) : question}
        </div>
      </div>
      
      <div className={styles.optionsContainer}>
        {options.map((option, index) => {
          // Convertir el índice numérico a letra (0 -> a, 1 -> b, etc.)
          const letter = String.fromCharCode(97 + index);
          
          return (
            <button
              key={index}
              onClick={(e) => handleOptionClick(index, e.currentTarget)}
              className={`${styles.optionButton} ${
                selectedOption === index
                  ? index === correctIndex
                    ? styles.correctOption
                    : styles.incorrectOption
                  : ''
              }`}
            >
              <div className={styles.optionContent}>
                <span className={styles.optionLetter}>{letter}</span>
                <span className={styles.optionText}>{option}</span>
              </div>
              {selectedOption === index && (
                <span className={styles.iconContainer}>
                  {index === correctIndex ? (
                    <svg className={styles.correctIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg className={styles.incorrectIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      {selectedOption !== null && (
        <div className={styles.feedback}>
          <div
            className={`${styles.verdict} ${
              selectedOption === correctIndex ? styles.verdictOk : styles.verdictBad
            }`}
          >
            {selectedOption === correctIndex ? 'CORRECTO' : 'INCORRECTO'}
          </div>
        </div>
      )}
    </div>
  );
};

export const Quiz = ({ questions }) => {
  // Vidas del quiz completo: el error cuesta, pero nunca bloquea
  const [heartsLost, setHeartsLost] = useState(0);
  const [correctIds, setCorrectIds] = useState(() => new Set());
  const loseHeart = () => setHeartsLost((h) => Math.min(h + 1, 3));
  const markCorrect = (i) => setCorrectIds((prev) => new Set(prev).add(i));
  const isPerfect = questions.length > 0 && correctIds.size === questions.length && heartsLost === 0;

  return (
    <div className={styles.quizContainer}>
      <QuizHearts lost={heartsLost} />
      {questions.map((q, index) => (
        <QuizQuestion
          key={index}
          question={q.question}
          questionItems={q.questionItems}
          questionSuffix={q.questionSuffix}
          options={q.options}
          correctIndex={q.correctIndex}
          questionNumber={index + 1}
          onWrong={loseHeart}
          onCorrect={() => markCorrect(index)}
        />
      ))}
      {isPerfect && <div className={styles.perfectPop}>PERFECT</div>}
    </div>
  );
};