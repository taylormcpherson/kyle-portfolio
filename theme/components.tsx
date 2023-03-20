import type { ComponentStyleConfig } from "@chakra-ui/theme"

const Link: ComponentStyleConfig = {
  baseStyle: {
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  },
  sizes: {
    sm: {
      fontSize: "sm",
    },
    md: {
      fontSize: "md",
    },
    lg: {
      fontSize: "lg",
    },
    xl: {
      fontSize: "xl",
    },
  },
  variants: {
    default: {
      color: "inherit",
      fontSize: "inherit",
      fontWeight: "400",
      _hover: {
        textDecoration: "none",
        color: "blue.500",
      },
    },
    green: {
      color: "inherit",
      fontSize: "inherit",
      fontWeight: "400",
      _hover: {
        textDecoration: "none",
        color: "green.500",
      },
    },
    inline: {
      color: "inherit",
      fontFamily: "inherit",
      fontSize: "inherit",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      _hover: {
        color: "green.500",
      },
    },
    overlay: {
      position: "absolute",
      inset: 0,
      textDecoration: "none",
      fontWeight: "base",
      fontSize: "base",
      opacity: 0,
      zIndex: 2,
    },
    unstyled: {
      textDecoration: "none",
      fontWeight: "base",
      fontSize: "base",
      ":hover": {
        textDecoration: "none",
      },
    },
  },
  defaultProps: {
    variant: "default",
    size: "md",
  },
}

const List: ComponentStyleConfig = {
  variants: {
    unstyled: {
      container: {
        listStyle: "none",
        padding: "0",
      },
    },
  },
  defaultProps: {
    variant: "unstyled",
  },
}

export const components = { Link, List }
