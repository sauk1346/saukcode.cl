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
        
        {/* ✨ NUEVO: Icono visual para enlaces de YouTube */}
        {isYouTube && (
          <svg
            className={styles.youtubeIcon}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              className={styles.youtubeBody}
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
            />
            <path
              className={styles.youtubePlay}
              d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
        )}

        {/* Icono visual para enlaces externos (no archivos, no YouTube) */}
        {isExternal && !isFileLink && !isYouTube && (
          <svg
            className={styles.externalIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
        
        {/* Icono visual para archivos PDF */}
        {isPdfFile && (
          <svg
            className={styles.pdfIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12v5M12 12v5M8 12v5M12 3v6a1 1 0 001 1h6"
            />
          </svg>
        )}
        
        {/* ✨ NUEVO: Icono visual para archivos de audio */}
        {isAudioFile && (
          <svg
            className={styles.musicIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
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
    </Link>
  );
};

// Export default para mayor flexibilidad de import
export default SmartLink;