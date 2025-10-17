import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t9rksicsjw7jr1ld.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
