import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog | Paola Madrid"
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <section className="section-container space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Blog</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Reflexiones sobre salud mental, psicoanálisis contemporáneo y herramientas para el acompañamiento comunitario.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="card overflow-hidden">
            {post.coverImage && (
              <div className="relative h-48 w-full">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
              </div>
            )}
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
                {post.readingTime && <span>{post.readingTime} min</span>}
              </div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{post.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                {post.tags?.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/70">
                    #{tag}
                  </span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="font-semibold">
                Leer más
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
