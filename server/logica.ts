/**
 * Lógica de negocio de la plataforma (usuarios, progreso, evaluaciones,
 * certificados, sitio…). Se ejecuta en el servidor: server/db.ts le entrega
 * los datos de Postgres con `configurarAlmacen()` y server/auth.ts define
 * cómo se cifran las contraseñas con `configurarPasswords()`.
 *
 * Los imports llevan extensión `.js` porque así lo exige Node en las Vercel Functions.
 */
import type {
  Asistencia,
  Certificado,
  Consulta,
  Curso,
  Dificultad,
  EntregaProyecto,
  Evaluacion,
  FichaAlumno,
  Intento,
  Modulo,
  Pregunta,
  PreguntaSinRespuesta,
  Progreso,
  ResultadoIntento,
  MetricasAdmin,
  User,
  UserRole,
  ContenidoModulo,
  SiteConfig,
  Solicitud,
} from '../src/types';
import { CURSO, EVALUACIONES } from '../src/data/curso.js';
import { PREGUNTAS } from '../src/data/preguntas.js';
import { CONTENIDO_MODULOS } from '../src/data/modulos/index.js';
import { completarSitio } from '../src/data/sitio.js';
import { estadoEvaluacion, modulosHabilitados as modulosDe, mejorIntento, requisitosEvaluacion } from '../src/utils/evaluaciones.js';
import { validarRut } from '../src/utils/rut.js';

export interface CuentaLocal {
  user: User;
  password: string;
}

export interface Db {
  progreso: Record<string, string[]>; // userId -> lecciones completadas
  intentos: Intento[];
  sesiones: Record<string, { userId: string; evaluacionId: string; preguntaIds: string[]; inicio?: string }>;
  preguntasExtra: Pregunta[];
  preguntasEditadas: Record<string, Partial<Pregunta>>;
  preguntasEliminadas: string[];
  modulosEditados: Record<string, Partial<Modulo>>;
  modulosExtra: Modulo[];
  cursoEditado: Partial<Curso>;
  evaluacionesEditadas: Record<string, Partial<Evaluacion>>;
  usuarios: CuentaLocal[] | null; // null = sembrar cuentas iniciales
  consultas: Consulta[];
  entregas: EntregaProyecto[];
  certificados: Certificado[];
  asistencia: Asistencia[];
  contenidosEditados: Record<string, ContenidoModulo>;
  sitio: Partial<SiteConfig> | null;
  solicitudes: Solicitud[];
}

export const vacia = (): Db => ({
  progreso: {},
  intentos: [],
  sesiones: {},
  preguntasExtra: [],
  preguntasEditadas: {},
  preguntasEliminadas: [],
  modulosEditados: {},
  modulosExtra: [],
  cursoEditado: {},
  evaluacionesEditadas: {},
  usuarios: null,
  consultas: [],
  entregas: [],
  certificados: [],
  asistencia: [],
  contenidosEditados: {},
  sitio: null,
  solicitudes: [],
});

/** De dónde se leen y dónde se guardan los datos. */
export interface Almacen {
  leer(): Db;
  guardar(db: Db): void;
}

let almacen: Almacen | null = null;
/** Reemplaza el almacén (lo usa el servidor para trabajar sobre Postgres). */
export const configurarAlmacen = (a: Almacen): void => {
  almacen = a;
};

const usarAlmacen = (): Almacen => {
  if (!almacen) throw new Error('ALMACEN_NO_CONFIGURADO');
  return almacen;
};
const leer = (): Db => usarAlmacen().leer();
const guardar = (db: Db): void => usarAlmacen().guardar(db);

// --- Contraseñas ------------------------------------------------------------
// Las define el servidor (server/auth.ts): hash seguro y cuenta inicial del administrador.
export interface PoliticaPasswords {
  cifrar(plana: string): string;
  verificar(plana: string, guardada: string): boolean;
  generarTemporal(): string;
  cuentasIniciales(): CuentaLocal[];
}
const sinConfigurar = (): never => {
  throw new Error('PASSWORDS_NO_CONFIGURADAS');
};
let passwords: PoliticaPasswords = { cifrar: sinConfigurar, verificar: sinConfigurar, generarTemporal: sinConfigurar, cuentasIniciales: sinConfigurar };
export const configurarPasswords = (p: Partial<PoliticaPasswords>): void => {
  passwords = { ...passwords, ...p };
};

export const idLocal = (): string => `l-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// --- Usuarios ---------------------------------------------------------------
export const normalizarRut = (rut: string): string => rut.replace(/[^0-9kK]/g, '').toUpperCase();

function cuentas(db: Db): CuentaLocal[] {
  if (db.usuarios) return db.usuarios;
  db.usuarios = passwords.cuentasIniciales();
  return db.usuarios;
}

export const todosLosUsuarios = (): User[] => cuentas(leer()).map((c) => c.user);

export const getUsuario = (id: string): User => {
  const c = cuentas(leer()).find((x) => x.user.id === id);
  if (!c) throw new Error('HTTP_401');
  return c.user;
};

export const loginLocal = (rut: string, password: string): User => {
  const c = cuentas(leer()).find((x) => normalizarRut(x.user.rut) === normalizarRut(rut));
  if (!c || !passwords.verificar(password, c.password)) throw new Error('CREDENCIALES_INVALIDAS');
  if (!c.user.activo) throw new Error('USUARIO_DESACTIVADO');
  return c.user;
};

export const cambiarPasswordLocal = (id: string, actual: string, nueva: string): void => {
  const db = leer();
  const c = cuentas(db).find((x) => x.user.id === id);
  if (!c || !passwords.verificar(actual, c.password)) throw new Error('CREDENCIALES_INVALIDAS');
  c.password = passwords.cifrar(nueva);
  c.user.debeCambiarPassword = false;
  guardar(db);
};

export const listarUsuarios = (f: { busqueda?: string; activo?: boolean; rol?: UserRole } = {}): User[] => {
  const q = f.busqueda?.toLowerCase();
  return cuentas(leer())
    .map((c) => c.user)
    .filter(
      (u) =>
        (f.activo === undefined || u.activo === f.activo) &&
        (!f.rol || u.rol === f.rol) &&
        (!q || `${u.nombres} ${u.apellidos} ${u.rut} ${u.email}`.toLowerCase().includes(q)),
    );
};

export const crearUsuario = (data: Partial<User> & { password: string }): User => {
  const db = leer();
  const lista = cuentas(db);
  const rut = normalizarRut(data.rut ?? '');
  if (!rut || !validarRut(rut)) throw new Error('RUT_INVALIDO');
  if (lista.some((c) => normalizarRut(c.user.rut) === rut)) throw new Error('RUT_DUPLICADO');
  const user: User = {
    id: idLocal(),
    rut,
    nombres: data.nombres ?? '',
    apellidos: data.apellidos ?? '',
    email: data.email ?? '',
    telefono: data.telefono ?? '',
    rol: data.rol ?? 'alumno',
    activo: data.activo ?? true,
    debeCambiarPassword: data.debeCambiarPassword ?? true,
    cursosAsignados: data.cursosAsignados ?? [CURSO.id],
    creadoEn: new Date().toISOString(),
    ...((data.rol ?? 'alumno') === 'alumno'
      ? {
          modulosHabilitados: data.modulosHabilitados ?? [CURSO.modulos[0].id],
          evaluacionesHabilitadas: data.evaluacionesHabilitadas ?? [],
          requiereRostro: data.requiereRostro ?? true, rostroRegistrado: false, tieneFoto: false }
      : {}),
  };
  lista.push({ user, password: passwords.cifrar(data.password) });
  guardar(db);
  return user;
};

export const editarUsuario = (id: string, data: Partial<User>): User => {
  const db = leer();
  const c = cuentas(db).find((x) => x.user.id === id);
  if (!c) throw new Error('HTTP_404');
  if (data.rut !== undefined && !validarRut(data.rut)) throw new Error('RUT_INVALIDO');
  if (data.rut && cuentas(db).some((x) => x.user.id !== id && normalizarRut(x.user.rut) === normalizarRut(data.rut!))) {
    throw new Error('RUT_DUPLICADO');
  }
  c.user = { ...c.user, ...data, id, rut: data.rut ? normalizarRut(data.rut) : c.user.rut };
  guardar(db);
  return c.user;
};

export const eliminarUsuario = (id: string): void => {
  const db = leer();
  db.usuarios = cuentas(db).filter((c) => c.user.id !== id);
  guardar(db);
};

export const resetearPassword = (id: string): string => {
  const db = leer();
  const c = cuentas(db).find((x) => x.user.id === id);
  if (!c) throw new Error('HTTP_404');
  const pw = passwords.generarTemporal();
  c.password = passwords.cifrar(pw);
  c.user.debeCambiarPassword = true;
  guardar(db);
  return pw;
};

// --- Cursos y módulos -------------------------------------------------------
const modulosActuales = (db: Db): Modulo[] =>
  [...CURSO.modulos, ...db.modulosExtra]
    .map((m) => {
      const ed = db.modulosEditados[m.id] ?? {};
      // Nunca dejar un módulo sin lecciones por una edición (evita bloquear el avance).
      const lecciones = ed.lecciones && ed.lecciones.length > 0 ? ed.lecciones : m.lecciones;
      return { ...m, ...ed, lecciones, materiales: ed.materiales ?? m.materiales };
    })
    .sort((a, b) => a.orden - b.orden);

export const getCurso = (id: string): Curso => {
  if (id !== CURSO.id) throw new Error('HTTP_404');
  const db = leer();
  return { ...CURSO, ...db.cursoEditado, id: CURSO.id, modulos: modulosActuales(db) };
};
export const listarCursos = (): Curso[] => [getCurso(CURSO.id)];
export const editarCurso = (id: string, data: Partial<Curso>): Curso => {
  const db = leer();
  const { nombre, descripcion, horasTotales, modalidad } = data;
  db.cursoEditado = { ...db.cursoEditado, ...Object.fromEntries(Object.entries({ nombre, descripcion, horasTotales, modalidad }).filter(([, v]) => v !== undefined)) };
  guardar(db);
  return getCurso(id);
};
export const getModulo = (id: string): Modulo => {
  const m = modulosActuales(leer()).find((x) => x.id === id);
  if (!m) throw new Error('HTTP_404');
  return m;
};
export const editarModulo = (id: string, data: Partial<Modulo>): Modulo => {
  const db = leer();
  const extra = db.modulosExtra.find((m) => m.id === id);
  if (extra) Object.assign(extra, data, { id });
  else db.modulosEditados[id] = { ...(db.modulosEditados[id] ?? {}), ...data };
  guardar(db);
  return getModulo(id);
};
export const crearModulo = (cursoId: string, data: Partial<Modulo>): Modulo => {
  const db = leer();
  const id = `mod-x-${idLocal()}`;
  const m: Modulo = {
    id,
    cursoId,
    orden: data.orden ?? modulosActuales(db).length + 1,
    nombre: data.nombre ?? 'Nuevo módulo',
    horas: data.horas ?? 0,
    objetivo: data.objetivo ?? '',
    aprendizajesEsperados: data.aprendizajesEsperados ?? [],
    contenidos: data.contenidos ?? [],
    // Un módulo creado desde el panel parte con una lección por cada contenido declarado.
    lecciones: (data.contenidos?.length ? data.contenidos : ['Contenido del módulo']).map((t, i) => ({ id: `${id}-l${i + 1}`, moduloId: id, titulo: t, orden: i + 1 })),
    materiales: data.materiales ?? [],
    tipoEvaluacion: data.tipoEvaluacion ?? 'modulo',
  };
  db.modulosExtra.push(m);
  guardar(db);
  return m;
};

// --- Evaluaciones -----------------------------------------------------------
export const listarEvaluaciones = (): Evaluacion[] => {
  const db = leer();
  return EVALUACIONES.map((e) => ({ ...e, ...(db.evaluacionesEditadas[e.id] ?? {}), id: e.id }));
};
export const editarEvaluacion = (id: string, data: Partial<Evaluacion>): Evaluacion => {
  const db = leer();
  db.evaluacionesEditadas[id] = { ...(db.evaluacionesEditadas[id] ?? {}), ...data };
  guardar(db);
  const ev = listarEvaluaciones().find((e) => e.id === id);
  if (!ev) throw new Error('HTTP_404');
  return ev;
};

// --- Preguntas --------------------------------------------------------------
const preguntasActuales = (db: Db): Pregunta[] =>
  [...PREGUNTAS, ...db.preguntasExtra]
    .filter((p) => !db.preguntasEliminadas.includes(p.id))
    .map((p) => ({ ...p, ...(db.preguntasEditadas[p.id] ?? {}) }));

export const listarPreguntas = (f: { moduloId?: string; dificultad?: Dificultad; busqueda?: string } = {}): Pregunta[] => {
  const q = f.busqueda?.toLowerCase();
  return preguntasActuales(leer()).filter(
    (p) =>
      (!f.moduloId || p.moduloId === f.moduloId) &&
      (!f.dificultad || p.dificultad === f.dificultad) &&
      (!q || p.enunciado.toLowerCase().includes(q)),
  );
};
export const crearPregunta = (data: Omit<Pregunta, 'id'>): Pregunta => {
  const db = leer();
  const p: Pregunta = { ...data, id: idLocal() };
  db.preguntasExtra.push(p);
  guardar(db);
  return p;
};
export const editarPregunta = (id: string, data: Partial<Pregunta>): Pregunta => {
  const db = leer();
  db.preguntasEditadas[id] = { ...(db.preguntasEditadas[id] ?? {}), ...data };
  guardar(db);
  const p = preguntasActuales(db).find((x) => x.id === id);
  if (!p) throw new Error('HTTP_404');
  return p;
};
export const eliminarPregunta = (id: string): void => {
  const db = leer();
  db.preguntasEliminadas.push(id);
  guardar(db);
};

// --- Progreso ---------------------------------------------------------------
export const getProgreso = (userId: string, cursoId: string): Progreso => {
  const db = leer();
  const curso = getCurso(cursoId);
  const hechas = new Set(db.progreso[userId] ?? []);
  const todas = curso.modulos.flatMap((m) => m.lecciones);
  const completadas = todas.filter((l) => hechas.has(l.id));
  const horasCompletadas = curso.modulos.reduce((acc, m) => {
    if (m.lecciones.length === 0) return acc;
    const n = m.lecciones.filter((l) => hechas.has(l.id)).length;
    return acc + (m.horas * n) / m.lecciones.length;
  }, 0);
  return {
    userId,
    cursoId,
    leccionesCompletadas: completadas.map((l) => l.id),
    porcentaje: todas.length ? Math.round((completadas.length / todas.length) * 100) : 0,
    horasCompletadas: Math.round(horasCompletadas),
  };
};
export const marcarLeccion = (userId: string, leccionId: string, completada: boolean): Progreso => {
  const db = leer();
  const set = new Set(db.progreso[userId] ?? []);
  if (completada) set.add(leccionId);
  else set.delete(leccionId);
  db.progreso[userId] = [...set];
  guardar(db);
  return getProgreso(userId, CURSO.id);
};

/** ¿El alumno puede rendir esta evaluación? (reglas en src/utils/evaluaciones.ts) */
export const evaluacionDesbloqueada = (userId: string, ev: Evaluacion): boolean =>
  estadoEvaluacion(ev, getCurso(CURSO.id), getProgreso(userId, CURSO.id), getUsuario(userId)).desbloqueada;

/** ¿El usuario puede entrar a este módulo? */
export const puedeVerModulo = (userId: string, moduloId: string): boolean => modulosDe(getUsuario(userId), getCurso(CURSO.id)).has(moduloId);

/** Módulo al que pertenece una lección (o null). */
export const moduloDeLeccion = (leccionId: string): string | null =>
  getCurso(CURSO.id).modulos.find((m) => m.lecciones.some((l) => l.id === leccionId))?.id ?? null;

/**
 * Tabla para que el administrador habilite módulos según el avance y las
 * evaluaciones de cada alumno.
 */
export const getHabilitacion = (): {
  userId: string;
  nombre: string;
  rut: string;
  activo: boolean;
  modulosHabilitados: string[];
  evaluacionesHabilitadas: string[];
  modulos: Record<string, { avance: number; nota: number | null; aprobado: boolean }>;
  /** Por evaluación: si el alumno cumple los requisitos de avance, y su mejor nota. */
  evaluaciones: Record<string, { requisitos: boolean; nota: number | null; aprobado: boolean }>;
}[] => {
  const curso = getCurso(CURSO.id);
  const todas = listarEvaluaciones();
  const evs = todas.filter((e) => e.tipo === 'modulo' && e.moduloId);
  return todosLosUsuarios()
    .filter((u) => u.rol === 'alumno')
    .map((u) => {
      const prog = getProgreso(u.id, CURSO.id);
      const hechas = new Set(prog.leccionesCompletadas);
      const intentos = listarIntentos(u.id);
      const modulos = Object.fromEntries(
        curso.modulos.map((m) => {
          const ev = evs.find((e) => e.moduloId === m.id);
          const mejor = ev ? mejorIntento(intentos, ev.id) : null;
          const avance = m.lecciones.length ? Math.round((m.lecciones.filter((l) => hechas.has(l.id)).length / m.lecciones.length) * 100) : 0;
          return [m.id, { avance, nota: mejor?.nota ?? null, aprobado: !!mejor?.aprobado }];
        }),
      );
      const evaluaciones = Object.fromEntries(
        todas.map((e) => {
          const mejor = mejorIntento(intentos, e.id);
          return [e.id, { requisitos: requisitosEvaluacion(e, curso, prog, u).desbloqueada, nota: mejor?.nota ?? null, aprobado: !!mejor?.aprobado }];
        }),
      );
      return {
        userId: u.id,
        nombre: `${u.nombres} ${u.apellidos}`,
        rut: u.rut,
        activo: u.activo,
        modulosHabilitados: [...modulosDe(u, curso)],
        evaluacionesHabilitadas: u.evaluacionesHabilitadas ?? [],
        modulos,
        evaluaciones,
      };
    });
};

// --- Intentos ---------------------------------------------------------------
export const listarIntentos = (userId: string): Intento[] => leer().intentos.filter((i) => i.userId === userId);
export const todosLosIntentos = (): Intento[] => leer().intentos;

function mezclar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Selección equilibrada: reparte las preguntas entre módulos (útil para simuladores y examen final). */
function seleccionEquilibrada(pool: Pregunta[], n: number): Pregunta[] {
  const porModulo = new Map<string, Pregunta[]>();
  for (const p of mezclar(pool)) {
    if (!porModulo.has(p.moduloId)) porModulo.set(p.moduloId, []);
    porModulo.get(p.moduloId)!.push(p);
  }
  const colas = mezclar([...porModulo.values()]);
  const out: Pregunta[] = [];
  while (out.length < n && colas.some((c) => c.length)) {
    for (const c of colas) {
      if (out.length >= n) break;
      const p = c.shift();
      if (p) out.push(p);
    }
  }
  return mezclar(out);
}

export const iniciarIntento = (userId: string, evaluacionId: string): { intentoId: string; preguntas: PreguntaSinRespuesta[] } => {
  const ev = listarEvaluaciones().find((e) => e.id === evaluacionId);
  if (!ev) throw new Error('HTTP_404');
  if (!evaluacionDesbloqueada(userId, ev)) throw new Error('EVALUACION_BLOQUEADA');
  const db = leer();
  const banco = preguntasActuales(db);
  const pool = ev.moduloId
    ? banco.filter((p) => p.moduloId === ev.moduloId)
    : ev.moduloIds?.length
      ? banco.filter((p) => ev.moduloIds!.includes(p.moduloId))
      : banco;
  const elegidas = ev.moduloId ? mezclar(pool).slice(0, ev.cantidadPreguntas) : seleccionEquilibrada(pool, ev.cantidadPreguntas);
  const intentoId = idLocal();
  db.sesiones[intentoId] = { userId, evaluacionId, preguntaIds: elegidas.map((p) => p.id), inicio: new Date().toISOString() };
  guardar(db);
  return {
    intentoId,
    preguntas: elegidas.map((p) => ({ id: p.id, moduloId: p.moduloId, enunciado: p.enunciado, alternativas: p.alternativas, dificultad: p.dificultad })),
  };
};

/** Escala chilena 1.0–7.0 con exigencia del 60% para el 4.0. */
export const notaChilena = (porcentaje: number): number => {
  const p = Math.max(0, Math.min(1, porcentaje));
  const n = p >= 0.6 ? 4 + (3 * (p - 0.6)) / 0.4 : 1 + (3 * p) / 0.6;
  return Math.round(n * 10) / 10;
};

export const enviarIntento = (intentoId: string, respuestas: Record<string, 'a' | 'b' | 'c' | 'd'>, tiempoUsado?: number): Intento => {
  const db = leer();
  const sesion = db.sesiones[intentoId];
  if (!sesion) throw new Error('HTTP_404');
  const previo = db.intentos.find((i) => i.id === intentoId);
  if (previo) return previo; // evita dobles envíos (p. ej. tiempo agotado + clic)
  const ev = listarEvaluaciones().find((e) => e.id === sesion.evaluacionId);
  const banco = new Map(preguntasActuales(db).map((p) => [p.id, p]));
  const puntaje = sesion.preguntaIds.filter((id) => banco.get(id)?.correcta === respuestas[id]).length;
  const nota = notaChilena(sesion.preguntaIds.length ? puntaje / sesion.preguntaIds.length : 0);
  const intento: Intento = {
    id: intentoId,
    userId: sesion.userId,
    evaluacionId: sesion.evaluacionId,
    fecha: new Date().toISOString(),
    respuestas,
    puntaje,
    nota,
    aprobado: nota >= (ev?.notaMinima ?? 4),
    tiempoUsado,
  };
  db.intentos.push(intento);
  guardar(db);
  return intento;
};

export const getResultado = (intentoId: string): ResultadoIntento => {
  const db = leer();
  const intento = db.intentos.find((i) => i.id === intentoId);
  const sesion = db.sesiones[intentoId];
  if (!intento || !sesion) throw new Error('HTTP_404');
  const banco = new Map(preguntasActuales(db).map((p) => [p.id, p]));
  const preguntas = sesion.preguntaIds.map((id) => banco.get(id)).filter((p): p is Pregunta => !!p);
  return { ...intento, preguntas };
};

// --- Asistencia -------------------------------------------------------------
export const getAsistencia = (f: { userId?: string; moduloId?: string } = {}): Asistencia[] =>
  leer().asistencia.filter((a) => (!f.userId || a.userId === f.userId) && (!f.moduloId || a.moduloId === f.moduloId));

export const guardarAsistencia = (registros: Asistencia[]): void => {
  const db = leer();
  for (const r of registros) {
    const i = db.asistencia.findIndex((a) => a.userId === r.userId && a.moduloId === r.moduloId);
    if (i >= 0) db.asistencia[i] = r;
    else db.asistencia.push(r);
  }
  guardar(db);
};

// --- Consultas --------------------------------------------------------------
export const listarConsultas = (f: { userId?: string; moduloId?: string; estado?: Consulta['estado'] } = {}): Consulta[] =>
  leer()
    .consultas.filter((c) => (!f.userId || c.userId === f.userId) && (!f.moduloId || c.moduloId === f.moduloId) && (!f.estado || c.estado === f.estado))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

export const crearConsulta = (data: { userId: string; moduloId: string; pregunta: string }): Consulta => {
  const db = leer();
  const c: Consulta = { ...data, id: idLocal(), fecha: new Date().toISOString(), estado: 'pendiente' };
  db.consultas.push(c);
  guardar(db);
  return c;
};

export const responderConsulta = (id: string, respuesta: string): Consulta => {
  const db = leer();
  const c = db.consultas.find((x) => x.id === id);
  if (!c) throw new Error('HTTP_404');
  c.respuesta = respuesta;
  c.estado = 'respondida';
  guardar(db);
  return c;
};

// --- Proyecto final ---------------------------------------------------------
export const listarEntregas = (userId?: string): EntregaProyecto[] =>
  leer()
    .entregas.filter((e) => !userId || e.userId === userId)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

export const entregarProyecto = (userId: string, archivos: { nombre: string; url: string }[]): EntregaProyecto => {
  const db = leer();
  const e: EntregaProyecto = { id: idLocal(), userId, fecha: new Date().toISOString(), archivos, estado: 'entregado' };
  db.entregas.push(e);
  guardar(db);
  return e;
};

export const calificarEntrega = (id: string, nota: number, comentario: string): EntregaProyecto => {
  const db = leer();
  const e = db.entregas.find((x) => x.id === id);
  if (!e) throw new Error('HTTP_404');
  Object.assign(e, { nota, comentario, estado: 'revisado' as const });
  guardar(db);
  return e;
};

// --- Certificados -----------------------------------------------------------
const mejorNota = (intentos: Intento[], evaluacionId: string): number | null => {
  const ns = intentos.filter((i) => i.evaluacionId === evaluacionId).map((i) => i.nota);
  return ns.length ? Math.max(...ns) : null;
};

/**
 * Elegibilidad en modo local (Formulario de Diseño Curricular):
 * nota mínima 4,0 y asistencia mínima 75%.
 *  - Teoría: promedio de la mejor nota de cada evaluación de módulo y del examen final.
 *  - Proyecto final: si está calificado pondera 30% (teoría 70%).
 *  - Asistencia: registros del relator; si no hay registros se usa el avance del curso online.
 */
export const elegibilidad = (userId: string, cursoId: string): { puede: boolean; razon?: string; asistenciaPromedio: number; notaFinal: number } => {
  const db = leer();
  const evs = listarEvaluaciones().filter((e) => e.tipo === 'modulo' || e.tipo === 'final');
  const intentos = db.intentos.filter((i) => i.userId === userId);
  const notas = evs.map((e) => ({ e, n: mejorNota(intentos, e.id) }));
  const pendientes = notas.filter((x) => x.n === null);
  const teoria = notas.filter((x) => x.n !== null).reduce((a, x) => a + (x.n as number), 0) / (notas.filter((x) => x.n !== null).length || 1);
  const entrega = db.entregas.filter((e) => e.userId === userId).sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
  const notaFinal = Math.round((entrega?.nota !== undefined ? teoria * 0.7 + entrega.nota * 0.3 : teoria) * 10) / 10;
  const regs = db.asistencia.filter((a) => a.userId === userId);
  const asistenciaPromedio = regs.length ? Math.round(regs.reduce((a, r) => a + r.porcentaje, 0) / regs.length) : getProgreso(userId, cursoId).porcentaje;

  let razon: string | undefined;
  if (db.certificados.some((c) => c.userId === userId && c.cursoId === cursoId && c.estado === 'vigente')) razon = 'Ya tienes un certificado vigente.';
  else if (pendientes.length) razon = `Te faltan ${pendientes.length} evaluación(es): ${pendientes.map((p) => p.e.nombre.split(':')[0]).join(', ')}.`;
  else if (!entrega) razon = 'Debes entregar el proyecto final.';
  else if (entrega.nota === undefined) razon = 'Tu proyecto final está pendiente de revisión.';
  else if (notaFinal < 4) razon = `Tu nota final (${notaFinal.toFixed(1)}) es inferior a 4,0.`;
  else if (asistenciaPromedio < 75) razon = `Tu asistencia (${asistenciaPromedio}%) es inferior al 75%.`;
  return { puede: !razon, razon, asistenciaPromedio, notaFinal: pendientes.length === notas.length ? 0 : notaFinal };
};

export const listarCertificados = (userId?: string): Certificado[] => leer().certificados.filter((c) => !userId || c.userId === userId);

export const emitirCertificado = (userId: string, cursoId: string): Certificado => {
  const el = elegibilidad(userId, cursoId);
  if (!el.puede) throw new Error(el.razon ?? 'NO_ELEGIBLE');
  const db = leer();
  const codigo = `CM-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const c: Certificado = {
    id: idLocal(),
    userId,
    cursoId,
    codigoVerificacion: codigo,
    fechaEmision: new Date().toISOString(),
    notaFinal: el.notaFinal,
    horas: getCurso(cursoId).horasTotales,
    estado: 'vigente',
  };
  db.certificados.push(c);
  guardar(db);
  return c;
};

export const anularCertificado = (id: string): void => {
  const db = leer();
  const c = db.certificados.find((x) => x.id === id);
  if (c) c.estado = 'anulado';
  guardar(db);
};

export const verificarCertificado = (codigo: string): (Certificado & { usuario: User; curso: Curso }) | null => {
  const c = leer().certificados.find((x) => x.codigoVerificacion.toUpperCase() === codigo.trim().toUpperCase());
  if (!c) return null;
  const usuario = todosLosUsuarios().find((u) => u.id === c.userId);
  if (!usuario) return null;
  return { ...c, usuario, curso: getCurso(c.cursoId) };
};

// --- Ficha del alumno -------------------------------------------------------
export const getFichaAlumno = (id: string): FichaAlumno => ({
  usuario: getUsuario(id),
  progreso: [getProgreso(id, CURSO.id)],
  intentos: listarIntentos(id),
  asistencia: getAsistencia({ userId: id }),
  entregas: listarEntregas(id),
  certificados: listarCertificados(id),
});

// --- Contenido de las lecciones (editable por el administrador) -------------
export const getContenido = (moduloId: string): ContenidoModulo => {
  const db = leer();
  const editado = db.contenidosEditados[moduloId];
  const base = CONTENIDO_MODULOS[moduloId];
  if (editado) return { ...editado, presentacion: editado.presentacion ?? base?.presentacion ?? [] };
  if (base) return base;
  // Módulo creado desde el panel: contenido vacío a partir de sus lecciones.
  const m = getModulo(moduloId);
  return {
    moduloId,
    introduccion: m.objetivo,
    lecciones: m.lecciones.map((l) => ({ leccionId: l.id, titulo: l.titulo, minutos: 30, bloques: [] })),
    resumen: [],
    laboratorios: [],
  };
};

export const guardarContenido = (moduloId: string, contenido: ContenidoModulo): ContenidoModulo => {
  if (!contenido.lecciones.length) throw new Error('MODULO_SIN_LECCIONES');
  const db = leer();
  // La presentación no se edita en el panel: siempre se usa la generada desde los manuales.
  const { presentacion: _presentacion, ...editable } = contenido;
  db.contenidosEditados[moduloId] = { ...editable, moduloId };
  // Mantiene sincronizadas las lecciones del módulo (avance, índice y evaluaciones).
  const lecciones = contenido.lecciones.map((l, i) => ({ id: l.leccionId, moduloId, titulo: l.titulo, orden: i + 1 }));
  const cambios = { lecciones, contenidos: lecciones.map((l) => l.titulo) };
  const extra = db.modulosExtra.find((m) => m.id === moduloId);
  if (extra) Object.assign(extra, cambios);
  else db.modulosEditados[moduloId] = { ...(db.modulosEditados[moduloId] ?? {}), ...cambios };
  guardar(db);
  return getContenido(moduloId);
};

export const restaurarContenido = (moduloId: string): ContenidoModulo => {
  const db = leer();
  delete db.contenidosEditados[moduloId];
  const ed = db.modulosEditados[moduloId];
  if (ed && CONTENIDO_MODULOS[moduloId]) {
    delete ed.lecciones;
    delete ed.contenidos;
  }
  guardar(db);
  return getContenido(moduloId);
};

// --- Sitio web público ------------------------------------------------------
export const getSitio = (): SiteConfig => completarSitio(leer().sitio);

export const guardarSitio = (sitio: SiteConfig): SiteConfig => {
  const db = leer();
  db.sitio = sitio;
  guardar(db);
  return getSitio();
};

export const restaurarSitio = (): SiteConfig => {
  const db = leer();
  db.sitio = null;
  guardar(db);
  return getSitio();
};

// --- Solicitudes de inscripción (leads de la landing) -----------------------
export const crearSolicitud = (data: Omit<Solicitud, 'id' | 'fecha' | 'estado'>): Solicitud => {
  const db = leer();
  const s: Solicitud = { ...data, id: idLocal(), fecha: new Date().toISOString(), estado: 'nueva' };
  db.solicitudes.push(s);
  guardar(db);
  return s;
};

export const listarSolicitudes = (): Solicitud[] => [...leer().solicitudes].sort((a, b) => b.fecha.localeCompare(a.fecha));

export const editarSolicitud = (id: string, data: Partial<Solicitud>): Solicitud => {
  const db = leer();
  const s = db.solicitudes.find((x) => x.id === id);
  if (!s) throw new Error('HTTP_404');
  Object.assign(s, data, { id });
  guardar(db);
  return s;
};

export const eliminarSolicitud = (id: string): void => {
  const db = leer();
  db.solicitudes = db.solicitudes.filter((s) => s.id !== id);
  guardar(db);
};

// --- Operaciones compuestas (las usan el modo local y el servidor) ---------
export const crearUsuariosMasivo = (
  data: (Partial<User> & { password: string })[],
): { exitosos: User[]; errores: { rut: string; motivo: string }[] } => {
  const exitosos: User[] = [];
  const errores: { rut: string; motivo: string }[] = [];
  for (const d of data) {
    try {
      exitosos.push(crearUsuario(d));
    } catch (e) {
      errores.push({ rut: d.rut ?? '', motivo: e instanceof Error && e.message === 'RUT_DUPLICADO' ? 'RUT duplicado' : 'Datos inválidos' });
    }
  }
  return { exitosos, errores };
};

export const listarTodosCertificados = (): (Certificado & { usuario: User })[] => {
  const usuarios = new Map(todosLosUsuarios().map((u) => [u.id, u]));
  return listarCertificados()
    .filter((c) => usuarios.has(c.userId))
    .map((c) => ({ ...c, usuario: usuarios.get(c.userId)! }));
};

export const getMetricas = (): MetricasAdmin => {
  const alumnos = todosLosUsuarios().filter((u) => u.rol === 'alumno');
  const curso = getCurso(CURSO.id);
  const intentos = todosLosIntentos().filter((i) => alumnos.some((a) => a.id === i.userId));
  const aprobados = intentos.filter((i) => i.aprobado).length;
  const progresos = alumnos.map((a) => getProgreso(a.id, CURSO.id));
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
    certificadosEmitidos: listarCertificados().filter((c) => c.estado === 'vigente').length,
    consultasPendientes: listarConsultas({ estado: 'pendiente' }).length,
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

export const exportarReporte = (tipo: 'notas' | 'avance' | 'asistencia'): Record<string, unknown>[] => {
  const alumnos = todosLosUsuarios().filter((u) => u.rol === 'alumno');
  const nombre = (u: User) => `${u.nombres} ${u.apellidos}`;
  if (tipo === 'notas') {
    const evs = new Map(listarEvaluaciones().map((e) => [e.id, e.nombre]));
    return alumnos.flatMap((a) =>
      listarIntentos(a.id).map((i) => ({
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
      const p = getProgreso(a.id, CURSO.id);
      return { Alumno: nombre(a), RUT: a.rut, 'Avance (%)': p.porcentaje, 'Horas completadas': p.horasCompletadas, 'Lecciones completadas': p.leccionesCompletadas.length };
    });
  }
  const modulos = new Map(getCurso(CURSO.id).modulos.map((m) => [m.id, `M${m.orden} ${m.nombre}`]));
  return getAsistencia().flatMap((r) => {
    const a = alumnos.find((x) => x.id === r.userId);
    return a ? [{ Alumno: nombre(a), RUT: a.rut, Módulo: modulos.get(r.moduloId) ?? r.moduloId, 'Asistencia (%)': r.porcentaje }] : [];
  });
};

/** Dueño de un intento de evaluación (para que el servidor verifique permisos). */
export const duenoIntento = (intentoId: string): string | null => leer().sesiones[intentoId]?.userId ?? null;
