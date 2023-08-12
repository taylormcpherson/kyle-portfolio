import { FC } from "react";
import Section from "./section";
import Link from "./link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Box, Flex, Text } from "@chakra-ui/react";

const Footer: FC = () => (
  <Box as="footer" bg="gray.50" borderTop="1px solid" borderColor="gray.300">
    <Section
      as="div"
      color="gray.600"
      fontSize="xs"
      flexDirection={{ base: "column-reverse", md: "row" }}
      gap={8}
      pt={8}
      pb={4}
    >
      <Text flex={1}>
        © {new Date().getFullYear()} Kyle Zweng. Built by{" "}
        <Link href="https://taylormcpherson.dev">Taylor McPherson</Link>.
      </Text>

      <Flex
        color="gray.600"
        boxSize={6}
        flex={1}
        gap={8}
        justify={{ base: "start", md: "end " }}
      >
        <Link
          href="https://www.linkedin.com/in/kzweng01/"
          size="xs"
          rel="noreferrer"
          target="_blank"
          aria-label="LinkedIn."
        >
          <FontAwesomeIcon icon={faLinkedinIn} width="13px" />
        </Link>
        <Link
          href="https://github.com/kylejzweng"
          size="xs"
          rel="noreferrer"
          target="_blank"
          aria-label="GitHhub."
        >
          <FontAwesomeIcon icon={faGithub} width="13px" />
        </Link>
      </Flex>
    </Section>
  </Box>
);

export default Footer;
