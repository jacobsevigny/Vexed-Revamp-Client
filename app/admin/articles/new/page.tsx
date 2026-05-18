"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Loader2 } from "lucide-react";
import { adminCreateArticle } from "@/lib/api";
import { BlockEditor } from "@/components/articles/block-editor";
import type { Block } from "@/components/articles/types";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const router = useRouter();
  const { toast } = useToast();

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
      if (!authorName.trim()) {
        toast({
          title: "Missing author",
          description: "Please enter an author name",
          variant: "destructive",
        });
        return;
      }

      setSaving(status);
      try {
        const article = await adminCreateArticle({
          title: title.trim(),
          authorName: authorName.trim(),
          status,
          blocks,
          seoTitle: seoTitle.trim() || title.trim(),
          seoDesc: seoDesc.trim() || null,
        });
        toast({
          title: status === "published" ? "Published!" : "Saved",
          description:
            status === "published"
              ? "Article is now live"
              : "Article saved as draft",
        });
        router.push(`/admin/articles/${article.id}/edit`);
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
    [title, authorName, seoTitle, seoDesc, blocks, toast, router]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#051a2e] to-[#0a2d52]">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.push("/admin/articles")}
            className="flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            Articles
          </button>
          <div className="flex gap-2">
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

        {/* Metadata card */}
        <div className="mb-8 space-y-4 rounded-2xl border border-white/15 bg-white/[0.04] p-6">
          <div>
            <Label className="mb-1.5 block text-sm text-white/60">
              Article Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ranking All 32 NFL Quarterbacks for 2025"
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
              placeholder="Your name"
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
                    SEO Title{" "}
                    <span className="text-white/25">(defaults to article title)</span>
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
                    placeholder="Brief description for search results…"
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
