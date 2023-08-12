import { FC } from "react";
import Image from "next/image";
import { ProjectPreview } from "@/lib/sanity/queries";
import { Box, Flex, ListItem, Text } from "@chakra-ui/react";
import Balancer from "react-wrap-balancer";
import Link from "./link";
import { Tag } from "./tag";

export const Card: FC<Readonly<ProjectPreview & { isFirst?: boolean }>> = ({
  isFirst,
  title,
  subtitle,
  slug,
  imageUrl,
  imageAlt,
  tags,
}) => (
  <Box
    pos="relative"
    role="group"
    borderTop={isFirst ? "none" : "1px solid"}
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
              <Tag key={tag} variant={tag}>
                {tag}
              </Tag>
            ))}
          </Flex>
        )}

        <Text as="h3" textStyle="h2" fontWeight="medium">
          <Balancer>{title}</Balancer>
        </Text>

        <Text color="gray.600" fontSize={{ base: "base", md: "lg" }} mt={6}>
          <Balancer>{subtitle}</Balancer>
        </Text>

        <Text
          color="green.500"
          fontSize={{ base: "base", md: "lg" }}
          fontWeight="medium"
          mt={6}
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
        // filter="brightness(0.8) invert(0.01)"
        blur={0.5}
        transition=".15s all ease-in-out"
        _groupHover={{ filter: "brightness(0.8) invert(0.01)" }}
      >
        <Image
          priority
          src={imageUrl + "?w=800"}
          alt={imageAlt ?? title}
          sizes="100%"
          width={350}
          height={125}
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
  </Box>
);
