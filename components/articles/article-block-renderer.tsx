import type { Block, ImageBlock } from "./types";

interface Props {
  blocks: Block[];
}

export function ArticleBlockRenderer({ blocks }: Props) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => (
        <BlockComponent key={block.id} block={block} />
      ))}
    </div>
  );
}

function BlockComponent({ block }: { block: Block }) {
  if (block.type === "header") {
    return (
      <h2 className="text-2xl font-bold leading-snug text-white">
        {block.content}
      </h2>
    );
  }

  if (block.type === "image") {
    const img = block as ImageBlock;
    return (
      <figure className="space-y-2">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.url}
            alt={img.alt || img.caption || "Article image"}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
        {img.caption && (
          <figcaption className="text-center text-sm italic text-white/45">
            {img.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "paragraph") {
    return (
      <div
        className="text-white/80 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-white [&_em]:italic [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1.5 [&_li]:leading-relaxed [&_h2]:mt-2 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_hr]:my-6 [&_hr]:border-white/10 [&_a]:text-blue-400 [&_a:hover]:text-blue-300 [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    );
  }

  return null;
}
