import {
  CodeProps,
  OrderedListProps,
  UnorderedListProps,
  LiProps,
  ReactMarkdownProps,
} from "react-markdown/lib/ast-to-react"
import {
  Text,
  List,
  OrderedList,
  ListItem,
  Box,
  Table,
  TableContainer,
  Thead,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react"
import Link from "../link"
import { MdxImage } from "./image"
import { MdxCode } from "./code"
import { MdxTable } from "./table"

export const components = () => ({
  h2: ({ ...props }) => (
    <Text as="h2" textStyle="h2" mt={12} _first={{ mt: 0 }} {...props} />
  ),
  p: ({ ...props }) => <Text textStyle="article.p" {...props} />,
  strong: ({ ...props }) => (
    <Text as="strong" fontWeight="semibold" {...props} />
  ),
  em: ({ ...props }) => <Text as="em" {...props} fontStyle="italic" />,
  a: ({ ...props }) => <Link variant="inline" {...props} />,
  ul: ({ ordered, ...props }: UnorderedListProps) => (
    <List listStyleType="disc" pl={4} {...props} />
  ),
  ol: ({ ordered, ...props }: OrderedListProps) => (
    <OrderedList listStyleType="decimal" pl={4} {...props} />
  ),
  li: ({ ordered, ...props }: LiProps) => (
    <ListItem as="li" mb={2} {...props} />
  ),
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
    return node.position &&
      node.position.start.line !== node.position.end.line ? (
      // multi-line code blocks
      <MdxCode
        node={node}
        inline={inline}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </MdxCode>
    ) : (
      // inline code
      <Box
        as="code"
        fontFamily="mono"
        fontWeight="normal"
        fontSize="md"
        bg="gray.100"
        color="gray.700"
        borderRadius="md"
        py={1}
        px={1}
        wordBreak="keep-all"
        {...props}
      >
        {children}
      </Box>
    )
  },
  img: ({
    src,
    alt,
    title,
  }: {
    src?: string
    alt?: string
    title?: string
  }) => {
    return <MdxImage src={src} alt={alt} title={title} />
  },
  table: ({ children, ...props }: ReactMarkdownProps) => (
    <MdxTable {...props}>{children}</MdxTable>
  ),
  thead: ({ children }: ReactMarkdownProps) => (
    <Thead borderColor="gray.300" bg="gray.100" pos="sticky" top={0}>
      {children}
    </Thead>
  ),
  th: ({ children }: ReactMarkdownProps) => (
    <Th borderColor="gray.300" whiteSpace="break-spaces">
      {children}
    </Th>
  ),
  tr: ({ children }: ReactMarkdownProps) => (
    <Tr borderColor="gray.300">{children}</Tr>
  ),
  td: ({ children }: ReactMarkdownProps) => (
    <Td borderColor="gray.300">{children}</Td>
  ),
})
