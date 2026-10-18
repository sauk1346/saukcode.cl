// components/MisColumnas.tsx
import styles from './MultiColumn.module.css';

const MultiColumn = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MultiColumn;