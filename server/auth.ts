/** Contraseñas cifradas (scrypt) y sesiones firmadas (HMAC-SHA256). */
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { normalizarRut, type CuentaLocal } from './logica.js';

export function cifrarPassword(plana: string): string {
  const sal = randomBytes(16);
  const hash = scryptSync(plana, sal, 32);
  return `scrypt$${sal.toString('base64')}$${hash.toString('base64')}`;
}

export function verificarPassword(plana: string, guardada: string): boolean {
  const [tipo, sal, hash] = guardada.split('$');
  if (tipo !== 'scrypt' || !sal || !hash) return false;
  const esperado = Buffer.from(hash, 'base64');
  const calculado = scryptSync(plana, Buffer.from(sal, 'base64'), esperado.length);
  return timingSafeEqual(esperado, calculado);
}

export function passwordTemporal(): string {
  const letras = 'abcdefghjkmnpqrstuvwxyz23456789';
  const azar = [...randomBytes(8)].map((b) => letras[b % letras.length]).join('');
  return `Cm${azar}!`;
}

/**
 * Cuenta inicial: sólo el administrador, con la contraseña de ADMIN_PASSWORD.
 * Se crea la primera vez que se usa la API (con la base de datos vacía).
 */
export function cuentasInicialesServidor(): CuentaLocal[] {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('FALTA_ADMIN_PASSWORD');
  return [
    {
      password: cifrarPassword(pw),
      user: {
        id: 'u-admin-1',
        rut: normalizarRut(process.env.ADMIN_RUT ?? '11.111.111-1'),
        nombres: 'Carlos',
        apellidos: 'Moll',
        email: process.env.ADMIN_EMAIL ?? '',
        telefono: '',
        rol: 'admin',
        activo: true,
        debeCambiarPassword: false,
        cursosAsignados: [],
        creadoEn: new Date().toISOString(),
      },
    },
  ];
}

const DURACION_SESION_MS = 7 * 24 * 60 * 60 * 1000;
const b64url = (b: Buffer | string) => Buffer.from(b).toString('base64url');

export interface Sesion {
  userId: string;
  /** El alumno verificó su rostro en esta sesión. */
  rostro: boolean;
}

export function crearToken(userId: string, secreto: string, rostro = false): string {
  const cuerpo = b64url(JSON.stringify({ sub: userId, rf: rostro, exp: Date.now() + DURACION_SESION_MS }));
  const firma = b64url(createHmac('sha256', secreto).update(cuerpo).digest());
  return `${cuerpo}.${firma}`;
}

/** Devuelve la sesión si el token es válido y no ha expirado. */
export function leerToken(token: string, secreto: string): Sesion | null {
  const [cuerpo, firma] = token.split('.');
  if (!cuerpo || !firma) return null;
  const esperada = createHmac('sha256', secreto).update(cuerpo).digest();
  const recibida = Buffer.from(firma, 'base64url');
  if (recibida.length !== esperada.length || !timingSafeEqual(recibida, esperada)) return null;
  try {
    const { sub, exp, rf } = JSON.parse(Buffer.from(cuerpo, 'base64url').toString()) as { sub: string; exp: number; rf?: boolean };
    return typeof sub === 'string' && exp > Date.now() ? { userId: sub, rostro: rf === true } : null;
  } catch {
    return null;
  }
}

// --- Rostro -----------------------------------------------------------------
/**
 * Distancia euclidiana máxima entre dos descriptores faciales (face-api.js,
 * 128 valores) para considerarlos la misma persona. 0,6 es el valor estándar;
 * usamos 0,5 para ser más estrictos.
 */
export const UMBRAL_ROSTRO = 0.5;

export function descriptorValido(d: unknown): d is number[] {
  return Array.isArray(d) && d.length === 128 && d.every((x) => typeof x === 'number' && Number.isFinite(x) && Math.abs(x) < 10);
}

export function distancia(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2;
  return Math.sqrt(s);
}
