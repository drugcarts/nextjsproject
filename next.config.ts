import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['assets2.drugcarts.com', 'assets1.drugcarts.com', 'assets3.drugcarts.com', 'drugcarts-nextjs.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
