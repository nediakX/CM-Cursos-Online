import type { Curso, Evaluacion, Intento, Progreso, User } from '../types';

/**
 * Módulos a los que el usuario puede entrar.
 *  - Administrador: todos.
 *  - Alumno: los que el administrador le habilitó (por defecto, sólo el primero).
 * Se usa en la interfaz y en el servidor (server/logica.ts), así que no debe
 * importar nada del navegador.
 */
export function modulosHabilitados(user: Pick<User, 'rol' | 'modulosHabilitados'> | null | undefined, curso: Curso): Set<string> {
  if (!user || user.rol === 'admin') return new Set(curso.modulos.map((m) => m.id));
  const ordenados = [...curso.modulos].sort((a, b) => a.orden - b.orden);
  const lista = user.modulosHabilitados ?? (ordenados[0] ? [ordenados[0].id] : []);
  return new Set(lista.filter((id) => curso.modulos.some((m) => m.id === id)));
}

/** ¿El alumno completó todas las lecciones del módulo? */
export function moduloCompleto(curso: Curso, progreso: Progreso, moduloId: string): boolean {
  const hechas = new Set(progreso.leccionesCompletadas);
  const m = curso.modulos.find((x) => x.id === moduloId);
  return !!m && m.lecciones.length > 0 && m.lecciones.every((l) => hechas.has(l.id));
}

/**
 * Reglas de desbloqueo de evaluaciones (las mismas en la interfaz y en el servidor):
 *  - Diagnóstica: siempre disponible (mide conocimientos previos).
 *  - Evaluación de módulo: el módulo debe estar habilitado y con todas sus lecciones completas.
 *  - Examen parcial: todos los módulos que abarca, completos.
 *  - Simuladores SEC y examen final: todos los módulos del curso completos.
 */
export function estadoEvaluacion(
  ev: Evaluacion,
  curso: Curso,
  progreso: Progreso,
  user?: Pick<User, 'rol' | 'modulosHabilitados'> | null,
): { desbloqueada: boolean; motivo?: string } {
  const completo = (moduloId: string) => moduloCompleto(curso, progreso, moduloId);
  const num = (id: string) => curso.modulos.find((m) => m.id === id)?.orden ?? id.replace('mod-', '');
  if (ev.tipo === 'diagnostica') return { desbloqueada: true };
  if (ev.tipo === 'modulo' && ev.moduloId) {
    if (user && !modulosHabilitados(user, curso).has(ev.moduloId)) {
      return { desbloqueada: false, motivo: `El Módulo ${num(ev.moduloId)} aún no ha sido habilitado por tu relator` };
    }
    return completo(ev.moduloId) ? { desbloqueada: true } : { desbloqueada: false, motivo: `Completa todas las lecciones del Módulo ${num(ev.moduloId)}` };
  }
  const requeridos = ev.tipo === 'parcial' && ev.moduloIds?.length ? ev.moduloIds : curso.modulos.map((m) => m.id);
  const faltan = requeridos.filter((id) => !completo(id));
  if (!faltan.length) return { desbloqueada: true };
  return {
    desbloqueada: false,
    motivo:
      ev.tipo === 'parcial'
        ? `Completa los módulos ${requeridos.map(num).join(', ')}`
        : `Completa todos los módulos del curso (faltan: ${faltan.map(num).join(', ')})`,
  };
}

/** Mejor intento de una evaluación (o null). */
export const mejorIntento = (intentos: Intento[], evaluacionId: string): Intento | null =>
  intentos.filter((i) => i.evaluacionId === evaluacionId).reduce<Intento | null>((b, i) => (!b || i.nota > b.nota ? i : b), null);
