import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { getPage, Page as SanityPage } from "@/lib/sanity/queries";
import { NextPage } from "next";

import Link from "@/components/link";
import Section from "@/components/section";
import { Tag } from "@/components/tag";
import { Page } from "@/components/page";
import { components } from "@/components/markdown";

import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkUnwrapImages from "remark-unwrap-images";

const About: NextPage<Readonly<{ page: SanityPage }>> = ({ page }) => {
  return (
    <Page title={page.metaTitle} description={page.metaDescription}>
      <Section maxW="4xl">
        <Box mt={8} mb={32} textAlign="justify">
          <Text as="h1" textStyle="h2">
            {page.title}
          </Text>

          <Box textStyle="p" mt={8}>
            <ReactMarkdown components={components()} linkTarget="_blank">
              {page.subtitle}
            </ReactMarkdown>
          </Box>

          <Flex
            pt={{ base: 16, md: 20 }}
            gap={{ base: 12, md: 16 }}
            direction={{ base: "column", md: "row" }}
          >
            <Box>
              <Text textStyle="uppercase" fontSize="sm">
                Skills
              </Text>

              <Flex align="center" gap={2} mt={4}>
                <Tag variant="python">Python</Tag>

                <Tag variant="sql">SQL</Tag>

                <Tag variant="excel">Excel</Tag>

                <Tag variant="tableau">Tableau</Tag>

                <Tag variant="r">R</Tag>
              </Flex>
            </Box>

            <Box>
              <Text textStyle="uppercase" fontSize="sm">
                Certifications
              </Text>

              <Flex
                align={{ base: "start", md: "center" }}
                gap={{ base: 4, md: 2 }}
                fontSize="sm"
                mt={4}
                wrap="wrap"
              >
                <Badge
                  colorScheme="facebook"
                  variant="outline"
                  bg="white"
                  size="sm"
                >
                  Google Data Analytics
                </Badge>
                <Badge
                  colorScheme="orange"
                  variant="outline"
                  bg="white"
                  size="sm"
                >
                  CoRise SQL Crash Course
                </Badge>

                <Link
                  href="https://www.linkedin.com/in/kyle-zweng-1b9333150/details/certifications/"
                  variant="green"
                  size="xs"
                  target="_blank"
                >
                  View all →
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Section>
    </Page>
  );
};

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
