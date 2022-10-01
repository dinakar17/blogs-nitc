/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  // allow images from other domains
  images: {
    domains: ["localhost", "images.unsplash.com"],
  },
};
