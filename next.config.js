/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  // allow images from other domains
  images: {
    domains: ["localhost", "images.unsplash.com"],
  },
});

// Installed Depcheck
