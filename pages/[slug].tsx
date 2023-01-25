import { getProject, getProjectSlugs, Project } from "@/lib/sanity/queries";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextImage from "next/image";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { Layout } from "../components/layout";
import styles from '../styles/Project.module.css';
import textStyles from "../styles/Typography.module.css";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

import { useState } from "react";
import { components } from "@/components/markdown";

interface Heading {
  title: string;
  href: string;
}

interface PageProps {
  project: Project;
  mdx: MDXRemoteSerializeResult;
  headings: Heading[];
}

const ProjectPage: NextPage<Readonly<PageProps>> = ({ project, mdx, headings }) => {
  const [mdxSource, setMDXSource] = useState<MDXRemoteSerializeResult>(mdx);

  const serializeMDX = async (content: string) => {
    const newMDX = await serializeArticle(content);
    setMDXSource(newMDX);
  };
  
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
        <ReactMarkdown components={components()}>
          {project.body}
        </ReactMarkdown>
      </section>
    </Layout>
  )
};

const serializeArticle = async (content: string) => {
  const mdx = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeHighlight],
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
  });

  return mdx;
};

interface Heading {
  title: string;
  href: string;
}

const getArticleHeadings = (blogContent: string): Heading[] => {
  const slugger = new GithubSlugger();
  const tree = unified().use(remarkParse).parse(blogContent);
  const headings: Heading[] = [];

  visit(tree, "heading", (node) => {
    if (node.depth === 2) {
      const title = blogContent
        .slice(node.position?.start.offset ?? 0, node.position?.end.offset ?? 0)
        .replace(/^#+/g, "")
        .trim();

      headings.push({
        title,
        href: `#${slugger.slug(title)}`,
      });
    }
  });

  return headings;
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
  const mdx = await serializeArticle(project.body);
  
  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      mdx,
      headings: getArticleHeadings(project.body),
    },
    revalidate: 60,
  };
};

export default ProjectPage;