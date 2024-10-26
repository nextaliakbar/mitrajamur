/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: [
      "placehold.jp",
      "via.placeholder.com",
      "simop.mitrajamur.com"
        // "localhost",
        // "127.0.0.1"
    ],
  },
  nextConfig,
  experimental: {
    outputStandalone: true,
  },
  env: {
    googleAnalyticsID: "AW-11332065700"
  }
};
