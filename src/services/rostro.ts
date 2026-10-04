/**
 * Reconocimiento facial en el navegador con face-api.js (@vladmandic/face-api).
 * Se carga bajo demanda (≈ 1,5 MB de código + 7 MB de modelos desde /models/),
 * sólo en las páginas que lo usan.
 *
 * El navegador calcula un "descriptor" (128 números) del rostro; el servidor
 * lo guarda la primera vez y en cada ingreso lo compara con el registrado.
 */
type FaceApi = typeof import('@vladmandic/face-api');

let carga: Promise<FaceApi> | null = null;

export function cargarReconocimiento(): Promise<FaceApi> {
  carga ??= (async () => {
    const faceapi = await import('@vladmandic/face-api');
    await (faceapi.tf as unknown as { ready: () => Promise<void> }).ready();
    const url = `${import.meta.env.BASE_URL}models`;
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(url),
      faceapi.nets.faceLandmark68Net.loadFromUri(url),
      faceapi.nets.faceRecognitionNet.loadFromUri(url),
    ]);
    return faceapi;
  })().catch((e) => {
    carga = null;
    throw e;
  });
  return carga;
}

export type ResultadoRostro =
  | { ok: true; descriptor: number[]; caja: { x: number; y: number; width: number; height: number } }
  | { ok: false; motivo: 'SIN_ROSTRO' | 'VARIOS_ROSTROS' | 'ROSTRO_PEQUENO' };

/** Detecta un único rostro y calcula su descriptor. */
export async function describirRostro(fuente: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement): Promise<ResultadoRostro> {
  const faceapi = await cargarReconocimiento();
  const opciones = new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.5 });
  const caras = await faceapi.detectAllFaces(fuente, opciones).withFaceLandmarks().withFaceDescriptors();
  if (caras.length === 0) return { ok: false, motivo: 'SIN_ROSTRO' };
  if (caras.length > 1) return { ok: false, motivo: 'VARIOS_ROSTROS' };
  const c = caras[0];
  const ancho = fuente instanceof HTMLVideoElement ? fuente.videoWidth : fuente.width;
  if (c.detection.box.width < ancho * 0.18) return { ok: false, motivo: 'ROSTRO_PEQUENO' };
  const { x, y, width, height } = c.detection.box;
  return { ok: true, descriptor: Array.from(c.descriptor), caja: { x, y, width, height } };
}

export const MENSAJES_ROSTRO: Record<string, string> = {
  SIN_ROSTRO: 'No vemos tu rostro. Mira a la cámara con buena luz.',
  VARIOS_ROSTROS: 'Hay más de una persona en la imagen. Debes aparecer solo tú.',
  ROSTRO_PEQUENO: 'Acércate un poco más a la cámara.',
};

/** Recorta un cuadrado centrado y lo devuelve como JPEG (data URL). */
export function capturarFoto(fuente: HTMLVideoElement | HTMLImageElement, lado = 320): string {
  const w = fuente instanceof HTMLVideoElement ? fuente.videoWidth : fuente.naturalWidth;
  const h = fuente instanceof HTMLVideoElement ? fuente.videoHeight : fuente.naturalHeight;
  const m = Math.min(w, h);
  const canvas = document.createElement('canvas');
  canvas.width = lado;
  canvas.height = lado;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(fuente, (w - m) / 2, (h - m) / 2, m, m, 0, 0, lado, lado);
  return canvas.toDataURL('image/jpeg', 0.82);
}

/** Abre una imagen elegida por el usuario y la entrega lista para detectar el rostro. */
export function cargarImagen(archivo: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (!archivo.type.startsWith('image/')) return reject(new Error('NO_ES_IMAGEN'));
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('IMAGEN_INVALIDA'));
    img.src = url;
  });
}

/** Enciende la cámara frontal. */
export async function abrirCamara(video: HTMLVideoElement): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) throw new Error('SIN_CAMARA');
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
  video.srcObject = stream;
  await video.play();
  return stream;
}
export const cerrarCamara = (stream: MediaStream | null) => stream?.getTracks().forEach((t) => t.stop());
