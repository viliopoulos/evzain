import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Enable server actions with proper typing
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Configure page revalidation (optional)
  revalidate: 60, // Revalidate every 60 seconds
  // Add webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Add output configuration
  output: 'standalone',
  // Add images configuration
  images: {
    domains: ['localhost', 'evzain.com', 'www.evzain.com'],
  },
};

export default nextConfig;
