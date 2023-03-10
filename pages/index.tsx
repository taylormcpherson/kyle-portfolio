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
import { getAllProjects, getPage, Page as SanityPage, Project, ProjectPreview } from "@/lib/sanity/queries";
import { NextPage } from "next";


const projects = [
  {
    title: "Hightouch",
    description: "Marketing site for a high-growth, B2B SaaS startup.",
    url: "https://hightouch.com/",
    img: HightouchImage,
    imgAlt: "Hightouch.",
  },
];

interface PageProps {
  page: SanityPage;
  projects: ProjectPreview[];
}

const Home: NextPage<Readonly<PageProps>> = ({ page, projects }) => {
  const [isPaused, setPausedState] = useState<boolean>(false);

  return (
    <Layout>
      <Helmet
        title={`${page.metaTitle} | Kyle Zweng`}
        meta={[ 
          {
            property: "og:title",
            content: page.metaTitle + " | Kyle Zweng"
          },
          {
            property: "og:description",
            content: page.metaDescription
          }
        ]}
      />
      
      <section className={`${styles.container} ${isPaused ? styles.isPaused : ''}`}>
        <h1 className={textStyles.title}>
          {page.title}
        </h1>
        <h2 className={textStyles.description}>
          {page.subtitle}
        </h2>
      </section>

      <section>
        <h2 className={textStyles.leadIn}>
          selected works
        </h2>
        <ul className={cardStyles.cardsList}>
          {projects.map((project) => (
            <Card key={project.slug} {...project} />
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const projects = await getAllProjects();
  const page = await getPage("/");

  return {
    props: {
      projects,
      page,
    },
    revalidate: 60,
  };
}

export default Home;