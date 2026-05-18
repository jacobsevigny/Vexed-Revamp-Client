"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  EyeOff,
  Globe,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  adminDeleteArticle,
  adminGetAllArticles,
  adminUpdateArticleStatus,
  type ArticleListItem,
} from "@/lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<number | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const fetchArticles = useCallback(async () => {
    try {
      const data = await adminGetAllArticles();
      setArticles(data.articles);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load articles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  async function toggleStatus(article: ArticleListItem) {
    const newStatus = article.status === "published" ? "draft" : "published";
    setActionId(article.id);
    try {
      await adminUpdateArticleStatus(article.id, newStatus);
      setArticles((prev) =>
        prev.map((a) =>
          a.id === article.id ? { ...a, status: newStatus } : a
        )
      );
      toast({
        title: newStatus === "published" ? "Published" : "Unpublished",
        description:
          newStatus === "published"
            ? "Article is now live"
            : "Article moved to draft",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setActionId(id);
    try {
      await adminDeleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Deleted", description: "Article deleted" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive",
      });
    } finally {
      setActionId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Articles</h1>
            {!loading && (
              <p className="mt-1 text-sm text-white/40">
                {articles.length} article{articles.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <Button
            onClick={() => router.push("/admin/articles/new")}
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={15} />
            New Article
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-white/30" />
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-20 text-center">
            <p className="text-white/35">
              No articles yet. Create your first article.
            </p>
            <Button
              onClick={() => router.push("/admin/articles/new")}
              className="mt-5 gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={15} />
              New Article
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors hover:bg-white/[0.07]"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-white truncate">
                      {article.title}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        article.status === "published"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {article.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-white/35">
                    {article.authorName} · Updated {formatDate(article.updatedAt)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => toggleStatus(article)}
                    disabled={actionId === article.id}
                    title={
                      article.status === "published" ? "Unpublish" : "Publish"
                    }
                    className="rounded-lg p-2 text-white/35 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40"
                  >
                    {actionId === article.id ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : article.status === "published" ? (
                      <EyeOff size={15} />
                    ) : (
                      <Globe size={15} />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/admin/articles/${article.id}/edit`)
                    }
                    title="Edit"
                    className="rounded-lg p-2 text-white/35 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id, article.title)}
                    disabled={actionId === article.id}
                    title="Delete"
                    className="rounded-lg p-2 text-white/35 transition-colors hover:bg-red-500/15 hover:text-red-400 disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
