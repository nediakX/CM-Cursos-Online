import type { Pregunta } from '../types';

/**
 * Banco oficial de preguntas — extraído de los documentos "MODULO_ALUMNO_1..10" y "MODULO_1".
 * dificultad: Básico → baja · Intermedio → media · Avanzado → alta.
 */
export const PREGUNTAS: Pregunta[] = [
 {
  "id": "p-m1-011",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál de las siguientes licencias SEC posee mayores atribuciones profesionales?",
  "alternativas": {
   "a": "Clase D",
   "b": "Clase C",
   "c": "Clase B",
   "d": "Clase A"
  },
  "correcta": "d",
  "explicacion": "La Clase A corresponde al nivel más alto de atribuciones para instalaciones eléctricas. Referencia: SEC.",
  "dificultad": "media"
 },
 {
  "id": "p-m1-012",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es la finalidad principal de una fiscalización SEC?",
  "alternativas": {
   "a": "Cobrar impuestos",
   "b": "Verificar cumplimiento normativo",
   "c": "Realizar mantenciones",
   "d": "Ejecutar proyectos"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Verificar cumplimiento normativo».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-013",
  "moduloId": "mod-1",
  "enunciado": "¿Qué documento acredita la autorización para ejercer como instalador eléctrico?",
  "alternativas": {
   "a": "Licencia SEC",
   "b": "TE1",
   "c": "Certificado Municipal",
   "d": "Contrato Eléctrico"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Licencia SEC».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-014",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál de las siguientes acciones puede realizar la SEC?",
  "alternativas": {
   "a": "Aplicar sanciones",
   "b": "Fiscalizar instalaciones",
   "c": "Revisar declaraciones",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-015",
  "moduloId": "mod-1",
  "enunciado": "¿Qué reglamento regula la presentación de proyectos eléctricos?",
  "alternativas": {
   "a": "RIC 10",
   "b": "RIC 15",
   "c": "RIC 18",
   "d": "RIC 19"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 18».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-016",
  "moduloId": "mod-1",
  "enunciado": "¿Qué reglamento regula la puesta en servicio de instalaciones?",
  "alternativas": {
   "a": "RIC 17",
   "b": "RIC 18",
   "c": "RIC 19",
   "d": "RIC 02"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 19».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-017",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es la función principal del RIC 10?",
  "alternativas": {
   "a": "Empalmes",
   "b": "Instalaciones de uso general",
   "c": "Vehículos eléctricos",
   "d": "Subestaciones"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Instalaciones de uso general».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-018",
  "moduloId": "mod-1",
  "enunciado": "¿Qué organismo recibe las declaraciones TE1?",
  "alternativas": {
   "a": "Municipalidad",
   "b": "SEC",
   "c": "Distribuidora",
   "d": "CNE"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «SEC».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-019",
  "moduloId": "mod-1",
  "enunciado": "¿Quién es responsable de mantener una instalación en condiciones seguras?",
  "alternativas": {
   "a": "SEC",
   "b": "Distribuidora",
   "c": "Propietario",
   "d": "Constructor"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Propietario».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-020",
  "moduloId": "mod-1",
  "enunciado": "¿Qué documento técnico normalmente acompaña una declaración TE1?",
  "alternativas": {
   "a": "Memoria de cálculo",
   "b": "Escritura",
   "c": "Certificado de dominio",
   "d": "Permiso de circulación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Memoria de cálculo».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-021",
  "moduloId": "mod-1",
  "enunciado": "Si una instalación presenta riesgo inminente para las personas, la SEC puede:",
  "alternativas": {
   "a": "Ignorar la situación",
   "b": "Ordenar correcciones",
   "c": "Suspender el suministro",
   "d": "B y C son correctas"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «B y C son correctas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-022",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el objetivo principal de los Reglamentos Técnicos RIC?",
  "alternativas": {
   "a": "Definir tarifas eléctricas",
   "b": "Establecer requisitos técnicos de seguridad",
   "c": "Autorizar medidores",
   "d": "Regular combustibles"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Establecer requisitos técnicos de seguridad».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-023",
  "moduloId": "mod-1",
  "enunciado": "¿Qué ocurre si una declaración TE1 contiene información falsa?",
  "alternativas": {
   "a": "No ocurre nada",
   "b": "Puede generar sanciones al instalador",
   "c": "Se corrige automáticamente",
   "d": "Es responsabilidad exclusiva del propietario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Puede generar sanciones al instalador».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-024",
  "moduloId": "mod-1",
  "enunciado": "¿Qué principio fundamental persigue el DS N°8?",
  "alternativas": {
   "a": "Reducir costos",
   "b": "Maximizar consumo",
   "c": "Garantizar seguridad de personas y bienes",
   "d": "Simplificar proyectos"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Garantizar seguridad de personas y bienes».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-025",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el propósito de la trazabilidad documental exigida por SEC?",
  "alternativas": {
   "a": "Registrar antecedentes técnicos",
   "b": "Control tributario",
   "c": "Gestión municipal",
   "d": "Control comercial"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Registrar antecedentes técnicos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-026",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es la principal responsabilidad técnica de un instalador autorizado?",
  "alternativas": {
   "a": "Vender materiales",
   "b": "Ejecutar instalaciones conforme a normativa",
   "c": "Cobrar cuentas",
   "d": "Fiscalizar terceros"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Ejecutar instalaciones conforme a normativa».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-027",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC aborda infraestructura de recarga para vehículos eléctricos?",
  "alternativas": {
   "a": "RIC 10",
   "b": "RIC 12",
   "c": "RIC 15",
   "d": "RIC 19"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 15».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-028",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC regula sistemas de autogeneración?",
  "alternativas": {
   "a": "RIC 09",
   "b": "RIC 06",
   "c": "RIC 02",
   "d": "RIC 18"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «RIC 09».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-029",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC regula subestaciones y salas eléctricas?",
  "alternativas": {
   "a": "RIC 07",
   "b": "RIC 13",
   "c": "RIC 15",
   "d": "RIC 16"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «RIC 13».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-030",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC regula eficiencia energética?",
  "alternativas": {
   "a": "RIC 08",
   "b": "RIC 11",
   "c": "RIC 14",
   "d": "RIC 18"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 14».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-031",
  "moduloId": "mod-1",
  "enunciado": "¿Qué licencia está orientada principalmente a instalaciones domiciliarias?",
  "alternativas": {
   "a": "Clase A",
   "b": "Clase B",
   "c": "Clase C",
   "d": "Clase D"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Clase D».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-032",
  "moduloId": "mod-1",
  "enunciado": "¿Qué institución fiscaliza instalaciones de combustibles?",
  "alternativas": {
   "a": "SEC",
   "b": "SENCE",
   "c": "MINVU",
   "d": "CNE"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «SEC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-033",
  "moduloId": "mod-1",
  "enunciado": "¿Qué significa RIC?",
  "alternativas": {
   "a": "Reglamento Industrial Chileno",
   "b": "Reglamento de Instalaciones de Consumo",
   "c": "Registro Industrial Comercial",
   "d": "Reglamento Interior Constructivo"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Reglamento de Instalaciones de Consumo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-034",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el principal objetivo de una licencia SEC?",
  "alternativas": {
   "a": "Autorizar competencia técnica",
   "b": "Cobrar impuestos",
   "c": "Registrar empresas",
   "d": "Comprar materiales"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Autorizar competencia técnica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-035",
  "moduloId": "mod-1",
  "enunciado": "¿Qué entidad planifica el desarrollo energético nacional?",
  "alternativas": {
   "a": "SEC",
   "b": "CNE",
   "c": "ACHS",
   "d": "SII"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «CNE».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-036",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC regula la operación y mantenimiento de instalaciones?",
  "alternativas": {
   "a": "RIC 17",
   "b": "RIC 16",
   "c": "RIC 15",
   "d": "RIC 13"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «RIC 17».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-037",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC regula instalaciones especiales?",
  "alternativas": {
   "a": "RIC 11",
   "b": "RIC 07",
   "c": "RIC 03",
   "d": "RIC 01"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «RIC 11».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-038",
  "moduloId": "mod-1",
  "enunciado": "¿Qué RIC regula instalaciones en ambientes explosivos?",
  "alternativas": {
   "a": "RIC 10",
   "b": "RIC 12",
   "c": "RIC 14",
   "d": "RIC 16"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «RIC 12».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-039",
  "moduloId": "mod-1",
  "enunciado": "¿Qué debe hacer un instalador al detectar una condición insegura?",
  "alternativas": {
   "a": "Ignorarla",
   "b": "Informar y corregir",
   "c": "Energizar igualmente",
   "d": "Ocultarla"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Informar y corregir».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-040",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es la finalidad de una memoria técnica?",
  "alternativas": {
   "a": "Justificar técnicamente el proyecto",
   "b": "Registrar trabajadores",
   "c": "Solicitar financiamiento",
   "d": "Comprar equipos"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Justificar técnicamente el proyecto».",
  "dificultad": "media"
 },
 {
  "id": "p-m1-041",
  "moduloId": "mod-1",
  "enunciado": "¿Quién responde ante SEC por errores de diseño declarados en TE1?",
  "alternativas": {
   "a": "Propietario",
   "b": "Distribuidora",
   "c": "Instalador autorizado",
   "d": "Fabricante"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Instalador autorizado».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-042",
  "moduloId": "mod-1",
  "enunciado": "¿Qué documento acredita el cumplimiento normativo de una instalación declarada?",
  "alternativas": {
   "a": "Factura",
   "b": "TE1 aprobada",
   "c": "Presupuesto",
   "d": "Contrato"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «TE1 aprobada».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-043",
  "moduloId": "mod-1",
  "enunciado": "¿Qué principio normativo prevalece en todos los RIC?",
  "alternativas": {
   "a": "Rentabilidad",
   "b": "Rapidez de ejecución",
   "c": "Seguridad eléctrica",
   "d": "Productividad"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Seguridad eléctrica».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-044",
  "moduloId": "mod-1",
  "enunciado": "La omisión de protecciones exigidas por normativa puede generar:",
  "alternativas": {
   "a": "Observaciones SEC",
   "b": "Rechazo de instalación",
   "c": "Riesgos para personas",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-045",
  "moduloId": "mod-1",
  "enunciado": "¿Qué documento permite demostrar el diseño técnico de una instalación?",
  "alternativas": {
   "a": "Plano y memoria de cálculo",
   "b": "Factura",
   "c": "Boleta",
   "d": "Contrato laboral"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Plano y memoria de cálculo».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-046",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el propósito de las inspecciones SEC?",
  "alternativas": {
   "a": "Recaudar fondos",
   "b": "Verificar seguridad y cumplimiento normativo",
   "c": "Vender licencias",
   "d": "Diseñar proyectos"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Verificar seguridad y cumplimiento normativo».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-047",
  "moduloId": "mod-1",
  "enunciado": "¿Qué característica debe tener toda instalación eléctrica?",
  "alternativas": {
   "a": "Seguridad",
   "b": "Confiabilidad",
   "c": "Cumplimiento normativo",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-048",
  "moduloId": "mod-1",
  "enunciado": "¿Qué ocurre si una instalación se modifica sustancialmente?",
  "alternativas": {
   "a": "No requiere gestión",
   "b": "Puede requerir nueva declaración",
   "c": "Debe eliminarse",
   "d": "Debe cambiar propietario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Puede requerir nueva declaración».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-049",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el objetivo final de la normativa eléctrica?",
  "alternativas": {
   "a": "Reducir costos",
   "b": "Incrementar ventas",
   "c": "Proteger personas, bienes y continuidad de servicio",
   "d": "Aumentar consumo"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Proteger personas, bienes y continuidad de servicio».",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-050",
  "moduloId": "mod-1",
  "enunciado": "¿Qué debe conocer un instalador autorizado antes de ejecutar un proyecto?",
  "alternativas": {
   "a": "Normativa aplicable",
   "b": "Reglamentos RIC",
   "c": "Requisitos SEC",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La ejecución profesional exige dominio de la normativa, reglamentos técnicos y procedimientos SEC. Referencia: DS N°8, Reglamentos Técnicos RIC y SEC.",
  "dificultad": "alta"
 },
 {
  "id": "p-m1-001",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el organismo encargado de fiscalizar las instalaciones eléctricas en Chile?",
  "alternativas": {
   "a": "CNE",
   "b": "SEC",
   "c": "SENCE",
   "d": "MINVU"
  },
  "correcta": "b",
  "explicacion": "La Superintendencia de Electricidad y Combustibles (SEC) es el organismo fiscalizador de las instalaciones eléctricas y de combustibles en Chile. Referencia: Ley General de Servicios Eléctricos.",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-002",
  "moduloId": "mod-1",
  "enunciado": "¿Qué significa SEC?",
  "alternativas": {
   "a": "Servicio Eléctrico Central",
   "b": "Sistema Eléctrico Chileno",
   "c": "Superintendencia de Electricidad y Combustibles",
   "d": "Secretaría Eléctrica Central"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Superintendencia de Electricidad y Combustibles».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-003",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es el objetivo principal del Decreto Supremo N°8?",
  "alternativas": {
   "a": "Reducir costos",
   "b": "Aumentar consumo eléctrico",
   "c": "Establecer requisitos mínimos de seguridad",
   "d": "Regular tarifas"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Establecer requisitos mínimos de seguridad».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-004",
  "moduloId": "mod-1",
  "enunciado": "¿Qué documento se utiliza para declarar una instalación eléctrica?",
  "alternativas": {
   "a": "TE1",
   "b": "TE2",
   "c": "TE3",
   "d": "TE4"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «TE1».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-005",
  "moduloId": "mod-1",
  "enunciado": "¿Quién es responsable de la correcta ejecución de una instalación eléctrica?",
  "alternativas": {
   "a": "Cliente",
   "b": "Municipalidad",
   "c": "Instalador autorizado",
   "d": "Distribuidora"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Instalador autorizado».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-006",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál licencia SEC permite ejecutar instalaciones de baja tensión domiciliarias?",
  "alternativas": {
   "a": "Clase A",
   "b": "Clase B",
   "c": "Clase C",
   "d": "Clase D"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Clase D».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-007",
  "moduloId": "mod-1",
  "enunciado": "¿Qué organismo elabora políticas energéticas nacionales?",
  "alternativas": {
   "a": "SEC",
   "b": "CNE",
   "c": "SII",
   "d": "ACHS"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «CNE».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-008",
  "moduloId": "mod-1",
  "enunciado": "¿Cuál es la finalidad de los Reglamentos Técnicos RIC?",
  "alternativas": {
   "a": "Complementar el reglamento eléctrico",
   "b": "Definir tarifas",
   "c": "Aprobar proyectos municipales",
   "d": "Regular combustibles"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Complementar el reglamento eléctrico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-009",
  "moduloId": "mod-1",
  "enunciado": "¿Cuántos Reglamentos Técnicos RIC existen actualmente?",
  "alternativas": {
   "a": "10",
   "b": "15",
   "c": "19",
   "d": "25"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «19».",
  "dificultad": "baja"
 },
 {
  "id": "p-m1-010",
  "moduloId": "mod-1",
  "enunciado": "¿Quién puede firmar una declaración TE1?",
  "alternativas": {
   "a": "Cualquier electricista",
   "b": "Propietario",
   "c": "Instalador autorizado SEC",
   "d": "Arquitecto"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Instalador autorizado SEC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-011",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la unidad de medida de la corriente eléctrica?",
  "alternativas": {
   "a": "Volt",
   "b": "Ohm",
   "c": "Ampere",
   "d": "Watt"
  },
  "correcta": "c",
  "explicacion": "La corriente eléctrica se mide en amperes (A). Referencia: Sistema Internacional de Unidades (SI).",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-012",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la unidad de medida del voltaje?",
  "alternativas": {
   "a": "Ampere",
   "b": "Volt",
   "c": "Watt",
   "d": "Ohm"
  },
  "correcta": "b",
  "explicacion": "El voltaje representa la diferencia de potencial eléctrico y se mide en voltios.",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-013",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la unidad de medida de la resistencia eléctrica?",
  "alternativas": {
   "a": "Volt",
   "b": "Watt",
   "c": "Ampere",
   "d": "Ohm"
  },
  "correcta": "d",
  "explicacion": "La resistencia eléctrica se mide en ohmios (Ω).",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-014",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la unidad de medida de la potencia eléctrica?",
  "alternativas": {
   "a": "Watt",
   "b": "Volt",
   "c": "Ampere",
   "d": "Ohm"
  },
  "correcta": "a",
  "explicacion": "La potencia eléctrica se mide en watts (W).",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-015",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento se utiliza para medir voltaje?",
  "alternativas": {
   "a": "Amperímetro",
   "b": "Voltímetro",
   "c": "Ohmímetro",
   "d": "Telurómetro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Voltímetro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-016",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento se utiliza para medir corriente eléctrica?",
  "alternativas": {
   "a": "Voltímetro",
   "b": "Ohmímetro",
   "c": "Amperímetro",
   "d": "Megger"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Amperímetro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-017",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento se utiliza para medir resistencia eléctrica?",
  "alternativas": {
   "a": "Ohmímetro",
   "b": "Voltímetro",
   "c": "Luxómetro",
   "d": "Telurómetro"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Ohmímetro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-004",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la tensión nominal domiciliaria en Chile?",
  "alternativas": {
   "a": "110 V",
   "b": "127 V",
   "c": "220 V",
   "d": "380 V"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «220 V».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-010",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la frecuencia de la red eléctrica chilena?",
  "alternativas": {
   "a": "25 Hz",
   "b": "50 Hz",
   "c": "60 Hz",
   "d": "100 Hz"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «50 Hz».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-018",
  "moduloId": "mod-2",
  "enunciado": "La Ley de Ohm relaciona:",
  "alternativas": {
   "a": "Potencia, energía y tiempo",
   "b": "Voltaje, corriente y resistencia",
   "c": "Frecuencia y potencia",
   "d": "Energía y voltaje"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Voltaje, corriente y resistencia».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-019",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la fórmula fundamental de la Ley de Ohm?",
  "alternativas": {
   "a": "P = V × I",
   "b": "V = I × R",
   "c": "E = P × t",
   "d": "Q = I²R"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «V = I × R».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-020",
  "moduloId": "mod-2",
  "enunciado": "¿Qué representa la letra I en electricidad?",
  "alternativas": {
   "a": "Intensidad de corriente",
   "b": "Impedancia",
   "c": "Inductancia",
   "d": "Iluminación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Intensidad de corriente».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-021",
  "moduloId": "mod-2",
  "enunciado": "¿Qué representa la letra V?",
  "alternativas": {
   "a": "Velocidad",
   "b": "Voltaje",
   "c": "Voltamper",
   "d": "Variación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Voltaje».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-022",
  "moduloId": "mod-2",
  "enunciado": "¿Qué representa la letra R?",
  "alternativas": {
   "a": "Reactancia",
   "b": "Resistencia",
   "c": "Rendimiento",
   "d": "Regulación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Resistencia».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-008",
  "moduloId": "mod-2",
  "enunciado": "¿Qué tipo de circuito se utiliza normalmente en viviendas?",
  "alternativas": {
   "a": "Serie",
   "b": "Paralelo",
   "c": "Resonante",
   "d": "Mixto puro"
  },
  "correcta": "b",
  "explicacion": "Los enchufes y luminarias se conectan en paralelo para operar independientemente.",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-023",
  "moduloId": "mod-2",
  "enunciado": "En un circuito serie la corriente:",
  "alternativas": {
   "a": "Es diferente en cada carga",
   "b": "Es igual en todas las cargas",
   "c": "Es cero",
   "d": "Depende del voltaje"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Es igual en todas las cargas».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-024",
  "moduloId": "mod-2",
  "enunciado": "En un circuito paralelo el voltaje:",
  "alternativas": {
   "a": "Se divide",
   "b": "Es igual en todas las ramas",
   "c": "Desaparece",
   "d": "Aumenta"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Es igual en todas las ramas».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-025",
  "moduloId": "mod-2",
  "enunciado": "¿Qué unidad se utiliza para medir energía eléctrica?",
  "alternativas": {
   "a": "W",
   "b": "V",
   "c": "kWh",
   "d": "A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «kWh».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-026",
  "moduloId": "mod-2",
  "enunciado": "¿Qué indica el factor de potencia?",
  "alternativas": {
   "a": "La frecuencia",
   "b": "La eficiencia en el uso de la energía",
   "c": "El voltaje",
   "d": "La resistencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «La eficiencia en el uso de la energía».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-027",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es el valor ideal del factor de potencia?",
  "alternativas": {
   "a": "0",
   "b": "0,5",
   "c": "0,8",
   "d": "1"
  },
  "correcta": "d",
  "explicacion": "Un factor de potencia igual a 1 indica que toda la potencia suministrada se transforma en trabajo útil.",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-028",
  "moduloId": "mod-2",
  "enunciado": "Un circuito tiene un voltaje de 220 V y una resistencia de 22 Ω. ¿Cuál es la corriente?",
  "alternativas": {
   "a": "5 A",
   "b": "10 A",
   "c": "15 A",
   "d": "20 A"
  },
  "correcta": "b",
  "explicacion": "I = V/R = 220/22 = 10 A Referencia: Ley de Ohm.",
  "dificultad": "media"
 },
 {
  "id": "p-m2-029",
  "moduloId": "mod-2",
  "enunciado": "Si una carga consume 10 A a 220 V, ¿cuál es su potencia?",
  "alternativas": {
   "a": "1.100 W",
   "b": "2.200 W",
   "c": "3.300 W",
   "d": "4.400 W"
  },
  "correcta": "b",
  "explicacion": "P = V × I = 220 × 10 = 2.200 W",
  "dificultad": "media"
 },
 {
  "id": "p-m2-030",
  "moduloId": "mod-2",
  "enunciado": "Una resistencia de 44 Ω conectada a 220 V consumirá:",
  "alternativas": {
   "a": "2 A",
   "b": "4 A",
   "c": "5 A",
   "d": "10 A"
  },
  "correcta": "c",
  "explicacion": "I = 220/44 = 5 A",
  "dificultad": "media"
 },
 {
  "id": "p-m2-031",
  "moduloId": "mod-2",
  "enunciado": "¿Qué corriente consume una estufa de 2.200 W conectada a 220 V?",
  "alternativas": {
   "a": "5 A",
   "b": "10 A",
   "c": "15 A",
   "d": "20 A"
  },
  "correcta": "b",
  "explicacion": "I = P/V = 2200/220 = 10 A",
  "dificultad": "media"
 },
 {
  "id": "p-m2-032",
  "moduloId": "mod-2",
  "enunciado": "Una lámpara de 100 W encendida durante 10 horas consume:",
  "alternativas": {
   "a": "0,1 kWh",
   "b": "1 kWh",
   "c": "10 kWh",
   "d": "100 kWh"
  },
  "correcta": "b",
  "explicacion": "100 W × 10 h = 1.000 Wh = 1 kWh",
  "dificultad": "media"
 },
 {
  "id": "p-m2-033",
  "moduloId": "mod-2",
  "enunciado": "¿Cuánta energía consume un calefactor de 2 kW funcionando durante 5 horas?",
  "alternativas": {
   "a": "2 kWh",
   "b": "5 kWh",
   "c": "10 kWh",
   "d": "20 kWh"
  },
  "correcta": "c",
  "explicacion": "2 kW × 5 h = 10 kWh",
  "dificultad": "media"
 },
 {
  "id": "p-m2-034",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la resistencia de una carga que consume 11 A a 220 V?",
  "alternativas": {
   "a": "10 Ω",
   "b": "15 Ω",
   "c": "20 Ω",
   "d": "25 Ω"
  },
  "correcta": "c",
  "explicacion": "R = V/I = 220/11 = 20 Ω",
  "dificultad": "media"
 },
 {
  "id": "p-m2-035",
  "moduloId": "mod-2",
  "enunciado": "Si el voltaje aumenta y la resistencia permanece constante, la corriente:",
  "alternativas": {
   "a": "Disminuye",
   "b": "Permanece igual",
   "c": "Aumenta",
   "d": "Se anula"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Aumenta».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-036",
  "moduloId": "mod-2",
  "enunciado": "Si la resistencia aumenta y el voltaje permanece constante, la corriente:",
  "alternativas": {
   "a": "Aumenta",
   "b": "Disminuye",
   "c": "Permanece constante",
   "d": "Se duplica"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Disminuye».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-037",
  "moduloId": "mod-2",
  "enunciado": "La potencia consumida por una carga de 15 A a 220 V es:",
  "alternativas": {
   "a": "1.500 W",
   "b": "2.200 W",
   "c": "3.300 W",
   "d": "4.400 W"
  },
  "correcta": "c",
  "explicacion": "P = 220 × 15 = 3.300 W",
  "dificultad": "media"
 },
 {
  "id": "p-m2-038",
  "moduloId": "mod-2",
  "enunciado": "Tres resistencias de 10 Ω conectadas en serie tienen una resistencia total de:",
  "alternativas": {
   "a": "10 Ω",
   "b": "20 Ω",
   "c": "30 Ω",
   "d": "40 Ω"
  },
  "correcta": "c",
  "explicacion": "Rt = 10 + 10 + 10 = 30 Ω",
  "dificultad": "media"
 },
 {
  "id": "p-m2-039",
  "moduloId": "mod-2",
  "enunciado": "Dos resistencias iguales de 20 Ω conectadas en paralelo tienen una resistencia equivalente de:",
  "alternativas": {
   "a": "5 Ω",
   "b": "10 Ω",
   "c": "20 Ω",
   "d": "40 Ω"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «10 Ω».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-040",
  "moduloId": "mod-2",
  "enunciado": "¿Qué sucede en un circuito serie si una resistencia se interrumpe?",
  "alternativas": {
   "a": "Todo el circuito deja de funcionar",
   "b": "Sólo falla una carga",
   "c": "Aumenta el voltaje",
   "d": "Aumenta la corriente"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Todo el circuito deja de funcionar».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-041",
  "moduloId": "mod-2",
  "enunciado": "¿Qué sucede en un circuito paralelo si una rama se abre?",
  "alternativas": {
   "a": "Todo el circuito deja de funcionar",
   "b": "Sólo esa rama deja de operar",
   "c": "Se pierde el neutro",
   "d": "Aumenta la resistencia total"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sólo esa rama deja de operar».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-042",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento se utiliza para medir continuidad?",
  "alternativas": {
   "a": "Voltímetro",
   "b": "Pinza amperimétrica",
   "c": "Ohmímetro o multímetro",
   "d": "Luxómetro"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Ohmímetro o multímetro».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-043",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento permite medir corriente sin abrir el circuito?",
  "alternativas": {
   "a": "Megóhmetro",
   "b": "Pinza amperimétrica",
   "c": "Voltímetro",
   "d": "Telurómetro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Pinza amperimétrica».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-044",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es el valor de potencia para una carga de 5 A conectada a 220 V?",
  "alternativas": {
   "a": "550 W",
   "b": "1.100 W",
   "c": "2.200 W",
   "d": "4.400 W"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «1.100 W».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-045",
  "moduloId": "mod-2",
  "enunciado": "¿Qué valor de corriente consume una carga de 4.400 W a 220 V?",
  "alternativas": {
   "a": "10 A",
   "b": "15 A",
   "c": "20 A",
   "d": "25 A"
  },
  "correcta": "c",
  "explicacion": "I = 4400/220 = 20 A",
  "dificultad": "media"
 },
 {
  "id": "p-m2-046",
  "moduloId": "mod-2",
  "enunciado": "El factor de potencia se representa mediante:",
  "alternativas": {
   "a": "senφ",
   "b": "tanφ",
   "c": "cosφ",
   "d": "kWh"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «cosφ».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-047",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál de las siguientes cargas posee normalmente factor de potencia cercano a 1?",
  "alternativas": {
   "a": "Motor trifásico",
   "b": "Transformador",
   "c": "Estufa eléctrica",
   "d": "Compresor"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Estufa eléctrica».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-048",
  "moduloId": "mod-2",
  "enunciado": "¿Qué tipo de carga suele producir un bajo factor de potencia?",
  "alternativas": {
   "a": "Resistiva",
   "b": "Inductiva",
   "c": "Incandescente",
   "d": "Térmica"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Inductiva».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-049",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la principal consecuencia de un bajo factor de potencia?",
  "alternativas": {
   "a": "Menor corriente",
   "b": "Menor voltaje",
   "c": "Mayor corriente circulante",
   "d": "Menor frecuencia"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Mayor corriente circulante».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-050",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es el consumo mensual aproximado de un equipo de 1 kW funcionando 4 horas diarias durante 30 días?",
  "alternativas": {
   "a": "30 kWh",
   "b": "60 kWh",
   "c": "120 kWh",
   "d": "240 kWh"
  },
  "correcta": "c",
  "explicacion": "1 × 4 × 30 = 120 kWh",
  "dificultad": "media"
 },
 {
  "id": "p-m2-051",
  "moduloId": "mod-2",
  "enunciado": "¿Qué magnitud mide un wattímetro?",
  "alternativas": {
   "a": "Voltaje",
   "b": "Corriente",
   "c": "Potencia",
   "d": "Resistencia"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Potencia».",
  "dificultad": "media"
 },
 {
  "id": "p-m2-052",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la principal ventaja de utilizar un multímetro digital?",
  "alternativas": {
   "a": "Sólo mide voltaje",
   "b": "Sólo mide corriente",
   "c": "Permite medir varias magnitudes eléctricas",
   "d": "Reemplaza un telurómetro"
  },
  "correcta": "c",
  "explicacion": "Un multímetro puede medir voltaje, corriente, resistencia, continuidad y otras variables según el modelo. Referencia: Instrumentación Eléctrica Básica -- Módulo 2.",
  "dificultad": "media"
 },
 {
  "id": "p-m2-053",
  "moduloId": "mod-2",
  "enunciado": "Un motor trifásico consume 30 A a 380 V con un factor de potencia de 0,85. ¿Cuál es su potencia aproximada?",
  "alternativas": {
   "a": "12 kW",
   "b": "16,8 kW",
   "c": "20 kW",
   "d": "25 kW"
  },
  "correcta": "b",
  "explicacion": "Potencia trifásica: P= 3 ​ ⋅V⋅I⋅cosϕ P = 1,732 × 380 × 30 × 0,85 P ≈ 16.800 W Referencia: Potencia Trifásica.",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-054",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la principal ventaja de corregir el factor de potencia?",
  "alternativas": {
   "a": "Aumentar frecuencia",
   "b": "Reducir corriente y pérdidas",
   "c": "Aumentar voltaje",
   "d": "Eliminar armónicos"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Reducir corriente y pérdidas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-055",
  "moduloId": "mod-2",
  "enunciado": "Una instalación posee un factor de potencia de 0,65. ¿Cómo se considera este valor?",
  "alternativas": {
   "a": "Excelente",
   "b": "Bueno",
   "c": "Bajo",
   "d": "Ideal"
  },
  "correcta": "c",
  "explicacion": "Valores inferiores a 0,90 suelen requerir corrección mediante bancos de condensadores.",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-056",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es el equipo más utilizado para corregir factor de potencia?",
  "alternativas": {
   "a": "Transformador",
   "b": "Variador de frecuencia",
   "c": "Banco de condensadores",
   "d": "Contactores"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Banco de condensadores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-057",
  "moduloId": "mod-2",
  "enunciado": "En una medición se obtiene: 220 V 10 A ¿Cuál es la potencia aparente?",
  "alternativas": {
   "a": "1.100 VA",
   "b": "2.200 VA",
   "c": "3.300 VA",
   "d": "4.400 VA"
  },
  "correcta": "b",
  "explicacion": "S = V × I S = 220 × 10 = 2.200 VA",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-058",
  "moduloId": "mod-2",
  "enunciado": "Un circuito presenta: 220 V 11 A ¿Cuál es su resistencia equivalente?",
  "alternativas": {
   "a": "10 Ω",
   "b": "15 Ω",
   "c": "20 Ω",
   "d": "30 Ω"
  },
  "correcta": "c",
  "explicacion": "R = V/I R = 220/11 = 20 Ω",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-059",
  "moduloId": "mod-2",
  "enunciado": "Tres resistencias de 30 Ω conectadas en paralelo poseen una resistencia equivalente aproximada de:",
  "alternativas": {
   "a": "5 Ω",
   "b": "10 Ω",
   "c": "30 Ω",
   "d": "90 Ω"
  },
  "correcta": "b",
  "explicacion": "Para resistencias iguales: Rt = R/n Rt = 30/3 = 10 Ω",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-060",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es el principal síntoma de una conexión defectuosa en un circuito?",
  "alternativas": {
   "a": "Disminución de temperatura",
   "b": "Aumento de resistencia de contacto",
   "c": "Reducción de pérdidas",
   "d": "Aumento de aislamiento"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumento de resistencia de contacto».",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-061",
  "moduloId": "mod-2",
  "enunciado": "Una instalación presenta caídas de tensión excesivas. ¿Cuál es la causa más probable?",
  "alternativas": {
   "a": "Conductores sobredimensionados",
   "b": "Conductores subdimensionados",
   "c": "Exceso de puesta a tierra",
   "d": "Exceso de iluminación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Conductores subdimensionados».",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-062",
  "moduloId": "mod-2",
  "enunciado": "Al medir una resistencia con un multímetro, el circuito debe encontrarse:",
  "alternativas": {
   "a": "Energizado",
   "b": "Con carga",
   "c": "Desenergizado",
   "d": "Con neutro abierto"
  },
  "correcta": "c",
  "explicacion": "La medición de resistencia debe realizarse sin tensión aplicada.",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-063",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la potencia consumida por una resistencia de 22 Ω conectada a 220 V?",
  "alternativas": {
   "a": "1.100 W",
   "b": "2.200 W",
   "c": "3.300 W",
   "d": "4.400 W"
  },
  "correcta": "b",
  "explicacion": "I = 220/22 = 10 A P = 220 × 10 = 2.200 W",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-064",
  "moduloId": "mod-2",
  "enunciado": "Un motor opera con bajo factor de potencia. Esto provocará:",
  "alternativas": {
   "a": "Menor corriente",
   "b": "Menor consumo reactivo",
   "c": "Mayor corriente para la misma potencia útil",
   "d": "Menor potencia aparente"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Mayor corriente para la misma potencia útil».",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-065",
  "moduloId": "mod-2",
  "enunciado": "Durante una inspección se mide: 220 V 0 A ¿Qué condición es más probable?",
  "alternativas": {
   "a": "Cortocircuito",
   "b": "Circuito abierto",
   "c": "Sobrecarga",
   "d": "Bajo factor de potencia"
  },
  "correcta": "b",
  "explicacion": "Existe tensión disponible, pero no circulación de corriente.",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-066",
  "moduloId": "mod-2",
  "enunciado": "En un circuito mixto, ¿qué procedimiento debe aplicarse para calcular la resistencia total?",
  "alternativas": {
   "a": "Aplicar sólo fórmulas serie",
   "b": "Aplicar sólo fórmulas paralelo",
   "c": "Reducir progresivamente combinaciones serie y paralelo",
   "d": "Sumar corrientes"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Reducir progresivamente combinaciones serie y paralelo».",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-067",
  "moduloId": "mod-2",
  "enunciado": "Durante una mantención se detecta una corriente superior a la calculada para una carga. La causa más probable es:",
  "alternativas": {
   "a": "Disminución de voltaje",
   "b": "Aumento de resistencia",
   "c": "Sobrecarga o falla del equipo",
   "d": "Mejora del factor de potencia"
  },
  "correcta": "c",
  "explicacion": "Un aumento anormal de corriente suele indicar sobrecarga, deterioro del equipo o una condición de falla. Referencia: Diagnóstico Eléctrico Industrial y Residencial.",
  "dificultad": "alta"
 },
 {
  "id": "p-m2-001",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la unidad de corriente eléctrica?",
  "alternativas": {
   "a": "Volt",
   "b": "Watt",
   "c": "Ampere",
   "d": "Ohm"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Ampere».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-002",
  "moduloId": "mod-2",
  "enunciado": "¿Cuál es la unidad de resistencia?",
  "alternativas": {
   "a": "Ohm",
   "b": "Volt",
   "c": "Watt",
   "d": "Coulomb"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Ohm».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-003",
  "moduloId": "mod-2",
  "enunciado": "La Ley de Ohm establece que:",
  "alternativas": {
   "a": "P = V × I",
   "b": "V = I × R",
   "c": "E = mc²",
   "d": "Q = It"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «V = I × R».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-005",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento mide voltaje?",
  "alternativas": {
   "a": "Ohmímetro",
   "b": "Amperímetro",
   "c": "Voltímetro",
   "d": "Telurómetro"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Voltímetro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-006",
  "moduloId": "mod-2",
  "enunciado": "¿Qué instrumento mide corriente?",
  "alternativas": {
   "a": "Voltímetro",
   "b": "Amperímetro",
   "c": "Wattímetro",
   "d": "Megger"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Amperímetro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-007",
  "moduloId": "mod-2",
  "enunciado": "La potencia eléctrica se mide en:",
  "alternativas": {
   "a": "Volt",
   "b": "Ampere",
   "c": "Watt",
   "d": "Ohm"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Watt».",
  "dificultad": "baja"
 },
 {
  "id": "p-m2-009",
  "moduloId": "mod-2",
  "enunciado": "¿Qué representa el factor de potencia?",
  "alternativas": {
   "a": "Voltaje",
   "b": "Eficiencia eléctrica",
   "c": "Temperatura",
   "d": "Frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Eficiencia eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-011",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el material conductor más utilizado en instalaciones eléctricas domiciliarias?",
  "alternativas": {
   "a": "Acero",
   "b": "Cobre",
   "c": "Zinc",
   "d": "Hierro"
  },
  "correcta": "b",
  "explicacion": "El cobre posee excelente conductividad eléctrica, resistencia mecánica y durabilidad. Referencia: RIC 04 Conductores.",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-012",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la unidad utilizada para expresar la sección de un conductor?",
  "alternativas": {
   "a": "Ampere",
   "b": "Volt",
   "c": "mm²",
   "d": "Watt"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-013",
  "moduloId": "mod-3",
  "enunciado": "¿Qué conductor posee menor peso para una misma longitud?",
  "alternativas": {
   "a": "Cobre",
   "b": "Plata",
   "c": "Aluminio",
   "d": "Bronce"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Aluminio».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-014",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la sección más utilizada para circuitos de alumbrado residencial?",
  "alternativas": {
   "a": "1,5 mm²",
   "b": "2,5 mm²",
   "c": "4 mm²",
   "d": "6 mm²"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «1,5 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-015",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la sección más utilizada para circuitos de enchufes domiciliarios?",
  "alternativas": {
   "a": "1 mm²",
   "b": "1,5 mm²",
   "c": "2,5 mm²",
   "d": "10 mm²"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «2,5 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-008",
  "moduloId": "mod-3",
  "enunciado": "¿Qué significa ampacidad?",
  "alternativas": {
   "a": "Longitud del conductor",
   "b": "Resistencia eléctrica",
   "c": "Corriente máxima admisible",
   "d": "Caída de tensión"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Corriente máxima admisible».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-016",
  "moduloId": "mod-3",
  "enunciado": "¿Qué aislación tiene normalmente una temperatura máxima de operación de 70°C?",
  "alternativas": {
   "a": "XLPE",
   "b": "PVC",
   "c": "EPR",
   "d": "Silicona"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «PVC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-017",
  "moduloId": "mod-3",
  "enunciado": "¿Qué aislación permite normalmente operar a 90°C?",
  "alternativas": {
   "a": "PVC",
   "b": "Papel",
   "c": "XLPE",
   "d": "Goma natural"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «XLPE».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-018",
  "moduloId": "mod-3",
  "enunciado": "¿Qué conductor presenta mejor conductividad eléctrica?",
  "alternativas": {
   "a": "Aluminio",
   "b": "Cobre",
   "c": "Acero",
   "d": "Hierro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Cobre».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-019",
  "moduloId": "mod-3",
  "enunciado": "¿Qué fenómeno eléctrico aumenta cuando incrementa la longitud del conductor?",
  "alternativas": {
   "a": "Frecuencia",
   "b": "Potencia",
   "c": "Caída de tensión",
   "d": "Factor de potencia"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Caída de tensión».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-020",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál de los siguientes es un tubo plástico utilizado en instalaciones eléctricas?",
  "alternativas": {
   "a": "EMT",
   "b": "IMC",
   "c": "RMC",
   "d": "PVC"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «PVC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-021",
  "moduloId": "mod-3",
  "enunciado": "¿Qué significa EMT?",
  "alternativas": {
   "a": "Tubo metálico liviano",
   "b": "Tubo flexible",
   "c": "Canaleta plástica",
   "d": "Bandeja portacables"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Tubo metálico liviano».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-022",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál de las siguientes canalizaciones posee mayor resistencia mecánica?",
  "alternativas": {
   "a": "PVC",
   "b": "EMT",
   "c": "RMC",
   "d": "Canaleta"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RMC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-023",
  "moduloId": "mod-3",
  "enunciado": "¿Qué canalización se utiliza frecuentemente en viviendas?",
  "alternativas": {
   "a": "RMC",
   "b": "PVC",
   "c": "Acero pesado",
   "d": "Bandeja industrial"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «PVC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-024",
  "moduloId": "mod-3",
  "enunciado": "¿Qué elemento conecta el empalme con el tablero general?",
  "alternativas": {
   "a": "Derivación",
   "b": "Alimentador",
   "c": "Interruptor",
   "d": "Enchufe"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Alimentador».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-025",
  "moduloId": "mod-3",
  "enunciado": "¿Qué elemento conecta un tablero general con un tablero secundario?",
  "alternativas": {
   "a": "Acometida",
   "b": "Empalme",
   "c": "Subalimentador",
   "d": "DPS"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Subalimentador».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-026",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la principal función de una canalización?",
  "alternativas": {
   "a": "Aumentar voltaje",
   "b": "Disminuir corriente",
   "c": "Proteger conductores",
   "d": "Generar energía"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Proteger conductores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-027",
  "moduloId": "mod-3",
  "enunciado": "¿Qué factor influye directamente en la capacidad de corriente de un conductor?",
  "alternativas": {
   "a": "Temperatura ambiente",
   "b": "Agrupamiento",
   "c": "Tipo de instalación",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-006",
  "moduloId": "mod-3",
  "enunciado": "¿Qué conductor soporta mayor corriente?",
  "alternativas": {
   "a": "1,5 mm²",
   "b": "2,5 mm²",
   "c": "6 mm²",
   "d": "10 mm²"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «10 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-028",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el propósito principal de seleccionar correctamente un conductor?",
  "alternativas": {
   "a": "Reducir costos únicamente",
   "b": "Mejorar apariencia",
   "c": "Garantizar seguridad y funcionamiento",
   "d": "Reducir frecuencia"
  },
  "correcta": "c",
  "explicacion": "La selección correcta evita sobrecalentamiento, caídas de tensión excesivas y riesgos de incendio. Referencia: RIC 03 y RIC 04.",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-029",
  "moduloId": "mod-3",
  "enunciado": "Un conductor de cobre PVC 70°C de 6 mm² tiene una ampacidad aproximada de:",
  "alternativas": {
   "a": "20 A",
   "b": "25 A",
   "c": "32 A",
   "d": "50 A"
  },
  "correcta": "c",
  "explicacion": "Un conductor de cobre de 6 mm² suele admitir aproximadamente 32 A según condiciones normales de instalación. Referencia: RIC 04.",
  "dificultad": "media"
 },
 {
  "id": "p-m3-030",
  "moduloId": "mod-3",
  "enunciado": "¿Qué ocurre con la ampacidad de un conductor cuando aumenta la temperatura ambiente?",
  "alternativas": {
   "a": "Aumenta",
   "b": "No cambia",
   "c": "Disminuye",
   "d": "Se duplica"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Disminuye».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-031",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el objetivo de aplicar factores de corrección?",
  "alternativas": {
   "a": "Incrementar voltaje",
   "b": "Ajustar la capacidad real del conductor",
   "c": "Reducir frecuencia",
   "d": "Eliminar cortocircuitos"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Ajustar la capacidad real del conductor».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-032",
  "moduloId": "mod-3",
  "enunciado": "Si un conductor tiene una ampacidad de 50 A y el factor de corrección es 0,8, la corriente admisible será:",
  "alternativas": {
   "a": "25 A",
   "b": "40 A",
   "c": "50 A",
   "d": "62,5 A"
  },
  "correcta": "b",
  "explicacion": "50 × 0,8 = 40 A",
  "dificultad": "media"
 },
 {
  "id": "p-m3-033",
  "moduloId": "mod-3",
  "enunciado": "¿Qué factor de corrección se aplica cuando varios circuitos comparten una misma canalización?",
  "alternativas": {
   "a": "Factor de potencia",
   "b": "Factor de agrupamiento",
   "c": "Factor de simultaneidad",
   "d": "Factor de demanda"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Factor de agrupamiento».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-034",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la principal causa de la caída de tensión?",
  "alternativas": {
   "a": "La longitud del conductor",
   "b": "La resistencia eléctrica del conductor",
   "c": "La corriente transportada",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-035",
  "moduloId": "mod-3",
  "enunciado": "Al duplicar la longitud de un conductor, la caída de tensión:",
  "alternativas": {
   "a": "Se reduce a la mitad",
   "b": "Permanece igual",
   "c": "Se duplica aproximadamente",
   "d": "Desaparece"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Se duplica aproximadamente».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-036",
  "moduloId": "mod-3",
  "enunciado": "¿Qué ocurre si se selecciona un conductor subdimensionado?",
  "alternativas": {
   "a": "Menor temperatura",
   "b": "Mayor caída de tensión",
   "c": "Menor corriente",
   "d": "Menor resistencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor caída de tensión».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-037",
  "moduloId": "mod-3",
  "enunciado": "Una carga consume 40 A. ¿Qué conductor es más adecuado?",
  "alternativas": {
   "a": "2,5 mm²",
   "b": "4 mm²",
   "c": "10 mm²",
   "d": "1,5 mm²"
  },
  "correcta": "c",
  "explicacion": "Debe seleccionarse un conductor cuya ampacidad sea superior a la corriente de carga.",
  "dificultad": "media"
 },
 {
  "id": "p-m3-038",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la finalidad principal del alimentador?",
  "alternativas": {
   "a": "Alimentar cargas finales",
   "b": "Conectar empalme y tablero general",
   "c": "Medir energía",
   "d": "Controlar motores"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Conectar empalme y tablero general».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-039",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la finalidad principal de un subalimentador?",
  "alternativas": {
   "a": "Alimentar tableros secundarios",
   "b": "Alimentar medidores",
   "c": "Medir potencia",
   "d": "Alimentar transformadores"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Alimentar tableros secundarios».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-040",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el porcentaje máximo recomendado de caída de tensión para circuitos de alumbrado?",
  "alternativas": {
   "a": "1%",
   "b": "3%",
   "c": "8%",
   "d": "10%"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «3%».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-041",
  "moduloId": "mod-3",
  "enunciado": "¿Qué ventaja presenta el tubo EMT respecto al PVC?",
  "alternativas": {
   "a": "Menor resistencia mecánica",
   "b": "Mayor protección mecánica",
   "c": "Menor costo",
   "d": "Menor durabilidad"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor protección mecánica».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-042",
  "moduloId": "mod-3",
  "enunciado": "¿Qué tipo de canalización se recomienda para ambientes industriales severos?",
  "alternativas": {
   "a": "PVC liviano",
   "b": "Canaleta plástica",
   "c": "RMC",
   "d": "Tubo flexible"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RMC».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-043",
  "moduloId": "mod-3",
  "enunciado": "¿Qué propiedad debe verificarse además de la ampacidad al seleccionar un conductor?",
  "alternativas": {
   "a": "Color",
   "b": "Fabricante",
   "c": "Caída de tensión",
   "d": "Embalaje"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Caída de tensión».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-044",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el porcentaje máximo recomendado de ocupación para tres o más conductores en un ducto?",
  "alternativas": {
   "a": "20%",
   "b": "30%",
   "c": "40%",
   "d": "60%"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «40%». Referencia: Normas de canalización.",
  "dificultad": "media"
 },
 {
  "id": "p-m3-045",
  "moduloId": "mod-3",
  "enunciado": "Una canalización excesivamente ocupada puede provocar:",
  "alternativas": {
   "a": "Mejor disipación térmica",
   "b": "Sobrecalentamiento",
   "c": "Menor resistencia",
   "d": "Menor corriente"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sobrecalentamiento».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-046",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la principal ventaja del conductor flexible?",
  "alternativas": {
   "a": "Menor conductividad",
   "b": "Mayor facilidad de instalación",
   "c": "Mayor peso",
   "d": "Menor seguridad"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor facilidad de instalación».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-047",
  "moduloId": "mod-3",
  "enunciado": "¿Qué parámetro se utiliza para determinar la sección mínima de un conductor?",
  "alternativas": {
   "a": "Corriente de diseño",
   "b": "Color del aislamiento",
   "c": "Longitud del rollo",
   "d": "Marca comercial"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corriente de diseño».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-048",
  "moduloId": "mod-3",
  "enunciado": "Si una instalación opera a temperaturas elevadas, la sección del conductor normalmente deberá:",
  "alternativas": {
   "a": "Disminuir",
   "b": "Mantenerse igual",
   "c": "Aumentar",
   "d": "Eliminarse"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Aumentar».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-049",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la principal función de una protección asociada a un conductor?",
  "alternativas": {
   "a": "Aumentar voltaje",
   "b": "Limitar corriente excesiva",
   "c": "Reducir frecuencia",
   "d": "Corregir factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Limitar corriente excesiva».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-050",
  "moduloId": "mod-3",
  "enunciado": "¿Qué ocurre si la protección es superior a la capacidad del conductor?",
  "alternativas": {
   "a": "Mayor seguridad",
   "b": "Riesgo de sobrecalentamiento",
   "c": "Menor corriente",
   "d": "Menor caída de tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Riesgo de sobrecalentamiento».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-051",
  "moduloId": "mod-3",
  "enunciado": "Un conductor de 16 mm² normalmente tiene mayor capacidad de corriente que uno de:",
  "alternativas": {
   "a": "25 mm²",
   "b": "35 mm²",
   "c": "10 mm²",
   "d": "50 mm²"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «10 mm²».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-052",
  "moduloId": "mod-3",
  "enunciado": "¿Qué característica hace atractivo el aluminio para alimentadores de gran longitud?",
  "alternativas": {
   "a": "Mayor conductividad que el cobre",
   "b": "Menor peso y costo",
   "c": "Mayor resistencia eléctrica",
   "d": "Mayor rigidez"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Menor peso y costo».",
  "dificultad": "media"
 },
 {
  "id": "p-m3-053",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el principal criterio de diseño para un alimentador?",
  "alternativas": {
   "a": "Estética",
   "b": "Seguridad y capacidad de transporte de energía",
   "c": "Color del aislamiento",
   "d": "Marca del conductor"
  },
  "correcta": "b",
  "explicacion": "El alimentador debe soportar la corriente de carga, cumplir caída de tensión y coordinarse con las protecciones. Referencia: RIC 03 Alimentadores (Nivel Avanzado).",
  "dificultad": "media"
 },
 {
  "id": "p-m3-054",
  "moduloId": "mod-3",
  "enunciado": "Un alimentador monofásico transporta 50 A. La ampacidad base del conductor es 70 A y existen factores de corrección de temperatura (0,90) y agrupamiento (0,80). ¿Cuál es la ampacidad corregida?",
  "alternativas": {
   "a": "50,4 A",
   "b": "56 A",
   "c": "63 A",
   "d": "70 A"
  },
  "correcta": "a",
  "explicacion": "70 × 0,90 × 0,80 = 50,4 A La ampacidad corregida apenas supera la corriente de carga. Referencia: RIC 04.",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-055",
  "moduloId": "mod-3",
  "enunciado": "Si la corriente de diseño es 60 A y la ampacidad corregida del conductor es 55 A:",
  "alternativas": {
   "a": "El conductor es adecuado",
   "b": "El conductor está sobredimensionado",
   "c": "Debe seleccionarse una sección mayor",
   "d": "Debe disminuirse la protección"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Debe seleccionarse una sección mayor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-056",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el principal riesgo de seleccionar una protección de 80 A para un conductor cuya ampacidad es 50 A?",
  "alternativas": {
   "a": "Disparo intempestivo",
   "b": "Sobrecalentamiento del conductor",
   "c": "Baja caída de tensión",
   "d": "Menor potencia"
  },
  "correcta": "b",
  "explicacion": "La protección podría permitir corrientes superiores a la capacidad térmica del conductor.",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-057",
  "moduloId": "mod-3",
  "enunciado": "La coordinación conductor--protección busca:",
  "alternativas": {
   "a": "Minimizar costos",
   "b": "Proteger adecuadamente el conductor",
   "c": "Reducir voltaje",
   "d": "Mejorar iluminación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Proteger adecuadamente el conductor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-058",
  "moduloId": "mod-3",
  "enunciado": "¿Qué variable influye más directamente en la caída de tensión?",
  "alternativas": {
   "a": "Color del conductor",
   "b": "Longitud del circuito",
   "c": "Marca comercial",
   "d": "Frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Longitud del circuito».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-059",
  "moduloId": "mod-3",
  "enunciado": "En un circuito con caída de tensión excesiva, la solución más habitual es:",
  "alternativas": {
   "a": "Reducir la sección",
   "b": "Aumentar la sección del conductor",
   "c": "Aumentar la temperatura",
   "d": "Disminuir el aislamiento"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumentar la sección del conductor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-060",
  "moduloId": "mod-3",
  "enunciado": "Un conductor presenta calentamiento anormal sin que opere la protección. ¿Cuál es la causa más probable?",
  "alternativas": {
   "a": "Protección sobredimensionada",
   "b": "Baja corriente",
   "c": "Exceso de aislamiento",
   "d": "Baja temperatura ambiente"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección sobredimensionada».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-061",
  "moduloId": "mod-3",
  "enunciado": "¿Qué característica hace que el cobre sea preferido frente al aluminio en instalaciones interiores?",
  "alternativas": {
   "a": "Menor conductividad",
   "b": "Mayor resistencia eléctrica",
   "c": "Mejor conductividad y conexiones más confiables",
   "d": "Menor resistencia mecánica"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Mejor conductividad y conexiones más confiables».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-062",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es la condición correcta para la protección de un conductor?",
  "alternativas": {
   "a": "Protección > capacidad del conductor",
   "b": "Protección ≤ capacidad del conductor",
   "c": "Protección = doble capacidad del conductor",
   "d": "Protección independiente del conductor"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Protección ≤ capacidad del conductor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-063",
  "moduloId": "mod-3",
  "enunciado": "Un alimentador trifásico transporta 80 A continuos. ¿Cuál es el criterio principal para seleccionar la sección?",
  "alternativas": {
   "a": "Color del aislamiento",
   "b": "Ampacidad corregida superior a 80 A",
   "c": "Longitud del rollo",
   "d": "Fabricante"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Ampacidad corregida superior a 80 A».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-064",
  "moduloId": "mod-3",
  "enunciado": "Durante una inspección termográfica se detecta una unión con temperatura muy superior al resto del circuito. Esto normalmente indica:",
  "alternativas": {
   "a": "Buena conexión",
   "b": "Punto de alta resistencia de contacto",
   "c": "Exceso de aislamiento",
   "d": "Baja corriente"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Punto de alta resistencia de contacto».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-065",
  "moduloId": "mod-3",
  "enunciado": "¿Qué efecto tiene el agrupamiento excesivo de conductores?",
  "alternativas": {
   "a": "Mejora la disipación térmica",
   "b": "Reduce la temperatura",
   "c": "Disminuye la capacidad de corriente",
   "d": "Reduce la caída de tensión"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Disminuye la capacidad de corriente».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-066",
  "moduloId": "mod-3",
  "enunciado": "Una canalización metálica pesada RMC se recomienda principalmente para:",
  "alternativas": {
   "a": "Decoración",
   "b": "Ambientes con alto riesgo mecánico",
   "c": "Circuitos electrónicos",
   "d": "Redes informáticas"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Ambientes con alto riesgo mecánico».",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-067",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el criterio más restrictivo al dimensionar un alimentador?",
  "alternativas": {
   "a": "El menor valor obtenido entre ampacidad, caída de tensión y condiciones de instalación",
   "b": "El color del conductor",
   "c": "El costo del material",
   "d": "La longitud del carrete"
  },
  "correcta": "a",
  "explicacion": "El diseño debe satisfacer simultáneamente capacidad de corriente, caída de tensión y factores de corrección.",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-068",
  "moduloId": "mod-3",
  "enunciado": "Durante una revisión SEC se verifica que un conductor cumple ampacidad, pero excede la caída de tensión permitida. ¿La instalación cumple normativamente?",
  "alternativas": {
   "a": "Sí, porque cumple ampacidad",
   "b": "Sí, si existe diferencial",
   "c": "No, debe cumplir ambos criterios",
   "d": "No importa la caída de tensión"
  },
  "correcta": "c",
  "explicacion": "La selección correcta exige verificar tanto la capacidad de corriente como los límites de caída de tensión establecidos por la normativa. Referencia: RIC 03 Alimentadores y RIC 04 Conductores.",
  "dificultad": "alta"
 },
 {
  "id": "p-m3-001",
  "moduloId": "mod-3",
  "enunciado": "¿Cuál es el material conductor más utilizado en instalaciones domiciliarias?",
  "alternativas": {
   "a": "Hierro",
   "b": "Acero",
   "c": "Cobre",
   "d": "Zinc"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Cobre».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-002",
  "moduloId": "mod-3",
  "enunciado": "La sección de un conductor se expresa en:",
  "alternativas": {
   "a": "m",
   "b": "cm",
   "c": "mm²",
   "d": "A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-003",
  "moduloId": "mod-3",
  "enunciado": "¿Qué sección se utiliza normalmente para enchufes?",
  "alternativas": {
   "a": "1 mm²",
   "b": "1,5 mm²",
   "c": "2,5 mm²",
   "d": "10 mm²"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «2,5 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-004",
  "moduloId": "mod-3",
  "enunciado": "¿Qué sección se utiliza normalmente para alumbrado?",
  "alternativas": {
   "a": "1,5 mm²",
   "b": "4 mm²",
   "c": "6 mm²",
   "d": "10 mm²"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «1,5 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-005",
  "moduloId": "mod-3",
  "enunciado": "¿Qué fenómeno ocurre cuando el conductor es demasiado largo?",
  "alternativas": {
   "a": "Armónicos",
   "b": "Caída de tensión",
   "c": "Resonancia",
   "d": "Sobretensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Caída de tensión».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-007",
  "moduloId": "mod-3",
  "enunciado": "¿Qué aislación soporta normalmente 90°C?",
  "alternativas": {
   "a": "PVC",
   "b": "XLPE",
   "c": "Goma natural",
   "d": "Papel"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «XLPE».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-009",
  "moduloId": "mod-3",
  "enunciado": "¿Qué factor afecta la capacidad de corriente?",
  "alternativas": {
   "a": "Temperatura",
   "b": "Agrupamiento",
   "c": "Tipo de instalación",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m3-010",
  "moduloId": "mod-3",
  "enunciado": "¿Qué conductor une el empalme con el tablero general? Alternativa_A Alternativa_B Alternativa_C Alternativa_D Respuesta_Correcta Explicación_Técnica Referencia_Normativa Palabras_Clave Ejemplo ID: M1-001 Módulo: Legislación Eléctrica Unidad: SEC ¿Cuál es el organismo encargado de fiscalizar las instalaciones eléctricas en Chile? Alternativa_A: CNE Alternativa_B: SEC Alternativa_C: SENCE Alternativa_D: MINVU Respuesta_Correcta: B Explicación_Técnica: La Superintendencia de Electricidad y Combustibles (SEC) es el organismo fiscalizador de las instalaciones eléctricas y de combustibles en Chile. Referencia_Normativa: Ley General de Servicios Eléctricos Palabras_Clave: SEC, fiscalización, normativa",
  "alternativas": {
   "a": "Subalimentador",
   "b": "Alimentador",
   "c": "Derivación",
   "d": "Acometida"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Alimentador».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-001",
  "moduloId": "mod-4",
  "enunciado": "¿Qué RIC regula la protección contra tensiones peligrosas?",
  "alternativas": {
   "a": "RIC 03",
   "b": "RIC 04",
   "c": "RIC 05",
   "d": "RIC 10"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 05». Referencia: RIC 05.",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-002",
  "moduloId": "mod-4",
  "enunciado": "¿Qué RIC regula las puestas a tierra?",
  "alternativas": {
   "a": "RIC 01",
   "b": "RIC 02",
   "c": "RIC 05",
   "d": "RIC 06"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «RIC 06». Referencia: RIC 06.",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-003",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es el objetivo principal de una puesta a tierra de protección?",
  "alternativas": {
   "a": "Aumentar tensión",
   "b": "Proteger personas y equipos",
   "c": "Reducir frecuencia",
   "d": "Aumentar potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Proteger personas y equipos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-004",
  "moduloId": "mod-4",
  "enunciado": "¿Qué es un contacto directo?",
  "alternativas": {
   "a": "Contacto con una masa metálica energizada por falla",
   "b": "Contacto con una parte activa energizada",
   "c": "Contacto entre dos tierras",
   "d": "Contacto entre fases"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Contacto con una parte activa energizada».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-005",
  "moduloId": "mod-4",
  "enunciado": "¿Qué es un contacto indirecto?",
  "alternativas": {
   "a": "Contacto con un conductor activo",
   "b": "Contacto con una masa puesta accidentalmente bajo tensión",
   "c": "Contacto con neutro",
   "d": "Contacto con tierra física"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Contacto con una masa puesta accidentalmente bajo tensión».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-006",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la función principal de un interruptor diferencial?",
  "alternativas": {
   "a": "Proteger contra sobrecarga",
   "b": "Proteger contra cortocircuito",
   "c": "Detectar corrientes de fuga",
   "d": "Medir energía"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Detectar corrientes de fuga».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-007",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la sensibilidad más utilizada para protección de personas?",
  "alternativas": {
   "a": "10 A",
   "b": "300 mA",
   "c": "100 mA",
   "d": "30 mA"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «30 mA».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-008",
  "moduloId": "mod-4",
  "enunciado": "¿Qué significa DPS?",
  "alternativas": {
   "a": "Dispositivo de Protección contra Sobretensiones",
   "b": "Detector de Potencia Secundaria",
   "c": "Dispositivo de Protección Selectiva",
   "d": "Distribuidor Principal de Servicio"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Dispositivo de Protección contra Sobretensiones».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-009",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la función principal de un DPS?",
  "alternativas": {
   "a": "Proteger contra fugas",
   "b": "Proteger contra sobretensiones transitorias",
   "c": "Proteger contra sobrecargas",
   "d": "Medir tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Proteger contra sobretensiones transitorias».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-010",
  "moduloId": "mod-4",
  "enunciado": "¿Qué electrodo de puesta a tierra es más común en viviendas?",
  "alternativas": {
   "a": "Placa de aluminio",
   "b": "Varilla Copperweld",
   "c": "Barra de acero inoxidable",
   "d": "Perfil estructural"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Varilla Copperweld».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-011",
  "moduloId": "mod-4",
  "enunciado": "¿Qué sistema de puesta a tierra utiliza neutro conectado a tierra y masas conectadas a una tierra independiente?",
  "alternativas": {
   "a": "TN",
   "b": "IT",
   "c": "TT",
   "d": "TN-C"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «TT».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-012",
  "moduloId": "mod-4",
  "enunciado": "¿Qué letra representa la conexión directa del neutro a tierra?",
  "alternativas": {
   "a": "T",
   "b": "N",
   "c": "I",
   "d": "P"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «T».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-013",
  "moduloId": "mod-4",
  "enunciado": "¿Qué instrumento mide la resistencia de puesta a tierra?",
  "alternativas": {
   "a": "Megóhmetro",
   "b": "Multímetro",
   "c": "Telurómetro",
   "d": "Pinza amperimétrica"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Telurómetro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-014",
  "moduloId": "mod-4",
  "enunciado": "¿Qué ocurre si la resistencia de tierra es demasiado elevada?",
  "alternativas": {
   "a": "Mejora la protección",
   "b": "Disminuye la eficacia de protección",
   "c": "Reduce el voltaje",
   "d": "Aumenta la frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Disminuye la eficacia de protección».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-015",
  "moduloId": "mod-4",
  "enunciado": "¿Qué conductor conecta las masas metálicas al sistema de tierra?",
  "alternativas": {
   "a": "Conductor activo",
   "b": "Conductor de protección",
   "c": "Conductor piloto",
   "d": "Conductor de mando"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Conductor de protección».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-016",
  "moduloId": "mod-4",
  "enunciado": "¿Qué color identifica normalmente al conductor de protección?",
  "alternativas": {
   "a": "Rojo",
   "b": "Negro",
   "c": "Verde o verde/amarillo",
   "d": "Azul"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Verde o verde/amarillo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-017",
  "moduloId": "mod-4",
  "enunciado": "¿Qué tipo de falla suele provocar la actuación de un diferencial?",
  "alternativas": {
   "a": "Sobrecarga",
   "b": "Cortocircuito trifásico",
   "c": "Corriente de fuga a tierra",
   "d": "Baja tensión"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Corriente de fuga a tierra».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-018",
  "moduloId": "mod-4",
  "enunciado": "¿Qué protege principalmente un diferencial de 30 mA?",
  "alternativas": {
   "a": "Conductores",
   "b": "Motores",
   "c": "Personas",
   "d": "Transformadores"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Personas».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-019",
  "moduloId": "mod-4",
  "enunciado": "¿Qué elemento debe conectarse a la puesta a tierra en una vivienda?",
  "alternativas": {
   "a": "Sólo el tablero",
   "b": "Sólo las luminarias",
   "c": "Las masas metálicas accesibles",
   "d": "Sólo los enchufes"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Las masas metálicas accesibles».",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-020",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es el objetivo principal de la equipotencialización?",
  "alternativas": {
   "a": "Aumentar corriente",
   "b": "Igualar potenciales eléctricos peligrosos",
   "c": "Reducir potencia",
   "d": "Disminuir frecuencia"
  },
  "correcta": "b",
  "explicacion": "La equipotencialización reduce diferencias de potencial peligrosas entre elementos metálicos. Referencia: RIC 05 y RIC 06 (Nivel Intermedio).",
  "dificultad": "baja"
 },
 {
  "id": "p-m4-021",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la principal característica del sistema TT?",
  "alternativas": {
   "a": "Las masas se conectan al neutro",
   "b": "Las masas se conectan a una puesta a tierra independiente",
   "c": "No existe puesta a tierra",
   "d": "El neutro está aislado"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Las masas se conectan a una puesta a tierra independiente». Referencia: RIC 06.",
  "dificultad": "media"
 },
 {
  "id": "p-m4-022",
  "moduloId": "mod-4",
  "enunciado": "En un sistema TN-S:",
  "alternativas": {
   "a": "Neutro y protección comparten conductor",
   "b": "No existe conductor de protección",
   "c": "Neutro y protección están separados",
   "d": "El neutro está aislado"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Neutro y protección están separados».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-023",
  "moduloId": "mod-4",
  "enunciado": "¿Qué caracteriza al sistema TN-C?",
  "alternativas": {
   "a": "Conductores PE y N separados",
   "b": "Neutro aislado",
   "c": "Conductor PEN combinado",
   "d": "Tierra independiente"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Conductor PEN combinado».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-024",
  "moduloId": "mod-4",
  "enunciado": "¿Qué significa la letra I en un sistema IT?",
  "alternativas": {
   "a": "Instalación",
   "b": "Independiente",
   "c": "Aislado de tierra",
   "d": "Industrial"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Aislado de tierra».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-025",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la ventaja principal de un sistema IT?",
  "alternativas": {
   "a": "Menor costo",
   "b": "Continuidad de servicio ante la primera falla",
   "c": "Menor corriente nominal",
   "d": "Elimina diferenciales"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Continuidad de servicio ante la primera falla».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-026",
  "moduloId": "mod-4",
  "enunciado": "¿Qué es la tensión de contacto?",
  "alternativas": {
   "a": "Tensión entre dos fases",
   "b": "Tensión entre fase y neutro",
   "c": "Tensión que puede aparecer entre una masa y tierra durante una falla",
   "d": "Tensión de alimentación"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Tensión que puede aparecer entre una masa y tierra durante una falla».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-027",
  "moduloId": "mod-4",
  "enunciado": "¿Qué es la tensión de paso?",
  "alternativas": {
   "a": "Tensión entre dos puntos del terreno separados por la distancia de un paso",
   "b": "Tensión entre dos fases",
   "c": "Tensión entre neutro y tierra",
   "d": "Tensión residual"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Tensión entre dos puntos del terreno separados por la distancia de un paso».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-028",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es el objetivo de limitar la tensión de contacto?",
  "alternativas": {
   "a": "Proteger equipos",
   "b": "Proteger conductores",
   "c": "Reducir riesgo de electrocución",
   "d": "Reducir consumo"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Reducir riesgo de electrocución».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-029",
  "moduloId": "mod-4",
  "enunciado": "¿Qué instrumento se utiliza en el método Wenner?",
  "alternativas": {
   "a": "Megóhmetro",
   "b": "Telurómetro",
   "c": "Osciloscopio",
   "d": "Luxómetro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Telurómetro».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-030",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la finalidad del método Wenner?",
  "alternativas": {
   "a": "Medir corriente de fuga",
   "b": "Medir resistividad del terreno",
   "c": "Medir tensión de contacto",
   "d": "Medir potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Medir resistividad del terreno».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-031",
  "moduloId": "mod-4",
  "enunciado": "¿Cuántos electrodos utiliza normalmente el método Wenner?",
  "alternativas": {
   "a": "2",
   "b": "3",
   "c": "4",
   "d": "5"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «4».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-032",
  "moduloId": "mod-4",
  "enunciado": "¿Qué parámetro permite estimar el método Wenner?",
  "alternativas": {
   "a": "Potencia instalada",
   "b": "Resistividad del suelo",
   "c": "Corriente de falla",
   "d": "Caída de tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Resistividad del suelo».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-033",
  "moduloId": "mod-4",
  "enunciado": "¿Qué mide el método de caída de potencial?",
  "alternativas": {
   "a": "Resistividad del suelo",
   "b": "Resistencia de puesta a tierra",
   "c": "Potencia reactiva",
   "d": "Corriente de cortocircuito"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Resistencia de puesta a tierra».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-034",
  "moduloId": "mod-4",
  "enunciado": "¿Cuántos electrodos se utilizan normalmente en el método de caída de potencial?",
  "alternativas": {
   "a": "2",
   "b": "3",
   "c": "4",
   "d": "6"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «3».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-035",
  "moduloId": "mod-4",
  "enunciado": "Una resistencia de tierra elevada puede provocar:",
  "alternativas": {
   "a": "Mejor protección",
   "b": "Menor tensión de contacto",
   "c": "Menor efectividad del sistema de protección",
   "d": "Mayor selectividad"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Menor efectividad del sistema de protección».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-036",
  "moduloId": "mod-4",
  "enunciado": "¿Qué diferencial suele utilizarse para protección de personas?",
  "alternativas": {
   "a": "300 mA",
   "b": "500 mA",
   "c": "1 A",
   "d": "30 mA"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «30 mA».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-037",
  "moduloId": "mod-4",
  "enunciado": "¿Qué diferencial suele utilizarse para protección contra incendios?",
  "alternativas": {
   "a": "10 mA",
   "b": "30 mA",
   "c": "300 mA",
   "d": "3 A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «300 mA».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-038",
  "moduloId": "mod-4",
  "enunciado": "¿Qué significa selectividad entre diferenciales?",
  "alternativas": {
   "a": "Que todos disparen simultáneamente",
   "b": "Que opere primero el dispositivo más cercano a la falla",
   "c": "Que nunca disparen",
   "d": "Que sólo funcione el general"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Que opere primero el dispositivo más cercano a la falla».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-039",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la función principal de un DPS Tipo 1?",
  "alternativas": {
   "a": "Protección contra sobrecargas",
   "b": "Protección frente a descargas atmosféricas directas o cercanas",
   "c": "Protección contra fugas",
   "d": "Protección térmica"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Protección frente a descargas atmosféricas directas o cercanas».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-040",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la aplicación más común de un DPS Tipo 2?",
  "alternativas": {
   "a": "Protección contra sobretensiones inducidas",
   "b": "Protección contra sobrecarga",
   "c": "Protección diferencial",
   "d": "Protección de motores"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección contra sobretensiones inducidas».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-041",
  "moduloId": "mod-4",
  "enunciado": "¿Dónde se instala habitualmente un DPS Tipo 2?",
  "alternativas": {
   "a": "En el tablero principal o de distribución",
   "b": "Dentro de una luminaria",
   "c": "En un enchufe",
   "d": "En una canalización"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «En el tablero principal o de distribución».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-042",
  "moduloId": "mod-4",
  "enunciado": "¿Qué elemento complementa la protección diferencial frente a sobretensiones?",
  "alternativas": {
   "a": "Fusible",
   "b": "DPS",
   "c": "Contactor",
   "d": "Relé térmico"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «DPS».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-043",
  "moduloId": "mod-4",
  "enunciado": "En una vivienda con sistema TT, ¿qué protección es fundamental para la seguridad de las personas?",
  "alternativas": {
   "a": "Fusible",
   "b": "DPS",
   "c": "Interruptor diferencial",
   "d": "Contactor"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Interruptor diferencial».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-044",
  "moduloId": "mod-4",
  "enunciado": "Durante una medición se obtiene una resistencia de puesta a tierra de 60 Ω. Esto indica que:",
  "alternativas": {
   "a": "La puesta a tierra es muy eficiente",
   "b": "Debe evaluarse y posiblemente mejorarse",
   "c": "El diferencial no es necesario",
   "d": "La resistencia es cero"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Debe evaluarse y posiblemente mejorarse».",
  "dificultad": "media"
 },
 {
  "id": "p-m4-045",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la combinación más efectiva para protección de personas frente a fallas a tierra?",
  "alternativas": {
   "a": "Sólo disyuntor",
   "b": "Sólo DPS",
   "c": "Puesta a tierra + diferencial",
   "d": "Fusible + DPS"
  },
  "correcta": "c",
  "explicacion": "La puesta a tierra facilita la circulación de la corriente de falla y el diferencial detecta la fuga y desconecta rápidamente el circuito. Referencia: RIC 05 y RIC 06.",
  "dificultad": "media"
 },
 {
  "id": "p-m4-046",
  "moduloId": "mod-4",
  "enunciado": "Una puesta a tierra mide 80 Ω. ¿Cuál es la conclusión más adecuada?",
  "alternativas": {
   "a": "Excelente resultado",
   "b": "No requiere mejoras",
   "c": "Debe evaluarse y probablemente mejorarse",
   "d": "La medición es inválida"
  },
  "correcta": "c",
  "explicacion": "Una resistencia elevada puede comprometer la efectividad de las protecciones y aumentar las tensiones peligrosas.",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-047",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es el objetivo principal de reducir la resistencia de puesta a tierra?",
  "alternativas": {
   "a": "Aumentar corriente nominal",
   "b": "Facilitar la circulación de corrientes de falla",
   "c": "Reducir frecuencia",
   "d": "Disminuir potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Facilitar la circulación de corrientes de falla».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-048",
  "moduloId": "mod-4",
  "enunciado": "Durante una medición Wenner se obtiene una resistividad elevada. ¿Qué consecuencia tiene para el diseño?",
  "alternativas": {
   "a": "Se requiere menos electrodo",
   "b": "Puede requerirse una malla o más electrodos",
   "c": "No afecta la puesta a tierra",
   "d": "El diferencial deja de ser necesario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Puede requerirse una malla o más electrodos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-049",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es la principal ventaja de una malla de tierra frente a una sola varilla?",
  "alternativas": {
   "a": "Menor superficie",
   "b": "Menor costo siempre",
   "c": "Mejor distribución de potenciales y menor resistencia",
   "d": "Elimina la necesidad de diferenciales"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Mejor distribución de potenciales y menor resistencia».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-050",
  "moduloId": "mod-4",
  "enunciado": "¿Qué ocurre si una instalación posee una puesta a tierra deficiente y no dispone de diferencial?",
  "alternativas": {
   "a": "Mayor nivel de protección",
   "b": "Riesgo elevado para las personas",
   "c": "Menor tensión de contacto",
   "d": "Menor corriente de falla"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Riesgo elevado para las personas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-051",
  "moduloId": "mod-4",
  "enunciado": "¿Cuál es el objetivo de coordinar la puesta a tierra con el interruptor diferencial?",
  "alternativas": {
   "a": "Reducir potencia",
   "b": "Garantizar la desconexión automática ante fallas",
   "c": "Aumentar corriente de carga",
   "d": "Reducir frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Garantizar la desconexión automática ante fallas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-052",
  "moduloId": "mod-4",
  "enunciado": "¿Qué tipo de DPS se instala generalmente en el origen de la instalación cuando existe riesgo de descargas atmosféricas?",
  "alternativas": {
   "a": "Tipo 3",
   "b": "Tipo 2",
   "c": "Tipo 1",
   "d": "Tipo AC"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Tipo 1».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-053",
  "moduloId": "mod-4",
  "enunciado": "¿Qué DPS se utiliza normalmente en tableros de distribución para protección contra sobretensiones inducidas?",
  "alternativas": {
   "a": "Tipo 1",
   "b": "Tipo 2",
   "c": "Tipo 3 exclusivamente",
   "d": "Ninguno"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Tipo 2».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-054",
  "moduloId": "mod-4",
  "enunciado": "¿Qué DPS se instala habitualmente cerca de equipos electrónicos sensibles?",
  "alternativas": {
   "a": "Tipo 1",
   "b": "Tipo 2",
   "c": "Tipo 3",
   "d": "Diferencial"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Tipo 3».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-055",
  "moduloId": "mod-4",
  "enunciado": "En una instalación con DPS Tipo 1 y Tipo 2, el objetivo es:",
  "alternativas": {
   "a": "Duplicar la tensión",
   "b": "Coordinar niveles de protección",
   "c": "Eliminar la puesta a tierra",
   "d": "Sustituir diferenciales"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Coordinar niveles de protección».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-056",
  "moduloId": "mod-4",
  "enunciado": "¿Qué condición puede incrementar significativamente la tensión de paso?",
  "alternativas": {
   "a": "Baja corriente de falla",
   "b": "Terreno uniforme y húmedo",
   "c": "Corriente de falla elevada concentrada en un punto",
   "d": "Equipotencialización adecuada"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Corriente de falla elevada concentrada en un punto».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-057",
  "moduloId": "mod-4",
  "enunciado": "Durante una inspección se detecta que las masas metálicas no están conectadas al conductor de protección. ¿Cuál es el principal riesgo?",
  "alternativas": {
   "a": "Bajo factor de potencia",
   "b": "Contacto indirecto peligroso",
   "c": "Mayor eficiencia energética",
   "d": "Caída de tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Contacto indirecto peligroso».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-058",
  "moduloId": "mod-4",
  "enunciado": "Una instalación presenta disparos frecuentes del diferencial sin fallas aparentes. ¿Cuál es una causa probable?",
  "alternativas": {
   "a": "Corrientes de fuga acumuladas",
   "b": "Baja tensión de suministro",
   "c": "Exceso de puesta a tierra",
   "d": "Baja potencia instalada"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corrientes de fuga acumuladas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-059",
  "moduloId": "mod-4",
  "enunciado": "En una medición de caída de potencial, resultados inestables pueden indicar:",
  "alternativas": {
   "a": "Buena puesta a tierra",
   "b": "Mala ubicación de electrodos auxiliares o interferencias",
   "c": "Exceso de conductores",
   "d": "Diferencial defectuoso"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mala ubicación de electrodos auxiliares o interferencias».",
  "dificultad": "alta"
 },
 {
  "id": "p-m4-060",
  "moduloId": "mod-4",
  "enunciado": "Durante una fiscalización SEC se verifica que existe puesta a tierra, pero las masas metálicas accesibles no están conectadas a ella. ¿La instalación cumple normativamente?",
  "alternativas": {
   "a": "Sí, porque existe electrodo",
   "b": "Sí, si hay DPS",
   "c": "No, porque falta continuidad del conductor de protección",
   "d": "Sí, si el diferencial es de 30 mA"
  },
  "correcta": "c",
  "explicacion": "La existencia del electrodo no es suficiente. Debe existir continuidad efectiva entre las masas y el sistema de puesta a tierra para garantizar la protección contra contactos indirectos. Referencia: RIC 05 -- Protección contra Tensiones Peligrosas RIC 06 -- Puestas a Tierra.",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-001",
  "moduloId": "mod-5",
  "enunciado": "¿Qué RIC regula los tableros eléctricos?",
  "alternativas": {
   "a": "RIC 01",
   "b": "RIC 02",
   "c": "RIC 03",
   "d": "RIC 10"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «RIC 02». Referencia: RIC 02 Tableros.",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-002",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la función principal de un tablero eléctrico?",
  "alternativas": {
   "a": "Generar energía",
   "b": "Distribuir, maniobrar y proteger circuitos",
   "c": "Medir energía",
   "d": "Corregir factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Distribuir, maniobrar y proteger circuitos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-003",
  "moduloId": "mod-5",
  "enunciado": "¿Qué elemento normalmente recibe la energía desde el alimentador principal?",
  "alternativas": {
   "a": "Enchufe",
   "b": "Luminaria",
   "c": "Tablero General",
   "d": "Interruptor simple"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Tablero General».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-004",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa la sigla TG?",
  "alternativas": {
   "a": "Tierra General",
   "b": "Transformador General",
   "c": "Tablero General",
   "d": "Tensión General"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Tablero General».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-005",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa la sigla TD?",
  "alternativas": {
   "a": "Tensión Diferencial",
   "b": "Tablero de Distribución",
   "c": "Tierra de Distribución",
   "d": "Tablero Dinámico"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Tablero de Distribución».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-006",
  "moduloId": "mod-5",
  "enunciado": "¿Qué indica el grado de protección IP?",
  "alternativas": {
   "a": "Resistencia mecánica",
   "b": "Protección contra ingreso de sólidos y líquidos",
   "c": "Potencia máxima",
   "d": "Corriente nominal"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Protección contra ingreso de sólidos y líquidos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-007",
  "moduloId": "mod-5",
  "enunciado": "¿Qué indica el grado IK?",
  "alternativas": {
   "a": "Protección contra sobretensiones",
   "b": "Resistencia al impacto mecánico",
   "c": "Capacidad de corriente",
   "d": "Resistencia de aislamiento"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Resistencia al impacto mecánico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-008",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa IP54?",
  "alternativas": {
   "a": "Protección parcial contra polvo y salpicaduras de agua",
   "b": "Protección total contra inmersión",
   "c": "Protección contra impacto",
   "d": "Protección diferencial"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección parcial contra polvo y salpicaduras de agua».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-009",
  "moduloId": "mod-5",
  "enunciado": "¿Qué barra se utiliza para conectar conductores de protección?",
  "alternativas": {
   "a": "Barra de fase",
   "b": "Barra de neutro",
   "c": "Barra PE o tierra",
   "d": "Barra de potencia"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Barra PE o tierra».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-010",
  "moduloId": "mod-5",
  "enunciado": "¿Qué barra se utiliza para conectar conductores neutros?",
  "alternativas": {
   "a": "Barra de tierra",
   "b": "Barra de neutro",
   "c": "Barra de fase",
   "d": "Barra equipotencial"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Barra de neutro».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-011",
  "moduloId": "mod-5",
  "enunciado": "¿Qué dispositivo protege contra sobrecargas y cortocircuitos?",
  "alternativas": {
   "a": "DPS",
   "b": "Interruptor automático",
   "c": "Contactor",
   "d": "Relé auxiliar"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-012",
  "moduloId": "mod-5",
  "enunciado": "¿Qué dispositivo protege principalmente contra corrientes de fuga?",
  "alternativas": {
   "a": "Interruptor diferencial",
   "b": "Fusible",
   "c": "DPS",
   "d": "Guardamotor"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Interruptor diferencial».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-013",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa corte omnipolar?",
  "alternativas": {
   "a": "Apertura simultánea de todos los conductores activos",
   "b": "Apertura sólo de la fase",
   "c": "Apertura sólo del neutro",
   "d": "Apertura de la tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Apertura simultánea de todos los conductores activos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-014",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la función principal de un DPS instalado en un tablero?",
  "alternativas": {
   "a": "Medir energía",
   "b": "Proteger contra sobretensiones",
   "c": "Proteger contra sobrecargas",
   "d": "Controlar motores"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Proteger contra sobretensiones».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-015",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa AFDD?",
  "alternativas": {
   "a": "Automatic Fault Detection Device",
   "b": "Arc Fault Detection Device",
   "c": "Automatic Fuse Distribution Device",
   "d": "Arc Frequency Detection Device"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Arc Fault Detection Device».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-016",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la función principal de un AFDD?",
  "alternativas": {
   "a": "Detectar fallas de arco eléctrico",
   "b": "Medir potencia",
   "c": "Detectar sobrecargas",
   "d": "Detectar sobretensiones"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Detectar fallas de arco eléctrico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-017",
  "moduloId": "mod-5",
  "enunciado": "¿Qué elemento debe estar claramente identificado en un tablero?",
  "alternativas": {
   "a": "Circuitos",
   "b": "Protecciones",
   "c": "Alimentadores",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-018",
  "moduloId": "mod-5",
  "enunciado": "¿Qué característica debe poseer un tablero accesible al público?",
  "alternativas": {
   "a": "Acceso libre a partes energizadas",
   "b": "Protección contra contactos accidentales",
   "c": "Ausencia de puerta",
   "d": "Sin identificación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Protección contra contactos accidentales».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-019",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la finalidad de la puerta de un tablero?",
  "alternativas": {
   "a": "Decoración",
   "b": "Protección y seguridad",
   "c": "Disipación térmica",
   "d": "Conexión eléctrica"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Protección y seguridad».",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-020",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es el objetivo principal del RIC 02?",
  "alternativas": {
   "a": "Regular alimentadores",
   "b": "Regular empalmes",
   "c": "Establecer requisitos de seguridad para tableros eléctricos",
   "d": "Regular puesta a tierra"
  },
  "correcta": "c",
  "explicacion": "El RIC 02 define los requisitos constructivos, de protección, identificación y seguridad de los tableros eléctricos. Referencia: RIC 02 Tableros.",
  "dificultad": "baja"
 },
 {
  "id": "p-m5-021",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la función principal de un Tablero General (TG)?",
  "alternativas": {
   "a": "Alimentar una sola carga",
   "b": "Recibir la energía principal y distribuirla a la instalación",
   "c": "Medir energía",
   "d": "Controlar motores"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Recibir la energía principal y distribuirla a la instalación».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-022",
  "moduloId": "mod-5",
  "enunciado": "¿Qué tablero alimenta normalmente a los circuitos finales de una vivienda?",
  "alternativas": {
   "a": "CCM",
   "b": "Tablero General",
   "c": "Tablero de Distribución",
   "d": "Tablero de Control"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Tablero de Distribución».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-023",
  "moduloId": "mod-5",
  "enunciado": "Un tablero instalado en exterior debe poseer como mínimo:",
  "alternativas": {
   "a": "Protección contra humedad y polvo",
   "b": "Sólo identificación",
   "c": "Sólo puerta metálica",
   "d": "Sólo barra de tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección contra humedad y polvo».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-024",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál de los siguientes grados IP ofrece mejor protección?",
  "alternativas": {
   "a": "IP20",
   "b": "IP44",
   "c": "IP54",
   "d": "IP66"
  },
  "correcta": "d",
  "explicacion": "A mayor grado IP, mayor protección frente al ingreso de sólidos y agua.",
  "dificultad": "media"
 },
 {
  "id": "p-m5-025",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa el primer dígito del código IP?",
  "alternativas": {
   "a": "Protección contra líquidos",
   "b": "Protección contra impactos",
   "c": "Protección contra ingreso de sólidos",
   "d": "Protección contra sobretensiones"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Protección contra ingreso de sólidos».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-026",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa el segundo dígito del código IP?",
  "alternativas": {
   "a": "Protección contra líquidos",
   "b": "Protección mecánica",
   "c": "Protección térmica",
   "d": "Protección eléctrica"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección contra líquidos».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-027",
  "moduloId": "mod-5",
  "enunciado": "¿Qué representa un grado IK elevado?",
  "alternativas": {
   "a": "Mayor resistencia al impacto mecánico",
   "b": "Mayor corriente nominal",
   "c": "Mayor protección diferencial",
   "d": "Menor temperatura"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Mayor resistencia al impacto mecánico».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-028",
  "moduloId": "mod-5",
  "enunciado": "¿Qué exige el concepto de corte omnipolar?",
  "alternativas": {
   "a": "Apertura únicamente de la fase",
   "b": "Apertura simultánea de todos los conductores activos",
   "c": "Apertura sólo del neutro",
   "d": "Apertura exclusiva del conductor de protección"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Apertura simultánea de todos los conductores activos».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-029",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es una ventaja del corte omnipolar?",
  "alternativas": {
   "a": "Facilita el aislamiento seguro de la instalación",
   "b": "Reduce frecuencia",
   "c": "Disminuye la potencia",
   "d": "Aumenta corriente"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Facilita el aislamiento seguro de la instalación».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-030",
  "moduloId": "mod-5",
  "enunciado": "¿Qué parámetro es fundamental para seleccionar un interruptor automático?",
  "alternativas": {
   "a": "Color",
   "b": "Corriente nominal",
   "c": "Marca comercial",
   "d": "Peso"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Corriente nominal».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-031",
  "moduloId": "mod-5",
  "enunciado": "¿Qué protección debe coordinarse con la ampacidad del conductor?",
  "alternativas": {
   "a": "DPS",
   "b": "AFDD",
   "c": "Interruptor automático",
   "d": "Contactor"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-032",
  "moduloId": "mod-5",
  "enunciado": "Un interruptor automático de 40 A protege normalmente un circuito cuya corriente de diseño:",
  "alternativas": {
   "a": "Es superior a 40 A",
   "b": "No supera su capacidad nominal",
   "c": "Es siempre 80 A",
   "d": "No tiene relación con el conductor"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «No supera su capacidad nominal».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-033",
  "moduloId": "mod-5",
  "enunciado": "¿Qué diferencial se utiliza normalmente para protección de personas?",
  "alternativas": {
   "a": "300 mA",
   "b": "500 mA",
   "c": "30 mA",
   "d": "1 A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «30 mA».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-034",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la función principal de un diferencial?",
  "alternativas": {
   "a": "Detectar corrientes residuales",
   "b": "Detectar sobretensiones",
   "c": "Medir energía",
   "d": "Corregir factor de potencia"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Detectar corrientes residuales».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-035",
  "moduloId": "mod-5",
  "enunciado": "¿Qué ocurre si existe una fuga a tierra superior a la sensibilidad del diferencial?",
  "alternativas": {
   "a": "Aumenta el voltaje",
   "b": "Opera el diferencial",
   "c": "Opera el DPS",
   "d": "Se activa el AFDD"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Opera el diferencial».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-036",
  "moduloId": "mod-5",
  "enunciado": "¿Dónde debe instalarse normalmente un DPS?",
  "alternativas": {
   "a": "Próximo al origen de la instalación o tablero principal",
   "b": "Sólo en enchufes",
   "c": "Sólo en luminarias",
   "d": "Sólo en motores"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Próximo al origen de la instalación o tablero principal».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-037",
  "moduloId": "mod-5",
  "enunciado": "¿Qué protección complementa al diferencial frente a sobretensiones?",
  "alternativas": {
   "a": "Fusible",
   "b": "DPS",
   "c": "Relé térmico",
   "d": "Contactor"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «DPS».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-038",
  "moduloId": "mod-5",
  "enunciado": "¿Qué tipo de falla detecta un AFDD?",
  "alternativas": {
   "a": "Sobrecarga",
   "b": "Cortocircuito franco",
   "c": "Arco eléctrico peligroso",
   "d": "Baja tensión"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Arco eléctrico peligroso».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-039",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es uno de los beneficios principales de un AFDD?",
  "alternativas": {
   "a": "Reducir frecuencia",
   "b": "Disminuir riesgo de incendio por arcos",
   "c": "Corregir factor de potencia",
   "d": "Medir corriente"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Disminuir riesgo de incendio por arcos».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-040",
  "moduloId": "mod-5",
  "enunciado": "¿Qué significa selectividad entre protecciones?",
  "alternativas": {
   "a": "Que operen todas simultáneamente",
   "b": "Que opere primero la protección más cercana a la falla",
   "c": "Que nunca operen",
   "d": "Que sólo opere el interruptor general"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Que opere primero la protección más cercana a la falla».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-041",
  "moduloId": "mod-5",
  "enunciado": "En un sistema selectivo, una falla en un circuito derivado debería provocar:",
  "alternativas": {
   "a": "Desconexión de toda la instalación",
   "b": "Desconexión únicamente del circuito afectado",
   "c": "Operación del DPS",
   "d": "Apertura del neutro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Desconexión únicamente del circuito afectado».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-042",
  "moduloId": "mod-5",
  "enunciado": "¿Qué información debe aparecer claramente identificada en un tablero?",
  "alternativas": {
   "a": "Circuitos",
   "b": "Protecciones",
   "c": "Función de cada circuito",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-043",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es el principal criterio para dimensionar físicamente un tablero?",
  "alternativas": {
   "a": "Número actual y futuro de circuitos",
   "b": "Color del gabinete",
   "c": "Tipo de luminarias",
   "d": "Potencia reactiva"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Número actual y futuro de circuitos».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-044",
  "moduloId": "mod-5",
  "enunciado": "Durante una inspección se observa una barra común para neutro y tierra dentro de un tablero de distribución final. ¿Qué debe verificarse?",
  "alternativas": {
   "a": "Que cumpla el esquema de puesta a tierra correspondiente",
   "b": "Que el tablero sea metálico",
   "c": "Que exista DPS",
   "d": "Que el IP sea superior a 20"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Que cumpla el esquema de puesta a tierra correspondiente».",
  "dificultad": "media"
 },
 {
  "id": "p-m5-045",
  "moduloId": "mod-5",
  "enunciado": "Según los principios del RIC 02, un tablero correctamente diseñado debe proporcionar:",
  "alternativas": {
   "a": "Seguridad, accesibilidad y protección adecuada",
   "b": "Sólo estética",
   "c": "Sólo capacidad de corriente",
   "d": "Sólo facilidad de instalación"
  },
  "correcta": "a",
  "explicacion": "El RIC 02 exige que los tableros permitan una operación segura, mantenimiento adecuado, protección contra contactos accidentales y correcta coordinación de protecciones. Referencia: RIC 02 -- Tableros Eléctricos.",
  "dificultad": "media"
 },
 {
  "id": "p-m5-046",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es el objetivo principal de la selectividad entre interruptores automáticos?",
  "alternativas": {
   "a": "Que todos los interruptores operen simultáneamente",
   "b": "Limitar la desconexión al circuito afectado",
   "c": "Reducir el voltaje",
   "d": "Disminuir la corriente de cortocircuito"
  },
  "correcta": "b",
  "explicacion": "La selectividad permite aislar únicamente la parte afectada por la falla.",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-047",
  "moduloId": "mod-5",
  "enunciado": "Ante un cortocircuito en un circuito terminal, ¿qué protección debería actuar primero en un sistema selectivo?",
  "alternativas": {
   "a": "Interruptor general",
   "b": "Diferencial principal",
   "c": "Protección más cercana a la falla",
   "d": "DPS"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Protección más cercana a la falla».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-048",
  "moduloId": "mod-5",
  "enunciado": "¿Qué característica de un interruptor automático influye directamente en su comportamiento frente a cortocircuitos?",
  "alternativas": {
   "a": "Color",
   "b": "Curva de disparo",
   "c": "Grado IP",
   "d": "Tipo de gabinete"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Curva de disparo».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-049",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál de las siguientes curvas es común en instalaciones residenciales y comerciales generales?",
  "alternativas": {
   "a": "Curva A",
   "b": "Curva B",
   "c": "Curva K exclusivamente",
   "d": "Curva Z exclusivamente"
  },
  "correcta": "b",
  "explicacion": "La curva B es habitual para cargas con bajas corrientes de arranque.",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-050",
  "moduloId": "mod-5",
  "enunciado": "¿Qué curva suele utilizarse para circuitos con corrientes moderadas de arranque, como motores pequeños?",
  "alternativas": {
   "a": "Curva B",
   "b": "Curva C",
   "c": "Curva Z",
   "d": "Curva L"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Curva C».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-051",
  "moduloId": "mod-5",
  "enunciado": "¿Qué puede ocurrir si se instala una curva demasiado sensible en un circuito con motores?",
  "alternativas": {
   "a": "Mejor selectividad",
   "b": "Disparos intempestivos",
   "c": "Menor protección",
   "d": "Menor corriente de arranque"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Disparos intempestivos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-052",
  "moduloId": "mod-5",
  "enunciado": "¿Qué busca la coordinación entre diferenciales?",
  "alternativas": {
   "a": "Que disparen todos al mismo tiempo",
   "b": "Que opere el diferencial más cercano a la falla",
   "c": "Que ninguno opere",
   "d": "Que sólo opere el general"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Que opere el diferencial más cercano a la falla».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-053",
  "moduloId": "mod-5",
  "enunciado": "En una instalación moderna, la combinación DPS + Diferencial + AFDD permite protección contra:",
  "alternativas": {
   "a": "Sólo fugas a tierra",
   "b": "Sólo sobretensiones",
   "c": "Sólo arcos eléctricos",
   "d": "Sobretensiones, fugas y fallas de arco"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Sobretensiones, fugas y fallas de arco».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-054",
  "moduloId": "mod-5",
  "enunciado": "¿Cuál es la función principal del AFDD dentro del esquema de protección?",
  "alternativas": {
   "a": "Detectar sobrecargas",
   "b": "Detectar arcos eléctricos peligrosos",
   "c": "Medir energía",
   "d": "Corregir factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Detectar arcos eléctricos peligrosos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-055",
  "moduloId": "mod-5",
  "enunciado": "En un tablero industrial, las barras de distribución deben seleccionarse considerando:",
  "alternativas": {
   "a": "Corriente máxima esperada",
   "b": "Corriente de cortocircuito",
   "c": "Temperatura de operación",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-056",
  "moduloId": "mod-5",
  "enunciado": "Una barra diseñada para 250 A alimentará una carga permanente de 300 A. ¿Cuál es el principal riesgo?",
  "alternativas": {
   "a": "Disminución de tensión",
   "b": "Sobrecalentamiento",
   "c": "Menor selectividad",
   "d": "Menor frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sobrecalentamiento».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-057",
  "moduloId": "mod-5",
  "enunciado": "¿Qué condición suele indicar un borne flojo dentro de un tablero?",
  "alternativas": {
   "a": "Temperatura uniforme",
   "b": "Punto caliente localizado",
   "c": "Disminución de resistencia",
   "d": "Aumento de aislamiento"
  },
  "correcta": "b",
  "explicacion": "Las conexiones deficientes generan resistencia de contacto y calentamiento.",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-058",
  "moduloId": "mod-5",
  "enunciado": "Durante una inspección termográfica se detecta un interruptor mucho más caliente que los demás. La causa más probable es:",
  "alternativas": {
   "a": "Sobrecarga o mala conexión",
   "b": "Exceso de puesta a tierra",
   "c": "Baja corriente",
   "d": "Mejor rendimiento"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sobrecarga o mala conexión».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-059",
  "moduloId": "mod-5",
  "enunciado": "Según el RIC 02, un tablero debe permitir:",
  "alternativas": {
   "a": "Operación y mantenimiento seguros",
   "b": "Acceso directo a partes energizadas",
   "c": "Eliminación de protecciones",
   "d": "Uso sin identificación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Operación y mantenimiento seguros».",
  "dificultad": "alta"
 },
 {
  "id": "p-m5-060",
  "moduloId": "mod-5",
  "enunciado": "En un proyecto industrial, el cálculo demuestra una corriente máxima de 180 A y una corriente de cortocircuito de 25 kA. Para seleccionar correctamente el interruptor general se debe verificar:",
  "alternativas": {
   "a": "Sólo la corriente nominal",
   "b": "Sólo el grado IP",
   "c": "Corriente nominal y capacidad de interrupción",
   "d": "Sólo el tamaño físico"
  },
  "correcta": "c",
  "explicacion": "El interruptor debe soportar la corriente de servicio y tener poder de corte suficiente para interrumpir el cortocircuito previsto de manera segura. Referencia: RIC 02 -- Tableros Eléctricos.",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-001",
  "moduloId": "mod-6",
  "enunciado": "¿Qué RIC regula los empalmes eléctricos?",
  "alternativas": {
   "a": "RIC 02",
   "b": "RIC 01",
   "c": "RIC 03",
   "d": "RIC 10"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «RIC 01». Referencia: RIC 01 Empalmes.",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-002",
  "moduloId": "mod-6",
  "enunciado": "¿Qué es un empalme eléctrico?",
  "alternativas": {
   "a": "Un interruptor automático",
   "b": "El punto de conexión entre la red de distribución y la instalación del usuario",
   "c": "Un tablero de distribución",
   "d": "Un sistema de puesta a tierra"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «El punto de conexión entre la red de distribución y la instalación del usuario».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-003",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es la función principal de un empalme?",
  "alternativas": {
   "a": "Medir resistencia",
   "b": "Entregar energía desde la red pública a la instalación",
   "c": "Proteger contra sobretensiones",
   "d": "Corregir factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Entregar energía desde la red pública a la instalación».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-004",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es el tipo de empalme más común en viviendas unifamiliares?",
  "alternativas": {
   "a": "Trifásico 380 V",
   "b": "Monofásico 220 V",
   "c": "Media tensión",
   "d": "Alta tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Monofásico 220 V».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-005",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es la tensión típica de un empalme trifásico de baja tensión en Chile?",
  "alternativas": {
   "a": "110/220 V",
   "b": "127/220 V",
   "c": "220/380 V",
   "d": "440/760 V"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «220/380 V».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-006",
  "moduloId": "mod-6",
  "enunciado": "¿Qué es una acometida?",
  "alternativas": {
   "a": "Conductor que conecta el empalme con la red de distribución",
   "b": "Protección diferencial",
   "c": "Barra de tierra",
   "d": "Interruptor general"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Conductor que conecta el empalme con la red de distribución».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-007",
  "moduloId": "mod-6",
  "enunciado": "¿Cuáles son los tipos principales de acometida?",
  "alternativas": {
   "a": "Aérea y subterránea",
   "b": "Monofásica y trifásica",
   "c": "Interior y exterior",
   "d": "Activa y pasiva"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Aérea y subterránea».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-008",
  "moduloId": "mod-6",
  "enunciado": "¿Qué ventaja presenta una acometida subterránea?",
  "alternativas": {
   "a": "Menor protección mecánica",
   "b": "Mayor exposición climática",
   "c": "Mejor protección estética y mecánica",
   "d": "Menor vida útil"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Mejor protección estética y mecánica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-009",
  "moduloId": "mod-6",
  "enunciado": "¿Qué equipo registra el consumo de energía eléctrica?",
  "alternativas": {
   "a": "Diferencial",
   "b": "Medidor",
   "c": "DPS",
   "d": "AFDD"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Medidor».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-010",
  "moduloId": "mod-6",
  "enunciado": "¿Qué es un centro de medición?",
  "alternativas": {
   "a": "Lugar donde se instala el medidor y equipos asociados",
   "b": "Sala de control industrial",
   "c": "Tablero de distribución",
   "d": "Sistema de puesta a tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Lugar donde se instala el medidor y equipos asociados».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-011",
  "moduloId": "mod-6",
  "enunciado": "¿Qué conductor conecta el empalme con el tablero general?",
  "alternativas": {
   "a": "Derivación",
   "b": "Alimentador",
   "c": "Conductor de protección",
   "d": "Neutro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Alimentador».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-012",
  "moduloId": "mod-6",
  "enunciado": "¿Qué parámetro es fundamental para dimensionar un alimentador?",
  "alternativas": {
   "a": "Corriente de diseño",
   "b": "Color del conductor",
   "c": "Marca comercial",
   "d": "Longitud del rollo"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corriente de diseño».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-013",
  "moduloId": "mod-6",
  "enunciado": "¿Qué documento se utiliza para declarar una instalación eléctrica interior?",
  "alternativas": {
   "a": "TE1",
   "b": "TE2",
   "c": "TE3",
   "d": "TE4"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «TE1».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-060",
  "moduloId": "mod-6",
  "enunciado": "¿Quién puede firmar una declaración TE1?",
  "alternativas": {
   "a": "Propietario",
   "b": "Constructor",
   "c": "Instalador autorizado SEC",
   "d": "Distribuidora"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Instalador autorizado SEC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-014",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es la función principal de la protección general de una instalación?",
  "alternativas": {
   "a": "Medir energía",
   "b": "Proteger alimentadores e instalación principal",
   "c": "Controlar iluminación",
   "d": "Corregir factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Proteger alimentadores e instalación principal».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-015",
  "moduloId": "mod-6",
  "enunciado": "¿Qué tipo de protección se utiliza normalmente como protección general?",
  "alternativas": {
   "a": "Interruptor automático",
   "b": "Pulsador",
   "c": "Relé auxiliar",
   "d": "Contactor"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-016",
  "moduloId": "mod-6",
  "enunciado": "¿Qué significa demanda máxima?",
  "alternativas": {
   "a": "Consumo anual",
   "b": "Mayor potencia requerida simultáneamente",
   "c": "Energía reactiva",
   "d": "Corriente de cortocircuito"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor potencia requerida simultáneamente».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-017",
  "moduloId": "mod-6",
  "enunciado": "¿Por qué se calcula la demanda máxima?",
  "alternativas": {
   "a": "Para seleccionar correctamente conductores y protecciones",
   "b": "Para elegir colores de conductores",
   "c": "Para calcular frecuencia",
   "d": "Para medir resistencia"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Para seleccionar correctamente conductores y protecciones».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-018",
  "moduloId": "mod-6",
  "enunciado": "¿Qué tipo de empalme suele utilizar una pequeña industria?",
  "alternativas": {
   "a": "Monofásico",
   "b": "Trifásico",
   "c": "Corriente continua",
   "d": "Media frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Trifásico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-019",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es el objetivo principal del RIC 01?",
  "alternativas": {
   "a": "Regular tableros",
   "b": "Regular empalmes y conexiones de suministro",
   "c": "Regular puestas a tierra",
   "d": "Regular instalaciones fotovoltaicas"
  },
  "correcta": "b",
  "explicacion": "El RIC 01 establece los requisitos técnicos y de seguridad para los empalmes eléctricos de baja tensión. Referencia: RIC 01 Empalmes.",
  "dificultad": "baja"
 },
 {
  "id": "p-m6-020",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es la principal ventaja de un empalme trifásico respecto de uno monofásico?",
  "alternativas": {
   "a": "Menor capacidad de potencia",
   "b": "Mayor capacidad para alimentar cargas elevadas",
   "c": "Menor tensión",
   "d": "Menor seguridad"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor capacidad para alimentar cargas elevadas». Referencia: RIC 01.",
  "dificultad": "media"
 },
 {
  "id": "p-m6-021",
  "moduloId": "mod-6",
  "enunciado": "¿Qué tipo de empalme suele seleccionarse para una vivienda con carga instalada de 8 kW?",
  "alternativas": {
   "a": "Trifásico obligatorio",
   "b": "Monofásico generalmente suficiente",
   "c": "Media tensión",
   "d": "Alta tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Monofásico generalmente suficiente».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-022",
  "moduloId": "mod-6",
  "enunciado": "¿Qué característica justifica normalmente un empalme trifásico?",
  "alternativas": {
   "a": "Baja demanda",
   "b": "Presencia de motores trifásicos o altas potencias",
   "c": "Menor longitud de acometida",
   "d": "Uso exclusivo de iluminación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Presencia de motores trifásicos o altas potencias».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-023",
  "moduloId": "mod-6",
  "enunciado": "¿Qué es un centro de medición colectivo?",
  "alternativas": {
   "a": "Un tablero de fuerza",
   "b": "Un conjunto de medidores para varios usuarios",
   "c": "Un sistema de puesta a tierra",
   "d": "Un transformador"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Un conjunto de medidores para varios usuarios».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-024",
  "moduloId": "mod-6",
  "enunciado": "¿Dónde es común encontrar centros de medición colectivos?",
  "alternativas": {
   "a": "Viviendas aisladas",
   "b": "Edificios y condominios",
   "c": "Plantas fotovoltaicas",
   "d": "Subestaciones"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Edificios y condominios».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-025",
  "moduloId": "mod-6",
  "enunciado": "¿Qué información proporciona principalmente un medidor eléctrico?",
  "alternativas": {
   "a": "Resistencia de aislamiento",
   "b": "Energía consumida",
   "c": "Factor de potencia",
   "d": "Corriente de falla"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Energía consumida».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-026",
  "moduloId": "mod-6",
  "enunciado": "La demanda máxima corresponde a:",
  "alternativas": {
   "a": "La suma de todas las potencias instaladas sin factores",
   "b": "La máxima carga simultánea esperada",
   "c": "El consumo anual",
   "d": "La energía reactiva mensual"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «La máxima carga simultánea esperada».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-027",
  "moduloId": "mod-6",
  "enunciado": "¿Por qué no siempre se considera el 100% de la potencia instalada para dimensionar un alimentador?",
  "alternativas": {
   "a": "Porque todas las cargas no operan simultáneamente",
   "b": "Porque la tensión disminuye",
   "c": "Porque la frecuencia cambia",
   "d": "Porque lo exige el medidor"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Porque todas las cargas no operan simultáneamente».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-028",
  "moduloId": "mod-6",
  "enunciado": "Una instalación posee 12 kW de demanda máxima a 220 V monofásicos. ¿Cuál es la corriente aproximada?",
  "alternativas": {
   "a": "27 A",
   "b": "40 A",
   "c": "55 A",
   "d": "80 A"
  },
  "correcta": "c",
  "explicacion": "I = P/V I = 12.000 / 220 ≈ 54,5 A",
  "dificultad": "media"
 },
 {
  "id": "p-m6-029",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es el primer criterio para seleccionar un alimentador?",
  "alternativas": {
   "a": "Color del conductor",
   "b": "Corriente de diseño",
   "c": "Fabricante",
   "d": "Longitud del tablero"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Corriente de diseño».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-030",
  "moduloId": "mod-6",
  "enunciado": "Además de la ampacidad, ¿qué debe verificarse en un alimentador?",
  "alternativas": {
   "a": "Caída de tensión",
   "b": "Temperatura",
   "c": "Condiciones de instalación",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-031",
  "moduloId": "mod-6",
  "enunciado": "¿Qué debe proteger la protección general de una instalación?",
  "alternativas": {
   "a": "Solamente el medidor",
   "b": "Solamente los enchufes",
   "c": "El alimentador principal",
   "d": "Sólo la puesta a tierra"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «El alimentador principal».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-032",
  "moduloId": "mod-6",
  "enunciado": "Si la corriente calculada es 45 A, una protección general razonable podría ser:",
  "alternativas": {
   "a": "10 A",
   "b": "20 A",
   "c": "50 A",
   "d": "100 A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «50 A».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-033",
  "moduloId": "mod-6",
  "enunciado": "¿Qué ocurre si la protección general supera ampliamente la capacidad del alimentador?",
  "alternativas": {
   "a": "Mejora la protección",
   "b": "Existe riesgo de sobrecalentamiento del conductor",
   "c": "Disminuye la corriente",
   "d": "Mejora la selectividad"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Existe riesgo de sobrecalentamiento del conductor».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-034",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es la función del alimentador principal?",
  "alternativas": {
   "a": "Conectar cargas terminales",
   "b": "Conectar empalme y tablero general",
   "c": "Conectar luminarias",
   "d": "Conectar DPS"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Conectar empalme y tablero general».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-035",
  "moduloId": "mod-6",
  "enunciado": "¿Qué documento contiene información técnica relevante para la declaración de una instalación?",
  "alternativas": {
   "a": "Factura de materiales",
   "b": "TE1",
   "c": "Boleta de venta",
   "d": "Certificado bancario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «TE1».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-036",
  "moduloId": "mod-6",
  "enunciado": "¿Qué antecedente suele formar parte de una declaración TE1?",
  "alternativas": {
   "a": "Potencia instalada",
   "b": "Dirección de la instalación",
   "c": "Datos del instalador",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-037",
  "moduloId": "mod-6",
  "enunciado": "¿Qué objetivo tiene la coordinación empalme--alimentador--tablero?",
  "alternativas": {
   "a": "Garantizar operación segura y continuidad de servicio",
   "b": "Reducir frecuencia",
   "c": "Disminuir voltaje",
   "d": "Eliminar protecciones"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Garantizar operación segura y continuidad de servicio».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-038",
  "moduloId": "mod-6",
  "enunciado": "Una acometida subterránea suele requerir:",
  "alternativas": {
   "a": "Protección mecánica adecuada",
   "b": "Menor planificación",
   "c": "Menor profundidad siempre",
   "d": "Eliminación de ductos"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección mecánica adecuada».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-039",
  "moduloId": "mod-6",
  "enunciado": "¿Qué ventaja posee una acometida aérea?",
  "alternativas": {
   "a": "Mayor costo normalmente",
   "b": "Menor exposición visual",
   "c": "Instalación generalmente más económica",
   "d": "Mayor protección mecánica"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Instalación generalmente más económica».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-040",
  "moduloId": "mod-6",
  "enunciado": "¿Qué tipo de suministro requiere normalmente una pequeña industria con motores trifásicos?",
  "alternativas": {
   "a": "Monofásico",
   "b": "Trifásico",
   "c": "Corriente continua",
   "d": "Baja frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Trifásico».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-041",
  "moduloId": "mod-6",
  "enunciado": "Si un edificio posee múltiples usuarios, normalmente se emplea:",
  "alternativas": {
   "a": "Un único medidor para todos",
   "b": "Centro de medición colectivo",
   "c": "Sólo submedidores internos",
   "d": "Un DPS central"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Centro de medición colectivo».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-042",
  "moduloId": "mod-6",
  "enunciado": "Durante una revisión SEC se detecta que la protección general es inferior a la corriente normal de operación. ¿Qué ocurrirá probablemente?",
  "alternativas": {
   "a": "Funcionamiento normal",
   "b": "Disparos frecuentes",
   "c": "Menor temperatura",
   "d": "Menor caída de tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Disparos frecuentes».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-043",
  "moduloId": "mod-6",
  "enunciado": "¿Qué debe verificarse entre la corriente nominal del alimentador y la protección general?",
  "alternativas": {
   "a": "Compatibilidad y coordinación",
   "b": "Color del aislamiento",
   "c": "Marca comercial",
   "d": "Tipo de medidor"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Compatibilidad y coordinación».",
  "dificultad": "media"
 },
 {
  "id": "p-m6-044",
  "moduloId": "mod-6",
  "enunciado": "Según el RIC 01, un empalme correctamente diseñado debe garantizar:",
  "alternativas": {
   "a": "Seguridad, medición adecuada y capacidad de suministro",
   "b": "Sólo medición",
   "c": "Sólo protección diferencial",
   "d": "Sólo continuidad mecánica"
  },
  "correcta": "a",
  "explicacion": "El empalme constituye la interfaz entre la red pública y la instalación particular, debiendo cumplir requisitos de seguridad, capacidad y medición. Referencia: RIC 01 Empalmes.",
  "dificultad": "media"
 },
 {
  "id": "p-m6-045",
  "moduloId": "mod-6",
  "enunciado": "Una instalación trifásica posee una demanda máxima de 30 kW a 380 V y factor de potencia 0,9. ¿Cuál es la corriente aproximada?",
  "alternativas": {
   "a": "35 A",
   "b": "45 A",
   "c": "51 A",
   "d": "70 A"
  },
  "correcta": "c",
  "explicacion": "P= 3 ​ ⋅V⋅I⋅cosϕ I = 30.000 / (1,732 × 380 × 0,9) I ≈ 50,7 A Referencia: RIC 01 y RIC 03.",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-046",
  "moduloId": "mod-6",
  "enunciado": "Una instalación monofásica posee una demanda máxima de 15 kW a 220 V. ¿Cuál es la corriente aproximada?",
  "alternativas": {
   "a": "45 A",
   "b": "55 A",
   "c": "68 A",
   "d": "80 A"
  },
  "correcta": "c",
  "explicacion": "I = P/V I = 15.000 / 220 I ≈ 68 A",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-047",
  "moduloId": "mod-6",
  "enunciado": "Al dimensionar un alimentador, ¿cuál es el criterio más restrictivo?",
  "alternativas": {
   "a": "Color del conductor",
   "b": "Ampacidad y caída de tensión",
   "c": "Longitud del tablero",
   "d": "Marca del fabricante"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Ampacidad y caída de tensión».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-048",
  "moduloId": "mod-6",
  "enunciado": "Una protección general de 100 A protege un alimentador cuya capacidad es de 70 A. Esta situación:",
  "alternativas": {
   "a": "Es correcta",
   "b": "Mejora la selectividad",
   "c": "Genera riesgo de sobrecarga del conductor",
   "d": "Reduce la temperatura"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Genera riesgo de sobrecarga del conductor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-049",
  "moduloId": "mod-6",
  "enunciado": "¿Qué debe verificarse entre la corriente de diseño y la protección general?",
  "alternativas": {
   "a": "Que la protección sea compatible con el conductor",
   "b": "Sólo el grado IP",
   "c": "Sólo la tensión",
   "d": "Sólo la marca"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Que la protección sea compatible con el conductor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-050",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es una ventaja de un centro de medición colectivo correctamente diseñado?",
  "alternativas": {
   "a": "Facilita medición, mantenimiento y gestión de múltiples usuarios",
   "b": "Elimina protecciones",
   "c": "Reduce la tensión",
   "d": "Sustituye tableros"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Facilita medición, mantenimiento y gestión de múltiples usuarios».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-051",
  "moduloId": "mod-6",
  "enunciado": "Durante una fiscalización SEC se detecta que la potencia declarada en TE1 no coincide con la instalación ejecutada. Esto puede generar:",
  "alternativas": {
   "a": "Observaciones o sanciones",
   "b": "Aprobación automática",
   "c": "Ninguna consecuencia",
   "d": "Cambio de medidor inmediato"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Observaciones o sanciones».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-052",
  "moduloId": "mod-6",
  "enunciado": "¿Qué información técnica debe ser consistente entre planos, memoria de cálculo y TE1?",
  "alternativas": {
   "a": "Potencia instalada",
   "b": "Corriente de diseño",
   "c": "Datos del proyecto",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-053",
  "moduloId": "mod-6",
  "enunciado": "¿Qué error de diseño puede provocar disparos frecuentes de la protección general?",
  "alternativas": {
   "a": "Protección subdimensionada",
   "b": "Alimentador sobredimensionado",
   "c": "Exceso de conductores PE",
   "d": "Bajo nivel de iluminación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección subdimensionada».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-054",
  "moduloId": "mod-6",
  "enunciado": "En una instalación trifásica industrial, la pérdida de una fase puede provocar:",
  "alternativas": {
   "a": "Operación normal de motores",
   "b": "Sobrecalentamiento y fallas en motores",
   "c": "Menor corriente en todas las fases",
   "d": "Mejor factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sobrecalentamiento y fallas en motores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-055",
  "moduloId": "mod-6",
  "enunciado": "Una acometida subterránea presenta ductos insuficientes para el número de conductores instalados. Esto puede provocar:",
  "alternativas": {
   "a": "Mejor disipación térmica",
   "b": "Sobrecalentamiento y dificultad de mantenimiento",
   "c": "Menor caída de tensión",
   "d": "Mayor selectividad"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sobrecalentamiento y dificultad de mantenimiento».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-056",
  "moduloId": "mod-6",
  "enunciado": "¿Cuál es el principal objetivo de coordinar empalme, alimentador y tablero?",
  "alternativas": {
   "a": "Reducir costos exclusivamente",
   "b": "Garantizar seguridad y continuidad de suministro",
   "c": "Aumentar frecuencia",
   "d": "Disminuir tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Garantizar seguridad y continuidad de suministro».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-057",
  "moduloId": "mod-6",
  "enunciado": "Durante una revisión técnica se detecta que la corriente máxima calculada es 80 A y el alimentador seleccionado tiene capacidad corregida de 75 A. ¿La selección es adecuada?",
  "alternativas": {
   "a": "Sí",
   "b": "Sólo si existe diferencial",
   "c": "No, debe aumentarse la sección",
   "d": "Sí, si la longitud es corta"
  },
  "correcta": "c",
  "explicacion": "La capacidad corregida del conductor debe ser igual o superior a la corriente de diseño.",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-058",
  "moduloId": "mod-6",
  "enunciado": "En un edificio con múltiples usuarios, la incorrecta identificación de medidores puede ocasionar:",
  "alternativas": {
   "a": "Errores de facturación y problemas operativos",
   "b": "Mejor selectividad",
   "c": "Menor caída de tensión",
   "d": "Mayor seguridad"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Errores de facturación y problemas operativos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m6-059",
  "moduloId": "mod-6",
  "enunciado": "Durante una fiscalización SEC se verifica que el empalme, alimentador y protección cumplen individualmente, pero la coordinación entre ellos es incorrecta. ¿La instalación cumple normativamente?",
  "alternativas": {
   "a": "Sí, porque cada elemento cumple por separado",
   "b": "Sí, si existe puesta a tierra",
   "c": "No, debe verificarse el sistema completo",
   "d": "Sí, si la demanda es baja"
  },
  "correcta": "c",
  "explicacion": "La normativa exige verificar la coordinación integral entre empalme, alimentadores, conductores, protecciones y tableros. El cumplimiento individual no garantiza la seguridad del conjunto. Referencia: RIC 01 Empalmes, RIC 03 Alimentadores y DS N°8.",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-001",
  "moduloId": "mod-7",
  "enunciado": "¿Qué RIC regula las instalaciones eléctricas de uso general?",
  "alternativas": {
   "a": "RIC 01",
   "b": "RIC 05",
   "c": "RIC 10",
   "d": "RIC 18"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 10». Referencia: RIC 10.",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-002",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es el objetivo principal de una instalación eléctrica domiciliaria?",
  "alternativas": {
   "a": "Generar energía",
   "b": "Distribuir energía de forma segura a las cargas de la vivienda",
   "c": "Corregir factor de potencia",
   "d": "Medir resistividad del suelo"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Distribuir energía de forma segura a las cargas de la vivienda».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-003",
  "moduloId": "mod-7",
  "enunciado": "¿Qué sección de conductor se utiliza habitualmente para circuitos de alumbrado?",
  "alternativas": {
   "a": "1,5 mm²",
   "b": "2,5 mm²",
   "c": "4 mm²",
   "d": "10 mm²"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «1,5 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-004",
  "moduloId": "mod-7",
  "enunciado": "¿Qué sección de conductor se utiliza habitualmente para circuitos de enchufes?",
  "alternativas": {
   "a": "1,5 mm²",
   "b": "2,5 mm²",
   "c": "4 mm²",
   "d": "6 mm²"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «2,5 mm²».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-005",
  "moduloId": "mod-7",
  "enunciado": "¿Qué tipo de conexión se utiliza normalmente para enchufes domiciliarios?",
  "alternativas": {
   "a": "Serie",
   "b": "Paralelo",
   "c": "Resonante",
   "d": "Mixta obligatoria"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Paralelo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-006",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es la ventaja de conectar enchufes en paralelo?",
  "alternativas": {
   "a": "Todos dependen entre sí",
   "b": "Cada enchufe opera independientemente",
   "c": "Reduce voltaje",
   "d": "Elimina protecciones"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Cada enchufe opera independientemente».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-007",
  "moduloId": "mod-7",
  "enunciado": "¿Qué circuito se considera normalmente un circuito especial?",
  "alternativas": {
   "a": "Alumbrado de dormitorio",
   "b": "Enchufe de living",
   "c": "Cocina eléctrica",
   "d": "Timbre"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Cocina eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-008",
  "moduloId": "mod-7",
  "enunciado": "¿Qué función cumple el tablero domiciliario?",
  "alternativas": {
   "a": "Generar energía",
   "b": "Distribuir y proteger los circuitos de la vivienda",
   "c": "Medir resistencia de tierra",
   "d": "Almacenar energía"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Distribuir y proteger los circuitos de la vivienda».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-009",
  "moduloId": "mod-7",
  "enunciado": "¿Qué protección se utiliza para detectar corrientes de fuga?",
  "alternativas": {
   "a": "DPS",
   "b": "Diferencial",
   "c": "Contactor",
   "d": "Relé térmico"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Diferencial».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-010",
  "moduloId": "mod-7",
  "enunciado": "¿Qué sensibilidad diferencial se utiliza habitualmente para protección de personas?",
  "alternativas": {
   "a": "10 A",
   "b": "300 mA",
   "c": "30 mA",
   "d": "1 A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «30 mA».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-011",
  "moduloId": "mod-7",
  "enunciado": "¿Qué elemento conecta las masas metálicas a tierra?",
  "alternativas": {
   "a": "Fase",
   "b": "Neutro",
   "c": "Conductor de protección",
   "d": "Alimentador"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Conductor de protección».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-060",
  "moduloId": "mod-7",
  "enunciado": "¿Qué color identifica normalmente al conductor de protección?",
  "alternativas": {
   "a": "Rojo",
   "b": "Azul",
   "c": "Verde/amarillo",
   "d": "Negro"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Verde/amarillo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-012",
  "moduloId": "mod-7",
  "enunciado": "¿Qué documento resume las potencias de los distintos circuitos?",
  "alternativas": {
   "a": "Plano arquitectónico",
   "b": "Cuadro de carga",
   "c": "TE1",
   "d": "Certificado SEC"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Cuadro de carga».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-013",
  "moduloId": "mod-7",
  "enunciado": "¿Qué parámetro se utiliza para dimensionar los circuitos?",
  "alternativas": {
   "a": "Corriente de diseño",
   "b": "Color de los conductores",
   "c": "Marca de las protecciones",
   "d": "Altura de la vivienda"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corriente de diseño».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-014",
  "moduloId": "mod-7",
  "enunciado": "¿Qué canalización se utiliza frecuentemente en instalaciones residenciales empotradas?",
  "alternativas": {
   "a": "RMC",
   "b": "PVC",
   "c": "Bandeja portacables",
   "d": "Canalización industrial pesada"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «PVC».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-015",
  "moduloId": "mod-7",
  "enunciado": "¿Qué protección actúa frente a sobrecargas y cortocircuitos?",
  "alternativas": {
   "a": "DPS",
   "b": "Interruptor automático",
   "c": "Diferencial",
   "d": "AFDD únicamente"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-016",
  "moduloId": "mod-7",
  "enunciado": "¿Qué representa el balance de cargas?",
  "alternativas": {
   "a": "Distribución equilibrada de la demanda eléctrica",
   "b": "Medición de tensión",
   "c": "Resistencia del conductor",
   "d": "Potencia reactiva"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Distribución equilibrada de la demanda eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-017",
  "moduloId": "mod-7",
  "enunciado": "¿Qué sistema de puesta a tierra se utiliza habitualmente en instalaciones residenciales?",
  "alternativas": {
   "a": "Sistema de protección mediante conductor PE y electrodo de tierra",
   "b": "Sin puesta a tierra",
   "c": "Sólo neutro",
   "d": "Sólo DPS"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sistema de protección mediante conductor PE y electrodo de tierra».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-018",
  "moduloId": "mod-7",
  "enunciado": "¿Qué documento técnico justifica los cálculos realizados en el proyecto?",
  "alternativas": {
   "a": "Factura",
   "b": "Memoria de cálculo",
   "c": "Boleta",
   "d": "Certificado bancario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Memoria de cálculo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-019",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es el objetivo principal del RIC 10?",
  "alternativas": {
   "a": "Regular empalmes",
   "b": "Regular instalaciones de uso general garantizando seguridad y funcionamiento adecuado",
   "c": "Regular subestaciones",
   "d": "Regular sistemas fotovoltaicos"
  },
  "correcta": "b",
  "explicacion": "El RIC 10 establece requisitos para el diseño, ejecución y seguridad de las instalaciones eléctricas de uso general en baja tensión. Referencia: RIC 10 -- Instalaciones de Uso General NSTALACIONES ELÉCTRICAS DOMICILIARIAS.",
  "dificultad": "baja"
 },
 {
  "id": "p-m7-020",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es el objetivo principal de separar los circuitos de alumbrado y enchufes en una vivienda?",
  "alternativas": {
   "a": "Reducir el número de conductores",
   "b": "Mejorar seguridad y continuidad de servicio",
   "c": "Reducir la tensión",
   "d": "Eliminar protecciones"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mejorar seguridad y continuidad de servicio». Referencia: RIC 10.",
  "dificultad": "media"
 },
 {
  "id": "p-m7-021",
  "moduloId": "mod-7",
  "enunciado": "¿Qué información entrega un cuadro de carga?",
  "alternativas": {
   "a": "Potencia instalada por circuito",
   "b": "Corriente estimada",
   "c": "Protección asociada",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-022",
  "moduloId": "mod-7",
  "enunciado": "¿Qué parámetro se obtiene directamente de la potencia y tensión de una carga?",
  "alternativas": {
   "a": "Corriente",
   "b": "Resistencia del suelo",
   "c": "Frecuencia",
   "d": "Energía mensual"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corriente».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-023",
  "moduloId": "mod-7",
  "enunciado": "Una carga de 2.200 W conectada a 220 V consume aproximadamente:",
  "alternativas": {
   "a": "5 A",
   "b": "10 A",
   "c": "15 A",
   "d": "20 A"
  },
  "correcta": "b",
  "explicacion": "I = P/V = 2200/220 = 10 A",
  "dificultad": "media"
 },
 {
  "id": "p-m7-024",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es la finalidad del balance de cargas en una vivienda?",
  "alternativas": {
   "a": "Reducir longitud de ductos",
   "b": "Distribuir equilibradamente la demanda",
   "c": "Reducir la frecuencia",
   "d": "Disminuir la resistencia de tierra"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Distribuir equilibradamente la demanda».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-025",
  "moduloId": "mod-7",
  "enunciado": "En una vivienda con suministro trifásico, el balance de cargas busca:",
  "alternativas": {
   "a": "Igualar aproximadamente la carga en cada fase",
   "b": "Concentrar todas las cargas en una fase",
   "c": "Reducir la tensión",
   "d": "Eliminar el neutro"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Igualar aproximadamente la carga en cada fase».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-026",
  "moduloId": "mod-7",
  "enunciado": "¿Qué protección se selecciona principalmente según la corriente de diseño del circuito?",
  "alternativas": {
   "a": "DPS",
   "b": "Interruptor automático",
   "c": "AFDD",
   "d": "Barra de tierra"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-027",
  "moduloId": "mod-7",
  "enunciado": "¿Qué sucede si un interruptor automático es inferior a la corriente normal de operación?",
  "alternativas": {
   "a": "Funcionará correctamente",
   "b": "Se producirán disparos frecuentes",
   "c": "Aumentará la tensión",
   "d": "Mejorará la selectividad"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Se producirán disparos frecuentes».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-028",
  "moduloId": "mod-7",
  "enunciado": "¿Qué debe verificarse además de la corriente al seleccionar un conductor?",
  "alternativas": {
   "a": "Caída de tensión",
   "b": "Temperatura ambiente",
   "c": "Método de instalación",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-029",
  "moduloId": "mod-7",
  "enunciado": "¿Qué canalización es común en instalaciones empotradas residenciales?",
  "alternativas": {
   "a": "RMC",
   "b": "IMC",
   "c": "PVC",
   "d": "Bandeja industrial"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «PVC».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-030",
  "moduloId": "mod-7",
  "enunciado": "Una vivienda de 150 m² normalmente requiere:",
  "alternativas": {
   "a": "Un único circuito para toda la instalación",
   "b": "Varios circuitos independientes",
   "c": "Sólo circuitos de alumbrado",
   "d": "Sólo circuitos de enchufes"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Varios circuitos independientes».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-031",
  "moduloId": "mod-7",
  "enunciado": "¿Qué circuito suele considerarse especial en una vivienda?",
  "alternativas": {
   "a": "Dormitorio",
   "b": "Pasillo",
   "c": "Horno eléctrico",
   "d": "Timbre"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Horno eléctrico».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-032",
  "moduloId": "mod-7",
  "enunciado": "¿Qué documento permite justificar técnicamente la selección de conductores y protecciones?",
  "alternativas": {
   "a": "Factura",
   "b": "Memoria de cálculo",
   "c": "Boleta",
   "d": "Certificado bancario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Memoria de cálculo».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-033",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es la función principal del conductor de protección PE?",
  "alternativas": {
   "a": "Transportar corriente de carga",
   "b": "Conectar masas metálicas a tierra",
   "c": "Alimentar luminarias",
   "d": "Distribuir potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Conectar masas metálicas a tierra».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-034",
  "moduloId": "mod-7",
  "enunciado": "¿Qué protección es indispensable para la protección de personas frente a contactos indirectos?",
  "alternativas": {
   "a": "DPS",
   "b": "Interruptor diferencial",
   "c": "Contactor",
   "d": "Relé auxiliar"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Interruptor diferencial».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-035",
  "moduloId": "mod-7",
  "enunciado": "En una vivienda, una cocina eléctrica de 7 kW normalmente requiere:",
  "alternativas": {
   "a": "Evaluación como circuito dedicado",
   "b": "Compartir circuito con alumbrado",
   "c": "Compartir circuito con enchufes generales",
   "d": "Eliminar protección diferencial"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Evaluación como circuito dedicado».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-036",
  "moduloId": "mod-7",
  "enunciado": "¿Qué ocurre si demasiadas cargas se concentran en un único circuito?",
  "alternativas": {
   "a": "Disminuye la corriente",
   "b": "Aumenta el riesgo de sobrecarga",
   "c": "Mejora la eficiencia",
   "d": "Reduce la caída de tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumenta el riesgo de sobrecarga».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-037",
  "moduloId": "mod-7",
  "enunciado": "¿Qué ventaja tiene dividir la vivienda en varios circuitos?",
  "alternativas": {
   "a": "Facilita mantenimiento y mejora continuidad de servicio",
   "b": "Aumenta frecuencia",
   "c": "Reduce potencia instalada",
   "d": "Elimina tableros"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Facilita mantenimiento y mejora continuidad de servicio».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-038",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es la finalidad del interruptor general de la vivienda?",
  "alternativas": {
   "a": "Desconectar y proteger la instalación principal",
   "b": "Medir energía",
   "c": "Alimentar enchufes",
   "d": "Conectar tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Desconectar y proteger la instalación principal».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-039",
  "moduloId": "mod-7",
  "enunciado": "¿Qué debe contener normalmente un plano eléctrico domiciliario?",
  "alternativas": {
   "a": "Circuitos",
   "b": "Tableros",
   "c": "Canalizaciones",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-040",
  "moduloId": "mod-7",
  "enunciado": "Una vivienda presenta frecuentes disparos del diferencial al conectar varios equipos. Una causa probable es:",
  "alternativas": {
   "a": "Corrientes de fuga acumuladas",
   "b": "Exceso de iluminación",
   "c": "Baja resistencia de conductores",
   "d": "Exceso de tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corrientes de fuga acumuladas».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-041",
  "moduloId": "mod-7",
  "enunciado": "¿Qué parámetro es fundamental para calcular la demanda de una vivienda?",
  "alternativas": {
   "a": "Potencia de las cargas instaladas",
   "b": "Color de los conductores",
   "c": "Longitud de ductos",
   "d": "Tipo de luminarias"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Potencia de las cargas instaladas».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-042",
  "moduloId": "mod-7",
  "enunciado": "En una vivienda con suministro trifásico, una mala distribución de cargas provoca:",
  "alternativas": {
   "a": "Desbalance de fases",
   "b": "Mejor eficiencia",
   "c": "Menor corriente",
   "d": "Eliminación del neutro"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Desbalance de fases».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-043",
  "moduloId": "mod-7",
  "enunciado": "¿Qué debe verificarse entre conductor y protección?",
  "alternativas": {
   "a": "Compatibilidad térmica",
   "b": "Coordinación de corriente",
   "c": "Protección efectiva del conductor",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m7-044",
  "moduloId": "mod-7",
  "enunciado": "Según el RIC 10, una instalación domiciliaria correctamente diseñada debe garantizar:",
  "alternativas": {
   "a": "Seguridad, funcionalidad y mantenimiento adecuado",
   "b": "Sólo bajo costo",
   "c": "Sólo estética",
   "d": "Sólo facilidad de montaje"
  },
  "correcta": "a",
  "explicacion": "El diseño residencial debe proteger personas y bienes, asegurar operación confiable y permitir futuras intervenciones seguras. Referencia: RIC 10 -- Instalaciones de Uso General.",
  "dificultad": "media"
 },
 {
  "id": "p-m7-045",
  "moduloId": "mod-7",
  "enunciado": "Una vivienda de 150 m² posee una demanda máxima calculada de 18 kW en suministro monofásico 220 V. ¿Cuál es la corriente aproximada?",
  "alternativas": {
   "a": "55 A",
   "b": "68 A",
   "c": "82 A",
   "d": "100 A"
  },
  "correcta": "c",
  "explicacion": "I= V P ​ I = 18.000 / 220 ≈ 81,8 A Referencia: RIC 10.",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-046",
  "moduloId": "mod-7",
  "enunciado": "En una vivienda de 150 m² con cocina eléctrica, horno, aire acondicionado y termo eléctrico, ¿qué criterio es recomendable?",
  "alternativas": {
   "a": "Un único circuito general",
   "b": "Circuitos dedicados para cargas importantes",
   "c": "Eliminar diferenciales",
   "d": "Compartir alumbrado y cocina"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Circuitos dedicados para cargas importantes».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-047",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es la principal ventaja de utilizar circuitos dedicados para equipos de alta potencia?",
  "alternativas": {
   "a": "Reducir longitud de ductos",
   "b": "Mejorar seguridad y evitar sobrecargas",
   "c": "Disminuir frecuencia",
   "d": "Eliminar tableros"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mejorar seguridad y evitar sobrecargas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-048",
  "moduloId": "mod-7",
  "enunciado": "Una vivienda trifásica presenta las siguientes cargas por fase: Fase A = 8 kW Fase B = 4 kW Fase C = 3 kW ¿Qué condición existe?",
  "alternativas": {
   "a": "Balance perfecto",
   "b": "Desbalance importante de fases",
   "c": "Cortocircuito",
   "d": "Bajo factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Desbalance importante de fases».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-049",
  "moduloId": "mod-7",
  "enunciado": "¿Cuál es el objetivo del balance de cargas trifásico?",
  "alternativas": {
   "a": "Igualar aproximadamente la carga de cada fase",
   "b": "Concentrar toda la carga en una fase",
   "c": "Eliminar el neutro",
   "d": "Reducir la puesta a tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Igualar aproximadamente la carga de cada fase».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-050",
  "moduloId": "mod-7",
  "enunciado": "¿Qué debe verificarse obligatoriamente además de la ampacidad al seleccionar un conductor residencial?",
  "alternativas": {
   "a": "Color del aislamiento",
   "b": "Caída de tensión",
   "c": "Fabricante",
   "d": "Tipo de luminaria"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Caída de tensión».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-051",
  "moduloId": "mod-7",
  "enunciado": "Durante una revisión se detecta una caída de tensión superior a la permitida. La solución más adecuada es:",
  "alternativas": {
   "a": "Reducir la sección del conductor",
   "b": "Aumentar la sección del conductor",
   "c": "Eliminar la protección",
   "d": "Aumentar la resistencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumentar la sección del conductor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-052",
  "moduloId": "mod-7",
  "enunciado": "¿Qué error de diseño puede producir disparos frecuentes del interruptor automático?",
  "alternativas": {
   "a": "Protección subdimensionada",
   "b": "Conductor sobredimensionado",
   "c": "Exceso de canalizaciones",
   "d": "Baja resistencia de tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección subdimensionada».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-053",
  "moduloId": "mod-7",
  "enunciado": "Una memoria de cálculo debe justificar:",
  "alternativas": {
   "a": "Conductores seleccionados",
   "b": "Protecciones seleccionadas",
   "c": "Potencia y demanda calculada",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-054",
  "moduloId": "mod-7",
  "enunciado": "¿Qué condición suele indicar el calentamiento de un enchufe domiciliario?",
  "alternativas": {
   "a": "Conexión deficiente o sobrecarga",
   "b": "Exceso de puesta a tierra",
   "c": "Baja corriente",
   "d": "Baja tensión"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Conexión deficiente o sobrecarga».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-055",
  "moduloId": "mod-7",
  "enunciado": "En una vivienda moderna con equipos electrónicos sensibles, se recomienda incorporar:",
  "alternativas": {
   "a": "Sólo interruptor automático",
   "b": "DPS",
   "c": "Sólo fusibles",
   "d": "Sólo contactores"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «DPS».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-056",
  "moduloId": "mod-7",
  "enunciado": "Durante una inspección se detecta continuidad deficiente del conductor de protección. ¿Cuál es el principal riesgo?",
  "alternativas": {
   "a": "Aumento del factor de potencia",
   "b": "Contactos indirectos peligrosos",
   "c": "Menor consumo",
   "d": "Menor caída de tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Contactos indirectos peligrosos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-057",
  "moduloId": "mod-7",
  "enunciado": "Una vivienda presenta disparos aleatorios del diferencial. ¿Cuál es una causa probable?",
  "alternativas": {
   "a": "Corrientes de fuga acumuladas",
   "b": "Exceso de iluminación LED",
   "c": "Baja resistencia del conductor",
   "d": "Exceso de circuitos"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Corrientes de fuga acumuladas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-058",
  "moduloId": "mod-7",
  "enunciado": "Durante una fiscalización SEC se verifica que la instalación posee conductores adecuados, pero no existe documentación técnica ni memoria de cálculo. ¿La instalación cumple completamente?",
  "alternativas": {
   "a": "Sí",
   "b": "Sólo si posee diferencial",
   "c": "No, la documentación forma parte del cumplimiento técnico",
   "d": "Sí, si la puesta a tierra es correcta"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «No, la documentación forma parte del cumplimiento técnico».",
  "dificultad": "alta"
 },
 {
  "id": "p-m7-059",
  "moduloId": "mod-7",
  "enunciado": "Una vivienda de 150 m² posee circuitos correctamente dimensionados, protecciones coordinadas, puesta a tierra operativa, diferencial de 30 mA y documentación técnica completa. Según el RIC 10, la instalación:",
  "alternativas": {
   "a": "Cumple los requisitos fundamentales de diseño y seguridad",
   "b": "Requiere obligatoriamente suministro trifásico",
   "c": "No requiere memoria de cálculo",
   "d": "No necesita tablero general"
  },
  "correcta": "a",
  "explicacion": "El cumplimiento normativo exige coordinación entre diseño, protecciones, conductores, puesta a tierra y documentación técnica. Referencia: RIC 10 -- Instalaciones de Uso General.",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-001",
  "moduloId": "mod-8",
  "enunciado": "¿Qué tipo de motor es más utilizado en la industria?",
  "alternativas": {
   "a": "Motor universal",
   "b": "Motor de corriente continua",
   "c": "Motor trifásico de inducción",
   "d": "Motor síncrono monofásico"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Motor trifásico de inducción». Referencia: Máquinas Eléctricas Industriales.",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-002",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la principal ventaja de un motor trifásico respecto a uno monofásico?",
  "alternativas": {
   "a": "Menor rendimiento",
   "b": "Mayor simplicidad constructiva y eficiencia",
   "c": "Menor potencia disponible",
   "d": "No requiere protecciones"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor simplicidad constructiva y eficiencia».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-003",
  "moduloId": "mod-8",
  "enunciado": "¿Qué ocurre normalmente al momento del arranque de un motor?",
  "alternativas": {
   "a": "Disminuye la corriente",
   "b": "Aparece una corriente de partida elevada",
   "c": "Desaparece el campo magnético",
   "d": "Disminuye el torque"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aparece una corriente de partida elevada».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-004",
  "moduloId": "mod-8",
  "enunciado": "¿Qué dispositivo se utiliza para maniobrar motores eléctricamente?",
  "alternativas": {
   "a": "DPS",
   "b": "Contactor",
   "c": "Diferencial",
   "d": "Fusible"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Contactor».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-005",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la función principal de un contactor?",
  "alternativas": {
   "a": "Medir energía",
   "b": "Conectar y desconectar cargas eléctricas",
   "c": "Detectar fugas",
   "d": "Medir resistencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Conectar y desconectar cargas eléctricas».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-006",
  "moduloId": "mod-8",
  "enunciado": "¿Qué dispositivo protege al motor contra sobrecargas prolongadas?",
  "alternativas": {
   "a": "DPS",
   "b": "Relé térmico",
   "c": "Voltímetro",
   "d": "Transformador"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Relé térmico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-007",
  "moduloId": "mod-8",
  "enunciado": "¿Qué dispositivo combina funciones de protección para motores?",
  "alternativas": {
   "a": "Guardamotor",
   "b": "DPS",
   "c": "Contactor",
   "d": "Wattímetro"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Guardamotor».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-008",
  "moduloId": "mod-8",
  "enunciado": "¿Qué protección actúa principalmente frente a cortocircuitos?",
  "alternativas": {
   "a": "Relé térmico",
   "b": "Interruptor automático",
   "c": "Pulsador",
   "d": "Temporizador"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-009",
  "moduloId": "mod-8",
  "enunciado": "¿Qué significa CCM?",
  "alternativas": {
   "a": "Centro de Control de Motores",
   "b": "Control Central de Maniobra",
   "c": "Centro de Corriente Motriz",
   "d": "Control de Carga Modular"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Centro de Control de Motores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-010",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la función principal de un CCM?",
  "alternativas": {
   "a": "Medir energía",
   "b": "Concentrar maniobra y protección de motores",
   "c": "Corregir factor de potencia",
   "d": "Controlar iluminación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Concentrar maniobra y protección de motores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-011",
  "moduloId": "mod-8",
  "enunciado": "¿Qué método de partida conecta inicialmente el motor en estrella y luego en triángulo?",
  "alternativas": {
   "a": "Partida directa",
   "b": "Partida suave",
   "c": "Partida estrella-triángulo",
   "d": "Variador de frecuencia"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Partida estrella-triángulo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-012",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es el objetivo principal de la partida estrella-triángulo?",
  "alternativas": {
   "a": "Aumentar frecuencia",
   "b": "Reducir corriente de arranque",
   "c": "Aumentar tensión",
   "d": "Corregir factor de potencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Reducir corriente de arranque».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-013",
  "moduloId": "mod-8",
  "enunciado": "¿Qué dispositivo permite variar la velocidad de un motor de inducción?",
  "alternativas": {
   "a": "Relé térmico",
   "b": "Variador de frecuencia",
   "c": "Fusible",
   "d": "DPS"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Variador de frecuencia».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-014",
  "moduloId": "mod-8",
  "enunciado": "¿Qué parámetro modifica principalmente un variador de frecuencia?",
  "alternativas": {
   "a": "Resistencia",
   "b": "Frecuencia de alimentación",
   "c": "Potencia reactiva",
   "d": "Resistencia de tierra"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Frecuencia de alimentación».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-015",
  "moduloId": "mod-8",
  "enunciado": "¿Qué ventaja ofrece una partida suave?",
  "alternativas": {
   "a": "Reduce esfuerzos mecánicos y eléctricos",
   "b": "Aumenta corriente de arranque",
   "c": "Elimina protecciones",
   "d": "Aumenta tensión"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Reduce esfuerzos mecánicos y eléctricos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-016",
  "moduloId": "mod-8",
  "enunciado": "¿Qué instrumento mide corriente en un motor en funcionamiento?",
  "alternativas": {
   "a": "Luxómetro",
   "b": "Pinza amperimétrica",
   "c": "Telurómetro",
   "d": "Megóhmetro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Pinza amperimétrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-017",
  "moduloId": "mod-8",
  "enunciado": "¿Qué protección es indispensable en un circuito de motor?",
  "alternativas": {
   "a": "Protección contra sobrecarga",
   "b": "Protección contra cortocircuito",
   "c": "Maniobra adecuada",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-018",
  "moduloId": "mod-8",
  "enunciado": "¿Qué tipo de motor se utiliza habitualmente en bombas industriales?",
  "alternativas": {
   "a": "Motor trifásico",
   "b": "Motor universal",
   "c": "Motor paso a paso",
   "d": "Motor serie"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Motor trifásico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-019",
  "moduloId": "mod-8",
  "enunciado": "¿Qué condición puede provocar disparo del relé térmico?",
  "alternativas": {
   "a": "Sobrecarga del motor",
   "b": "Baja iluminación",
   "c": "Alta resistencia de tierra",
   "d": "Variación climática"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sobrecarga del motor».",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-020",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es el objetivo principal de las instalaciones eléctricas industriales?",
  "alternativas": {
   "a": "Alimentar y controlar procesos productivos de forma segura y confiable",
   "b": "Medir energía residencial",
   "c": "Regular empalmes domiciliarios",
   "d": "Controlar alumbrado público"
  },
  "correcta": "a",
  "explicacion": "Las instalaciones industriales deben garantizar continuidad operacional, seguridad de personas y protección de equipos. Referencia: Instalaciones Industriales BT.",
  "dificultad": "baja"
 },
 {
  "id": "p-m8-021",
  "moduloId": "mod-8",
  "enunciado": "La corriente de partida de un motor de inducción trifásico suele ser:",
  "alternativas": {
   "a": "Igual a la corriente nominal",
   "b": "Entre 5 y 8 veces la corriente nominal",
   "c": "Menor que la corriente nominal",
   "d": "Igual a cero"
  },
  "correcta": "b",
  "explicacion": "Los motores de inducción presentan altas corrientes durante el arranque.",
  "dificultad": "media"
 },
 {
  "id": "p-m8-022",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es el principal inconveniente de la partida directa?",
  "alternativas": {
   "a": "Mayor complejidad",
   "b": "Elevada corriente de arranque",
   "c": "Bajo torque",
   "d": "Baja tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Elevada corriente de arranque».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-023",
  "moduloId": "mod-8",
  "enunciado": "¿Qué método de arranque es adecuado para motores de pequeña potencia?",
  "alternativas": {
   "a": "Partida directa",
   "b": "Estrella-triángulo exclusivamente",
   "c": "Partida suave obligatoria",
   "d": "Variador obligatorio"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Partida directa».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-024",
  "moduloId": "mod-8",
  "enunciado": "¿Qué parámetro es fundamental para seleccionar un contactor?",
  "alternativas": {
   "a": "Color",
   "b": "Corriente nominal del motor",
   "c": "Longitud del conductor",
   "d": "Grado IP"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Corriente nominal del motor».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-025",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la función de los contactos auxiliares de un contactor?",
  "alternativas": {
   "a": "Transportar potencia principal",
   "b": "Circuitos de mando y señalización",
   "c": "Medir energía",
   "d": "Proteger cortocircuitos"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Circuitos de mando y señalización».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-026",
  "moduloId": "mod-8",
  "enunciado": "¿Qué protección debe ajustarse según la corriente nominal del motor?",
  "alternativas": {
   "a": "DPS",
   "b": "Relé térmico",
   "c": "Barra de tierra",
   "d": "Temporizador"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Relé térmico».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-027",
  "moduloId": "mod-8",
  "enunciado": "Si el relé térmico está ajustado por debajo de la corriente nominal:",
  "alternativas": {
   "a": "No operará nunca",
   "b": "Puede provocar disparos intempestivos",
   "c": "Aumentará el torque",
   "d": "Reducirá el consumo"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Puede provocar disparos intempestivos».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-028",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la principal ventaja de un guardamotor?",
  "alternativas": {
   "a": "Combina protección y maniobra básica",
   "b": "Sustituye el motor",
   "c": "Corrige factor de potencia",
   "d": "Mide energía"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Combina protección y maniobra básica».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-029",
  "moduloId": "mod-8",
  "enunciado": "¿Qué ocurre con la corriente de arranque en una partida estrella-triángulo?",
  "alternativas": {
   "a": "Aumenta",
   "b": "Se mantiene igual",
   "c": "Disminuye respecto a la partida directa",
   "d": "Se elimina"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Disminuye respecto a la partida directa».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-030",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es una condición necesaria para utilizar partida estrella-triángulo?",
  "alternativas": {
   "a": "Motor con seis terminales accesibles",
   "b": "Alimentación monofásica",
   "c": "Motor universal",
   "d": "Ausencia de protecciones"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Motor con seis terminales accesibles».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-031",
  "moduloId": "mod-8",
  "enunciado": "¿Qué ventaja ofrece una partida suave respecto a estrella-triángulo?",
  "alternativas": {
   "a": "Menor control",
   "b": "Arranque progresivo más controlado",
   "c": "Mayor corriente de partida",
   "d": "Menor protección"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Arranque progresivo más controlado».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-032",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la principal ventaja de un variador de frecuencia?",
  "alternativas": {
   "a": "Sólo reduce corriente",
   "b": "Permite controlar velocidad y torque",
   "c": "Elimina protecciones",
   "d": "Sustituye contactores siempre"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Permite controlar velocidad y torque».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-033",
  "moduloId": "mod-8",
  "enunciado": "¿Qué variable modifica principalmente un variador para controlar la velocidad?",
  "alternativas": {
   "a": "Resistencia",
   "b": "Frecuencia",
   "c": "Potencia reactiva",
   "d": "Resistencia de tierra"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Frecuencia».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-034",
  "moduloId": "mod-8",
  "enunciado": "¿Qué función cumple un CCM?",
  "alternativas": {
   "a": "Concentrar protección y control de motores",
   "b": "Medir energía",
   "c": "Corregir tensión",
   "d": "Controlar iluminación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Concentrar protección y control de motores».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-035",
  "moduloId": "mod-8",
  "enunciado": "¿Qué documento representa las conexiones de potencia de un motor?",
  "alternativas": {
   "a": "Diagrama de fuerza",
   "b": "Plano arquitectónico",
   "c": "Carta Gantt",
   "d": "Presupuesto"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Diagrama de fuerza».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-036",
  "moduloId": "mod-8",
  "enunciado": "¿Qué documento representa pulsadores, bobinas y contactos auxiliares?",
  "alternativas": {
   "a": "Diagrama de mando",
   "b": "Plano civil",
   "c": "Memoria estructural",
   "d": "Diagrama unifilar de tierra"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Diagrama de mando».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-037",
  "moduloId": "mod-8",
  "enunciado": "¿Qué ocurre si un motor opera permanentemente sobre su corriente nominal?",
  "alternativas": {
   "a": "Mejora el rendimiento",
   "b": "Aumenta el riesgo de sobrecalentamiento",
   "c": "Disminuye la temperatura",
   "d": "Reduce el torque"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumenta el riesgo de sobrecalentamiento».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-038",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es la principal función de la protección contra cortocircuitos?",
  "alternativas": {
   "a": "Proteger frente a corrientes extremadamente elevadas",
   "b": "Regular velocidad",
   "c": "Medir potencia",
   "d": "Controlar temperatura ambiente"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Proteger frente a corrientes extremadamente elevadas».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-039",
  "moduloId": "mod-8",
  "enunciado": "Una pinza amperimétrica indica 40 A en un motor cuya corriente nominal es 25 A. Esto puede indicar:",
  "alternativas": {
   "a": "Sobrecarga",
   "b": "Bajo factor de potencia exclusivamente",
   "c": "Falta de alimentación",
   "d": "Circuito abierto"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sobrecarga».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-040",
  "moduloId": "mod-8",
  "enunciado": "¿Qué condición suele justificar el uso de un variador de frecuencia?",
  "alternativas": {
   "a": "Necesidad de velocidad variable",
   "b": "Necesidad de iluminación",
   "c": "Medición de energía",
   "d": "Protección diferencial"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Necesidad de velocidad variable».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-041",
  "moduloId": "mod-8",
  "enunciado": "¿Qué ocurre normalmente cuando una fase se pierde en un motor trifásico en funcionamiento?",
  "alternativas": {
   "a": "Mejora el rendimiento",
   "b": "Aumenta el riesgo de daño por sobrecorriente",
   "c": "Disminuye la temperatura",
   "d": "Aumenta la eficiencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumenta el riesgo de daño por sobrecorriente».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-042",
  "moduloId": "mod-8",
  "enunciado": "¿Qué protección es especialmente importante frente a pérdida de fase?",
  "alternativas": {
   "a": "Relé térmico correctamente ajustado",
   "b": "DPS",
   "c": "AFDD",
   "d": "Interruptor diferencial de 30 mA"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Relé térmico correctamente ajustado».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-043",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es el objetivo de coordinar contactor, relé térmico y protección de cortocircuito?",
  "alternativas": {
   "a": "Garantizar maniobra y protección adecuadas",
   "b": "Reducir frecuencia",
   "c": "Aumentar potencia",
   "d": "Eliminar tableros"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Garantizar maniobra y protección adecuadas».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-044",
  "moduloId": "mod-8",
  "enunciado": "En un esquema de mando industrial, un pulsador normalmente abierto (NA) se utiliza frecuentemente para:",
  "alternativas": {
   "a": "Parada",
   "b": "Arranque",
   "c": "Puesta a tierra",
   "d": "Protección térmica"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Arranque».",
  "dificultad": "media"
 },
 {
  "id": "p-m8-045",
  "moduloId": "mod-8",
  "enunciado": "Un circuito industrial correctamente diseñado debe considerar:",
  "alternativas": {
   "a": "Protección",
   "b": "Maniobra",
   "c": "Seguridad operacional",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "Las instalaciones industriales deben integrar protección, control y seguridad para garantizar continuidad operacional y protección de equipos. Referencia: Instalaciones Industriales BT y Control de Motores.",
  "dificultad": "media"
 },
 {
  "id": "p-m8-046",
  "moduloId": "mod-8",
  "enunciado": "Un motor trifásico consume 15 kW a 380 V con factor de potencia 0,85 y rendimiento 90%. ¿Cuál es su corriente aproximada?",
  "alternativas": {
   "a": "18 A",
   "b": "26 A",
   "c": "30 A",
   "d": "40 A"
  },
  "correcta": "c",
  "explicacion": "I= 3 ​ ⋅V⋅cosϕ⋅η P ​ I = 15000 / (1,732 × 380 × 0,85 × 0,90) I ≈ 29,8 A",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-047",
  "moduloId": "mod-8",
  "enunciado": "Un motor posee una corriente nominal de 32 A. ¿En qué valor debería ajustarse inicialmente el relé térmico?",
  "alternativas": {
   "a": "15 A",
   "b": "20 A",
   "c": "Cercano a 32 A",
   "d": "50 A"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Cercano a 32 A». Referencia: IEC 60947 -- Protección de Motores.",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-048",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es el principal objetivo de coordinar contactor, relé térmico y protección de cortocircuito?",
  "alternativas": {
   "a": "Reducir el consumo energético",
   "b": "Garantizar protección integral del motor",
   "c": "Aumentar velocidad",
   "d": "Reducir frecuencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Garantizar protección integral del motor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-049",
  "moduloId": "mod-8",
  "enunciado": "Durante una partida estrella-triángulo, la corriente de arranque suele reducirse aproximadamente a:",
  "alternativas": {
   "a": "100% de la partida directa",
   "b": "80% de la partida directa",
   "c": "58% de la partida directa",
   "d": "10% de la partida directa"
  },
  "correcta": "c",
  "explicacion": "La corriente de línea en estrella es aproximadamente 1/√3 respecto de la conexión en triángulo.",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-050",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es una limitación de la partida estrella-triángulo?",
  "alternativas": {
   "a": "Reduce el torque de arranque",
   "b": "Aumenta la corriente de arranque",
   "c": "Elimina la protección térmica",
   "d": "Requiere motores monofásicos"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Reduce el torque de arranque».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-051",
  "moduloId": "mod-8",
  "enunciado": "¿Qué criterio es fundamental para seleccionar un variador de frecuencia?",
  "alternativas": {
   "a": "Color del gabinete",
   "b": "Corriente nominal del motor",
   "c": "Longitud de la canalización",
   "d": "Tipo de luminaria"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Corriente nominal del motor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-052",
  "moduloId": "mod-8",
  "enunciado": "Un variador seleccionado por debajo de la corriente nominal del motor puede provocar:",
  "alternativas": {
   "a": "Funcionamiento más eficiente",
   "b": "Sobrecarga y falla del equipo",
   "c": "Menor temperatura",
   "d": "Mejor regulación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sobrecarga y falla del equipo».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-053",
  "moduloId": "mod-8",
  "enunciado": "Durante una inspección, un motor presenta corrientes: L1 = 28 A L2 = 29 A L3 = 47 A La condición más probable es:",
  "alternativas": {
   "a": "Balance perfecto",
   "b": "Desbalance de corriente",
   "c": "Baja tensión general",
   "d": "Operación normal"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Desbalance de corriente».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-054",
  "moduloId": "mod-8",
  "enunciado": "¿Qué instrumento permite detectar rápidamente un desbalance de corriente entre fases?",
  "alternativas": {
   "a": "Luxómetro",
   "b": "Pinza amperimétrica",
   "c": "Telurómetro",
   "d": "Megóhmetro"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Pinza amperimétrica».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-055",
  "moduloId": "mod-8",
  "enunciado": "Un motor dispara repetidamente el relé térmico. ¿Cuál es la causa más probable?",
  "alternativas": {
   "a": "Sobrecarga mecánica",
   "b": "Baja iluminación",
   "c": "Exceso de puesta a tierra",
   "d": "Alta resistencia del neutro"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sobrecarga mecánica».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-056",
  "moduloId": "mod-8",
  "enunciado": "¿Qué condición suele justificar el uso de una partida suave en lugar de una partida directa?",
  "alternativas": {
   "a": "Necesidad de reducir esfuerzos mecánicos",
   "b": "Necesidad de aumentar la frecuencia",
   "c": "Necesidad de eliminar protecciones",
   "d": "Necesidad de aumentar el torque instantáneamente"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Necesidad de reducir esfuerzos mecánicos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-057",
  "moduloId": "mod-8",
  "enunciado": "¿Cuál es una ventaja operacional de un CCM correctamente diseñado?",
  "alternativas": {
   "a": "Centraliza protección, control y mantenimiento",
   "b": "Elimina tableros",
   "c": "Sustituye variadores",
   "d": "Reduce automáticamente la demanda"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Centraliza protección, control y mantenimiento».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-058",
  "moduloId": "mod-8",
  "enunciado": "Durante una termografía en un CCM se detecta un borne con temperatura muy superior a las demás conexiones. La causa más probable es:",
  "alternativas": {
   "a": "Conexión floja o deteriorada",
   "b": "Baja corriente",
   "c": "Buen contacto eléctrico",
   "d": "Exceso de ventilación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Conexión floja o deteriorada».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-059",
  "moduloId": "mod-8",
  "enunciado": "En un sistema selectivo industrial, una falla en un motor debería provocar:",
  "alternativas": {
   "a": "Desconexión de toda la planta",
   "b": "Operación de la protección más cercana a la falla",
   "c": "Apertura de todos los contactores",
   "d": "Operación exclusiva del interruptor general"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Operación de la protección más cercana a la falla».",
  "dificultad": "alta"
 },
 {
  "id": "p-m8-060",
  "moduloId": "mod-8",
  "enunciado": "Durante una fiscalización SEC se verifica que el motor, protecciones y conductores cumplen individualmente, pero el relé térmico está ajustado muy por encima de la corriente nominal. ¿La instalación cumple técnicamente?",
  "alternativas": {
   "a": "Sí, porque el motor funciona",
   "b": "Sí, si existe guardamotor",
   "c": "No, porque la protección contra sobrecarga está incorrectamente ajustada",
   "d": "Sí, si el interruptor general es adecuado"
  },
  "correcta": "c",
  "explicacion": "La protección térmica debe ajustarse conforme a la corriente nominal del motor para garantizar protección efectiva frente a sobrecargas prolongadas. Referencia: IEC 60947, NCh Electrotécnicas, Instalaciones Industriales BT.",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-001",
  "moduloId": "mod-9",
  "enunciado": "¿Qué fenómeno físico permite la generación de electricidad en un panel solar?",
  "alternativas": {
   "a": "Efecto Joule",
   "b": "Efecto fotoeléctrico o fotovoltaico",
   "c": "Inducción magnética",
   "d": "Efecto piezoeléctrico"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Efecto fotoeléctrico o fotovoltaico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-002",
  "moduloId": "mod-9",
  "enunciado": "¿Qué transforma directamente la energía solar en energía eléctrica?",
  "alternativas": {
   "a": "Inversor",
   "b": "Transformador",
   "c": "Módulo fotovoltaico",
   "d": "Batería"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Módulo fotovoltaico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-003",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es la unidad utilizada para expresar la potencia nominal de un panel solar?",
  "alternativas": {
   "a": "Volt",
   "b": "Ampere",
   "c": "Watt Peak (Wp)",
   "d": "Hertz"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Watt Peak (Wp)».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-004",
  "moduloId": "mod-9",
  "enunciado": "¿Qué tipo de corriente entrega un panel fotovoltaico?",
  "alternativas": {
   "a": "Corriente alterna",
   "b": "Corriente continua",
   "c": "Corriente trifásica",
   "d": "Corriente pulsante"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Corriente continua».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-005",
  "moduloId": "mod-9",
  "enunciado": "¿Qué equipo convierte la corriente continua de los paneles en corriente alterna?",
  "alternativas": {
   "a": "Batería",
   "b": "Regulador",
   "c": "Inversor",
   "d": "DPS"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Inversor».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-006",
  "moduloId": "mod-9",
  "enunciado": "¿Qué significa un sistema On-Grid?",
  "alternativas": {
   "a": "Sistema aislado de la red",
   "b": "Sistema conectado a la red eléctrica",
   "c": "Sistema de respaldo exclusivamente",
   "d": "Sistema de corriente continua"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sistema conectado a la red eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-007",
  "moduloId": "mod-9",
  "enunciado": "¿Qué significa un sistema Off-Grid?",
  "alternativas": {
   "a": "Sistema conectado permanentemente a la red",
   "b": "Sistema aislado de la red eléctrica",
   "c": "Sistema trifásico obligatorio",
   "d": "Sistema de generación hidráulica"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Sistema aislado de la red eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-008",
  "moduloId": "mod-9",
  "enunciado": "¿Qué característica posee un sistema híbrido?",
  "alternativas": {
   "a": "Sólo utiliza paneles",
   "b": "Combina generación fotovoltaica y almacenamiento o red",
   "c": "Sólo utiliza baterías",
   "d": "No utiliza inversor"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Combina generación fotovoltaica y almacenamiento o red».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-009",
  "moduloId": "mod-9",
  "enunciado": "¿Qué significa MPPT?",
  "alternativas": {
   "a": "Maximum Power Point Tracking",
   "b": "Maximum Panel Protection Technology",
   "c": "Motor Power Protection Test",
   "d": "Main Power Point Transformer"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Maximum Power Point Tracking».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-010",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es la función principal del MPPT?",
  "alternativas": {
   "a": "Medir radiación",
   "b": "Maximizar la energía extraída de los paneles",
   "c": "Proteger contra cortocircuitos",
   "d": "Controlar baterías"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Maximizar la energía extraída de los paneles».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-011",
  "moduloId": "mod-9",
  "enunciado": "¿Qué tecnología de almacenamiento es actualmente la más utilizada en sistemas FV modernos?",
  "alternativas": {
   "a": "Níquel-Cadmio",
   "b": "Plomo-Ácido",
   "c": "Litio",
   "d": "Zinc-Carbón"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Litio».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-012",
  "moduloId": "mod-9",
  "enunciado": "¿Qué ley chilena regula la generación distribuida residencial conocida como Net Billing?",
  "alternativas": {
   "a": "Ley 18.410",
   "b": "Ley 19.300",
   "c": "Ley 20.571",
   "d": "Ley 21.100"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Ley 20.571».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-013",
  "moduloId": "mod-9",
  "enunciado": "¿Qué permite el sistema Net Billing?",
  "alternativas": {
   "a": "Vender excedentes de energía a la red",
   "b": "Eliminar medidores",
   "c": "Operar sin inversor",
   "d": "Generar corriente continua en la red"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Vender excedentes de energía a la red».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-014",
  "moduloId": "mod-9",
  "enunciado": "¿Qué variable afecta directamente la generación de un panel solar?",
  "alternativas": {
   "a": "Radiación solar",
   "b": "Temperatura",
   "c": "Orientación",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-015",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es la orientación generalmente recomendada para paneles solares en Chile?",
  "alternativas": {
   "a": "Norte",
   "b": "Sur",
   "c": "Este",
   "d": "Oeste"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Norte».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-016",
  "moduloId": "mod-9",
  "enunciado": "¿Qué protección se utiliza contra sobretensiones en sistemas fotovoltaicos?",
  "alternativas": {
   "a": "Relé térmico",
   "b": "DPS",
   "c": "Contactor",
   "d": "Temporizador"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «DPS».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-017",
  "moduloId": "mod-9",
  "enunciado": "¿Qué lado de la instalación FV requiere protecciones específicas?",
  "alternativas": {
   "a": "Sólo corriente continua",
   "b": "Sólo corriente alterna",
   "c": "Corriente continua y corriente alterna",
   "d": "Ninguno"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Corriente continua y corriente alterna».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-018",
  "moduloId": "mod-9",
  "enunciado": "¿Qué elemento conecta eléctricamente los módulos solares entre sí?",
  "alternativas": {
   "a": "String o cadena fotovoltaica",
   "b": "CCM",
   "c": "Tablero de fuerza",
   "d": "Guardamotor"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «String o cadena fotovoltaica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-019",
  "moduloId": "mod-9",
  "enunciado": "¿Qué función cumple la puesta a tierra en un sistema fotovoltaico?",
  "alternativas": {
   "a": "Mejorar la estética",
   "b": "Proteger personas y equipos",
   "c": "Aumentar potencia",
   "d": "Incrementar radiación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Proteger personas y equipos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-020",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es el objetivo principal de un sistema fotovoltaico residencial?",
  "alternativas": {
   "a": "Transformar energía solar en energía eléctrica útil de forma segura y eficiente",
   "b": "Generar energía reactiva",
   "c": "Sustituir protecciones eléctricas",
   "d": "Eliminar el empalme eléctrico"
  },
  "correcta": "a",
  "explicacion": "Los sistemas fotovoltaicos permiten aprovechar la energía solar para abastecer consumos eléctricos, reduciendo costos energéticos y emisiones. Referencia: Ley 20.571, Normativa SEC Generación Distribuida.",
  "dificultad": "baja"
 },
 {
  "id": "p-m9-021",
  "moduloId": "mod-9",
  "enunciado": "Un sistema fotovoltaico de 5 kWp instalado en una zona con 5 HSP (Horas Sol Pico) puede generar aproximadamente por día:",
  "alternativas": {
   "a": "5 kWh",
   "b": "10 kWh",
   "c": "25 kWh",
   "d": "50 kWh"
  },
  "correcta": "c",
  "explicacion": "E=P×HSP E = 5 kW × 5 h = 25 kWh/día",
  "dificultad": "media"
 },
 {
  "id": "p-m9-022",
  "moduloId": "mod-9",
  "enunciado": "¿Qué representan las HSP en diseño fotovoltaico?",
  "alternativas": {
   "a": "Horas de servicio permanente",
   "b": "Horas Sol Pico",
   "c": "Horas de suministro principal",
   "d": "Horas de seguridad preventiva"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Horas Sol Pico».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-023",
  "moduloId": "mod-9",
  "enunciado": "Si un panel tiene una potencia de 550 Wp, ¿cuántos paneles se requieren aproximadamente para un sistema de 5,5 kWp?",
  "alternativas": {
   "a": "5",
   "b": "8",
   "c": "10",
   "d": "15"
  },
  "correcta": "c",
  "explicacion": "5500 W / 550 W = 10 paneles",
  "dificultad": "media"
 },
 {
  "id": "p-m9-024",
  "moduloId": "mod-9",
  "enunciado": "¿Qué es un string fotovoltaico?",
  "alternativas": {
   "a": "Una batería",
   "b": "Un conjunto de módulos conectados eléctricamente",
   "c": "Un inversor",
   "d": "Un DPS"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Un conjunto de módulos conectados eléctricamente».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-025",
  "moduloId": "mod-9",
  "enunciado": "Cuando los módulos se conectan en serie:",
  "alternativas": {
   "a": "Aumenta la corriente",
   "b": "Aumenta la tensión",
   "c": "Disminuye la potencia",
   "d": "Disminuye la tensión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Aumenta la tensión».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-026",
  "moduloId": "mod-9",
  "enunciado": "Cuando los módulos se conectan en paralelo:",
  "alternativas": {
   "a": "Aumenta la corriente",
   "b": "Aumenta la tensión",
   "c": "Disminuye la corriente",
   "d": "Elimina pérdidas"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Aumenta la corriente».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-027",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es el principal criterio para seleccionar un inversor?",
  "alternativas": {
   "a": "Potencia del sistema fotovoltaico",
   "b": "Color del gabinete",
   "c": "Longitud de conductores",
   "d": "Tipo de estructura"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Potencia del sistema fotovoltaico».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-028",
  "moduloId": "mod-9",
  "enunciado": "¿Qué debe verificarse entre el voltaje del string y el inversor?",
  "alternativas": {
   "a": "Compatibilidad eléctrica",
   "b": "Color del conductor",
   "c": "Tipo de batería",
   "d": "Potencia reactiva"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Compatibilidad eléctrica».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-029",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es la función principal del MPPT en un inversor?",
  "alternativas": {
   "a": "Medir energía",
   "b": "Buscar continuamente el punto de máxima potencia",
   "c": "Detectar cortocircuitos",
   "d": "Controlar la puesta a tierra"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Buscar continuamente el punto de máxima potencia».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-030",
  "moduloId": "mod-9",
  "enunciado": "¿Qué ocurre si un string opera fuera del rango MPPT?",
  "alternativas": {
   "a": "Aumenta la producción",
   "b": "Disminuye el aprovechamiento energético",
   "c": "Mejora la eficiencia",
   "d": "No afecta la generación"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Disminuye el aprovechamiento energético».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-031",
  "moduloId": "mod-9",
  "enunciado": "¿Qué característica distingue a un sistema Off-Grid?",
  "alternativas": {
   "a": "Está conectado permanentemente a la red",
   "b": "Funciona independientemente de la red eléctrica",
   "c": "No utiliza baterías",
   "d": "No requiere regulador"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Funciona independientemente de la red eléctrica».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-032",
  "moduloId": "mod-9",
  "enunciado": "¿Qué componente es esencial en la mayoría de los sistemas Off-Grid?",
  "alternativas": {
   "a": "Medidor bidireccional",
   "b": "Baterías",
   "c": "Transformador MT",
   "d": "CCM"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Baterías».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-033",
  "moduloId": "mod-9",
  "enunciado": "¿Qué ventaja principal ofrecen las baterías de litio?",
  "alternativas": {
   "a": "Menor vida útil",
   "b": "Mayor densidad energética",
   "c": "Mayor mantenimiento",
   "d": "Menor eficiencia"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Mayor densidad energética».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-034",
  "moduloId": "mod-9",
  "enunciado": "¿Qué parámetro es importante al seleccionar un banco de baterías?",
  "alternativas": {
   "a": "Capacidad energética requerida",
   "b": "Voltaje del sistema",
   "c": "Profundidad de descarga",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-035",
  "moduloId": "mod-9",
  "enunciado": "¿Qué ocurre con los excedentes energéticos en un sistema On-Grid con Net Billing?",
  "alternativas": {
   "a": "Se eliminan",
   "b": "Se almacenan obligatoriamente",
   "c": "Se inyectan a la red",
   "d": "Se transforman en calor"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Se inyectan a la red».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-036",
  "moduloId": "mod-9",
  "enunciado": "¿Qué equipo registra energía consumida e inyectada en Net Billing?",
  "alternativas": {
   "a": "Medidor bidireccional",
   "b": "Relé térmico",
   "c": "DPS",
   "d": "Contactor"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Medidor bidireccional».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-037",
  "moduloId": "mod-9",
  "enunciado": "¿Qué protección es habitual en el lado CC de un sistema fotovoltaico?",
  "alternativas": {
   "a": "Fusibles o interruptores CC",
   "b": "Guardamotores",
   "c": "Relés térmicos",
   "d": "Contactores industriales"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Fusibles o interruptores CC».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-038",
  "moduloId": "mod-9",
  "enunciado": "¿Qué protección es habitual en el lado CA del inversor?",
  "alternativas": {
   "a": "Interruptor automático",
   "b": "Fusible NH exclusivamente",
   "c": "Variador de frecuencia",
   "d": "Relé auxiliar"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Interruptor automático».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-039",
  "moduloId": "mod-9",
  "enunciado": "¿Dónde se recomienda instalar DPS fotovoltaicos?",
  "alternativas": {
   "a": "Sólo en el lado CC",
   "b": "Sólo en el lado CA",
   "c": "En ambos lados cuando corresponda",
   "d": "Solamente en baterías"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «En ambos lados cuando corresponda».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-040",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es la finalidad principal de un DPS fotovoltaico?",
  "alternativas": {
   "a": "Proteger frente a sobretensiones transitorias",
   "b": "Medir potencia",
   "c": "Corregir factor de potencia",
   "d": "Controlar carga de baterías"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Proteger frente a sobretensiones transitorias».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-041",
  "moduloId": "mod-9",
  "enunciado": "¿Qué elementos deben conectarse normalmente a tierra en una planta fotovoltaica?",
  "alternativas": {
   "a": "Estructuras metálicas",
   "b": "Gabinetes",
   "c": "Equipos eléctricos",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-042",
  "moduloId": "mod-9",
  "enunciado": "Una mala puesta a tierra en una planta FV puede provocar:",
  "alternativas": {
   "a": "Mayor seguridad",
   "b": "Riesgo para personas y equipos",
   "c": "Mayor generación",
   "d": "Menor corriente de falla"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Riesgo para personas y equipos».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-043",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es una ventaja de los sistemas híbridos?",
  "alternativas": {
   "a": "Permiten respaldo energético mediante baterías",
   "b": "Eliminan protecciones",
   "c": "No utilizan inversores",
   "d": "No requieren mantenimiento"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Permiten respaldo energético mediante baterías».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-044",
  "moduloId": "mod-9",
  "enunciado": "Un sistema FV residencial produce 28 kWh/día y la vivienda consume 22 kWh/día. El excedente diario aproximado es:",
  "alternativas": {
   "a": "4 kWh",
   "b": "6 kWh",
   "c": "8 kWh",
   "d": "10 kWh"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «6 kWh».",
  "dificultad": "media"
 },
 {
  "id": "p-m9-045",
  "moduloId": "mod-9",
  "enunciado": "Según los criterios de diseño SEC, un sistema fotovoltaico correctamente diseñado debe considerar:",
  "alternativas": {
   "a": "Generación esperada",
   "b": "Protecciones eléctricas",
   "c": "Compatibilidad de equipos",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "El diseño FV debe integrar generación, seguridad eléctrica, coordinación de equipos y cumplimiento normativo. Referencia: Ley 20.571, Normativa SEC de Generación Distribuida.",
  "dificultad": "media"
 },
 {
  "id": "p-m9-046",
  "moduloId": "mod-9",
  "enunciado": "Se desea diseñar un sistema fotovoltaico de 10 kWp utilizando módulos de 550 Wp. ¿Cuántos módulos se requieren aproximadamente?",
  "alternativas": {
   "a": "12",
   "b": "15",
   "c": "18",
   "d": "19"
  },
  "correcta": "c",
  "explicacion": "N= P modulo ​ P sistema ​ ​ N = 10.000 / 550 = 18,18 Se seleccionan 18 módulos (9,9 kWp) o 19 módulos según diseño final.",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-047",
  "moduloId": "mod-9",
  "enunciado": "Un sistema FV de 50 kWp instalado en una zona con 5,5 HSP puede generar aproximadamente por día:",
  "alternativas": {
   "a": "125 kWh",
   "b": "200 kWh",
   "c": "275 kWh",
   "d": "500 kWh"
  },
  "correcta": "c",
  "explicacion": "E = 50 × 5,5 E = 275 kWh/día",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-048",
  "moduloId": "mod-9",
  "enunciado": "Si un sistema genera 275 kWh/día, la generación anual aproximada será:",
  "alternativas": {
   "a": "50.000 kWh",
   "b": "75.000 kWh",
   "c": "100.375 kWh",
   "d": "150.000 kWh"
  },
  "correcta": "c",
  "explicacion": "275 × 365 = 100.375 kWh/año",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-049",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es el principal criterio para dimensionar un string fotovoltaico?",
  "alternativas": {
   "a": "Compatibilidad entre tensión del string y rango MPPT del inversor",
   "b": "Color de módulos",
   "c": "Distancia al tablero",
   "d": "Tipo de estructura"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Compatibilidad entre tensión del string y rango MPPT del inversor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-050",
  "moduloId": "mod-9",
  "enunciado": "¿Qué condición debe verificarse respecto a la tensión máxima del string?",
  "alternativas": {
   "a": "Debe ser superior a la tensión máxima admisible del inversor",
   "b": "Debe ser inferior a la tensión máxima admisible del inversor",
   "c": "No tiene importancia",
   "d": "Debe ser igual a cero"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Debe ser inferior a la tensión máxima admisible del inversor».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-051",
  "moduloId": "mod-9",
  "enunciado": "En una planta fotovoltaica de 50 kWp, ¿qué tipo de inversor suele utilizarse?",
  "alternativas": {
   "a": "Inversor central o varios string inverters",
   "b": "Inversor de 500 W",
   "c": "Variador de frecuencia",
   "d": "UPS domiciliaria"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Inversor central o varios string inverters».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-052",
  "moduloId": "mod-9",
  "enunciado": "¿Qué riesgo existe si el inversor es seleccionado con potencia insuficiente?",
  "alternativas": {
   "a": "Sobrecarga y limitación de generación",
   "b": "Mayor eficiencia",
   "c": "Menor temperatura",
   "d": "Mayor vida útil"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sobrecarga y limitación de generación».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-053",
  "moduloId": "mod-9",
  "enunciado": "¿Qué protección se utiliza normalmente en cada string fotovoltaico cuando existen múltiples cadenas en paralelo?",
  "alternativas": {
   "a": "Fusibles o interruptores CC",
   "b": "Guardamotores",
   "c": "Relés térmicos",
   "d": "Contactores"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Fusibles o interruptores CC».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-054",
  "moduloId": "mod-9",
  "enunciado": "¿Cuándo se recomienda la utilización de DPS Tipo 1 en una instalación FV?",
  "alternativas": {
   "a": "Cuando existe riesgo de descargas atmosféricas directas o sistemas de protección externa contra rayos",
   "b": "Sólo en viviendas",
   "c": "Sólo en sistemas aislados",
   "d": "Nunca"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Cuando existe riesgo de descargas atmosféricas directas o sistemas de protección externa contra rayos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-055",
  "moduloId": "mod-9",
  "enunciado": "¿Cuál es la aplicación típica de un DPS Tipo 2 en sistemas FV?",
  "alternativas": {
   "a": "Protección frente a sobretensiones inducidas",
   "b": "Protección térmica",
   "c": "Protección diferencial",
   "d": "Protección contra sobrecargas"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Protección frente a sobretensiones inducidas».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-056",
  "moduloId": "mod-9",
  "enunciado": "¿Qué elementos deben incorporarse al sistema de puesta a tierra de una planta FV?",
  "alternativas": {
   "a": "Estructuras metálicas",
   "b": "Marcos de módulos",
   "c": "Gabinetes eléctricos",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-057",
  "moduloId": "mod-9",
  "enunciado": "Durante una inspección se detecta una diferencia significativa de producción entre dos strings idénticos. ¿Cuál es una causa probable?",
  "alternativas": {
   "a": "Sombreado parcial o falla de módulos",
   "b": "Exceso de puesta a tierra",
   "c": "Baja frecuencia",
   "d": "Mayor radiación solar local"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Sombreado parcial o falla de módulos».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-058",
  "moduloId": "mod-9",
  "enunciado": "Un sistema Net Billing inyecta más energía de la que consume durante el día. ¿Qué ocurre con ese excedente?",
  "alternativas": {
   "a": "Se pierde automáticamente",
   "b": "Se registra para valorización según la normativa vigente",
   "c": "Se transforma en calor",
   "d": "Se almacena obligatoriamente"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Se registra para valorización según la normativa vigente». Referencia: Ley 20.571.",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-059",
  "moduloId": "mod-9",
  "enunciado": "Durante una fiscalización SEC se detecta ausencia de protección CC entre los paneles y el inversor. ¿Cuál es la observación principal?",
  "alternativas": {
   "a": "Incumplimiento de requisitos de seguridad y protección",
   "b": "Incremento de eficiencia",
   "c": "Menor caída de tensión",
   "d": "Mejor operación del MPPT"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Incumplimiento de requisitos de seguridad y protección».",
  "dificultad": "alta"
 },
 {
  "id": "p-m9-060",
  "moduloId": "mod-9",
  "enunciado": "En un proyecto fotovoltaico de 10 kWp se verifica que: El inversor es compatible con los strings. Existen protecciones CC y CA. Se instalaron DPS adecuados. La puesta a tierra cumple normativa. La documentación SEC está completa. ¿Cuál es la conclusión técnica?",
  "alternativas": {
   "a": "El sistema cumple los criterios fundamentales de diseño y seguridad",
   "b": "Debe eliminarse la puesta a tierra",
   "c": "No requiere protecciones CC",
   "d": "No requiere documentación"
  },
  "correcta": "a",
  "explicacion": "Un sistema FV correctamente diseñado debe cumplir simultáneamente requisitos eléctricos, mecánicos, normativos y de seguridad establecidos por SEC y la normativa técnica aplicable. Referencia: Ley 20.571, Normativa SEC de Generación Distribuida, RIC aplicables.",
  "dificultad": "alta"
 },
 {
  "id": "p-m10-001",
  "moduloId": "mod-10",
  "enunciado": "¿Qué software es ampliamente utilizado para elaborar planos eléctricos?",
  "alternativas": {
   "a": "Word",
   "b": "AutoCAD",
   "c": "PowerPoint",
   "d": "Outlook"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «AutoCAD».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-002",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es la función principal de un plano eléctrico?",
  "alternativas": {
   "a": "Calcular impuestos",
   "b": "Representar gráficamente una instalación eléctrica",
   "c": "Medir energía",
   "d": "Controlar motores"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Representar gráficamente una instalación eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-003",
  "moduloId": "mod-10",
  "enunciado": "¿Qué es un símbolo eléctrico?",
  "alternativas": {
   "a": "Un equipo físico",
   "b": "Una representación gráfica normalizada de un elemento eléctrico",
   "c": "Un conductor",
   "d": "Un cálculo eléctrico"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Una representación gráfica normalizada de un elemento eléctrico».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-004",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento muestra la distribución física de enchufes, luminarias y equipos?",
  "alternativas": {
   "a": "Plano de planta eléctrica",
   "b": "Cuadro de carga",
   "c": "TE1",
   "d": "Memoria de cálculo"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Plano de planta eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-005",
  "moduloId": "mod-10",
  "enunciado": "¿Qué representa un diagrama unilineal?",
  "alternativas": {
   "a": "Todos los conductores detalladamente",
   "b": "La instalación mediante una representación simplificada",
   "c": "Sólo la puesta a tierra",
   "d": "Sólo los tableros"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «La instalación mediante una representación simplificada».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-006",
  "moduloId": "mod-10",
  "enunciado": "¿Qué representa un diagrama multifilar?",
  "alternativas": {
   "a": "Una representación detallada de todos los conductores",
   "b": "Sólo una línea por circuito",
   "c": "Sólo el tablero general",
   "d": "Sólo las protecciones"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Una representación detallada de todos los conductores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-007",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento resume la potencia y corriente de los circuitos?",
  "alternativas": {
   "a": "Cuadro de carga",
   "b": "Plano arquitectónico",
   "c": "Contrato eléctrico",
   "d": "Manual del fabricante"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Cuadro de carga».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-008",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento justifica técnicamente el diseño eléctrico?",
  "alternativas": {
   "a": "Factura",
   "b": "Memoria de cálculo",
   "c": "Boleta",
   "d": "Certificado bancario"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Memoria de cálculo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-009",
  "moduloId": "mod-10",
  "enunciado": "¿Qué es una cubicación?",
  "alternativas": {
   "a": "Cálculo de energía",
   "b": "Cuantificación de materiales y recursos",
   "c": "Medición de tensión",
   "d": "Medición de corriente"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Cuantificación de materiales y recursos».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-010",
  "moduloId": "mod-10",
  "enunciado": "¿Qué permite elaborar una cubicación?",
  "alternativas": {
   "a": "Calcular presupuesto",
   "b": "Medir frecuencia",
   "c": "Medir resistividad",
   "d": "Seleccionar motores"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Calcular presupuesto».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-011",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento se utiliza para declarar instalaciones interiores ante SEC?",
  "alternativas": {
   "a": "TE1",
   "b": "TE2",
   "c": "TE3",
   "d": "TE4"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «TE1».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-012",
  "moduloId": "mod-10",
  "enunciado": "¿Qué reglamento establece requisitos para la presentación de proyectos eléctricos?",
  "alternativas": {
   "a": "RIC 01",
   "b": "RIC 10",
   "c": "RIC 18",
   "d": "RIC 06"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «RIC 18».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-013",
  "moduloId": "mod-10",
  "enunciado": "¿Qué información debe contener un plano eléctrico?",
  "alternativas": {
   "a": "Circuitos",
   "b": "Tableros",
   "c": "Protecciones",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-014",
  "moduloId": "mod-10",
  "enunciado": "¿Qué herramienta de AutoCAD permite dibujar líneas?",
  "alternativas": {
   "a": "Trim",
   "b": "Line",
   "c": "Offset",
   "d": "Hatch"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Line».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-015",
  "moduloId": "mod-10",
  "enunciado": "¿Qué comando permite generar copias paralelas de una línea?",
  "alternativas": {
   "a": "Move",
   "b": "Scale",
   "c": "Offset",
   "d": "Rotate"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Offset».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-016",
  "moduloId": "mod-10",
  "enunciado": "¿Qué ventaja tiene trabajar con capas (Layers) en AutoCAD?",
  "alternativas": {
   "a": "Organizar elementos del dibujo",
   "b": "Aumentar voltaje",
   "c": "Reducir corriente",
   "d": "Medir potencia"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Organizar elementos del dibujo».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-017",
  "moduloId": "mod-10",
  "enunciado": "¿Qué plano muestra la ubicación física de luminarias y enchufes?",
  "alternativas": {
   "a": "Plano de planta eléctrica",
   "b": "Diagrama unilineal",
   "c": "Memoria de cálculo",
   "d": "Cuadro de carga"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Plano de planta eléctrica».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-018",
  "moduloId": "mod-10",
  "enunciado": "¿Qué representa una luminaria en un plano?",
  "alternativas": {
   "a": "Un conductor",
   "b": "Un punto de iluminación",
   "c": "Una puesta a tierra",
   "d": "Un tablero"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Un punto de iluminación».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-019",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es el objetivo de un proyecto eléctrico?",
  "alternativas": {
   "a": "Diseñar una instalación segura y funcional",
   "b": "Sólo calcular materiales",
   "c": "Sólo elaborar planos",
   "d": "Sólo calcular costos"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Diseñar una instalación segura y funcional».",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-020",
  "moduloId": "mod-10",
  "enunciado": "¿Qué debe integrar un proyecto eléctrico completo?",
  "alternativas": {
   "a": "Planos",
   "b": "Memoria de cálculo",
   "c": "Especificaciones técnicas",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "Un proyecto profesional requiere documentación gráfica, cálculos técnicos, especificaciones y antecedentes normativos. Referencia: RIC 18 -- Elaboración y Presentación de Proyectos.",
  "dificultad": "baja"
 },
 {
  "id": "p-m10-021",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es el objetivo principal de utilizar simbología normalizada SEC en un plano eléctrico?",
  "alternativas": {
   "a": "Mejorar la estética",
   "b": "Facilitar la interpretación técnica del proyecto",
   "c": "Reducir el tamaño del plano",
   "d": "Disminuir el costo de impresión"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Facilitar la interpretación técnica del proyecto». Referencia: RIC 18.",
  "dificultad": "media"
 },
 {
  "id": "p-m10-022",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento permite comprender la distribución física de los circuitos en una vivienda?",
  "alternativas": {
   "a": "Plano de planta eléctrica",
   "b": "Factura eléctrica",
   "c": "Manual del fabricante",
   "d": "Certificado de garantía"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Plano de planta eléctrica».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-023",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es la principal diferencia entre un plano de planta y un diagrama unilineal?",
  "alternativas": {
   "a": "Ninguna",
   "b": "El plano muestra ubicación física y el unilineal muestra conexiones eléctricas simplificadas",
   "c": "El unilineal muestra arquitectura",
   "d": "El plano sólo muestra protecciones"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «El plano muestra ubicación física y el unilineal muestra conexiones eléctricas simplificadas».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-024",
  "moduloId": "mod-10",
  "enunciado": "¿Qué información se representa normalmente en un diagrama unilineal?",
  "alternativas": {
   "a": "Alimentadores",
   "b": "Protecciones",
   "c": "Tableros",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-025",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es la ventaja principal de un diagrama multifilar?",
  "alternativas": {
   "a": "Mayor detalle de conexiones",
   "b": "Menor información",
   "c": "Menor precisión",
   "d": "Menor utilidad para mantenimiento"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Mayor detalle de conexiones».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-026",
  "moduloId": "mod-10",
  "enunciado": "¿Qué información debe contener un cuadro de carga?",
  "alternativas": {
   "a": "Potencia por circuito",
   "b": "Corriente por circuito",
   "c": "Protección asociada",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-027",
  "moduloId": "mod-10",
  "enunciado": "Una carga de 4.400 W a 220 V tendrá una corriente aproximada de:",
  "alternativas": {
   "a": "10 A",
   "b": "15 A",
   "c": "20 A",
   "d": "25 A"
  },
  "correcta": "c",
  "explicacion": "I = P / V I = 4400 / 220 I = 20 A",
  "dificultad": "media"
 },
 {
  "id": "p-m10-028",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento justifica la selección de conductores y protecciones?",
  "alternativas": {
   "a": "Memoria de cálculo",
   "b": "Plano arquitectónico",
   "c": "Contrato de suministro",
   "d": "Informe comercial"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Memoria de cálculo».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-029",
  "moduloId": "mod-10",
  "enunciado": "¿Qué información debe incluir una memoria de cálculo?",
  "alternativas": {
   "a": "Potencia instalada",
   "b": "Cálculo de demanda",
   "c": "Selección de conductores y protecciones",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-030",
  "moduloId": "mod-10",
  "enunciado": "¿Qué objetivo tiene la documentación TE1?",
  "alternativas": {
   "a": "Declarar una instalación ante la SEC",
   "b": "Medir energía",
   "c": "Solicitar empalme",
   "d": "Certificar motores"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Declarar una instalación ante la SEC».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-031",
  "moduloId": "mod-10",
  "enunciado": "¿Quién puede emitir una declaración TE1?",
  "alternativas": {
   "a": "Cualquier usuario",
   "b": "Constructor civil",
   "c": "Instalador autorizado SEC",
   "d": "Distribuidora eléctrica"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Instalador autorizado SEC».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-032",
  "moduloId": "mod-10",
  "enunciado": "¿Qué es una cubicación eléctrica?",
  "alternativas": {
   "a": "Medición de voltaje",
   "b": "Cuantificación de materiales necesarios para la obra",
   "c": "Medición de potencia",
   "d": "Medición de energía"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Cuantificación de materiales necesarios para la obra».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-033",
  "moduloId": "mod-10",
  "enunciado": "¿Qué elemento suele incluirse en una cubicación?",
  "alternativas": {
   "a": "Conductores",
   "b": "Canalizaciones",
   "c": "Protecciones",
   "d": "Todos los anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todos los anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-034",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es el propósito principal de un presupuesto eléctrico?",
  "alternativas": {
   "a": "Determinar el costo estimado del proyecto",
   "b": "Medir potencia",
   "c": "Medir corriente",
   "d": "Calcular factor de potencia"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Determinar el costo estimado del proyecto».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-035",
  "moduloId": "mod-10",
  "enunciado": "¿Qué herramienta de AutoCAD permite copiar objetos?",
  "alternativas": {
   "a": "Line",
   "b": "Copy",
   "c": "Rotate",
   "d": "Stretch"
  },
  "correcta": "b",
  "explicacion": "La alternativa correcta es «Copy».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-036",
  "moduloId": "mod-10",
  "enunciado": "¿Qué comando permite eliminar partes sobrantes de líneas?",
  "alternativas": {
   "a": "Offset",
   "b": "Hatch",
   "c": "Trim",
   "d": "Scale"
  },
  "correcta": "c",
  "explicacion": "La alternativa correcta es «Trim».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-037",
  "moduloId": "mod-10",
  "enunciado": "¿Qué ventaja tienen los bloques (Blocks) en AutoCAD?",
  "alternativas": {
   "a": "Reducen repetición de dibujo",
   "b": "Estandarizan simbología",
   "c": "Mejoran productividad",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-038",
  "moduloId": "mod-10",
  "enunciado": "¿Qué debe verificarse antes de imprimir un plano?",
  "alternativas": {
   "a": "Escala",
   "b": "Formato",
   "c": "Visibilidad de capas",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-039",
  "moduloId": "mod-10",
  "enunciado": "Según RIC 18, un proyecto eléctrico debe contener:",
  "alternativas": {
   "a": "Planos",
   "b": "Memoria de cálculo",
   "c": "Especificaciones técnicas",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-040",
  "moduloId": "mod-10",
  "enunciado": "¿Qué representa normalmente una línea punteada en planos eléctricos?",
  "alternativas": {
   "a": "Elemento oculto o referencia según norma aplicada",
   "b": "Conductor energizado",
   "c": "Puesta a tierra",
   "d": "Circuito de fuerza exclusivamente"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Elemento oculto o referencia según norma aplicada».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-041",
  "moduloId": "mod-10",
  "enunciado": "Durante la revisión de un plano, se observa que un circuito no posee identificación. Esto puede provocar:",
  "alternativas": {
   "a": "Confusión en montaje y mantenimiento",
   "b": "Mayor seguridad",
   "c": "Menor costo",
   "d": "Mejor operación"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Confusión en montaje y mantenimiento».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-042",
  "moduloId": "mod-10",
  "enunciado": "¿Cuál es la finalidad de numerar circuitos en planos y tableros?",
  "alternativas": {
   "a": "Facilitar identificación y mantenimiento",
   "b": "Reducir potencia",
   "c": "Disminuir corriente",
   "d": "Eliminar protecciones"
  },
  "correcta": "a",
  "explicacion": "La alternativa correcta es «Facilitar identificación y mantenimiento».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-043",
  "moduloId": "mod-10",
  "enunciado": "¿Qué documento permite relacionar potencia instalada y demanda calculada?",
  "alternativas": {
   "a": "Cuadro de carga",
   "b": "Memoria de cálculo",
   "c": "Plano unilineal",
   "d": "A y B son correctas"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «A y B son correctas».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-044",
  "moduloId": "mod-10",
  "enunciado": "¿Qué debe existir entre el plano eléctrico y la memoria de cálculo?",
  "alternativas": {
   "a": "Compatibilidad técnica",
   "b": "Coherencia de datos",
   "c": "Correspondencia de circuitos",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La alternativa correcta es «Todas las anteriores».",
  "dificultad": "media"
 },
 {
  "id": "p-m10-045",
  "moduloId": "mod-10",
  "enunciado": "Un proyecto eléctrico correctamente desarrollado según RIC 18 debe permitir:",
  "alternativas": {
   "a": "Construcción segura",
   "b": "Revisión técnica",
   "c": "Fiscalización SEC",
   "d": "Todas las anteriores"
  },
  "correcta": "d",
  "explicacion": "La documentación debe ser suficiente para construir, verificar, operar y fiscalizar la instalación eléctrica. Referencia: RIC 18 -- Elaboración y Presentación de Proyectos.",
  "dificultad": "media"
 }
];
