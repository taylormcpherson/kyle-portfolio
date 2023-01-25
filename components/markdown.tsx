import { MDXRemoteProps } from "next-mdx-remote";
import styles from '../styles/Markdown.module.css';

export const components = (): MDXRemoteProps["components"] => ({
  p: ({ children}) => (
    <p className={styles.paragraph}>
      {children}
    </p>
  ),
  strong: ({ children}) => (
    <strong className={styles.bold}>
      {children}
    </strong>
  ),
  em: ({ children}) => (
    <em className={styles.italic}>
      {children}
    </em>
  ),
  ul: ({ children}) => (
    <ul className={styles.list}>
      {children}
    </ul>
  ),
  ol: ({ children}) => (
    <ol className={styles.orderedList}>
      {children}
    </ol>
  ),
  li: ({ children}) => (
    <li className={styles.listItem}>
      {children}
    </li>
  ),
  pre: ({ children }) => (
    <pre className={styles.pre}
    >
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className={styles.code}>
      {children}
    </code>
  )
});