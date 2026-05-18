"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { adminGetArticle, adminUpdateArticle, type Article } from "@/lib/api";
import { BlockEditor } from "@/components/articles/block-editor";
import type { Block } from "@/components/articles/types";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    async function load() {
      try {
        const data = await adminGetArticle(Number(id));
        setArticle(data);
        setTitle(data.title);
        setAuthorName(data.authorName);
        setSeoTitle(data.seoTitle || "");
        setSeoDesc(data.seoDesc || "");
        setBlocks(Array.isArray(data.blocks) ? (data.blocks as Block[]) : []);
      } catch {
        toast({
          title: "Error",
          description: "Failed to load article",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, toast]);

  const save = useCallback(
    async (status: "draft" | "published") => {
      if (!title.trim()) {
        toast({
          title: "Missing title",
          description: "Please enter an article title",
          variant: "destructive",
        });
        return;
      }

      setSaving(status);
      try {
        const updated = await adminUpdateArticle(Number(id), {
          title: title.trim(),
          authorName: authorName.trim(),
          status,
          blocks,
          seoTitle: seoTitle.trim() || title.trim(),
          seoDesc: seoDesc.trim() || null,
        });
        setArticle(updated);
        toast({
          title: status === "published" ? "Published!" : "Saved",
          description:
            status === "published"
              ? "Article is now live"
              : "Article saved as draft",
        });
      } catch (err: unknown) {
        toast({
          title: "Error",
          description:
            err instanceof Error ? err.message : "Failed to save article",
          variant: "destructive",
        });
      } finally {
        setSaving(null);
      }
    },
    [id, title, authorName, seoTitle, seoDesc, blocks, toast]
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
        <Loader2 className="h-8 w-8 animate-spin text-white/30" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push("/admin/articles")}
            className="flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            Articles
          </button>
          <div className="flex items-center gap-3">
            {article?.status === "published" && (
              <a
                href={`/articles/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-white/35 transition-colors hover:text-white"
              >
                <ExternalLink size={12} />
                View live
              </a>
            )}
            <Button
              type="button"
              variant="outline"
              disabled={!!saving}
              onClick={() => save("draft")}
              className="border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              {saving === "draft" ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                "Save Draft"
              )}
            </Button>
            <Button
              type="button"
              disabled={!!saving}
              onClick={() => save("published")}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {saving === "published" ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>

        {/* Status + timestamp */}
        {article && (
          <div className="mb-6 flex items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                article.status === "published"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {article.status === "published" ? "Published" : "Draft"}
            </span>
            <span className="text-xs text-white/30">
              Last updated{" "}
              {new Date(article.updatedAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}

        {/* Metadata card */}
        <div className="mb-8 space-y-4 rounded-2xl border border-white/15 bg-white/[0.04] p-6">
          <div>
            <Label className="mb-1.5 block text-sm text-white/60">
              Article Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 border-white/15 bg-white/5 text-lg text-white placeholder:text-white/25"
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-sm text-white/60">
              Author Name
            </Label>
            <Input
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/25"
            />
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="seo" className="border-white/10">
              <AccordionTrigger className="py-2 text-sm text-white/50 hover:text-white">
                SEO Settings
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pt-2">
                <div>
                  <Label className="mb-1 block text-xs text-white/45">
                    SEO Title
                  </Label>
                  <Input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title || "SEO title"}
                    className="border-white/15 bg-white/5 text-white placeholder:text-white/25"
                  />
                </div>
                <div>
                  <Label className="mb-1 block text-xs text-white/45">
                    Meta Description
                  </Label>
                  <Textarea
                    value={seoDesc}
                    onChange={(e) => setSeoDesc(e.target.value)}
                    rows={3}
                    maxLength={160}
                    className="resize-none border-white/15 bg-white/5 text-white placeholder:text-white/25"
                  />
                  <p className="mt-1 text-xs text-white/25">
                    {seoDesc.length}/160
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Block editor */}
        <div>
          <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
            Content Blocks
          </h2>
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        </div>
      </main>
    </div>
  );
}
