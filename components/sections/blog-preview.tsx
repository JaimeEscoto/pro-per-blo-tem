import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="section-container space-y-10">
      <div className="flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Recursos para tu bienestar</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Contenido que responde a dudas frecuentes, comparte estrategias prácticas y fortalece tu camino terapéutico.
          </p>
        </div>
        <Link href="/blog" className="btn-secondary self-center md:self-end">
          Ir al blog
        </Link>
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
              <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{post.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="font-semibold">
                Leer artículo
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
