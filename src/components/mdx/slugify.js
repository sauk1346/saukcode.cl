// src/components/mdx/utils/slugify.js

/**
 * Función para generar IDs de encabezados
 * Maneja tanto strings como objetos React (children complejos)
 */
export function getSlug(text) {
    if (typeof text !== 'string' && typeof text !== 'object') {
      return '';
    }
    
    let textContent = '';
    
    if (typeof text === 'string') {
      textContent = text;
    } else if (Array.isArray(text)) {
      textContent = text.map(item => {
        if (typeof item === 'string') return item;
        if (item && item.props && item.props.children) {
          return typeof item.props.children === 'string'
            ? item.props.children
            : '';
        }
        return '';
      }).join('');
    } else if (text && text.props && text.props.children) {
      textContent = typeof text.props.children === 'string'
        ? text.props.children
        : '';
    }
    
    return textContent
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }