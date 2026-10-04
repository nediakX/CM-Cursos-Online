export type UserRole = 'alumno' | 'admin';

export interface User {
  id: string;
  rut: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: UserRole;
  activo: boolean;
  debeCambiarPassword: boolean;
  cursosAsignados: string[];
  creadoEn: string;
  /** Módulos que el administrador habilitó para el alumno (por defecto sólo el primero). */
  modulosHabilitados?: string[];
  /** El usuario tiene fotografía cargada (se obtiene con getFoto). */
  tieneFoto?: boolean;
  /** Si el alumno debe verificar su rostro al iniciar sesión (por defecto sí). */
  requiereRostro?: boolean;
  /** El alumno ya registró su rostro. */
  rostroRegistrado?: boolean;
  /** Sólo en la sesión actual (login y /auth/me): qué falta respecto del rostro. */
  estadoRostro?: EstadoRostro;
}

export type EstadoRostro = 'no_requerido' | 'registrar' | 'verificar' | 'verificado';

export interface Material {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'docx' | 'pptx' | 'otro';
  url: string;
}

export interface Leccion {
  id: string;
  moduloId: string;
  titulo: string;
  orden: number;
}

export interface Modulo {
  id: string;
  cursoId: string;
  orden: number;
  nombre: string;
  horas: number;
  objetivo: string;
  aprendizajesEsperados: string[];
  contenidos: string[];
  lecciones: Leccion[];
  materiales: Material[];
  tipoEvaluacion: string;
}

// ---------------------------------------------------------------------------
// Contenido interactivo de los módulos (Manual del Alumno)
// ---------------------------------------------------------------------------
export type CalculadoraId =
  | 'ohm'
  | 'resistencias'
  | 'potencia'
  | 'energia'
  | 'conductor'
  | 'caidaTension'
  | 'efectoCorriente'
  | 'wenner'
  | 'gradoIP'
  | 'cuadroCargas'
  | 'motor'
  | 'fotovoltaico'
  | 'presupuesto';

export type BloqueContenido =
  | { tipo: 'texto'; texto: string }
  | { tipo: 'lista'; titulo?: string; items: string[]; estilo?: 'punto' | 'check' | 'numero' }
  | {
      tipo: 'tarjetas';
      titulo?: string;
      instruccion?: string;
      items: { titulo: string; etiqueta?: string; resumen?: string; detalle: string[] }[];
    }
  | { tipo: 'tabla'; titulo?: string; columnas: string[]; filas: string[][]; nota?: string; buscable?: boolean }
  | {
      tipo: 'formula';
      titulo: string;
      expresion: string;
      variables: { simbolo: string; significado: string }[];
      despejes?: string[];
      nota?: string;
    }
  | { tipo: 'ejemplo'; titulo: string; datos: string[]; pasos: { titulo: string; detalle: string }[]; resultado: string }
  | { tipo: 'nota'; variante: 'info' | 'importante' | 'tip' | 'peligro'; titulo?: string; texto: string }
  | { tipo: 'pregunta'; enunciado: string; opciones: string[]; correcta: number; explicacion: string }
  | { tipo: 'calculadora'; calculadora: CalculadoraId }
  | { tipo: 'emparejar'; titulo: string; instruccion?: string; pares: { a: string; b: string }[] }
  | { tipo: 'ordenar'; titulo: string; instruccion?: string; items: string[] }
  | { tipo: 'casos'; titulo?: string; casos: { titulo: string; situacion: string; resultado: string; leccion: string }[] }
  | { tipo: 'checklist'; titulo: string; items: string[] }
  | { tipo: 'video'; url: string; titulo?: string; descripcion?: string }
  | { tipo: 'imagen'; url: string; alt: string; pie?: string };

export interface LeccionContenido {
  leccionId: string;
  titulo: string;
  minutos: number;
  bloques: BloqueContenido[];
}

/** Presentación (diapositivas) de un módulo. */
export interface ItemDiapositiva {
  tipo: 'texto' | 'punto' | 'dato' | 'encabezado' | 'formula';
  texto: string;
}
export interface BloqueDiapositiva {
  subtitulo?: string;
  items: ItemDiapositiva[];
}
export interface Diapositiva {
  tipo: 'portada' | 'contenido' | 'resumen';
  etiqueta?: string;
  titulo: string;
  bloques: BloqueDiapositiva[];
}

export interface ContenidoModulo {
  moduloId: string;
  presentacion?: Diapositiva[];
  introduccion: string;
  lecciones: LeccionContenido[];
  resumen: string[];
  laboratorios: string[];
  taller?: { titulo: string; descripcion: string; entregables: string[] };
}

export interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  horasTotales: number;
  modalidad: string;
  modulos: Modulo[];
}

export type Dificultad = 'baja' | 'media' | 'alta';

export interface Pregunta {
  id: string;
  moduloId: string;
  enunciado: string;
  alternativas: { a: string; b: string; c: string; d: string };
  correcta: 'a' | 'b' | 'c' | 'd';
  explicacion: string;
  dificultad: Dificultad;
}

export type TipoEvaluacion = 'diagnostica' | 'modulo' | 'parcial' | 'simulador_sec' | 'final';

export interface Evaluacion {
  id: string;
  moduloId: string | null;
  /** Para evaluaciones que abarcan varios módulos (p. ej. examen parcial). */
  moduloIds?: string[];
  tipo: TipoEvaluacion;
  nombre: string;
  cantidadPreguntas: number;
  tiempoMinutos: number;
  notaMinima: number;
}

export interface Intento {
  id: string;
  userId: string;
  evaluacionId: string;
  fecha: string;
  respuestas: Record<string, 'a' | 'b' | 'c' | 'd'>;
  puntaje: number;
  nota: number;
  aprobado: boolean;
  tiempoUsado?: number;
}

export interface Progreso {
  userId: string;
  cursoId: string;
  leccionesCompletadas: string[];
  porcentaje: number;
  horasCompletadas: number;
}

export interface Asistencia {
  userId: string;
  moduloId: string;
  porcentaje: number;
}

export interface Consulta {
  id: string;
  userId: string;
  moduloId: string;
  pregunta: string;
  respuesta?: string;
  fecha: string;
  estado: 'pendiente' | 'respondida';
}

export interface EntregaProyecto {
  id: string;
  userId: string;
  fecha: string;
  archivos: { nombre: string; url: string }[];
  estado: 'entregado' | 'revisado';
  nota?: number;
  comentario?: string;
}

export interface Certificado {
  id: string;
  userId: string;
  cursoId: string;
  codigoVerificacion: string;
  fechaEmision: string;
  notaFinal: number;
  horas: number;
  estado: 'vigente' | 'anulado';
}

export interface PreguntaIntento extends Pregunta {
  correcta: 'a' | 'b' | 'c' | 'd';
}

export interface PreguntaSinRespuesta {
  id: string;
  moduloId: string;
  enunciado: string;
  alternativas: { a: string; b: string; c: string; d: string };
  dificultad: Dificultad;
}

export interface ResultadoIntento extends Intento {
  preguntas: Pregunta[];
}

export interface FichaAlumno {
  usuario: User;
  progreso: Progreso[];
  intentos: Intento[];
  asistencia: Asistencia[];
  entregas: EntregaProyecto[];
  certificados: Certificado[];
}

export interface MetricasAdmin {
  totalAlumnos: number;
  alumnosActivos: number;
  promedioAvance: number;
  tasaAprobacion: number;
  certificadosEmitidos: number;
  consultasPendientes: number;
  avancePorModulo: { modulo: string; promedio: number }[];
  aprobadosVsReprobados: { nombre: string; valor: number }[];
  alumnosPorMes: { mes: string; cantidad: number }[];
}

// ---------------------------------------------------------------------------
// Sitio web público (landing) — editable por el administrador
// ---------------------------------------------------------------------------
export type SeccionLandingId =
  | 'beneficios'
  | 'temario'
  | 'metodologia'
  | 'instructor'
  | 'testimonios'
  | 'precios'
  | 'faq'
  | 'inscripcion';

export interface ItemIcono {
  icono: string; // nombre de un ícono de la lista ICONOS_DISPONIBLES
  titulo: string;
  texto: string;
}

export interface Testimonio {
  nombre: string;
  cargo: string;
  texto: string;
  fotoUrl?: string;
}

export interface PlanPrecio {
  id: string;
  nombre: string;
  precio: string; // texto libre: "$249.000"
  precioAnterior?: string;
  periodo?: string; // "pago único", "3 cuotas sin interés"
  descripcion: string;
  caracteristicas: string[];
  destacado: boolean;
  textoBoton: string;
  /** Link de pago (Webpay, Mercado Pago, Flow…). Si está vacío, el botón abre el formulario de inscripción. */
  urlPago?: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export interface SiteConfig {
  marca: {
    nombre: string;
    subtitulo: string;
    logoUrl: string;
    colorPrimario: string;
    colorAcento: string;
  };
  seo: { titulo: string; descripcion: string };
  anuncio: { activo: boolean; texto: string; enlace?: string };
  hero: {
    etiqueta: string;
    titulo: string;
    tituloDestacado: string;
    subtitulo: string;
    ctaPrincipal: string;
    ctaSecundario: string;
    imagenUrl: string;
    puntos: string[];
    estadisticas: { valor: string; etiqueta: string }[];
  };
  secciones: { id: SeccionLandingId; visible: boolean; titulo: string; subtitulo: string }[];
  beneficios: ItemIcono[];
  metodologia: ItemIcono[];
  instructor: { nombre: string; cargo: string; bio: string; fotoUrl: string; credenciales: string[] };
  testimonios: Testimonio[];
  planes: PlanPrecio[];
  garantia: string;
  faq: PreguntaFrecuente[];
  inscripcion: { titulo: string; texto: string; textoBoton: string; mensajeExito: string; pedirRut: boolean };
  contacto: {
    email: string;
    telefono: string;
    whatsapp: string; // solo dígitos con código país: 56912345678
    mensajeWhatsapp: string;
    direccion: string;
    horario: string;
    botonWhatsappFlotante: boolean;
  };
  redes: { facebook: string; instagram: string; linkedin: string; youtube: string; tiktok: string };
  pie: { texto: string };
}

export type EstadoSolicitud = 'nueva' | 'contactada' | 'inscrita' | 'descartada';

/** Solicitud de inscripción enviada desde la landing. */
export interface Solicitud {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  telefono: string;
  rut?: string;
  planId?: string;
  mensaje?: string;
  estado: EstadoSolicitud;
  notas?: string;
  userId?: string; // cuenta creada a partir de la solicitud
}
