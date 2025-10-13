# Guía de dominio y hosting

Esta guía describe una configuración inicial para desplegar el portafolio y blog en **Vercel** con dominio personalizado.

## 1. Preparación del proyecto
1. Crea una cuenta en [Vercel](https://vercel.com/) y conecta tu cuenta de GitHub.
2. Crea un repositorio remoto y empuja este código (`main` o `production`).
3. En la importación del proyecto en Vercel selecciona el repositorio y acepta los valores por defecto:
   - Framework: `Next.js`
   - Comando de build: `next build`
   - Directorio de salida: `.next`

## 2. Variables de entorno
Configura las siguientes variables en **Project Settings → Environment Variables**:

| Variable | Descripción | Valor de ejemplo |
| --- | --- | --- |
| `ADMIN_EMAIL` | Usuario administrador para el panel. | `admin@anarodriguez.dev` |
| `ADMIN_PASSWORD_HASH` | Hash SHA-256 de la contraseña. Generar con `echo -n "tuPassword" | shasum -a 256`. | `bd881cdf358834e8bef278a51fdfa044a967bc0fa8233032190d4fbcd8238320` |
| `JWT_SECRET` | Cadena aleatoria para firmar tokens JWT. | `cambia-esto-por-una-clave-segura` |

> **Nota:** actualiza el hash con una contraseña personalizada antes de desplegar a producción.

## 3. Configuración de dominio personalizado
1. Compra o transfiere tu dominio en el registrador de preferencia (por ejemplo, Namecheap, Google Domains, GoDaddy).
2. En Vercel, accede a **Project → Settings → Domains** y agrega tu dominio, por ejemplo `anarodriguez.dev`.
3. Vercel mostrará los registros DNS que debes configurar:
   - Registros `A` apuntando a las IP de Vercel, o
   - Cambiar los nameservers a los proporcionados por Vercel para administración completa.
4. Tras propagar los cambios (puede tardar hasta 24 h), verifica el dominio en Vercel y activa HTTPS automático (Let's Encrypt).

## 4. Deploy previews y flujos recomendados
- Usa ramas feature (`feature/*`) y pull requests. Cada PR tendrá un preview automático en Vercel.
- Configura reglas de protección para exigir revisión antes de desplegar a producción.
- Emplea la integración de Analytics de Vercel o conecta Google Analytics para enriquecer las métricas del panel.

## 5. Automatización adicional
- Añade [cron jobs de Vercel](https://vercel.com/docs/cron-jobs) si requieres tareas programadas, por ejemplo para recalcular estadísticas.
- Integra servicios de almacenamiento (S3, Cloudinary) para los archivos subidos desde el panel cuando la carga de imágenes crezca.

Con esta configuración tendrás un despliegue continuo, seguro y con dominio propio listo para el portafolio profesional.
