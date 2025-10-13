# Portafolio profesional y blog

Este proyecto implementa un portafolio profesional, blog personal y panel de administración basado en **Next.js 14**, con soporte para tema claro/oscuro, contenido dinámico y gestión de archivos.

## Características principales
- Landing page con secciones de presentación, habilidades, portafolio, blog y contacto.
- Sección "Sobre mí" con línea de tiempo de hitos profesionales.
- Blog con artículos individuales, etiquetas y extractos.
- Portafolio con tarjetas de proyectos, tecnologías y enlaces a demo/código.
- Panel de administración protegido con JWT para gestionar publicaciones y proyectos.
- Editor WYSIWYG (React Quill) para crear contenido enriquecido.
- Subida de imágenes al servidor (`/public/uploads`).
- Estadísticas básicas de visitas y suscriptores visibles en el dashboard.
- Tema claro/oscuro con `next-themes` y diseño responsive con Tailwind CSS.

## Requisitos previos
- Node.js >= 18.
- npm o pnpm.

## Puesta en marcha
```bash
npm install
npm run dev
```

El panel de administración está disponible en `http://localhost:3000/admin/login`.

Credenciales de ejemplo (cambia en producción):
- **Correo:** `admin@anarodriguez.dev`
- **Contraseña:** `SuperSegura!2024`

## Variables de entorno
Crea un archivo `.env.local` con los siguientes valores (puedes reutilizar los ejemplos):

```
ADMIN_EMAIL=admin@anarodriguez.dev
ADMIN_PASSWORD_HASH=bd881cdf358834e8bef278a51fdfa044a967bc0fa8233032190d4fbcd8238320
JWT_SECRET=cambia-esto-por-una-clave-segura
```

La contraseña se compara mediante hash SHA-256. Genera uno nuevo con `echo -n "TuPassword" | shasum -a 256`.

## Estructura de carpetas
- `app/`: rutas del sitio (públicas, blog, portafolio, admin, APIs).
- `components/`: componentes UI reutilizables y herramientas del dashboard.
- `data/`: fuente de datos inicial en formato JSON.
- `public/`: recursos estáticos (imágenes, uploads).
- `lib/`: utilidades, autenticación, acceso a datos.
- `infra/hosting/`: guía de dominio y despliegue.

## Hosting y dominio
Consulta `infra/hosting/README.md` para la configuración recomendada en Vercel, dominios personalizados y variables de entorno.

## Pruebas
Actualmente el proyecto no incluye pruebas automatizadas. Se recomienda integrar Playwright o Cypress para flujos críticos y Vitest para lógica de negocio.
