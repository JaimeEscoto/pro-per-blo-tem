import { Code2, Database, Layers3, Sparkles } from "lucide-react";

const skills = [
  {
    title: "Front-end",
    description: "React, Next.js, TypeScript, Tailwind, accesibilidad y rendimiento.",
    icon: Code2
  },
  {
    title: "Back-end",
    description: "Node.js, NestJS, GraphQL, microservicios, arquitectura hexagonal.",
    icon: Database
  },
  {
    title: "Producto",
    description: "Discovery, métricas, experimentación, diseño centrado en las personas.",
    icon: Sparkles
  },
  {
    title: "DevOps",
    description: "CI/CD, observabilidad, infraestructura como código, seguridad.",
    icon: Layers3
  }
];

export default function Skills() {
  return (
    <section id="habilidades" className="section-container">
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Especialidades y habilidades</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Un stack multidisciplinar que combina estrategia, diseño y ejecución técnica de alto nivel.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill) => (
          <article key={skill.title} className="card p-6">
            <skill.icon className="mb-4 h-10 w-10 text-primary-500" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{skill.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{skill.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
