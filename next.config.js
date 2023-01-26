/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["react-syntax-highlighter"],
  images: {
    domains: ["cdn.sanity.io"],
  }
}

module.exports = nextConfig
