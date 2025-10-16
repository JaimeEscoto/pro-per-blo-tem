import Image from "next/image";
import Timeline from "@/components/sections/timeline";

const milestones = [
  {
    year: "2024",
    title: "Consulta privada digital",
    description: "Amplío mi consulta a modalidad 100% online para acompañar a hispanohablantes en cualquier país."
  },
  {
    year: "2020",
    title: "Diplomado en Terapia Cognitivo-Conductual",
    description: "Certificación internacional en intervención breve, manejo de crisis y psicoeducación digital."
  },
  {
    year: "2017",
    title: "Terapia de pareja y familia",
    description: "Especialización sistémica orientada a comunicación no violenta y resolución colaborativa."
  },
  {
    year: "2015",
    title: "Licenciatura en Psicología · UNAH",
    description: "Colegiada activa Nº 1425. Prácticas clínicas en hospitales y centros comunitarios."
  }
];

const credentials = [
  "Colegiada en Honduras y habilitada para atender en Centroamérica",
  "Miembro de la Sociedad Hondureña de Psicología Clínica",
  "Supervisión mensual con equipos internacionales"
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container grid gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-widest text-primary-500">Sobre mí / Mi enfoque</p>
        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Psicología con propósito humano y rigor científico
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Elegí la psicología para abrir espacios donde las personas puedan hablar sin juicio. Mi filosofía integra escucha activa, análisis del contexto cultural y herramientas prácticas que facilitan cambios sostenibles.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          He acompañado a más de 350 personas en procesos individuales, de pareja y organizacionales. Trabajo desde una ética del cuidado: cada sesión se planifica con objetivos claros, indicadores de avance y recursos de seguimiento entre encuentros.
        </p>
        <div className="grid gap-4 rounded-3xl bg-white/80 p-6 shadow-sm dark:bg-slate-900/60">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Modelo terapéutico</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Combino Terapia Cognitivo-Conductual (TCC), terapia breve estratégica y recursos de mindfulness clínico. Para ti implica sesiones estructuradas, tareas terapéuticas opcionales y retroalimentación constante para medir resultados.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Dependiendo de tu necesidad, trabajaremos en ciclos de 4 a 8 semanas con evaluaciones periódicas para ajustar el plan. El objetivo es que te sientas acompañado/a y empoderado/a para tomar decisiones saludables.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Credenciales</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {credentials.map((credential) => (
              <li key={credential}>· {credential}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-6">
        <div className="relative mx-auto h-80 w-80 overflow-hidden rounded-[32px] border border-slate-200 shadow-xl shadow-primary-500/20 dark:border-slate-800">
          <Image src="/profile.svg" alt="Paola Madrid" fill className="object-cover" />
        </div>
        <Timeline items={milestones} />
      </div>
    </section>
  );
}
