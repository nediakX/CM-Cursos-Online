# Backend y base de datos

Toda la plataforma trabaja con la base de datos Postgres (Neon). Ya no existe el
"modo local" con datos en el navegador ni las cuentas de demostración.

## Estructura

| Archivo | Qué hace |
|---|---|
| `src/services/api.ts` | Cliente HTTP que usa la interfaz (llama a `/api`). |
| `api/index.ts` | Vercel Function que recibe todas las peticiones a `/api/*`. |
| `server/app.ts` | Rutas, autenticación y permisos por rol (alumno / admin). |
| `server/logica.ts` | Lógica de negocio: progreso, evaluaciones, notas, certificados, sitio… |
| `server/db.ts` | Guarda los datos en la tabla `lms_datos` (se crea sola). Usa control de versiones para que dos usuarios que guardan a la vez no se pisen los cambios. |
| `server/auth.ts` | Contraseñas cifradas (scrypt), sesiones firmadas de 7 días y cuenta inicial del administrador. |
| `src/data/` | Contenido base del curso: módulos, lecciones, banco de preguntas y textos iniciales del sitio. Lo que el administrador edita desde el panel queda guardado en la base de datos. |

## Variables de entorno (Vercel → Settings → Environment Variables)

| Variable | Valor |
|---|---|
| `DATABASE_URL` | La crea Vercel al conectar Neon (Storage). |
| `ADMIN_PASSWORD` | Contraseña inicial del administrador. |
| `ADMIN_RUT` | *(opcional)* RUT del administrador inicial. Por defecto 11.111.111-1. |
| `AUTH_SECRET` | *(opcional)* si no existe, se genera uno y se guarda en la base. |

El administrador inicial se crea la primera vez que se usa la API. Después,
cambiar `ADMIN_PASSWORD` no tiene efecto: la contraseña se cambia desde la plataforma.

## Desarrollo local

`pnpm dev` levanta la interfaz y también la API (con el mismo código de
`server/`). Necesita las variables en un archivo `.env.local`:

```powershell
npm i -g vercel
vercel link
vercel env pull .env.local
pnpm dev
```

Ojo: en local trabajas contra la misma base de datos de producción, salvo que
crees una rama de base de datos aparte en Neon.
