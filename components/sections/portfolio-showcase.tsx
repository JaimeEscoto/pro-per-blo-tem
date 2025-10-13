import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";

export default function PortfolioShowcase({ projects }: { projects: Project[] }) {
  return (
    <section id="portafolio" className="section-container space-y-10">
      <div className="flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Proyectos destacados</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Soluciones diseñadas de principio a fin, desde discovery hasta escalamiento.
          </p>
        </div>
        <Link href="/portfolio" className="btn-secondary self-center md:self-end">
          Ver todos los proyectos
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="card overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={project.image} alt={project.name} fill className="object-cover" />
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>{project.year}</span>
                <span>{project.role}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{project.excerpt}</p>
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
                    Demo
                  </Link>
                )}
                {project.links.github && (
                  <Link href={project.links.github} target="_blank" className="font-semibold">
                    Código
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
