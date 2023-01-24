import { Helmet } from "react-helmet";
import { Layout } from "../components/layout";
import styles from '../styles/About.module.css';
import textStyles from "../styles/Typography.module.css";

export default function About() {
    return (
      <Layout>
        <Helmet
          title="About | Kyle Zweng"
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
        <section className={styles.container}>
          <h1 className={textStyles.title}
              data-sal="slide-up"
              data-sal-duration="500"
              data-sal-delay="300"
              data-sal-easing="ease-in-out"
          > 
            Hi 👋 I&apos;m Taylor,<br />
            a frontend software engineer <br />
            with a heart for social impact.
          </h1>
          <p className={textStyles.paragraph}>
            I work at a high-growth startup building responsive, accessible, and delightful web and app experiences. I work in React, TypeScript, JavaScript, and all things CSS. I regularly use content management systems and I enjoy gamifying SEO rankings with platforms like Lighthouse, AHrefs, and Google Search Console. This is an ever-changing field to work in, and I am always eager to pick up new skills, languages, or improvements to my craft.
          </p>
          <p className={textStyles.paragraph}>
            I formally studied computer science, UX research &amp; design, as well as feminist theory
            and art history. Whatever I am doing though, I do it with a sincere desire to learn as much as I can and contribute to a better world.
          </p>
        </section>
      </Layout>
    )
  }