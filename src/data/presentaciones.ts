import type { Diapositiva } from '../types';

/**
 * Presentaciones de cada módulo, generadas a partir de los "Manual del Alumno"
 * (módulos 1 a 10) de CM Ingenierías. Una diapositiva por capítulo (los
 * capítulos largos se dividen en varias). Se muestran en la pestaña
 * "Presentación" de cada módulo.
 */
export const PRESENTACIONES: Record<string, Diapositiva[]> = {
 "mod-1": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 1",
   "titulo": "Legislación eléctrica chilena, Decreto Supremo N°8, licencias SEC y reglamentos RIC",
   "bloques": []
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción al sector eléctrico chileno (1/6)",
   "bloques": [
    {
     "subtitulo": "Introducción",
     "items": [
      {
       "tipo": "texto",
       "texto": "La energía eléctrica constituye uno de los pilares fundamentales para el desarrollo económico, industrial y social de un país. En Chile, las instalaciones eléctricas deben ejecutarse bajo estrictas normas técnicas y legales destinadas a proteger la vida de las personas, los bienes materiales y asegurar la continuidad operacional de los sistemas eléctricos."
      },
      {
       "tipo": "texto",
       "texto": "El crecimiento de las instalaciones residenciales, comerciales, industriales y de energías renovables ha generado una creciente demanda por profesionales capacitados en normativa eléctrica, diseño, ejecución y mantenimiento de instalaciones de consumo."
      },
      {
       "tipo": "texto",
       "texto": "Este manual tiene por objetivo entregar al participante los conocimientos técnicos y normativos necesarios para desempeñarse como Instalador Eléctrico Clase D SEC y desarrollar proyectos eléctricos conforme a la legislación vigente."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción al sector eléctrico chileno (2/6)",
   "bloques": [
    {
     "subtitulo": "Comisión Nacional de Energía (CNE)",
     "items": [
      {
       "tipo": "texto",
       "texto": "La Comisión Nacional de Energía es el organismo encargado de elaborar y coordinar los planes, políticas y normas para el correcto funcionamiento del sector energético nacional."
      },
      {
       "tipo": "encabezado",
       "texto": "Funciones principales:"
      },
      {
       "tipo": "punto",
       "texto": "Elaboración de políticas energéticas."
      },
      {
       "tipo": "punto",
       "texto": "Regulación tarifaria."
      },
      {
       "tipo": "punto",
       "texto": "Estudios técnicos."
      },
      {
       "tipo": "punto",
       "texto": "Desarrollo energético nacional."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción al sector eléctrico chileno (3/6)",
   "bloques": [
    {
     "subtitulo": "Superintendencia de Electricidad y Combustibles (SEC)",
     "items": [
      {
       "tipo": "texto",
       "texto": "La SEC es el organismo fiscalizador encargado de supervisar el cumplimiento de las disposiciones legales y reglamentarias relacionadas con electricidad, combustibles y gas."
      },
      {
       "tipo": "encabezado",
       "texto": "Funciones principales:"
      },
      {
       "tipo": "punto",
       "texto": "Fiscalización de instalaciones eléctricas."
      },
      {
       "tipo": "punto",
       "texto": "Emisión de licencias de instalador eléctrico."
      },
      {
       "tipo": "punto",
       "texto": "Recepción de declaraciones TE1."
      },
      {
       "tipo": "punto",
       "texto": "Aplicación de sanciones."
      },
      {
       "tipo": "punto",
       "texto": "Fiscalización de productos eléctricos certificados."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción al sector eléctrico chileno (4/6)",
   "bloques": [
    {
     "subtitulo": "Empresas Distribuidoras",
     "items": [
      {
       "tipo": "texto",
       "texto": "Son responsables de suministrar energía eléctrica a los usuarios finales."
      },
      {
       "tipo": "encabezado",
       "texto": "Ejemplos:"
      },
      {
       "tipo": "punto",
       "texto": "CGE"
      },
      {
       "tipo": "punto",
       "texto": "SAESA"
      },
      {
       "tipo": "punto",
       "texto": "FRONTEL"
      },
      {
       "tipo": "punto",
       "texto": "CHILQUINTA"
      },
      {
       "tipo": "punto",
       "texto": "ENEL DISTRIBUCIÓN"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción al sector eléctrico chileno (5/6)",
   "bloques": [
    {
     "subtitulo": "Marco Normativo Nacional",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Las instalaciones eléctricas de consumo deben cumplir con:"
      },
      {
       "tipo": "punto",
       "texto": "Ley General de Servicios Eléctricos."
      },
      {
       "tipo": "punto",
       "texto": "Decreto Supremo N°8."
      },
      {
       "tipo": "punto",
       "texto": "Reglamentos Técnicos SEC (RIC)."
      },
      {
       "tipo": "punto",
       "texto": "Normas Chilenas."
      },
      {
       "tipo": "punto",
       "texto": "Normas IEC adoptadas por Chile."
      },
      {
       "tipo": "punto",
       "texto": "Reglamentación Municipal aplicable."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción al sector eléctrico chileno (6/6)",
   "bloques": [
    {
     "subtitulo": "Importancia de la Seguridad Eléctrica",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Los accidentes eléctricos pueden provocar:"
      },
      {
       "tipo": "punto",
       "texto": "Electrocución."
      },
      {
       "tipo": "punto",
       "texto": "Quemaduras."
      },
      {
       "tipo": "punto",
       "texto": "Incendios."
      },
      {
       "tipo": "punto",
       "texto": "Explosiones."
      },
      {
       "tipo": "punto",
       "texto": "Daños a equipos."
      },
      {
       "tipo": "punto",
       "texto": "Interrupción de procesos productivos."
      },
      {
       "tipo": "texto",
       "texto": "Por esta razón, toda instalación eléctrica debe diseñarse considerando:"
      },
      {
       "tipo": "punto",
       "texto": "Seguridad de las personas."
      },
      {
       "tipo": "punto",
       "texto": "Protección de bienes."
      },
      {
       "tipo": "punto",
       "texto": "Continuidad de servicio."
      },
      {
       "tipo": "punto",
       "texto": "Eficiencia energética."
      },
      {
       "tipo": "punto",
       "texto": "Cumplimiento normativo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Decreto Supremo N°8 (1/3)",
   "bloques": [
    {
     "subtitulo": "Origen del Reglamento",
     "items": [
      {
       "tipo": "texto",
       "texto": "El Decreto Supremo N°8 del Ministerio de Energía establece las exigencias mínimas de seguridad para las instalaciones de consumo de energía eléctrica en baja tensión."
      },
      {
       "tipo": "texto",
       "texto": "Su objetivo principal es garantizar condiciones seguras durante:"
      },
      {
       "tipo": "punto",
       "texto": "Diseño."
      },
      {
       "tipo": "punto",
       "texto": "Construcción."
      },
      {
       "tipo": "punto",
       "texto": "Puesta en servicio."
      },
      {
       "tipo": "punto",
       "texto": "Operación."
      },
      {
       "tipo": "punto",
       "texto": "Mantenimiento."
      },
      {
       "tipo": "punto",
       "texto": "Reparación."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Decreto Supremo N°8 (2/3)",
   "bloques": [
    {
     "subtitulo": "Alcance",
     "items": [
      {
       "tipo": "texto",
       "texto": "El reglamento aplica a todas las instalaciones eléctricas de consumo conectadas a redes de distribución pública."
      },
      {
       "tipo": "encabezado",
       "texto": "Incluye:"
      },
      {
       "tipo": "punto",
       "texto": "Viviendas."
      },
      {
       "tipo": "punto",
       "texto": "Edificios."
      },
      {
       "tipo": "punto",
       "texto": "Comercios."
      },
      {
       "tipo": "punto",
       "texto": "Industrias."
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones especiales."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas fotovoltaicos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Decreto Supremo N°8 (3/3)",
   "bloques": [
    {
     "subtitulo": "Responsabilidades del Propietario",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El propietario es responsable de:"
      },
      {
       "tipo": "punto",
       "texto": "Mantener la instalación en condiciones seguras."
      },
      {
       "tipo": "punto",
       "texto": "Realizar inspecciones periódicas."
      },
      {
       "tipo": "punto",
       "texto": "Ejecutar normalizaciones."
      },
      {
       "tipo": "punto",
       "texto": "Contratar personal autorizado."
      }
     ]
    },
    {
     "subtitulo": "Responsabilidades del Instalador",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El instalador eléctrico autorizado deberá:"
      },
      {
       "tipo": "punto",
       "texto": "Ejecutar instalaciones conforme a normativa."
      },
      {
       "tipo": "punto",
       "texto": "Utilizar materiales certificados."
      },
      {
       "tipo": "punto",
       "texto": "Declarar instalaciones cuando corresponda."
      },
      {
       "tipo": "punto",
       "texto": "Garantizar la seguridad de los trabajos realizados."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Licencias de instalador eléctrico SEC (1/2)",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "La licencia SEC acredita la competencia técnica para ejecutar instalaciones eléctricas dentro de los límites establecidos por cada categoría."
      }
     ]
    },
    {
     "subtitulo": "Clase A",
     "items": [
      {
       "tipo": "texto",
       "texto": "Ingenieros eléctricos con atribuciones completas."
      }
     ]
    },
    {
     "subtitulo": "Clase B",
     "items": [
      {
       "tipo": "texto",
       "texto": "Profesionales con atribuciones específicas definidas por SEC."
      }
     ]
    },
    {
     "subtitulo": "Clase C",
     "items": [
      {
       "tipo": "texto",
       "texto": "Instalaciones de mayor complejidad técnica."
      }
     ]
    },
    {
     "subtitulo": "Clase D",
     "items": [
      {
       "tipo": "texto",
       "texto": "Instalaciones de baja tensión domiciliarias y comerciales de menor potencia."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Licencias de instalador eléctrico SEC (2/2)",
   "bloques": [
    {
     "subtitulo": "Campo de Acción Clase D",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Permite ejecutar:"
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones domiciliarias."
      },
      {
       "tipo": "punto",
       "texto": "Ampliaciones eléctricas."
      },
      {
       "tipo": "punto",
       "texto": "Tableros de distribución."
      },
      {
       "tipo": "punto",
       "texto": "Alumbrado."
      },
      {
       "tipo": "punto",
       "texto": "Enchufes."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas de protección."
      }
     ]
    },
    {
     "subtitulo": "Requisitos Generales",
     "items": [
      {
       "tipo": "punto",
       "texto": "Formación técnica reconocida."
      },
      {
       "tipo": "punto",
       "texto": "Documentación requerida por SEC."
      },
      {
       "tipo": "punto",
       "texto": "Cumplimiento normativo vigente."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Reglamentos técnicos RIC",
   "bloques": [
    {
     "subtitulo": "Introducción",
     "items": [
      {
       "tipo": "texto",
       "texto": "Los Reglamentos Técnicos para Instalaciones de Consumo (RIC) complementan las disposiciones establecidas por el Decreto Supremo N°8."
      }
     ]
    },
    {
     "subtitulo": "RIC 14 Eficiencia Energética",
     "items": [
      {
       "tipo": "texto",
       "texto": "RIC 15 Infraestructura de Recarga para Vehículos Eléctricos"
      }
     ]
    },
    {
     "subtitulo": "Aplicación Práctica",
     "items": [
      {
       "tipo": "texto",
       "texto": "Todo proyecto eléctrico debe considerar simultáneamente los requisitos establecidos en los distintos RIC aplicables según el tipo de instalación."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "El sector eléctrico chileno está regulado por organismos técnicos y fiscalizadores."
      },
      {
       "tipo": "punto",
       "texto": "El Decreto Supremo N°8 establece las exigencias mínimas de seguridad."
      },
      {
       "tipo": "punto",
       "texto": "La SEC fiscaliza las instalaciones eléctricas."
      },
      {
       "tipo": "punto",
       "texto": "La Licencia Clase D permite ejecutar instalaciones de baja tensión."
      },
      {
       "tipo": "punto",
       "texto": "Los Reglamentos Técnicos RIC complementan la normativa vigente."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Taller práctico",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Analizar una instalación domiciliaria existente e identificar los reglamentos RIC aplicables para su diseño, ejecución y puesta en servicio."
      }
     ]
    }
   ]
  }
 ],
 "mod-2": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 2",
   "titulo": "Fundamentos de electricidad aplicada",
   "bloques": []
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a la electricidad",
   "bloques": [
    {
     "subtitulo": "Objetivo del módulo",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Al finalizar este módulo el participante será capaz de:"
      },
      {
       "tipo": "texto",
       "texto": "Comprender los principios fundamentales de la electricidad."
      },
      {
       "tipo": "texto",
       "texto": "Identificar las magnitudes eléctricas principales."
      },
      {
       "tipo": "texto",
       "texto": "Aplicar la Ley de Ohm en circuitos eléctricos."
      },
      {
       "tipo": "texto",
       "texto": "Calcular potencia eléctrica monofásica y trifásica."
      },
      {
       "tipo": "texto",
       "texto": "Analizar circuitos serie, paralelo y mixtos."
      },
      {
       "tipo": "texto",
       "texto": "Resolver ejercicios aplicados a instalaciones eléctricas."
      },
      {
       "tipo": "texto",
       "texto": "Prepararse para evaluaciones técnicas y exámenes SEC."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Magnitudes eléctricas fundamentales (1/4)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "La electricidad es el movimiento ordenado de electrones a través de un conductor."
      }
     ]
    },
    {
     "subtitulo": "Carga Eléctrica",
     "items": [
      {
       "tipo": "texto",
       "texto": "La carga eléctrica es una propiedad física de la materia."
      },
      {
       "tipo": "dato",
       "texto": "Unidad: Coulomb (C)"
      },
      {
       "tipo": "dato",
       "texto": "Símbolo: Q"
      }
     ]
    },
    {
     "subtitulo": "Corriente Eléctrica",
     "items": [
      {
       "tipo": "texto",
       "texto": "La corriente eléctrica corresponde al flujo de electrones que circula por un conductor."
      },
      {
       "tipo": "dato",
       "texto": "Símbolo: I"
      },
      {
       "tipo": "dato",
       "texto": "Unidad: Ampere (A)"
      },
      {
       "tipo": "dato",
       "texto": "Instrumento: Amperímetro"
      },
      {
       "tipo": "dato",
       "texto": "Ejemplo: Una ducha eléctrica consume 25 A."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Magnitudes eléctricas fundamentales (2/4)",
   "bloques": [
    {
     "subtitulo": "Voltaje",
     "items": [
      {
       "tipo": "texto",
       "texto": "El voltaje representa la fuerza que impulsa a los electrones."
      },
      {
       "tipo": "dato",
       "texto": "Símbolo: V"
      },
      {
       "tipo": "dato",
       "texto": "Unidad: Volt (V)"
      },
      {
       "tipo": "dato",
       "texto": "Instrumento: Voltímetro"
      },
      {
       "tipo": "dato",
       "texto": "Ejemplos: Enchufe domiciliario: 220 V"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Magnitudes eléctricas fundamentales (3/4)",
   "bloques": [
    {
     "subtitulo": "Resistencia",
     "items": [
      {
       "tipo": "texto",
       "texto": "Es la oposición al paso de la corriente eléctrica."
      },
      {
       "tipo": "dato",
       "texto": "Símbolo: R"
      },
      {
       "tipo": "dato",
       "texto": "Unidad: Ohm (Ω)"
      },
      {
       "tipo": "dato",
       "texto": "Instrumento: Ohmímetro"
      },
      {
       "tipo": "encabezado",
       "texto": "Ejemplo:"
      },
      {
       "tipo": "texto",
       "texto": "Un calefactor posee una resistencia diseñada para transformar energía eléctrica en calor."
      }
     ]
    },
    {
     "subtitulo": "Potencia Eléctrica",
     "items": [
      {
       "tipo": "texto",
       "texto": "La potencia representa la velocidad con que se consume energía."
      },
      {
       "tipo": "dato",
       "texto": "Símbolo: P"
      },
      {
       "tipo": "dato",
       "texto": "Unidad: Watt (W)"
      },
      {
       "tipo": "dato",
       "texto": "Relación: Potencia = Voltaje × Corriente"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Magnitudes eléctricas fundamentales (4/4)",
   "bloques": [
    {
     "subtitulo": "Energía Eléctrica",
     "items": [
      {
       "tipo": "texto",
       "texto": "Representa el trabajo realizado por la potencia durante un tiempo determinado."
      },
      {
       "tipo": "dato",
       "texto": "Unidad: kWh"
      },
      {
       "tipo": "encabezado",
       "texto": "Ejemplo:"
      },
      {
       "tipo": "encabezado",
       "texto": "Un artefacto de 1000 W funcionando durante una hora consume:"
      },
      {
       "tipo": "texto",
       "texto": "1 kWh"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Ley de Ohm",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "La Ley de Ohm es uno de los principios más importantes de la electricidad."
      },
      {
       "tipo": "dato",
       "texto": "Relaciona: Voltaje"
      }
     ]
    },
    {
     "subtitulo": "Resistencia",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Fórmula principal:"
      },
      {
       "tipo": "dato",
       "texto": "Donde: V = Voltaje (V)"
      },
      {
       "tipo": "formula",
       "texto": "I = Corriente (A)"
      },
      {
       "tipo": "formula",
       "texto": "R = Resistencia (Ω)"
      }
     ]
    },
    {
     "subtitulo": "Despejes",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Corriente:"
      },
      {
       "tipo": "encabezado",
       "texto": "Resistencia:"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Ejercicios resueltos",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Ejercicio 1: Un circuito posee:"
      },
      {
       "tipo": "formula",
       "texto": "V = 220 V"
      },
      {
       "tipo": "formula",
       "texto": "R = 22 Ω"
      },
      {
       "tipo": "texto",
       "texto": "Determinar la corriente."
      },
      {
       "tipo": "dato",
       "texto": "Solución: I = V / R"
      },
      {
       "tipo": "formula",
       "texto": "I = 220 / 22"
      },
      {
       "tipo": "formula",
       "texto": "I = 10 A"
      },
      {
       "tipo": "dato",
       "texto": "Respuesta: La corriente es 10 amperes."
      },
      {
       "tipo": "punto",
       "texto": "Ejercicio 2: Un motor consume:"
      },
      {
       "tipo": "formula",
       "texto": "I = 15 A"
      },
      {
       "tipo": "formula",
       "texto": "V = 220 V"
      },
      {
       "tipo": "texto",
       "texto": "Calcular potencia."
      },
      {
       "tipo": "formula",
       "texto": "P = V × I"
      },
      {
       "tipo": "formula",
       "texto": "P = 220 × 15"
      },
      {
       "tipo": "formula",
       "texto": "P = 3300 W"
      },
      {
       "tipo": "dato",
       "texto": "Respuesta: 3,3 kW"
      },
      {
       "tipo": "punto",
       "texto": "Ejercicio 3: Un calefactor de 2000 W conectado a 220 V."
      },
      {
       "tipo": "texto",
       "texto": "Calcular corriente."
      },
      {
       "tipo": "formula",
       "texto": "I = P / V"
      },
      {
       "tipo": "formula",
       "texto": "I = 2000 / 220"
      },
      {
       "tipo": "formula",
       "texto": "I = 9,09 A"
      },
      {
       "tipo": "dato",
       "texto": "Respuesta: 9,09 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Potencia eléctrica",
   "bloques": [
    {
     "subtitulo": "Potencia Monofásica",
     "items": [
      {
       "tipo": "dato",
       "texto": "Fórmula: P=V\\cdot I"
      },
      {
       "tipo": "dato",
       "texto": "Variables: P = Potencia (W)"
      },
      {
       "tipo": "formula",
       "texto": "V = Voltaje (V)"
      },
      {
       "tipo": "formula",
       "texto": "I = Corriente (A)"
      }
     ]
    },
    {
     "subtitulo": "Ejemplo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Circuito: 220 V"
      }
     ]
    },
    {
     "subtitulo": "20 A",
     "items": [
      {
       "tipo": "formula",
       "texto": "P = 220 × 20"
      },
      {
       "tipo": "formula",
       "texto": "P = 4400 W"
      },
      {
       "tipo": "dato",
       "texto": "Respuesta: 4,4 kW"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Potencia trifásica",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Los sistemas trifásicos son ampliamente utilizados en:"
      }
     ]
    },
    {
     "subtitulo": "Bombeo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Fórmula: P=\\sqrt{3}\\cdot V\\cdot I\\cdot cos\\phi"
      },
      {
       "tipo": "dato",
       "texto": "Donde: V = Voltaje línea-línea"
      },
      {
       "tipo": "formula",
       "texto": "I = Corriente de línea"
      },
      {
       "tipo": "formula",
       "texto": "cosφ = Factor de potencia"
      }
     ]
    },
    {
     "subtitulo": "Ejemplo Industrial",
     "items": [
      {
       "tipo": "dato",
       "texto": "Datos: 380 V"
      }
     ]
    },
    {
     "subtitulo": "50 A",
     "items": [
      {
       "tipo": "formula",
       "texto": "cosφ = 0,9"
      },
      {
       "tipo": "dato",
       "texto": "Resultado: P = 29,6 kW"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Factor de potencia (1/2)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "El factor de potencia representa la eficiencia con que una instalación utiliza la energía eléctrica."
      },
      {
       "tipo": "dato",
       "texto": "Símbolo: cosφ"
      },
      {
       "tipo": "dato",
       "texto": "Rango: 0 a 1"
      },
      {
       "tipo": "dato",
       "texto": "Valor ideal: 1"
      }
     ]
    },
    {
     "subtitulo": "Cargas Resistivas",
     "items": [
      {
       "tipo": "dato",
       "texto": "Ejemplos: Estufas"
      }
     ]
    },
    {
     "subtitulo": "Resistencias",
     "items": [
      {
       "tipo": "texto",
       "texto": "cosφ ≈ 1"
      }
     ]
    },
    {
     "subtitulo": "Cargas Inductivas",
     "items": [
      {
       "tipo": "dato",
       "texto": "Ejemplos: Motores"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Factor de potencia (2/2)",
   "bloques": [
    {
     "subtitulo": "Transformadores",
     "items": [
      {
       "tipo": "texto",
       "texto": "cosφ < 1"
      }
     ]
    },
    {
     "subtitulo": "Consecuencias de Bajo Factor de Potencia",
     "items": [
      {
       "tipo": "texto",
       "texto": "Mayor corriente."
      },
      {
       "tipo": "texto",
       "texto": "Mayor caída de tensión."
      },
      {
       "tipo": "texto",
       "texto": "Pérdidas eléctricas."
      },
      {
       "tipo": "texto",
       "texto": "Multas de la distribuidora."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Circuitos eléctricos (1/2)",
   "bloques": [
    {
     "subtitulo": "Circuito Serie",
     "items": [
      {
       "tipo": "dato",
       "texto": "Características: Una sola trayectoria."
      },
      {
       "tipo": "texto",
       "texto": "Misma corriente en todos los elementos."
      },
      {
       "tipo": "dato",
       "texto": "Resistencia total: Ejemplo"
      },
      {
       "tipo": "formula",
       "texto": "R1 = 10 Ω"
      },
      {
       "tipo": "formula",
       "texto": "R2 = 20 Ω"
      },
      {
       "tipo": "formula",
       "texto": "R3 = 30 Ω"
      },
      {
       "tipo": "formula",
       "texto": "Rt = 60 Ω"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Circuitos eléctricos (2/2)",
   "bloques": [
    {
     "subtitulo": "Circuito Paralelo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Características: Varias trayectorias. · Mismo voltaje."
      },
      {
       "tipo": "dato",
       "texto": "Fórmula: Aplicación"
      },
      {
       "tipo": "texto",
       "texto": "Instalaciones domiciliarias."
      },
      {
       "tipo": "texto",
       "texto": "Todas las luminarias y enchufes se conectan en paralelo."
      }
     ]
    },
    {
     "subtitulo": "Circuito Mixto",
     "items": [
      {
       "tipo": "dato",
       "texto": "Combina elementos: Serie"
      }
     ]
    },
    {
     "subtitulo": "Paralelo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Muy común en instalaciones industriales."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Actividades prácticas",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Medición de voltaje domiciliario."
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Utilizar correctamente un multímetro."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Medición de corriente en circuito de iluminación."
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Utilizar pinza amperimétrica."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Comprobación experimental de la Ley de Ohm."
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Verificar relación entre voltaje, corriente y resistencia."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Montaje de circuito serie."
      },
      {
       "tipo": "dato",
       "texto": "Materiales: Fuente de alimentación. · Interruptor. · Conductores."
      },
      {
       "tipo": "texto",
       "texto": "Lámparas."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Montaje de circuito paralelo."
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Analizar funcionamiento independiente de cargas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante debe ser capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Identificar magnitudes eléctricas."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar Ley de Ohm."
      },
      {
       "tipo": "punto",
       "texto": "Calcular potencia monofásica."
      },
      {
       "tipo": "punto",
       "texto": "Calcular potencia trifásica."
      },
      {
       "tipo": "punto",
       "texto": "Comprender factor de potencia."
      },
      {
       "tipo": "punto",
       "texto": "Analizar circuitos serie y paralelo."
      },
      {
       "tipo": "punto",
       "texto": "Resolver problemas básicos de instalaciones eléctricas."
      },
      {
       "tipo": "punto",
       "texto": "Interpretar situaciones reales de terre"
      }
     ]
    }
   ]
  }
 ],
 "mod-3": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 3",
   "titulo": "Conductores eléctricos, canalizaciones y cálculo de alimentadores",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de seleccionar, dimensionar e instalar conductores eléctricos, canalizaciones y alimentadores conforme al Decreto Supremo N°8, RIC 03 y RIC 04, garantizando seguridad, eficiencia energética y cumplimiento normativo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Conductores eléctricos (1/5)",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Los conductores eléctricos son elementos destinados a transportar corriente eléctrica desde una fuente de alimentación hacia una carga."
      },
      {
       "tipo": "texto",
       "texto": "Su función principal es permitir el flujo de electrones con la menor pérdida de energía posible."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Conductores eléctricos (2/5)",
   "bloques": [
    {
     "subtitulo": "Cobre",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Alta conductividad eléctrica."
      },
      {
       "tipo": "punto",
       "texto": "Excelente resistencia mecánica."
      },
      {
       "tipo": "punto",
       "texto": "Alta resistencia a la corrosión."
      },
      {
       "tipo": "punto",
       "texto": "Fácil instalación."
      },
      {
       "tipo": "dato",
       "texto": "Conductividad relativa: 100%"
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Viviendas."
      },
      {
       "tipo": "punto",
       "texto": "Comercio."
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas fotovoltaicos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Conductores eléctricos (3/5)",
   "bloques": [
    {
     "subtitulo": "Aluminio",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Menor peso."
      },
      {
       "tipo": "punto",
       "texto": "Menor costo."
      },
      {
       "tipo": "punto",
       "texto": "Menor conductividad."
      },
      {
       "tipo": "dato",
       "texto": "Conductividad relativa: 61%"
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Redes de distribución."
      },
      {
       "tipo": "punto",
       "texto": "Grandes instalaciones."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Conductores eléctricos (4/5)",
   "bloques": [
    {
     "subtitulo": "Conductor Sólido",
     "items": [
      {
       "tipo": "texto",
       "texto": "Formado por un solo hilo conductor."
      },
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Bajo costo."
      },
      {
       "tipo": "punto",
       "texto": "Fácil terminación."
      },
      {
       "tipo": "encabezado",
       "texto": "Desventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Menor flexibilidad."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones fijas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Conductores eléctricos (5/5)",
   "bloques": [
    {
     "subtitulo": "Conductor Flexible",
     "items": [
      {
       "tipo": "texto",
       "texto": "Formado por múltiples filamentos."
      },
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Alta flexibilidad."
      },
      {
       "tipo": "punto",
       "texto": "Fácil montaje."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Tableros."
      },
      {
       "tipo": "punto",
       "texto": "Equipos móviles."
      },
      {
       "tipo": "punto",
       "texto": "Automatización."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Aislación de conductores (1/2)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "La aislación evita contactos directos entre conductores y personas."
      }
     ]
    },
    {
     "subtitulo": "PVC",
     "items": [
      {
       "tipo": "dato",
       "texto": "Temperatura máxima: 70°C"
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones domiciliarias."
      }
     ]
    },
    {
     "subtitulo": "XLPE",
     "items": [
      {
       "tipo": "dato",
       "texto": "Temperatura máxima: 90°C"
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Fotovoltaico."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Aislación de conductores (2/2)",
   "bloques": [
    {
     "subtitulo": "EPR",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Minería."
      },
      {
       "tipo": "punto",
       "texto": "Ambientes severos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Sección del conductor",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "La sección corresponde al área transversal del conductor."
      },
      {
       "tipo": "dato",
       "texto": "Unidad: mm²"
      },
      {
       "tipo": "dato",
       "texto": "Secciones normalizadas: 1,5 mm²"
      }
     ]
    },
    {
     "subtitulo": "95 mm²",
     "items": [
      {
       "tipo": "texto",
       "texto": "120 mm²"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Capacidad de corriente (ampacidad)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "La ampacidad corresponde a la máxima corriente que puede transportar un conductor sin superar la temperatura permitida."
      }
     ]
    },
    {
     "subtitulo": "95 mm² → 200 A",
     "items": [
      {
       "tipo": "texto",
       "texto": "120 mm² → 230 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Factores de corrección",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "La capacidad de corriente disminuye cuando existen condiciones especiales."
      }
     ]
    },
    {
     "subtitulo": "Temperatura Ambiente",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ejemplo:"
      },
      {
       "tipo": "dato",
       "texto": "Temperatura diseño: 30°C"
      },
      {
       "tipo": "dato",
       "texto": "Temperatura real: 40°C"
      },
      {
       "tipo": "dato",
       "texto": "Factor corrección: 0,87"
      }
     ]
    },
    {
     "subtitulo": "Agrupamiento",
     "items": [
      {
       "tipo": "texto",
       "texto": "Cuando varios conductores comparten una misma canalización."
      },
      {
       "tipo": "dato",
       "texto": "Ejemplo: 4 circuitos"
      },
      {
       "tipo": "dato",
       "texto": "Factor: 0,80"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Caída de tensión",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Corresponde a la pérdida de voltaje que se produce debido a la resistencia del conductor."
      }
     ]
    },
    {
     "subtitulo": "Recomendaciones",
     "items": [
      {
       "tipo": "dato",
       "texto": "Alumbrado: Máximo 3%"
      },
      {
       "tipo": "dato",
       "texto": "Fuerza: Máximo 5%"
      },
      {
       "tipo": "dato",
       "texto": "Instalación completa: Máximo 5%"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Ejemplo de cálculo de alimentador (1/2)",
   "bloques": [
    {
     "subtitulo": "Datos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Carga: 8.000 W"
      },
      {
       "tipo": "dato",
       "texto": "Voltaje: 220 V"
      },
      {
       "tipo": "dato",
       "texto": "Distancia: 30 m"
      },
      {
       "tipo": "punto",
       "texto": "Paso 1: Corriente"
      },
      {
       "tipo": "formula",
       "texto": "I = P / V"
      },
      {
       "tipo": "formula",
       "texto": "I = 8.000 / 220"
      },
      {
       "tipo": "formula",
       "texto": "I = 36,4 A"
      },
      {
       "tipo": "punto",
       "texto": "Paso 2: Selección preliminar"
      }
     ]
    },
    {
     "subtitulo": "6 mm² = 32 A",
     "items": [
      {
       "tipo": "texto",
       "texto": "No cumple."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Ejemplo de cálculo de alimentador (2/2)",
   "bloques": [
    {
     "subtitulo": "10 mm² = 50 A",
     "items": [
      {
       "tipo": "texto",
       "texto": "Cumple."
      },
      {
       "tipo": "punto",
       "texto": "Paso 3: Verificación caída de tensión"
      },
      {
       "tipo": "dato",
       "texto": "Resultado: Menor al límite permitido."
      }
     ]
    },
    {
     "subtitulo": "Conductor Cu 10 mm²",
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección: 40 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Canalizaciones eléctricas (1/3)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Las canalizaciones protegen mecánica y eléctricamente a los conductores."
      }
     ]
    },
    {
     "subtitulo": "Tubo PVC",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Económico."
      },
      {
       "tipo": "punto",
       "texto": "Resistente a la corrosión."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Viviendas."
      },
      {
       "tipo": "punto",
       "texto": "Oficinas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Canalizaciones eléctricas (2/3)",
   "bloques": [
    {
     "subtitulo": "EMT",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Tubo metálico liviano."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Comercio."
      },
      {
       "tipo": "punto",
       "texto": "Industria liviana."
      }
     ]
    },
    {
     "subtitulo": "IMC",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Mayor resistencia mecánica."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Canalizaciones eléctricas (3/3)",
   "bloques": [
    {
     "subtitulo": "RMC",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Acero galvanizado pesado."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Minería."
      },
      {
       "tipo": "punto",
       "texto": "Faenas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Ocupación de canalizaciones",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "La cantidad de conductores debe permitir:"
      },
      {
       "tipo": "punto",
       "texto": "Instalación segura."
      },
      {
       "tipo": "punto",
       "texto": "Disipación térmica."
      },
      {
       "tipo": "punto",
       "texto": "Facilidad de mantenimiento."
      }
     ]
    },
    {
     "subtitulo": "2 conductores → 31%",
     "items": [
      {
       "tipo": "texto",
       "texto": "3 o más conductores → 40%"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Alimentadores y subalimentadores",
   "bloques": [
    {
     "subtitulo": "Alimentador",
     "items": [
      {
       "tipo": "dato",
       "texto": "Conductor que conecta: Empalme → Tablero General"
      }
     ]
    },
    {
     "subtitulo": "Subalimentador",
     "items": [
      {
       "tipo": "dato",
       "texto": "Conductor que conecta: Tablero General → Tablero Secundario"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Aplicación en sistemas fotovoltaicos",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Los sistemas solares requieren conductores especiales."
      },
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Resistencia UV."
      },
      {
       "tipo": "punto",
       "texto": "Resistencia humedad."
      },
      {
       "tipo": "punto",
       "texto": "Temperatura 90°C."
      },
      {
       "tipo": "punto",
       "texto": "Libre de halógenos."
      },
      {
       "tipo": "dato",
       "texto": "Norma: EN 50618"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Identificación de conductores."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Medición de resistencia eléctrica."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Dimensionamiento de conductores."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Cálculo de caída de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Instalación de canalizaciones EMT."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Construcción de alimentador domiciliario."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Taller integrador",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Diseñar la alimentación eléctrica completa de una vivienda de 120 m²."
      },
      {
       "tipo": "encabezado",
       "texto": "Entregar:"
      },
      {
       "tipo": "punto",
       "texto": "Cuadro de cargas."
      },
      {
       "tipo": "punto",
       "texto": "Corriente total."
      },
      {
       "tipo": "punto",
       "texto": "Alimentador."
      },
      {
       "tipo": "punto",
       "texto": "Protección general."
      },
      {
       "tipo": "punto",
       "texto": "Canalización."
      },
      {
       "tipo": "punto",
       "texto": "Memoria de cálculo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante debe ser capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar conductores."
      },
      {
       "tipo": "punto",
       "texto": "Calcular ampacidad."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar factores de corrección."
      },
      {
       "tipo": "punto",
       "texto": "Determinar caída de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar canalizaciones."
      },
      {
       "tipo": "punto",
       "texto": "Interpretar requisitos normativos."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar criterios SEC en instalaciones reales."
      }
     ]
    }
   ]
  }
 ],
 "mod-4": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 4",
   "titulo": "Puesta a tierra y protección contra tensiones peligrosas",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de diseñar, construir, medir y verificar sistemas de puesta a tierra y protecciones contra tensiones peligrosas, aplicando los criterios establecidos en el Decreto Supremo N°8, RIC 05 y RIC 06."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Seguridad eléctrica",
   "bloques": [
    {
     "subtitulo": "Importancia de la Protección Eléctrica",
     "items": [
      {
       "tipo": "texto",
       "texto": "La electricidad es indispensable para el desarrollo humano, pero también representa uno de los riesgos más importantes en instalaciones residenciales, comerciales e industriales."
      },
      {
       "tipo": "encabezado",
       "texto": "Los principales riesgos eléctricos son:"
      },
      {
       "tipo": "punto",
       "texto": "Electrocución."
      },
      {
       "tipo": "punto",
       "texto": "Quemaduras."
      },
      {
       "tipo": "punto",
       "texto": "Incendios."
      },
      {
       "tipo": "punto",
       "texto": "Explosiones."
      },
      {
       "tipo": "punto",
       "texto": "Daños a equipos."
      },
      {
       "tipo": "punto",
       "texto": "Interrupciones operacionales."
      }
     ]
    },
    {
     "subtitulo": "50 mA\tFibrilación ventricular",
     "items": [
      {
       "tipo": "texto",
       "texto": "100 mA\tAlto riesgo de muerte"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Contactos eléctricos (1/2)",
   "bloques": [
    {
     "subtitulo": "Contacto Directo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Ocurre cuando una persona toca partes activas energizadas."
      },
      {
       "tipo": "encabezado",
       "texto": "Ejemplos:"
      },
      {
       "tipo": "punto",
       "texto": "Conductores desnudos."
      },
      {
       "tipo": "punto",
       "texto": "Barras energizadas."
      },
      {
       "tipo": "punto",
       "texto": "Terminales sin protección."
      }
     ]
    },
    {
     "subtitulo": "Contacto Indirecto",
     "items": [
      {
       "tipo": "texto",
       "texto": "Ocurre cuando una persona toca masas metálicas accidentalmente energizadas debido a una falla."
      },
      {
       "tipo": "encabezado",
       "texto": "Ejemplos:"
      },
      {
       "tipo": "punto",
       "texto": "Carcasa de motor."
      },
      {
       "tipo": "punto",
       "texto": "Gabinete metálico."
      },
      {
       "tipo": "punto",
       "texto": "Tablero eléctrico."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Contactos eléctricos (2/2)",
   "bloques": [
    {
     "subtitulo": "Medidas de Protección",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Contra contactos directos:"
      },
      {
       "tipo": "punto",
       "texto": "Aislación."
      },
      {
       "tipo": "punto",
       "texto": "Barreras."
      },
      {
       "tipo": "punto",
       "texto": "Cubiertas."
      },
      {
       "tipo": "punto",
       "texto": "Diferenciales de alta sensibilidad."
      },
      {
       "tipo": "encabezado",
       "texto": "Contra contactos indirectos:"
      },
      {
       "tipo": "punto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Equipotencialización."
      },
      {
       "tipo": "punto",
       "texto": "Diferenciales."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Sistemas de puesta a tierra",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Sistema destinado a conectar eléctricamente masas metálicas con el terreno."
      },
      {
       "tipo": "encabezado",
       "texto": "Objetivos:"
      },
      {
       "tipo": "punto",
       "texto": "Proteger personas."
      },
      {
       "tipo": "punto",
       "texto": "Proteger equipos."
      },
      {
       "tipo": "punto",
       "texto": "Limitar tensiones peligrosas."
      },
      {
       "tipo": "punto",
       "texto": "Facilitar operación de protecciones."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Esquemas de conexión a tierra (1/3)",
   "bloques": [
    {
     "subtitulo": "Sistema TT",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Neutro conectado a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Masas conectadas a tierra independiente."
      },
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Alta seguridad."
      },
      {
       "tipo": "punto",
       "texto": "Uso generalizado en viviendas."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones domiciliarias."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Esquemas de conexión a tierra (2/3)",
   "bloques": [
    {
     "subtitulo": "Sistema TN",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Masas conectadas al mismo punto de tierra del neutro."
      },
      {
       "tipo": "encabezado",
       "texto": "Variantes:"
      },
      {
       "tipo": "punto",
       "texto": "TN-S"
      },
      {
       "tipo": "punto",
       "texto": "TN-C"
      },
      {
       "tipo": "punto",
       "texto": "TN-C-S"
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Edificios."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Esquemas de conexión a tierra (3/3)",
   "bloques": [
    {
     "subtitulo": "Sistema IT",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Fuente aislada de tierra."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Hospitales."
      },
      {
       "tipo": "punto",
       "texto": "Procesos críticos."
      },
      {
       "tipo": "punto",
       "texto": "Minería."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Resistividad del terreno",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "La resistividad representa la dificultad que presenta el terreno para conducir corriente eléctrica."
      },
      {
       "tipo": "dato",
       "texto": "Unidad: Ω·m"
      }
     ]
    },
    {
     "subtitulo": "Arenoso\t500 Ω·m",
     "items": [
      {
       "tipo": "texto",
       "texto": "Rocoso\t1000 Ω·m"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Método Wenner (1/2)",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Determinar la resistividad del terreno antes de diseñar una puesta a tierra."
      }
     ]
    },
    {
     "subtitulo": "Equipamiento",
     "items": [
      {
       "tipo": "punto",
       "texto": "Telurómetro."
      },
      {
       "tipo": "punto",
       "texto": "Cuatro electrodos."
      },
      {
       "tipo": "punto",
       "texto": "Cables de prueba."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Método Wenner (2/2)",
   "bloques": [
    {
     "subtitulo": "Procedimiento",
     "items": [
      {
       "tipo": "texto",
       "texto": "Instalar cuatro electrodos alineados."
      },
      {
       "tipo": "texto",
       "texto": "Mantener igual separación."
      },
      {
       "tipo": "texto",
       "texto": "Aplicar corriente de prueba."
      },
      {
       "tipo": "texto",
       "texto": "Medir resistencia."
      },
      {
       "tipo": "texto",
       "texto": "Calcular resistividad."
      }
     ]
    },
    {
     "subtitulo": "\\rho=2\\pi aR",
     "items": [
      {
       "tipo": "dato",
       "texto": "Donde: ρ = Resistividad"
      },
      {
       "tipo": "formula",
       "texto": "a = Separación entre electrodos"
      },
      {
       "tipo": "formula",
       "texto": "R = Resistencia medida"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Método de caída de potencial",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Medir resistencia de puesta a tierra instalada."
      }
     ]
    },
    {
     "subtitulo": "Equipamiento",
     "items": [
      {
       "tipo": "punto",
       "texto": "Telurómetro."
      },
      {
       "tipo": "punto",
       "texto": "Electrodo auxiliar de corriente."
      },
      {
       "tipo": "punto",
       "texto": "Electrodo auxiliar de potencial."
      }
     ]
    },
    {
     "subtitulo": "Procedimiento",
     "items": [
      {
       "tipo": "texto",
       "texto": "Desconectar puesta a tierra."
      },
      {
       "tipo": "texto",
       "texto": "Instalar electrodos auxiliares."
      },
      {
       "tipo": "texto",
       "texto": "Medir resistencia."
      },
      {
       "tipo": "texto",
       "texto": "Verificar estabilidad de mediciones."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Electrodos de puesta a tierra (1/2)",
   "bloques": [
    {
     "subtitulo": "Varillas Copperweld",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Núcleo de acero."
      },
      {
       "tipo": "punto",
       "texto": "Recubrimiento cobre."
      },
      {
       "tipo": "encabezado",
       "texto": "Longitudes comunes:"
      },
      {
       "tipo": "punto",
       "texto": "1,5 m"
      },
      {
       "tipo": "punto",
       "texto": "2,4 m"
      },
      {
       "tipo": "punto",
       "texto": "3,0 m"
      }
     ]
    },
    {
     "subtitulo": "Mallas de Tierra",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Utilizadas en:"
      },
      {
       "tipo": "punto",
       "texto": "Subestaciones."
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Plantas fotovoltaicas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Electrodos de puesta a tierra (2/2)",
   "bloques": [
    {
     "subtitulo": "Anillos de Tierra",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Edificios."
      },
      {
       "tipo": "punto",
       "texto": "Hospitales."
      },
      {
       "tipo": "punto",
       "texto": "Centros de datos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Diseño de puesta a tierra",
   "bloques": [
    {
     "subtitulo": "Ejemplo Vivienda",
     "items": [
      {
       "tipo": "dato",
       "texto": "Carga: 15 kW"
      },
      {
       "tipo": "dato",
       "texto": "Sistema: TT"
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Resistencia menor a 10 Ω"
      },
      {
       "tipo": "encabezado",
       "texto": "Solución:"
      },
      {
       "tipo": "punto",
       "texto": "1 varilla Copperweld 5/8\" x 2,4 m."
      },
      {
       "tipo": "punto",
       "texto": "Conductor cobre desnudo 16 mm²."
      }
     ]
    },
    {
     "subtitulo": "Ejemplo Industrial",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia: 250 kVA"
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Resistencia menor a 5 Ω"
      },
      {
       "tipo": "encabezado",
       "texto": "Solución:"
      },
      {
       "tipo": "punto",
       "texto": "Malla de tierra."
      },
      {
       "tipo": "punto",
       "texto": "Varias varillas interconectadas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Protección diferencial",
   "bloques": [
    {
     "subtitulo": "Principio de Funcionamiento",
     "items": [
      {
       "tipo": "texto",
       "texto": "El diferencial compara la corriente que entra y sale del circuito."
      },
      {
       "tipo": "dato",
       "texto": "Si existe diferencia: Desconecta automáticamente."
      }
     ]
    },
    {
     "subtitulo": "10 mA",
     "items": [
      {
       "tipo": "texto",
       "texto": "Protección especial."
      }
     ]
    },
    {
     "subtitulo": "30 mA",
     "items": [
      {
       "tipo": "texto",
       "texto": "Protección de personas."
      }
     ]
    },
    {
     "subtitulo": "300 mA",
     "items": [
      {
       "tipo": "texto",
       "texto": "Protección contra incendios."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Tipos de diferenciales (1/2)",
   "bloques": [
    {
     "subtitulo": "Tipo AC",
     "items": [
      {
       "tipo": "dato",
       "texto": "Detecta: Corriente alterna sinusoidal."
      },
      {
       "tipo": "dato",
       "texto": "Aplicaciones: Cargas convencionales."
      }
     ]
    },
    {
     "subtitulo": "Tipo A",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Detecta:"
      },
      {
       "tipo": "punto",
       "texto": "Corriente alterna."
      },
      {
       "tipo": "punto",
       "texto": "Corriente pulsante."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Computación."
      },
      {
       "tipo": "punto",
       "texto": "Electrónica."
      },
      {
       "tipo": "punto",
       "texto": "Fotovoltaico."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Tipos de diferenciales (2/2)",
   "bloques": [
    {
     "subtitulo": "Tipo B",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Detecta:"
      },
      {
       "tipo": "punto",
       "texto": "Corriente continua."
      },
      {
       "tipo": "punto",
       "texto": "Corriente alterna."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Inversores."
      },
      {
       "tipo": "punto",
       "texto": "Cargadores EV."
      },
      {
       "tipo": "punto",
       "texto": "Industria avanzada."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "DPS (dispositivos de protección contra sobretensiones) (1/2)",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "texto",
       "texto": "Limitar sobretensiones transitorias."
      }
     ]
    },
    {
     "subtitulo": "Causas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Rayos."
      },
      {
       "tipo": "punto",
       "texto": "Maniobras."
      },
      {
       "tipo": "punto",
       "texto": "Fallas de red."
      }
     ]
    },
    {
     "subtitulo": "Tipo 1",
     "items": [
      {
       "tipo": "texto",
       "texto": "Descarga directa."
      }
     ]
    },
    {
     "subtitulo": "Tipo 2",
     "items": [
      {
       "tipo": "texto",
       "texto": "Tableros principales."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "DPS (dispositivos de protección contra sobretensiones) (2/2)",
   "bloques": [
    {
     "subtitulo": "Tipo 3",
     "items": [
      {
       "tipo": "texto",
       "texto": "Equipos sensibles."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Coordinación entre diferenciales y DPS",
   "bloques": [
    {
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección integral: Puesta a tierra. · DPS. · Disyuntor."
      },
      {
       "tipo": "texto",
       "texto": "Diferencial."
      },
      {
       "tipo": "dato",
       "texto": "Secuencia recomendada: Red → DPS → Disyuntor → Diferencial → Carga"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Sistemas fotovoltaicos",
   "bloques": [
    {
     "subtitulo": "Riesgos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Corriente continua."
      },
      {
       "tipo": "punto",
       "texto": "Sobretensiones atmosféricas."
      },
      {
       "tipo": "punto",
       "texto": "Arcos eléctricos."
      }
     ]
    },
    {
     "subtitulo": "Requisitos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Tierra de protección."
      },
      {
       "tipo": "punto",
       "texto": "DPS CC."
      },
      {
       "tipo": "punto",
       "texto": "DPS CA."
      },
      {
       "tipo": "punto",
       "texto": "Diferencial tipo A o B."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Casos reales",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Caso 1: Vivienda con diferencial inexistente."
      },
      {
       "tipo": "dato",
       "texto": "Resultado: Electrocución por falla en lavadora."
      },
      {
       "tipo": "dato",
       "texto": "Lección: Instalar diferencial 30 mA."
      },
      {
       "tipo": "punto",
       "texto": "Caso 2: Industria sin DPS."
      },
      {
       "tipo": "dato",
       "texto": "Resultado: Daño masivo de PLC y variadores."
      },
      {
       "tipo": "dato",
       "texto": "Lección: Implementar protección coordinada."
      },
      {
       "tipo": "punto",
       "texto": "Caso 3: Sistema solar sin tierra."
      },
      {
       "tipo": "dato",
       "texto": "Resultado: Daño de inversor por descarga atmosférica."
      },
      {
       "tipo": "dato",
       "texto": "Lección: Diseñar puesta a tierra específica para sistema FV."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Medición de continuidad de tierra."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Uso de telurómetro."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Método Wenner en terreno."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Medición de resistencia de puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Prueba de diferencial."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Instalación de DPS."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 7: Diseño de puesta a tierra residencial."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 8: Diseño de puesta a tierra fotovoltaica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Taller integrador",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Diseñar la protección completa de una vivienda de 150 m² incluyendo:"
      },
      {
       "tipo": "punto",
       "texto": "Sistema TT."
      },
      {
       "tipo": "punto",
       "texto": "Cálculo de puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Diferencial."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      },
      {
       "tipo": "punto",
       "texto": "Diagrama unilineal."
      },
      {
       "tipo": "punto",
       "texto": "Memoria técnica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante deberá ser capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Identificar tensiones peligrosas."
      },
      {
       "tipo": "punto",
       "texto": "Diferenciar contactos directos e indirectos."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar sistemas TT, TN e IT."
      },
      {
       "tipo": "punto",
       "texto": "Medir resistividad del terreno."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar método Wenner."
      },
      {
       "tipo": "punto",
       "texto": "Medir resistencia de puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar diferenciales."
      },
      {
       "tipo": "punto",
       "texto": "Coordinar DPS y protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar sistemas seguros para viviendas, industrias y plantas fotovoltaicas."
      }
     ]
    }
   ]
  }
 ],
 "mod-5": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 5",
   "titulo": "Tableros eléctricos según RIC 02",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de diseñar, construir, seleccionar, instalar e inspeccionar tableros eléctricos de baja tensión conforme al Decreto Supremo N°8 y RIC 02."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a los tableros eléctricos",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Un tablero eléctrico es el conjunto de equipos destinados a:"
      },
      {
       "tipo": "punto",
       "texto": "Distribuir energía."
      },
      {
       "tipo": "punto",
       "texto": "Proteger circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Comandar cargas."
      },
      {
       "tipo": "punto",
       "texto": "Medir variables eléctricas."
      },
      {
       "tipo": "punto",
       "texto": "Aislar sectores de una instalación."
      },
      {
       "tipo": "texto",
       "texto": "Es el centro de control de cualquier sistema eléctrico."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Clasificación constructiva (1/3)",
   "bloques": [
    {
     "subtitulo": "Cajas",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Tableros pequeños."
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones domiciliarias."
      },
      {
       "tipo": "encabezado",
       "texto": "Montaje:"
      },
      {
       "tipo": "punto",
       "texto": "Embutido."
      },
      {
       "tipo": "punto",
       "texto": "Sobrepuesto."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Clasificación constructiva (2/3)",
   "bloques": [
    {
     "subtitulo": "Gabinetes",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Comercios."
      },
      {
       "tipo": "punto",
       "texto": "Edificios."
      },
      {
       "tipo": "encabezado",
       "texto": "Montaje:"
      },
      {
       "tipo": "punto",
       "texto": "Embutido."
      },
      {
       "tipo": "punto",
       "texto": "Sobrepuesto."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Clasificación constructiva (3/3)",
   "bloques": [
    {
     "subtitulo": "Armarios",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Centros de control."
      },
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Autosoportantes."
      },
      {
       "tipo": "punto",
       "texto": "Anclados al piso."
      },
      {
       "tipo": "punto",
       "texto": "Gran capacidad."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Clasificación según función (1/2)",
   "bloques": [
    {
     "subtitulo": "Tablero General (TG)",
     "items": [
      {
       "tipo": "texto",
       "texto": "Recibe alimentación desde el empalme."
      },
      {
       "tipo": "encabezado",
       "texto": "Funciones:"
      },
      {
       "tipo": "punto",
       "texto": "Protección general."
      },
      {
       "tipo": "punto",
       "texto": "Distribución principal."
      },
      {
       "tipo": "punto",
       "texto": "Maniobra general."
      }
     ]
    },
    {
     "subtitulo": "Tablero General Auxiliar (TGA)",
     "items": [
      {
       "tipo": "texto",
       "texto": "Distribuye energía a sectores específicos."
      }
     ]
    },
    {
     "subtitulo": "Tablero de Distribución (TD)",
     "items": [
      {
       "tipo": "texto",
       "texto": "Distribuye energía a circuitos finales."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Clasificación según función (2/2)",
   "bloques": [
    {
     "subtitulo": "Centro de Control de Motores (CCM)",
     "items": [
      {
       "tipo": "texto",
       "texto": "Controla motores eléctricos."
      }
     ]
    },
    {
     "subtitulo": "Tablero de Transferencia (TT)",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Permite seleccionar:"
      },
      {
       "tipo": "punto",
       "texto": "Red normal."
      },
      {
       "tipo": "punto",
       "texto": "Grupo electrógeno."
      }
     ]
    },
    {
     "subtitulo": "Tableros Fotovoltaicos",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Incorporan:"
      },
      {
       "tipo": "punto",
       "texto": "Protecciones CC."
      },
      {
       "tipo": "punto",
       "texto": "Protecciones CA."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      },
      {
       "tipo": "punto",
       "texto": "Seccionadores."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Corte omnipolar",
   "bloques": [
    {
     "subtitulo": "Concepto",
     "items": [
      {
       "tipo": "texto",
       "texto": "El RIC 02 establece la desconexión simultánea de todos los conductores activos."
      },
      {
       "tipo": "encabezado",
       "texto": "Objetivos:"
      },
      {
       "tipo": "punto",
       "texto": "Seguridad."
      },
      {
       "tipo": "punto",
       "texto": "Mantenimiento."
      },
      {
       "tipo": "punto",
       "texto": "Aislamiento total."
      }
     ]
    },
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Tableros generales."
      },
      {
       "tipo": "punto",
       "texto": "Tableros de distribución."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas fotovoltaicos."
      },
      {
       "tipo": "punto",
       "texto": "Instalaciones industriales."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Protecciones eléctricas (1/3)",
   "bloques": [
    {
     "subtitulo": "Disyuntores Termomagnéticos",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Protegen contra:"
      },
      {
       "tipo": "punto",
       "texto": "Sobrecargas."
      },
      {
       "tipo": "punto",
       "texto": "Cortocircuitos."
      },
      {
       "tipo": "encabezado",
       "texto": "Funciones:"
      },
      {
       "tipo": "dato",
       "texto": "Protección térmica: Sobrecarga."
      },
      {
       "tipo": "dato",
       "texto": "Protección magnética: Cortocircuito."
      }
     ]
    },
    {
     "subtitulo": "Interruptores Diferenciales",
     "items": [
      {
       "tipo": "texto",
       "texto": "Detectan corrientes de fuga hacia tierra."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Protección de personas."
      },
      {
       "tipo": "punto",
       "texto": "Protección contra incendios."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Protecciones eléctricas (2/3)",
   "bloques": [
    {
     "subtitulo": "DPS",
     "items": [
      {
       "tipo": "texto",
       "texto": "Protección contra sobretensiones."
      },
      {
       "tipo": "encabezado",
       "texto": "Tipos:"
      },
      {
       "tipo": "punto",
       "texto": "Tipo 1"
      },
      {
       "tipo": "punto",
       "texto": "Tipo 2"
      },
      {
       "tipo": "punto",
       "texto": "Tipo 3"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Protecciones eléctricas (3/3)",
   "bloques": [
    {
     "subtitulo": "AFDD",
     "items": [
      {
       "tipo": "texto",
       "texto": "Dispositivo detector de fallas de arco."
      },
      {
       "tipo": "encabezado",
       "texto": "Protege contra:"
      },
      {
       "tipo": "punto",
       "texto": "Arcos serie."
      },
      {
       "tipo": "punto",
       "texto": "Arcos paralelos."
      },
      {
       "tipo": "encabezado",
       "texto": "Previene:"
      },
      {
       "tipo": "punto",
       "texto": "Incendios."
      },
      {
       "tipo": "punto",
       "texto": "Sobrecalentamientos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Tipos de diferenciales (1/2)",
   "bloques": [
    {
     "subtitulo": "Tipo AC",
     "items": [
      {
       "tipo": "texto",
       "texto": "Corriente alterna sinusoidal."
      }
     ]
    },
    {
     "subtitulo": "Tipo A",
     "items": [
      {
       "tipo": "texto",
       "texto": "Corriente alterna y pulsante."
      },
      {
       "tipo": "encabezado",
       "texto": "Recomendado para:"
      },
      {
       "tipo": "punto",
       "texto": "Computación."
      },
      {
       "tipo": "punto",
       "texto": "Electrónica."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas fotovoltaicos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Tipos de diferenciales (2/2)",
   "bloques": [
    {
     "subtitulo": "Tipo B",
     "items": [
      {
       "tipo": "texto",
       "texto": "Corriente continua y alterna."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Inversores."
      },
      {
       "tipo": "punto",
       "texto": "Cargadores EV."
      },
      {
       "tipo": "punto",
       "texto": "Variadores."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Identificación y rotulación",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Todo tablero debe disponer de:"
      },
      {
       "tipo": "punto",
       "texto": "Cuadro de circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Identificación de protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Numeración de circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Diagrama unilineal actualizado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Diagramas unilineales",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Representar gráficamente:"
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Circuitos."
      }
     ]
    },
    {
     "subtitulo": "Información mínima",
     "items": [
      {
       "tipo": "punto",
       "texto": "Corriente nominal."
      },
      {
       "tipo": "punto",
       "texto": "Calibre conductores."
      },
      {
       "tipo": "punto",
       "texto": "Potencia instalada."
      },
      {
       "tipo": "punto",
       "texto": "Protección asociada."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Grados de protección IP",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "El índice IP indica el nivel de protección contra ingreso de sólidos y líquidos."
      }
     ]
    },
    {
     "subtitulo": "Requisitos mínimos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Interior: IP41"
      },
      {
       "tipo": "dato",
       "texto": "Exterior bajo techo: IP44"
      },
      {
       "tipo": "dato",
       "texto": "Exterior sin techo: IP54"
      },
      {
       "tipo": "texto",
       "texto": "No se aceptan tableros abiertos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Grado de protección mecánica IK",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Indica resistencia al impacto mecánico."
      },
      {
       "tipo": "dato",
       "texto": "Valor mínimo recomendado: IK07."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Reserva de capacidad",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Las instalaciones nuevas deben considerar ampliaciones futuras."
      },
      {
       "tipo": "encabezado",
       "texto": "Requisito:"
      },
      {
       "tipo": "encabezado",
       "texto": "25% de espacio disponible en:"
      },
      {
       "tipo": "punto",
       "texto": "Riel DIN."
      },
      {
       "tipo": "punto",
       "texto": "Barras."
      },
      {
       "tipo": "punto",
       "texto": "Canaletas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "Instrumentación en tableros",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Tableros mayores a 100 A deben disponer de:"
      },
      {
       "tipo": "punto",
       "texto": "Voltímetro."
      },
      {
       "tipo": "punto",
       "texto": "Amperímetro."
      },
      {
       "tipo": "punto",
       "texto": "Indicadores de presencia de tensión."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Tableros domiciliarios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Circuitos típicos:"
      },
      {
       "tipo": "punto",
       "texto": "Alumbrado."
      },
      {
       "tipo": "punto",
       "texto": "Enchufes generales."
      },
      {
       "tipo": "punto",
       "texto": "Cocina."
      },
      {
       "tipo": "punto",
       "texto": "Lavadora."
      },
      {
       "tipo": "punto",
       "texto": "Aire acondicionado."
      },
      {
       "tipo": "encabezado",
       "texto": "Protecciones:"
      },
      {
       "tipo": "punto",
       "texto": "Disyuntor general."
      },
      {
       "tipo": "punto",
       "texto": "Diferencial 30 mA."
      },
      {
       "tipo": "punto",
       "texto": "Disyuntores por circuito."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Tableros industriales",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Elementos principales:"
      },
      {
       "tipo": "punto",
       "texto": "Interruptor general."
      },
      {
       "tipo": "punto",
       "texto": "Barras de distribución."
      },
      {
       "tipo": "punto",
       "texto": "Contactores."
      },
      {
       "tipo": "punto",
       "texto": "Relés térmicos."
      },
      {
       "tipo": "punto",
       "texto": "Variadores."
      },
      {
       "tipo": "punto",
       "texto": "Instrumentación."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Control de calidad",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Todo tablero debe verificarse antes de energizar."
      },
      {
       "tipo": "encabezado",
       "texto": "Verificaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Apriete de terminales."
      },
      {
       "tipo": "punto",
       "texto": "Continuidad."
      },
      {
       "tipo": "punto",
       "texto": "Aislación."
      },
      {
       "tipo": "punto",
       "texto": "Rotulación."
      },
      {
       "tipo": "punto",
       "texto": "Operación de protecciones."
      },
      {
       "tipo": "texto",
       "texto": "Para tableros superiores a 100 A se requieren verificaciones específicas según RIC 02 e IEC 61439."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Caso práctico",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Diseño de tablero residencial."
      },
      {
       "tipo": "dato",
       "texto": "Carga total: 12 kW"
      },
      {
       "tipo": "dato",
       "texto": "Alimentación: 220 V"
      },
      {
       "tipo": "encabezado",
       "texto": "Circuitos:"
      },
      {
       "tipo": "punto",
       "texto": "Alumbrado."
      },
      {
       "tipo": "punto",
       "texto": "Enchufes."
      },
      {
       "tipo": "punto",
       "texto": "Cocina."
      },
      {
       "tipo": "punto",
       "texto": "Lavadora."
      },
      {
       "tipo": "punto",
       "texto": "Aire acondicionado."
      },
      {
       "tipo": "encabezado",
       "texto": "Seleccionar:"
      },
      {
       "tipo": "punto",
       "texto": "Alimentador."
      },
      {
       "tipo": "punto",
       "texto": "Disyuntor general."
      },
      {
       "tipo": "punto",
       "texto": "Diferencial."
      },
      {
       "tipo": "punto",
       "texto": "Disyuntores derivados."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Identificación de componentes de tablero."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Montaje de tablero domiciliario."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Cableado sobre riel DIN."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Instalación de diferencial."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Instalación de DPS."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Diseño de tablero fotovoltaico."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 7: Verificación de tablero según RIC 02."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 8: Prueba funcional completa."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante será capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Diseñar tableros eléctricos."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar RIC 02."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar corte omnipolar."
      },
      {
       "tipo": "punto",
       "texto": "Implementar diferenciales y DPS."
      },
      {
       "tipo": "punto",
       "texto": "Interpretar grados IP e IK."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar diagramas unilineales."
      },
      {
       "tipo": "punto",
       "texto": "Verificar tableros conforme a normativa SEC."
      }
     ]
    }
   ]
  }
 ],
 "mod-6": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 6",
   "titulo": "Empalmes y alimentadores",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de diseñar, dimensionar e instalar empalmes y alimentadores eléctricos de baja tensión conforme al Decreto Supremo N°8, RIC 01 y RIC 03, considerando criterios técnicos, normativos y de seguridad."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a los empalmes eléctricos",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "El empalme es el conjunto de equipos eléctricos destinados a conectar una instalación de consumo a la red pública de distribución."
      },
      {
       "tipo": "encabezado",
       "texto": "Constituye el límite técnico y administrativo entre:"
      },
      {
       "tipo": "punto",
       "texto": "Empresa distribuidora."
      },
      {
       "tipo": "punto",
       "texto": "Cliente final."
      }
     ]
    },
    {
     "subtitulo": "Componentes principales",
     "items": [
      {
       "tipo": "punto",
       "texto": "Acometida."
      },
      {
       "tipo": "punto",
       "texto": "Caja de empalme."
      },
      {
       "tipo": "punto",
       "texto": "Equipo de medida."
      },
      {
       "tipo": "punto",
       "texto": "Protección general."
      },
      {
       "tipo": "punto",
       "texto": "Alimentador principal."
      },
      {
       "tipo": "punto",
       "texto": "Sistema de puesta a tierra."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Clasificación de empalmes (1/2)",
   "bloques": [
    {
     "subtitulo": "Empalme Monofásico",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "1 fase + neutro."
      },
      {
       "tipo": "punto",
       "texto": "220 V."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Viviendas."
      },
      {
       "tipo": "punto",
       "texto": "Pequeños comercios."
      },
      {
       "tipo": "punto",
       "texto": "Oficinas."
      },
      {
       "tipo": "dato",
       "texto": "Potencia típica: Hasta 10 kW."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Clasificación de empalmes (2/2)",
   "bloques": [
    {
     "subtitulo": "Empalme Trifásico",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "3 fases + neutro."
      },
      {
       "tipo": "punto",
       "texto": "380/220 V."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Industrias."
      },
      {
       "tipo": "punto",
       "texto": "Talleres."
      },
      {
       "tipo": "punto",
       "texto": "Edificios."
      },
      {
       "tipo": "punto",
       "texto": "Centros comerciales."
      },
      {
       "tipo": "dato",
       "texto": "Potencias: Superiores a 10 kW."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Acometidas (1/2)",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Conjunto de conductores que unen la red pública con el punto de empalme."
      }
     ]
    },
    {
     "subtitulo": "Acometida Aérea",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Menor costo."
      },
      {
       "tipo": "punto",
       "texto": "Fácil instalación."
      },
      {
       "tipo": "encabezado",
       "texto": "Desventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Exposición climática."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Acometidas (2/2)",
   "bloques": [
    {
     "subtitulo": "Acometida Subterránea",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Mayor seguridad."
      },
      {
       "tipo": "punto",
       "texto": "Mejor estética."
      },
      {
       "tipo": "encabezado",
       "texto": "Desventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Mayor costo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Centros de medición",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "texto",
       "texto": "Registrar la energía consumida por el usuario."
      }
     ]
    },
    {
     "subtitulo": "Componentes",
     "items": [
      {
       "tipo": "punto",
       "texto": "Medidor."
      },
      {
       "tipo": "punto",
       "texto": "Base de medidor."
      },
      {
       "tipo": "punto",
       "texto": "Protección general."
      },
      {
       "tipo": "punto",
       "texto": "Caja de protección."
      }
     ]
    },
    {
     "subtitulo": "Requisitos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Acceso para distribuidora."
      },
      {
       "tipo": "punto",
       "texto": "Protección mecánica."
      },
      {
       "tipo": "punto",
       "texto": "Identificación visible."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Cajas de empalme",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "texto",
       "texto": "Proteger equipos de medición y maniobra."
      }
     ]
    },
    {
     "subtitulo": "Características",
     "items": [
      {
       "tipo": "punto",
       "texto": "Material autoextinguente."
      },
      {
       "tipo": "punto",
       "texto": "Protección IP adecuada."
      },
      {
       "tipo": "punto",
       "texto": "Resistencia mecánica."
      },
      {
       "tipo": "punto",
       "texto": "Acceso controlado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Alimentadores",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "dato",
       "texto": "Conductores que unen: Empalme → Tablero General"
      }
     ]
    },
    {
     "subtitulo": "Funciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Transportar energía."
      },
      {
       "tipo": "punto",
       "texto": "Limitar pérdidas."
      },
      {
       "tipo": "punto",
       "texto": "Garantizar continuidad operacional."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Criterios de dimensionamiento",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El conductor debe seleccionarse considerando:"
      },
      {
       "tipo": "punto",
       "texto": "Corriente de carga."
      },
      {
       "tipo": "punto",
       "texto": "Caída de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Temperatura ambiente."
      },
      {
       "tipo": "punto",
       "texto": "Agrupamiento."
      },
      {
       "tipo": "punto",
       "texto": "Corriente de cortocircuito."
      }
     ]
    },
    {
     "subtitulo": "Método General",
     "items": [
      {
       "tipo": "punto",
       "texto": "Paso 1: Determinar potencia instalada."
      },
      {
       "tipo": "punto",
       "texto": "Paso 2: Determinar demanda máxima."
      },
      {
       "tipo": "punto",
       "texto": "Paso 3: Calcular corriente."
      },
      {
       "tipo": "punto",
       "texto": "Paso 4: Seleccionar conductor."
      },
      {
       "tipo": "punto",
       "texto": "Paso 5: Verificar caída de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Paso 6: Seleccionar protección."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Cálculo de demanda máxima",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Máxima potencia probable utilizada simultáneamente."
      }
     ]
    },
    {
     "subtitulo": "Conceptos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia Instalada: Suma total de cargas conectadas."
      },
      {
       "tipo": "dato",
       "texto": "Demanda Máxima: Potencia efectivamente utilizada."
      },
      {
       "tipo": "dato",
       "texto": "Factor de Demanda: Relación entre ambas."
      }
     ]
    },
    {
     "subtitulo": "Fórmula",
     "items": [
      {
       "tipo": "formula",
       "texto": "Demanda = Potencia Instalada × Factor de Demanda"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Ejemplo resuelto",
   "bloques": [
    {
     "subtitulo": "Vivienda",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia instalada: 12 kW"
      },
      {
       "tipo": "dato",
       "texto": "Factor de demanda: 0,75"
      }
     ]
    },
    {
     "subtitulo": "12 x 0,75",
     "items": [
      {
       "tipo": "formula",
       "texto": "Demanda = 9 kW"
      }
     ]
    },
    {
     "subtitulo": "Corriente",
     "items": [
      {
       "tipo": "formula",
       "texto": "I = P / V"
      },
      {
       "tipo": "formula",
       "texto": "I = 9000 / 220"
      },
      {
       "tipo": "formula",
       "texto": "I = 40,9 A"
      }
     ]
    },
    {
     "subtitulo": "Selección",
     "items": [
      {
       "tipo": "dato",
       "texto": "Conductor Cu: 10 mm²"
      },
      {
       "tipo": "dato",
       "texto": "Protección: 50 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Protecciones generales (1/2)",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Proteger:"
      },
      {
       "tipo": "punto",
       "texto": "Alimentador."
      },
      {
       "tipo": "punto",
       "texto": "Instalación."
      },
      {
       "tipo": "punto",
       "texto": "Personas."
      }
     ]
    },
    {
     "subtitulo": "Disyuntor General",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Protección:"
      },
      {
       "tipo": "punto",
       "texto": "Sobrecarga."
      },
      {
       "tipo": "punto",
       "texto": "Cortocircuito."
      }
     ]
    },
    {
     "subtitulo": "Diferencial General",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Protección:"
      },
      {
       "tipo": "punto",
       "texto": "Fugas a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Contactos indirectos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Protecciones generales (2/2)",
   "bloques": [
    {
     "subtitulo": "DPS",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Protección:"
      },
      {
       "tipo": "punto",
       "texto": "Sobretensiones."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Empalmes domiciliarios",
   "bloques": [
    {
     "subtitulo": "Caso Tipo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Vivienda: 150 m²"
      },
      {
       "tipo": "dato",
       "texto": "Potencia: 10 kW"
      },
      {
       "tipo": "dato",
       "texto": "Sistema: Monofásico"
      }
     ]
    },
    {
     "subtitulo": "Empalme monofásico 220 V",
     "items": [
      {
       "tipo": "dato",
       "texto": "Alimentador: 10 mm² Cu"
      },
      {
       "tipo": "dato",
       "texto": "Disyuntor General: 50 A"
      },
      {
       "tipo": "dato",
       "texto": "Diferencial: 40 A – 30 mA"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "Empalmes comerciales",
   "bloques": [
    {
     "subtitulo": "Local Comercial",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia: 25 kW"
      },
      {
       "tipo": "dato",
       "texto": "Sistema: Trifásico"
      }
     ]
    },
    {
     "subtitulo": "Empalme trifásico",
     "items": [
      {
       "tipo": "dato",
       "texto": "Alimentador: 16 mm² Cu"
      },
      {
       "tipo": "dato",
       "texto": "Protección: 63 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Empalmes para edificios",
   "bloques": [
    {
     "subtitulo": "Características",
     "items": [
      {
       "tipo": "punto",
       "texto": "Medidores múltiples."
      },
      {
       "tipo": "punto",
       "texto": "Tablero general."
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores verticales."
      },
      {
       "tipo": "punto",
       "texto": "Puesta a tierra común."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Declaración TE1 (1/2)",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Documento mediante el cual se declara una instalación eléctrica ante SEC."
      }
     ]
    },
    {
     "subtitulo": "Objetivos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Certificar cumplimiento normativo."
      },
      {
       "tipo": "punto",
       "texto": "Registrar instalación."
      },
      {
       "tipo": "punto",
       "texto": "Autorizar energización."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Declaración TE1 (2/2)",
   "bloques": [
    {
     "subtitulo": "Información requerida",
     "items": [
      {
       "tipo": "punto",
       "texto": "Datos propietario."
      },
      {
       "tipo": "punto",
       "texto": "Datos instalador."
      },
      {
       "tipo": "punto",
       "texto": "Potencia instalada."
      },
      {
       "tipo": "punto",
       "texto": "Tipo de instalación."
      },
      {
       "tipo": "punto",
       "texto": "Planos."
      },
      {
       "tipo": "punto",
       "texto": "Memoria técnica."
      }
     ]
    },
    {
     "subtitulo": "Responsabilidad",
     "items": [
      {
       "tipo": "texto",
       "texto": "La declaración TE1 es responsabilidad del instalador autorizado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Errores frecuentes",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Alimentadores subdimensionados."
      },
      {
       "tipo": "punto",
       "texto": "Caídas de tensión excesivas."
      },
      {
       "tipo": "punto",
       "texto": "Protección mal seleccionada."
      },
      {
       "tipo": "punto",
       "texto": "Falta de diferencial."
      },
      {
       "tipo": "punto",
       "texto": "Falta de puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Empalmes no normalizados."
      },
      {
       "tipo": "punto",
       "texto": "Documentación incompleta."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Identificación de componentes de empalme."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Montaje de centro de medición."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Dimensionamiento de alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Selección de protecciones generales."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Diseño de empalme domiciliario."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Diseño de empalme trifásico."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 7: Simulación de declaración TE1."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 8: Verificación normativa de proyecto."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Taller integrador",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Diseñar el empalme completo para una vivienda de 180 m²."
      },
      {
       "tipo": "encabezado",
       "texto": "Entregar:"
      },
      {
       "tipo": "punto",
       "texto": "Cuadro de cargas."
      },
      {
       "tipo": "punto",
       "texto": "Demanda máxima."
      },
      {
       "tipo": "punto",
       "texto": "Corriente total."
      },
      {
       "tipo": "punto",
       "texto": "Alimentador."
      },
      {
       "tipo": "punto",
       "texto": "Protección general."
      },
      {
       "tipo": "punto",
       "texto": "Centro de medición."
      },
      {
       "tipo": "punto",
       "texto": "Diagrama unilineal."
      },
      {
       "tipo": "punto",
       "texto": "Memoria técnica."
      },
      {
       "tipo": "punto",
       "texto": "Formulario TE1 simulado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante será capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Identificar tipos de empalmes."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar acometidas."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar centros de medición."
      },
      {
       "tipo": "punto",
       "texto": "Calcular demanda máxima."
      },
      {
       "tipo": "punto",
       "texto": "Dimensionar alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar protecciones generales."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar documentación TE1."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar instalaciones conforme a RIC 01 y RIC 03."
      }
     ]
    }
   ]
  }
 ],
 "mod-7": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 7",
   "titulo": "Instalaciones eléctricas domiciliarias",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de diseñar, calcular, ejecutar y verificar instalaciones eléctricas residenciales de baja tensión conforme al Decreto Supremo N°8 y RIC 10, aplicando criterios de seguridad, eficiencia energética y buenas prácticas de ingeniería."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a las instalaciones domiciliarias",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Una instalación eléctrica domiciliaria corresponde al conjunto de conductores, canalizaciones, protecciones, tableros y equipos destinados a suministrar energía eléctrica a una vivienda."
      },
      {
       "tipo": "encabezado",
       "texto": "Su diseño debe garantizar:"
      },
      {
       "tipo": "punto",
       "texto": "Seguridad de las personas."
      },
      {
       "tipo": "punto",
       "texto": "Protección de bienes."
      },
      {
       "tipo": "punto",
       "texto": "Continuidad de servicio."
      },
      {
       "tipo": "punto",
       "texto": "Facilidad de mantenimiento."
      },
      {
       "tipo": "punto",
       "texto": "Posibilidad de ampliaciones futuras."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Normativa aplicable",
   "bloques": [
    {
     "subtitulo": "Reglamentos Principales",
     "items": [
      {
       "tipo": "punto",
       "texto": "Decreto Supremo N°8."
      },
      {
       "tipo": "punto",
       "texto": "RIC 01 Empalmes."
      },
      {
       "tipo": "punto",
       "texto": "RIC 02 Tableros."
      },
      {
       "tipo": "punto",
       "texto": "RIC 03 Alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "RIC 04 Conductores."
      },
      {
       "tipo": "punto",
       "texto": "RIC 05 Protección contra Tensiones Peligrosas."
      },
      {
       "tipo": "punto",
       "texto": "RIC 06 Puesta a Tierra."
      },
      {
       "tipo": "punto",
       "texto": "RIC 10 Instalaciones de Uso General."
      },
      {
       "tipo": "punto",
       "texto": "RIC 18 Presentación de Proyectos."
      },
      {
       "tipo": "punto",
       "texto": "RIC 19 Puesta en Servicio."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Etapas del diseño eléctrico",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Paso 1: Levantamiento arquitectónico."
      },
      {
       "tipo": "punto",
       "texto": "Paso 2: Determinación de cargas."
      },
      {
       "tipo": "punto",
       "texto": "Paso 3: Definición de circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Paso 4: Dimensionamiento de conductores."
      },
      {
       "tipo": "punto",
       "texto": "Paso 5: Selección de protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Paso 6: Diseño del tablero."
      },
      {
       "tipo": "punto",
       "texto": "Paso 7: Diseño de puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Paso 8: Elaboración de planos."
      },
      {
       "tipo": "punto",
       "texto": "Paso 9: Memoria de cálculo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Circuitos de alumbrado",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Alimentar:"
      },
      {
       "tipo": "punto",
       "texto": "Luminarias."
      },
      {
       "tipo": "punto",
       "texto": "Apliqués."
      },
      {
       "tipo": "punto",
       "texto": "Iluminación exterior."
      }
     ]
    },
    {
     "subtitulo": "Características",
     "items": [
      {
       "tipo": "dato",
       "texto": "Voltaje: 220 V"
      },
      {
       "tipo": "dato",
       "texto": "Conductores: 1,5 mm² Cu"
      },
      {
       "tipo": "dato",
       "texto": "Protección: 10 A o 16 A"
      }
     ]
    },
    {
     "subtitulo": "Criterios de Diseño",
     "items": [
      {
       "tipo": "punto",
       "texto": "Distribución uniforme."
      },
      {
       "tipo": "punto",
       "texto": "Sectorización."
      },
      {
       "tipo": "punto",
       "texto": "Facilidad de mantenimiento."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Circuitos de enchufes",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Alimentar:"
      },
      {
       "tipo": "punto",
       "texto": "Equipos domésticos."
      },
      {
       "tipo": "punto",
       "texto": "Artefactos eléctricos."
      },
      {
       "tipo": "punto",
       "texto": "Equipos electrónicos."
      }
     ]
    },
    {
     "subtitulo": "Recomendaciones",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Separar:"
      },
      {
       "tipo": "punto",
       "texto": "Cocina."
      },
      {
       "tipo": "punto",
       "texto": "Dormitorios."
      },
      {
       "tipo": "punto",
       "texto": "Living."
      },
      {
       "tipo": "punto",
       "texto": "Exterior."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Circuitos especiales (1/2)",
   "bloques": [
    {
     "subtitulo": "Cocina Eléctrica",
     "items": [
      {
       "tipo": "texto",
       "texto": "Circuito exclusivo."
      },
      {
       "tipo": "dato",
       "texto": "Conductores: 6 mm²"
      },
      {
       "tipo": "dato",
       "texto": "Protección: 32 A"
      }
     ]
    },
    {
     "subtitulo": "Horno Eléctrico",
     "items": [
      {
       "tipo": "texto",
       "texto": "Circuito exclusivo."
      }
     ]
    },
    {
     "subtitulo": "Aire Acondicionado",
     "items": [
      {
       "tipo": "texto",
       "texto": "Circuito exclusivo."
      }
     ]
    },
    {
     "subtitulo": "Termo Eléctrico",
     "items": [
      {
       "tipo": "texto",
       "texto": "Circuito exclusivo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Circuitos especiales (2/2)",
   "bloques": [
    {
     "subtitulo": "Cargador Vehículo Eléctrico",
     "items": [
      {
       "tipo": "texto",
       "texto": "Circuito dedicado."
      },
      {
       "tipo": "texto",
       "texto": "Protección diferencial tipo A o B."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Cuadro de cargas",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Determinar:"
      },
      {
       "tipo": "punto",
       "texto": "Potencia instalada."
      },
      {
       "tipo": "punto",
       "texto": "Corriente."
      },
      {
       "tipo": "punto",
       "texto": "Demanda máxima."
      }
     ]
    },
    {
     "subtitulo": "Aire acondicionado\t2500 W",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia Total: 14.200 W"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Balance de cargas",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Distribuir cargas uniformemente."
      },
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Menor caída de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Menor calentamiento."
      },
      {
       "tipo": "punto",
       "texto": "Mejor rendimiento."
      }
     ]
    },
    {
     "subtitulo": "Sistemas Monofásicos",
     "items": [
      {
       "tipo": "texto",
       "texto": "Balance simplificado."
      }
     ]
    },
    {
     "subtitulo": "Sistemas Trifásicos",
     "items": [
      {
       "tipo": "texto",
       "texto": "Distribución equilibrada entre fases."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Tablero domiciliario (1/2)",
   "bloques": [
    {
     "subtitulo": "Componentes",
     "items": [
      {
       "tipo": "punto",
       "texto": "Disyuntor general."
      },
      {
       "tipo": "punto",
       "texto": "Diferencial 30 mA."
      },
      {
       "tipo": "punto",
       "texto": "Disyuntores derivados."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      },
      {
       "tipo": "punto",
       "texto": "Barras de neutro."
      },
      {
       "tipo": "punto",
       "texto": "Barras de tierra."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Tablero domiciliario (2/2)",
   "bloques": [
    {
     "subtitulo": "Ejemplo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Disyuntor General: 50 A"
      },
      {
       "tipo": "dato",
       "texto": "Diferencial: 40 A – 30 mA"
      },
      {
       "tipo": "encabezado",
       "texto": "Circuitos:"
      },
      {
       "tipo": "punto",
       "texto": "Alumbrado."
      },
      {
       "tipo": "punto",
       "texto": "Enchufes."
      },
      {
       "tipo": "punto",
       "texto": "Cocina."
      },
      {
       "tipo": "punto",
       "texto": "Aire acondicionado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Canalizaciones",
   "bloques": [
    {
     "subtitulo": "Opciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "PVC Conduit."
      },
      {
       "tipo": "punto",
       "texto": "EMT."
      },
      {
       "tipo": "punto",
       "texto": "Canaletas."
      }
     ]
    },
    {
     "subtitulo": "Recomendaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Minimizar curvas."
      },
      {
       "tipo": "punto",
       "texto": "Facilitar mantenimiento."
      },
      {
       "tipo": "punto",
       "texto": "Considerar futuras ampliaciones."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Puesta a tierra residencial",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Proteger personas y equipos."
      }
     ]
    },
    {
     "subtitulo": "Solución Típica",
     "items": [
      {
       "tipo": "dato",
       "texto": "Varilla Copperweld: 5/8\" x 2,4 m"
      },
      {
       "tipo": "dato",
       "texto": "Conductor: 16 mm² cobre desnudo."
      }
     ]
    },
    {
     "subtitulo": "Resistencia Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Menor a 10 Ω."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "Memoria de cálculo",
   "bloques": [
    {
     "subtitulo": "Contenido",
     "items": [
      {
       "tipo": "texto",
       "texto": "Descripción del proyecto."
      },
      {
       "tipo": "texto",
       "texto": "Normativa aplicable."
      },
      {
       "tipo": "texto",
       "texto": "Cuadro de cargas."
      },
      {
       "tipo": "texto",
       "texto": "Demanda máxima."
      },
      {
       "tipo": "texto",
       "texto": "Cálculo de alimentadores."
      },
      {
       "tipo": "texto",
       "texto": "Protecciones."
      },
      {
       "tipo": "texto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "texto",
       "texto": "Verificación normativa."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Plano eléctrico",
   "bloques": [
    {
     "subtitulo": "Información mínima",
     "items": [
      {
       "tipo": "punto",
       "texto": "Luminarias."
      },
      {
       "tipo": "punto",
       "texto": "Interruptores."
      },
      {
       "tipo": "punto",
       "texto": "Enchufes."
      },
      {
       "tipo": "punto",
       "texto": "Tablero."
      },
      {
       "tipo": "punto",
       "texto": "Canalizaciones."
      },
      {
       "tipo": "punto",
       "texto": "Circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Tierra de protección."
      }
     ]
    },
    {
     "subtitulo": "TG Tablero General",
     "items": [
      {
       "tipo": "texto",
       "texto": "TP Tierra de Protección"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Proyecto integrador",
   "bloques": [
    {
     "subtitulo": "Vivienda Unifamiliar",
     "items": [
      {
       "tipo": "dato",
       "texto": "Superficie: 150 m²"
      },
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Living-comedor."
      },
      {
       "tipo": "punto",
       "texto": "Cocina."
      },
      {
       "tipo": "punto",
       "texto": "Lavandería."
      },
      {
       "tipo": "punto",
       "texto": "3 dormitorios."
      },
      {
       "tipo": "punto",
       "texto": "2 baños."
      },
      {
       "tipo": "punto",
       "texto": "Terraza."
      },
      {
       "tipo": "punto",
       "texto": "Estacionamiento."
      },
      {
       "tipo": "punto",
       "texto": "Paso 1: Determinar cargas."
      },
      {
       "tipo": "punto",
       "texto": "Paso 2: Diseñar circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Paso 3: Seleccionar protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Paso 4: Diseñar tablero."
      },
      {
       "tipo": "punto",
       "texto": "Paso 5: Dimensionar alimentador."
      },
      {
       "tipo": "punto",
       "texto": "Paso 6: Diseñar puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Paso 7: Elaborar plano."
      },
      {
       "tipo": "punto",
       "texto": "Paso 8: Generar memoria de cálculo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Caso práctico resuelto",
   "bloques": [
    {
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia instalada: 15 kW"
      },
      {
       "tipo": "dato",
       "texto": "Voltaje: 220 V"
      },
      {
       "tipo": "dato",
       "texto": "Corriente: 68 A"
      },
      {
       "tipo": "dato",
       "texto": "Demanda máxima: 45 A"
      },
      {
       "tipo": "encabezado",
       "texto": "Solución:"
      },
      {
       "tipo": "dato",
       "texto": "Alimentador: 16 mm² Cu"
      },
      {
       "tipo": "dato",
       "texto": "Protección General: 63 A"
      },
      {
       "tipo": "dato",
       "texto": "Diferencial: 63 A – 30 mA"
      },
      {
       "tipo": "dato",
       "texto": "Puesta a Tierra: Varilla Copperweld 2,4 m"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Diseño de circuito de alumbrado."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Diseño de circuito de enchufes."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Dimensionamiento de conductores."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Diseño de tablero domiciliario."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Diseño de puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Plano eléctrico en AutoCAD."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 7: Memoria de cálculo."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 8: Proyecto completo de vivienda."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante será capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Diseñar instalaciones domiciliarias."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar cuadros de carga."
      },
      {
       "tipo": "punto",
       "texto": "Balancear circuitos."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar tableros."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar planos eléctricos."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar memorias de cálculo."
      },
      {
       "tipo": "punto",
       "texto": "Desarrollar proyectos reales conforme a normativa SEC."
      }
     ]
    }
   ]
  }
 ],
 "mod-8": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 8",
   "titulo": "Instalaciones eléctricas industriales",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de diseñar, instalar, operar y mantener sistemas eléctricos industriales, seleccionando motores, protecciones, sistemas de control y alimentadores conforme a la normativa vigente y las buenas prácticas de ingeniería."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a las instalaciones industriales",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Las instalaciones eléctricas industriales son sistemas destinados a alimentar, proteger y controlar equipos productivos de alta potencia."
      },
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Potencias elevadas."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas trifásicos."
      },
      {
       "tipo": "punto",
       "texto": "Motores eléctricos."
      },
      {
       "tipo": "punto",
       "texto": "Automatización."
      },
      {
       "tipo": "punto",
       "texto": "Continuidad operacional."
      },
      {
       "tipo": "punto",
       "texto": "Altos niveles de seguridad."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Motores eléctricos (1/3)",
   "bloques": [
    {
     "subtitulo": "Concepto",
     "items": [
      {
       "tipo": "texto",
       "texto": "Un motor eléctrico transforma energía eléctrica en energía mecánica."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Bombas."
      },
      {
       "tipo": "punto",
       "texto": "Ventiladores."
      },
      {
       "tipo": "punto",
       "texto": "Correas transportadoras."
      },
      {
       "tipo": "punto",
       "texto": "Compresores."
      },
      {
       "tipo": "punto",
       "texto": "Maquinaria industrial."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Motores eléctricos (2/3)",
   "bloques": [
    {
     "subtitulo": "Motores Monofásicos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Alimentación: 220 V"
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Talleres."
      },
      {
       "tipo": "punto",
       "texto": "Equipos pequeños."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas domésticos."
      },
      {
       "tipo": "dato",
       "texto": "Potencias típicas: 0,25 HP a 5 HP"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Motores eléctricos (3/3)",
   "bloques": [
    {
     "subtitulo": "Motores Trifásicos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Alimentación: 380 V"
      },
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Mayor rendimiento."
      },
      {
       "tipo": "punto",
       "texto": "Menor corriente."
      },
      {
       "tipo": "punto",
       "texto": "Mayor potencia."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicaciones:"
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Minería."
      },
      {
       "tipo": "punto",
       "texto": "Procesos continuos."
      },
      {
       "tipo": "dato",
       "texto": "Potencias: 1 HP hasta miles de HP."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Corriente de partida",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Es la corriente absorbida por el motor al iniciar su funcionamiento."
      },
      {
       "tipo": "dato",
       "texto": "Puede alcanzar: 5 a 8 veces la corriente nominal."
      }
     ]
    },
    {
     "subtitulo": "Ejemplo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Motor: 15 HP"
      },
      {
       "tipo": "dato",
       "texto": "Corriente nominal: 22 A"
      },
      {
       "tipo": "dato",
       "texto": "Corriente de partida: 22 × 6"
      }
     ]
    },
    {
     "subtitulo": "Problemas Asociados",
     "items": [
      {
       "tipo": "punto",
       "texto": "Caídas de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Disparo de protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Sobrecarga mecánica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Contactores (1/2)",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Dispositivo electromagnético utilizado para maniobrar cargas eléctricas."
      },
      {
       "tipo": "encabezado",
       "texto": "Funciones:"
      },
      {
       "tipo": "punto",
       "texto": "Encendido."
      },
      {
       "tipo": "punto",
       "texto": "Apagado."
      },
      {
       "tipo": "punto",
       "texto": "Automatización."
      }
     ]
    },
    {
     "subtitulo": "Componentes",
     "items": [
      {
       "tipo": "punto",
       "texto": "Bobina."
      },
      {
       "tipo": "punto",
       "texto": "Contactos principales."
      },
      {
       "tipo": "punto",
       "texto": "Contactos auxiliares."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Contactores (2/2)",
   "bloques": [
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Motores."
      },
      {
       "tipo": "punto",
       "texto": "Bombas."
      },
      {
       "tipo": "punto",
       "texto": "Iluminación industrial."
      },
      {
       "tipo": "punto",
       "texto": "Automatización."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Relés térmicos",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "texto",
       "texto": "Proteger motores contra sobrecargas prolongadas."
      }
     ]
    },
    {
     "subtitulo": "Principio de Operación",
     "items": [
      {
       "tipo": "texto",
       "texto": "Utilizan láminas bimetálicas que se deforman por efecto térmico."
      }
     ]
    },
    {
     "subtitulo": "Ajuste",
     "items": [
      {
       "tipo": "texto",
       "texto": "Debe calibrarse a la corriente nominal del motor."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Guardamotores",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Protección compacta diseñada específicamente para motores."
      },
      {
       "tipo": "encabezado",
       "texto": "Protege contra:"
      },
      {
       "tipo": "punto",
       "texto": "Sobrecarga."
      },
      {
       "tipo": "punto",
       "texto": "Cortocircuito."
      },
      {
       "tipo": "punto",
       "texto": "Pérdida de fase."
      }
     ]
    },
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Fácil instalación."
      },
      {
       "tipo": "punto",
       "texto": "Alta confiabilidad."
      },
      {
       "tipo": "punto",
       "texto": "Ajuste regulable."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Partida directa",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Método más simple para arrancar motores."
      },
      {
       "tipo": "texto",
       "texto": "El motor recibe tensión plena instantáneamente."
      }
     ]
    },
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Bajo costo."
      },
      {
       "tipo": "punto",
       "texto": "Fácil implementación."
      }
     ]
    },
    {
     "subtitulo": "Desventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Alta corriente de partida."
      }
     ]
    },
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "texto",
       "texto": "Motores pequeños."
      },
      {
       "tipo": "texto",
       "texto": "Hasta 7,5 HP aproximadamente."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Partida estrella – triángulo",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Reducir corriente de partida."
      }
     ]
    },
    {
     "subtitulo": "Funcionamiento",
     "items": [
      {
       "tipo": "dato",
       "texto": "Primera etapa: Conexión estrella."
      },
      {
       "tipo": "dato",
       "texto": "Segunda etapa: Conexión triángulo."
      }
     ]
    },
    {
     "subtitulo": "Ventaja",
     "items": [
      {
       "tipo": "dato",
       "texto": "Corriente aproximada: 1/3 de la partida directa."
      }
     ]
    },
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "texto",
       "texto": "Motores medianos."
      },
      {
       "tipo": "texto",
       "texto": "15 HP a 100 HP."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Partida suave",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Equipo electrónico que controla gradualmente la tensión aplicada al motor."
      }
     ]
    },
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Menor corriente."
      },
      {
       "tipo": "punto",
       "texto": "Menor esfuerzo mecánico."
      },
      {
       "tipo": "punto",
       "texto": "Mayor vida útil."
      }
     ]
    },
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Bombas."
      },
      {
       "tipo": "punto",
       "texto": "Compresores."
      },
      {
       "tipo": "punto",
       "texto": "Ventiladores."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Variadores de frecuencia (VFD) (1/2)",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Equipo electrónico que permite controlar:"
      },
      {
       "tipo": "punto",
       "texto": "Velocidad."
      },
      {
       "tipo": "punto",
       "texto": "Torque."
      },
      {
       "tipo": "punto",
       "texto": "Sentido de giro."
      }
     ]
    },
    {
     "subtitulo": "Principio",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Modifica:"
      },
      {
       "tipo": "punto",
       "texto": "Frecuencia."
      },
      {
       "tipo": "punto",
       "texto": "Voltaje."
      }
     ]
    },
    {
     "subtitulo": "Beneficios",
     "items": [
      {
       "tipo": "punto",
       "texto": "Ahorro energético."
      },
      {
       "tipo": "punto",
       "texto": "Control preciso."
      },
      {
       "tipo": "punto",
       "texto": "Menor desgaste."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Variadores de frecuencia (VFD) (2/2)",
   "bloques": [
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Bombeo."
      },
      {
       "tipo": "punto",
       "texto": "HVAC."
      },
      {
       "tipo": "punto",
       "texto": "Cintas transportadoras."
      },
      {
       "tipo": "punto",
       "texto": "Minería."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Centro de control de motores (CCM) (1/2)",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Conjunto de tableros destinados al control y protección de motores."
      }
     ]
    },
    {
     "subtitulo": "Componentes",
     "items": [
      {
       "tipo": "punto",
       "texto": "Interruptor general."
      },
      {
       "tipo": "punto",
       "texto": "Barras de distribución."
      },
      {
       "tipo": "punto",
       "texto": "Guardamotores."
      },
      {
       "tipo": "punto",
       "texto": "Contactores."
      },
      {
       "tipo": "punto",
       "texto": "Relés térmicos."
      },
      {
       "tipo": "punto",
       "texto": "Variadores."
      },
      {
       "tipo": "punto",
       "texto": "Instrumentación."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Centro de control de motores (CCM) (2/2)",
   "bloques": [
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Organización."
      },
      {
       "tipo": "punto",
       "texto": "Seguridad."
      },
      {
       "tipo": "punto",
       "texto": "Mantenimiento simplificado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "Tableros industriales",
   "bloques": [
    {
     "subtitulo": "Características",
     "items": [
      {
       "tipo": "punto",
       "texto": "Construcción robusta."
      },
      {
       "tipo": "punto",
       "texto": "Protección IP adecuada."
      },
      {
       "tipo": "punto",
       "texto": "Instrumentación."
      },
      {
       "tipo": "punto",
       "texto": "Señalización."
      }
     ]
    },
    {
     "subtitulo": "Elementos Comunes",
     "items": [
      {
       "tipo": "punto",
       "texto": "Interruptores."
      },
      {
       "tipo": "punto",
       "texto": "Contactores."
      },
      {
       "tipo": "punto",
       "texto": "PLC."
      },
      {
       "tipo": "punto",
       "texto": "Variadores."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      },
      {
       "tipo": "punto",
       "texto": "Relés."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Protecciones industriales",
   "bloques": [
    {
     "subtitulo": "Sobrecarga",
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección: Relé térmico."
      }
     ]
    },
    {
     "subtitulo": "Cortocircuito",
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección: Disyuntor."
      }
     ]
    },
    {
     "subtitulo": "Fugas a tierra",
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección: Diferencial."
      }
     ]
    },
    {
     "subtitulo": "Sobretensiones",
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección: DPS."
      }
     ]
    },
    {
     "subtitulo": "Fallas de arco",
     "items": [
      {
       "tipo": "dato",
       "texto": "Protección: AFDD."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Cálculo de alimentadores industriales",
   "bloques": [
    {
     "subtitulo": "Datos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Motor: 30 HP"
      },
      {
       "tipo": "dato",
       "texto": "Voltaje: 380 V"
      },
      {
       "tipo": "dato",
       "texto": "Factor de potencia: 0,85"
      },
      {
       "tipo": "dato",
       "texto": "Rendimiento: 90%"
      }
     ]
    },
    {
     "subtitulo": "Corriente",
     "items": [
      {
       "tipo": "dato",
       "texto": "Resultado aproximado: 45 A"
      }
     ]
    },
    {
     "subtitulo": "Selección",
     "items": [
      {
       "tipo": "dato",
       "texto": "Conductor: 16 mm² Cu"
      },
      {
       "tipo": "dato",
       "texto": "Protección: 63 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Proyecto industrial completo (1/2)",
   "bloques": [
    {
     "subtitulo": "Taller Mecánico Industrial",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Compresor 10 HP."
      },
      {
       "tipo": "punto",
       "texto": "Bomba 5 HP."
      },
      {
       "tipo": "punto",
       "texto": "Ventilador 3 HP."
      },
      {
       "tipo": "punto",
       "texto": "Iluminación LED."
      },
      {
       "tipo": "punto",
       "texto": "Tomas industriales."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Proyecto industrial completo (2/2)",
   "bloques": [
    {
     "subtitulo": "Etapas",
     "items": [
      {
       "tipo": "texto",
       "texto": "Levantamiento de cargas."
      },
      {
       "tipo": "texto",
       "texto": "Cuadro de cargas."
      },
      {
       "tipo": "texto",
       "texto": "Cálculo de demanda."
      },
      {
       "tipo": "texto",
       "texto": "Alimentadores."
      },
      {
       "tipo": "texto",
       "texto": "Tablero General."
      },
      {
       "tipo": "texto",
       "texto": "CCM."
      },
      {
       "tipo": "texto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "texto",
       "texto": "Protecciones."
      },
      {
       "tipo": "texto",
       "texto": "Plano eléctrico."
      },
      {
       "tipo": "texto",
       "texto": "Memoria técnica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Caso práctico",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "Diseño de alimentación para bomba industrial."
      },
      {
       "tipo": "dato",
       "texto": "Motor: 15 HP"
      },
      {
       "tipo": "dato",
       "texto": "Voltaje: 380 V"
      },
      {
       "tipo": "dato",
       "texto": "Corriente: 22 A"
      },
      {
       "tipo": "encabezado",
       "texto": "Solución:"
      },
      {
       "tipo": "dato",
       "texto": "Guardamotor: 20-25 A"
      },
      {
       "tipo": "dato",
       "texto": "Contactor: 32 A"
      },
      {
       "tipo": "dato",
       "texto": "Relé térmico: 20-25 A"
      },
      {
       "tipo": "dato",
       "texto": "Conductor: 6 mm² Cu"
      },
      {
       "tipo": "dato",
       "texto": "Protección General: 32 A"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Identificación de motores."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Medición de corriente de motor."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Partida directa."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Partida estrella-triángulo."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Configuración de variador."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Montaje de guardamotor."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 7: Diseño de CCM."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 8: Proyecto industrial completo."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante será capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar motores."
      },
      {
       "tipo": "punto",
       "texto": "Calcular corrientes de operación."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar sistemas de partida."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar protecciones industriales."
      },
      {
       "tipo": "punto",
       "texto": "Utilizar variadores de frecuencia."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar CCM."
      },
      {
       "tipo": "punto",
       "texto": "Dimensionar alimentadores industriales."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar proyectos industriales completos."
      }
     ]
    }
   ]
  }
 ],
 "mod-9": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 9",
   "titulo": "Sistemas fotovoltaicos y generación distribuida",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de diseñar, dimensionar, instalar y mantener sistemas fotovoltaicos residenciales e industriales, aplicando normativa SEC, criterios de seguridad eléctrica y principios de eficiencia energética."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a la energía solar (1/2)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "¿Qué es la Energía Solar?"
      },
      {
       "tipo": "texto",
       "texto": "Es la energía proveniente de la radiación emitida por el Sol."
      },
      {
       "tipo": "encabezado",
       "texto": "Puede transformarse en:"
      },
      {
       "tipo": "punto",
       "texto": "Energía térmica."
      },
      {
       "tipo": "punto",
       "texto": "Energía eléctrica."
      }
     ]
    },
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Fuente renovable."
      },
      {
       "tipo": "punto",
       "texto": "No genera emisiones."
      },
      {
       "tipo": "punto",
       "texto": "Bajo mantenimiento."
      },
      {
       "tipo": "punto",
       "texto": "Alta vida útil."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a la energía solar (2/2)",
   "bloques": [
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Viviendas."
      },
      {
       "tipo": "punto",
       "texto": "Comercio."
      },
      {
       "tipo": "punto",
       "texto": "Industria."
      },
      {
       "tipo": "punto",
       "texto": "Agricultura."
      },
      {
       "tipo": "punto",
       "texto": "Minería."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "Recurso solar y radiación",
   "bloques": [
    {
     "subtitulo": "Concepto",
     "items": [
      {
       "tipo": "texto",
       "texto": "La radiación solar corresponde a la energía recibida desde el Sol sobre una superficie determinada."
      }
     ]
    },
    {
     "subtitulo": "Unidades",
     "items": [
      {
       "tipo": "texto",
       "texto": "kWh/m²/día"
      }
     ]
    },
    {
     "subtitulo": "Horas Solares Pico (HSP)",
     "items": [
      {
       "tipo": "texto",
       "texto": "Representan la cantidad equivalente de horas con irradiancia de 1000 W/m²."
      },
      {
       "tipo": "encabezado",
       "texto": "Ejemplo:"
      },
      {
       "tipo": "dato",
       "texto": "Copiapó: 6,8 HSP"
      },
      {
       "tipo": "dato",
       "texto": "Santiago: 5,2 HSP"
      },
      {
       "tipo": "dato",
       "texto": "Puerto Montt: 3,5 HSP"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Efecto fotovoltaico",
   "bloques": [
    {
     "subtitulo": "Principio de Funcionamiento",
     "items": [
      {
       "tipo": "texto",
       "texto": "Cuando la radiación solar incide sobre una celda fotovoltaica:"
      },
      {
       "tipo": "texto",
       "texto": "Los fotones liberan electrones."
      },
      {
       "tipo": "texto",
       "texto": "Se genera corriente continua (CC)."
      },
      {
       "tipo": "texto",
       "texto": "La energía es conducida hacia el inversor."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Paneles fotovoltaicos (1/2)",
   "bloques": [
    {
     "subtitulo": "Componentes",
     "items": [
      {
       "tipo": "punto",
       "texto": "Vidrio templado."
      },
      {
       "tipo": "punto",
       "texto": "Encapsulante EVA."
      },
      {
       "tipo": "punto",
       "texto": "Celdas fotovoltaicas."
      },
      {
       "tipo": "punto",
       "texto": "Backsheet."
      },
      {
       "tipo": "punto",
       "texto": "Marco de aluminio."
      }
     ]
    },
    {
     "subtitulo": "Monocristalinos",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Mayor eficiencia."
      },
      {
       "tipo": "punto",
       "texto": "Menor superficie requerida."
      },
      {
       "tipo": "dato",
       "texto": "Rendimiento: 20% a 24%"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Paneles fotovoltaicos (2/2)",
   "bloques": [
    {
     "subtitulo": "Policristalinos",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Menor costo."
      },
      {
       "tipo": "dato",
       "texto": "Rendimiento: 15% a 18%"
      }
     ]
    },
    {
     "subtitulo": "Bifaciales",
     "items": [
      {
       "tipo": "texto",
       "texto": "Generan energía por ambas caras."
      },
      {
       "tipo": "encabezado",
       "texto": "Aplicación:"
      },
      {
       "tipo": "punto",
       "texto": "Plantas solares."
      },
      {
       "tipo": "punto",
       "texto": "Estacionamientos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Inversores (1/2)",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "texto",
       "texto": "Transformar corriente continua (CC) en corriente alterna (CA)."
      }
     ]
    },
    {
     "subtitulo": "On Grid",
     "items": [
      {
       "tipo": "texto",
       "texto": "Conectados a la red eléctrica."
      },
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Sin baterías."
      },
      {
       "tipo": "punto",
       "texto": "Sistema más económico."
      },
      {
       "tipo": "punto",
       "texto": "Permite Net Billing."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Inversores (2/2)",
   "bloques": [
    {
     "subtitulo": "Off Grid",
     "items": [
      {
       "tipo": "texto",
       "texto": "Aislados de la red."
      },
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Utilizan baterías."
      },
      {
       "tipo": "punto",
       "texto": "Operación autónoma."
      }
     ]
    },
    {
     "subtitulo": "Híbridos",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Combinan:"
      },
      {
       "tipo": "punto",
       "texto": "Red eléctrica."
      },
      {
       "tipo": "punto",
       "texto": "Paneles solares."
      },
      {
       "tipo": "punto",
       "texto": "Baterías."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "MPPT",
   "bloques": [
    {
     "subtitulo": "Maximum Power Point Tracking",
     "items": [
      {
       "tipo": "texto",
       "texto": "Sistema electrónico que busca permanentemente el punto de máxima potencia del panel."
      }
     ]
    },
    {
     "subtitulo": "Beneficios",
     "items": [
      {
       "tipo": "punto",
       "texto": "Mayor producción."
      },
      {
       "tipo": "punto",
       "texto": "Mejor rendimiento."
      },
      {
       "tipo": "punto",
       "texto": "Menor pérdida energética."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Baterías (1/2)",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "texto",
       "texto": "Almacenar energía para uso posterior."
      }
     ]
    },
    {
     "subtitulo": "Plomo Ácido",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Bajo costo."
      },
      {
       "tipo": "encabezado",
       "texto": "Desventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Menor vida útil."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Baterías (2/2)",
   "bloques": [
    {
     "subtitulo": "Litio",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Ventajas:"
      },
      {
       "tipo": "punto",
       "texto": "Alta eficiencia."
      },
      {
       "tipo": "punto",
       "texto": "Mayor vida útil."
      },
      {
       "tipo": "punto",
       "texto": "Menor mantenimiento."
      },
      {
       "tipo": "texto",
       "texto": "Aplicación actual predominante."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Net Billing",
   "bloques": [
    {
     "subtitulo": "Ley 20.571",
     "items": [
      {
       "tipo": "texto",
       "texto": "Permite inyectar excedentes de energía a la red pública."
      }
     ]
    },
    {
     "subtitulo": "Beneficios",
     "items": [
      {
       "tipo": "punto",
       "texto": "Reducción de cuenta eléctrica."
      },
      {
       "tipo": "punto",
       "texto": "Aprovechamiento de excedentes."
      },
      {
       "tipo": "punto",
       "texto": "Retorno económico."
      }
     ]
    },
    {
     "subtitulo": "Paneles → Inversor → Consumo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Excedentes → Red Pública"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Diseño de sistemas fotovoltaicos",
   "bloques": [
    {
     "subtitulo": "Etapas",
     "items": [
      {
       "tipo": "texto",
       "texto": "Levantamiento de consumo."
      },
      {
       "tipo": "texto",
       "texto": "Determinación de HSP."
      },
      {
       "tipo": "texto",
       "texto": "Selección de paneles."
      },
      {
       "tipo": "texto",
       "texto": "Selección de inversor."
      },
      {
       "tipo": "texto",
       "texto": "Selección de protecciones."
      },
      {
       "tipo": "texto",
       "texto": "Diseño estructural."
      },
      {
       "tipo": "texto",
       "texto": "Diseño eléctrico."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Cálculo de generación",
   "bloques": [
    {
     "subtitulo": "Fórmula General",
     "items": [
      {
       "tipo": "formula",
       "texto": "E=P_{instalada}\\cdot HSP\\cdot \\eta"
      },
      {
       "tipo": "dato",
       "texto": "Donde: E = Energía diaria"
      },
      {
       "tipo": "formula",
       "texto": "P = Potencia instalada"
      },
      {
       "tipo": "formula",
       "texto": "HSP = Horas solares pico"
      },
      {
       "tipo": "formula",
       "texto": "η = Rendimiento global"
      }
     ]
    },
    {
     "subtitulo": "Ejemplo",
     "items": [
      {
       "tipo": "dato",
       "texto": "Sistema: 10 kWp"
      },
      {
       "tipo": "dato",
       "texto": "HSP: 5,5"
      },
      {
       "tipo": "dato",
       "texto": "Rendimiento: 0,80"
      },
      {
       "tipo": "dato",
       "texto": "Resultado: 44 kWh/día"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Protecciones fotovoltaicas",
   "bloques": [
    {
     "subtitulo": "Corriente Continua",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Protecciones:"
      },
      {
       "tipo": "punto",
       "texto": "Fusibles CC."
      },
      {
       "tipo": "punto",
       "texto": "Seccionadores CC."
      },
      {
       "tipo": "punto",
       "texto": "DPS CC."
      }
     ]
    },
    {
     "subtitulo": "Corriente Alterna",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Protecciones:"
      },
      {
       "tipo": "punto",
       "texto": "Disyuntores."
      },
      {
       "tipo": "punto",
       "texto": "Diferenciales."
      },
      {
       "tipo": "punto",
       "texto": "DPS CA."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "DPS fotovoltaicos",
   "bloques": [
    {
     "subtitulo": "Función",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Proteger:"
      },
      {
       "tipo": "punto",
       "texto": "Inversores."
      },
      {
       "tipo": "punto",
       "texto": "Módulos."
      },
      {
       "tipo": "punto",
       "texto": "Equipos electrónicos."
      }
     ]
    },
    {
     "subtitulo": "DPS Tipo 1",
     "items": [
      {
       "tipo": "texto",
       "texto": "Instalaciones con riesgo de descargas atmosféricas."
      }
     ]
    },
    {
     "subtitulo": "DPS Tipo 2",
     "items": [
      {
       "tipo": "texto",
       "texto": "Uso habitual."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Puesta a tierra",
   "bloques": [
    {
     "subtitulo": "Objetivos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Protección de personas."
      },
      {
       "tipo": "punto",
       "texto": "Protección de equipos."
      },
      {
       "tipo": "punto",
       "texto": "Equipotencialización."
      }
     ]
    },
    {
     "subtitulo": "Elementos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Estructuras."
      },
      {
       "tipo": "punto",
       "texto": "Inversores."
      },
      {
       "tipo": "punto",
       "texto": "Tableros."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Sistema residencial 10 kWp (1/2)",
   "bloques": [
    {
     "subtitulo": "Datos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Consumo: 1200 kWh/mes"
      },
      {
       "tipo": "dato",
       "texto": "Ubicación: Santiago"
      }
     ]
    },
    {
     "subtitulo": "Solución",
     "items": [
      {
       "tipo": "dato",
       "texto": "Paneles: 18 módulos de 550 W"
      },
      {
       "tipo": "dato",
       "texto": "Potencia: 9,9 kWp"
      },
      {
       "tipo": "dato",
       "texto": "Inversor: 10 kW On Grid"
      },
      {
       "tipo": "dato",
       "texto": "Generación estimada: 1.350 kWh/mes"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Sistema residencial 10 kWp (2/2)",
   "bloques": [
    {
     "subtitulo": "Protecciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Fusibles CC."
      },
      {
       "tipo": "punto",
       "texto": "DPS CC."
      },
      {
       "tipo": "punto",
       "texto": "DPS CA."
      },
      {
       "tipo": "punto",
       "texto": "Diferencial."
      },
      {
       "tipo": "punto",
       "texto": "Disyuntor general."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Sistema industrial 50 kWp",
   "bloques": [
    {
     "subtitulo": "Datos",
     "items": [
      {
       "tipo": "dato",
       "texto": "Consumo: 8.000 kWh/mes"
      }
     ]
    },
    {
     "subtitulo": "Solución",
     "items": [
      {
       "tipo": "dato",
       "texto": "Paneles: 90 módulos de 550 W"
      },
      {
       "tipo": "dato",
       "texto": "Potencia: 49,5 kWp"
      },
      {
       "tipo": "dato",
       "texto": "Inversor: 50 kW trifásico"
      },
      {
       "tipo": "dato",
       "texto": "Producción estimada: 6.500 a 8.000 kWh/mes"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 16",
   "titulo": "Introducción a PVsyst",
   "bloques": [
    {
     "subtitulo": "Funciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Simulación energética."
      },
      {
       "tipo": "punto",
       "texto": "Análisis de sombras."
      },
      {
       "tipo": "punto",
       "texto": "Producción anual."
      },
      {
       "tipo": "punto",
       "texto": "Evaluación económica."
      }
     ]
    },
    {
     "subtitulo": "Parámetros Principales",
     "items": [
      {
       "tipo": "punto",
       "texto": "Ubicación."
      },
      {
       "tipo": "punto",
       "texto": "Radiación."
      },
      {
       "tipo": "punto",
       "texto": "Paneles."
      },
      {
       "tipo": "punto",
       "texto": "Inversor."
      },
      {
       "tipo": "punto",
       "texto": "Pérdidas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 17",
   "titulo": "Proyecto fotovoltaico completo",
   "bloques": [
    {
     "subtitulo": "Entregables",
     "items": [
      {
       "tipo": "texto",
       "texto": "Levantamiento energético."
      },
      {
       "tipo": "texto",
       "texto": "Memoria de cálculo."
      },
      {
       "tipo": "texto",
       "texto": "Plano de distribución."
      },
      {
       "tipo": "texto",
       "texto": "Diagrama unilineal."
      },
      {
       "tipo": "texto",
       "texto": "Selección de paneles."
      },
      {
       "tipo": "texto",
       "texto": "Selección de inversor."
      },
      {
       "tipo": "texto",
       "texto": "Diseño de protecciones."
      },
      {
       "tipo": "texto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "texto",
       "texto": "Simulación PVsyst."
      },
      {
       "tipo": "texto",
       "texto": "Presupuesto."
      },
      {
       "tipo": "texto",
       "texto": "Carta Gantt."
      },
      {
       "tipo": "texto",
       "texto": "Evaluación económica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Caso práctico",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Diseñar sistema para vivienda:"
      },
      {
       "tipo": "dato",
       "texto": "Consumo: 900 kWh/mes"
      },
      {
       "tipo": "dato",
       "texto": "Ubicación: Copiapó"
      },
      {
       "tipo": "dato",
       "texto": "Objetivo: Reducir 100% del consumo."
      }
     ]
    },
    {
     "subtitulo": "Resultado",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia requerida: 7 kWp"
      },
      {
       "tipo": "dato",
       "texto": "Paneles: 13 módulos 550 W"
      },
      {
       "tipo": "dato",
       "texto": "Inversor: 8 kW"
      },
      {
       "tipo": "dato",
       "texto": "Producción anual: 13.000 kWh"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "",
   "titulo": "Laboratorios",
   "bloques": [
    {
     "items": [
      {
       "tipo": "punto",
       "texto": "Laboratorio 1: Identificación de módulos FV."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 2: Medición de tensión y corriente CC."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 3: Configuración de inversor."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 4: Configuración MPPT."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 5: Instalación de DPS FV."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 6: Diseño sistema residencial."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 7: Diseño sistema industrial."
      },
      {
       "tipo": "punto",
       "texto": "Laboratorio 8: Simulación en PVsyst."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Resumen del módulo",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El participante será capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Comprender el recurso solar."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar paneles fotovoltaicos."
      },
      {
       "tipo": "punto",
       "texto": "Seleccionar inversores."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar sistemas On Grid, Off Grid e Híbridos."
      },
      {
       "tipo": "punto",
       "texto": "Aplicar Net Billing."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar protecciones FV."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar puestas a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Utilizar PVsyst."
      },
      {
       "tipo": "punto",
       "texto": "Desarrollar proyectos fotovoltaicos completos."
      }
     ]
    }
   ]
  }
 ],
 "mod-10": [
  {
   "tipo": "portada",
   "etiqueta": "Módulo 10",
   "titulo": "AutoCAD eléctrico, elaboración de proyectos y proyecto final integrador",
   "bloques": [
    {
     "subtitulo": "Objetivo general",
     "items": [
      {
       "tipo": "texto",
       "texto": "Al finalizar este módulo, el participante será capaz de elaborar planos eléctricos profesionales, memorias de cálculo, documentación técnica, presupuestos y proyectos completos de instalaciones eléctricas y fotovoltaicas conforme a los requisitos SEC y RIC 18."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a los proyectos eléctricos (1/2)",
   "bloques": [
    {
     "items": [
      {
       "tipo": "texto",
       "texto": "¿Qué es un Proyecto Eléctrico?"
      },
      {
       "tipo": "texto",
       "texto": "Es el conjunto de documentos técnicos que permiten diseñar, construir, operar y mantener una instalación eléctrica."
      }
     ]
    },
    {
     "subtitulo": "Objetivos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Garantizar seguridad."
      },
      {
       "tipo": "punto",
       "texto": "Cumplir normativa."
      },
      {
       "tipo": "punto",
       "texto": "Optimizar costos."
      },
      {
       "tipo": "punto",
       "texto": "Facilitar construcción."
      },
      {
       "tipo": "punto",
       "texto": "Permitir futuras ampliaciones."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 1",
   "titulo": "Introducción a los proyectos eléctricos (2/2)",
   "bloques": [
    {
     "subtitulo": "Documentación Básica",
     "items": [
      {
       "tipo": "punto",
       "texto": "Planos."
      },
      {
       "tipo": "punto",
       "texto": "Diagramas."
      },
      {
       "tipo": "punto",
       "texto": "Memorias de cálculo."
      },
      {
       "tipo": "punto",
       "texto": "Especificaciones técnicas."
      },
      {
       "tipo": "punto",
       "texto": "Presupuestos."
      },
      {
       "tipo": "punto",
       "texto": "Declaraciones SEC."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "AutoCAD eléctrico (1/2)",
   "bloques": [
    {
     "subtitulo": "Introducción",
     "items": [
      {
       "tipo": "texto",
       "texto": "AutoCAD es una herramienta fundamental para el diseño eléctrico profesional."
      }
     ]
    },
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Planos domiciliarios."
      },
      {
       "tipo": "punto",
       "texto": "Planos industriales."
      },
      {
       "tipo": "punto",
       "texto": "Sistemas fotovoltaicos."
      },
      {
       "tipo": "punto",
       "texto": "Diagramas unilineales."
      },
      {
       "tipo": "punto",
       "texto": "Diagramas multifilares."
      }
     ]
    },
    {
     "subtitulo": "Configuración Inicial",
     "items": [
      {
       "tipo": "dato",
       "texto": "Unidades: Metros"
      },
      {
       "tipo": "dato",
       "texto": "Escalas: 1:50"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 2",
   "titulo": "AutoCAD eléctrico (2/2)",
   "bloques": [
    {
     "subtitulo": "1:100",
     "items": [
      {
       "tipo": "texto",
       "texto": "1:200"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 3",
   "titulo": "Simbología eléctrica SEC",
   "bloques": [
    {
     "subtitulo": "TD Tablero Distribución",
     "items": [
      {
       "tipo": "texto",
       "texto": "TP Tierra Protección"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Planos eléctricos (1/2)",
   "bloques": [
    {
     "subtitulo": "Plano de Alumbrado",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Debe indicar:"
      },
      {
       "tipo": "punto",
       "texto": "Luminarias."
      },
      {
       "tipo": "punto",
       "texto": "Interruptores."
      },
      {
       "tipo": "punto",
       "texto": "Canalizaciones."
      },
      {
       "tipo": "punto",
       "texto": "Circuitos."
      }
     ]
    },
    {
     "subtitulo": "Plano de Fuerza",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Debe indicar:"
      },
      {
       "tipo": "punto",
       "texto": "Enchufes."
      },
      {
       "tipo": "punto",
       "texto": "Equipos especiales."
      },
      {
       "tipo": "punto",
       "texto": "Tableros."
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 4",
   "titulo": "Planos eléctricos (2/2)",
   "bloques": [
    {
     "subtitulo": "Plano de Canalizaciones",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Debe indicar:"
      },
      {
       "tipo": "punto",
       "texto": "Tuberías."
      },
      {
       "tipo": "punto",
       "texto": "Diámetros."
      },
      {
       "tipo": "punto",
       "texto": "Recorridos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 5",
   "titulo": "Diagramas unilineales",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Representación simplificada de una instalación eléctrica."
      }
     ]
    },
    {
     "subtitulo": "Información mínima",
     "items": [
      {
       "tipo": "punto",
       "texto": "Potencia."
      },
      {
       "tipo": "punto",
       "texto": "Conductores."
      },
      {
       "tipo": "punto",
       "texto": "Protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores."
      }
     ]
    },
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Fácil interpretación."
      },
      {
       "tipo": "punto",
       "texto": "Presentación SEC."
      },
      {
       "tipo": "punto",
       "texto": "Mantenimiento."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 6",
   "titulo": "Diagramas multifilares",
   "bloques": [
    {
     "subtitulo": "Definición",
     "items": [
      {
       "tipo": "texto",
       "texto": "Representación detallada de todos los conductores."
      }
     ]
    },
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Tableros."
      },
      {
       "tipo": "punto",
       "texto": "CCM."
      },
      {
       "tipo": "punto",
       "texto": "Automatización."
      }
     ]
    },
    {
     "subtitulo": "Ventajas",
     "items": [
      {
       "tipo": "punto",
       "texto": "Mayor detalle."
      },
      {
       "tipo": "punto",
       "texto": "Facilita montaje."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 7",
   "titulo": "Cuadros de carga",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Determinar:"
      },
      {
       "tipo": "punto",
       "texto": "Potencia instalada."
      },
      {
       "tipo": "punto",
       "texto": "Demanda máxima."
      },
      {
       "tipo": "punto",
       "texto": "Corriente."
      },
      {
       "tipo": "punto",
       "texto": "Balance de cargas."
      }
     ]
    },
    {
     "subtitulo": "Aire Acondicionado\t2500 W",
     "items": [
      {
       "tipo": "dato",
       "texto": "Potencia Total: 12.700 W"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 8",
   "titulo": "Memorias de cálculo",
   "bloques": [
    {
     "subtitulo": "Contenido",
     "items": [
      {
       "tipo": "texto",
       "texto": "Descripción del proyecto."
      },
      {
       "tipo": "texto",
       "texto": "Normativa aplicable."
      },
      {
       "tipo": "texto",
       "texto": "Cuadro de cargas."
      },
      {
       "tipo": "texto",
       "texto": "Demanda máxima."
      },
      {
       "tipo": "texto",
       "texto": "Cálculo alimentadores."
      },
      {
       "tipo": "texto",
       "texto": "Protecciones."
      },
      {
       "tipo": "texto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "texto",
       "texto": "Verificaciones."
      }
     ]
    },
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Justificar técnicamente el diseño."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 9",
   "titulo": "Presentación de proyectos según RIC 18",
   "bloques": [
    {
     "subtitulo": "Alcance",
     "items": [
      {
       "tipo": "texto",
       "texto": "RIC 18 regula la documentación necesaria para proyectos eléctricos."
      }
     ]
    },
    {
     "subtitulo": "Documentos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Planos."
      },
      {
       "tipo": "punto",
       "texto": "Memorias."
      },
      {
       "tipo": "punto",
       "texto": "Especificaciones."
      },
      {
       "tipo": "punto",
       "texto": "Diagramas."
      },
      {
       "tipo": "punto",
       "texto": "Certificados."
      }
     ]
    },
    {
     "subtitulo": "Requisitos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Legibilidad."
      },
      {
       "tipo": "punto",
       "texto": "Identificación del proyectista."
      },
      {
       "tipo": "punto",
       "texto": "Información técnica suficiente."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 10",
   "titulo": "Documentación TE1",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Declarar instalaciones eléctricas ante SEC."
      }
     ]
    },
    {
     "subtitulo": "Información Requerida",
     "items": [
      {
       "tipo": "punto",
       "texto": "Propietario."
      },
      {
       "tipo": "punto",
       "texto": "Instalador."
      },
      {
       "tipo": "punto",
       "texto": "Potencia."
      },
      {
       "tipo": "punto",
       "texto": "Dirección."
      },
      {
       "tipo": "punto",
       "texto": "Tipo de instalación."
      },
      {
       "tipo": "punto",
       "texto": "Planos."
      },
      {
       "tipo": "punto",
       "texto": "Memoria."
      }
     ]
    },
    {
     "subtitulo": "Responsabilidad",
     "items": [
      {
       "tipo": "texto",
       "texto": "Instalador autorizado SEC."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Presupuestos y cubicaciones (1/2)",
   "bloques": [
    {
     "subtitulo": "Cubicación",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Proceso de cuantificar:"
      },
      {
       "tipo": "punto",
       "texto": "Conductores."
      },
      {
       "tipo": "punto",
       "texto": "Canalizaciones."
      },
      {
       "tipo": "punto",
       "texto": "Tableros."
      },
      {
       "tipo": "punto",
       "texto": "Protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Mano de obra."
      }
     ]
    },
    {
     "subtitulo": "Presupuesto",
     "items": [
      {
       "tipo": "dato",
       "texto": "Incluye: Materiales. · Mano de obra. · Equipos."
      },
      {
       "tipo": "texto",
       "texto": "Transporte."
      },
      {
       "tipo": "texto",
       "texto": "Utilidad."
      },
      {
       "tipo": "texto",
       "texto": "IVA."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 11",
   "titulo": "Presupuestos y cubicaciones (2/2)",
   "bloques": [
    {
     "subtitulo": "Proyecto Residencial",
     "items": [
      {
       "tipo": "dato",
       "texto": "Materiales: $2.500.000"
      },
      {
       "tipo": "dato",
       "texto": "Mano de obra: $1.500.000"
      },
      {
       "tipo": "dato",
       "texto": "Utilidad: $800.000"
      },
      {
       "tipo": "dato",
       "texto": "Total: $4.800.000"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 12",
   "titulo": "Excel aplicado a proyectos eléctricos",
   "bloques": [
    {
     "subtitulo": "Aplicaciones",
     "items": [
      {
       "tipo": "punto",
       "texto": "Cuadros de carga."
      },
      {
       "tipo": "punto",
       "texto": "Caída de tensión."
      },
      {
       "tipo": "punto",
       "texto": "Potencia."
      },
      {
       "tipo": "punto",
       "texto": "Presupuestos."
      },
      {
       "tipo": "punto",
       "texto": "Generación fotovoltaica."
      }
     ]
    },
    {
     "subtitulo": "BUSCARV",
     "items": [
      {
       "tipo": "texto",
       "texto": "TABLAS DINÁMICAS"
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 13",
   "titulo": "Proyecto final 1",
   "bloques": [
    {
     "subtitulo": "Entregables",
     "items": [
      {
       "tipo": "punto",
       "texto": "Plano eléctrico."
      },
      {
       "tipo": "punto",
       "texto": "Cuadro de cargas."
      },
      {
       "tipo": "punto",
       "texto": "Diagrama unilineal."
      },
      {
       "tipo": "punto",
       "texto": "Memoria de cálculo."
      },
      {
       "tipo": "punto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Presupuesto."
      },
      {
       "tipo": "punto",
       "texto": "TE1 Simulado."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 14",
   "titulo": "Proyecto final 2",
   "bloques": [
    {
     "subtitulo": "TALLER INDUSTRIAL",
     "items": [
      {
       "tipo": "encabezado",
       "texto": "Características:"
      },
      {
       "tipo": "punto",
       "texto": "Motores."
      },
      {
       "tipo": "punto",
       "texto": "Iluminación."
      },
      {
       "tipo": "punto",
       "texto": "Tomas industriales."
      }
     ]
    },
    {
     "subtitulo": "Entregables",
     "items": [
      {
       "tipo": "punto",
       "texto": "Plano fuerza."
      },
      {
       "tipo": "punto",
       "texto": "CCM."
      },
      {
       "tipo": "punto",
       "texto": "Alimentadores."
      },
      {
       "tipo": "punto",
       "texto": "Protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Memoria técnica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 15",
   "titulo": "Proyecto final 3",
   "bloques": [
    {
     "subtitulo": "Entregables",
     "items": [
      {
       "tipo": "punto",
       "texto": "Plano FV."
      },
      {
       "tipo": "punto",
       "texto": "Diagrama unilineal."
      },
      {
       "tipo": "punto",
       "texto": "Selección de paneles."
      },
      {
       "tipo": "punto",
       "texto": "Selección de inversor."
      },
      {
       "tipo": "punto",
       "texto": "DPS."
      },
      {
       "tipo": "punto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Simulación PVsyst."
      },
      {
       "tipo": "punto",
       "texto": "Evaluación económica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 16",
   "titulo": "Portafolio profesional",
   "bloques": [
    {
     "subtitulo": "Objetivo",
     "items": [
      {
       "tipo": "texto",
       "texto": "Preparar al alumno para incorporarse al mercado laboral."
      }
     ]
    },
    {
     "subtitulo": "Contenido",
     "items": [
      {
       "tipo": "texto",
       "texto": "Proyecto residencial."
      },
      {
       "tipo": "texto",
       "texto": "Proyecto industrial."
      },
      {
       "tipo": "texto",
       "texto": "Proyecto fotovoltaico."
      },
      {
       "tipo": "texto",
       "texto": "Currículum profesional."
      },
      {
       "tipo": "texto",
       "texto": "Certificaciones."
      },
      {
       "tipo": "texto",
       "texto": "Fotografías de trabajos."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 17",
   "titulo": "Preparación examen SEC (1/2)",
   "bloques": [
    {
     "subtitulo": "Temas Críticos",
     "items": [
      {
       "tipo": "punto",
       "texto": "Conductores."
      },
      {
       "tipo": "punto",
       "texto": "Protecciones."
      },
      {
       "tipo": "punto",
       "texto": "Puesta a tierra."
      },
      {
       "tipo": "punto",
       "texto": "Tableros."
      },
      {
       "tipo": "punto",
       "texto": "Empalmes."
      },
      {
       "tipo": "punto",
       "texto": "RIC."
      },
      {
       "tipo": "punto",
       "texto": "Fotovoltaica."
      }
     ]
    }
   ]
  },
  {
   "tipo": "contenido",
   "etiqueta": "Capítulo 17",
   "titulo": "Preparación examen SEC (2/2)",
   "bloques": [
    {
     "subtitulo": "Simuladores",
     "items": [
      {
       "tipo": "texto",
       "texto": "100 preguntas."
      },
      {
       "tipo": "texto",
       "texto": "200 preguntas."
      },
      {
       "tipo": "texto",
       "texto": "500 preguntas."
      },
      {
       "tipo": "texto",
       "texto": "1000 preguntas."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Perfil de egreso",
   "bloques": [
    {
     "items": [
      {
       "tipo": "encabezado",
       "texto": "El alumno será capaz de:"
      },
      {
       "tipo": "punto",
       "texto": "Diseñar instalaciones domiciliarias."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar instalaciones industriales."
      },
      {
       "tipo": "punto",
       "texto": "Diseñar sistemas fotovoltaicos."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar planos profesionales."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar memorias de cálculo."
      },
      {
       "tipo": "punto",
       "texto": "Preparar documentación TE1."
      },
      {
       "tipo": "punto",
       "texto": "Elaborar presupuestos."
      },
      {
       "tipo": "punto",
       "texto": "Utilizar AutoCAD."
      },
      {
       "tipo": "punto",
       "texto": "Utilizar Excel."
      },
      {
       "tipo": "punto",
       "texto": "Desarrollar proyectos eléctricos completos."
      },
      {
       "tipo": "punto",
       "texto": "Prepararse para Licencia SEC Clase D."
      },
      {
       "tipo": "punto",
       "texto": "Emprender servicios eléctricos profesionales."
      }
     ]
    }
   ]
  },
  {
   "tipo": "resumen",
   "etiqueta": "",
   "titulo": "Cierre del programa",
   "bloques": [
    {
     "items": [
      {
       "tipo": "dato",
       "texto": "Duración Total: 240 Horas"
      },
      {
       "tipo": "dato",
       "texto": "Módulos: 10"
      },
      {
       "tipo": "dato",
       "texto": "Laboratorios: 80+"
      },
      {
       "tipo": "dato",
       "texto": "Proyectos: 3"
      },
      {
       "tipo": "dato",
       "texto": "Evaluaciones: 20+"
      },
      {
       "tipo": "dato",
       "texto": "Banco de Preguntas: 1000+"
      },
      {
       "tipo": "encabezado",
       "texto": "Certificación:"
      },
      {
       "tipo": "texto",
       "texto": "Instalador Eléctrico Clase D SEC con Especialización en Sistemas Fotovoltaicos"
      }
     ]
    }
   ]
  }
 ]
};
