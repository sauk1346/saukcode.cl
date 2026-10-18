import React from 'react';
import { CodeBlock } from "./CodeBlock";
import styles from './CodeComponents.module.css';

export const PreBlock = ({ children }) => children;

export const Code = ({ children, className, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';
  
  if (lang) {
    return (
      <CodeBlock language={lang} {...props}>
        {children}
      </CodeBlock>
    );
  }
  
  return <code className={styles.inlineCode} {...props}>{children}</code>;
};