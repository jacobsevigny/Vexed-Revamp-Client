import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBlockRenderer } from "@/components/articles/article-block-renderer";
import type { Article, ImageBlock } from "@/components/articles/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE}/api/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
  } catch {
    return null;
  }
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return { title: "Article Not Found" };

  const firstImage = article.blocks.find(
    (b) => b.type === "image"
  ) as ImageBlock | undefined;

  const ogImage = firstImage?.url
    ? [{ url: firstImage.url, alt: article.title }]
    : [];

  return {
    title: `${article.seoTitle || article.title} | Vexed Sports`,
    description: article.seoDesc ?? undefined,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDesc ?? undefined,
      type: "article",
      authors: [article.authorName],
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      images: ogImage,
    },
    twitter: {
      card: firstImage?.url ? "summary_large_image" : "summary",
      title: article.seoTitle || article.title,
      description: article.seoDesc ?? undefined,
      images: firstImage?.url ? [firstImage.url] : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const publishedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <main className="mx-auto max-w-3xl px-4 pt-24 pb-16">
        {/* Article header */}
        <header className="mb-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-400">
            Vexed Sports
          </p>
          <h1 className="text-4xl font-extrabold leading-tight text-white">
            {article.title}
          </h1>
          <div className="mt-5 flex items-center gap-2 text-sm text-white/45">
            <span className="font-medium text-white/60">{article.authorName}</span>
            <span>·</span>
            <time dateTime={article.createdAt}>{publishedDate}</time>
          </div>
        </header>

        <hr className="mb-10 border-white/10" />

        {/* Block content */}
        <ArticleBlockRenderer blocks={article.blocks} />

        {/* Back link */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <a
            href="/articles"
            className="text-sm text-white/40 underline underline-offset-4 hover:text-white"
          >
            ← Back to all articles
          </a>
        </div>
      </main>
    </div>
  );
}
