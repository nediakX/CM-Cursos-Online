# Cambios: landing, administración total y accesibilidad

## Nuevo

| Ruta | Qué es |
|---|---|
| `/` | **Landing de venta**: portada, beneficios, temario (se genera desde los módulos), cómo funciona, instructor, testimonios, precios, preguntas frecuentes, formulario de inscripción, pie con redes y botón flotante de WhatsApp. |
| `/admin/sitio` | **Editor del sitio**: marca (nombre, logo, colores con revisión de contraste), portada, orden y visibilidad de secciones, beneficios, pasos, instructor, testimonios, planes y links de pago, FAQ, contacto, redes y SEO. |
| `/admin/solicitudes` | **Interesados** que llenaron el formulario: estados, notas, WhatsApp directo, exportar CSV y **crear la cuenta de alumno con un clic**. |
| `/admin/contenido/:moduloId` | **Editor de lecciones**: agregar/ordenar/eliminar lecciones y bloques (texto, video, imagen, nota, lista, checklist, pregunta, tabla, calculadora y bloques avanzados en JSON), introducción, resumen, laboratorios y taller. Vista previa como alumno. |
| `*` | Página 404 propia (antes redirigía al login). |

- Bloques nuevos para las lecciones: **video** (YouTube, Vimeo, Drive o .mp4) e **imagen** (con texto alternativo obligatorio).
- Los colores de marca ya no están fijos en el código: todas las clases usan `primary` / `accent` y el administrador los cambia desde el panel.
- Las páginas se cargan bajo demanda: el JS inicial bajó de 1,2 MB a ~290 KB, y la landing no descarga el banco de preguntas.

## Accesibilidad (WCAG 2.1 AA)
Enlace "Saltar al contenido", foco visible, diálogos con foco atrapado y devuelto, menús con `aria-expanded` y cierre con Escape, formularios con etiquetas y errores asociados, contraste corregido en toda la plataforma, `lang="es"`, respeto a "reducir movimiento". Todas las páginas pasan la auditoría automática axe (WCAG 2 A/AA).

## Si conectas un backend (`VITE_API_URL`)
Endpoints nuevos que debe implementar:

```
GET    /sitio                    (público)   → SiteConfig
PUT    /sitio                    (admin)
DELETE /sitio                    (admin)     → vuelve a los valores por defecto
GET    /publico/curso            (público)   → Curso (para el temario de la landing)
POST   /solicitudes              (público)   → crea una solicitud
GET    /solicitudes              (admin)
PATCH  /solicitudes/:id          (admin)
DELETE /solicitudes/:id          (admin)
GET    /modulos/:id/contenido    → ContenidoModulo
PUT    /modulos/:id/contenido    (admin)     → guarda y sincroniza las lecciones del módulo
DELETE /modulos/:id/contenido    (admin)     → restaura el contenido original
```

Los tipos están en `src/types.ts` (`SiteConfig`, `Solicitud`, `ContenidoModulo`).

## Pendiente / notas
- Precios, WhatsApp, instructor y testimonios vienen con valores de ejemplo: el panel muestra un aviso hasta que se completen. Las secciones de instructor y testimonios parten ocultas.
- Sin backend, todo (incluidas las solicitudes) se guarda en el navegador de quien lo usa. Para recibir inscripciones reales de otras personas hace falta el backend.
- `src/pages/api.ts` es una copia antigua de `src/services/api.ts` que nadie importa; se puede borrar.
