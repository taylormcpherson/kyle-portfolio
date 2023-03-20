import { FC, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons"
import styles from "../styles/Nav.module.css"
import Link from "./link"
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/react"
import Section from "./section"

const Nav: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <Box
      as="header"
      pos="sticky"
      top={0}
      py={4}
      bg="white"
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
      >
        <Link href="/">kyle zweng</Link>

        <Flex display={{ base: "none", md: "flex" }} gap={8}>
          <Link href="/">projects</Link>

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
            <FontAwesomeIcon className={styles.icon} icon={faBars} />
          </MobileToggle>
          <MobileToggle
            aria-label="Close navigation menu"
            display={isOpen ? "flex" : "none"}
            onClick={() => setOpen(false)}
          >
            <FontAwesomeIcon className={styles.icon} icon={faClose} />
          </MobileToggle>
          <List
            display={isOpen ? "flex" : "none"}
            flexDirection="column"
            gap={8}
            zIndex={20}
          >
            <ListItem>
              <Link className={`${styles.link} ${styles.mobileLink}`} href="/">
                projects
              </Link>
            </ListItem>
            <ListItem>
              <Link
                className={`${styles.link} ${styles.mobileLink}`}
                href="/about/"
              >
                about
              </Link>
            </ListItem>
          </List>
        </Flex>
      </Section>
    </Box>
  )
}

const MobileToggle: FC<Readonly<ButtonProps>> = ({ children, ...props }) => (
  <Button pos="absolute" top={-2} right={2} p={2} {...props}>
    {children}
  </Button>
)

export default Nav
