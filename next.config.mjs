/**
 * Next.js dev proxy: rewrite /api/* to backend server to enable same-origin fetches
 * This keeps frontend code using relative `/api/...` paths and avoids CORS issues in dev.
 *
 * For production static hosting, the frontend should call the backend directly via
 * NEXT_PUBLIC_API_BASE_URL, so these rewrites remain development-only.
 */
const dev = process.env.NODE_ENV !== "production";

const rewrites = async () => {
  if (!dev) return [];

  return [
    {
      source: "/api/:path*",
      destination: "http://localhost:5000/api/:path*",
    },
    {
      source: "/auth/:path*",
      destination: "http://localhost:5000/auth/:path*",
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  rewrites,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;