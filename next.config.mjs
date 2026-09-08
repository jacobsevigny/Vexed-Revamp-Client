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
 * Deploy to Vercel (zero-config), any Node.js host via `next build && next start`,
 * or Cloudflare Workers via @opennextjs/cloudflare (see wrangler.jsonc).
 */
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

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

// /games and /rankings were removed as standalone pages — their content now
// lives in the #games and #rankings sections of the home page. Permanently
// redirect anyone hitting the old URLs (bookmarks, external links) there.
// Note: /rankings/[position] (quarterback, running-back, wide-receiver,
// tight-end) are NOT redirected — those pages still exist and stay reachable.
const redirects = async () => [
  {
    source: "/games",
    destination: "/#games",
    permanent: true,
  },
  {
    source: "/rankings",
    destination: "/#rankings",
    permanent: true,
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites,
  redirects,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;