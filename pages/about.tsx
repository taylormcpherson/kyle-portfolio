import { Badge, Box, Flex, Text } from "@chakra-ui/react"
import { getPage, Page as SanityPage } from "@/lib/sanity/queries"
import { NextPage } from "next"
import { Helmet } from "react-helmet"
import { Layout } from "@/components/layout"
import Link from "@/components/link"
import Section from "@/components/section"
import { Tag } from "@/components/tags"

const About: NextPage<Readonly<{ page: SanityPage }>> = ({ page }) => {
  return (
    <Layout>
      <Helmet
        title={`${page.metaTitle} | Kyle Zweng`}
        meta={[
          {
            property: "og:title",
            content: page.metaTitle + " | Kyle Zweng",
          },
          {
            property: "og:description",
            content: page.metaDescription,
          },
          {
            property: "description",
            content: page.metaDescription,
          },
        ]}
      />

      <Section minH={{ base: "auto", md: "90vh" }} pb={32}>
        <Text as="h1" textStyle="h2" pt={{ base: 10, md: 32 }}>
          {page.title}
        </Text>

        <Text as="h2" textStyle="h3" mt={8}>
          {page.subtitle}
        </Text>

        <Flex
          pt={{ base: 16, md: 32 }}
          gap={{ base: 12, md: 16 }}
          direction={{ base: "column", md: "row" }}
        >
          <Box>
            <Text textStyle="uppercase" fontSize="sm">
              Skills
            </Text>

            <Flex align="center" gap={2} mt={4}>
              <Tag name="excel" fontSize={{ base: "sm", md: "md" }} />

              <Tag name="sql" fontSize={{ base: "sm", md: "md" }} />

              <Tag name="r" fontSize={{ base: "sm", md: "md" }} />

              <Tag name="tableau" fontSize={{ base: "sm", md: "md" }} />
            </Flex>
          </Box>

          <Box>
            <Text textStyle="uppercase" fontSize="sm">
              Certifications
            </Text>

            <Flex
              align={{ base: "start", md: "center" }}
              direction={{ base: "column", md: "row" }}
              gap={{ base: 4, md: 2 }}
              mt={4}
            >
              <Badge
                colorScheme="blue"
                variant="outline"
                fontSize={{ base: "sm", md: "md" }}
              >
                Google Data Analytics
              </Badge>
              <Badge
                colorScheme="yellow"
                variant="outline"
                fontSize={{ base: "sm", md: "md" }}
              >
                CoRise SQL Crash Course
              </Badge>

              <Link
                href="https://www.linkedin.com/in/kyle-zweng-1b9333150/details/certifications/"
                fontSize="sm"
              >
                View all →
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const page = await getPage("/about")

  return {
    props: {
      page,
    },
    revalidate: 60,
  }
}

export default About
