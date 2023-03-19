import { FC, ReactNode } from "react"
import { Helmet } from "react-helmet"
import Link from "next/link"
import { NavBar } from "../components/nav"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

import styles from "../styles/Layout.module.css"

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
      <NavBar />
      {children}
    </main>

    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Kyle Zweng. Built by{" "}
        <Link className={styles.link} href="https://taylormcpherson.dev">
          Taylor McPherson
        </Link>
      </p>

      <ul>
        <li>
          <Link
            className={styles.link}
            href="mailto:taylormcpherson.dev@gmail.com"
            target="_blank"
            rel="nofollow noreferrer"
            aria-label="LinkedIn."
          >
            <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
            href="https://www.linkedin.com/in/kyle-zweng-1b9333150/"
            rel="noreferrer"
            target="_blank"
            aria-label="LinkedIn."
          >
            <FontAwesomeIcon className={styles.icon} icon={faLinkedinIn} />
          </Link>
        </li>
        <li>
          <Link
            className={styles.link}
            href="https://github.com/taylormcpherson"
            rel="noreferrer"
            target="_blank"
            aria-label="Github."
          >
            <FontAwesomeIcon className={styles.icon} icon={faGithub} />
          </Link>
        </li>
      </ul>
    </footer>
  </>
)
