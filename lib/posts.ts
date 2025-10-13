import { supabaseRequest } from "@/lib/supabase";
import type { BlogPost } from "@/types";
import { nanoid } from "nanoid";

const TABLE = "posts";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  tags: string[] | null;
  reading_time: number | null;
}

function mapPost(row: PostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image ?? undefined,
    publishedAt: row.published_at,
    tags: row.tags ?? undefined,
    readingTime: row.reading_time ?? undefined,
  };
}

function serializePost(post: BlogPost): PostRow {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage ?? null,
    published_at: post.publishedAt,
    tags: post.tags ?? null,
    reading_time: post.readingTime ?? null,
  };
}

function serializePartialPost(post: Partial<BlogPost>): Partial<PostRow> {
  const payload: Partial<PostRow> = {};
  if (post.id !== undefined) payload.id = post.id;
  if (post.title !== undefined) payload.title = post.title;
  if (post.slug !== undefined) payload.slug = post.slug;
  if (post.excerpt !== undefined) payload.excerpt = post.excerpt;
  if (post.content !== undefined) payload.content = post.content;
  if (post.coverImage !== undefined) payload.cover_image = post.coverImage ?? null;
  if (post.publishedAt !== undefined) payload.published_at = post.publishedAt;
  if (post.tags !== undefined) payload.tags = post.tags ?? null;
  if (post.readingTime !== undefined) payload.reading_time = post.readingTime ?? null;
  return payload;
}

export async function getPosts(): Promise<BlogPost[]> {
  const data = await supabaseRequest<PostRow[]>(TABLE, {
    query: {
      select: "*",
      order: "published_at.desc",
    },
  });
  return (data ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const data = await supabaseRequest<PostRow[]>(TABLE, {
    query: {
      select: "*",
      slug: `eq.${slug}`,
      limit: "1",
    },
  });
  const row = data?.[0];
  return row ? mapPost(row) : undefined;
}

export async function createPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  const newPost: BlogPost = { ...post, id: nanoid(12) };
  const row = serializePost(newPost);
  const [created] = await supabaseRequest<PostRow[]>(TABLE, {
    method: "POST",
    body: row,
    prefer: "return=representation",
  });
  return mapPost(created);
}

export async function updatePost(
  slug: string,
  payload: Partial<BlogPost>
): Promise<BlogPost | undefined> {
  const update = serializePartialPost(payload);
  if (Object.keys(update).length === 0) {
    return getPostBySlug(slug);
  }

  const data = await supabaseRequest<PostRow[]>(TABLE, {
    method: "PATCH",
    query: {
      slug: `eq.${slug}`,
    },
    body: update,
    prefer: "return=representation",
  });
  const row = data?.[0];
  return row ? mapPost(row) : undefined;
}

export async function deletePost(slug: string): Promise<boolean> {
  const data = await supabaseRequest<PostRow[]>(TABLE, {
    method: "DELETE",
    query: {
      slug: `eq.${slug}`,
    },
    prefer: "return=representation",
  });
  return Boolean(data && data.length > 0);
}
