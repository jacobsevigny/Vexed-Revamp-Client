import { Metadata } from "next";
import { ArticleCard } from "@/components/articles/article-card";
import type { ArticleListItem } from "@/components/articles/types";

export const metadata: Metadata = {
  title: "Articles | Vexed Sports",
  description:
    "Sports analysis, rankings, and commentary from the Vexed Sports team.",
  openGraph: {
    title: "Articles | Vexed Sports",
    description: "Sports analysis, rankings, and commentary.",
    type: "website",
  },
};

async function getArticles(): Promise<ArticleListItem[]> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  try {
    const res = await fetch(`${base}/api/articles?limit=30`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.articles ?? [];
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-14">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Articles</h1>
          <p className="mt-2 text-white/50">
            Sports analysis, rankings, and commentary
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-white/35">
              No articles yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
