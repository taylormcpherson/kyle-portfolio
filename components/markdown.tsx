import { MDXRemoteProps } from "next-mdx-remote";
import styles from '../styles/Markdown.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { a11yDark, nightOwl, base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const components = (): MDXRemoteProps["components"] => ({
  h2: ({ children, ...props }) => (
    <h2 className={styles.h2} {...props}>{children}</h2>
  ),
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
  code: ({ inline, children, ...props }) => {
    return !inline ? (
      <SyntaxHighlighter
        style={base16AteliersulphurpoolLight}
        language="sql"
        PreTag="div"
        showLineNumbers
        wrapLongLines
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={styles.inlineCode} {...props}>
        {children}
      </code>
    )
  },
});