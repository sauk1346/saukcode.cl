import styles from './SortableHeader.module.css';

const SortableHeader = ({ column, label, sortConfig, onSort }) => {
  const isSorted = sortConfig.key === column;
  const sortDirection = isSorted ? sortConfig.direction : null;
  
  return (
    <th 
      className={`${styles.sortableHeader} ${isSorted ? styles.sorted : ''}`}
      onClick={() => onSort(column)}
    >
      {label}
      {isSorted && (
        <span className={styles.sortIndicator}>
          {sortDirection === 'asc' ? ' ▲' : ' ▼'}
        </span>
      )}
    </th>
  );
};

export default SortableHeader;