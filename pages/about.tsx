import { Badge, Box, Flex, Text } from "@chakra-ui/react"
import { getPage, Page as SanityPage } from "@/lib/sanity/queries"
import { NextPage } from "next"
import { Helmet } from "react-helmet"
import { Layout } from "@/components/layout"
import Link from "@/components/link"
import Section from "@/components/section"

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
              <Badge colorScheme="green" fontSize="base">
                Excel
              </Badge>
              <Badge colorScheme="blue" fontSize="base">
                SQL
              </Badge>
              <Badge colorScheme="pink" fontSize="base">
                R
              </Badge>
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
              <Badge colorScheme="teal" variant="outline" fontSize="base">
                Google Data Analytics
              </Badge>
              <Badge colorScheme="yellow" variant="outline" fontSize="base">
                CoRise SQL Crash Course
              </Badge>

              <Link
                href="https://www.linkedin.com/in/kyle-zweng-1b9333150/details/certifications/"
                variant="green"
                fontSize="sm"
              >
                view all →
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
