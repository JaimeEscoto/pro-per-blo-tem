import Image from "next/image";
import Link from "next/link";
import { BookOpen, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="section-container grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
      <div className="space-y-8">
        <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">
          Psicología online con calidez humana
        </span>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Encuentra el camino hacia tu bienestar emocional. Psicología profesional y confidencial en línea.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Soy Paola Marielle Madrid Leiva, psicóloga clínica y supervisora con más de 8 años de experiencia acompañando a personas que desean transformar ansiedad, estrés relacional y duelos en oportunidades de crecimiento.
        </p>
        <p className="text-base text-slate-600 dark:text-slate-300">
          Atendemos sesiones privadas y seguras desde donde te encuentres. Cada proceso comienza con una entrevista diagnóstica que nos permite co-crear objetivos realistas y un plan terapéutico a tu medida.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/#contacto" className="btn-primary">
            Agenda una consulta
          </Link>
          <Link href="/about" className="btn-secondary">
            Conoce mi enfoque
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
