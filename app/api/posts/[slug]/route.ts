import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostBySlug, updatePost } from "@/lib/posts";
import { requireAuth } from "@/lib/api";

interface Params {
  params: { slug: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return NextResponse.json({ message: "Artículo no encontrado" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;
  const data = await request.json();
  const updated = await updatePost(params.slug, data);
  if (!updated) {
    return NextResponse.json({ message: "Artículo no encontrado" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;
  const deleted = await deletePost(params.slug);
  if (!deleted) {
    return NextResponse.json({ message: "Artículo no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
