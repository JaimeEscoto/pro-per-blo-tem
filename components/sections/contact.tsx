"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
  tone?: string;
}

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<ContactForm>();
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (data: ContactForm) => {
    setStatus("¡Gracias por tu mensaje! Te responderé en menos de 24 horas hábiles.");
    console.info("Mensaje de contacto", data);
    reset();
  };

  return (
    <section id="contacto" className="section-container">
      <div className="grid gap-10 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 p-10 text-white md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Conversemos sobre tu proceso</h2>
          <p className="text-lg text-white/80">
            Agenda una entrevista inicial para explorar necesidades terapéuticas, solicitar una evaluación psicodiagnóstica o coordinar una actividad psicoeducativa.
          </p>
          <ul className="space-y-3 text-white/80">
            <li>· Psicoterapia individual para adolescentes y adultos</li>
            <li>· Evaluaciones clínicas y elaboración de informes especializados</li>
            <li>· Talleres y conferencias sobre salud mental y cultura afectiva</li>
          </ul>
          <p className="text-xs text-white/70">
            Este formulario no sustituye la atención de emergencia. Si atraviesas una crisis, comunícate con los servicios de urgencia de tu localidad.
          </p>
          <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/80">
            <p className="font-semibold uppercase tracking-widest text-white/70">Jurisdicción legal</p>
            <p>Atención habilitada en Honduras y Centroamérica. Cumplo con la normativa ética del Colegio Hondureño de Psicólogos y protección de datos (SSL).</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name">Nombre</label>
            <input id="name" {...register("name", { required: true })} placeholder="Tu nombre" className="text-slate-900" />
          </div>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" type="email" {...register("email", { required: true })} placeholder="nombre@empresa.com" className="text-slate-900" />
          </div>
          <div>
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              rows={4}
              {...register("message", { required: true })}
              placeholder="Cuéntame cómo puedo acompañarte"
              className="resize-none text-slate-900"
            />
          </div>
          <div>
            <label htmlFor="tone">¿Cómo te sientes al escribir esto? (opcional)</label>
            <input
              id="tone"
              {...register("tone")}
              placeholder="Ansioso/a, esperanzado/a, con dudas..."
              className="text-slate-900"
            />
          </div>
          <button type="submit" className="btn-primary">
            Enviar mensaje
          </button>
          <div className="space-y-2 text-sm text-white/80">
            {status && <p>{status}</p>}
            <p>
              Al enviar tu mensaje recibirás una respuesta en menos de 24 horas hábiles con los pasos para agendar tu sesión de bienvenida y realizar el pago seguro en línea.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
