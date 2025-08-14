import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "example.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "png.pngtree.com",
      "encrypted-tbn0.gstatic.com",
      "localhost",
    ],
  },
  /* config options here */
};

export default nextConfig;
