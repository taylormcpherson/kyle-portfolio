import { getProject, getProjectSlugs, Project } from "@/lib/sanity/queries"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
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
import { Text, Box, Flex } from "@chakra-ui/react"
import Section from "@/components/section"
import Link from "@/components/link"

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

      <Section
        flexDirection={{ base: "column", md: "row" }}
        minHeight="70vh"
        alignItems="center"
        gap={8}
      >
        <Box flex={2}>
          <Text as="h1" textStyle="h1">
            {project.title}
          </Text>

          <Text mt={4} fontSize="xl">
            {project.subtitle}
          </Text>
        </Box>

        <Box pos="relative" flex={1} borderRadius="md" overflow="hidden">
          <Image
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            sizes="100%"
            width={1}
            height={1}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              maxWidth: "400px",
              maxHeight: "300px",
            }}
          />
        </Box>
      </Section>

      <Section
        pos="relative"
        flexDirection="row"
        alignItems="start"
        gap={12}
        pb={32}
      >
        {headings.length > 0 && (
          <Box
            as="aside"
            display={{ base: "none", md: "block" }}
            flex={0.25}
            top={20}
            pos="sticky"
          >
            <Box as="nav" aria-label="Table of Contents">
              <Text fontSize="md">Table of contents</Text>

              <Flex direction="column" mt={4} gap={3}>
                {headings.map(({ title, href }) => (
                  <Link
                    key={href}
                    href={href}
                    fontSize="sm"
                    _hover={{ color: "green.500" }}
                  >
                    {title}
                  </Link>
                ))}
              </Flex>
            </Box>
          </Box>
        )}

        <Box flex={1} maxW="100%">
          <ReactMarkdown
            components={components()}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            remarkPlugins={[remarkGfm]}
            linkTarget="_blank"
          >
            {project.body}
          </ReactMarkdown>
        </Box>
      </Section>
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
