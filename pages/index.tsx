import { Helmet } from "react-helmet";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

import { Layout } from "../components/layout";
import { Card } from "../components/card";

import HightouchImage from "../public/images/hightouch.png";

import styles from "../styles/Home.module.css";
import textStyles from "../styles/Typography.module.css";
import cardStyles from "../styles/Card.module.css";


const projects = [
  {
    title: "Hightouch",
    description: "Marketing site for a high-growth, B2B SaaS startup.",
    url: "https://hightouch.com/",
    img: HightouchImage,
    imgAlt: "Hightouch.",
  },
];

export default function Home() {
  const [isPaused, setPausedState] = useState<boolean>(false);

  return (
    <Layout>
      <Helmet
        title="Projects | Kyle Zweng"
        meta={[ 
          {
            property: "og:title",
            content: "About | Kyle Zweng"
          },
          {
            property: "og:description",
            content: "Frontend software engineer specializing in accessible, responsive, performant, and delightful user-first web applications."
          },
          {
            property: "og:image",
            content: "https://taylormcpherson.dev/meta.png"
          }
        ]}
      />
      
      <section className={`${styles.container} ${isPaused ? styles.isPaused : ''}`}>
        <h1 className={textStyles.title}>
          Frontend software engineer at Hightouch
        </h1>
        <h2 className={textStyles.description}>
          building accessible, performant, and delightful tools for us humans on the internet.
        </h2>
        <div className={styles.buttonContainer}>
          <button
            aria-labelledby="pause-label"
            className={`${styles.button} ${!isPaused ? styles.isVisible : ''}`}
            data-state="pause"
            onClick={()=>setPausedState(true)}
          >
            <FontAwesomeIcon className={styles.icon} icon={faPause} />
          </button>
          <p
            id="pause-label"
            className={`${styles.buttonLabel} ${!isPaused ? styles.isVisible : ''}`}
          >
            pause animation
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            aria-labelledby="play-label"
            className={`${styles.button} ${isPaused ? styles.isVisible : ''}`}
            data-state="play"
            onClick={()=>setPausedState(false)}
          >
            <FontAwesomeIcon className={styles.icon} icon={faPlay} />
          </button>
          <p
            id="play-label"
            className={`${styles.buttonLabel} ${isPaused ? styles.isVisible : ''}`}
          >
            play animation
          </p>
        </div>
      </section>

      <section>
        <h2 className={textStyles.leadIn}>
          selected works
        </h2>
        <ul className={cardStyles.cardsList}>
          {projects.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}
