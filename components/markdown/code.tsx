import { FC, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  base16AteliersulphurpoolLight,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import a11yDark from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useClipboard } from "@chakra-ui/react";

export const MdxCode: FC<Readonly<CodeProps>> = ({
  node,
  inline,
  className,
  children,
  style,
  ...props
}) => {
  const codeSnippet = String(children).replace(/\n$/, "");
  const match = /language-(\w+)/.exec(className || "");
  const language = match?.[1];
  const { onCopy, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    setValue(codeSnippet);
  }, [codeSnippet, setValue]);

  return (
    <Box pos="relative" m={0} maxH="60vh" w="100%" overflow="auto">
      <Box pos="sticky" top={3} right={3}>
        <Tooltip aria-label="Tooltip." label="Copy" gutter={4}>
          <Button
            aria-label="Copy code to clipboard"
            variant="unstyled"
            size="sm"
            pos="absolute"
            top={0}
            right={0}
            mr={3}
            bg="gray.100"
            color={hasCopied ? "green.500" : "gray.500"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={onCopy}
            _hover={{
              bg: "gray.200",
            }}
          >
            {hasCopied ? (
              <FontAwesomeIcon icon={faCheck} width="14px" />
            ) : (
              <FontAwesomeIcon icon={faCopy} width="14px" />
            )}
          </Button>
        </Tooltip>
      </Box>

      <SyntaxHighlighter
        language={language ?? "sql"}
        showLineNumbers
        style={base16AteliersulphurpoolLight}
        {...props}
      >
        {codeSnippet}
      </SyntaxHighlighter>
    </Box>
  );
};
