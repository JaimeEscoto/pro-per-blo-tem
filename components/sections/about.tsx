import Timeline from "@/components/sections/timeline";

const milestones = [
  {
    year: "2024",
    title: "Consulta privada en Tegucigalpa",
    description: "Acompaño procesos terapéuticos para adolescentes y adultos, integrando perspectiva psicoanalítica y trabajo interdisciplinario."
  },
  {
    year: "2022",
    title: "Investigadora asociada · UNAH",
    description: "Coordiné estudios sobre salud mental juvenil y dinámicas afectivas en comunidades educativas hondureñas."
  },
  {
    year: "2019",
    title: "Psicóloga clínica comunitaria",
    description: "Desarrollé dispositivos grupales para organizaciones culturales y programas de prevención en Centroamérica."
  },
  {
    year: "2015",
    title: "Licenciatura en Psicología · UNAH",
    description: "Graduada con méritos académicos, enfocada en psicodiagnóstico, subjetividad contemporánea y neurosis compulsiva."
  }
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Sobre mí</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Me especializo en el análisis de las transformaciones subjetivas contemporáneas. Articulo herramientas de la clínica psicoanalítica con metodologías de investigación para construir intervenciones sensibles al contexto cultural latinoamericano.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          He publicado artículos sobre psicodiagnóstico, salud mental en adolescentes y dinámicas afectivas populares. Mi práctica busca un equilibrio entre la rigurosidad científica y una escucha cercana que habilite nuevos sentidos para cada persona.
        </p>
      </div>
      <div>
        <Timeline items={milestones} />
      </div>
    </section>
  );
}
