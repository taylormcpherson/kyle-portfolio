import {
  Text,
  Box,
  Flex,
  Modal,
  Button,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

interface MdxImageProps {
  src?: string;
  alt?: string;
  title?: string;
}

export const MdxImage: FC<Readonly<MdxImageProps>> = ({ src, alt, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        as="figure"
        pos="relative"
        direction="column"
        align="center"
        maxW="900px"
        mx="auto"
        my={{ base: 10, md: 16 }}
      >
        <Button
          aria-label="Image zoom in"
          variant="unstyled"
          display={{ base: "none", lg: "block" }}
          pos="absolute"
          inset={0}
          w="100%"
          h="100%"
          cursor="zoom-in"
          zIndex={3}
          onClick={onOpen}
        />

        <Image
          src={src + "?w=1600"}
          alt={alt ?? "Image."}
          sizes="100%"
          width={1}
          height={1}
          style={{
            objectFit: "contain",
            width: "100%",
            height: "auto",
            maxHeight: "75vh",
            borderRadius: "6px",
          }}
        />

        {title && (
          <Text
            as="figcaption"
            fontSize="sm"
            fontWeight="400"
            textAlign="center"
            maxW={{ base: "100%", md: "70%" }}
            mx="auto"
            mt={3}
          >
            {title}
          </Text>
        )}
      </Flex>

      <Modal
        isCentered
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <ModalOverlay />

        <ModalContent maxW="6xl">
          <ModalHeader fontWeight="400" fontSize="lg" mr={8}>
            {title}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Image
              src={src + "?w=1600"}
              alt={alt ?? "Image."}
              sizes="100%"
              width={1}
              height={1}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "auto",
                maxHeight: "88vh",
                padding: 12,
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
