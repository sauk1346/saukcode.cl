/**
 * Configuraciones de animación reutilizables para Framer Motion
 * Centralizadas para mantener consistencia en toda la aplicación
 */

// ============================================
// VARIANTES DE ANIMACIÓN BASE
// ============================================

/**
 * Fade in simple
 */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Fade in desde abajo (slide up)
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

/**
 * Fade in desde arriba (slide down)
 */
export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Fade in desde la izquierda
 */
export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

/**
 * Fade in desde la derecha
 */
export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

/**
 * Scale in (zoom)
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// ============================================
// VARIANTES PARA CONTENEDORES CON STAGGER
// ============================================

/**
 * Contenedor con stagger para hijos
 * @param {number} staggerChildren - Delay entre cada hijo (default: 0.1)
 * @param {number} delayChildren - Delay inicial antes del primer hijo (default: 0)
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Item hijo para usar dentro de staggerContainer
 */
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Item hijo con scale para grids
 */
export const staggerScaleItem = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================
// VARIANTES PARA HOVER Y TAP
// ============================================

/**
 * Hover lift effect para cards
 */
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: 0.2,
    ease: 'easeOut',
  },
};

/**
 * Tap effect para elementos interactivos
 */
export const tapScale = {
  scale: 0.98,
  transition: {
    duration: 0.1,
  },
};

/**
 * Hover glow effect
 */
export const hoverGlow = {
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  transition: {
    duration: 0.3,
  },
};

// ============================================
// VARIANTES PARA MENÚ MÓVIL
// ============================================

/**
 * Menú overlay (fondo oscuro)
 */
export const menuOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Menú slide desde la derecha
 */
export const menuSlide = {
  initial: { x: '100%' },
  animate: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Items del menú con stagger
 */
export const menuItemVariants = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.15,
    },
  },
};

// ============================================
// VARIANTES PARA TRANSICIONES DE PÁGINA
// ============================================

/**
 * Transición de página básica
 */
export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================
// CONFIGURACIONES DE VIEWPORT PARA SCROLL
// ============================================

/**
 * Configuración de viewport para animaciones al scroll
 */
export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: '-50px',
};

/**
 * Viewport más sensible (trigger más temprano)
 */
export const viewportEarly = {
  once: true,
  amount: 0.1,
  margin: '-100px',
};

// ============================================
// TRANSICIONES COMUNES
// ============================================

export const transitions = {
  spring: {
    type: 'spring',
    damping: 20,
    stiffness: 300,
  },
  smooth: {
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1],
  },
  fast: {
    duration: 0.2,
    ease: 'easeOut',
  },
  slow: {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

// ============================================
// HELPERS
// ============================================

/**
 * Crear variante de fade in con dirección y distancia personalizadas
 * @param {string} direction - 'up' | 'down' | 'left' | 'right'
 * @param {number} distance - Distancia en píxeles
 */
export const createFadeIn = (direction = 'up', distance = 20) => {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? distance : -distance;

  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    exit: { opacity: 0, [axis]: value },
  };
};

/**
 * Crear contenedor stagger personalizado
 * @param {Object} options
 */
export const createStaggerContainer = ({
  stagger = 0.1,
  delay = 0,
  when = 'beforeChildren'
} = {}) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
      when,
    },
  },
});

// ============================================
// VARIANTES PARA SCROLL REVEAL
// ============================================

/**
 * Scroll reveal con blur (efecto moderno)
 */
export const scrollRevealBlur = {
  initial: { opacity: 0, filter: 'blur(10px)', y: 20 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Scroll reveal con escala
 */
export const scrollRevealScale = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Parallax suave para elementos de fondo
 */
export const parallaxSlow = {
  initial: { y: 50 },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};
