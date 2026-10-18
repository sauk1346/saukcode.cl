'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { viewportConfig } from '@/utils/animations';

// Variantes para el contenedor de la tabla
const tableContainerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Variantes para las filas con stagger
const tableBodyVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

// Variantes para cada fila
const rowVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

/**
 * Componente AnimatedTableWrapper
 * Envuelve una tabla para añadir animación de entrada
 */
export const AnimatedTableWrapper = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      variants={tableContainerVariants}
      initial="initial"
      whileInView="animate"
      viewport={viewportConfig}
    >
      {children}
    </motion.div>
  );
};

/**
 * Componente AnimatedTableBody
 * Reemplaza tbody para añadir animaciones staggered a las filas
 */
export const AnimatedTableBody = ({ children, ...props }) => {
  return (
    <motion.tbody
      variants={tableBodyVariants}
      initial="initial"
      animate="animate"
      {...props}
    >
      {children}
    </motion.tbody>
  );
};

/**
 * Componente AnimatedTableRow
 * Reemplaza tr para añadir animación individual
 */
export const AnimatedTableRow = ({ children, className, ...props }) => {
  return (
    <motion.tr
      className={className}
      variants={rowVariants}
      whileHover={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        transition: { duration: 0.05 },
      }}
      {...props}
    >
      {children}
    </motion.tr>
  );
};

// Export las variantes para uso directo si se necesita
export { tableContainerVariants, tableBodyVariants, rowVariants };
