'use client'
import { useState } from 'react';
import { CompactPlatformGrid } from '../../ui/CompactPlatformGrid';
import FilterControls from '../../common/table/FilterControls';
import ProblemStats from './ProblemStats';
import ProblemTable from './ProblemTable';
import { useFilters } from '@/hooks/useFilters';
import { getSubsectionsData } from '@/utils/ejerciciosUtils';
import styles from './ejercicios.module.css';

const subsectionsData = getSubsectionsData();

function SubsectionExercises({ subsectionKey, data }) {
  const {
    searchTerm,
    topicFilter,
    difficultyFilter,
    setSearchTerm,
    setTopicFilter,
    setDifficultyFilter,
    allTopics,
    filteredData,
    hasActiveFilters,
    clearFilters
  } = useFilters(data.problems);

  const PROBLEMS_PER_PAGE = 10;
  const platform = `/ejercicios/${subsectionKey}`;

  return (
    <div className={styles.grid}>
      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        topicFilter={topicFilter}
        setTopicFilter={setTopicFilter}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        allTopics={allTopics}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />

      <ProblemStats problems={data.problems} />

      <ProblemTable
        title="Lista de Ejercicios"
        data={filteredData}
        showAllProblems={true}
        problemsPerPage={PROBLEMS_PER_PAGE}
        platform={platform}
      />

      {Object.keys(data.categories)
        .filter(categoryId => categoryId !== 'general')
        .map(categoryId => (
          <ProblemTable
            key={categoryId}
            title={data.categories[categoryId].title}
            data={filteredData}
            categoryId={categoryId}
            showAllProblems={false}
            problemsPerPage={PROBLEMS_PER_PAGE}
            platform={platform}
          />
        ))}
    </div>
  );
}

export default function Ejercicios() {
  const [selected, setSelected] = useState(null);

  const handleClick = (key) => {
    setSelected(key === selected ? null : key);
  };

  const subsectionKeys = Object.keys(subsectionsData);
  const current = selected ? subsectionsData[selected] : null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Ejercicios</h1>

        <p className={styles.subtitle}>
          Selecciona un lenguaje o plataforma para ver los ejercicios disponibles
        </p>

        <CompactPlatformGrid
          platforms={subsectionKeys}
          platformsData={subsectionsData}
          selectedPlatform={selected}
          onPlatformClick={handleClick}
        />

        {current && (
          <div className={styles.tableSection}>
            <SubsectionExercises subsectionKey={selected} data={current} />
          </div>
        )}
      </div>
    </div>
  );
}
