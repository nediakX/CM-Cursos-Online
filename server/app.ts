/**
 * API REST del LMS. Implementa los endpoints que espera src/services/api.ts
 * reutilizando la lógica de src/services/localStore.ts, con autenticación y
 * permisos por rol.
 */
import * as L from '../src/services/localStore.js';
import type { User } from '../src/types';
import { cifrarPassword, crearToken, cuentasInicialesServidor, leerToken, passwordTemporal, verificarPassword } from './auth.js';
import { conDatos, obtenerSecreto } from './db.js';
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
  secreto: string;
}

type Acceso = 'publico' | 'usuario' | 'admin';
type Manejador = (c: Ctx) => unknown;
interface Ruta {
  metodo: string;
  partes: string[];
  acceso: Acceso;
  fn: Manejador;
}

const rutas: Ruta[] = [];
const ruta = (metodo: string, patron: string, acceso: Acceso, fn: Manejador) =>
  rutas.push({ metodo, partes: patron.split('/').filter(Boolean), acceso, fn });

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

const CAMPOS_USUARIO = ['rut', 'nombres', 'apellidos', 'email', 'telefono', 'rol', 'activo', 'debeCambiarPassword', 'cursosAsignados'] as const;
const camposUsuario = (data: Record<string, unknown>, permitidos: readonly string[] = CAMPOS_USUARIO): Partial<User> =>
  Object.fromEntries(Object.entries(data).filter(([k]) => permitidos.includes(k))) as Partial<User>;
const noEsUnoMismo = (c: Ctx) => {
  if (c.params.id === c.yo().id) throw new ErrorHttp(400, 'NO_PUEDES_MODIFICAR_TU_PROPIA_CUENTA');
};
const CURSO_ID = () => L.listarCursos()[0].id;

// --- Autenticación ----------------------------------------------------------
ruta('POST', '/auth/login', 'publico', (c) => {
  const user = L.loginLocal(str(c.body.rut), str(c.body.password));
  return { token: crearToken(user.id, c.secreto), user };
});
ruta('GET', '/auth/me', 'usuario', (c) => c.yo());
ruta('POST', '/auth/cambiar-password', 'usuario', (c) => {
  if (str(c.body.nueva).length < 8) throw new ErrorHttp(400, 'PASSWORD_DEBIL');
  L.cambiarPasswordLocal(c.yo().id, str(c.body.actual), str(c.body.nueva));
});
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
ruta('GET', '/modulos/:id', 'usuario', (c) => L.getModulo(c.params.id));
ruta('PUT', '/modulos/:id', 'admin', (c) => L.editarModulo(c.params.id, c.body));
ruta('GET', '/modulos/:id/contenido', 'usuario', (c) => L.getContenido(c.params.id));
ruta('PUT', '/modulos/:id/contenido', 'admin', (c) => L.guardarContenido(c.params.id, c.body as never));
ruta('DELETE', '/modulos/:id/contenido', 'admin', (c) => L.restaurarContenido(c.params.id));

// --- Progreso ---------------------------------------------------------------
ruta('GET', '/progreso/:userId/:cursoId', 'usuario', (c) => L.getProgreso(propio(c, c.params.userId), c.params.cursoId));
ruta('PUT', '/progreso/:userId/lecciones/:leccionId', 'usuario', (c) =>
  L.marcarLeccion(propio(c, c.params.userId), c.params.leccionId, c.body.completada === true),
);

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

// ---------------------------------------------------------------------------
const ESTADOS: Record<string, number> = {
  HTTP_401: 401,
  CREDENCIALES_INVALIDAS: 401,
  HTTP_403: 403,
  USUARIO_DESACTIVADO: 403,
  HTTP_404: 404,
  EVALUACION_BLOQUEADA: 403,
  CONFLICTO_REINTENTA: 409,
};
const ERRORES_INTERNOS = new Set(['FALTA_DATABASE_URL', 'FALTA_ADMIN_PASSWORD']);

export async function atender(p: Peticion): Promise<Respuesta> {
  try {
    const encontrada = encontrar(p.method.toUpperCase(), p.path);
    if (!encontrada) return { status: 404, body: { code: 'HTTP_404' } };
    const { r, params } = encontrada;

    const secreto = await obtenerSecreto(() => randomBytes(32).toString('base64url'));
    const userId = p.token ? leerToken(p.token, secreto) : null;
    if (r.acceso !== 'publico' && !userId) return { status: 401, body: { code: 'HTTP_401' } };

    const body = (p.body && typeof p.body === 'object' ? p.body : {}) as Record<string, unknown>;
    const resultado = await conDatos(() => {
      let yo: User | undefined;
      const ctx: Ctx = {
        params,
        query: p.query,
        body,
        secreto,
        yo: () => {
          if (yo) return yo;
          if (!userId) throw new ErrorHttp(401, 'HTTP_401');
          const u = L.getUsuario(userId);
          if (!u.activo) throw new ErrorHttp(401, 'HTTP_401');
          return (yo = u);
        },
      };
      if (r.acceso !== 'publico') ctx.yo();
      if (r.acceso === 'admin' && !esAdmin(ctx.yo())) throw new ErrorHttp(403, 'HTTP_403');
      return r.fn(ctx);
    }, cuentasInicialesServidor);

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
