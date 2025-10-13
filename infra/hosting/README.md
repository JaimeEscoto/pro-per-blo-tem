# Guía de despliegue en Render + Supabase

Esta guía describe cómo preparar la base de datos en **Supabase** y cómo desplegar el frontend/backoffice de Next.js en **Render**.

## 1. Configuración de Supabase
1. Crea un proyecto en [Supabase](https://supabase.com/).
2. En la sección **SQL Editor**, ejecuta el script `infra/hosting/supabase-schema.sql` de este repositorio para crear las tablas necesarias (`posts`, `projects`, `site_stats`).
3. Inserta un registro inicial en `site_stats` (puede hacerse desde la tabla) para evitar errores al consultar estadísticas, por ejemplo:
   ```sql
   insert into site_stats (id, total_visits, newsletter_subscribers, monthly)
   values ('default', 0, 0, '[]'::jsonb)
   on conflict (id) do nothing;
   ```
4. En **Project Settings → API**, copia la URL del proyecto (`Project URL`) y la `service_role key`. Se utilizarán como `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
5. Opcional: crea un bucket en Supabase Storage o integra un proveedor como S3 para alojar las imágenes cargadas desde el panel, ya que el sistema de archivos de Render es efímero.

## 2. Variables de entorno
Configura las siguientes variables tanto en tu `.env.local` como en Render (`Environment → Environment Variables`):

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `ADMIN_EMAIL` | Usuario administrador para el panel. | `admin@paolamadridpsicologia.com` |
| `ADMIN_PASSWORD_HASH` | Hash SHA-256 de la contraseña. Generar con `echo -n "tuPassword" \| shasum -a 256`. | `bd881cdf358834e8bef278a51fdfa044a967bc0fa8233032190d4fbcd8238320` |
| `JWT_SECRET` | Cadena aleatoria para firmar tokens JWT. | `cambia-esto-por-una-clave-segura` |
| `SUPABASE_URL` | URL base del proyecto Supabase. | `https://tu-proyecto.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave `service_role` para ejecutar operaciones CRUD en el backend. | `eyJhbGciOiJI...` |

> **Importante:** Mantén la `service_role key` en el backend únicamente. No debe exponerse en el navegador.

## 3. Despliegue del frontend/backend en Render
1. Conecta tu repositorio a Render y crea un nuevo **Web Service**.
2. Selecciona el runtime `Node` y la región más cercana a tus usuarios.
3. Define los comandos:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
4. Establece el plan como **Web Service** (Next.js funciona como SSR).
5. Agrega las variables de entorno definidas anteriormente y despliega.
6. Configura un dominio personalizado desde la pestaña **Custom Domains** si lo necesitas.

## 4. Flujos de trabajo recomendados
- Usa ramas `feature/*` y Pull Requests. Render generará deploys previos si habilitas **Preview Environments**.
- Automatiza copias de seguridad en Supabase y configura roles/usuarios para limitar el acceso.
- Integra servicios externos (p. ej. Supabase Storage, Cloudinary) para almacenar imágenes de manera persistente.

Con esta configuración tendrás la base de datos en Supabase y la aplicación (frontend + backend) ejecutándose en Render.
