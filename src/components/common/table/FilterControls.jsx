// components/FilterControls.jsx
import styles from './FilterControls.module.css';

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  topicFilter,
  setTopicFilter,
  difficultyFilter,
  setDifficultyFilter,
  categoryFilter,
  setCategoryFilter,
  allTopics,
  allCategories,
  hasActiveFilters,
  clearFilters,
  searchPlaceholder = "Buscar problemas por título, código o tema...",
  showCategories = false, // Nuevo parámetro opcional
  categories = {} // Datos de categorías para mostrar nombres legibles
}) => {
  return (
    <div className={styles.filterContainer}>
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {/* Selector de categorías (opcional) */}
      {showCategories && allCategories && allCategories.length > 0 && (
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="">Todas las Categorías</option>
          {allCategories.map(categoryId => (
            <option key={categoryId} value={categoryId}>
              {categories[categoryId]?.title || categoryId}
            </option>
          ))}
        </select>
      )}

      <select
        value={topicFilter}
        onChange={(e) => setTopicFilter(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="">Todos los Temas</option>
        {allTopics.map(topic => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>

      <select
        value={difficultyFilter}
        onChange={(e) => setDifficultyFilter(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="">Todas las Dificultades</option>
        <option value="Fácil">Fácil</option>
        <option value="Medio">Medio</option>
        <option value="Difícil">Difícil</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className={styles.resetButton}
        >
          Limpiar Filtros
        </button>
      )}
    </div>
  );
};

export default FilterControls;