/**
 * Persistencia en Postgres (Neon).
 *
 * Cada colección de datos (usuarios, intentos, certificados…) es una fila de
 * la tabla `lms_datos` con su valor en JSONB y un número de versión. Cada
 * petición carga los datos, ejecuta la lógica de negocio de
 * src/services/localStore.ts y guarda sólo las colecciones que cambiaron.
 * Si otra petición modificó la misma colección entre medio, la escritura se
 * rechaza (control optimista de versiones) y la operación se reintenta, así
 * que nunca se pierden datos por escrituras simultáneas.
 */
import { neon } from '@neondatabase/serverless';
import { configurarAlmacen, vacia, type Almacen, type CuentaLocal, type Db } from './logica.js';

export interface Conexion {
  consulta(texto: string, params?: unknown[]): Promise<Record<string, unknown>[]>;
  /** Ejecuta las sentencias en una sola transacción (todas o ninguna). */
  transaccion(sentencias: { texto: string; params: unknown[] }[]): Promise<void>;
}

let conexion: Conexion | null = null;

function conexionNeon(): Conexion {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) throw new Error('FALTA_DATABASE_URL');
  const sql = neon(url);
  return {
    consulta: (texto, params = []) => sql.query(texto, params) as Promise<Record<string, unknown>[]>,
    transaccion: async (sentencias) => {
      await sql.transaction(sentencias.map((s) => sql.query(s.texto, s.params)));
    },
  };
}

/** Permite usar otra conexión (pruebas locales con Postgres normal). */
export const usarConexion = (c: Conexion): void => {
  conexion = c;
  tablaLista = null;
};
const db = (): Conexion => (conexion ??= conexionNeon());

let tablaLista: Promise<void> | null = null;
const asegurarTabla = (): Promise<void> =>
  (tablaLista ??= db()
    .consulta(
      `CREATE TABLE IF NOT EXISTS lms_datos (
         clave text PRIMARY KEY,
         valor jsonb NOT NULL,
         version integer NOT NULL DEFAULT 1,
         actualizado timestamptz NOT NULL DEFAULT now()
       )`,
    )
    .then(() => undefined)
    .catch((e) => {
      tablaLista = null;
      throw e;
    }));

const CLAVE_SECRETO = '__secreto_tokens';

/** Secreto para firmar sesiones: AUTH_SECRET o uno aleatorio guardado en la base. */
let secreto: Promise<string> | null = null;
export const obtenerSecreto = (generar: () => string): Promise<string> => {
  if (process.env.AUTH_SECRET) return Promise.resolve(process.env.AUTH_SECRET);
  return (secreto ??= (async () => {
    await asegurarTabla();
    await db().consulta(`INSERT INTO lms_datos (clave, valor) VALUES ($1, $2::jsonb) ON CONFLICT (clave) DO NOTHING`, [
      CLAVE_SECRETO,
      JSON.stringify(generar()),
    ]);
    const [fila] = await db().consulta(`SELECT valor FROM lms_datos WHERE clave = $1`, [CLAVE_SECRETO]);
    return fila.valor as string;
  })().catch((e) => {
    secreto = null;
    throw e;
  }));
};

/**
 * Almacén en memoria sobre el estado cargado. Igual que localStorage, cada
 * `leer()` entrega una copia, pero las colecciones se copian sólo cuando se
 * usan (el contenido editado de los módulos puede pesar varios MB).
 */
function almacenSobre(estado: Db): Almacen {
  const copias = new WeakMap<object, Record<string, unknown>>();
  return {
    leer() {
      const cache: Record<string, unknown> = {};
      const vista = new Proxy(estado as unknown as Record<string, unknown>, {
        get(obj, k) {
          if (typeof k !== 'string') return Reflect.get(obj, k);
          if (!(k in cache)) cache[k] = structuredClone(obj[k]);
          return cache[k];
        },
        set(_obj, k, v) {
          cache[k as string] = v;
          return true;
        },
      });
      copias.set(vista, cache);
      return vista as unknown as Db;
    },
    guardar(datos) {
      Object.assign(estado, copias.get(datos) ?? datos);
    },
  };
}

class Conflicto extends Error {}
const esConflicto = (e: unknown): boolean =>
  e instanceof Conflicto || (typeof e === 'object' && e !== null && (e as { code?: string }).code === '22012');

/**
 * Ejecuta una operación SÍNCRONA de localStore sobre los datos de Postgres y
 * guarda lo que haya cambiado. `fn` no debe ser async: así ninguna otra
 * petición puede usar el almacén mientras corre.
 */
export async function conDatos<T>(fn: () => T, cuentasIniciales: () => CuentaLocal[]): Promise<T> {
  await asegurarTabla();
  for (let intento = 0; intento < 6; intento++) {
    const filas = await db().consulta(`SELECT clave, valor, version FROM lms_datos WHERE clave <> $1 AND clave NOT LIKE '%:%'`, [CLAVE_SECRETO]);
    const estado = vacia() as unknown as Record<string, unknown>;
    const versiones = new Map<string, number>();
    for (const f of filas) {
      estado[f.clave as string] = f.valor;
      versiones.set(f.clave as string, Number(f.version));
    }
    const originales = new Map(Object.keys(estado).map((k) => [k, JSON.stringify(estado[k])]));
    if (!estado.usuarios) estado.usuarios = cuentasIniciales();

    configurarAlmacen(almacenSobre(estado as unknown as Db));
    const resultado = fn();

    const cambios = Object.keys(estado)
      .map((k) => ({ k, json: JSON.stringify(estado[k] ?? null) }))
      .filter(({ k, json }) => json !== originales.get(k));
    if (!cambios.length) return resultado;

    // 1/0 provoca un error (y deshace la transacción) si la fila cambió desde que se leyó.
    const sentencias = cambios.map(({ k, json }) =>
      versiones.has(k)
        ? {
            texto: `WITH u AS (UPDATE lms_datos SET valor = $2::jsonb, version = version + 1, actualizado = now()
                     WHERE clave = $1 AND version = $3 RETURNING 1)
                    SELECT 1 / (SELECT count(*)::int FROM u)`,
            params: [k, json, versiones.get(k)],
          }
        : {
            texto: `WITH u AS (INSERT INTO lms_datos (clave, valor) VALUES ($1, $2::jsonb) ON CONFLICT (clave) DO NOTHING RETURNING 1)
                    SELECT 1 / (SELECT count(*)::int FROM u)`,
            params: [k, json],
          },
    );
    try {
      await db().transaccion(sentencias);
      return resultado;
    } catch (e) {
      if (!esConflicto(e)) throw e;
      await new Promise((r) => setTimeout(r, 20 + Math.random() * 80 * (intento + 1)));
    }
  }
  throw new Conflicto('CONFLICTO_REINTENTA');
}

/*
 * Datos "aparte" (fotos de los alumnos y huellas faciales): una fila por
 * usuario con clave "foto:<id>" o "rostro:<id>". No se cargan en cada
 * petición, sólo cuando se necesitan.
 */
export async function leerAparte<T>(clave: string): Promise<T | null> {
  await asegurarTabla();
  const [fila] = await db().consulta(`SELECT valor FROM lms_datos WHERE clave = $1`, [clave]);
  return fila ? (fila.valor as T) : null;
}
export async function guardarAparte(clave: string, valor: unknown): Promise<void> {
  await asegurarTabla();
  await db().consulta(
    `INSERT INTO lms_datos (clave, valor) VALUES ($1, $2::jsonb)
     ON CONFLICT (clave) DO UPDATE SET valor = EXCLUDED.valor, version = lms_datos.version + 1, actualizado = now()`,
    [clave, JSON.stringify(valor)],
  );
}
export async function borrarAparte(clave: string): Promise<void> {
  await asegurarTabla();
  await db().consulta(`DELETE FROM lms_datos WHERE clave = $1`, [clave]);
}

/** Todas las filas "aparte" con un prefijo (p. ej. "ingresos:"). */
export async function listarAparte<T>(prefijo: string): Promise<{ clave: string; valor: T }[]> {
  await asegurarTabla();
  const filas = await db().consulta(`SELECT clave, valor FROM lms_datos WHERE clave LIKE $1 ORDER BY clave`, [`${prefijo.replace(/[%_]/g, '\\$&')}%`]);
  return filas.map((f) => ({ clave: f.clave as string, valor: f.valor as T }));
}

/**
 * Agrega un elemento a una lista guardada aparte, de forma atómica (no se
 * pierden registros con peticiones simultáneas). Conserva los últimos `max`.
 */
export async function agregarAparte(clave: string, elemento: unknown, max = 2000): Promise<void> {
  await asegurarTabla();
  await db().consulta(
    `INSERT INTO lms_datos (clave, valor) VALUES ($1, jsonb_build_array($2::jsonb))
     ON CONFLICT (clave) DO UPDATE SET
       valor = (
         SELECT COALESCE(jsonb_agg(e ORDER BY n), '[]'::jsonb) FROM (
           SELECT e, n FROM jsonb_array_elements(lms_datos.valor || jsonb_build_array($2::jsonb)) WITH ORDINALITY AS t(e, n)
           ORDER BY n DESC LIMIT $3
         ) ultimos
       ),
       version = lms_datos.version + 1,
       actualizado = now()`,
    [clave, JSON.stringify(elemento), max],
  );
}
