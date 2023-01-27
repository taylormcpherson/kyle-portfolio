import { useState } from "react";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Nav.module.css";

export const NavBar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <header className={styles.header}>
      <p>kyle zweng</p>

      <nav aria-label="Primary">
        <ul className={styles.list}>
          <li>
            <NextLink className={styles.link} href="/">projects</NextLink>
          </li>
          <li> 
            <NextLink className={styles.link} href="/about/">about</NextLink>
          </li>
          <li> 
            <NextLink
              className={styles.link}
              href="https://drive.google.com/file/d/1AGOSDubE4JUKPQNkMQ9xXoYC78PuUrgI/view?usp=share_link" 
              rel="noreferrer"
              target="_blank"
            >
              resume
          </NextLink>
          </li>
        </ul>
        <button
          aria-label="Open navigation menu"
          className={`${styles.button} ${!isOpen ? styles.isVisible : ''}`}
          data-state="open"
          onClick={()=>setOpen(true)}
        >
          <FontAwesomeIcon className={styles.icon} icon={faBars} />
        </button>
        <button
          aria-label="Close navigation menu"
          className={`${styles.button} ${isOpen ? styles.isVisible : ''}`}
          data-state="close"
          onClick={()=>setOpen(false)}
        >
          <FontAwesomeIcon className={styles.icon} icon={faClose} />
        </button>

        <nav
          aria-label="Mobile primary"
          aria-hidden={!isOpen}
          className={`${styles.mobileContainer} ${isOpen ? styles.isVisible : ''}`}
        >
          <ul className={styles.mobileList}>
            <li>
              <NextLink
                className={`${styles.link} ${styles.mobileLink}`}
                href="/"
              >
                projects
              </NextLink>
            </li>
            <li> 
              <NextLink
                className={`${styles.link} ${styles.mobileLink}`}
                href="/about/"
              >
                about
              </NextLink>
            </li>
            <li> 
              <NextLink
                className={`${styles.link} ${styles.mobileLink}`}
                href="https://drive.google.com/file/d/1AGOSDubE4JUKPQNkMQ9xXoYC78PuUrgI/view?usp=share_link" 
                rel="noreferrer"
                target="_blank"
              >
                resume
            </NextLink>
            </li>
          </ul>
        </nav>
      </nav>
    </header>
  )
}