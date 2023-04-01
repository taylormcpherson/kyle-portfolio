import { getProject, getProjectSlugs, Project } from "@/lib/sanity/queries"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { Helmet } from "react-helmet"
import ReactMarkdown from "react-markdown"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import remarkUnwrapImages from "remark-unwrap-images"
import GithubSlugger from "github-slugger"
import { unified } from "unified"
import remarkParse from "remark-parse"
import { visit } from "unist-util-visit"
import { Text, Box, Flex, Divider } from "@chakra-ui/react"
import { Layout } from "@/components/layout"
import { components } from "@/components/markdown"
import Section from "@/components/section"
import Link from "@/components/link"
import { Tag } from "@/components/tags"
import { ProjectLink } from "@/components/project-link"

interface Heading {
  title: string
  href: string
}

interface PageProps {
  project: Project
  headings: Heading[]
}

const ProjectPage: NextPage<Readonly<PageProps>> = ({ project, headings }) => {
  const scrollToLink = (href: string) => {
    let scrollElement: HTMLElement | null = null
    if (typeof window !== "undefined") {
      scrollElement = document.querySelector(href)
    }

    if (scrollElement) {
      const elementPosition = scrollElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 80

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

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
          {
            property: "description",
            content: project.metaDescription,
          },
        ]}
      />

      <Section
        flexDirection={{ base: "column", lg: "row" }}
        minHeight="70vh"
        alignItems={{ base: "start", lg: "center" }}
        gap={8}
      >
        <Box flex={{ base: 1, lg: 1.75 }}>
          {project.tags.length > 0 && (
            <Flex gap={2} mb={3}>
              {project.tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </Flex>
          )}

          <Text as="h1" textStyle="h1">
            {project.title}
          </Text>

          <Text mt={4} fontSize={{ base: "md", md: "xl" }}>
            {project.subtitle}
          </Text>

          {project.links?.length && (
            <Flex
              color="gray.600"
              wrap="wrap"
              gap={{ base: 4, md: 6 }}
              mt={{ base: 10, md: 20 }}
            >
              {project.links.map((link) => (
                <ProjectLink key={link.url} showText {...link} />
              ))}
            </Flex>
          )}
        </Box>

        <Box pos="relative" flex={1} w={{ base: "100%", lg: "auto" }}>
          <Image
            src={project.imageUrl + "?w=1000"}
            alt={project.imageAlt ?? project.title}
            priority
            sizes="100%"
            width={1}
            height={1}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              maxWidth: "500px",
              maxHeight: "300px",
              borderRadius: "6px",
            }}
          />
        </Box>
      </Section>

      <Section
        pos="relative"
        flexDirection="row"
        alignItems="start"
        gap={{ base: 6, xl: 8 }}
        pb={40}
      >
        {headings.length > 0 && (
          <Box
            as="aside"
            display={{ base: "none", lg: "block" }}
            flex={0.225}
            top={20}
            pos="sticky"
          >
            <Box as="nav" aria-label="Table of Contents" fontWeight="base">
              <Text fontSize="md" fontWeight="400">
                Table of contents
              </Text>

              <Flex direction="column" mt={4} gap={3}>
                {headings.map(({ title, href }) => (
                  <Link
                    key={href}
                    href={href}
                    fontSize="sm"
                    _hover={{ color: "green.500" }}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToLink(href)
                    }}
                  >
                    {title}
                  </Link>
                ))}
              </Flex>

              {project.links?.length && (
                <Box mt={8} pt={8} borderTop="1px solid" borderColor="gray.300">
                  <Text fontSize="md" fontWeight="400">
                    Project links
                  </Text>

                  <Flex
                    color="gray.600"
                    wrap="wrap"
                    gap={{ base: 4, md: 6 }}
                    mt={4}
                  >
                    {project.links.map((link) => (
                      <ProjectLink key={link.url} {...link} />
                    ))}
                  </Flex>
                </Box>
              )}
            </Box>
          </Box>
        )}

        <Box flex={1} maxW="100%">
          <ReactMarkdown
            components={components()}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            remarkPlugins={[remarkGfm, remarkUnwrapImages]}
            linkTarget="_blank"
          >
            {project.body}
          </ReactMarkdown>
        </Box>
      </Section>
    </Layout>
  )
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

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      headings: getArticleHeadings(project.body),
    },
    revalidate: 60,
  }
}

export default ProjectPage
