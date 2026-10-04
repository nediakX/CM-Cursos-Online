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
| `BLOB_READ_WRITE_TOKEN` | La crea Vercel al conectar un Blob store (Storage). Necesaria para subir archivos. |

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

## Módulos habilitados

Cada alumno sólo puede entrar a los módulos que el administrador le habilitó
(por defecto, el Módulo 1). Se gestionan en **Habilitar módulos**
(`/admin/modulos`, tabla de alumnos × módulos con avance y notas) o en la ficha
de cada alumno. El servidor bloquea el contenido, el avance y las evaluaciones
de los módulos no habilitados.

Evaluaciones: la de cada módulo se abre al completar todas sus lecciones; el
examen parcial, al completar los módulos 1 a 5; los simuladores SEC y el
examen final, al completar todos los módulos. La diagnóstica está siempre abierta.

## Fotografía y verificación facial

- Al primer ingreso, el alumno registra su rostro con la cámara (con
  consentimiento) y esa captura queda como su fotografía. En cada ingreso
  siguiente debe verificar su rostro antes de ver el contenido.
- El reconocimiento corre en el navegador con `@vladmandic/face-api`; los
  modelos (≈ 7 MB) se sirven desde `/models/` (los copia `vite.config.ts`).
  El servidor guarda sólo un descriptor numérico del rostro y lo compara
  (`server/auth.ts`, umbral 0,5). Tras 5 intentos fallidos bloquea 10 minutos.
- Fotos y descriptores se guardan en filas aparte (`foto:<id>`, `rostro:<id>`).
- Desde la ficha del alumno (pestaña **Identidad**) el administrador puede
  subir una fotografía (si se detecta un rostro, queda también registrado),
  restablecer el rostro o desactivar la verificación para ese alumno.

Limitación: es una verificación de identidad razonable para un curso, no un
sistema biométrico de alta seguridad (no detecta, por ejemplo, una foto
mostrada frente a la cámara).

## Presentaciones

`src/data/presentaciones.ts` contiene las diapositivas de los 10 módulos,
generadas desde los "Manual del Alumno". Se ven en la pestaña **Presentación**
de cada módulo.

## Archivos (Vercel Blob)

Las entregas del proyecto final (hasta 50 MB por archivo: PDF, Word, Excel,
PowerPoint, imágenes, DWG/DXF, ZIP) y las imágenes del sitio y de las lecciones
(hasta 8 MB) se suben directo desde el navegador a Vercel Blob, sin pasar por la
función (que limita las peticiones a 4,5 MB). `/api/archivos/subir` sólo
autoriza la subida: cada alumno sólo puede subir a `entregas/<su id>/` y sólo
el administrador a `imagenes/`.

Los archivos quedan con una URL pública difícil de adivinar (sufijo aleatorio).
Sin `BLOB_READ_WRITE_TOKEN`, las imágenes se guardan embebidas (hasta 400 KB) y
la entrega del proyecto muestra un aviso.

## Seguridad del inicio de sesión

Tras 5 contraseñas incorrectas seguidas para un mismo RUT, ese RUT queda
bloqueado 15 minutos (`login:<rut>` en la tabla).

## Registro de ingresos

Cada ingreso de un alumno queda guardado (`ingresos:<id>`, últimos 2.000) con
fecha, hora, IP y si verificó su rostro. El administrador lo ve en
**Registro de ingresos** (`/admin/ingresos`), con filtro por fechas y
exportación a CSV (resumen por alumno o detalle) para respaldar asistencia.
