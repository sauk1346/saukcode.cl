import React from 'react';
import katex from 'katex';
import styles from './SmartTable.module.css';

// La numeración la inyecta remark-auto-number en build time (prop `number`).
// TableProvider queda como passthrough por compatibilidad con MDX que aún lo envuelve.
export function TableProvider({ children }) {
  return <>{children}</>;
}

export function TableRef({ id, number }) {
  if (!number) {
    return <span className={styles.tableRefError}>[Tabla ?]</span>
  }

  return (
    <a href={`#${id}`} className={styles.tableRef}>
      Tabla {number}
    </a>
  )
}

// Colores disponibles para destacar filas (ver SmartTable.module.css)
const HIGHLIGHT_COLORS = ['yellow', 'green', 'blue', 'red', 'gray'];

const SmartTable = ({
  tableLayout = 'fixed', // 'fixed', 'auto', 'mixed'
  columnWidths = [], // Solo para tableLayout='mixed'
  lists = {},
  headers = [],
  rows = [],
  className = '',
  id,
  caption,
  autoNumber = true,
  number, // inyectado por remark-auto-number en build
  rowHeaders = false, // primera columna como encabezado de fila
  ...props
}) => {
  const tableNumber = number
  const fullCaption = autoNumber && tableNumber
    ? `Tabla ${tableNumber}${caption ? `: ${caption}` : ''}`
    : caption
  
  const processContent = (content) => {
    if (typeof content !== 'string') {
      return content;
    }
    
    const text = content.trim();
    
    // ========================================
    // CORCHETES ESCAPADOS: Detectar \[texto\] (solo si es todo el contenido)
    // ========================================
    const escapedBracketsMatch = text.match(/^\\\[([^\]]*)\\\]$/);
    if (escapedBracketsMatch) {
      const bracketContent = escapedBracketsMatch[1];
      return `[${bracketContent}]`; // Devolver texto literal con corchetes
    }
    
    // ========================================
    // PARÉNTESIS ESCAPADOS: Detectar \(texto\) (solo si es todo el contenido)
    // ========================================
    const escapedParenthesesMatch = text.match(/^\\\(([^)]*)\\\)$/);
    if (escapedParenthesesMatch) {
      const parenthesesContent = escapedParenthesesMatch[1];
      return `(${parenthesesContent})`; // Devolver texto literal con paréntesis
    }
    
    // ========================================
    // KATEX: Detectar fórmulas matemáticas $formula$ (solo si es todo el contenido)
    // ========================================
    const katexMatch = text.match(/^\$([^$]+)\$/);
    if (katexMatch) {
      const formula = katexMatch[1];
      try {
        const renderedFormula = katex.renderToString(formula, { 
          throwOnError: false,
          displayMode: false,
          output: 'htmlAndMathml',
          trust: true,
          strict: false
        });
        
        return (
          <span 
            className="katex-wrapper"
            style={{
              fontSize: '1.2em',
              lineHeight: '1.2',
              verticalAlign: 'baseline',
              display: 'inline-block'
            }}
            dangerouslySetInnerHTML={{ __html: renderedFormula }}
          />
        );
      } catch (error) {
        console.error('Error rendering KaTeX formula:', error);
        return (
          <span style={{ color: '#dc2626', fontStyle: 'italic' }}>
            [Error rendering: {formula}]
          </span>
        );
      }
    }
    
    // ========================================
    // MARKDOWN CODE: Detectar código inline `code` (solo si es todo el contenido)
    // ========================================
    const fullCodeMatch = text.match(/^`([^`]+)`$/);
    if (fullCodeMatch) {
      const code = fullCodeMatch[1];
      return (
        <code className={styles.inlineCode}>
          {code}
        </code>
      );
    }
    
    // ========================================
    // MARKDOWN BOLD: Detectar texto bold **texto** (solo si es todo el contenido)
    // ========================================
    const fullBoldMatch = text.match(/^\*\*([^*]+)\*\*$/);
    if (fullBoldMatch) {
      const boldText = fullBoldMatch[1];
      return (
        <strong className={styles.boldText}>
          {processContent(boldText)}
        </strong>
      );
    }
    
    // ========================================
    // MARKDOWN ITALIC: Detectar texto cursiva *texto* (solo si es todo el contenido)
    // ========================================
    const fullItalicMatch = text.match(/^\*([^*]+)\*$/);
    if (fullItalicMatch) {
      const italicText = fullItalicMatch[1];
      return (
        <em className={styles.italicText}>
          {processContent(italicText)}
        </em>
      );
    }
    
    // ========================================
    // AUDIO: Detectar archivos de audio con formato [texto](archivo.mp3)
    // ========================================
    const audioMatch = text.match(/\[([^\]]+)\]\(([^)]+\.(mp3|wav|ogg|m4a))\)/i);
    if (audioMatch) {
      const [, label, url] = audioMatch;
      const fullPath = url;
      return (
        <audio controls className={styles.audioPlayer}>
          <source src={fullPath} type="audio/mpeg" />
          {label}
        </audio>
      );
    }
    
    // ========================================
    // LISTAS: Referencias externas @listId
    // ========================================
    const listRefMatch = text.match(/^@(\w+)$/);
    if (listRefMatch) {
      const listId = listRefMatch[1];
      if (lists[listId]) {
        return (
          <ul className={styles.smartList}>
            {lists[listId].map((item, index) => (
              <li key={index} className={styles.smartListItem}>
                <div className={styles.smartListContent}>
                  {processContent(item)} {/* ← CAMBIO: Procesar cada item recursivamente */}
                </div>
              </li>
            ))}
          </ul>
        );
      } else {
        return (
          <div className={styles.errorMessage}>
            ⚠️ Lista "@{listId}" no encontrada
          </div>
        );
      }
    }
    
    // ========================================
    // LISTAS: Formato simple inline
    // ========================================
    
    // Lista no ordenada con corchetes: [item1,item2,item3] (solo si NO están escapados)
    const unorderedArrayMatch = text.match(/^(?<!\\)\[(.*)\]$/);
    if (unorderedArrayMatch) {
      const items = unorderedArrayMatch[1].split(',').map(item => item.trim()).filter(item => item);
      if (items.length > 0) {
        return (
          <ul className={styles.simpleList}>
            {items.map((item, index) => (
              <li key={index} className={styles.simpleListItem}>
                {processContent(item)} {/* ← CAMBIO: Procesar cada item recursivamente */}
              </li>
            ))}
          </ul>
        );
      }
    }
    
    // Lista ordenada con paréntesis: (item1,item2,item3) (solo si NO están escapados)
    const orderedArrayMatch = text.match(/^(?<!\\)\((.*)\)$/);
    if (orderedArrayMatch) {
      const items = orderedArrayMatch[1].split(',').map(item => item.trim()).filter(item => item);
      if (items.length > 0) {
        return (
          <ol className={styles.simpleList}>
            {items.map((item, index) => (
              <li key={index} className={styles.simpleListItem}>
                {processContent(item)} {/* ← CAMBIO: Procesar cada item recursivamente */}
              </li>
            ))}
          </ol>
        );
      }
    }
    
    // Lista no ordenada con punto y coma: item1;item2;item3
    if (text.includes(';')) {
      const items = text.split(';').map(item => item.trim()).filter(item => item);
      if (items.length > 1) {
        return (
          <ul className={styles.simpleList}>
            {items.map((item, index) => (
              <li key={index} className={styles.simpleListItem}>
                {processContent(item)} {/* ← CAMBIO: Procesar cada item recursivamente */}
              </li>
            ))}
          </ul>
        );
      }
    }
    
    // ========================================
    // CONTENIDO MIXTO: Detectar código inline `code`, fórmulas KaTeX $formula$, texto bold **texto**, cursiva *texto*, corchetes escapados \[texto\], paréntesis escapados \(texto\) y texto coloreado {{color:texto}} dentro de texto largo
    // ========================================
    if (text.includes('`') || text.includes('$') || text.includes('*') || text.includes('\\[') || text.includes('\\(') || text.includes('{{')) {
      const parts = [];
      let lastIndex = 0;

      // Regex combinado para detectar código, fórmulas KaTeX, texto bold, cursiva, corchetes escapados, paréntesis escapados y texto coloreado
      // IMPORTANTE: Bold (**) debe ir antes que italic (*) para evitar conflictos
      // IMPORTANTE: Corchetes y paréntesis escapados deben procesarse para contenido mixto también
      const mixedRegex = /(`([^`]+)`)|(\$([^$]+)\$)|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\\\[([^\]]*)\\\])|(\\\(([^)]*)\\\))|(\{\{(red|blue|green|gray|yellow)\:([^}]+)\}\})/g;
      let match;
      
      while ((match = mixedRegex.exec(text)) !== null) {
        // Agregar texto antes del elemento encontrado
        if (match.index > lastIndex) {
          const beforeText = text.slice(lastIndex, match.index);
          if (beforeText) {
            parts.push(
              <span key={`text-${lastIndex}`}>
                {beforeText}
              </span>
            );
          }
        }
        
        // Determinar si es código, fórmula KaTeX, texto bold, cursiva, corchetes escapados o paréntesis escapados
        if (match[1]) {
          // Es código inline: `code`
          parts.push(
            <code key={`code-${match.index}`} className={styles.inlineCode}>
              {match[2]}
            </code>
          );
        } else if (match[3]) {
          // Es fórmula KaTeX: $formula$
          const formula = match[4];
          try {
            const renderedFormula = katex.renderToString(formula, { 
              throwOnError: false,
              displayMode: false,
              output: 'htmlAndMathml',
              trust: true,
              strict: false
            });
            
            parts.push(
              <span 
                key={`katex-${match.index}`}
                className="katex-wrapper"
                style={{
                  fontSize: '1.2em',
                  lineHeight: '1.2',
                  verticalAlign: 'baseline',
                  display: 'inline-block'
                }}
                dangerouslySetInnerHTML={{ __html: renderedFormula }}
              />
            );
          } catch (error) {
            console.error('Error rendering KaTeX formula:', error);
            parts.push(
              <span key={`katex-error-${match.index}`} style={{ color: '#dc2626', fontStyle: 'italic' }}>
                [Error: {formula}]
              </span>
            );
          }
        } else if (match[5]) {
          // Es texto bold: **texto**
          const boldText = match[6];
          parts.push(
            <strong key={`bold-${match.index}`} className={styles.boldText}>
              {processContent(boldText)}
            </strong>
          );
        } else if (match[7]) {
          // Es texto cursiva: *texto*
          const italicText = match[8];
          parts.push(
            <em key={`italic-${match.index}`} className={styles.italicText}>
              {processContent(italicText)}
            </em>
          );
        } else if (match[9]) {
          // Son corchetes escapados: \[texto\]
          const bracketContent = match[10];
          parts.push(
            <span key={`bracket-${match.index}`}>
              [{bracketContent}]
            </span>
          );
        } else if (match[11]) {
          // Son paréntesis escapados: \(texto\)
          const parenthesesContent = match[12];
          parts.push(
            <span key={`parentheses-${match.index}`}>
              ({parenthesesContent})
            </span>
          );
        } else if (match[13]) {
          // Es texto coloreado: {{color:texto}}
          const color = match[14];
          const coloredText = match[15];
          const colorClassName = `color${color.charAt(0).toUpperCase()}${color.slice(1)}`;
          parts.push(
            <span key={`color-${match.index}`} className={styles[colorClassName]}>
              {processContent(coloredText)}
            </span>
          );
        }
        
        lastIndex = match.index + match[0].length;
      }
      
      // Agregar texto después del último elemento
      if (lastIndex < text.length) {
        const afterText = text.slice(lastIndex);
        if (afterText) {
          parts.push(
            <span key={`text-${lastIndex}`}>
              {afterText}
            </span>
          );
        }
      }
      
      // Si encontramos partes mixtas, devolver el resultado combinado
      if (parts.length > 0) {
        return <span>{parts}</span>;
      }
    }
    
    // Texto normal sin código inline, fórmulas, bold, cursiva, corchetes escapados o paréntesis escapados
    return content;
  };

  const getTableClasses = () => {
    let classes = styles.table;

    if (tableLayout === 'auto') {
      classes += ` ${styles.tableLayoutAuto}`;
    } else if (tableLayout === 'mixed') {
      classes += ` ${styles.tableLayoutMixed}`;
    }

    if (rowHeaders) {
      classes += ` ${styles.rowHeaders}`;
    }

    if (className) {
      classes += ` ${className}`;
    }

    return classes;
  };

  const getColumnStyle = (columnIndex) => {
    if (tableLayout === 'mixed' && columnWidths[columnIndex]) {
      return { width: columnWidths[columnIndex] };
    }
    return {};
  };

  // Una fila puede ser un array plano (formato clásico) o un objeto
  // { cells: [...], highlight: true | 'yellow' | 'green' | 'blue' | 'red' | 'gray' }
  // para destacarla (por ejemplo, filas de totales).
  const normalizeRow = (row) => {
    if (Array.isArray(row)) {
      return { cells: row, highlight: false };
    }
    return { cells: row?.cells || [], highlight: row?.highlight || false };
  };

  const getRowHighlightClass = (highlight) => {
    if (!highlight) return '';
    const color = highlight === true ? 'yellow' : highlight;
    if (!HIGHLIGHT_COLORS.includes(color)) return styles.rowHighlightYellow;
    const className = `rowHighlight${color.charAt(0).toUpperCase()}${color.slice(1)}`;
    return styles[className];
  };

  // Fila de sección: { section: "INGRESOS" } — separador de grupo (mayúsculas
  // subrayadas, como en el desarrollo en pizarra), ocupa todas las columnas.
  const isSectionRow = (row) => !Array.isArray(row) && row && typeof row === 'object' && 'section' in row;

  const columnCount = headers.length > 0
    ? headers.length
    : rows.reduce((max, row) => {
        const cells = Array.isArray(row) ? row : (row?.cells || []);
        return Math.max(max, cells.length);
      }, 1);

  return (
    <div id={id} className={styles.tableWrapper}>
      <table
        className={getTableClasses()}
        {...props}
      >
        {fullCaption && (
          <caption className={styles.caption}>{fullCaption}</caption>
        )}
        {/* HEADERS */}
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index}
                  style={getColumnStyle(index)}
                  data-column={index}
                >
                  {processContent(header)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        
        {/* ROWS */}
        {rows.length > 0 && (
          <tbody>
            {rows.map((row, rowIndex) => {
              if (isSectionRow(row)) {
                return (
                  <tr key={rowIndex} className={styles.sectionRow}>
                    <td colSpan={columnCount} className={styles.sectionCell}>
                      {processContent(row.section)}
                    </td>
                  </tr>
                );
              }
              const { cells, highlight } = normalizeRow(row);
              const highlightClass = getRowHighlightClass(highlight);
              return (
                <tr key={rowIndex} className={highlightClass || undefined}>
                  {cells.map((cell, cellIndex) => {
                    const label = headers[cellIndex] || `Column ${cellIndex + 1}`;
                    if (rowHeaders && cellIndex === 0) {
                      return (
                        <th key={cellIndex} scope="row" data-label={label}>
                          {processContent(cell)}
                        </th>
                      );
                    }
                    return (
                      <td key={cellIndex} data-label={label}>
                        {processContent(cell)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default SmartTable;