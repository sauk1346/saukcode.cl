import { useState, useMemo, useEffect } from 'react';

export const usePagination = ({
  data = [],
  itemsPerPage = 10,
  resetTriggers = []
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Convert resetTriggers to string for comparison to avoid object reference issues
  const resetKey = JSON.stringify(resetTriggers);
  
  // Reset pagination when dependencies change
  useEffect(() => {
    setCurrentPage(1);
  }, [resetKey]);
  
  // Calculate pagination info
  const paginationInfo = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
    
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedData = data.slice(startIndex, endIndex);
    
    return {
      currentPage: validCurrentPage,
      totalPages,
      totalItems,
      startIndex,
      endIndex,
      paginatedData,
      hasNextPage: validCurrentPage < totalPages,
      hasPreviousPage: validCurrentPage > 1,
      isFirstPage: validCurrentPage === 1,
      isLastPage: validCurrentPage === totalPages
    };
  }, [data, itemsPerPage, currentPage]);
  
  // Navigation functions
  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, paginationInfo.totalPages));
    setCurrentPage(validPage);
  };
  
  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(paginationInfo.totalPages);
  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  
  // Generate page numbers for pagination controls
  const getPageNumbers = (maxVisible = 5) => {
    const { totalPages, currentPage } = paginationInfo;
    const pageNumbers = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      let endPage = Math.min(totalPages, startPage + maxVisible - 1);
      
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };
  
  return {
    ...paginationInfo,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    getPageNumbers
  };
};