import { useState, useEffect, useRef } from 'react'
import styles from './SmartFigure.module.css'

// La numeración la inyecta remark-auto-number en build time (prop `number`).
// FigureProvider queda como passthrough por compatibilidad.
export function FigureProvider({ children }) {
  return <>{children}</>
}

export default function SmartFigure({
  src,
  alt = '',
  caption,
  id,
  width,
  height,
  center = true,
  lightbox = false,
  className = '',
  size = 'auto', // 'small', 'medium', 'large', 'auto'
  autoNumber = true,
  number, // inyectado por remark-auto-number en build
  ...props
}) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const lightboxScrollRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Cerrar lightbox con ESC y manejar scroll
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isLightboxOpen && !isClosing) {
        closeLightbox()
      }
    }

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true)
      }
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Set new timeout
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      
      // Add scroll listener to lightbox container
      const lightboxElement = lightboxScrollRef.current
      if (lightboxElement) {
        lightboxElement.addEventListener('scroll', handleScroll)
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      const lightboxElement = lightboxScrollRef.current
      if (lightboxElement) {
        lightboxElement.removeEventListener('scroll', handleScroll)
      }
      
      if (!isLightboxOpen) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isLightboxOpen, isClosing, isScrolling])

  const openLightbox = () => {
    if (lightbox) {
      setIsLightboxOpen(true)
      setIsClosing(false)
    }
  }

  const closeLightbox = () => {
    if (isScrolling) return // No cerrar si se está haciendo scroll
    
    setIsClosing(true)
    // Esperar a que termine la animación antes de cerrar
    setTimeout(() => {
      setIsLightboxOpen(false)
      setIsClosing(false)
    }, 300) // Duración de la animación de cierre
  }

  const handleLightboxClick = (e) => {
    // Solo cerrar si el click es en el fondo del lightbox, no en la imagen o durante scroll
    if (e.target === e.currentTarget && !isScrolling) {
      closeLightbox()
    }
  }

  // Clases simplificadas - centrado y tamaños manejados con estilos inline
  const figureClasses = [
    styles.figure,
    className
  ].filter(Boolean).join(' ')

  const imageClasses = [
    styles.image,
    lightbox && styles.lightboxEnabled
  ].filter(Boolean).join(' ')

  const customStyles = {
    ...(width && { width }),
    ...(height && { height }),
  }

  // Estilos de centrado garantizados
  const imageStyle = {
    ...customStyles,
    maxWidth: size === 'small' ? '300px' :
              size === 'medium' ? '500px' :
              size === 'large' ? '700px' : '100%',
    height: 'auto',
    ...(center && {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    }),
  }

  const figureStyle = {}

  // El contenedor se ajusta al ancho real de la imagen (fit-content) para
  // que el caption, alineado a la izquierda, quede pegado al borde de la
  // imagen y no al borde completo del figure
  const innerStyle = {
    width: 'fit-content',
    maxWidth: '100%',
    ...(center && {
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
  }

  // Construir caption con numeración (número inyectado en build)
  const fullCaption = autoNumber && number ?
    `Figura ${number}${caption ? `: ${caption}` : ''}` :
    caption

  return (
    <>
      <figure id={id} className={figureClasses} style={figureStyle} {...props}>
        <div style={innerStyle}>
          {fullCaption && (
            <figcaption className={styles.caption}>
              {fullCaption}
            </figcaption>
          )}
          <img
            src={src}
            alt={alt}
            className={imageClasses}
            style={imageStyle}
            onClick={openLightbox}
            loading="lazy"
          />
        </div>
      </figure>

      {/* Lightbox con scroll vertical */}
      {isLightboxOpen && (
        <div
          ref={lightboxScrollRef}
          className={`${styles.lightbox} ${isClosing ? styles.closing : ''}`}
          onClick={handleLightboxClick}
        >
          <div className={`${styles.lightboxContent} ${isClosing ? styles.closing : ''}`}>
            <img
              src={src}
              alt={alt}
              className={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botón de cerrar */}
            <button
              onClick={closeLightbox}
              className={styles.closeButton}
              aria-label="Cerrar lightbox"
            >
              ×
            </button>

            {/* Caption en lightbox */}
            {fullCaption && (
              <div className={styles.lightboxCaption}>
                {fullCaption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

// Componente para referencias cruzadas (número resuelto en build)
export function FigureRef({ id, number }) {
  const figureNumber = number

  if (!figureNumber) {
    return <span className={styles.figureRefError}>[Fig. ?]</span>
  }

  return (
    <a 
      href={`#${id}`} 
      className={styles.figureRef}
    >
      Figura {figureNumber}
    </a>
  )
}