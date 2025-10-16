import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Gracias al acompañamiento pude nombrar mi ansiedad y encontrar estrategias concretas para sostener mi día a día sin sentirme desbordada.",
    name: "María G.",
    detail: "Proceso de 6 meses · Tegucigalpa"
  },
  {
    quote:
      "La terapia nos permitió conversar sin ataques y recuperar la complicidad que habíamos perdido. Hoy construimos acuerdos saludables.",
    name: "Alejandra y Luis",
    detail: "Terapia de pareja · Sesiones online"
  },
  {
    quote:
      "El acompañamiento psicológico me ayudó a integrar el duelo migratorio y a crear nuevas redes de apoyo en un país distinto.",
    name: "Daniel R.",
    detail: "Proceso individual · Centroamérica"
  }
];

const associations = [
  "Colegio Hondureño de Psicólogos",
  "Asociación Latinoamericana de Psicoterapia",
  "Red Centroamericana de Salud Mental"
];

export default function Trust() {
  return (
    <section className="section-container" aria-labelledby="confianza">
      <div className="space-y-6 text-center">
        <h2 id="confianza" className="text-3xl font-semibold text-slate-900 dark:text-white">
          Historias reales, resultados tangibles
        </h2>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
          Cada testimonio es anonimizado y compartido con permiso. Mi compromiso es ofrecer un espacio profesional, cálido y ético que proteja tu proceso terapéutico.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className="card flex h-full flex-col gap-4 p-6">
            <Quote className="h-8 w-8 text-primary-500" />
            <p className="text-sm text-slate-700 dark:text-slate-200">“{testimonial.quote}”</p>
            <div className="mt-auto text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
              <p>{testimonial.name}</p>
              <p>{testimonial.detail}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 rounded-3xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-xs uppercase tracking-widest text-primary-500">Aval profesional</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Mi práctica cumple los estándares éticos internacionales y se sostiene en formación continua con instituciones como:
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {associations.map((association) => (
            <span key={association}>{association}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
