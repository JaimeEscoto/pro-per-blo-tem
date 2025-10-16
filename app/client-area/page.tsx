import { CalendarRange, FileText, Lock, ShieldCheck, UserCircle2 } from "lucide-react";

const features = [
  {
    icon: UserCircle2,
    title: "Panel personalizado",
    description:
      "Consulta tu historial de sesiones, próximas citas y objetivos terapéuticos acordados. Todo en un mismo lugar, accesible 24/7."
  },
  {
    icon: FileText,
    title: "Materiales y tareas",
    description:
      "Descarga tareas terapéuticas, fichas de seguimiento y documentos compartidos durante el proceso. Puedes subir tus registros para recibir retroalimentación."
  },
  {
    icon: CalendarRange,
    title: "Agendamiento integrado",
    description:
      "Reserva o reprograma sesiones con sincronización automática en tu calendario. Recibe recordatorios y enlaces de videollamada sin complicaciones."
  },
  {
    icon: ShieldCheck,
    title: "Pagos seguros",
    description:
      "Procesa tus pagos con Stripe o PayPal directamente desde el panel. Recibe facturas y comprobantes electrónicos al instante."
  },
  {
    icon: Lock,
    title: "Confidencialidad garantizada",
    description:
      "La plataforma cuenta con cifrado SSL, doble verificación opcional y políticas de respaldo que protegen tu información clínica."
  }
];

export const metadata = {
  title: "Área de cliente | Paola Madrid Psicología"
};

export default function ClientAreaPage() {
  return (
    <section className="section-container space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">Área privada para clientes</h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-600 dark:text-slate-300">
          Inicia sesión para acceder a tu espacio personalizado. Si es tu primera vez, recibirás tus credenciales después de la sesión de bienvenida.
        </p>
        <a href="https://app.paolamadridpsicologia.com" className="btn-primary inline-flex" rel="noreferrer">
          Ir al panel seguro
        </a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="card h-full space-y-3 p-6">
            <feature.icon className="h-10 w-10 text-primary-500" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
          </article>
        ))}
      </div>
      <div className="rounded-3xl bg-white/70 p-8 text-sm text-slate-600 shadow-sm dark:bg-slate-900/60 dark:text-slate-300">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">¿Aún no tienes acceso?</h2>
        <p className="mt-2">
          Solicita tu cuenta durante la entrevista inicial o escríbeme a <a href="mailto:contacto@paolamadridpsicologia.com">contacto@paolamadridpsicologia.com</a>. Activaré tu perfil para que puedas agendar, pagar y revisar recursos desde cualquier dispositivo.
        </p>
      </div>
    </section>
  );
}
