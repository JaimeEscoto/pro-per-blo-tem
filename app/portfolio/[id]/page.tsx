import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectById, getProjects } from "@/lib/projects";

interface ProjectPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectById(params.id);
  if (!project) {
    return { title: "Proyecto no encontrado" };
  }
  return {
    title: `${project.name} | Práctica de Paola Madrid`,
    description: project.description
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectById(params.id);
  if (!project) {
    notFound();
  }
  const details = project;

  return (
    <article className="section-container space-y-12">
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-widest text-primary-500">{details.year} · {details.role}</span>
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">{details.name}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{details.description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {details.technologies.map((tech) => (
            <span key={tech} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800/70">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          {details.links.demo && (
            <a href={details.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ver recurso
            </a>
          )}
          {details.links.github && (
            <a href={details.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Material complementario
            </a>
          )}
        </div>
      </div>
      <div>
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-400">
          ← Volver a las líneas de trabajo
        </Link>
      </div>
      <div className="relative h-96 w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
        <Image src={details.image} alt={details.name} fill className="object-cover" />
      </div>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-3xl bg-white/80 p-8 shadow-lg shadow-primary-500/10 ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/60 dark:ring-slate-800/60">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Impacto</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Sistematizo indicadores cualitativos y cuantitativos para evaluar cambios en bienestar emocional, adherencia terapéutica y construcción de redes de apoyo.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Cada intervención deriva en recomendaciones concretas para familias, instituciones y equipos clínicos aliados.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl bg-white/80 p-8 shadow-lg shadow-primary-500/10 ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/60 dark:ring-slate-800/60">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Intervenciones</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>· Entrevistas clínicas, aplicación de pruebas y devoluciones personalizadas.</li>
            <li>· Diseño de dispositivos grupales y talleres psicoeducativos.</li>
            <li>· Articulación con redes institucionales para sostener el proceso terapéutico.</li>
          </ul>
        </div>
      </section>
    </article>
  );
}
