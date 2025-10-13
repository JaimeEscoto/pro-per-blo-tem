import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getPosts } from "@/lib/posts";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: `${post.title} | Blog de Ana Rodríguez`,
    description: post.excerpt
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  const article = post;

  return (
    <article className="section-container prose prose-slate mx-auto dark:prose-invert">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm uppercase tracking-widest text-primary-500">
          {new Date(article.publishedAt).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric"
          })}
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{article.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{article.excerpt}</p>
        {article.tags && (
          <div className="flex justify-center gap-2 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {article.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
      {article.coverImage && (
        <div className="relative mb-10 h-96 w-full overflow-hidden rounded-3xl">
          <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <section className="mt-16 rounded-3xl bg-slate-100 p-8 dark:bg-slate-900/60">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">¿Comentarios o preguntas?</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Escríbeme a <a href="mailto:hola@anarodriguez.dev">hola@anarodriguez.dev</a> o comparte tus ideas en LinkedIn.
        </p>
      </section>
    </article>
  );
}
