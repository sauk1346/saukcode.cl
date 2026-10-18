"use client"
import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './TableOfContents.module.css';

const TableOfContents = () => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const activeIdRef = useRef(''); 
  const tocRef = useRef(null);
  const wrapperRef = useRef(null);
  const activeItemRef = useRef(null);
  const [isAtTop, setIsAtTop] = useState(true);
  
  // Obtener los encabezados con sus rangos de posición
  useEffect(() => {
    const getHeadings = () => {
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(element => element.id);
      
      elements.sort((a, b) => {
        const posA = a.getBoundingClientRect().top + window.scrollY;
        const posB = b.getBoundingClientRect().top + window.scrollY;
        return posA - posB;
      });
      
      const headingsList = elements.map((element, index) => {
        const id = element.id;
        const text = element.textContent;
        const level = Number(element.tagName.substring(1));
        const startPosition = element.getBoundingClientRect().top + window.scrollY;
        
        let endPosition;
        if (index < elements.length - 1) {
          endPosition = elements[index + 1].getBoundingClientRect().top + window.scrollY;
        } else {
          endPosition = document.body.scrollHeight;
        }
        
        return { id, text, level, startPosition, endPosition };
      });
      
      setHeadings(headingsList);
    };

    getHeadings();

    const observer = new MutationObserver(() => {
      setTimeout(getHeadings, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Determinar encabezado activo y controlar isAtTop
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 200;
    const isNearTop = window.scrollY < 100;
    
    setIsAtTop(isNearTop);
    
    let foundActiveHeading = false;
    
    for (const heading of headings) {
      if (scrollPosition >= heading.startPosition && scrollPosition < heading.endPosition) {
        if (activeIdRef.current !== heading.id) {
          activeIdRef.current = heading.id;
          setActiveId(heading.id);
        }
        foundActiveHeading = true;
        break;
      }
    }
    
    if (!foundActiveHeading && scrollPosition < (headings[0]?.startPosition || 0)) {
      if (activeIdRef.current !== '') {
        activeIdRef.current = '';
        setActiveId('');
      }
    }
  }, [headings]);

  // Implementación con throttling para el scroll
  useEffect(() => {
    let ticking = false;
    
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener);
    handleScroll();
    
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  // Efecto específico para controlar el scroll de la tabla cuando estamos al inicio
  useEffect(() => {
    if (isAtTop && tocRef.current) {
      // Usar setTimeout para asegurarnos de que esto ocurra después de otras actualizaciones
      setTimeout(() => {
        tocRef.current.scrollTop = 0;
      }, 50);
    }
  }, [isAtTop]);

  // Scroll automático para los elementos activos
  useEffect(() => {
    if (!isAtTop && activeId && activeItemRef.current && tocRef.current) {
      const activeElement = activeItemRef.current;
      const container = tocRef.current;
      
      const activeRect = activeElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      const isAbove = activeRect.top < containerRect.top;
      const isBelow = activeRect.bottom > containerRect.bottom;
      
      if (isAbove) {
        container.scrollTop = activeElement.offsetTop - container.offsetTop - 10;
      } else if (isBelow) {
        container.scrollTop = (activeElement.offsetTop - container.offsetTop) - 
                             (containerRect.height - activeRect.height) + 10;
      }
    }
  }, [activeId, isAtTop]);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      activeIdRef.current = id;
      setActiveId(id);
      
      // Si el elemento está cerca de la parte superior, marcar como inicio
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      if (elementPosition < 100) {
        setIsAtTop(true);
      }
    }
  };

  // Agregar un handler para el botón "Volver arriba" si existe
  useEffect(() => {
    const topButton = document.querySelector('a[href="#top"], a[href="#"], .back-to-top');
    if (topButton) {
      const handleTopClick = () => {
        setIsAtTop(true);
        if (tocRef.current) {
          setTimeout(() => {
            tocRef.current.scrollTop = 0;
          }, 100);
        }
      };
      
      topButton.addEventListener('click', handleTopClick);
      return () => topButton.removeEventListener('click', handleTopClick);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <div ref={wrapperRef} className={styles.tocWrapper}>
      <div 
        ref={tocRef} 
        id="table-of-contents" 
        className={`${styles.tocContainer} ${styles.footerSpace}`}
      >
        <h3 className={styles.tocHeading}>Tabla de Contenidos</h3>
        <nav>
          <ul className={styles.tocList}>
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`${styles.tocItem} ${styles[`level${heading.level}`]}`}
                ref={activeId === heading.id ? activeItemRef : null}
              >
                <a 
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(heading.id);
                  }}
                  className={`${styles.tocLink} ${activeId === heading.id ? styles.active : ''}`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;