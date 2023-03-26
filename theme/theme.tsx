import { extendTheme } from "@chakra-ui/react"

import { components } from "./components"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const styles = {
  global: {
    body: {
      textRendering: "optimizeLegibility",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      color: "gray.900",
    },
  },
}
const colors = {
  offWhite: "rgb(245, 247, 255)",
}

const fonts = {
  heading: `'Sharp Sans Display No 1', sans-serif`,
  body: `'Sharp Sans Display No 1', sans-serif`,
}

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
    article: "900px",
    section: "1300px",
    page: "1600px",
  },
}

const fontSizes = {
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
}

const textStyles = {
  defaultProps: {
    fontWeight: "base",
  },
  h1: {
    fontFamily: "heading",
    fontSize: { base: "3xl", md: "4xl", lg: "5xl" },
    lineHeight: "1.25",
  },
  h2: {
    fontFamily: "heading",
    fontSize: { base: "2xl", md: "3xl" },
    lineHeight: "1.25",
  },
  h3: {
    fontFamily: "heading",
    fontSize: { base: "xl", md: "2xl" },
    lineHeight: "1.25",
  },
  h4: {
    fontFamily: "heading",
    fontSize: { base: "lg", md: "xl", lg: "2xl" },
    lineHeight: "1.25",
  },

  p: {
    marginBottom: 4,
  },
  article: {
    p: {
      fontSize: { base: "md", lg: "lg" },
      marginTop: 8,
      marginBottom: 4,
      textAlign: "justify",
      lineHeight: 1.5,
    },
  },
  uppercase: {
    fontWeight: "400",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
}

export const theme = extendTheme({
  styles,
  colors,
  fontSizes,
  sizes,
  fonts,
  textStyles,
  components,
  config,
})
