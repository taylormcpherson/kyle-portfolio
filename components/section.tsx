import { Container, ContainerProps } from "@chakra-ui/react"
import { FC } from "react"

const Section: FC<Readonly<ContainerProps>> = ({ children, ...props }) => (
  <Container
    as="section"
    maxW="container.section"
    display="flex"
    flexDirection="column"
    px={{ base: 4, md: 6, lg: "auto" }}
    py={{ base: 8, md: 12 }}
    {...props}
  >
    {children}
  </Container>
)

export default Section
