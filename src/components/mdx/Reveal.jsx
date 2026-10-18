'use client'
import { useState } from 'react';
import styles from './Reveal.module.css';

export function Reveal({ children, placeholder = '···' }) {
  const [shown, setShown] = useState(false);

  return (
    <button
      type="button"
      className={`${styles.reveal} ${shown ? styles.shown : ''}`}
      onClick={() => setShown((prev) => !prev)}
      aria-pressed={shown}
      aria-label={shown ? 'Ocultar respuesta' : 'Mostrar respuesta'}
    >
      <span
        key={shown ? 'shown' : 'hidden'}
        className={shown ? styles.contentIn : styles.contentOut}
      >
        {shown ? children : placeholder}
      </span>
    </button>
  );
}

export default Reveal;
