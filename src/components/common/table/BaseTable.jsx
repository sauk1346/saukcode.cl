/**
 * BaseTable - Componente genérico reutilizable para tablas
 *
 * Soporta:
 * - Tablas simples y con grid de múltiples tablas
 * - Paginación opcional
 * - Ordenamiento opcional
 * - Columnas dinámicas
 * - Renderizado customizado de celdas
 * - Estilos compartidos vía CSS Modules
 */

import React from 'react';
import Link from 'next/link';
import { SmartLink } from '@/components/ui/SmartLink';
import styles from './BaseTable.module.css';

/**
 * Componente principal BaseTable
 *
 * @param {Object} props
 * @param {string} props.title - Título principal (opcional)
 * @param {Array} props.data - Datos a mostrar
 * @param {Array} props.columns - Configuración de columnas
 * @param {string} props.variant - 'simple' | 'grid' | 'paginated'
 * @param {Object} props.gridConfig - Configuración para variant='grid'
 * @param {Object} props.paginationConfig - Configuración de paginación
 * @param {string} props.className - Clases CSS adicionales
 * @param {Function} props.renderRow - Función custom para renderizar filas
 * @param {Object} props.containerProps - Props adicionales para container
 */
const BaseTable = ({
  title,
  data,
  columns = [],
  variant = 'simple', // 'simple' | 'grid' | 'paginated'
  gridConfig = {},
  paginationConfig = {},
  className = '',
  renderRow,
  containerProps = {},
  emptyMessage = 'No hay datos disponibles',
  showContainer = true
}) => {
  // Validación
  if (!data || data.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          {title && <h1 className={styles.title}>{title}</h1>}
          <p>{emptyMessage}</p>
        </div>
      </div>
    );
  }

  // Renderizar variante grid (múltiples tablas)
  if (variant === 'grid') {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          {title && <h1 className={styles.title}>{title}</h1>}

          <div className={`${styles.grid} ${gridConfig.className || ''}`}>
            {data.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.sectionTitle && (
                  <h2 className={styles.platformTitle}>
                    {section.sectionTitle}
                  </h2>
                )}

                <TableComponent
                  columns={columns}
                  rows={section.rows || section.data}
                  renderRow={renderRow}
                  className={className}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Renderizar variante simple (tabla única)
  const Container = showContainer ?
    ({ children }) => (
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    ) :
    ({ children }) => <div className={styles.section}>{children}</div>;

  return (
    <Container>
      {title && (
        <h1 className={showContainer ? styles.title : styles.platformTitle}>
          {title}
        </h1>
      )}

      <div className={`${styles.tableContainer} ${className}`}>
        <div className={styles.tableWrapper}>
          <TableComponent
            columns={columns}
            rows={data}
            renderRow={renderRow}
            className={className}
          />
        </div>
      </div>
    </Container>
  );
};

/**
 * Componente interno para renderizar la tabla
 */
const TableComponent = ({
  columns,
  rows,
  renderRow,
  className = ''
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className={column.headerClassName || ''}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => {
          // Si hay función custom de renderizado, usarla
          if (renderRow) {
            return renderRow(row, rowIndex);
          }

          // Renderizado por defecto
          return (
            <tr key={rowIndex} className={styles.tableRow}>
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={column.cellClassName || ''}
                  data-label={column.label}
                >
                  {renderCell(row, column, colIndex)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

/**
 * Función helper para renderizar contenido de celda
 */
const renderCell = (row, column, colIndex) => {
  const value = column.accessor ? column.accessor(row) : row[column.key];

  // Si hay renderizador custom
  if (column.render) {
    return column.render(value, row);
  }

  // Renderizado especial para primera columna (código)
  if (colIndex === 0 && column.isCode) {
    return <span className={styles.code}>{value}</span>;
  }

  // Renderizado de links
  if (column.isLink && row[column.linkKey]) {
    const Component = column.linkType === 'external' ? 'a' :
                     column.linkType === 'smart' ? SmartLink : Link;

    const linkProps = column.linkType === 'external' ? {
      href: row[column.linkKey],
      target: '_blank',
      rel: 'noopener noreferrer',
      className: styles.courseLink
    } : {
      href: row[column.linkKey],
      className: styles.courseLink
    };

    return <Component {...linkProps}>{value}</Component>;
  }

  // Renderizado de dificultad (LeetCode)
  if (column.isDifficulty && value) {
    const difficultyClass = styles[value.toLowerCase()] || '';
    return <span className={difficultyClass}>{value}</span>;
  }

  // Renderizado por defecto
  return value || '-';
};

export default BaseTable;
