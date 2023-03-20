import { FC } from "react"
import Image from "next/image"

import styles from "../styles/Card.module.css"
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
    py={4}
    role="group"
    borderTop="1px solid"
    borderTopColor="gray.300"
  >
    <Link variant="overlay" href={slug}>
      View project
    </Link>

    <Flex gap={12} align="center">
      <Box flex={2}>
        <Text as="h3" textStyle="h2">
          {title}
        </Text>
        <Text
          mt={6}
          fontSize="lg"
          opacity={0}
          transition=".25s opacity ease-in-out"
          _groupHover={{ opacity: 1 }}
        >
          {subtitle}
        </Text>
        <Text
          mt={6}
          fontSize="lg"
          opacity={0}
          transition=".25s all ease-in-out"
          _groupHover={{ color: "green.500", opacity: 1 }}
        >
          View project →
        </Text>
      </Box>

      <Box
        pos="relative"
        flex={1}
        borderRadius="md"
        overflow="hidden"
        opacity={0}
        transition=".25s opacity ease-in-out"
        _groupHover={{ opacity: 1 }}
      >
        <Image
          className={styles.image}
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
          }}
        />
      </Box>
    </Flex>
  </ListItem>
)
