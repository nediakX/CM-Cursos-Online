import type { Curso, Evaluacion, Modulo } from '../types';
import { CONTENIDO_MODULOS } from './modulos/index.js';

/**
 * Datos del curso. Las lecciones y contenidos de cada módulo se derivan del
 * contenido interactivo (src/data/modulos), de modo que nunca quedan desfasados.
 * Horas y objetivos son valores iniciales: edítalos desde el panel de administración.
 */
const META: { nombre: string; objetivo: string; aprendizajesEsperados: string[] }[] = [
  {
    "nombre": "Legislación Eléctrica y SEC",
    "objetivo": "Comprender el marco legal que regula las instalaciones eléctricas en Chile: organismos del sector, Decreto Supremo N°8, licencias SEC, Reglamentos Técnicos RIC y declaración TE1.",
    "aprendizajesEsperados": [
      "Identificar la estructura normativa del sector eléctrico chileno.",
      "Interpretar los Reglamentos Técnicos SEC aplicables.",
      "Reconocer responsabilidades legales del instalador eléctrico."
    ]
  },
  {
    "nombre": "Fundamentos de Electricidad Aplicada",
    "objetivo": "Comprender los principios fundamentales de la electricidad, aplicar la Ley de Ohm, calcular potencia monofásica y trifásica y analizar circuitos serie, paralelo y mixtos.",
    "aprendizajesEsperados": [
      "Aplicar principios fundamentales de electricidad.",
      "Resolver circuitos eléctricos básicos.",
      "Calcular potencia, energía y factor de potencia."
    ]
  },
  {
    "nombre": "Conductores Eléctricos, Canalizaciones y Alimentadores",
    "objetivo": "Seleccionar, dimensionar e instalar conductores eléctricos, canalizaciones y alimentadores conforme al Decreto Supremo N°8, RIC 03 y RIC 04.",
    "aprendizajesEsperados": [
      "Seleccionar conductores y canalizaciones según normativa.",
      "Calcular ampacidad, factores de corrección y caída de tensión.",
      "Diseñar alimentadores."
    ]
  },
  {
    "nombre": "Puesta a Tierra y Protección Contra Tensiones Peligrosas",
    "objetivo": "Diseñar, construir, medir y verificar sistemas de puesta a tierra y protecciones contra tensiones peligrosas, aplicando el Decreto Supremo N°8, RIC 05 y RIC 06.",
    "aprendizajesEsperados": [
      "Diseñar sistemas de puesta a tierra.",
      "Aplicar criterios de protección contra contactos eléctricos.",
      "Seleccionar diferenciales y DPS."
    ]
  },
  {
    "nombre": "Tableros Eléctricos (RIC 02)",
    "objetivo": "Diseñar, construir, seleccionar, instalar e inspeccionar tableros eléctricos de baja tensión conforme al Decreto Supremo N°8 y RIC 02.",
    "aprendizajesEsperados": [
      "Diseñar y montar tableros eléctricos conforme al RIC 02.",
      "Seleccionar protecciones y aplicar corte omnipolar.",
      "Interpretar grados IP e IK y elaborar diagramas unilineales."
    ]
  },
  {
    "nombre": "Empalmes y Alimentadores",
    "objetivo": "Diseñar, dimensionar e instalar empalmes y alimentadores eléctricos de baja tensión conforme al Decreto Supremo N°8, RIC 01 y RIC 03.",
    "aprendizajesEsperados": [
      "Identificar tipos de empalmes y acometidas.",
      "Calcular demanda máxima y dimensionar alimentadores.",
      "Elaborar documentación TE1."
    ]
  },
  {
    "nombre": "Instalaciones Eléctricas Domiciliarias",
    "objetivo": "Diseñar, calcular, ejecutar y verificar instalaciones eléctricas residenciales de baja tensión conforme al Decreto Supremo N°8 y RIC 10.",
    "aprendizajesEsperados": [
      "Ejecutar instalaciones residenciales conforme a normativa.",
      "Elaborar cuadros de carga y seleccionar protecciones.",
      "Elaborar planos y memorias de cálculo."
    ]
  },
  {
    "nombre": "Instalaciones Eléctricas Industriales",
    "objetivo": "Diseñar, instalar, operar y mantener sistemas eléctricos industriales, seleccionando motores, protecciones, sistemas de control y alimentadores.",
    "aprendizajesEsperados": [
      "Implementar sistemas eléctricos industriales.",
      "Diseñar sistemas de partida de motores.",
      "Diseñar CCM y dimensionar alimentadores industriales."
    ]
  },
  {
    "nombre": "Sistemas Fotovoltaicos y Generación Distribuida",
    "objetivo": "Diseñar, dimensionar, instalar y mantener sistemas fotovoltaicos residenciales e industriales, aplicando normativa SEC, seguridad eléctrica y eficiencia energética.",
    "aprendizajesEsperados": [
      "Diseñar sistemas solares conectados y aislados de red.",
      "Seleccionar paneles, inversores y protecciones FV.",
      "Aplicar Net Billing (Ley 20.571)."
    ]
  },
  {
    "nombre": "AutoCAD Eléctrico, Elaboración de Proyectos y Proyecto Final Integrador",
    "objetivo": "Elaborar planos eléctricos profesionales, memorias de cálculo, documentación técnica, presupuestos y proyectos completos conforme a los requisitos SEC y RIC 18.",
    "aprendizajesEsperados": [
      "Elaborar planos y documentación técnica.",
      "Elaborar memorias de cálculo, presupuestos y TE1.",
      "Integrar competencias en un proyecto completo."
    ]
  }
];

const modulos: Modulo[] = META.map((m, i) => {
  const id = `mod-${i + 1}`;
  const contenido = CONTENIDO_MODULOS[id];
  const lecciones = contenido.lecciones.map((l, j) => ({ id: l.leccionId, moduloId: id, titulo: l.titulo, orden: j + 1 }));
  return {
    id,
    cursoId: 'curso-1',
    orden: i + 1,
    nombre: m.nombre,
    horas: 24,
    objetivo: m.objetivo,
    aprendizajesEsperados: m.aprendizajesEsperados,
    contenidos: lecciones.map((l) => l.titulo),
    lecciones,
    materiales: [],
    tipoEvaluacion: 'Evaluación de módulo',
  };
});

export const CURSO: Curso = {
  id: 'curso-1',
  nombre: 'Instalador Eléctrico Clase D SEC + Especialización Fotovoltaica',
  descripcion:
    'Formación para diseñar, ejecutar, inspeccionar y mantener instalaciones eléctricas de baja tensión conforme a la normativa SEC vigente, con especialización en sistemas fotovoltaicos. Preparación para el examen de Licencia SEC Clase D.',
  horasTotales: 240,
  modalidad: 'Online',
  modulos,
};

export const EVALUACIONES: Evaluacion[] = [
 {
  "id": "eval-diagnostica",
  "moduloId": null,
  "tipo": "diagnostica",
  "nombre": "Evaluación diagnóstica",
  "cantidadPreguntas": 50,
  "tiempoMinutos": 75,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-1",
  "moduloId": "mod-1",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 1: Legislación Eléctrica y SEC",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-2",
  "moduloId": "mod-2",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 2: Fundamentos de Electricidad Aplicada",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-3",
  "moduloId": "mod-3",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 3: Conductores Eléctricos, Canalizaciones y Alimentadores",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-4",
  "moduloId": "mod-4",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 4: Puesta a Tierra y Protección Contra Tensiones Peligrosas",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-5",
  "moduloId": "mod-5",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 5: Tableros Eléctricos (RIC 02)",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-6",
  "moduloId": "mod-6",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 6: Empalmes y Alimentadores",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-7",
  "moduloId": "mod-7",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 7: Instalaciones Eléctricas Domiciliarias",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-8",
  "moduloId": "mod-8",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 8: Instalaciones Eléctricas Industriales",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-9",
  "moduloId": "mod-9",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 9: Sistemas Fotovoltaicos y Generación Distribuida",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-modulo-10",
  "moduloId": "mod-10",
  "tipo": "modulo",
  "nombre": "Evaluación Módulo 10: AutoCAD Eléctrico, Elaboración de Proyectos y Proyecto Final Integrador",
  "cantidadPreguntas": 20,
  "tiempoMinutos": 30,
  "notaMinima": 4.0
 },
 {
  "id": "eval-parcial",
  "moduloId": null,
  "moduloIds": ["mod-1", "mod-2", "mod-3", "mod-4", "mod-5"],
  "tipo": "parcial",
  "nombre": "Examen Parcial (Módulos 1 al 5)",
  "cantidadPreguntas": 100,
  "tiempoMinutos": 150,
  "notaMinima": 4.0
 },
 {
  "id": "eval-simulador-1",
  "moduloId": null,
  "tipo": "simulador_sec",
  "nombre": "Simulador SEC 1",
  "cantidadPreguntas": 50,
  "tiempoMinutos": 75,
  "notaMinima": 4.0
 },
 {
  "id": "eval-simulador-2",
  "moduloId": null,
  "tipo": "simulador_sec",
  "nombre": "Simulador SEC 2",
  "cantidadPreguntas": 100,
  "tiempoMinutos": 150,
  "notaMinima": 4.0
 },
 {
  "id": "eval-simulador-3",
  "moduloId": null,
  "tipo": "simulador_sec",
  "nombre": "Simulador SEC 3",
  "cantidadPreguntas": 150,
  "tiempoMinutos": 225,
  "notaMinima": 4.0
 },
 {
  "id": "eval-final",
  "moduloId": null,
  "tipo": "final",
  "nombre": "Examen Final",
  "cantidadPreguntas": 120,
  "tiempoMinutos": 180,
  "notaMinima": 4.0
 }
];
