import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { Analytics } from "@vercel/analytics/react"
import { theme } from "../theme/theme"
import { Inter } from "@next/font/google"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
      <Analytics />
    </>
  )
}
