import { Helmet } from "react-helmet"
import { Layout } from "../components/layout"
import { Card } from "../components/card"
import cardStyles from "../styles/Card.module.css"

import {
  getAllProjects,
  getPage,
  Page as SanityPage,
  Project,
  ProjectPreview,
} from "@/lib/sanity/queries"
import { NextPage } from "next"
import { Heading, List, Text } from "@chakra-ui/react"
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
        ]}
      />

      <Section minH="70vh" justifyContent="center">
        <Text as="h1" textStyle="h1">
          {page.title}
        </Text>
        <Text as="h2" textStyle="h4" mt={8}>
          {page.subtitle}
        </Text>
      </Section>

      <Section>
        <Text as="h2" textStyle="uppercase" mb={2}>
          selected works
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
