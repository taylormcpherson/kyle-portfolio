import { FC, useEffect } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { base16AteliersulphurpoolLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CodeProps } from "react-markdown/lib/ast-to-react"
import { Box, Button, Tooltip } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons"
import { useClipboard } from "@chakra-ui/react"

export const MdxCode: FC<Readonly<CodeProps>> = ({
  node,
  inline,
  className,
  children,
  style,
  ...props
}) => {
  const codeSnippet = String(children).replace(/\n$/, "")
  const { onCopy, setValue, hasCopied } = useClipboard("")

  useEffect(() => {
    setValue(codeSnippet)
  }, [codeSnippet, setValue])

  return (
    <Box as="code" pos="relative" m={0}>
      <Button
        aria-label="Copy code to clipboard"
        variant="unstyled"
        pos="absolute"
        top={2}
        right={0}
        color={hasCopied ? "green.500" : "gray.400"}
        onClick={onCopy}
      >
        <Tooltip
          aria-label="Tooltip."
          label="Copy code snippet"
          placement="top-start"
        >
          {hasCopied ? (
            <FontAwesomeIcon icon={faCheck} width="16px" />
          ) : (
            <FontAwesomeIcon icon={faCopy} width="16px" />
          )}
        </Tooltip>
      </Button>
      <SyntaxHighlighter
        language="sql"
        showLineNumbers
        wrapLongLines
        style={base16AteliersulphurpoolLight}
        {...props}
      >
        {codeSnippet}
      </SyntaxHighlighter>
    </Box>
  )
}
