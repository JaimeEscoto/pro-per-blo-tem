import Image from "next/image";
import Link from "next/link";
import { BookOpen, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="section-container grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="space-y-8">
        <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
          Psicoterapia · Psicoanálisis · Investigación
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Acompaño procesos terapéuticos profundos con rigor clínico y una mirada humanista.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Soy Paola Marielle Madrid Leiva, psicóloga formada en la UNAH. Investigo la subjetividad contemporánea y diseño espacios de escucha para adolescentes y adultos en Honduras y Centroamérica.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/#contacto" className="btn-primary">
            Agenda una consulta
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            Conoce mis líneas de trabajo
          </Link>
        </div>
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://www.paolamadridpsicologia.com/publicaciones" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500">
            <BookOpen className="h-5 w-5" />
          </a>
          <a href="mailto:contacto@paolamadridpsicologia.com" className="hover:text-primary-500">
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative h-80 w-80 overflow-hidden rounded-[32px] border border-slate-200 shadow-2xl shadow-primary-500/30 dark:border-slate-800">
          <Image src="/profile.svg" alt="Retrato profesional" fill priority className="object-cover" />
        </div>
      </div>
    </section>
  );
}
