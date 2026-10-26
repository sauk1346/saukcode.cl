import React from 'react';
import Link from 'next/link';
import styles from './SmartLink.module.css';

export const SmartLink = ({ href, children, newTab, className, ...props }) => {
  // Detección más precisa de enlaces externos
  const isExternal = href && (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
  
  // Detección ampliada de archivos (case insensitive)
  const isFileLink = href && /\.(csv|pdf|xlsx|docx|zip|rar|jpg|jpeg|png|gif|svg|webp|mp4|mp3|avi|mov)$/i.test(href);
  
  // ✨ NUEVO: Detectar si es un archivo de audio
  const isAudioFile = href && /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(href);
  
  // Detectar si es un archivo PDF
  const isPdfFile = href && href.toLowerCase().includes('.pdf');
  const isExcelFile = href && /\.(xlsx|xls|csv)$/i.test(href);

  // Detectar mazos de flashcards (rutas internas /flashcards/)
  const isFlashcards = href && href.includes('/flashcards/');

  // Detectar archivos de video locales
  const isVideoFile = href && /\.(mp4|avi|mov|webm)$/i.test(href);

  // ✨ NUEVO: Detectar si es un enlace de YouTube
  const isYouTube = href && /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)\//i.test(href);
  
  // Para enlaces externos o archivos, usar <a>
  if (isExternal || isFileLink) {
    return (
      <a
        href={href}
        className={`${styles.link} ${className || ''}`.trim()}
        target={newTab !== false ? "_blank" : undefined}
        rel={newTab !== false ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        
        {/* Chips de tipo de recurso: dicen qué se abre antes del click */}
        {(isYouTube || isVideoFile) && <span className={`${styles.chip} ${styles.chipVideo}`}>video</span>}
        {isPdfFile && <span className={`${styles.chip} ${styles.chipPdf}`}>pdf</span>}
        {isExcelFile && <span className={`${styles.chip} ${styles.chipExcel}`}>xlsx</span>}
        {isAudioFile && <span className={`${styles.chip} ${styles.chipAudio}`}>audio</span>}

        {/* Enlace externo común: flecha tipográfica */}
        {isExternal && !isFileLink && !isYouTube && (
          <span className={styles.externalArrow} aria-hidden="true">↗</span>
        )}
      </a>
    );
  }
  
  // Para enlaces internos, usar Link de Next.js
  return (
    <Link
      href={href}
      className={`${styles.link} ${className || ''}`.trim()}
      {...props}
    >
      {children}
      {isFlashcards && <span className={`${styles.chip} ${styles.chipFlashcards}`}>mazo</span>}
    </Link>
  );
};

// Export default para mayor flexibilidad de import
export default SmartLink;