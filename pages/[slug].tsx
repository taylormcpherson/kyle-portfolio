import { getProject, getProjectSlugs, Project } from "@/lib/sanity/queries"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import NextImage from "next/image"
import { Helmet } from "react-helmet"
import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import GithubSlugger from "github-slugger"
import { unified } from "unified"
import remarkParse from "remark-parse"
import { visit } from "unist-util-visit"
import { MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { Layout } from "../components/layout"
import { components } from "../components/markdown"
import styles from "../styles/Project.module.css"
import textStyles from "../styles/Typography.module.css"

interface Heading {
  title: string
  href: string
}

interface PageProps {
  project: Project
  mdx: MDXRemoteSerializeResult
  headings: Heading[]
}

const ProjectPage: NextPage<Readonly<PageProps>> = ({
  project,
  mdx,
  headings,
}) => {
  return (
    <Layout>
      <Helmet
        title={`${project.metaTitle} | Kyle Zweng`}
        meta={[
          {
            property: "og:title",
            content: project.metaTitle + " | Kyle Zweng",
          },
          {
            property: "og:description",
            content: project.metaDescription,
          },
        ]}
      />

      <section className={styles.hero}>
        <div>
          <h1 className={textStyles.title}>{project.title}</h1>
          <p className={textStyles.paragraph}>{project.subtitle}</p>
        </div>
        <div className={styles.imageContainer}>
          <NextImage
            className={styles.image}
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            width={300}
            height={500}
          />
        </div>
      </section>

      <section className={styles.body}>
        {headings.length > 0 && (
          <aside>
            <nav aria-label="Table of Contents">
              <h2>Table of contents</h2>
              <div className={styles.tocFlex}>
                {headings.map(({ title, href }) => (
                  <a key={href} href={href} className={styles.tocLink}>
                    {title}
                  </a>
                ))}
              </div>
            </nav>
          </aside>
        )}

        <div className={styles.markdownContainer}>
          <ReactMarkdown
            components={components()}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
          >
            {project.body}
          </ReactMarkdown>
        </div>
      </section>
    </Layout>
  )
}

const serializeArticle = async (content: string) => {
  const mdx = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
  })

  return mdx
}

interface Heading {
  title: string
  href: string
}

const getArticleHeadings = (blogContent: string): Heading[] => {
  const slugger = new GithubSlugger()
  const tree = unified().use(remarkParse).parse(blogContent)
  const headings: Heading[] = []

  visit(tree, "heading", (node) => {
    if (node.depth === 2) {
      const title = blogContent
        .slice(node.position?.start.offset ?? 0, node.position?.end.offset ?? 0)
        .replace(/^#+/g, "")
        .trim()

      headings.push({
        title,
        href: `#${slugger.slug(title)}`,
      })
    }
  })

  return headings
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getProjectSlugs()

  return {
    paths: slugs.map(({ slug }: { slug: string }) => ({ params: { slug } })),
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug = String(params?.slug) ?? ""
  const project = await getProject(slug)
  const mdx = await serializeArticle(project?.body ?? "")

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
  }
}

export default ProjectPage
