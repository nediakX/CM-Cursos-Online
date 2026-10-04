/**
 * Subida de archivos a Vercel Blob directamente desde el navegador.
 * El servidor (/api/archivos/subir) autoriza cada subida y fija tipos y tamaños.
 */
import { BASE_URL, getToken } from './api';

export type TipoArchivo = 'entrega' | 'imagen';

/** Nombre seguro para la ruta del archivo (sin tildes ni caracteres raros). */
const limpiar = (nombre: string) =>
  nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(-80) || 'archivo';

let estado: Promise<boolean> | null = null;
/** ¿El sitio tiene Vercel Blob configurado? (se consulta una vez) */
export function archivosDisponibles(): Promise<boolean> {
  estado ??= fetch(`${BASE_URL}/archivos/estado`, { headers: { Authorization: `Bearer ${getToken() ?? ''}` } })
    .then((r) => (r.ok ? r.json() : { configurado: false }))
    .then((r: { configurado: boolean }) => r.configurado)
    .catch(() => {
      estado = null;
      return false;
    });
  return estado;
}

export interface ArchivoSubido {
  nombre: string;
  url: string;
}

/**
 * Sube un archivo y devuelve su URL pública (con un sufijo aleatorio, difícil de adivinar).
 * Lanza Error('ARCHIVOS_NO_CONFIGURADOS') si el sitio aún no tiene Vercel Blob.
 */
export async function subirArchivo(
  archivo: File,
  tipo: TipoArchivo,
  opciones: { userId?: string; onProgreso?: (porcentaje: number) => void } = {},
): Promise<ArchivoSubido> {
  if (!(await archivosDisponibles())) throw new Error('ARCHIVOS_NO_CONFIGURADOS');
  const { upload } = await import('@vercel/blob/client');
  const carpeta = tipo === 'entrega' ? `entregas/${opciones.userId}` : 'imagenes';
  try {
    const r = await upload(`${carpeta}/${limpiar(archivo.name)}`, archivo, {
      access: 'public',
      handleUploadUrl: `${BASE_URL}/archivos/subir`,
      headers: { Authorization: `Bearer ${getToken() ?? ''}` },
      contentType: archivo.type || 'application/octet-stream',
      multipart: archivo.size > 8 * 1024 * 1024,
      onUploadProgress: (p) => opciones.onProgreso?.(Math.round(p.percentage)),
    });
    return { nombre: archivo.name, url: r.url };
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    if (msg.includes('ARCHIVOS_NO_CONFIGURADOS')) throw new Error('ARCHIVOS_NO_CONFIGURADOS');
    if (/content type|contentType/i.test(msg)) throw new Error('TIPO_NO_PERMITIDO');
    if (/size|too large|maximum/i.test(msg)) throw new Error('ARCHIVO_MUY_GRANDE');
    throw e;
  }
}
