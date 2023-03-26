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
  Button,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import Link from "../link"
import { MdxImage } from "./image"
import { MdxCode } from "./code"

export const components = () => ({
  h2: ({ ...props }) => (
    <Text
      as="h2"
      textStyle="h2"
      mt={{ base: 12, md: 20 }}
      _first={{ mt: 0 }}
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
