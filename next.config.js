/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com"],
    loader: "imgix",
    path: "/",
  },
};

module.exports = nextConfig;
