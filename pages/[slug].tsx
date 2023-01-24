import { getProject, getProjectSlugs, Project } from "@/lib/sanity/queries";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextImage from "next/image";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { Layout } from "../components/layout";
import styles from '../styles/Project.module.css';
import textStyles from "../styles/Typography.module.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PageProps {
  project: Project;
}

const ProjectPage: NextPage<Readonly<PageProps>> = ({ project }) => {
  console.log(project.body);
  return (
    <Layout>
      <Helmet
        title={`${project.metaTitle} | Kyle Zweng`}
        meta={[ 
          {
            property: "og:title",
            content: project.metaTitle + " | Kyle Zweng"
          },
          {
            property: "og:description",
            content: project.metaDescription,
          },
        ]}
      />
      <section className={styles.heroContainer}>
 
        <div>
          <h1 className={textStyles.title}
              data-sal="slide-up"
              data-sal-duration="500"
              data-sal-delay="300"
              data-sal-easing="ease-in-out"
          > 
            {project.title}
          </h1>
          <p className={textStyles.paragraph}>
            {project.subtitle}
          </p>
        </div>
        <div className={styles.imageContainer}>
          <NextImage
            className={styles.image}
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            width={400}
            height={400}
          />
        </div>
      </section>

      <section className={styles.bodyContainer}>
      <ReactMarkdown
        // components={{
        //   code({node, inline, className, children, ...props}) {
        //     const match = /language-(\w+)/.exec(className || '')
        //     return !inline && match ? (
        //       <SyntaxHighlighter
        //         style={dark}
        //         language="sql"
        //         PreTag="div"
        //         {...props}
        //       >
        //         {String(children).replace(/\n$/, '')}
        //       </SyntaxHighlighter>
        //     ) : (
        //       <code className={className} {...props}>
        //         {children}
        //       </code>
        //     )
        //   }
        // }}
      >
        {project.body}
      </ReactMarkdown>
      </section>
    </Layout>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getProjectSlugs();

  return {
    paths: slugs.map(({ slug }: { slug: string }) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = String(params?.slug) ?? "";
  const project = await getProject(slug);

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project
    },
    revalidate: 60,
  };
};

export default ProjectPage;