"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Minus,
} from "lucide-react";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

export function ParagraphBlock({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] p-3 text-white/85 leading-relaxed focus:outline-none [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_strong]:text-white [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mb-1 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-3 [&_blockquote]:border-l-4 [&_blockquote]:border-white/20 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/60",
      },
    },
  });

  if (!editor) return null;

  const toolbarBtn = (active: boolean) =>
    `rounded p-1.5 transition-colors ${
      active
        ? "bg-white/20 text-white"
        : "text-white/50 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="rounded border border-white/15 bg-black/20">
      <div className="flex flex-wrap gap-0.5 border-b border-white/10 p-1.5">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={toolbarBtn(editor.isActive("bold"))}
          title="Bold"
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={toolbarBtn(editor.isActive("italic"))}
          title="Italic"
        >
          <Italic size={14} />
        </button>
        <div className="mx-1 w-px bg-white/10" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={toolbarBtn(editor.isActive("heading", { level: 2 }))}
          title="Heading"
        >
          <Heading2 size={14} />
        </button>
        <div className="mx-1 w-px bg-white/10" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={toolbarBtn(editor.isActive("bulletList"))}
          title="Bullet list"
        >
          <List size={14} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={toolbarBtn(editor.isActive("orderedList"))}
          title="Numbered list"
        >
          <ListOrdered size={14} />
        </button>
        <div className="mx-1 w-px bg-white/10" />
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().setHorizontalRule().run();
          }}
          className={toolbarBtn(false)}
          title="Divider"
        >
          <Minus size={14} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
