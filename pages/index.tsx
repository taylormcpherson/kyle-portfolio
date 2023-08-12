import {
  getAllProjects,
  getPage,
  Page as SanityPage,
  ProjectPreview,
  SanityTagVariants,
} from "@/lib/sanity/queries";
import { NextPage } from "next";
import {
  chakra,
  shouldForwardProp,
  Button,
  Flex,
  List,
  Text,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

import { Card } from "@/components/card";
import Section from "@/components/section";
import { Page } from "@/components/page";
import { Tag } from "@/components/tag";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const ChakraListItem = chakra(motion.li, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

interface PageProps {
  page: SanityPage;
  projects: ProjectPreview[];
}

function getUniqueTags(projects: ProjectPreview[]) {
  return projects
    .map((project) => project.tags)
    .flat()
    .filter((value, index, self) => self.indexOf(value) === index);
}

const Home: NextPage<Readonly<PageProps>> = ({ page, projects }) => {
  const tags = getUniqueTags(projects);
  const [filter, setFilter] = useState<SanityTagVariants>();
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (filter) {
      setFilteredProjects(
        projects.filter((project) => project.tags.includes(filter))
      );
    } else {
      setFilteredProjects(projects);
    }
  }, [filter, projects]);

  return (
    <Page title={page.metaTitle} description={page.metaDescription}>
      <Section py={{ base: 10, md: 24 }} textAlign="center">
        <Text as="h1" textStyle="h1Xl">
          {page.title}
        </Text>

        <Text as="h2" textStyle="h4" mt={8}>
          {page.subtitle}
        </Text>
      </Section>

      <Section id="projects" fullWidth mt={0}>
        <Section
          as="div"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          gap={12}
          py={0}
          pt={6}
          pb={3}
        >
          <Text as="h2" textStyle="uppercase" fontSize="sm">
            Selected projects
          </Text>

          <Flex display={{ base: "none", md: "flex" }} align="center" gap={3}>
            <Text as="h2" textStyle="uppercase" fontSize="sm">
              Filter
            </Text>

            <Flex align="center" gap={2}>
              {tags.map((tag) => {
                const isActive = tag === filter;
                return (
                  <Button
                    key={tag}
                    size="sm"
                    onClick={() => setFilter(isActive ? undefined : tag)}
                  >
                    <Tag
                      key={tag}
                      variant={isActive ? tag : "subtle"}
                      transition=".15s all ease-in-out"
                      _hover={{ bg: isActive ? undefined : "gray.200" }}
                    >
                      {tag}
                    </Tag>
                  </Button>
                );
              })}
            </Flex>
          </Flex>
        </Section>

        <List borderTop="1px solid" borderTopColor="gray.300">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ChakraListItem
                key={project.slug}
                animate={{ opacity: 1, transition: { duration: 0.25 } }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
              >
                <Card isFirst={index === 0} {...project} />
              </ChakraListItem>
            ))}
          </AnimatePresence>
        </List>
      </Section>
    </Page>
  );
};

export async function getStaticProps() {
  const projects = await getAllProjects();
  const page = await getPage("/");

  return {
    props: {
      projects,
      page,
    },
    revalidate: 60,
  };
}

export default Home;
