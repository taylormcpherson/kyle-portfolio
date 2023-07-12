import { FC } from "react"
import Image from "next/image"
import { ProjectPreview } from "@/lib/sanity/queries"
import { Box, Flex, ListItem, Text } from "@chakra-ui/react"
import Link from "./link"
import { Tag } from "./tags"

export const Card: FC<Readonly<ProjectPreview & { priority?: boolean }>> = ({
  title,
  subtitle,
  slug,
  imageUrl,
  imageAlt,
  tags,
  priority,
}) => (
  <ListItem
    pos="relative"
    role="group"
    borderTop="1px solid"
    borderTopColor="gray.300"
  >
    <Link aria-label={title} variant="overlay" href={slug}>
      View project
    </Link>

    <Flex
      align={{ base: "start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      gap={{ base: 8, md: 20 }}
      maxW="container.section"
      mx="auto"
      py={{ base: 8, md: 4 }}
      px={{ base: 4, md: 6, lg: "auto" }}
    >
      <Box flex={{ base: 1, md: 2 }} my={4}>
        {tags && tags.length > 0 && (
          <Flex gap={2} mb={3}>
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </Flex>
        )}

        <Text as="h3" textStyle="h2">
          {title}
        </Text>

        <Text
          mt={6}
          fontSize={{ base: "base", md: "lg" }}
          opacity={{ base: 1, md: 0 }}
          transition=".15s opacity ease-in-out"
          _groupHover={{ opacity: 1 }}
        >
          {subtitle}
        </Text>

        <Text
          mt={6}
          color="green.500"
          fontSize={{ base: "base", md: "lg" }}
          fontWeight="400"
          opacity={{ base: 1, md: 0 }}
          transition=".15s all ease-in-out"
          _groupHover={{ color: "green.500", opacity: 1 }}
        >
          View project →
        </Text>
      </Box>

      <Box
        pos="relative"
        flex={1}
        w={{ base: "100%", md: "auto" }}
        transition=".15s opacity ease-in-out"
        _groupHover={{ opacity: 1 }}
      >
        <Image
          src={imageUrl + "?w=800"}
          alt={imageAlt ?? title}
          sizes="100%"
          width={1}
          height={1}
          priority={priority}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
            maxWidth: "400px",
            maxHeight: "300px",
            borderRadius: "6px",
          }}
        />
      </Box>
    </Flex>
  </ListItem>
)
