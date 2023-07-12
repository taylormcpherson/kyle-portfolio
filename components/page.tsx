"use client"

import { FC, ReactNode } from "react"
import { Layout } from "./layout"
import Head from "next/head"
import { usePathname } from "next/navigation"
import Script from "next/script"

interface PageProps {
  title: string
  description: string
  image?: string
  children: ReactNode
}

export const Page: FC<Readonly<PageProps>> = ({
  title,
  description,
  image,
  children,
}) => {
  const pathname = usePathname()

  return (
    <>
      <Head>
        <title key="title">{`${title} | Kyle Zweng`}</title>
        <meta
          property="og:title"
          content={`${title} | Kyle Zweng`}
          key="ogtitle"
        />
        <meta name="description" content={description} key="description" />
        <meta
          property="og:description"
          content={description}
          key="ogdescription"
        />
        <meta
          property="og:image"
          content={image ?? "/images/meta.png"}
          key="ogimage"
        />
        <meta
          property="og:url"
          content={`https://kyle-data-portfolio.vercel.app${pathname}`}
        />
        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📈</text></svg>"
        />
      </Head>
      <Script src="/scripts/segment.js" strategy="lazyOnload" />

      <Layout>{children}</Layout>
    </>
  )
}
