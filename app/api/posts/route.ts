import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/posts";
import { requireAuth } from "@/lib/api";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  const payload = await request.json();
  const requiredFields = ["title", "slug", "excerpt", "content", "publishedAt"] as const;
  const missing = requiredFields.filter((field) => !payload[field]);
  if (missing.length > 0) {
    return NextResponse.json({ message: `Campos faltantes: ${missing.join(", ")}` }, { status: 400 });
  }
  const post = await createPost(payload);
  return NextResponse.json(post, { status: 201 });
}
