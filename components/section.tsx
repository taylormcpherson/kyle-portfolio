import { Container, ContainerProps } from "@chakra-ui/react";
import { FC } from "react";

interface SectionProps extends ContainerProps {
  fullWidth?: boolean;
}

const Section: FC<Readonly<SectionProps>> = ({
  fullWidth = false,
  children,
  ...props
}) => (
  <Container
    as="section"
    display="flex"
    flexDirection="column"
    maxW={fullWidth ? "100%" : "container.section"}
    px={fullWidth ? 0 : { base: 4, md: 6, lg: "auto" }}
    py={{ base: 8, md: 12 }}
    {...props}
  >
    {children}
  </Container>
);

export default Section;
