import { useState, useMemo } from 'react';

const difficultyMap = {
  'Easy': 'Fácil',
  'Medium': 'Medio',
  'Hard': 'Difícil',
};

const reverseDifficultyMap = {
  'Fácil': 'Easy',
  'Medio': 'Medium',
  'Difícil': 'Hard',
};

const normalizeText = (text) =>
  text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const useFilters = (data) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const allTopics = useMemo(() => {
    if (!data) return [];
    const topicsSet = new Set();
    Object.values(data).forEach(item => {
      item.topics?.forEach(topic => topicsSet.add(topic));
    });
    return Array.from(topicsSet).sort();
  }, [data]);

  const allCategories = useMemo(() => {
    if (!data) return [];
    const categoriesSet = new Set();
    Object.values(data).forEach(item => {
      item.categories?.forEach(category => categoriesSet.add(category));
    });
    return Array.from(categoriesSet).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data).filter(([id, item]) => {
      if (searchTerm) {
        const normalizedSearch = normalizeText(searchTerm);
        const searchWords = normalizedSearch.split(/\s+/).filter(w => w.length > 0);
        const normalizedTitle = normalizeText(item.title || '');
        const normalizedId = normalizeText(id);

        const matchesAnyTopic = item.topics?.some(topic => {
          const normalizedTopic = normalizeText(topic);
          if (searchWords.length > 1) return searchWords.every(w => normalizedTopic.includes(w));
          return normalizedTopic.includes(normalizedSearch);
        }) ?? false;

        const matchesSearch =
          normalizedTitle.includes(normalizedSearch) ||
          normalizedId.includes(normalizedSearch) ||
          matchesAnyTopic;

        if (!matchesSearch) return false;
      }

      if (topicFilter && !item.topics?.includes(topicFilter)) return false;

      if (difficultyFilter) {
        const targetDifficulty = reverseDifficultyMap[difficultyFilter] || difficultyFilter;
        if (item.difficulty !== targetDifficulty) return false;
      }

      if (categoryFilter && !item.categories?.includes(categoryFilter)) return false;

      return true;
    });
  }, [data, searchTerm, topicFilter, difficultyFilter, categoryFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setTopicFilter('');
    setDifficultyFilter('');
    setCategoryFilter('');
  };

  const hasActiveFilters = searchTerm || topicFilter || difficultyFilter || categoryFilter;

  return {
    searchTerm,
    topicFilter,
    difficultyFilter,
    categoryFilter,
    setSearchTerm,
    setTopicFilter,
    setDifficultyFilter,
    setCategoryFilter,
    allTopics,
    allCategories,
    filteredData,
    hasActiveFilters,
    clearFilters,
    difficultyMap,
    reverseDifficultyMap,
    normalizeText,
  };
};
