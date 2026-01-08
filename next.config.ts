import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    skipMiddlewareUrlNormalize: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
