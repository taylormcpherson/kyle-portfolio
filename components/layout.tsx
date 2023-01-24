import { FC, ReactNode } from "react";
import { Helmet } from "react-helmet";
import Link from "next/link";
import { NavBar } from "../components/nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/Layout.module.css";

export const Layout: FC<Readonly<{children: ReactNode}>> = ({children}) =>  
(
  <div className={styles.container}>
    <Helmet 
      htmlAttributes={{ lang: "en-US" }}
      title="Taylor McPherson"
    > 
      <meta
        name="description"
        content="Frontend software engineer specializing in accessible, responsive, performant, and delightful user-first web applications."
        key="desc"
      />
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
      <p>© {new Date().getFullYear()} Taylor McPherson. Built with 🤍 + ☕ in Newport Beach, California.</p>

      <ul className={styles.list}>
        <li>
          <Link 
            className={styles.link}
            href="mailto:taylormcpherson.dev@gmail.com"
            target="_blank"
            rel="nofollow noreferrer"
            aria-label="LinkedIn.">
            <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
          </Link>
        </li>
        <li>
          <Link 
              className={styles.link}
              href="https://www.linkedin.com/in/taylor-mcpherson/" 
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn.">
              <FontAwesomeIcon className={styles.icon} icon={faLinkedinIn} />
          </Link>
        </li>
        <li>
          <Link
              className={styles.link}
              href="https://github.com/taylormcpherson" 
              rel="noreferrer"
              target="_blank"
              aria-label="Github.">
              <FontAwesomeIcon className={styles.icon} icon={faGithub} />
          </Link>
        </li>
      </ul>
    </footer>
  </div>
);
