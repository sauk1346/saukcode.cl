import React from 'react';
import MDXWrapper from '../../common/MDXWrapper';
import styles from './Container.module.css';

export const Container = ({ children }) => (
  <MDXWrapper>
    <div className={styles.container}>
      {children}
    </div>
  </MDXWrapper>
);