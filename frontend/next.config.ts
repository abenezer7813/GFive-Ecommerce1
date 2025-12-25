import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.dummyjson.com"], // whitelist the host
  },
};

export default nextConfig;
