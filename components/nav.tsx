import { FC } from "react"
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import Link from "./link"
import Section from "./section"

const Nav: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="header"
      pos="sticky"
      top={0}
      maxW="100%"
      bg="gray.50"
      borderBottom="1px solid"
      borderBottomColor="gray.300"
      zIndex={10}
    >
      <Section
        as="nav"
        aria-label="Primary"
        pos="relative"
        flexDirection="row"
        gap={12}
        justifyContent="space-between"
        alignItems="center"
        py={4}
      >
        <Link
          href="/"
          fontSize={{ base: "sm", md: "base" }}
          textStyle="uppercase"
        >
          Kyle Zweng
        </Link>

        <Flex display={{ base: "none", md: "flex" }} gap={8}>
          <Link href="/#projects">Projects</Link>

          <Link href="/about/">About</Link>
        </Flex>

        <Box
          as="nav"
          aria-label="Mobile primary"
          aria-hidden={!isOpen}
          display={{ base: "flex", md: "none" }}
        >
          <Button
            aria-label="Open navigation menu"
            pos="absolute"
            top={2}
            right={2}
            p={2}
            bg="transparent"
            onClick={onOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>

          <Modal
            closeOnOverlayClick={true}
            isOpen={isOpen}
            motionPreset="scale"
            size="full"
            onClose={onClose}
          >
            <ModalContent bg="gray.50">
              <ModalHeader>
                <Link href="/" fontSize="sm" textStyle="uppercase">
                  Kyle Zweng
                </Link>
              </ModalHeader>
              <ModalCloseButton mt={2} />

              <Flex direction="column">
                <Link
                  w="100%"
                  justifyContent="space-between"
                  fontSize="lg"
                  href="/#projects"
                  py={6}
                  px={6}
                  borderBottom="1px solid"
                  borderTop="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "blue.50",
                  }}
                  onClick={onClose}
                >
                  Projects
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>

                <Link
                  w="100%"
                  justifyContent="space-between"
                  fontSize="lg"
                  href="/about/"
                  py={6}
                  px={6}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    bg: "blue.50",
                  }}
                  onClick={onClose}
                >
                  About
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </Flex>
            </ModalContent>
          </Modal>
        </Box>
      </Section>
    </Box>
  )
}

export default Nav
