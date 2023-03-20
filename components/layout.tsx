import { FC, ReactNode } from "react"
import { Helmet } from "react-helmet"
import Nav from "../components/nav"
import Footer from "./footer"

export const Layout: FC<Readonly<{ children: ReactNode }>> = ({ children }) => (
  <>
    <Helmet htmlAttributes={{ lang: "en-US" }} title="Kyle Zweng">
      <meta charSet="utf-8" />
      <link
        rel="icon"
        href="data:image/svg+xml,
          <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
            <text y=%22.9em%22 font-size=%2290%22>
            📈
            </text></svg>"
      />
    </Helmet>

    <main>
      <Nav />
      {children}
    </main>

    <Footer />
  </>
)
