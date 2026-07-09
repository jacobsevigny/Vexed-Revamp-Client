"use client";

import { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import type { Block } from "./types";
import { ParagraphBlock } from "./blocks/paragraph-block";
import { HeaderBlock } from "./blocks/header-block";
import { ImageBlock } from "./blocks/image-block";
import { BlockPicker } from "./block-picker";

// ─── SortableBlock ─────────────────────────────────────────────────────────────

interface SortableBlockProps {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
}

const TYPE_LABELS: Record<Block["type"], string> = {
  paragraph: "PARAGRAPH",
  header: "HEADER",
  image: "IMAGE",
};

const TYPE_COLORS: Record<Block["type"], string> = {
  paragraph: "text-blue-400",
  header: "text-purple-400",
  image: "text-emerald-400",
};

function SortableBlock({ block, onUpdate, onDelete }: SortableBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border bg-white/[0.04] transition-shadow ${
        isDragging
          ? "opacity-50 shadow-2xl border-white/30"
          : "border-white/15 hover:border-white/25"
      }`}
    >
      {/* Block header bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        {/* Drag handle — only this element activates dragging */}
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="cursor-grab text-white/25 hover:text-white/60 active:cursor-grabbing"
          title="Drag to reorder"
          tabIndex={-1}
        >
          <GripVertical size={15} />
        </button>

        <span
          className={`text-[10px] font-bold tracking-widest ${TYPE_COLORS[block.type]}`}
        >
          {TYPE_LABELS[block.type]}
        </span>

        <button
          type="button"
          onClick={onDelete}
          className="ml-auto rounded p-1 text-white/25 transition-colors hover:bg-red-500/15 hover:text-red-400"
          title="Delete block"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Block content */}
      <div className="p-3">
        {block.type === "paragraph" && (
          <ParagraphBlock
            content={block.content}
            onChange={(content) => onUpdate({ content } as Partial<Block>)}
          />
        )}
        {block.type === "header" && (
          <HeaderBlock
            content={block.content}
            onChange={(content) => onUpdate({ content } as Partial<Block>)}
          />
        )}
        {block.type === "image" && (
          <ImageBlock
            url={block.url}
            caption={block.caption}
            alt={block.alt}
            onChange={(updates) => onUpdate(updates as Partial<Block>)}
          />
        )}
      </div>
    </div>
  );
}

// ─── BlockEditor ───────────────────────────────────────────────────────────────

function newId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);
}

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over.id);
      onChange(arrayMove(blocks, oldIndex, newIndex));
    },
    [blocks, onChange]
  );

  const addBlock = useCallback(
    (type: Block["type"]) => {
      const id = newId();
      let block: Block;
      if (type === "paragraph") block = { id, type: "paragraph", content: "<p></p>" };
      else if (type === "header") block = { id, type: "header", content: "" };
      else block = { id, type: "image", url: "", caption: "", alt: "" };
      onChange([...blocks, block]);
    },
    [blocks, onChange]
  );

  const updateBlock = useCallback(
    (id: string, updates: Partial<Block>) => {
      onChange(
        blocks.map((b) => (b.id === id ? ({ ...b, ...updates } as Block) : b))
      );
    },
    [blocks, onChange]
  );

  const removeBlock = useCallback(
    (id: string) => {
      onChange(blocks.filter((b) => b.id !== id));
    },
    [blocks, onChange]
  );

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <SortableBlock
              key={block.id}
              block={block}
              onUpdate={(updates) => updateBlock(block.id, updates)}
              onDelete={() => removeBlock(block.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {blocks.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-sm text-white/30">
            No blocks yet — click <strong>Add Block</strong> to start building
          </p>
        </div>
      )}

      <BlockPicker onAdd={addBlock} />
    </div>
  );
}
