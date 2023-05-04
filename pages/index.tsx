import {
  getAllProjects,
  getPage,
  Page as SanityPage,
  ProjectPreview,
} from "@/lib/sanity/queries"
import { NextPage } from "next"
import { Box, List, Text } from "@chakra-ui/react"

import { Card } from "@/components/card"
import Section from "@/components/section"
import { Page } from "@/components/page"

interface PageProps {
  page: SanityPage
  projects: ProjectPreview[]
}

const Home: NextPage<Readonly<PageProps>> = ({ page, projects }) => {
  return (
    <Page title={page.metaTitle} description={page.metaDescription}>
      <Section py={{ base: 10, md: 32 }}>
        <Text as="h1" textStyle="h1">
          {page.title}
        </Text>

        <Text as="h2" textStyle="h4" mt={8}>
          {page.subtitle}
        </Text>
      </Section>

      <Section id="projects" fullWidth>
        <Section as={Box} py={0}>
          <Text as="h2" textStyle="uppercase" fontSize="sm" mb={2} pt={12}>
            Selected works
          </Text>
        </Section>

        <List>
          {projects.map((project) => (
            <Card key={project.slug} {...project} />
          ))}
        </List>
      </Section>
    </Page>
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
