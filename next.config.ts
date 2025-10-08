import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  // Exclude docs folder from Next.js build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/docs/**', '**/node_modules/**'],
      };
    }
    return config;
  },
};

export default nextConfig;

