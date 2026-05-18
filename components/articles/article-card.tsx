import Link from "next/link";
import type { ArticleListItem, ImageBlock } from "./types";

interface Props {
  article: ArticleListItem;
}

function getFirstImage(blocks?: ArticleListItem["blocks"]): string | null {
  if (!blocks) return null;
  const img = blocks.find((b) => b.type === "image") as ImageBlock | undefined;
  return img?.url || null;
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

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all hover:border-white/25 hover:bg-white/[0.07]">
        {firstImage && (
          <div className="relative h-44 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={firstImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-blue-300">
            {article.title}
          </h2>
          {article.seoDesc && (
            <p className="mt-2 line-clamp-2 text-sm text-white/50">
              {article.seoDesc}
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
