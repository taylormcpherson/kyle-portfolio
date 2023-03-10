import { getPage, Page as SanityPage } from "@/lib/sanity/queries";
import { NextPage } from "next";
import { Helmet } from "react-helmet";
import { Layout } from "../components/layout";
import styles from '../styles/About.module.css';
import textStyles from "../styles/Typography.module.css";

const About: NextPage<Readonly<{ page: SanityPage }>> = ({ page }) => {
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
            content: page.metaDescription,
          },
        ]}
      />
      <section className={styles.container}>
        <h1 className={textStyles.title}> 
          {page.title}
        </h1>
        <p className={textStyles.paragraph}>
          {page.subtitle}
        </p>
      </section>
    </Layout>
  )
}


export async function getStaticProps() {
  const page = await getPage("/about");

  return {
    props: {
      page,
    },
    revalidate: 60,
  };
}

export default About;