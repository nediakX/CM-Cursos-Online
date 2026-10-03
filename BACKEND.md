# Backend y base de datos

La plataforma tiene dos modos:

| Modo | Cuándo | Dónde se guardan los datos |
|---|---|---|
| **Local** | `VITE_API_URL` no está definida (p. ej. `pnpm dev`) | En el navegador (`localStorage`), sólo para pruebas |
| **Servidor** | `VITE_API_URL=/api` | En Postgres (Neon), compartidos por todos los usuarios |

## Cómo funciona

- `api/index.ts`: Vercel Function que recibe todas las peticiones a `/api/*`.
- `server/app.ts`: rutas, autenticación y permisos por rol (alumno / admin).
- `server/db.ts`: guarda los datos en la tabla `lms_datos` (se crea sola). Usa control de versiones para que dos usuarios que guardan a la vez no se pisen los cambios.
- `server/auth.ts`: contraseñas cifradas con scrypt y sesiones firmadas que duran 7 días.
- La lógica de negocio (notas, elegibilidad de certificados, etc.) es la misma de `src/services/localStore.ts`, así que ambos modos se comportan igual.

## Variables de entorno en Vercel

| Variable | Valor |
|---|---|
| `DATABASE_URL` | La crea Vercel al conectar Neon (Storage) |
| `VITE_API_URL` | `/api` |
| `ADMIN_PASSWORD` | Contraseña inicial del administrador (RUT 11.111.111-1) |
| `ADMIN_RUT` | *(opcional)* otro RUT para el administrador inicial |
| `AUTH_SECRET` | *(opcional)* si no existe, se genera uno y se guarda en la base |

El administrador inicial se crea la primera vez que se usa la API. Después, cambiar `ADMIN_PASSWORD` no tiene efecto: la contraseña se cambia desde la plataforma.

En el servidor **no existen** las cuentas de demostración del modo local (`Admin1234!` / `Alumno1234!`).
