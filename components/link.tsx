import { Link as ChakraLink, LinkProps } from "@chakra-ui/react"
import NextLink from "next/link"
import { FC } from "react"

const Link: FC<Readonly<LinkProps>> = ({
  href,
  variant = "default",
  children,
  ...props
}) => (
  <ChakraLink
    as={NextLink}
    href={href}
    variant={variant}
    fontWeight="400"
    {...props}
  >
    {children}
  </ChakraLink>
)

export default Link
