/**
 * Link Builder - Utilidades centralizadas para construir rutas
 *
 * Este módulo proporciona funciones helper para construir rutas de manera consistente
 * en toda la aplicación, evitando duplicación y errores de tipeo.
 */

/**
 * Construye un link a un recurso estático dentro de un curso (PDFs, documentos, etc.)
 *
 * @param {string} section - Sección del sitio
 * @param {string} courseId - ID del curso
 * @param {string} resourcePath - Ruta del recurso (ej: 'docs/archivo.pdf')
 * @returns {string} Ruta completa
 *
 * @example
 * buildCourseResourceLink('inacap', 'tihv43', 'docs/ResumenEjecutivo.pdf')
 * // Returns: '/inacap/tihv43/docs/ResumenEjecutivo.pdf'
 */
export const buildCourseResourceLink = (section, courseId, resourcePath) => {
  if (!section || !courseId || !resourcePath) {
    console.warn('buildCourseResourceLink: Missing required parameters', { section, courseId, resourcePath });
    return '#';
  }
  // Remover slash inicial del resourcePath si existe
  const cleanPath = resourcePath.startsWith('/') ? resourcePath.slice(1) : resourcePath;
  return `/${section}/${courseId}/${cleanPath}`;
};
