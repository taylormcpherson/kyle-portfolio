import { Container, ContainerProps } from "@chakra-ui/react"
import { FC } from "react"

const Section: FC<Readonly<ContainerProps>> = ({ children, ...props }) => (
  <Container
    as="section"
    maxW="container.section"
    display="flex"
    flexDirection="column"
    mx={{ base: 2, md: 6, lg: "auto" }}
    {...props}
  >
    {children}
  </Container>
)

export default Section
