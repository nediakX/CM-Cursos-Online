import type { ContenidoModulo } from '../../types';
import { M1 } from './m1';
import { M2 } from './m2';
import { M3 } from './m3';
import { M4 } from './m4';
import { M5 } from './m5';
import { M6 } from './m6';
import { M7 } from './m7';
import { M8 } from './m8';
import { M9 } from './m9';
import { M10 } from './m10';

/** Contenido interactivo de los 10 módulos, indexado por moduloId. */
export const CONTENIDO_MODULOS: Record<string, ContenidoModulo> = Object.fromEntries(
  [M1, M2, M3, M4, M5, M6, M7, M8, M9, M10].map((m) => [m.moduloId, m]),
);

export const getContenidoModulo = (moduloId: string): ContenidoModulo | undefined => CONTENIDO_MODULOS[moduloId];
