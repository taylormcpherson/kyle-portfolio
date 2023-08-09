import type { ComponentStyleConfig } from "@chakra-ui/theme"

const Link: ComponentStyleConfig = {
  baseStyle: {
    textDecoration: "none",
    transition: ".15s all ease-in-out",
  },
  sizes: {
    xs: {
      fontSize: "xs",
    },
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
    nav: {
      fontSize: { base: "sm", md: "base" },
      textStyle: "uppercase",
      _hover: {
        textDecoration: "none",
        color: "blue.500",
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

const Badge: ComponentStyleConfig = {
  baseStyle: {
    border: "1px solid",
    bg: "white",
    borderRadius: "xl",
    color: "gray.600",
    px: 3,
    py: 1,
  },
  sizes: {
    sm: {
      fontSize: { base: "xxs", md: "xs" },
    },
    md: {
      fontSize: { base: "xs", md: "sm" },
    },
  },
  variants: {
    sql: {
      bg: "purple.50",
      borderColor: "purple.200",
      color: "purple.800",
    },
    excel: {
      bg: "green.50",
      borderColor: "green.200",
      color: "green.800",
    },
    r: {
      bg: "orange.50",
      borderColor: "orange.200",
      color: "orange.800",
    },
    tableau: {
      bg: "cyan.50",
      borderColor: "cyan.200",
      color: "cyan.800",
    },
    python: {
      bg: "yellow.50",
      borderColor: "yellow.200",
      color: "yellow.800",
    },
  },
  defaultProps: {
    size: "sm",
  },
}

export const components = { Link, List, Badge }
