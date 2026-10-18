import styles from './PaginationControls.module.css';

const PaginationControls = ({ 
  pagination,
  maxVisiblePages = 5,
  showInfo = true,
  className = ''
}) => {
  const {
    currentPage,
    totalPages,
    totalItems,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    isFirstPage,
    isLastPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers
  } = pagination;

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(maxVisiblePages);

  return (
    <div className={`${styles.tableFooter} ${className}`}>
      {showInfo && (
        <div className={styles.tableInfo}>
          Mostrando {startIndex + 1}-{endIndex} de {totalItems} problemas
        </div>
      )}
      
      <div className={styles.paginationControls}>
        {/* First page button */}
        <button
          onClick={goToFirstPage}
          disabled={isFirstPage}
          className={styles.paginationButton}
          title="Primera página"
        >
          «
        </button>
        
        {/* Previous page button */}
        <button
          onClick={goToPreviousPage}
          disabled={!hasPreviousPage}
          className={styles.paginationButton}
          title="Página anterior"
        >
          ‹
        </button>
        
        {/* Page number buttons */}
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${styles.paginationButton} ${page === currentPage ? styles.currentPage : ''}`}
            title={`Página ${page}`}
          >
            {page}
          </button>
        ))}
        
        {/* Next page button */}
        <button
          onClick={goToNextPage}
          disabled={!hasNextPage}
          className={styles.paginationButton}
          title="Página siguiente"
        >
          ›
        </button>
        
        {/* Last page button */}
        <button
          onClick={goToLastPage}
          disabled={isLastPage}
          className={styles.paginationButton}
          title="Última página"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;