import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Inter } from "@next/font/google"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../theme/theme"

const inter = Inter({ subsets: ["latin"], weight: "300" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
