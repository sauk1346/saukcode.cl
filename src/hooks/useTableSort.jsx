import { useState, useMemo } from 'react';

export const useTableSort = (data, defaultSort = { key: 'id', direction: 'asc' }) => {
  const [sortConfig, setSortConfig] = useState(defaultSort);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    return [...data].sort((a, b) => {
      const [idA, problemA] = a;
      const [idB, problemB] = b;
      
      const asc = sortConfig.direction === 'asc';
      switch (sortConfig.key) {
        case 'id': {
          const numA = parseInt(idA.replace(/\D/g, ''), 10);
          const numB = parseInt(idB.replace(/\D/g, ''), 10);
          return asc ? numA - numB : numB - numA;
        }
        case 'title':
          return asc
            ? problemA.title.localeCompare(problemB.title)
            : problemB.title.localeCompare(problemA.title);
        case 'topics': {
          const firstTopicA = problemA.topics?.[0] || '';
          const firstTopicB = problemB.topics?.[0] || '';
          return asc
            ? firstTopicA.localeCompare(firstTopicB)
            : firstTopicB.localeCompare(firstTopicA);
        }
        case 'difficulty': {
          const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          const orderA = order[problemA.difficulty] || 0;
          const orderB = order[problemB.difficulty] || 0;
          return asc ? orderA - orderB : orderB - orderA;
        }
        default:
          return 0;
      }
    });
  }, [data, sortConfig]);

  return {
    sortConfig,
    sortedData,
    requestSort
  };
};