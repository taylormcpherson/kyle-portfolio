import { FC } from "react"
import Image from "next/image"
import { ProjectPreview } from "@/lib/sanity/queries"
import { Box, Flex, ListItem, Text } from "@chakra-ui/react"
import Link from "./link"

export const Card: FC<Readonly<ProjectPreview>> = ({
  title,
  subtitle,
  slug,
  imageUrl,
  imageAlt,
}) => (
  <ListItem
    pos="relative"
    py={{ base: 8, md: 4 }}
    role="group"
    borderTop="1px solid"
    borderTopColor="gray.300"
  >
    <Link aria-label={title} variant="overlay" href={slug}>
      View project
    </Link>

    <Flex
      gap={{ base: 8, md: 20 }}
      align={{ base: "start", md: "center" }}
      direction={{ base: "column", md: "row" }}
    >
      <Box flex={{ base: 1, md: 2 }}>
        <Text as="h3" textStyle={{ base: "h3", md: "h2" }}>
          {title}
        </Text>

        <Text
          mt={6}
          fontSize={{ base: "base", md: "lg" }}
          opacity={{ base: 1, md: 0 }}
          transition=".25s opacity ease-in-out"
          _groupHover={{ opacity: 1 }}
        >
          {subtitle}
        </Text>

        <Text
          mt={6}
          fontSize={{ base: "base", md: "lg" }}
          fontWeight="400"
          opacity={{ base: 1, md: 0 }}
          color={{ base: "green.500", md: "inherit" }}
          transition=".25s all ease-in-out"
          _groupHover={{ color: "green.500", opacity: 1 }}
        >
          View project →
        </Text>
      </Box>

      <Box
        pos="relative"
        flex={1}
        w={{ base: "100%", md: "auto" }}
        opacity={{ base: 1, md: 0 }}
        transition=".25s opacity ease-in-out"
        _groupHover={{ opacity: 1 }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt ?? title}
          sizes="100%"
          width={1}
          height={1}
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
