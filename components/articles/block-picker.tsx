"use client";

import { useEffect, useRef, useState } from "react";
import { Heading2, Image, Plus, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Block } from "./types";

const BLOCK_TYPES: {
  type: Block["type"];
  label: string;
  description: string;
  icon: React.FC<{ size?: number; className?: string }>;
}[] = [
  {
    type: "paragraph",
    label: "Paragraph",
    description: "Rich text — bold, italic, lists",
    icon: Type,
  },
  {
    type: "header",
    label: "Header",
    description: "Bold section title / ranking entry",
    icon: Heading2,
  },
  {
    type: "image",
    label: "Image",
    description: "Photo with optional caption",
    icon: Image,
  },
];

interface Props {
  onAdd: (type: Block["type"]) => void;
}

export function BlockPicker({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((o) => !o)}
        className="gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
      >
        <Plus size={15} />
        Add Block
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-60 overflow-hidden rounded-xl border border-white/20 bg-[#0a2d52] shadow-2xl">
          {BLOCK_TYPES.map(({ type, label, description, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onAdd(type);
                setOpen(false);
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/10"
            >
              <Icon size={16} className="mt-0.5 shrink-0 text-white/50" />
              <div>
                <div className="text-sm font-medium text-white">{label}</div>
                <div className="text-xs text-white/40">{description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
