/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["react-syntax-highlighter"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "cdn.sanity.io",
        port: '',
      },
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
