import { extendTheme } from "@chakra-ui/react";

import { components } from "./components";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: "gray.800",
    },
  },
};
const colors = {
  offWhite: "rgb(245, 247, 255)",
};

const fonts = {
  body: "sans-serif",
};

const sizes = {
  max: "max-content",
  min: "min-content",
  full: "100%",
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  "8xl": "90rem",
  container: {
    article: "840px",
    section: "1300px",
    page: "1600px",
  },
};

const fontSizes = {
  xxs: "0.65rem",
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5625rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.5rem",
  "7xl": "4rem",
  "8xl": "5rem",
};

const textStyles = {
  defaultProps: {
    fontWeight: "base",
  },
  h1Xl: {
    color: "gray.900",
    fontWeight: "medium",
    fontSize: { base: "5xl", md: "6xl", lg: "7xl" },
    lineHeight: "1.25",
  },
  h1: {
    color: "gray.900",
    fontWeight: "medium",
    fontSize: { base: "3xl", md: "4xl" },
    lineHeight: "1.25",
  },
  h2: {
    color: "gray.900",
    fontWeight: "medium",
    fontSize: { base: "2xl", md: "3xl" },
    lineHeight: "1.25",
  },
  h3: {
    color: "gray.900",
    fontWeight: "medium",
    fontSize: { base: "xl", md: "2xl" },
    lineHeight: "1.5",
  },
  h4: {
    color: "gray.900",
    fontSize: { base: "lg", md: "xl" },
    lineHeight: "1.5",
  },
  p: {
    color: "gray.700",
    fontSize: { base: "sm", md: "md" },
    lineHeight: 1.66,
  },
  article: {
    p: {
      fontSize: { base: "sm", lg: "md" },
      lineHeight: 1.66,
      marginTop: 8,
      marginBottom: 4,
      textAlign: "justify",
    },
  },
  uppercase: {
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
};

export const theme = extendTheme({
  styles,
  colors,
  fontSizes,
  sizes,
  fonts,
  textStyles,
  components,
  config,
});
