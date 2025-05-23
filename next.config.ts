import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local.wordpress.test"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bookface-images.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
