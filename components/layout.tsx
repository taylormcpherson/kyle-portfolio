import { Box } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import Nav from "../components/nav"
import Footer from "./footer"

export const Layout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => (
  <>
    <Box as="main" bg="gray.50">
      <Nav />
      {children}
    </Box>

    <Footer />
  </>
)
