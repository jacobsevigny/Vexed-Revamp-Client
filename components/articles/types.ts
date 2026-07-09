export interface ParagraphBlock {
  id: string;
  type: "paragraph";
  content: string; // HTML from TipTap
}

export interface HeaderBlock {
  id: string;
  type: "header";
  content: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  url: string;
  caption?: string;
  alt?: string;
}

export type Block = ParagraphBlock | HeaderBlock | ImageBlock;

export interface Article {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  authorId?: number | null;
  status: "draft" | "published";
  seoTitle?: string | null;
  seoDesc?: string | null;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  status: "draft" | "published";
  seoDesc?: string | null;
  blocks?: Block[];
  createdAt: string;
  updatedAt: string;
}
