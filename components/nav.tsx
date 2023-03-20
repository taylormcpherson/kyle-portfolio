import { FC, useState } from "react"
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import Link from "./link"
import Section from "./section"

const Nav: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

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
        <Link href="/">kyle zweng</Link>

        <Flex display={{ base: "none", md: "flex" }} gap={8}>
          <Link href="/#projects">projects</Link>

          <Link href="/about/">about</Link>
        </Flex>

        <Flex
          as="nav"
          aria-label="Mobile primary"
          aria-hidden={!isOpen}
          display={{ base: "flex", md: "none" }}
          pos="absolute"
          inset={0}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg={isOpen ? "white" : "transparent"}
          height={isOpen ? "100vh" : "auto"}
        >
          <MobileToggle
            aria-label="Open navigation menu"
            display={isOpen ? "none" : "flex"}
            onClick={() => setOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </MobileToggle>

          <MobileToggle
            aria-label="Close navigation menu"
            display={isOpen ? "flex" : "none"}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon icon={faClose} />
          </MobileToggle>

          <List
            display={isOpen ? "flex" : "none"}
            flexDirection="column"
            gap={8}
            zIndex={20}
          >
            <ListItem>
              <Link href="/#projects">projects</Link>
            </ListItem>

            <ListItem>
              <Link href="/about/">about</Link>
            </ListItem>
          </List>
        </Flex>
      </Section>
    </Box>
  )
}

const MobileToggle: FC<Readonly<ButtonProps>> = ({ children, ...props }) => (
  <Button pos="absolute" top={2} right={2} p={2} {...props}>
    {children}
  </Button>
)

export default Nav
