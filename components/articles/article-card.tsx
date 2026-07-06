import Link from "next/link";
import type { ArticleListItem, Block, ImageBlock } from "./types";

interface Props {
  article: ArticleListItem;
}

function getFirstImage(blocks?: Block[]): string | null {
  if (!blocks) return null;
  const img = blocks.find((b) => b.type === "image") as ImageBlock | undefined;
  return img?.url || null;
}

// Prefer seoDesc; fall back to plain-text excerpt from the first paragraph block.
function getDisplayExcerpt(article: ArticleListItem): string | null {
  if (article.seoDesc) return article.seoDesc;
  if (!article.blocks) return null;
  for (const block of article.blocks) {
    if (block.type === "paragraph") {
      const text = block.content
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (text) {
        return text.length > 120 ? text.slice(0, 120).trimEnd() + "…" : text;
      }
    }
  }
  return null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({ article }: Props) {
  const firstImage = getFirstImage(article.blocks);
  const excerpt = getDisplayExcerpt(article);

  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all hover:border-white/25 hover:bg-white/[0.07]">
        {firstImage && (
          <div className="relative h-44 shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-blue-300">
            {article.title}
          </h2>
          {excerpt && (
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-white/50">
              {excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center gap-2 text-xs text-white/35">
            <span>{article.authorName}</span>
            <span>·</span>
            <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
          </div>
        </div>
      </div>
    </Link>
  );
}
