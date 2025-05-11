import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  
  // Configure image domains for Sanity.io
  images: {
    domains: ['cdn.sanity.io'],
    // Optional: Add more optimization settings
    formats: ['image/avif', 'image/webp'],
    // Only needed if you're using a Sanity project with a custom hostname
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;