/**
 * Next.js dev proxy: rewrite /api/* to backend server to enable same-origin fetches
 * This keeps frontend code using relative `/api/...` paths and avoids CORS / extension blocking in dev.
 */
const dev = process.env.NODE_ENV !== 'production'

const rewrites = async () => {
  if (!dev) return []
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5000/api/:path*',
    },
    // Proxy auth routes to backend in development to avoid CORS and allow httpOnly cookies
    {
      source: '/auth/:path*',
      destination: 'http://localhost:5000/auth/:path*',
    },
  ]
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Note: `experimental.appDir` removed — Next.js handles the app directory automatically
  rewrites,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
