"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { BlogPost } from "@/types";
import { slugify } from "@/lib/utils";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type PostFormState = Omit<BlogPost, "id">;

const defaultState = (): PostFormState => ({
  title: "",
  slug: "",
  excerpt: "",
  content: "<p></p>",
  coverImage: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  tags: [],
  readingTime: 5
});

export default function PostsManager({ token }: { token: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<PostFormState>(defaultState());
  const [isSaving, setIsSaving] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }), [token]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: BlogPost[]) => setPosts(data))
      .catch(() => setError("No se pudieron cargar los artículos"));
  }, []);

  const handleChange = (key: keyof PostFormState, value: PostFormState[keyof PostFormState]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const payload: PostFormState = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: form.tags?.filter(Boolean) ?? []
    };

    const endpoint = activeSlug ? `/api/posts/${activeSlug}` : "/api/posts";
    const method = activeSlug ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setError("No se pudo guardar la publicación");
      setIsSaving(false);
      return;
    }

    const updatedPost = (await response.json()) as BlogPost;

    setPosts((prev) => {
      if (activeSlug) {
        return prev.map((post) => (post.slug === activeSlug ? updatedPost : post));
      }
      return [updatedPost, ...prev];
    });
    setIsSaving(false);
    setActiveSlug(updatedPost.slug);
    setForm({
      ...payload,
      slug: updatedPost.slug,
      coverImage: updatedPost.coverImage ?? "",
      tags: updatedPost.tags ?? []
    });
  };

  const handleEdit = (post: BlogPost) => {
    setActiveSlug(post.slug);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage ?? "",
      publishedAt: post.publishedAt,
      tags: post.tags ?? [],
      readingTime: post.readingTime ?? 5
    });
  };

  const handleDelete = async (slug: string) => {
    const confirmation = confirm("¿Eliminar publicación?");
    if (!confirmation) return;
    const response = await fetch(`/api/posts/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      setError("No se pudo eliminar la publicación");
      return;
    }
    setPosts((prev) => prev.filter((post) => post.slug !== slug));
    if (activeSlug === slug) {
      setActiveSlug(null);
      setForm(defaultState());
    }
  };

  const handleReset = () => {
    setActiveSlug(null);
    setForm(defaultState());
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/uploads", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    if (!response.ok) {
      setError("No se pudo subir la imagen");
      return;
    }
    const data = (await response.json()) as { url: string };
    setForm((prev) => ({ ...prev, coverImage: data.url }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Publicaciones</h2>
        <button type="button" onClick={handleReset} className="btn-secondary">
          Nueva publicación
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="title">Título</label>
              <input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} required />
            </div>
            <div>
              <label htmlFor="slug">Slug</label>
              <input id="slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} />
            </div>
            <div>
              <label htmlFor="publishedAt">Fecha de publicación</label>
              <input
                id="publishedAt"
                type="date"
                value={form.publishedAt}
                onChange={(e) => handleChange("publishedAt", e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="readingTime">Tiempo de lectura (minutos)</label>
              <input
                id="readingTime"
                type="number"
                min={1}
                value={form.readingTime}
                onChange={(e) => handleChange("readingTime", Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="excerpt">Resumen</label>
            <textarea
              id="excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(e) => handleChange("excerpt", e.target.value)}
              required
            />
          </div>
          <div>
            <label>Contenido</label>
            <ReactQuill value={form.content} onChange={(value) => handleChange("content", value)} theme="snow" />
          </div>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div>
              <label htmlFor="coverImage">Imagen destacada (URL)</label>
              <input
                id="coverImage"
                value={form.coverImage}
                onChange={(e) => handleChange("coverImage", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <label htmlFor="file-upload">o subir archivo</label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} />
            </div>
          </div>
          <div>
            <label htmlFor="tags">Etiquetas (separadas por comas)</label>
            <input
              id="tags"
              value={form.tags?.join(", ") ?? ""}
              onChange={(e) => handleChange("tags", e.target.value.split(",").map((tag) => tag.trim()))}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? "Guardando..." : activeSlug ? "Actualizar" : "Publicar"}
          </button>
        </form>
        <aside className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Entradas existentes</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {posts.map((post) => (
              <li key={post.id} className="flex items-start justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                <div>
                  <button type="button" className="font-semibold" onClick={() => handleEdit(post)}>
                    {post.title}
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{post.slug}</p>
                </div>
                <button type="button" onClick={() => handleDelete(post.slug)} className="text-xs text-red-500">
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
