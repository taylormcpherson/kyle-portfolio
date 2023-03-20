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
      fontWeight: "semibold",
      _hover: {
        textDecoration: "none",
        color: "blue.400",
      },
    },
    inline: {
      color: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      fontFamily: "inherit",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      _hover: {
        color: "blue.400",
      },
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
  baseStyle: {
    container: {
      padding: "0 0 0 1em",
    },
  },
  variants: {
    primary: {},
    unstyled: {
      container: {
        padding: "0",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
}

export const components = { Link, List }
