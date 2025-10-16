import Link from "next/link";
import { HeartHandshake, HeartPulse, Leaf, Users2 } from "lucide-react";

const skills = [
  {
    title: "Ansiedad y autocuidado",
    description:
      "Identifica detonantes, fortalece recursos de afrontamiento y aprende a regular tus emociones con técnicas basadas en evidencia.",
    icon: HeartPulse
  },
  {
    title: "Terapia de pareja",
    description:
      "Reconstruye la comunicación, restablece la confianza y diseñen acuerdos que sostengan el vínculo desde la empatía.",
    icon: HeartHandshake
  },
  {
    title: "Estrés laboral y burnout",
    description:
      "Reordena tus límites, gestiona la sobrecarga y recupera el equilibrio entre productividad y bienestar personal.",
    icon: Users2
  },
  {
    title: "Procesos de duelo y transición",
    description:
      "Acompañamiento sensible para transitar pérdidas, cambios vitales o migraciones, integrando herramientas terapéuticas y rituales saludables.",
    icon: Leaf
  }
];

export default function Skills() {
  return (
    <section id="servicios" className="section-container">
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Servicios especializados en línea</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Cada módulo terapéutico está diseñado para responder a necesidades concretas y ayudarte a tomar decisiones informadas sobre tu proceso.
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
      <div className="mt-8 text-center">
        <Link href="/services" className="btn-secondary">
          Ver servicios y tarifas en detalle
        </Link>
      </div>
    </section>
  );
}
