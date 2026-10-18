'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePagination } from '@/hooks/usePagination';
import { useTableSort } from '@/hooks/useTableSort';
import { SmartLink } from '@/components/ui/SmartLink';
import PaginationControls from '@/components/common/table/PaginationControls';
import SortableHeader from '@/components/common/table/SortableHeader';
import styles from './ProblemTable.module.css';
import { staggerContainer, viewportConfig } from '@/utils/animations';

// Variantes para las filas
const rowVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const ProblemTable = ({
  title,
  data,
  categoryId = null,
  showAllProblems = false,
  problemsPerPage = 10,
  platform = 'leetcode' // Nueva prop con valor por defecto
}) => {
  // Difficulty mapping
  const difficultyMap = {
    'Easy': 'Fácil',
    'Medium': 'Medio',
    'Hard': 'Difícil'
  };

  const getDifficultyLabel = (difficulty) => {
    return difficultyMap[difficulty] || difficulty;
  };

  const getDifficultyClass = (difficulty) => {
    if (!difficulty) return '';
    const lowerDifficulty = difficulty.toLowerCase();
    return styles[lowerDifficulty] || '';
  };

  // Filter data by category if needed
  const categoryFilteredData = useMemo(() => {
    if (showAllProblems || !categoryId) {
      return data;
    }
    return data.filter(([id, problem]) => {
      return problem.categories?.includes(categoryId);
    });
  }, [data, categoryId, showAllProblems]);

  // Use sorting hook
  const { sortConfig, sortedData, requestSort } = useTableSort(categoryFilteredData);

  // Use pagination hook
  const pagination = usePagination({
    data: sortedData,
    itemsPerPage: problemsPerPage,
    resetTriggers: [
      categoryId,
      `${sortConfig.key}-${sortConfig.direction}`,
      data.length
    ]
  });

  if (sortedData.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <h2 className={styles.platformTitle}>{title}</h2>
        <p>No se encontraron problemas con esos filtros.</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.tableContainer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h2 className={styles.platformTitle}>{title}</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <SortableHeader
                column="id"
                label="Código"
                sortConfig={sortConfig}
                onSort={requestSort}
                className={styles.sortableHeader}
              />
              <SortableHeader
                column="title"
                label="Descripción"
                sortConfig={sortConfig}
                onSort={requestSort}
                className={styles.sortableHeader}
              />
              <SortableHeader
                column="topics"
                label="Temas"
                sortConfig={sortConfig}
                onSort={requestSort}
                className={styles.sortableHeader}
              />
              <SortableHeader
                column="difficulty"
                label="Nivel"
                sortConfig={sortConfig}
                onSort={requestSort}
                className={styles.sortableHeader}
              />
            </tr>
          </thead>
          <motion.tbody
            key={`tbody-${platform}-${pagination.currentPage}`}
            initial="initial"
            animate="animate"
            variants={staggerContainer(0.03)}
          >
            {pagination.paginatedData.map(([id, problem]) => (
              <motion.tr
                key={`${platform}-${id}`}
                variants={rowVariants}
                whileHover={{
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  transition: { duration: 0.05 },
                }}
              >
                <td
                  className={styles.code}
                  data-label="Código"
                >
                  {id}
                </td>
                <td data-label="Descripción">
                  <SmartLink
                    href={`${platform}/${id.toLowerCase()}`}
                  >
                    {problem.title}
                  </SmartLink>
                </td>
                <td data-label="Temas">
                  {problem.topics?.join(", ") || ''}
                </td>
                <td
                  className={getDifficultyClass(problem.difficulty)}
                  data-label="Dificultad"
                >
                  {getDifficultyLabel(problem.difficulty) || 'Desconocido'}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <PaginationControls
          pagination={pagination}
          className={styles.paginationControls}
        />
      </div>
    </motion.div>
  );
};

export default ProblemTable;