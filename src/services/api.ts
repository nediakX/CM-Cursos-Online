/**
 * Cliente HTTP del LMS. Todas las operaciones van al backend (api/ + server/)
 * y los datos se guardan en la base de datos Postgres.
 *
 * Por defecto usa `/api` del mismo dominio. Para apuntar a otro servidor,
 * define VITE_API_URL (p. ej. VITE_API_URL=https://otro-dominio/api).
 *
 * Los errores de negocio llegan como JSON `{ "code": "RUT_DUPLICADO" }` y se
 * lanzan como `Error(code)`, porque las páginas comparan `err.message` con
 * 'CREDENCIALES_INVALIDAS', 'USUARIO_DESACTIVADO', 'RUT_DUPLICADO', etc.
 */
import type {
  User,
  Curso,
  Modulo,
  Pregunta,
  PreguntaSinRespuesta,
  Evaluacion,
  Intento,
  ResultadoIntento,
  Progreso,
  Asistencia,
  Consulta,
  EntregaProyecto,
  Certificado,
  FichaAlumno,
  MetricasAdmin,
  Dificultad,
  UserRole,
  ContenidoModulo,
  SiteConfig,
  Solicitud,
} from '../types';
import { completarSitio } from '../data/sitio';

// ---------------------------------------------------------------------------
// Núcleo HTTP
// ---------------------------------------------------------------------------
export const BASE_URL: string = import.meta.env.VITE_API_URL ?? '/api';
const TOKEN_KEY = 'lms_token';

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string | null): void => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

type Query = Record<string, string | number | boolean | undefined | null>;

function toQuery(params?: Query): string {
  if (!params) return '';
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  opts: { body?: unknown; query?: Query } = {},
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE_URL}${path}${toQuery(opts.query)}`, {
    method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    let code = `HTTP_${res.status}`;
    try {
      const data = await res.json();
      code = data?.code ?? data?.message ?? code;
    } catch {
      /* respuesta sin JSON */
    }
    throw new Error(code);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const get = <T>(path: string, query?: Query) => request<T>('GET', path, { query });
const post = <T>(path: string, body?: unknown) => request<T>('POST', path, { body });
const put = <T>(path: string, body?: unknown) => request<T>('PUT', path, { body });
const patch = <T>(path: string, body?: unknown) => request<T>('PATCH', path, { body });
const del = <T>(path: string) => request<T>('DELETE', path);



// ---------------------------------------------------------------------------
// Autenticación
// ---------------------------------------------------------------------------
export async function login(rut: string, password: string): Promise<User> {
  const { token, user } = await post<{ token: string; user: User }>('/auth/login', { rut, password });
  setToken(token);
  return user;
}

export async function logout(): Promise<void> {
  setToken(null);
}

export const getSesion = (): Promise<User> => (get<User>('/auth/me'));

export const cambiarPassword = (actual: string, nueva: string): Promise<void> =>
  post<void>('/auth/cambiar-password', { actual, nueva });

export const recuperarPassword = (rut: string): Promise<void> =>
  post<void>('/auth/recuperar-password', { rut });

// ---------------------------------------------------------------------------
// Usuarios
// ---------------------------------------------------------------------------
export type NuevoUsuario = Omit<User, 'id' | 'creadoEn'> & { password: string };

export const listarUsuarios = (filtros: { busqueda?: string; activo?: boolean; rol?: UserRole } = {}): Promise<User[]> =>
  get<User[]>('/usuarios', filtros);

export const crearUsuario = (data: Partial<NuevoUsuario> & { password: string }): Promise<User> =>
  post<User>('/usuarios', data);

export const crearUsuariosMasivo = (
  data: (Partial<NuevoUsuario> & { password: string })[],
): Promise<{ exitosos: User[]; errores: { rut: string; motivo: string }[] }> =>
  post('/usuarios/masivo', data);

export const editarUsuario = (id: string, data: Partial<User>): Promise<User> =>
  patch<User>(`/usuarios/${id}`, data);

export const desactivarUsuario = (id: string): Promise<void> =>
  post<void>(`/usuarios/${id}/desactivar`);
export const reactivarUsuario = (id: string): Promise<void> =>
  post<void>(`/usuarios/${id}/reactivar`);
export const eliminarUsuario = (id: string): Promise<void> => (del<void>(`/usuarios/${id}`));

/** Devuelve la contraseña temporal generada. */
export const resetearPassword = async (id: string): Promise<string> => {
  const { password } = await post<{ password: string }>(`/usuarios/${id}/resetear-password`);
  return password;
};

export const getFichaAlumno = (id: string): Promise<FichaAlumno> =>
  get<FichaAlumno>(`/usuarios/${id}/ficha`);

// ---------------------------------------------------------------------------
// Cursos y módulos
// ---------------------------------------------------------------------------
export const listarCursos = (): Promise<Curso[]> => (get<Curso[]>('/cursos'));
export const getCurso = (id: string): Promise<Curso> => (get<Curso>(`/cursos/${id}`));
export const crearCurso = (data: Partial<Curso>): Promise<Curso> =>
  post<Curso>('/cursos', data);
export const editarCurso = (id: string, data: Partial<Curso>): Promise<Curso> =>
  put<Curso>(`/cursos/${id}`, data);

export const getModulo = (id: string): Promise<Modulo> => (get<Modulo>(`/modulos/${id}`));
export const crearModulo = (cursoId: string, data: Partial<Modulo>): Promise<Modulo> =>
  post<Modulo>(`/cursos/${cursoId}/modulos`, data);
export const editarModulo = (id: string, data: Partial<Modulo>): Promise<Modulo> =>
  put<Modulo>(`/modulos/${id}`, data);

// ---------------------------------------------------------------------------
// Progreso
// ---------------------------------------------------------------------------
export const getProgreso = (userId: string, cursoId: string): Promise<Progreso> =>
  get<Progreso>(`/progreso/${userId}/${cursoId}`);

export const marcarLeccion = (userId: string, leccionId: string, completada: boolean): Promise<Progreso> =>
  put<Progreso>(`/progreso/${userId}/lecciones/${leccionId}`, { completada });

// ---------------------------------------------------------------------------
// Banco de preguntas
// ---------------------------------------------------------------------------
export const listarPreguntas = (filtros: { moduloId?: string; dificultad?: Dificultad; busqueda?: string } = {}): Promise<Pregunta[]> =>
  get<Pregunta[]>('/preguntas', filtros);

export const crearPregunta = (data: Omit<Pregunta, 'id'>): Promise<Pregunta> =>
  post<Pregunta>('/preguntas', data);
export const editarPregunta = (id: string, data: Partial<Pregunta>): Promise<Pregunta> =>
  put<Pregunta>(`/preguntas/${id}`, data);
export const eliminarPregunta = (id: string): Promise<void> => (del<void>(`/preguntas/${id}`));

// ---------------------------------------------------------------------------
// Evaluaciones e intentos
// ---------------------------------------------------------------------------
export const listarEvaluaciones = (cursoId: string): Promise<Evaluacion[]> =>
  get<Evaluacion[]>(`/cursos/${cursoId}/evaluaciones`);

export const editarEvaluacion = (id: string, data: Partial<Evaluacion>): Promise<Evaluacion> =>
  put<Evaluacion>(`/evaluaciones/${id}`, data);

export const listarIntentos = (userId: string): Promise<Intento[]> =>
  get<Intento[]>('/intentos', { userId });

export const iniciarIntento = (evaluacionId: string): Promise<{ intentoId: string; preguntas: PreguntaSinRespuesta[] }> =>
  post(`/evaluaciones/${evaluacionId}/intentos`);

export const enviarIntento = (intentoId: string, respuestas: Record<string, 'a' | 'b' | 'c' | 'd'>, tiempoUsado?: number): Promise<Intento> =>
  post<Intento>(`/intentos/${intentoId}/enviar`, { respuestas, tiempoUsado });

export const getResultado = (intentoId: string): Promise<ResultadoIntento> =>
  get<ResultadoIntento>(`/intentos/${intentoId}/resultado`);

// ---------------------------------------------------------------------------
// Asistencia
// ---------------------------------------------------------------------------
export const getAsistencia = (filtros: { userId?: string; moduloId?: string } = {}): Promise<Asistencia[]> =>
  get<Asistencia[]>('/asistencia', filtros);

export const guardarAsistencia = (registros: Asistencia[]): Promise<void> =>
  put<void>('/asistencia', registros);

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------
export const listarConsultas = (filtros: { userId?: string; moduloId?: string; estado?: Consulta['estado'] } = {}): Promise<Consulta[]> =>
  get<Consulta[]>('/consultas', filtros);

export const crearConsulta = (data: { userId: string; moduloId: string; pregunta: string }): Promise<Consulta> =>
  post<Consulta>('/consultas', data);

export const responderConsulta = (id: string, respuesta: string): Promise<Consulta> =>
  post<Consulta>(`/consultas/${id}/responder`, { respuesta });

// ---------------------------------------------------------------------------
// Proyecto final
// ---------------------------------------------------------------------------
/** Devuelve todas las entregas (admin) o las del usuario autenticado, según el backend. */
export const listarEntregas = (): Promise<EntregaProyecto[]> => get<EntregaProyecto[]>('/entregas');

export const entregarProyecto = (userId: string, archivos: { nombre: string; url: string }[]): Promise<EntregaProyecto> =>
  post<EntregaProyecto>('/entregas', { userId, archivos });

export const calificarEntrega = (id: string, nota: number, comentario: string): Promise<EntregaProyecto> =>
  post<EntregaProyecto>(`/entregas/${id}/calificar`, { nota, comentario });

// ---------------------------------------------------------------------------
// Certificados
// ---------------------------------------------------------------------------
export const listarCertificados = (userId: string): Promise<Certificado[]> =>
  get<Certificado[]>('/certificados', { userId });

export const listarTodosCertificados = (): Promise<(Certificado & { usuario: User })[]> =>
  get('/certificados/todos');

export const puedeEmitirCertificado = (
  userId: string,
  cursoId: string,
): Promise<{ puede: boolean; razon?: string; asistenciaPromedio: number; notaFinal: number }> =>
  get(`/certificados/elegibilidad`, { userId, cursoId });

export const emitirCertificado = (userId: string, cursoId: string): Promise<Certificado> =>
  post<Certificado>('/certificados', { userId, cursoId });

export const anularCertificado = (id: string): Promise<void> => (post<void>(`/certificados/${id}/anular`));

/** Endpoint público. Devuelve null si el código no existe (404). */
export async function verificarCertificado(codigo: string): Promise<(Certificado & { usuario: User; curso: Curso }) | null> {
  try {
    return await get(`/certificados/verificar/${encodeURIComponent(codigo)}`);
  } catch (e) {
    if (e instanceof Error && e.message === 'HTTP_404') return null;
    throw e;
  }
}

// ---------------------------------------------------------------------------
// Métricas y reportes
// ---------------------------------------------------------------------------
export const getMetricas = (): Promise<MetricasAdmin> =>
  get<MetricasAdmin>('/admin/metricas');

export const exportarReporte = (tipo: 'notas' | 'avance' | 'asistencia'): Promise<Record<string, unknown>[]> =>
  get<Record<string, unknown>[]>(`/admin/reportes/${tipo}`);

// ---------------------------------------------------------------------------
// Contenido de lecciones (editor del administrador)
//   GET  /modulos/:id/contenido      → ContenidoModulo
//   PUT  /modulos/:id/contenido      → guarda y sincroniza las lecciones del módulo
//   DELETE /modulos/:id/contenido    → vuelve al contenido original
// ---------------------------------------------------------------------------
export const getContenidoModulo = (moduloId: string): Promise<ContenidoModulo> =>
  get<ContenidoModulo>(`/modulos/${moduloId}/contenido`);

export const guardarContenidoModulo = (moduloId: string, contenido: ContenidoModulo): Promise<ContenidoModulo> =>
  put<ContenidoModulo>(`/modulos/${moduloId}/contenido`, contenido);

export const restaurarContenidoModulo = (moduloId: string): Promise<ContenidoModulo> =>
  del<ContenidoModulo>(`/modulos/${moduloId}/contenido`);

// ---------------------------------------------------------------------------
// Sitio web público (landing, marca, precios…)
//   GET /sitio  (público)   ·   PUT /sitio  (admin)
// ---------------------------------------------------------------------------
export const getSitio = async (): Promise<SiteConfig> =>
  completarSitio(await get<Partial<SiteConfig>>('/sitio'));

export const guardarSitio = (sitio: SiteConfig): Promise<SiteConfig> =>
  put<SiteConfig>('/sitio', sitio);

export const restaurarSitio = (): Promise<SiteConfig> =>
  del<SiteConfig>('/sitio');

// ---------------------------------------------------------------------------
// Solicitudes de inscripción enviadas desde la landing
//   POST /solicitudes (público) · GET /solicitudes · PATCH/DELETE /solicitudes/:id (admin)
// ---------------------------------------------------------------------------
export const enviarSolicitud = (data: Omit<Solicitud, 'id' | 'fecha' | 'estado'>): Promise<Solicitud> =>
  post<Solicitud>('/solicitudes', data);

export const listarSolicitudes = (): Promise<Solicitud[]> => (get<Solicitud[]>('/solicitudes'));

export const editarSolicitud = (id: string, data: Partial<Solicitud>): Promise<Solicitud> =>
  patch<Solicitud>(`/solicitudes/${id}`, data);

export const eliminarSolicitud = (id: string): Promise<void> => (del<void>(`/solicitudes/${id}`));

/** Temario público para la landing (sin autenticación). Backend: GET /publico/curso */
export const getCursoPublico = (): Promise<Curso> =>
  get<Curso>('/publico/curso');

// ---------------------------------------------------------------------------
// Habilitación de módulos (administrador)
// ---------------------------------------------------------------------------
export interface FilaHabilitacion {
  userId: string;
  nombre: string;
  rut: string;
  activo: boolean;
  modulosHabilitados: string[];
  modulos: Record<string, { avance: number; nota: number | null; aprobado: boolean }>;
}
export const getHabilitacion = (): Promise<FilaHabilitacion[]> => get<FilaHabilitacion[]>('/admin/habilitacion');
export const habilitarModulos = (userId: string, modulosHabilitados: string[]): Promise<User> =>
  patch<User>(`/usuarios/${userId}`, { modulosHabilitados });

// ---------------------------------------------------------------------------
// Fotografías y verificación facial
//   El navegador calcula el descriptor facial; el servidor lo guarda o lo compara.
// ---------------------------------------------------------------------------
const fotosCache = new Map<string, Promise<string | null>>();
/** Foto del usuario (data URL) o null. Se guarda en memoria para no pedirla de nuevo. */
export const getFoto = (userId: string): Promise<string | null> => {
  if (!fotosCache.has(userId)) {
    const p = get<{ foto: string | null }>(`/fotos/${userId}`)
      .then((r) => r.foto)
      .catch(() => {
        fotosCache.delete(userId);
        return null;
      });
    fotosCache.set(userId, p);
  }
  return fotosCache.get(userId)!;
};
const olvidarFoto = (userId: string) => fotosCache.delete(userId);

export const subirFoto = async (userId: string, foto: string): Promise<User> => {
  olvidarFoto(userId);
  return put<User>(`/fotos/${userId}`, { foto });
};
export const borrarFoto = async (userId: string): Promise<User> => {
  olvidarFoto(userId);
  return del<User>(`/fotos/${userId}`);
};

/** El alumno registra su rostro (primera vez). Devuelve la sesión ya verificada. */
export async function registrarMiRostro(descriptor: number[], foto: string): Promise<User> {
  const r = await post<{ token: string; user: User }>('/rostro/registro', { descriptor, foto });
  setToken(r.token);
  olvidarFoto(r.user.id);
  return r.user;
}
/** El alumno verifica su rostro al iniciar sesión. */
export async function verificarMiRostro(descriptor: number[]): Promise<User> {
  const r = await post<{ token: string; user: User }>('/rostro/verificar', { descriptor });
  setToken(r.token);
  return r.user;
}
/** El administrador registra el rostro de un alumno desde una foto. */
export const registrarRostroAlumno = (userId: string, descriptor: number[], foto: string): Promise<User> => {
  olvidarFoto(userId);
  return post<User>(`/rostro/${userId}`, { descriptor, foto });
};
/** El administrador borra el rostro registrado (el alumno lo registra de nuevo al entrar). */
export const borrarRostroAlumno = (userId: string): Promise<User> => del<User>(`/rostro/${userId}`);

// ---------------------------------------------------------------------------
// Registro de ingresos (asistencia automática)
// ---------------------------------------------------------------------------
export interface Ingreso {
  fecha: string;
  metodo: 'rostro' | 'contrasena';
  ip?: string;
}
/** Administrador: ingresos de todos los alumnos. */
export const listarIngresos = (): Promise<{ userId: string; ingresos: Ingreso[] }[]> => get('/ingresos');
/** Ingresos de un alumno (el administrador, de cualquiera; el alumno, los suyos). */
export const getIngresos = (userId?: string): Promise<Ingreso[]> => get('/ingresos', { userId });
