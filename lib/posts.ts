import { readJson, writeJson } from "@/lib/storage";
import type { BlogPost } from "@/types";
import { nanoid } from "nanoid";

const FILE_NAME = "posts.json";

export async function getPosts(): Promise<BlogPost[]> {
  return readJson<BlogPost[]>(FILE_NAME);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

export async function createPost(post: Omit<BlogPost, "id">): Promise<BlogPost> {
  const posts = await getPosts();
  const newPost: BlogPost = { ...post, id: nanoid(12) };
  posts.unshift(newPost);
  await writeJson(FILE_NAME, posts);
  return newPost;
}

export async function updatePost(slug: string, payload: Partial<BlogPost>): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return undefined;
  const updated = { ...posts[index], ...payload };
  posts[index] = updated;
  await writeJson(FILE_NAME, posts);
  return updated;
}

export async function deletePost(slug: string): Promise<boolean> {
  const posts = await getPosts();
  const filtered = posts.filter((post) => post.slug !== slug);
  if (filtered.length === posts.length) return false;
  await writeJson(FILE_NAME, filtered);
  return true;
}
