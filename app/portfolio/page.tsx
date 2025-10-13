import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Líneas de trabajo | Paola Madrid"
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  return (
    <section className="section-container space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Líneas de trabajo</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Casos clínicos, investigaciones y dispositivos psicoeducativos que fortalecen la salud mental en Honduras y la región.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="card overflow-hidden">
            <div className="relative h-60 w-full">
              <Image src={project.image} alt={project.name} fill className="object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span>{project.year}</span>
                <span>{project.role}</span>
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/80">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <Link href={`/portfolio/${project.id}`} className="font-semibold">
                  Ver caso
                </Link>
                {project.links.demo && (
                  <Link href={project.links.demo} target="_blank" className="font-semibold">
                    Ver recurso
                  </Link>
                )}
                {project.links.github && (
                  <Link href={project.links.github} target="_blank" className="font-semibold">
                    Material complementario
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
