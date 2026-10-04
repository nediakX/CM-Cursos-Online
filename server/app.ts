/**
 * API REST del LMS. Implementa los endpoints que usa src/services/api.ts con
 * la lógica de server/logica.ts, autenticación, permisos por rol, módulos
 * habilitados por el administrador y verificación facial de los alumnos.
 */
import * as L from './logica.js';
import type { EstadoRostro, User } from '../src/types';
import {
  UMBRAL_ROSTRO,
  cifrarPassword,
  crearToken,
  cuentasInicialesServidor,
  descriptorValido,
  distancia,
  leerToken,
  passwordTemporal,
  verificarPassword,
} from './auth.js';
import { agregarAparte, borrarAparte, conDatos, guardarAparte, leerAparte, listarAparte, obtenerSecreto } from './db.js';
import { randomBytes } from 'node:crypto';

L.configurarPasswords({
  cifrar: cifrarPassword,
  verificar: verificarPassword,
  generarTemporal: passwordTemporal,
  cuentasIniciales: cuentasInicialesServidor,
});

export interface Peticion {
  method: string;
  path: string; // sin el prefijo /api, p. ej. "/usuarios/123"
  query: Record<string, string | undefined>;
  body: unknown;
  token?: string | null;
  /** IP del cliente (para el registro de ingresos). */
  ip?: string;
}
export interface Respuesta {
  status: number;
  body?: unknown;
}

class ErrorHttp extends Error {
  constructor(
    public status: number,
    code: string,
  ) {
    super(code);
  }
}

interface Ctx {
  params: Record<string, string>;
  query: Record<string, string | undefined>;
  body: Record<string, unknown>;
  /** Usuario autenticado (se valida dentro de la operación, con los datos frescos). */
  yo: () => User;
  /** El alumno verificó su rostro en esta sesión. */
  rostro: boolean;
  secreto: string;
  ip?: string;
}

/** Para rutas que además leen/escriben fotos o rostros (fuera de la carga principal). */
interface CtxAsync extends Omit<Ctx, 'yo'> {
  yo: User | null;
  /** Ejecuta lógica síncrona de logica.ts sobre los datos y guarda los cambios. */
  datos<T>(fn: () => T): Promise<T>;
}

type Acceso = 'publico' | 'usuario' | 'admin';
type Manejador = (c: Ctx) => unknown;
interface OpcionesRuta {
  /** Accesible antes de verificar el rostro (login, registro facial, etc.). */
  sinRostro?: boolean;
}
interface Ruta extends OpcionesRuta {
  metodo: string;
  partes: string[];
  acceso: Acceso;
  fn?: Manejador;
  fnAsync?: (c: CtxAsync) => Promise<unknown>;
}

const rutas: Ruta[] = [];
const ruta = (metodo: string, patron: string, acceso: Acceso, fn: Manejador, op: OpcionesRuta = {}) =>
  rutas.push({ metodo, partes: patron.split('/').filter(Boolean), acceso, fn, ...op });
const rutaAsync = (metodo: string, patron: string, acceso: Acceso, fnAsync: (c: CtxAsync) => Promise<unknown>, op: OpcionesRuta = {}) =>
  rutas.push({ metodo, partes: patron.split('/').filter(Boolean), acceso, fnAsync, ...op });

function encontrar(metodo: string, path: string): { r: Ruta; params: Record<string, string> } | null {
  const partes = path.split('/').filter(Boolean).map(decodeURIComponent);
  let metodoNoPermitido = false;
  for (const r of rutas) {
    if (r.partes.length !== partes.length) continue;
    const params: Record<string, string> = {};
    const ok = r.partes.every((p, i) => (p.startsWith(':') ? ((params[p.slice(1)] = partes[i]), true) : p === partes[i]));
    if (!ok) continue;
    if (r.metodo === metodo) return { r, params };
    metodoNoPermitido = true;
  }
  if (metodoNoPermitido) throw new ErrorHttp(405, 'METODO_NO_PERMITIDO');
  return null;
}

// --- Ayudas de permisos -----------------------------------------------------
const esAdmin = (u: User) => u.rol === 'admin';
/** El usuario sólo puede ver/modificar lo suyo; el administrador, todo. */
function propio(c: Ctx, userId: string | undefined): string {
  const yo = c.yo();
  const id = userId || yo.id;
  if (id !== yo.id && !esAdmin(yo)) throw new ErrorHttp(403, 'HTTP_403');
  return id;
}
/** Para listados filtrables: un alumno siempre ve sólo lo suyo. */
const filtroPropio = (c: Ctx): string | undefined => (esAdmin(c.yo()) ? c.query.userId : c.yo().id);
const str = (v: unknown): string => (typeof v === 'string' ? v : '');
const bool = (v: string | undefined): boolean | undefined => (v === 'true' ? true : v === 'false' ? false : undefined);

const CAMPOS_USUARIO = [
  'rut', 'nombres', 'apellidos', 'email', 'telefono', 'rol', 'activo', 'debeCambiarPassword', 'cursosAsignados', 'modulosHabilitados', 'requiereRostro',
] as const;
const camposUsuario = (data: Record<string, unknown>, permitidos: readonly string[] = CAMPOS_USUARIO): Partial<User> => {
  const d = Object.fromEntries(Object.entries(data).filter(([k]) => permitidos.includes(k))) as Partial<User>;
  if (d.modulosHabilitados !== undefined && !(Array.isArray(d.modulosHabilitados) && d.modulosHabilitados.every((x) => typeof x === 'string'))) {
    throw new ErrorHttp(400, 'DATOS_INVALIDOS');
  }
  if (d.requiereRostro !== undefined && typeof d.requiereRostro !== 'boolean') throw new ErrorHttp(400, 'DATOS_INVALIDOS');
  return d;
};

/** Qué le falta al usuario respecto de la verificación facial en esta sesión. */
function estadoRostro(u: User, verificado: boolean): EstadoRostro {
  if (u.rol !== 'alumno' || u.requiereRostro === false) return 'no_requerido';
  if (!u.rostroRegistrado) return 'registrar';
  return verificado ? 'verificado' : 'verificar';
}
const conEstado = (u: User, verificado: boolean): User => ({ ...u, estadoRostro: estadoRostro(u, verificado) });

const exigirModulo = (c: Ctx, moduloId: string) => {
  const yo = c.yo();
  if (!esAdmin(yo) && !L.puedeVerModulo(yo.id, moduloId)) throw new ErrorHttp(403, 'MODULO_NO_HABILITADO');
};
const noEsUnoMismo = (c: Ctx) => {
  if (c.params.id === c.yo().id) throw new ErrorHttp(400, 'NO_PUEDES_MODIFICAR_TU_PROPIA_CUENTA');
};
const CURSO_ID = () => L.listarCursos()[0].id;

// --- Autenticación ----------------------------------------------------------
// --- Límite de intentos de contraseña ---------------------------------------
// Por RUT: tras 5 contraseñas incorrectas seguidas, bloquea 15 minutos.
interface IntentosLogin {
  fallos: number;
  bloqueadoHasta?: number;
}
const MAX_FALLOS_LOGIN = 5;
const BLOQUEO_LOGIN_MS = 15 * 60 * 1000;

rutaAsync('POST', '/auth/login', 'publico', async (c) => {
  const rut = L.normalizarRut(str(c.body.rut));
  if (!rut) throw new ErrorHttp(401, 'CREDENCIALES_INVALIDAS');
  const clave = `login:${rut}`;
  const previo = await leerAparte<IntentosLogin>(clave);
  if (previo?.bloqueadoHasta && previo.bloqueadoHasta > Date.now()) {
    throw new ErrorHttp(429, 'DEMASIADOS_INTENTOS');
  }
  let user: User;
  try {
    user = await c.datos(() => L.loginLocal(rut, str(c.body.password)));
  } catch (e) {
    if (e instanceof Error && e.message === 'CREDENCIALES_INVALIDAS') {
      const fallos = (previo?.bloqueadoHasta ? 0 : (previo?.fallos ?? 0)) + 1;
      await guardarAparte(clave, fallos >= MAX_FALLOS_LOGIN ? { fallos: 0, bloqueadoHasta: Date.now() + BLOQUEO_LOGIN_MS } : { fallos });
      if (fallos >= MAX_FALLOS_LOGIN) throw new ErrorHttp(429, 'DEMASIADOS_INTENTOS');
    }
    throw e;
  }
  if (previo) await borrarAparte(clave);
  const estado = estadoRostro(user, false);
  // Alumnos sin verificación facial: el ingreso cuenta como asistencia.
  if (user.rol === 'alumno' && estado === 'no_requerido') await registrarIngreso(user.id, 'contrasena', c.ip);
  return { token: crearToken(user.id, c.secreto), user: conEstado(user, false) };
});
ruta('GET', '/auth/me', 'usuario', (c) => conEstado(c.yo(), c.rostro), { sinRostro: true });
ruta(
  'POST',
  '/auth/cambiar-password',
  'usuario',
  (c) => {
    if (str(c.body.nueva).length < 8) throw new ErrorHttp(400, 'PASSWORD_DEBIL');
    L.cambiarPasswordLocal(c.yo().id, str(c.body.actual), str(c.body.nueva));
  },
  { sinRostro: true },
);
// Sin servicio de correo: el administrador restablece la contraseña desde el panel.
ruta('POST', '/auth/recuperar-password', 'publico', () => undefined);

// --- Usuarios ---------------------------------------------------------------
ruta('GET', '/usuarios', 'admin', (c) =>
  L.listarUsuarios({ busqueda: c.query.busqueda, activo: bool(c.query.activo), rol: c.query.rol as User['rol'] | undefined }),
);
ruta('POST', '/usuarios', 'admin', (c) => L.crearUsuario({ ...camposUsuario(c.body), password: str(c.body.password) }));
ruta('POST', '/usuarios/masivo', 'admin', (c) => {
  const filas = Array.isArray(c.body) ? (c.body as Record<string, unknown>[]) : [];
  return L.crearUsuariosMasivo(filas.map((f) => ({ ...camposUsuario(f), password: str(f.password) })));
});
ruta('PATCH', '/usuarios/:id', 'usuario', (c) => {
  const yo = c.yo();
  if (esAdmin(yo)) {
    const datos = camposUsuario(c.body);
    if (c.params.id === yo.id) {
      delete datos.rol; // evita quedarse sin administradores por error
      delete datos.activo;
    }
    return L.editarUsuario(c.params.id, datos);
  }
  if (c.params.id !== yo.id) throw new ErrorHttp(403, 'HTTP_403');
  return L.editarUsuario(yo.id, camposUsuario(c.body, ['email', 'telefono']));
});
ruta('POST', '/usuarios/:id/desactivar', 'admin', (c) => {
  noEsUnoMismo(c);
  L.editarUsuario(c.params.id, { activo: false });
});
ruta('POST', '/usuarios/:id/reactivar', 'admin', (c) => void L.editarUsuario(c.params.id, { activo: true }));
ruta('DELETE', '/usuarios/:id', 'admin', (c) => {
  noEsUnoMismo(c);
  L.eliminarUsuario(c.params.id);
});
ruta('POST', '/usuarios/:id/resetear-password', 'admin', (c) => ({ password: L.resetearPassword(c.params.id) }));
ruta('GET', '/usuarios/:id/ficha', 'admin', (c) => L.getFichaAlumno(c.params.id));

// --- Cursos y módulos -------------------------------------------------------
ruta('GET', '/cursos', 'usuario', () => L.listarCursos());
ruta('POST', '/cursos', 'admin', () => {
  throw new ErrorHttp(400, 'NO_DISPONIBLE');
});
ruta('GET', '/cursos/:id', 'usuario', (c) => L.getCurso(c.params.id));
ruta('PUT', '/cursos/:id', 'admin', (c) => L.editarCurso(c.params.id, c.body));
ruta('POST', '/cursos/:id/modulos', 'admin', (c) => L.crearModulo(c.params.id, c.body));
ruta('GET', '/cursos/:id/evaluaciones', 'usuario', () => L.listarEvaluaciones());
ruta('GET', '/modulos/:id', 'usuario', (c) => {
  exigirModulo(c, c.params.id);
  return L.getModulo(c.params.id);
});
ruta('PUT', '/modulos/:id', 'admin', (c) => L.editarModulo(c.params.id, c.body));
ruta('GET', '/modulos/:id/contenido', 'usuario', (c) => {
  exigirModulo(c, c.params.id);
  return L.getContenido(c.params.id);
});
ruta('PUT', '/modulos/:id/contenido', 'admin', (c) => L.guardarContenido(c.params.id, c.body as never));
ruta('DELETE', '/modulos/:id/contenido', 'admin', (c) => L.restaurarContenido(c.params.id));

// --- Progreso ---------------------------------------------------------------
ruta('GET', '/progreso/:userId/:cursoId', 'usuario', (c) => L.getProgreso(propio(c, c.params.userId), c.params.cursoId));
ruta('PUT', '/progreso/:userId/lecciones/:leccionId', 'usuario', (c) => {
  const userId = propio(c, c.params.userId);
  const moduloId = L.moduloDeLeccion(c.params.leccionId);
  if (!moduloId) throw new ErrorHttp(404, 'HTTP_404');
  exigirModulo(c, moduloId);
  return L.marcarLeccion(userId, c.params.leccionId, c.body.completada === true);
});

// --- Banco de preguntas (contiene las respuestas: sólo administrador) -------
ruta('GET', '/preguntas', 'admin', (c) =>
  L.listarPreguntas({ moduloId: c.query.moduloId, dificultad: c.query.dificultad as never, busqueda: c.query.busqueda }),
);
ruta('POST', '/preguntas', 'admin', (c) => L.crearPregunta(c.body as never));
ruta('PUT', '/preguntas/:id', 'admin', (c) => L.editarPregunta(c.params.id, c.body));
ruta('DELETE', '/preguntas/:id', 'admin', (c) => L.eliminarPregunta(c.params.id));

// --- Evaluaciones e intentos ------------------------------------------------
ruta('PUT', '/evaluaciones/:id', 'admin', (c) => L.editarEvaluacion(c.params.id, c.body));
ruta('POST', '/evaluaciones/:id/intentos', 'usuario', (c) => L.iniciarIntento(c.yo().id, c.params.id));
ruta('GET', '/intentos', 'usuario', (c) => L.listarIntentos(propio(c, c.query.userId)));
ruta('POST', '/intentos/:id/enviar', 'usuario', (c) => {
  const dueno = L.duenoIntento(c.params.id);
  if (!dueno) throw new ErrorHttp(404, 'HTTP_404');
  if (dueno !== c.yo().id) throw new ErrorHttp(403, 'HTTP_403');
  const tiempo = typeof c.body.tiempoUsado === 'number' ? c.body.tiempoUsado : undefined;
  return L.enviarIntento(c.params.id, (c.body.respuestas ?? {}) as Record<string, 'a' | 'b' | 'c' | 'd'>, tiempo);
});
ruta('GET', '/intentos/:id/resultado', 'usuario', (c) => {
  const dueno = L.duenoIntento(c.params.id);
  if (!dueno) throw new ErrorHttp(404, 'HTTP_404');
  propio(c, dueno);
  return L.getResultado(c.params.id);
});

// --- Asistencia -------------------------------------------------------------
ruta('GET', '/asistencia', 'usuario', (c) => L.getAsistencia({ userId: filtroPropio(c), moduloId: c.query.moduloId }));
ruta('PUT', '/asistencia', 'admin', (c) => L.guardarAsistencia(Array.isArray(c.body) ? (c.body as never) : []));

// --- Consultas --------------------------------------------------------------
ruta('GET', '/consultas', 'usuario', (c) =>
  L.listarConsultas({ userId: filtroPropio(c), moduloId: c.query.moduloId, estado: c.query.estado as never }),
);
ruta('POST', '/consultas', 'usuario', (c) =>
  L.crearConsulta({ userId: propio(c, str(c.body.userId)), moduloId: str(c.body.moduloId), pregunta: str(c.body.pregunta) }),
);
ruta('POST', '/consultas/:id/responder', 'admin', (c) => L.responderConsulta(c.params.id, str(c.body.respuesta)));

// --- Proyecto final ---------------------------------------------------------
ruta('GET', '/entregas', 'usuario', (c) => L.listarEntregas(esAdmin(c.yo()) ? undefined : c.yo().id));
ruta('POST', '/entregas', 'usuario', (c) =>
  L.entregarProyecto(propio(c, str(c.body.userId)), Array.isArray(c.body.archivos) ? (c.body.archivos as never) : []),
);
ruta('POST', '/entregas/:id/calificar', 'admin', (c) => L.calificarEntrega(c.params.id, Number(c.body.nota), str(c.body.comentario)));

// --- Certificados -----------------------------------------------------------
ruta('GET', '/certificados', 'usuario', (c) => L.listarCertificados(propio(c, c.query.userId)));
ruta('GET', '/certificados/todos', 'admin', () => L.listarTodosCertificados());
ruta('GET', '/certificados/elegibilidad', 'usuario', (c) => L.elegibilidad(propio(c, c.query.userId), c.query.cursoId || CURSO_ID()));
ruta('POST', '/certificados', 'usuario', (c) => L.emitirCertificado(propio(c, str(c.body.userId)), str(c.body.cursoId) || CURSO_ID()));
ruta('POST', '/certificados/:id/anular', 'admin', (c) => L.anularCertificado(c.params.id));
ruta('GET', '/certificados/verificar/:codigo', 'publico', (c) => {
  const cert = L.verificarCertificado(c.params.codigo);
  if (!cert) throw new ErrorHttp(404, 'HTTP_404');
  // Página pública: no exponer correo ni teléfono.
  const { id, nombres, apellidos, rut } = cert.usuario;
  return { ...cert, usuario: { id, nombres, apellidos, rut } };
});

// --- Administración ---------------------------------------------------------
ruta('GET', '/admin/metricas', 'admin', () => L.getMetricas());
ruta('GET', '/admin/habilitacion', 'admin', () => L.getHabilitacion());
ruta('GET', '/admin/reportes/:tipo', 'admin', (c) => {
  const tipo = c.params.tipo;
  if (tipo !== 'notas' && tipo !== 'avance' && tipo !== 'asistencia') throw new ErrorHttp(404, 'HTTP_404');
  return L.exportarReporte(tipo);
});

// --- Sitio público y solicitudes --------------------------------------------
ruta('GET', '/sitio', 'publico', () => L.getSitio());
ruta('PUT', '/sitio', 'admin', (c) => L.guardarSitio(c.body as never));
ruta('DELETE', '/sitio', 'admin', () => L.restaurarSitio());
ruta('GET', '/publico/curso', 'publico', () => L.getCurso(CURSO_ID()));
ruta('POST', '/solicitudes', 'publico', (c) => {
  const { id: _id, fecha: _f, estado: _e, ...datos } = c.body;
  return L.crearSolicitud(datos as never);
});
ruta('GET', '/solicitudes', 'admin', () => L.listarSolicitudes());
ruta('PATCH', '/solicitudes/:id', 'admin', (c) => L.editarSolicitud(c.params.id, c.body));
ruta('DELETE', '/solicitudes/:id', 'admin', (c) => L.eliminarSolicitud(c.params.id));

// --- Registro de ingresos (asistencia) ----------------------------------------
export interface Ingreso {
  fecha: string;
  /** rostro: verificado con la cámara · contrasena: alumno sin verificación facial. */
  metodo: 'rostro' | 'contrasena';
  ip?: string;
}
const registrarIngreso = (userId: string, metodo: Ingreso['metodo'], ip?: string) =>
  agregarAparte(`ingresos:${userId}`, { fecha: new Date().toISOString(), metodo, ...(ip ? { ip } : {}) } satisfies Ingreso);

rutaAsync('GET', '/ingresos', 'usuario', async (c) => {
  const yo = c.yo!;
  if (!esAdmin(yo)) return (await leerAparte<Ingreso[]>(`ingresos:${yo.id}`)) ?? [];
  if (c.query.userId) return (await leerAparte<Ingreso[]>(`ingresos:${c.query.userId}`)) ?? [];
  const filas = await listarAparte<Ingreso[]>('ingresos:');
  return filas.map((f) => ({ userId: f.clave.slice('ingresos:'.length), ingresos: f.valor }));
});

// --- Archivos (Vercel Blob) ---------------------------------------------------
// El navegador sube el archivo directo a Vercel Blob (sin el límite de 4,5 MB
// de las funciones); aquí sólo se autoriza la subida y se fijan las reglas.
const REGLAS_ARCHIVO = {
  entrega: {
    tipos: [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/zip',
      'application/x-zip-compressed',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/msword',
      'application/vnd.ms-excel',
      'application/acad',
      'image/vnd.dwg',
      'application/dxf',
      'image/vnd.dxf',
      'application/octet-stream',
    ],
    maxMB: 50,
  },
  imagen: { tipos: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'], maxMB: 8 },
} as const;

ruta('GET', '/archivos/estado', 'usuario', () => ({ configurado: !!process.env.BLOB_READ_WRITE_TOKEN }));
rutaAsync('POST', '/archivos/subir', 'usuario', async (c) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new ErrorHttp(503, 'ARCHIVOS_NO_CONFIGURADOS');
  if (c.body.type !== 'blob.generate-client-token') throw new ErrorHttp(400, 'DATOS_INVALIDOS');
  const yo = c.yo!;
  const { handleUpload } = await import('@vercel/blob/client');
  return handleUpload({
    body: c.body as never,
    request: undefined as never, // sólo se usa para avisos de fin de subida, que no ocupamos
    onBeforeGenerateToken: async (pathname) => {
      const tipo = pathname.startsWith(`entregas/${yo.id}/`) ? 'entrega' : pathname.startsWith('imagenes/') && esAdmin(yo) ? 'imagen' : null;
      if (!tipo) throw new ErrorHttp(403, 'HTTP_403');
      const r = REGLAS_ARCHIVO[tipo];
      return { allowedContentTypes: [...r.tipos], maximumSizeInBytes: r.maxMB * 1024 * 1024, addRandomSuffix: true };
    },
  });
});

// --- Fotografías -------------------------------------------------------------
const FOTO_MAX = 400_000; // caracteres del data URL (≈ 300 KB)
const fotoValida = (f: unknown): f is string => typeof f === 'string' && /^data:image\/(jpeg|png|webp);base64,/.test(f) && f.length <= FOTO_MAX;
function propioAsync(c: CtxAsync, userId: string): void {
  if (!c.yo || (c.yo.id !== userId && !esAdmin(c.yo))) throw new ErrorHttp(403, 'HTTP_403');
}

rutaAsync('GET', '/fotos/:userId', 'usuario', async (c) => {
  propioAsync(c, c.params.userId);
  return { foto: await leerAparte<string>(`foto:${c.params.userId}`) };
}, { sinRostro: true });
rutaAsync('PUT', '/fotos/:userId', 'usuario', async (c) => {
  propioAsync(c, c.params.userId);
  if (!fotoValida(c.body.foto)) throw new ErrorHttp(400, 'FOTO_INVALIDA');
  await guardarAparte(`foto:${c.params.userId}`, c.body.foto);
  return c.datos(() => L.editarUsuario(c.params.userId, { tieneFoto: true }));
});
rutaAsync('DELETE', '/fotos/:userId', 'admin', async (c) => {
  await borrarAparte(`foto:${c.params.userId}`);
  return c.datos(() => L.editarUsuario(c.params.userId, { tieneFoto: false }));
});

// --- Verificación facial ------------------------------------------------------
// El navegador calcula el descriptor facial (face-api.js) y el servidor lo
// compara con el registrado. Las huellas nunca se devuelven al navegador.
interface RostroGuardado {
  descriptor: number[];
  registrado: string;
  fallos?: number;
  bloqueadoHasta?: number;
}
const MAX_FALLOS = 5;
const BLOQUEO_MS = 10 * 60 * 1000;

async function registrarRostro(c: CtxAsync, userId: string): Promise<User> {
  if (!descriptorValido(c.body.descriptor)) throw new ErrorHttp(400, 'ROSTRO_INVALIDO');
  const guardado: RostroGuardado = { descriptor: c.body.descriptor, registrado: new Date().toISOString() };
  await guardarAparte(`rostro:${userId}`, guardado);
  const conFoto = fotoValida(c.body.foto);
  if (conFoto) await guardarAparte(`foto:${userId}`, c.body.foto);
  return c.datos(() => L.editarUsuario(userId, conFoto ? { rostroRegistrado: true, tieneFoto: true } : { rostroRegistrado: true }));
}

/** El alumno registra su rostro por primera vez (después sólo puede verificarlo). */
rutaAsync('POST', '/rostro/registro', 'usuario', async (c) => {
  const yo = c.yo!;
  if (yo.rostroRegistrado) throw new ErrorHttp(409, 'ROSTRO_YA_REGISTRADO');
  const user = await registrarRostro(c, yo.id);
  await registrarIngreso(yo.id, 'rostro', c.ip);
  return { token: crearToken(yo.id, c.secreto, true), user: conEstado(user, true) };
}, { sinRostro: true });

rutaAsync('POST', '/rostro/verificar', 'usuario', async (c) => {
  const yo = c.yo!;
  if (!descriptorValido(c.body.descriptor)) throw new ErrorHttp(400, 'ROSTRO_INVALIDO');
  const guardado = await leerAparte<RostroGuardado>(`rostro:${yo.id}`);
  if (!guardado) throw new ErrorHttp(409, 'ROSTRO_NO_REGISTRADO');
  if (guardado.bloqueadoHasta && guardado.bloqueadoHasta > Date.now()) throw new ErrorHttp(429, 'ROSTRO_BLOQUEADO');
  if (distancia(c.body.descriptor, guardado.descriptor) > UMBRAL_ROSTRO) {
    const fallos = (guardado.fallos ?? 0) + 1;
    await guardarAparte(`rostro:${yo.id}`, {
      ...guardado,
      fallos: fallos >= MAX_FALLOS ? 0 : fallos,
      bloqueadoHasta: fallos >= MAX_FALLOS ? Date.now() + BLOQUEO_MS : undefined,
    });
    throw new ErrorHttp(401, fallos >= MAX_FALLOS ? 'ROSTRO_BLOQUEADO' : 'ROSTRO_NO_COINCIDE');
  }
  if (guardado.fallos || guardado.bloqueadoHasta) await guardarAparte(`rostro:${yo.id}`, { descriptor: guardado.descriptor, registrado: guardado.registrado });
  await registrarIngreso(yo.id, 'rostro', c.ip);
  return { token: crearToken(yo.id, c.secreto, true), user: conEstado(yo, true) };
}, { sinRostro: true });

/** El administrador registra el rostro de un alumno a partir de una foto. */
rutaAsync('POST', '/rostro/:userId', 'admin', async (c) => registrarRostro(c, c.params.userId));
/** El administrador borra el rostro registrado: el alumno lo vuelve a registrar al entrar. */
rutaAsync('DELETE', '/rostro/:userId', 'admin', async (c) => {
  await borrarAparte(`rostro:${c.params.userId}`);
  return c.datos(() => L.editarUsuario(c.params.userId, { rostroRegistrado: false }));
});

// ---------------------------------------------------------------------------
const ESTADOS: Record<string, number> = {
  HTTP_401: 401,
  CREDENCIALES_INVALIDAS: 401,
  HTTP_403: 403,
  USUARIO_DESACTIVADO: 403,
  HTTP_404: 404,
  EVALUACION_BLOQUEADA: 403,
  MODULO_NO_HABILITADO: 403,
  DEMASIADOS_INTENTOS: 429,
  CONFLICTO_REINTENTA: 409,
};
const ERRORES_INTERNOS = new Set(['FALTA_DATABASE_URL', 'FALTA_ADMIN_PASSWORD']);

export async function atender(p: Peticion): Promise<Respuesta> {
  try {
    const encontrada = encontrar(p.method.toUpperCase(), p.path);
    if (!encontrada) return { status: 404, body: { code: 'HTTP_404' } };
    const { r, params } = encontrada;

    const secreto = await obtenerSecreto(() => randomBytes(32).toString('base64url'));
    const sesion = p.token ? leerToken(p.token, secreto) : null;
    if (r.acceso !== 'publico' && !sesion) return { status: 401, body: { code: 'HTTP_401' } };

    const body = (p.body && typeof p.body === 'object' ? p.body : {}) as Record<string, unknown>;
    const rostro = sesion?.rostro ?? false;
    /** Valida al usuario con los datos frescos: activo, rol y verificación facial. */
    const validar = (): User | null => {
      if (r.acceso === 'publico') return sesion ? (L.todosLosUsuarios().find((u) => u.id === sesion.userId) ?? null) : null;
      const u = L.getUsuario(sesion!.userId);
      if (!u.activo) throw new ErrorHttp(401, 'HTTP_401');
      if (r.acceso === 'admin' && !esAdmin(u)) throw new ErrorHttp(403, 'HTTP_403');
      if (!r.sinRostro && estadoRostro(u, rostro) !== 'no_requerido' && estadoRostro(u, rostro) !== 'verificado') {
        throw new ErrorHttp(403, 'VERIFICACION_FACIAL_REQUERIDA');
      }
      return u;
    };

    let resultado: unknown;
    if (r.fnAsync) {
      const yo = await conDatos(validar, cuentasInicialesServidor);
      resultado = await r.fnAsync({
        params,
        query: p.query,
        body,
        secreto,
        rostro,
        ip: p.ip,
        yo,
        datos: (fn) => conDatos(fn, cuentasInicialesServidor),
      });
    } else {
      resultado = await conDatos(() => {
        let yo: User | null | undefined;
        const ctx: Ctx = {
          params,
          query: p.query,
          body,
          secreto,
          rostro,
          yo: () => {
            if (yo === undefined) yo = validar();
            if (!yo) throw new ErrorHttp(401, 'HTTP_401');
            return yo;
          },
        };
        if (r.acceso !== 'publico') ctx.yo();
        return r.fn!(ctx);
      }, cuentasInicialesServidor);
    }

    return resultado === undefined ? { status: 204 } : { status: 200, body: resultado };
  } catch (e) {
    if (e instanceof ErrorHttp) return { status: e.status, body: { code: e.message } };
    if (e instanceof Error && !ERRORES_INTERNOS.has(e.message) && e.constructor === Error && e.message) {
      return { status: ESTADOS[e.message] ?? 400, body: { code: e.message } };
    }
    console.error('[api] error', e);
    const code = e instanceof Error && ERRORES_INTERNOS.has(e.message) ? e.message : 'ERROR_INTERNO';
    return { status: 500, body: { code } };
  }
}
