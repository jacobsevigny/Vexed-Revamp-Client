import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "./article-card";
import type { ArticleListItem } from "./types";

async function getRecentArticles(): Promise<ArticleListItem[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  if (!base) return [];
  try {
    const res = await fetch(`${base}/api/articles?limit=4`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export async function HomeArticlesSection() {
  const articles = await getRecentArticles();

  // Hide the section entirely when there are no published articles.
  if (articles.length === 0) return null;

  return (
    <section className="bg-secondary py-20 md:py-24">
      <div className="container mx-auto px-4">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="mb-12 flex items-end justify-between gap-6 max-w-6xl mx-auto">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/35">
              Vexed Sports
            </p>
            <h2 className="text-3xl font-black text-white md:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-2 text-sm text-white/45">
              Analysis, rankings, and commentary
            </p>
          </div>

          {/* "View All" — desktop only; mobile version is below the grid */}
          <Link
            href="/articles"
            className="group hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-white/45 transition-colors hover:text-white sm:flex"
          >
            View All Articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* ── Article grid ─────────────────────────────────────────────────── */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* ── Mobile "View All" ─────────────────────────────────────────────── */}
        <div className="mx-auto mt-10 max-w-6xl sm:hidden">
          <Link
            href="/articles"
            className="group flex items-center justify-center gap-1.5 text-sm font-semibold text-white/45 transition-colors hover:text-white"
          >
            View All Articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
