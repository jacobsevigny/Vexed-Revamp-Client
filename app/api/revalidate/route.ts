import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Called by the admin panel after an article is deleted, published, or
// unpublished so the public site reflects the change immediately instead of
// waiting for the `revalidate: 60` ISR window to expire.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const slug = typeof body?.slug === "string" ? body.slug : undefined;

  revalidatePath("/");
  revalidatePath("/articles");
  if (slug) revalidatePath(`/articles/${slug}`);

  return NextResponse.json({ revalidated: true });
}
