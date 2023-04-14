import { FC, useRef, useState } from "react"
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react"
import { Box, Text, Table, TableContainer, Flex } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle, faInfo } from "@fortawesome/free-solid-svg-icons"

export const MdxTable: FC<Readonly<ReactMarkdownProps>> = ({ children }) => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false)
  const [overflowing, setOverflowing] = useState(false)

  const blurHeight = 24
  const itemHeight = 12

  return (
    <>
      <Box
        pos="relative"
        _before={{
          content: "''",
          pos: "absolute",
          opacity: scrolledToBottom || !overflowing ? 0 : 1,
          bottom: 0,
          left: 0,
          right: 0,
          height: blurHeight,
          bgGradient: "linear(to-t, gray.50 0%, transparent 100%)",
          transition: "all .15s ease-in-out",
          // zIndex shouldn't block clickable elements when the scroll fade is no longer visible.
          zIndex: scrolledToBottom || !overflowing ? -1 : 1,
        }}
      >
        <TableContainer
          ref={(element) => {
            if (element) {
              if (element.clientHeight < element.scrollHeight) {
                setOverflowing(true)
              }
            }
          }}
          pos="relative"
          my={10}
          maxH="52vh"
          overflowY="auto"
          onScroll={(event) => {
            const element = event.target as HTMLDivElement
            if (
              element.scrollHeight - element.scrollTop <=
              element.clientHeight + itemHeight
            ) {
              setScrolledToBottom(true)
            } else {
              setScrolledToBottom(false)
            }
          }}
        >
          <Table size={{ base: "sm", md: "md" }} w="100%">
            {children}
          </Table>
        </TableContainer>
      </Box>

      <Flex
        as={Text}
        align="center"
        justify="center"
        color="gray.600"
        gap={2}
        fontSize="xs"
        fontWeight="semibold"
        mt={-4}
        textAlign="center"
        opacity={{ base: 1, md: scrolledToBottom || !overflowing ? 0 : 1 }}
        transition="opacity .15s ease-in-out"
      >
        <FontAwesomeIcon icon={faInfoCircle} width={16} height={16} />
        Scroll to view the full table.
      </Flex>
    </>
  )
}
