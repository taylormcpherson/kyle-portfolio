import { getProject, getProjectSlugs, Project } from "@/lib/sanity/queries";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkUnwrapImages from "remark-unwrap-images";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { Text, Box, Flex, Divider } from "@chakra-ui/react";

import { components } from "@/components/markdown";
import Section from "@/components/section";
import Link from "@/components/link";
import { Tag } from "@/components/tag";
import { ProjectLink } from "@/components/project-link";
import { Page } from "@/components/page";

interface Heading {
  title: string;
  href: string;
}

interface PageProps {
  project: Project;
  headings: Heading[];
}

const ProjectPage: NextPage<Readonly<PageProps>> = ({ project, headings }) => {
  const sidebarMinWidth = 260;

  const scrollToLink = (href: string) => {
    let scrollElement: HTMLElement | null = null;
    if (typeof window !== "undefined") {
      scrollElement = document.querySelector(href);
    }

    if (scrollElement) {
      const elementPosition = scrollElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Page
      title={project.metaTitle}
      description={project.metaDescription}
      image={project.imageUrl + "?w=1200"}
    >
      <Section
        alignItems="center"
        flexDirection={{ base: "column", lg: "row" }}
        gap={{ base: 8, lg: 12 }}
        borderBottom="1px solid"
        borderColor="gray.300"
        pb={{ base: 12, lg: 16 }}
      >
        <Box flex={{ base: 1, lg: 1.5 }}>
          {project.tags && project.tags.length > 0 && (
            <Flex gap={2} mb={3}>
              {project.tags.map((tag) => (
                <Tag key={tag} variant={tag}>
                  {tag}
                </Tag>
              ))}
            </Flex>
          )}

          <Text as="h1" textStyle="h1">
            <Balancer> {project.title}</Balancer>
          </Text>

          <Text mt={4} color="gray.600" lineHeight={1.6}>
            <Balancer> {project.subtitle}</Balancer>
          </Text>

          {project.links && project.links.length > 0 && (
            <Flex
              color="gray.600"
              wrap="wrap"
              gap={{ base: 4, md: 6 }}
              mt={{ base: 6, md: 12 }}
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
            width={400}
            height={200}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              maxWidth: "500px",
              borderRadius: "6px",
            }}
          />
        </Box>
      </Section>

      <Section
        pos="relative"
        flexDirection="row"
        alignItems="start"
        gap={{ base: 8, xl: 16 }}
        pb={40}
      >
        {headings.length > 0 && (
          <Box
            as="aside"
            display={{ base: "none", lg: "block" }}
            flex={0.225}
            w={`${sidebarMinWidth}px`}
            top={20}
            pos="sticky"
          >
            <Box as="nav" aria-label="Table of Contents" fontWeight="base">
              <Text fontSize="md" fontWeight="medium">
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
                      event.preventDefault();
                      scrollToLink(href);
                    }}
                  >
                    {title}
                  </Link>
                ))}
              </Flex>

              {project.links && project.links.length > 0 && (
                <Box mt={8} pt={8} borderTop="1px solid" borderColor="gray.300">
                  <Text fontSize="md" fontWeight="400">
                    Project links
                  </Text>

                  <Flex
                    align="center"
                    color="gray.600"
                    wrap="wrap"
                    gap={{ base: 4, md: 5 }}
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

        <Box
          flex={1}
          maxW={{
            base: "100%",
            lg: `calc(100vw - (${sidebarMinWidth}px + 80px))`,
            xl: `calc(var(--chakra-sizes-container-section) - (${sidebarMinWidth}px + 80px))`,
          }}
        >
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
    </Page>
  );
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

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      headings: getArticleHeadings(project.body),
    },
    revalidate: 60,
  };
};

export default ProjectPage;
