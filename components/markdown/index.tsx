import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism"
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

export const components = () => ({
  h2: ({ ...props }) => (
    <Text
      as="h2"
      textStyle="h2"
      pt={{ base: 12, md: 20 }}
      _first={{ pt: 0 }}
      {...props}
    />
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
  table: ({ children }: ReactMarkdownProps) => (
    <>
      <TableContainer maxW="3xl" my={10}>
        <Table size={{ base: "sm", md: "md" }}>{children}</Table>
      </TableContainer>
      <Text
        fontSize="xs"
        fontWeight="400"
        textAlign="center"
        display={{ base: "block", md: "none" }}
        mt={-6}
      >
        Scroll horizontally to view the full table.
      </Text>
    </>
  ),
  thead: ({ children }: ReactMarkdownProps) => (
    <Thead borderColor="gray.300" bg="gray.100">
      {children}
    </Thead>
  ),
  th: ({ children }: ReactMarkdownProps) => (
    <Th borderColor="gray.300">{children}</Th>
  ),
  tr: ({ children }: ReactMarkdownProps) => (
    <Tr borderColor="gray.300">{children}</Tr>
  ),
  td: ({ children }: ReactMarkdownProps) => (
    <Td borderColor="gray.300">{children}</Td>
  ),
})
