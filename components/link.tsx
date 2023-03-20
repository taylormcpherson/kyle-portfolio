import { Link as ChakraLink, LinkProps } from "@chakra-ui/react"
import NextLink from "next/link"
import { FC } from "react"

const Link: FC<Readonly<LinkProps>> = ({ href, children, ...props }) => (
  <ChakraLink
    as={NextLink}
    href={href}
    fontWeight="base"
    color="inherit"
    fontSize="inherit"
    _hover={{ color: "blue.500" }}
    scrollBehavior="smooth"
    {...props}
  >
    {children}
  </ChakraLink>
)

export default Link
