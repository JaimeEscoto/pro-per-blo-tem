import { Brain, ClipboardList, BookOpen, Users } from "lucide-react";

const skills = [
  {
    title: "Psicoterapia individual",
    description:
      "Acompañamiento clínico para adolescentes y adultos desde un enfoque psicoanalítico y humanista.",
    icon: Brain
  },
  {
    title: "Evaluación psicodiagnóstica",
    description:
      "Aplicación e interpretación de pruebas proyectivas y psicométricas para comprender la subjetividad.",
    icon: ClipboardList
  },
  {
    title: "Investigación académica",
    description:
      "Diseño de estudios sobre salud mental juvenil, cultura afectiva y dinámicas contemporáneas.",
    icon: BookOpen
  },
  {
    title: "Formación y divulgación",
    description:
      "Facilitación de talleres psicoeducativos y espacios de reflexión con comunidades y organizaciones.",
    icon: Users
  }
];

export default function Skills() {
  return (
    <section id="habilidades" className="section-container">
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Áreas de acompañamiento</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Integrando investigación universitaria con práctica clínica para responder a los desafíos emocionales actuales.
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
