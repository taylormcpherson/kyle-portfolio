import styles from '../styles/Markdown.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight, nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeProps } from "react-markdown/lib/ast-to-react";

export const components = () => ({
  h2: ({ ...props }) => (
    <h2 className={styles.h2} {...props} />
  ),
  p: ({ ...props }) => (
    <p className={styles.paragraph} {...props} />
  ),
  strong: ({ ...props }) => (
    <strong className={styles.bold} {...props} />
  ),
  em: ({ ...props }) => (
    <em className={styles.italic} />
  ),
  ul: ({ ...props}) => (
    <ul className={styles.list} {...props} />
  ),
  ol: ({ ...props}) => (
    <ol className={styles.orderedList} {...props} />
  ),
  li: ({ ...props}) => (
    <li className={styles.listItem} {...props} />
  ),
  pre: ({ ...props }) => (
    <pre className={styles.pre} {...props} />
  ),
  code: ({node, inline, className, children, style, ...props} : CodeProps) => {
    // multi-line code blocks
    return node.position && node.position.start.line !== node.position.end.line ? (
      <div className={styles.codeContainer}>
        <SyntaxHighlighter
          className={styles.code}
          language="sql"
          PreTag="div"
          showLineNumbers
          wrapLongLines
          style={base16AteliersulphurpoolLight}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={styles.inlineCode} {...props}>
        {children}
      </code>
    )
  },
});