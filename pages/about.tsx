import { Badge, Box, Flex, Text } from "@chakra-ui/react"
import { getPage, Page as SanityPage } from "@/lib/sanity/queries"
import { NextPage } from "next"

import Link from "@/components/link"
import Section from "@/components/section"
import { Tag } from "@/components/tags"
import { Page } from "@/components/page"

const About: NextPage<Readonly<{ page: SanityPage }>> = ({ page }) => {
  return (
    <Page title={page.metaTitle} description={page.metaDescription}>
      <Section maxW="4xl">
        <Box mt={8} mb={32} textAlign="justify">
          <Text as="h1" textStyle="h2">
            {page.title}
          </Text>

          <Text as="h2" textStyle="p" mt={8}>
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
                <Tag name="sql" fontSize={{ base: "sm", md: "md" }} />

                <Tag name="excel" fontSize={{ base: "sm", md: "md" }} />

                <Tag name="tableau" fontSize={{ base: "sm", md: "md" }} />

                <Tag name="r" fontSize={{ base: "sm", md: "md" }} />
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
                  colorScheme="facebook"
                  variant="outline"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Google Data Analytics
                </Badge>
                <Badge
                  colorScheme="orange"
                  variant="outline"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  CoRise SQL Crash Course
                </Badge>

                <Link
                  href="https://www.linkedin.com/in/kyle-zweng-1b9333150/details/certifications/"
                  variant="green"
                >
                  View all →
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Section>
    </Page>
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
