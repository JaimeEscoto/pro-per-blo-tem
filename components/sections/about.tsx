import Timeline from "@/components/sections/timeline";

const milestones = [
  {
    year: "2024",
    title: "CTO Freelance",
    description: "Acompaño a startups serie A en decisiones estratégicas de arquitectura y gobernanza tecnológica."
  },
  {
    year: "2021",
    title: "Líder de Ingeniería · TechWave",
    description: "Escalé el equipo de 6 a 32 personas, migré la plataforma a microfrontends y reduje el time-to-market un 45%."
  },
  {
    year: "2017",
    title: "Senior Software Engineer · DataCore",
    description: "Implementé pipelines de datos en tiempo real y contribuí a modelos predictivos para fintechs regionales."
  },
  {
    year: "2013",
    title: "Consultora independiente",
    description: "Primeros proyectos full-stack para organizaciones sin fines de lucro y pymes en LATAM."
  }
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Sobre mí</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Mi enfoque combina investigación con ejecución ágil. Creo en los equipos autónomos, en la transparencia como valor y en el aprendizaje continuo como ventaja competitiva. Cuando no estoy programando, mentorizo a nuevas generaciones en comunidades tecnológicas y escribo sobre liderazgo inclusivo.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Actualmente resido en Ciudad de México y colaboro de forma remota con empresas globales. Domino español, inglés y portugués.
        </p>
      </div>
      <div>
        <Timeline items={milestones} />
      </div>
    </section>
  );
}
