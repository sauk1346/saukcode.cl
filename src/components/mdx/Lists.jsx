import React from 'react';
import styles from './Lists.module.css';

export const UnorderedList = ({ children, ...props }) => (
  <ul className={styles.list} {...props}>
    {children}
  </ul>
);

export const OrderedList = ({ children, ...props }) => (
  <ol className={styles.orderedList} {...props}>
    {children}
  </ol>
);

export const ListItem = ({ children, ...props }) => (
  <li className={styles.listItem} {...props}>
    {children}
  </li>
);

export const List = ({ children, level = 2, indent }) => (
  <div
    className={styles.listContainer}
    data-level={Math.min(Math.max(level, 1), 4)}
    data-indent={Math.min(Math.max(indent ?? level, 1), 4)}
  >
    {children}
  </div>
);