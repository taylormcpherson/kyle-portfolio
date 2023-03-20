import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CodeProps } from "react-markdown/lib/ast-to-react"
import { Text, List, OrderedList, ListItem, Box } from "@chakra-ui/react"
import Link from "./link"
import { ReactMarkdownProps } from "react-markdown/lib/complex-types"

export const components = () => ({
  h2: ({ ...props }) => <Text as="h2" textStyle="h3" pt={20} {...props} />,
  p: ({ ...props }) => <Text textStyle="article.p" {...props} />,
  strong: ({ ...props }) => (
    <Text as="strong" fontWeight="semibold" {...props} />
  ),
  em: ({ ...props }) => <Text as="em" {...props} fontStyle="italic" />,
  a: ({ ...props }) => <Link variant="inline" {...props} />,
  ul: ({ ...props }) => <List listStyleType="disc" pl={4} {...props} />,
  ol: ({ ...props }) => (
    <List as="ol" listStyleType="decimal" pl={4} {...props} />
  ),
  li: ({ ...props }) => <ListItem mb={2} {...props} />,
  pre: ({ ...props }) => (
    <Box
      as="pre"
      borderRadius="md"
      bg="offWhite"
      border="1px solid"
      borderColor="gray.200"
      fontFamily="mono"
      my={8}
      {...props}
    />
  ),
  code: ({ node, inline, className, children, style, ...props }: CodeProps) => {
    // multi-line code blocks
    return node.position &&
      node.position.start.line !== node.position.end.line ? (
      <Box as="code" m={0}>
        <SyntaxHighlighter
          language="sql"
          showLineNumbers
          wrapLongLines
          style={base16AteliersulphurpoolLight}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </Box>
    ) : (
      <Box
        as="code"
        fontFamily="mono"
        fontWeight="semibold"
        bg="offWhite"
        color="gray.700"
        border="1px solid"
        borderColor="gray.100"
        py={1}
        px={2}
        wordBreak="keep-all"
        {...props}
      >
        {children}
      </Box>
    )
  },
})
