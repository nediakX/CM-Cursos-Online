import type { Curso, Evaluacion, Intento, Progreso } from '../types';

/**
 * Reglas de desbloqueo de evaluaciones:
 *  - Evaluación de módulo: todas las lecciones del módulo completadas.
 *  - Examen parcial: lecciones de los módulos que abarca completadas.
 *  - Examen final: el curso completo (100% de lecciones).
 *  - Diagnóstica y simuladores SEC: siempre disponibles.
 */
export function estadoEvaluacion(ev: Evaluacion, curso: Curso, progreso: Progreso): { desbloqueada: boolean; motivo?: string } {
  const hechas = new Set(progreso.leccionesCompletadas);
  const completo = (moduloId: string) => {
    const m = curso.modulos.find((x) => x.id === moduloId);
    return !!m && m.lecciones.every((l) => hechas.has(l.id));
  };
  if (ev.tipo === 'modulo' && ev.moduloId) {
    const m = curso.modulos.find((x) => x.id === ev.moduloId);
    return completo(ev.moduloId) ? { desbloqueada: true } : { desbloqueada: false, motivo: `Completa las lecciones del Módulo ${m?.orden ?? ''}` };
  }
  if (ev.tipo === 'parcial' && ev.moduloIds?.length) {
    const faltan = ev.moduloIds.filter((id) => !completo(id));
    return faltan.length ? { desbloqueada: false, motivo: `Completa los módulos ${ev.moduloIds.map((id) => id.replace('mod-', '')).join(', ')}` } : { desbloqueada: true };
  }
  if (ev.tipo === 'final') {
    return progreso.porcentaje >= 100 ? { desbloqueada: true } : { desbloqueada: false, motivo: 'Completa todas las lecciones del curso' };
  }
  return { desbloqueada: true };
}

/** Mejor intento de una evaluación (o null). */
export const mejorIntento = (intentos: Intento[], evaluacionId: string): Intento | null =>
  intentos.filter((i) => i.evaluacionId === evaluacionId).reduce<Intento | null>((b, i) => (!b || i.nota > b.nota ? i : b), null);
