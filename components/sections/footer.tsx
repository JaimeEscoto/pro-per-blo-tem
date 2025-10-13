export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-10 text-sm text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
      <div className="section-container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <p>&copy; {new Date().getFullYear()} Ana Rodríguez. Todos los derechos reservados.</p>
        <div className="flex items-center gap-6">
          <a href="/politica-privacidad" className="hover:text-primary-500">
            Privacidad
          </a>
          <a href="/terminos" className="hover:text-primary-500">
            Términos
          </a>
          <a href="mailto:hola@anarodriguez.dev" className="hover:text-primary-500">
            hola@anarodriguez.dev
          </a>
        </div>
      </div>
    </footer>
  );
}
