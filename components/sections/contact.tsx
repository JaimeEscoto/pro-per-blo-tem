"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { register, handleSubmit, reset } = useForm<ContactForm>();
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (data: ContactForm) => {
    setStatus("¡Gracias por tu mensaje! Te responderé en menos de 48 horas.");
    console.info("Mensaje de contacto", data);
    reset();
  };

  return (
    <section id="contacto" className="section-container">
      <div className="grid gap-10 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 p-10 text-white md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Construyamos algo extraordinario</h2>
          <p className="text-lg text-white/80">
            Agenda una sesión estratégica para revisar tu producto, preparar una auditoría técnica o escalar tu equipo de ingeniería.
          </p>
          <ul className="space-y-3 text-white/80">
            <li>· Mentorías personalizadas para líderes técnicos</li>
            <li>· Auditorías de arquitectura y performance</li>
            <li>· Diseño y lanzamiento de MVP en 6 semanas</li>
          </ul>
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
            <textarea id="message" rows={4} {...register("message", { required: true })} placeholder="Cuéntame sobre tu proyecto" className="resize-none text-slate-900" />
          </div>
          <button type="submit" className="btn-primary">
            Enviar mensaje
          </button>
          {status && <p className="text-sm text-white/80">{status}</p>}
        </form>
      </div>
    </section>
  );
}
