/** Contraseñas cifradas (scrypt) y sesiones firmadas (HMAC-SHA256). */
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { CUENTAS_INICIALES, type CuentaLocal } from '../src/services/localStore.js';

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
 * Cuenta inicial del servidor: sólo el administrador, con la contraseña de la
 * variable ADMIN_PASSWORD (las cuentas de demostración del modo local tienen
 * contraseñas públicas y no se crean en producción).
 */
export function cuentasInicialesServidor(): CuentaLocal[] {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error('FALTA_ADMIN_PASSWORD');
  const admin = CUENTAS_INICIALES.find((c) => c.user.rol === 'admin')!;
  return [
    {
      password: cifrarPassword(pw),
      user: {
        ...admin.user,
        rut: process.env.ADMIN_RUT ? process.env.ADMIN_RUT.replace(/[^0-9kK]/g, '').toUpperCase() : admin.user.rut,
        creadoEn: new Date().toISOString(),
      },
    },
  ];
}

const DURACION_SESION_MS = 7 * 24 * 60 * 60 * 1000;
const b64url = (b: Buffer | string) => Buffer.from(b).toString('base64url');

export function crearToken(userId: string, secreto: string): string {
  const cuerpo = b64url(JSON.stringify({ sub: userId, exp: Date.now() + DURACION_SESION_MS }));
  const firma = b64url(createHmac('sha256', secreto).update(cuerpo).digest());
  return `${cuerpo}.${firma}`;
}

/** Devuelve el id del usuario si el token es válido y no ha expirado. */
export function leerToken(token: string, secreto: string): string | null {
  const [cuerpo, firma] = token.split('.');
  if (!cuerpo || !firma) return null;
  const esperada = createHmac('sha256', secreto).update(cuerpo).digest();
  const recibida = Buffer.from(firma, 'base64url');
  if (recibida.length !== esperada.length || !timingSafeEqual(recibida, esperada)) return null;
  try {
    const { sub, exp } = JSON.parse(Buffer.from(cuerpo, 'base64url').toString()) as { sub: string; exp: number };
    return typeof sub === 'string' && exp > Date.now() ? sub : null;
  } catch {
    return null;
  }
}
