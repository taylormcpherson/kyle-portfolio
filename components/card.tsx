import { FC } from "react";
import Image from "next/image";
import { ProjectPreview } from "@/lib/sanity/queries";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/react";
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
      <Box flex={{ base: 1, lg: 2 }} my={4}>
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

        <Text color="gray.600" mt={6}>
          <Balancer>{subtitle}</Balancer>
        </Text>

        <Text
          color="green.500"
          fontWeight="medium"
          mt={6}
          opacity={{ base: 1, md: 0 }}
          transition=".15s all ease-in-out"
          _groupHover={{ color: "green.500", opacity: 1 }}
        >
          View project →
        </Text>
      </Box>

      <AspectRatio
        pos="relative"
        ratio={16 / 9}
        flex={1}
        w={{ base: "100%", md: "auto" }}
        maxW="400px"
        borderRadius="md"
        overflow="hidden"
        blur={0.5}
        transition=".15s all ease-in-out"
        _groupHover={{ filter: "brightness(0.7) invert(0.01)" }}
      >
        <Image
          priority
          fill
          src={imageUrl + "?w=800"}
          alt={imageAlt ?? title}
          sizes="100%"
          style={{
            objectFit: "cover",
          }}
        />
      </AspectRatio>
    </Flex>
  </Box>
);
