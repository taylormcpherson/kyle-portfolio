import { Helmet } from "react-helmet"
import {
  getAllProjects,
  getPage,
  Page as SanityPage,
  ProjectPreview,
} from "@/lib/sanity/queries"
import { NextPage } from "next"
import { List, Text } from "@chakra-ui/react"
import { Layout } from "@/components/layout"
import { Card } from "@/components/card"
import Section from "@/components/section"

interface PageProps {
  page: SanityPage
  projects: ProjectPreview[]
}

const Home: NextPage<Readonly<PageProps>> = ({ page, projects }) => {
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

      <Section minH={{ base: "auto", md: "70vh" }}>
        <Text as="h1" textStyle="h1" pt={{ base: 10, md: 32 }}>
          {page.title}
        </Text>

        <Text as="h2" textStyle="h4" mt={8}>
          {page.subtitle}
        </Text>
      </Section>

      <Section id="projects">
        <Text as="h2" textStyle="uppercase" fontSize="sm" mb={2} pt={12}>
          Selected works
        </Text>

        <List>
          {projects.map((project) => (
            <Card key={project.slug} {...project} />
          ))}
        </List>
      </Section>
    </Layout>
  )
}

export async function getStaticProps() {
  const projects = await getAllProjects()
  const page = await getPage("/")

  return {
    props: {
      projects,
      page,
    },
    revalidate: 60,
  }
}

export default Home
