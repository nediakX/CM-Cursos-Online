/**
 * Cliente HTTP del LMS — SIN datos mock.
 *
 * Configura la URL del backend en `.env`:
 *   VITE_API_URL=http://localhost:3000/api
 *
 * Convenciones que asume (ajústalas a tu backend):
 *  - Autenticación con `Authorization: Bearer <token>` (token en localStorage).
 *  - Los errores de negocio llegan como JSON `{ "code": "RUT_DUPLICADO" }` y
 *    se lanzan como `Error(code)`, porque las páginas comparan `err.message`
 *    con 'CREDENCIALES_INVALIDAS', 'USUARIO_DESACTIVADO' y 'RUT_DUPLICADO'.
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
// El almacén local se carga bajo demanda: así la landing pública no descarga
// el banco de preguntas ni el contenido de los módulos.
type LocalStore = typeof import('./localStore');
const cargarLocal = (): Promise<LocalStore> => import('./localStore');

// ---------------------------------------------------------------------------
// Núcleo HTTP
// ---------------------------------------------------------------------------
const BASE_URL: string = import.meta.env.VITE_API_URL ?? '/api';
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

/** Id del usuario logueado en modo local (token `local:<id>`). */
const userLocalId = (): string => getToken()?.replace('local:', '') ?? '';

// ---------------------------------------------------------------------------
// MODO LOCAL
//
// Si NO defines VITE_API_URL, la plataforma funciona completa sin backend,
// guardando los datos en el navegador (services/localStore.ts). Cuentas iniciales:
//   Admin:  RUT 11.111.111-1 · Admin1234!
//   Alumno: RUT 22.222.222-2 · Alumno1234!
// Ideal para demostraciones y pruebas. Para clases reales con muchos alumnos
// en distintos equipos, define VITE_API_URL y se usará tu backend.
// ---------------------------------------------------------------------------
export const LOCAL_MODE: boolean = !import.meta.env.VITE_API_URL;

/** Ejecuta una operación local como promesa (los errores se convierten en rechazos). */
const L = <T>(fn: (local: LocalStore) => T): Promise<T> => cargarLocal().then(fn);

// ---------------------------------------------------------------------------
// Autenticación
// ---------------------------------------------------------------------------
export async function login(rut: string, password: string): Promise<User> {
  if (LOCAL_MODE) {
    const local = await cargarLocal();
    const user = local.loginLocal(rut, password);
    setToken(`local:${user.id}`);
    return user;
  }
  const { token, user } = await post<{ token: string; user: User }>('/auth/login', { rut, password });
  setToken(token);
  return user;
}

export async function logout(): Promise<void> {
  setToken(null);
}

export const getSesion = (): Promise<User> => (LOCAL_MODE ? L((local) => local.getUsuario(userLocalId())) : get<User>('/auth/me'));

export const cambiarPassword = (actual: string, nueva: string): Promise<void> =>
  LOCAL_MODE ? L((local) => local.cambiarPasswordLocal(userLocalId(), actual, nueva)) : post<void>('/auth/cambiar-password', { actual, nueva });

export const recuperarPassword = (rut: string): Promise<void> =>
  LOCAL_MODE ? Promise.resolve() : post<void>('/auth/recuperar-password', { rut });

// ---------------------------------------------------------------------------
// Usuarios
// ---------------------------------------------------------------------------
export type NuevoUsuario = Omit<User, 'id' | 'creadoEn'> & { password: string };

export const listarUsuarios = (filtros: { busqueda?: string; activo?: boolean; rol?: UserRole } = {}): Promise<User[]> =>
  LOCAL_MODE ? L((local) => local.listarUsuarios(filtros)) : get<User[]>('/usuarios', filtros);

export const crearUsuario = (data: Partial<NuevoUsuario> & { password: string }): Promise<User> =>
  LOCAL_MODE ? L((local) => local.crearUsuario(data)) : post<User>('/usuarios', data);

export const crearUsuariosMasivo = (
  data: (Partial<NuevoUsuario> & { password: string })[],
): Promise<{ exitosos: User[]; errores: { rut: string; motivo: string }[] }> => {
  if (!LOCAL_MODE) return post('/usuarios/masivo', data);
  return L((local) => {
  const exitosos: User[] = [];
  const errores: { rut: string; motivo: string }[] = [];
  for (const d of data) {
    try {
      exitosos.push(local.crearUsuario(d));
    } catch (e) {
      errores.push({ rut: d.rut ?? '', motivo: e instanceof Error && e.message === 'RUT_DUPLICADO' ? 'RUT duplicado' : 'Datos inválidos' });
    }
  }
  return { exitosos, errores };
  });
};

export const editarUsuario = (id: string, data: Partial<User>): Promise<User> =>
  LOCAL_MODE ? L((local) => local.editarUsuario(id, data)) : patch<User>(`/usuarios/${id}`, data);

export const desactivarUsuario = (id: string): Promise<void> =>
  LOCAL_MODE ? L((local) => void local.editarUsuario(id, { activo: false })) : post<void>(`/usuarios/${id}/desactivar`);
export const reactivarUsuario = (id: string): Promise<void> =>
  LOCAL_MODE ? L((local) => void local.editarUsuario(id, { activo: true })) : post<void>(`/usuarios/${id}/reactivar`);
export const eliminarUsuario = (id: string): Promise<void> => (LOCAL_MODE ? L((local) => local.eliminarUsuario(id)) : del<void>(`/usuarios/${id}`));

/** Devuelve la contraseña temporal generada. */
export const resetearPassword = async (id: string): Promise<string> => {
  if (LOCAL_MODE) return (await cargarLocal()).resetearPassword(id);
  const { password } = await post<{ password: string }>(`/usuarios/${id}/resetear-password`);
  return password;
};

export const getFichaAlumno = (id: string): Promise<FichaAlumno> =>
  LOCAL_MODE ? L((local) => local.getFichaAlumno(id)) : get<FichaAlumno>(`/usuarios/${id}/ficha`);

// ---------------------------------------------------------------------------
// Cursos y módulos
// ---------------------------------------------------------------------------
export const listarCursos = (): Promise<Curso[]> => (LOCAL_MODE ? L((local) => local.listarCursos()) : get<Curso[]>('/cursos'));
export const getCurso = (id: string): Promise<Curso> => (LOCAL_MODE ? L((local) => local.getCurso(id)) : get<Curso>(`/cursos/${id}`));
export const crearCurso = (data: Partial<Curso>): Promise<Curso> =>
  LOCAL_MODE ? Promise.reject(new Error('NO_DISPONIBLE_EN_MODO_LOCAL')) : post<Curso>('/cursos', data);
export const editarCurso = (id: string, data: Partial<Curso>): Promise<Curso> =>
  LOCAL_MODE ? L((local) => local.editarCurso(id, data)) : put<Curso>(`/cursos/${id}`, data);

export const getModulo = (id: string): Promise<Modulo> => (LOCAL_MODE ? L((local) => local.getModulo(id)) : get<Modulo>(`/modulos/${id}`));
export const crearModulo = (cursoId: string, data: Partial<Modulo>): Promise<Modulo> =>
  LOCAL_MODE ? L((local) => local.crearModulo(cursoId, data)) : post<Modulo>(`/cursos/${cursoId}/modulos`, data);
export const editarModulo = (id: string, data: Partial<Modulo>): Promise<Modulo> =>
  LOCAL_MODE ? L((local) => local.editarModulo(id, data)) : put<Modulo>(`/modulos/${id}`, data);

// ---------------------------------------------------------------------------
// Progreso
// ---------------------------------------------------------------------------
export const getProgreso = (userId: string, cursoId: string): Promise<Progreso> =>
  LOCAL_MODE ? L((local) => local.getProgreso(userId, cursoId)) : get<Progreso>(`/progreso/${userId}/${cursoId}`);

export const marcarLeccion = (userId: string, leccionId: string, completada: boolean): Promise<Progreso> =>
  LOCAL_MODE ? L((local) => local.marcarLeccion(userId, leccionId, completada)) : put<Progreso>(`/progreso/${userId}/lecciones/${leccionId}`, { completada });

// ---------------------------------------------------------------------------
// Banco de preguntas
// ---------------------------------------------------------------------------
export const listarPreguntas = (filtros: { moduloId?: string; dificultad?: Dificultad; busqueda?: string } = {}): Promise<Pregunta[]> =>
  LOCAL_MODE ? L((local) => local.listarPreguntas(filtros)) : get<Pregunta[]>('/preguntas', filtros);

export const crearPregunta = (data: Omit<Pregunta, 'id'>): Promise<Pregunta> =>
  LOCAL_MODE ? L((local) => local.crearPregunta(data)) : post<Pregunta>('/preguntas', data);
export const editarPregunta = (id: string, data: Partial<Pregunta>): Promise<Pregunta> =>
  LOCAL_MODE ? L((local) => local.editarPregunta(id, data)) : put<Pregunta>(`/preguntas/${id}`, data);
export const eliminarPregunta = (id: string): Promise<void> => (LOCAL_MODE ? L((local) => local.eliminarPregunta(id)) : del<void>(`/preguntas/${id}`));

// ---------------------------------------------------------------------------
// Evaluaciones e intentos
// ---------------------------------------------------------------------------
export const listarEvaluaciones = (cursoId: string): Promise<Evaluacion[]> =>
  LOCAL_MODE ? L((local) => local.listarEvaluaciones()) : get<Evaluacion[]>(`/cursos/${cursoId}/evaluaciones`);

export const editarEvaluacion = (id: string, data: Partial<Evaluacion>): Promise<Evaluacion> =>
  LOCAL_MODE ? L((local) => local.editarEvaluacion(id, data)) : put<Evaluacion>(`/evaluaciones/${id}`, data);

export const listarIntentos = (userId: string): Promise<Intento[]> =>
  LOCAL_MODE ? L((local) => local.listarIntentos(userId)) : get<Intento[]>('/intentos', { userId });

export const iniciarIntento = (evaluacionId: string): Promise<{ intentoId: string; preguntas: PreguntaSinRespuesta[] }> =>
  LOCAL_MODE ? L((local) => local.iniciarIntento(userLocalId(), evaluacionId)) : post(`/evaluaciones/${evaluacionId}/intentos`);

export const enviarIntento = (intentoId: string, respuestas: Record<string, 'a' | 'b' | 'c' | 'd'>, tiempoUsado?: number): Promise<Intento> =>
  LOCAL_MODE ? L((local) => local.enviarIntento(intentoId, respuestas, tiempoUsado)) : post<Intento>(`/intentos/${intentoId}/enviar`, { respuestas, tiempoUsado });

export const getResultado = (intentoId: string): Promise<ResultadoIntento> =>
  LOCAL_MODE ? L((local) => local.getResultado(intentoId)) : get<ResultadoIntento>(`/intentos/${intentoId}/resultado`);

// ---------------------------------------------------------------------------
// Asistencia
// ---------------------------------------------------------------------------
export const getAsistencia = (filtros: { userId?: string; moduloId?: string } = {}): Promise<Asistencia[]> =>
  LOCAL_MODE ? L((local) => local.getAsistencia(filtros)) : get<Asistencia[]>('/asistencia', filtros);

export const guardarAsistencia = (registros: Asistencia[]): Promise<void> =>
  LOCAL_MODE ? L((local) => local.guardarAsistencia(registros)) : put<void>('/asistencia', registros);

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------
export const listarConsultas = (filtros: { userId?: string; moduloId?: string; estado?: Consulta['estado'] } = {}): Promise<Consulta[]> =>
  LOCAL_MODE ? L((local) => local.listarConsultas(filtros)) : get<Consulta[]>('/consultas', filtros);

export const crearConsulta = (data: { userId: string; moduloId: string; pregunta: string }): Promise<Consulta> =>
  LOCAL_MODE ? L((local) => local.crearConsulta(data)) : post<Consulta>('/consultas', data);

export const responderConsulta = (id: string, respuesta: string): Promise<Consulta> =>
  LOCAL_MODE ? L((local) => local.responderConsulta(id, respuesta)) : post<Consulta>(`/consultas/${id}/responder`, { respuesta });

// ---------------------------------------------------------------------------
// Proyecto final
// ---------------------------------------------------------------------------
/** Devuelve todas las entregas (admin) o las del usuario autenticado, según el backend. */
export const listarEntregas = (): Promise<EntregaProyecto[]> => {
  if (!LOCAL_MODE) return get<EntregaProyecto[]>('/entregas');
  return L((local) => {
    const yo = local.getUsuario(userLocalId());
    return local.listarEntregas(yo.rol === 'admin' ? undefined : yo.id);
  });
};

export const entregarProyecto = (userId: string, archivos: { nombre: string; url: string }[]): Promise<EntregaProyecto> =>
  LOCAL_MODE ? L((local) => local.entregarProyecto(userId, archivos)) : post<EntregaProyecto>('/entregas', { userId, archivos });

export const calificarEntrega = (id: string, nota: number, comentario: string): Promise<EntregaProyecto> =>
  LOCAL_MODE ? L((local) => local.calificarEntrega(id, nota, comentario)) : post<EntregaProyecto>(`/entregas/${id}/calificar`, { nota, comentario });

// ---------------------------------------------------------------------------
// Certificados
// ---------------------------------------------------------------------------
export const listarCertificados = (userId: string): Promise<Certificado[]> =>
  LOCAL_MODE ? L((local) => local.listarCertificados(userId)) : get<Certificado[]>('/certificados', { userId });

export const listarTodosCertificados = (): Promise<(Certificado & { usuario: User })[]> => {
  if (!LOCAL_MODE) return get('/certificados/todos');
  return L((local) => {
    const usuarios = new Map(local.todosLosUsuarios().map((u) => [u.id, u]));
    return local
      .listarCertificados()
      .filter((c) => usuarios.has(c.userId))
      .map((c) => ({ ...c, usuario: usuarios.get(c.userId)! }));
  });
};

export const puedeEmitirCertificado = (
  userId: string,
  cursoId: string,
): Promise<{ puede: boolean; razon?: string; asistenciaPromedio: number; notaFinal: number }> =>
  LOCAL_MODE ? L((local) => local.elegibilidad(userId, cursoId)) : get(`/certificados/elegibilidad`, { userId, cursoId });

export const emitirCertificado = (userId: string, cursoId: string): Promise<Certificado> =>
  LOCAL_MODE ? L((local) => local.emitirCertificado(userId, cursoId)) : post<Certificado>('/certificados', { userId, cursoId });

export const anularCertificado = (id: string): Promise<void> => (LOCAL_MODE ? L((local) => local.anularCertificado(id)) : post<void>(`/certificados/${id}/anular`));

/** Endpoint público. Devuelve null si el código no existe (404). */
export async function verificarCertificado(codigo: string): Promise<(Certificado & { usuario: User; curso: Curso }) | null> {
  if (LOCAL_MODE) return (await cargarLocal()).verificarCertificado(codigo);
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
export const getMetricas = async (): Promise<MetricasAdmin> => {
  if (!LOCAL_MODE) return get<MetricasAdmin>('/admin/metricas');
  const local = await cargarLocal();
  const alumnos = local.todosLosUsuarios().filter((u) => u.rol === 'alumno');
  const curso = local.getCurso('curso-1');
  const intentos = local.todosLosIntentos().filter((i) => alumnos.some((a) => a.id === i.userId));
  const aprobados = intentos.filter((i) => i.aprobado).length;
  const progresos = alumnos.map((a) => local.getProgreso(a.id, 'curso-1'));
  const promedio = (xs: number[]) => (xs.length ? Math.round(xs.reduce((x, y) => x + y, 0) / xs.length) : 0);
  const meses = new Map<string, number>();
  for (const a of alumnos) {
    const d = new Date(a.creadoEn);
    const k = d.toLocaleDateString('es-CL', { month: 'short', year: '2-digit' });
    meses.set(k, (meses.get(k) ?? 0) + 1);
  }
  return {
    totalAlumnos: alumnos.length,
    alumnosActivos: alumnos.filter((a) => a.activo).length,
    promedioAvance: promedio(progresos.map((p) => p.porcentaje)),
    tasaAprobacion: intentos.length ? Math.round((aprobados / intentos.length) * 100) : 0,
    certificadosEmitidos: local.listarCertificados().filter((c) => c.estado === 'vigente').length,
    consultasPendientes: local.listarConsultas({ estado: 'pendiente' }).length,
    avancePorModulo: curso.modulos.map((m) => ({
      modulo: `M${m.orden}`,
      promedio: promedio(
        progresos.map((p) => {
          const hechas = new Set(p.leccionesCompletadas);
          return m.lecciones.length ? (m.lecciones.filter((l) => hechas.has(l.id)).length / m.lecciones.length) * 100 : 0;
        }),
      ),
    })),
    aprobadosVsReprobados: [
      { nombre: 'Aprobados', valor: aprobados },
      { nombre: 'Reprobados', valor: intentos.length - aprobados },
    ],
    alumnosPorMes: [...meses].map(([mes, cantidad]) => ({ mes, cantidad })),
  };
};

export const exportarReporte = (tipo: 'notas' | 'avance' | 'asistencia'): Promise<Record<string, unknown>[]> => {
  if (!LOCAL_MODE) return get<Record<string, unknown>[]>(`/admin/reportes/${tipo}`);
  return L((local) => {
    const alumnos = local.todosLosUsuarios().filter((u) => u.rol === 'alumno');
    const nombre = (u: User) => `${u.nombres} ${u.apellidos}`;
    if (tipo === 'notas') {
      const evs = new Map(local.listarEvaluaciones().map((e) => [e.id, e.nombre]));
      return alumnos.flatMap((a) =>
        local.listarIntentos(a.id).map((i) => ({
          Alumno: nombre(a),
          RUT: a.rut,
          Evaluación: evs.get(i.evaluacionId) ?? i.evaluacionId,
          Nota: i.nota.toFixed(1),
          Estado: i.aprobado ? 'Aprobado' : 'Reprobado',
          Fecha: new Date(i.fecha).toLocaleDateString('es-CL'),
        })),
      );
    }
    if (tipo === 'avance') {
      return alumnos.map((a) => {
        const p = local.getProgreso(a.id, 'curso-1');
        return { Alumno: nombre(a), RUT: a.rut, 'Avance (%)': p.porcentaje, 'Horas completadas': p.horasCompletadas, 'Lecciones completadas': p.leccionesCompletadas.length };
      });
    }
    const modulos = new Map(local.getCurso('curso-1').modulos.map((m) => [m.id, `M${m.orden} ${m.nombre}`]));
    return local.getAsistencia().flatMap((r) => {
      const a = alumnos.find((x) => x.id === r.userId);
      return a ? [{ Alumno: nombre(a), RUT: a.rut, Módulo: modulos.get(r.moduloId) ?? r.moduloId, 'Asistencia (%)': r.porcentaje }] : [];
    });
  });
};

// ---------------------------------------------------------------------------
// Contenido de lecciones (editor del administrador)
//   GET  /modulos/:id/contenido      → ContenidoModulo
//   PUT  /modulos/:id/contenido      → guarda y sincroniza las lecciones del módulo
//   DELETE /modulos/:id/contenido    → vuelve al contenido original
// ---------------------------------------------------------------------------
export const getContenidoModulo = (moduloId: string): Promise<ContenidoModulo> =>
  LOCAL_MODE ? L((local) => local.getContenido(moduloId)) : get<ContenidoModulo>(`/modulos/${moduloId}/contenido`);

export const guardarContenidoModulo = (moduloId: string, contenido: ContenidoModulo): Promise<ContenidoModulo> =>
  LOCAL_MODE ? L((local) => local.guardarContenido(moduloId, contenido)) : put<ContenidoModulo>(`/modulos/${moduloId}/contenido`, contenido);

export const restaurarContenidoModulo = (moduloId: string): Promise<ContenidoModulo> =>
  LOCAL_MODE ? L((local) => local.restaurarContenido(moduloId)) : del<ContenidoModulo>(`/modulos/${moduloId}/contenido`);

// ---------------------------------------------------------------------------
// Sitio web público (landing, marca, precios…)
//   GET /sitio  (público)   ·   PUT /sitio  (admin)
// ---------------------------------------------------------------------------
export const getSitio = async (): Promise<SiteConfig> =>
  LOCAL_MODE ? L((local) => local.getSitio()) : completarSitio(await get<Partial<SiteConfig>>('/sitio'));

export const guardarSitio = (sitio: SiteConfig): Promise<SiteConfig> =>
  LOCAL_MODE ? L((local) => local.guardarSitio(sitio)) : put<SiteConfig>('/sitio', sitio);

export const restaurarSitio = (): Promise<SiteConfig> =>
  LOCAL_MODE ? L((local) => local.restaurarSitio()) : del<SiteConfig>('/sitio');

// ---------------------------------------------------------------------------
// Solicitudes de inscripción enviadas desde la landing
//   POST /solicitudes (público) · GET /solicitudes · PATCH/DELETE /solicitudes/:id (admin)
// ---------------------------------------------------------------------------
export const enviarSolicitud = (data: Omit<Solicitud, 'id' | 'fecha' | 'estado'>): Promise<Solicitud> =>
  LOCAL_MODE ? L((local) => local.crearSolicitud(data)) : post<Solicitud>('/solicitudes', data);

export const listarSolicitudes = (): Promise<Solicitud[]> => (LOCAL_MODE ? L((local) => local.listarSolicitudes()) : get<Solicitud[]>('/solicitudes'));

export const editarSolicitud = (id: string, data: Partial<Solicitud>): Promise<Solicitud> =>
  LOCAL_MODE ? L((local) => local.editarSolicitud(id, data)) : patch<Solicitud>(`/solicitudes/${id}`, data);

export const eliminarSolicitud = (id: string): Promise<void> => (LOCAL_MODE ? L((local) => local.eliminarSolicitud(id)) : del<void>(`/solicitudes/${id}`));

/** Temario público para la landing (sin autenticación). Backend: GET /publico/curso */
export const getCursoPublico = (): Promise<Curso> =>
  LOCAL_MODE ? L((local) => local.getCurso('curso-1')) : get<Curso>('/publico/curso');
