import { FC } from "react";
import {
  Box,
  Button,
  Flex,
  LinkProps,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "./link";
import Section from "./section";

const Nav: FC = () => {
  const resumeHref =
    "https://drive.google.com/file/d/10Xt-QgGdxvQHrqQnmxj6VuCXvqprAMUy/view?usp=sharing";
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Link href="/" variant="nav">
          Kyle Zweng
        </Link>

        <Flex display={{ base: "none", md: "flex" }} gap={12}>
          <Link href="/#projects" variant="nav">
            Projects
          </Link>

          <Link href="/about" variant="nav">
            About
          </Link>

          <Link href={resumeHref} variant="nav" target="_blank">
            Resume
          </Link>
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
            <FontAwesomeIcon icon={faBars} width="14px" />
          </Button>

          <Modal
            closeOnOverlayClick={true}
            isOpen={isOpen}
            motionPreset="none"
            size="full"
            onClose={onClose}
          >
            <ModalContent bg="gray.50">
              <ModalHeader>
                <Link
                  href="/"
                  fontSize="sm"
                  textStyle="uppercase"
                  onClick={onClose}
                >
                  Kyle Zweng
                </Link>
              </ModalHeader>

              <ModalCloseButton mt={2} />

              <Flex direction="column">
                <MobileLink href="/#projects" onClick={onClose}>
                  Projects
                </MobileLink>

                <MobileLink href="/about" onClick={onClose}>
                  About
                </MobileLink>

                <MobileLink href={resumeHref} target="_blank" onClick={onClose}>
                  Resume
                </MobileLink>
              </Flex>
            </ModalContent>
          </Modal>
        </Box>
      </Section>
    </Box>
  );
};

const MobileLink: FC<Readonly<LinkProps>> = ({ href, children, ...props }) => (
  <Link
    href={href}
    display="flex"
    w="100%"
    alignItems="start"
    justifyContent="space-between"
    fontSize="lg"
    py={6}
    px={6}
    borderTop="1px solid"
    borderColor="gray.300"
    _last={{ borderBottom: "1px solid", borderColor: "gray.300" }}
    _hover={{
      bg: "blue.50",
    }}
    {...props}
  >
    {children}
    <FontAwesomeIcon icon={faChevronRight} width="14px" />
  </Link>
);

export default Nav;
