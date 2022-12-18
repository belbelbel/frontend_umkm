/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   fontLoaders: [
  //     { loader: "@next/font/google", options: { subsets: ["latin"] } },
  //   ],
  // },
  images: {
    // domains: ["localhost:8000"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
