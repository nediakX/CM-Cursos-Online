import type { SiteConfig } from '../types';

/**
 * Configuración inicial del sitio público (landing) y de la marca.
 * Todo esto se edita desde el panel: Administración → Sitio web.
 * Estos valores sólo se usan mientras el administrador no haya guardado cambios.
 */
export const SITIO_POR_DEFECTO: SiteConfig = {
  marca: {
    nombre: 'CM Ingenierías',
    subtitulo: 'Corporativas SpA',
    logoUrl: '',
    colorPrimario: '#0B2545',
    colorAcento: '#F5A623',
  },
  seo: {
    titulo: 'Curso Instalador Eléctrico Clase D SEC + Fotovoltaica | CM Ingenierías',
    descripcion:
      'Prepárate para la Licencia SEC Clase D con un curso online de 240 horas: normativa RIC, cálculos, tableros, puesta a tierra y sistemas fotovoltaicos. Simuladores de examen y certificado verificable.',
  },
  anuncio: {
    activo: false,
    texto: '',
    enlace: '#inscripcion',
  },
  hero: {
    etiqueta: 'Preparación Licencia SEC Clase D',
    titulo: 'Conviértete en Instalador Eléctrico',
    tituloDestacado: 'certificado y con futuro solar',
    subtitulo:
      'Un programa online de 240 horas para diseñar, ejecutar e inspeccionar instalaciones de baja tensión según el Decreto Supremo N°8 y los RIC, con especialización en sistemas fotovoltaicos.',
    ctaPrincipal: 'Quiero inscribirme',
    ctaSecundario: 'Ver temario',
    imagenUrl: '',
    puntos: ['Plataforma disponible las 24 horas', 'Simuladores del examen SEC', 'Certificado con código de verificación'],
    estadisticas: [
      { valor: '240 h', etiqueta: 'de formación' },
      { valor: '10', etiqueta: 'módulos prácticos' },
      { valor: '590+', etiqueta: 'preguntas de práctica' },
      { valor: '3', etiqueta: 'simuladores SEC' },
    ],
  },
  secciones: [
    { id: 'beneficios', visible: true, titulo: 'Todo lo que necesitas para aprobar y trabajar', subtitulo: 'Formación pensada para el examen SEC y para el trabajo real en terreno.' },
    { id: 'temario', visible: true, titulo: 'Temario del curso', subtitulo: 'Diez módulos que van desde la legislación hasta tu proyecto final integrador.' },
    { id: 'metodologia', visible: true, titulo: 'Cómo funciona', subtitulo: 'Un camino claro, paso a paso, desde la inscripción hasta tu certificado.' },
    { id: 'instructor', visible: true, titulo: 'Quién te enseña', subtitulo: 'Aprende con experiencia real en terreno.' },
    { id: 'testimonios', visible: false, titulo: 'Lo que dicen nuestros alumnos', subtitulo: 'Experiencias reales de quienes ya se formaron con nosotros.' },
    { id: 'precios', visible: true, titulo: 'Elige tu plan', subtitulo: 'Invierte en una profesión con alta demanda.' },
    { id: 'faq', visible: true, titulo: 'Preguntas frecuentes', subtitulo: '¿Tienes dudas? Aquí respondemos las más comunes.' },
    { id: 'inscripcion', visible: true, titulo: 'Reserva tu cupo', subtitulo: '' },
  ],
  beneficios: [
    { icono: 'BookOpen', titulo: 'Contenido interactivo', texto: 'Lecciones con ejemplos resueltos, ejercicios, casos reales y autoevaluaciones en cada módulo.' },
    { icono: 'Calculator', titulo: 'Calculadoras técnicas', texto: 'Ley de Ohm, caída de tensión, conductores, puesta a tierra, cuadro de cargas, fotovoltaico y más.' },
    { icono: 'ClipboardCheck', titulo: 'Simuladores del examen SEC', texto: 'Practica con cientos de preguntas y simuladores cronometrados como el examen real.' },
    { icono: 'Sun', titulo: 'Especialización fotovoltaica', texto: 'Diseña sistemas solares on-grid y off-grid y aprende Net Billing (Ley 20.571).' },
    { icono: 'MessageCircle', titulo: 'Consultas al instructor', texto: 'Envía tus dudas desde cada módulo y recibe respuesta del equipo docente.' },
    { icono: 'Award', titulo: 'Certificado verificable', texto: 'Al aprobar recibes un certificado con código único que cualquiera puede validar en línea.' },
  ],
  metodologia: [
    { icono: 'UserPlus', titulo: 'Inscríbete', texto: 'Completa el formulario o elige tu plan. Te contactamos para activar tu acceso.' },
    { icono: 'MonitorPlay', titulo: 'Estudia online', texto: 'Avanza por los módulos a tu ritmo, desde el computador o el celular.' },
    { icono: 'ClipboardCheck', titulo: 'Practica y evalúa', texto: 'Rinde las evaluaciones de cada módulo y entrena con los simuladores SEC.' },
    { icono: 'Award', titulo: 'Certifícate', texto: 'Entrega tu proyecto final, aprueba y descarga tu certificado.' },
  ],
  instructor: {
    nombre: 'Carlos Moll Gallardo',
    cargo: 'Técnico Superior en Electricidad y Electrónica · Supervisor eléctrico',
    bio: 'Técnico Superior en Electricidad y Electrónica, en proceso de estudios de Ingeniería en Electricidad y Electrónica en la Universidad Andrés Bello. Se ha desempeñado como supervisor eléctrico en proyectos de energía renovable e industriales, entre ellos la construcción de la planta solar Azabache (EPC y O&M) y obras de remodelación en el Aeropuerto Arturo Merino Benítez, y como técnico eléctrico en minería (DISAL – Codelco). Tiene experiencia en desarrollo de proyectos eléctricos e instrumentación, y en mantenimiento preventivo, predictivo y correctivo. Diseñó este programa a partir de su trabajo en terreno.',
    fotoUrl: '',
    credenciales: [
      'Técnico Superior en Electricidad y Electrónica',
      'Supervisión de obras eléctricas',
      'Plantas fotovoltaicas (EPC y O&M)',
      'Electricidad en minería',
      'Proyectos eléctricos e instrumentación',
      'Mantenimiento preventivo y predictivo',
    ],
  },
  testimonios: [],
  planes: [
    {
      id: 'plan-abierto',
      nombre: 'Modalidad Abierta',
      precio: '$890.000',
      precioAnterior: '',
      periodo: 'por participante',
      descripcion: 'Inscripción individual al programa completo de 240 horas.',
      caracteristicas: ['10 módulos · 240 horas', 'Calculadoras y ejercicios interactivos', 'Simuladores del examen SEC', 'Proyecto final integrador', 'Certificado verificable'],
      destacado: true,
      textoBoton: 'Inscribirme',
      urlPago: '',
    },
    {
      id: 'plan-empresa',
      nombre: 'Modalidad Empresa',
      precio: '$1.450.000',
      precioAnterior: '',
      periodo: 'por participante',
      descripcion: 'Capacitación para equipos de trabajo de tu empresa.',
      caracteristicas: ['Todo lo de la Modalidad Abierta', 'Grupo cerrado para tu empresa', 'Seguimiento del avance de cada participante', 'Reportes de notas y asistencia'],
      destacado: false,
      textoBoton: 'Cotizar para mi empresa',
      urlPago: '',
    },
  ],
  garantia: 'Si tienes dudas antes de inscribirte, escríbenos y te asesoramos sin compromiso.',
  faq: [
    { pregunta: '¿Necesito experiencia previa?', respuesta: 'No. El curso está pensado para personas con enseñanza media completa, técnicos, maestros eléctricos y estudiantes del área. Partimos desde los fundamentos.' },
    { pregunta: '¿El curso me prepara para el examen de la SEC?', respuesta: 'Sí. Todo el temario está alineado con el Decreto Supremo N°8 y los Reglamentos RIC, y cuentas con simuladores de examen para practicar.' },
    { pregunta: '¿Cuánto tiempo tengo para terminarlo?', respuesta: 'El programa equivale a 240 horas cronológicas en 10 módulos. El relator habilita cada módulo a medida que apruebas la evaluación del anterior.' },
    { pregunta: '¿Cómo obtengo mi certificado?', respuesta: 'Debes aprobar las evaluaciones con nota mínima 4,0, entregar el proyecto final y cumplir al menos 75% de asistencia. El certificado incluye un código verificable en línea.' },
    { pregunta: '¿En qué podré trabajar al terminar?', respuesta: 'Como instalador eléctrico domiciliario o comercial, técnico de mantenimiento eléctrico, montajista eléctrico industrial, técnico fotovoltaico, ayudante de proyectos eléctricos o emprendedor de servicios eléctricos, entre otros. También quedas preparado para postular a la Licencia SEC Clase D.' },
    { pregunta: '¿En qué consiste el proyecto final?', respuesta: 'Diseñas una instalación completa a elección: una vivienda de 150 m², una pequeña industria o un sistema solar de 10 kW. Incluye memoria de cálculo, planos, diagrama unilineal, cálculo de conductores, protecciones, puesta a tierra y presupuesto.' },
    { pregunta: '¿Tienen modalidad para empresas?', respuesta: 'Sí. La Modalidad Empresa está pensada para capacitar equipos de trabajo. Escríbenos para coordinar grupo, fechas y cotización.' },
    { pregunta: '¿Puedo estudiar desde el celular?', respuesta: 'Sí. La plataforma funciona en computador, tablet y celular.' },
  ],
  inscripcion: {
    titulo: 'Reserva tu cupo hoy',
    texto: 'Déjanos tus datos y te contactaremos para resolver tus dudas y activar tu acceso. Sin compromiso.',
    textoBoton: 'Enviar solicitud',
    mensajeExito: '¡Gracias! Recibimos tu solicitud. Te contactaremos a la brevedad.',
    pedirRut: true,
  },
  contacto: {
    email: '',
    telefono: '',
    whatsapp: '',
    mensajeWhatsapp: 'Hola, quiero información sobre el curso de Instalador Eléctrico Clase D.',
    direccion: '',
    horario: 'Lunes a viernes, 9:00 a 18:00',
    botonWhatsappFlotante: true,
  },
  redes: { facebook: '', instagram: '', linkedin: '', youtube: '', tiktok: '' },
  pie: { texto: 'Formación técnica en electricidad y energías renovables.' },
};

/** Fusiona una configuración guardada con los valores por defecto (tolera versiones antiguas). */
export function completarSitio(guardado: Partial<SiteConfig> | null | undefined): SiteConfig {
  const d = SITIO_POR_DEFECTO;
  if (!guardado) return structuredClone(d);
  const g = guardado as Partial<SiteConfig>;
  // Secciones: respeta el orden guardado y agrega las nuevas que falten.
  const secciones = [
    ...(g.secciones ?? []).filter((s) => d.secciones.some((x) => x.id === s.id)),
    ...d.secciones.filter((s) => !(g.secciones ?? []).some((x) => x.id === s.id)),
  ];
  return {
    ...structuredClone(d),
    ...g,
    marca: { ...d.marca, ...g.marca },
    seo: { ...d.seo, ...g.seo },
    anuncio: { ...d.anuncio, ...g.anuncio },
    hero: { ...d.hero, ...g.hero },
    secciones,
    instructor: { ...d.instructor, ...g.instructor },
    inscripcion: { ...d.inscripcion, ...g.inscripcion },
    contacto: { ...d.contacto, ...g.contacto },
    redes: { ...d.redes, ...g.redes },
    pie: { ...d.pie, ...g.pie },
  };
}

/** Lista de cosas que el administrador aún no ha personalizado (se muestra en el panel). */
export function pendientesSitio(s: SiteConfig): string[] {
  const p: string[] = [];
  if (s.planes.some((x) => /^\$?0[0.]*$/.test(x.precio.replace(/\s/g, '')))) p.push('Define los precios de tus planes');
  if (!s.contacto.whatsapp && !s.contacto.telefono) p.push('Agrega un WhatsApp o teléfono de contacto');
  if (s.secciones.find((x) => x.id === 'instructor')?.visible === false) p.push('Completa y activa la sección "Quién te enseña"');
  if (s.secciones.find((x) => x.id === 'testimonios')?.visible === false) p.push('Agrega testimonios reales y activa la sección');
  return p;
}
