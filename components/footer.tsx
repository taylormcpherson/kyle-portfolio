import { FC } from "react"
import Section from "./section"
import Link from "./link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { Box, Flex, Text } from "@chakra-ui/react"

const Footer: FC = () => (
  <Box as="footer" bg="gray.50" borderTop="1px solid" borderColor="gray.300">
    <Section
      as="div"
      flexDirection={{ base: "column-reverse", md: "row" }}
      gap={8}
      pt={8}
      pb={4}
    >
      <Text flex={1} fontSize="sm">
        © {new Date().getFullYear()} Kyle Zweng. Built by{" "}
        <Link href="https://taylormcpherson.dev">Taylor McPherson</Link>.
      </Text>

      <Flex
        flex={1}
        justify={{ base: "start", md: "end " }}
        boxSize={6}
        gap={4}
      >
        <Link
          href="https://www.linkedin.com/in/kyle-zweng-1b9333150/"
          rel="noreferrer"
          target="_blank"
          aria-label="LinkedIn."
        >
          <FontAwesomeIcon icon={faLinkedinIn} />
        </Link>
      </Flex>
    </Section>
  </Box>
)

export default Footer
