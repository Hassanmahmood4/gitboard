import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:3001";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/guest", destination: "/workspace", permanent: true }];
  },
  async rewrites() {
    return [
      { source: "/api/github", destination: `${backendUrl}/api/github` },
      { source: "/api/ai", destination: `${backendUrl}/api/ai` },
    ];
  },
};

export default nextConfig;
