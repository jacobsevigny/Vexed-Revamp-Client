"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageOff } from "lucide-react";

interface Props {
  url: string;
  caption?: string;
  alt?: string;
  onChange: (data: { url?: string; caption?: string; alt?: string }) => void;
}

export function ImageBlock({ url, caption = "", alt = "", onChange }: Props) {
  const [imgError, setImgError] = useState(false);

  function handleUrlChange(val: string) {
    setImgError(false);
    onChange({ url: val });
  }

  return (
    <div className="space-y-3">
      <div>
        <Label className="mb-1 block text-xs text-white/50">Image URL</Label>
        <Input
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="border-white/15 bg-black/20 text-white placeholder:text-white/25"
        />
      </div>

      {url && !imgError && (
        <div className="relative overflow-hidden rounded-lg bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={alt || caption || "Preview"}
            className="max-h-64 w-full object-contain"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {url && imgError && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <ImageOff size={14} />
          Could not load image — check the URL
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="mb-1 block text-xs text-white/50">Alt text</Label>
          <Input
            value={alt}
            onChange={(e) => onChange({ alt: e.target.value })}
            placeholder="Describe the image…"
            className="border-white/15 bg-black/20 text-white placeholder:text-white/25"
          />
        </div>
        <div>
          <Label className="mb-1 block text-xs text-white/50">
            Caption (optional)
          </Label>
          <Input
            value={caption}
            onChange={(e) => onChange({ caption: e.target.value })}
            placeholder="Image caption…"
            className="border-white/15 bg-black/20 text-white placeholder:text-white/25"
          />
        </div>
      </div>
    </div>
  );
}
