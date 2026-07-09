/**
 * Next.js dev proxy: rewrite /api/* to backend server to enable same-origin fetches.
 * This keeps frontend code using relative `/api/...` paths and avoids CORS issues in dev.
 *
 * In production the frontend calls the backend directly via NEXT_PUBLIC_API_BASE_URL.
 * These rewrites are development-only and return [] in production builds.
 *
 * NOTE: `output: 'export'` was removed because it is incompatible with:
 *  - Dynamic CMS routes (/admin/articles/[id]/edit, /articles/[slug]) whose params
 *    are created at runtime and therefore cannot be enumerated at build time.
 *  - ISR (next: { revalidate }) used on the public article pages.
 *  - The Next.js middleware that protects /admin/* routes.
 * Deploy to Vercel (zero-config) or any Node.js host using `next build && next start`.
 * For Cloudflare, use @cloudflare/next-on-pages instead of static Pages hosting.
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
  rewrites,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;