import { CalendarClock, Lock, MonitorPlay, NotebookPen, Sparkles } from "lucide-react";

const services = [
  {
    title: "Terapia individual",
    description:
      "Ideal para personas que buscan abordar ansiedad, depresión leve, crisis vitales o fortalecer su autoestima. Trabajamos objetivos claros, herramientas de regulación emocional y seguimiento entre sesiones.",
    outcomes: [
      "Evaluación diagnóstica inicial y plan terapéutico personalizado",
      "Sesiones de 50 minutos con ejercicios prácticos para el día a día",
      "Recursos digitales y tareas opcionales para profundizar el proceso"
    ]
  },
  {
    title: "Terapia de pareja",
    description:
      "Si desean reconstruir la confianza, mejorar la comunicación o acompañar una transición importante. Facilitamos conversaciones seguras y diseñamos acuerdos que fortalecen el vínculo.",
    outcomes: [
      "Mapa de objetivos compartidos y roles claros",
      "Herramientas para resolución de conflictos y escucha activa",
      "Sesiones quincenales con seguimiento individual cuando es necesario"
    ]
  },
  {
    title: "Evaluaciones psicológicas",
    description:
      "Procesos de psicodiagnóstico para instituciones, colegios o uso personal. Incluye pruebas validadas, entrevista clínica y devolución integral con recomendaciones.",
    outcomes: [
      "Selección de instrumentos basada en tu necesidad",
      "Informe escrito con hallazgos y sugerencias prácticas",
      "Sesión de cierre para resolver dudas y trazar próximos pasos"
    ]
  }
];

const sessionSteps = [
  {
    icon: MonitorPlay,
    title: "Sesiones por videollamada",
    description:
      "Trabajamos en plataformas seguras (Google Meet o Zoom profesional) con encriptación y respaldo en la nube."
  },
  {
    icon: CalendarClock,
    title: "Agenda flexible",
    description:
      "Horarios matutinos y vespertinos, con confirmaciones y recordatorios automáticos para reducir inasistencias."
  },
  {
    icon: NotebookPen,
    title: "Seguimiento entre sesiones",
    description:
      "Acceso a tu plan terapéutico, materiales descargables y registro de avances dentro del área privada."
  },
  {
    icon: Lock,
    title: "Confidencialidad garantizada",
    description:
      "Cumplimos con estándares éticos internacionales y políticas de protección de datos."
  }
];

const pricing = [
  {
    title: "Sesión individual",
    price: "$45 USD",
    detail: "50 minutos · Incluye seguimiento por correo"
  },
  {
    title: "Paquete bienestar (4 sesiones)",
    price: "$160 USD",
    detail: "Ideal para procesos focalizados. Vigencia de 8 semanas"
  },
  {
    title: "Proceso de pareja",
    price: "$65 USD",
    detail: "Sesiones de 70 minutos con materiales compartidos"
  }
];

const faqs = [
  {
    question: "¿Cómo realizo el pago?",
    answer:
      "Puedes pagar con tarjeta de crédito o débito internacional a través de Stripe. También acepto transferencias bancarias en Honduras y pagos en PayPal."
  },
  {
    question: "¿Qué pasa si necesito cancelar?",
    answer:
      "Las sesiones pueden reprogramarse con 24 horas de antelación sin costo. Cancelaciones tardías se cobran al 50% para respetar el espacio reservado."
  },
  {
    question: "¿Atiendes emergencias?",
    answer:
      "No ofrezco intervenciones de crisis inmediata. En caso de emergencia contacta a los servicios locales o líneas de apoyo psicológico de tu país."
  },
  {
    question: "¿Trabajas con adolescentes?",
    answer:
      "Sí, a partir de los 13 años con autorización de sus padres o tutores y reuniones periódicas de seguimiento familiar."
  }
];

export const metadata = {
  title: "Servicios y tarifas | Paola Madrid Psicología",
  description: "Conoce los servicios de terapia individual, pareja y evaluaciones psicológicas disponibles en modalidad online."
};

export default function ServicesPage() {
  return (
    <section className="section-container space-y-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Servicios y tarifas</h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Diseñamos procesos terapéuticos claros, accesibles y medibles. Elige la modalidad que mejor se adapte a tu momento vital y agenda tu sesión de bienvenida para comenzar.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="card h-full space-y-4 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{service.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>· {outcome}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="grid gap-8 rounded-3xl bg-white/80 p-10 shadow-lg dark:bg-slate-900/70 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-primary-500">Modalidad online</p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Así se vive cada sesión</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Antes de iniciar recibirás instrucciones de conexión, acuerdo terapéutico y cuestionario inicial. Luego, en la entrevista diagnóstica definimos objetivos y métricas de avance para personalizar tu experiencia.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Entre sesiones puedes escribir a través del área privada para resolver dudas breves o compartir reflexiones relevantes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sessionSteps.map((step) => (
            <div key={step.title} className="card h-full space-y-3 p-5">
              <step.icon className="h-8 w-8 text-primary-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs uppercase tracking-widest text-primary-500">Tarifas transparentes</p>
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((item) => (
            <div key={item.title} className="card space-y-2 p-6 text-center">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-3xl font-bold text-primary-500">{item.price}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Los paquetes pueden pagarse en un solo depósito o en dos cuotas. Solicita factura electrónica o recibos institucionales en tu mensaje de contacto.
        </p>
      </div>

      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white/70 p-10 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="space-y-2 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-primary-500" />
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Preguntas frecuentes</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Resuelve tus dudas antes de agendar. Si necesitas más información, escríbeme en el formulario de contacto.
          </p>
        </div>
        <dl className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl bg-slate-100/70 p-5 dark:bg-slate-800/60">
              <dt className="text-lg font-semibold text-slate-900 dark:text-white">{faq.question}</dt>
              <dd className="mt-2 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
