import Section from "@/components/section"
import { getPage, Page as SanityPage } from "@/lib/sanity/queries"
import { Text } from "@chakra-ui/react"
import { NextPage } from "next"
import { Helmet } from "react-helmet"
import { Layout } from "../components/layout"

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
        ]}
      />
      <Section minH="90vh">
        <Text as="h1" textStyle="h2" pt={32}>
          {page.title}
        </Text>
        <Text textStyle="h4" mt={8}>
          {page.subtitle}
        </Text>
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
