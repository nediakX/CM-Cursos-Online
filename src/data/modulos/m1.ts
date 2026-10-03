import type { ContenidoModulo } from '../../types';

/** Módulo 1 — Fuente: MANUAL DEL ALUMNO, Módulo 1 (CM Ingenierías Corporativas SpA). */
export const M1: ContenidoModulo = {
  moduloId: 'mod-1',
  introduccion:
    'Conocerás el marco legal que regula las instalaciones eléctricas en Chile: los organismos del sector, el Decreto Supremo N°8, las licencias SEC, los Reglamentos Técnicos RIC y la declaración TE1.',
  lecciones: [
    {
      leccionId: 'lec-1-1',
      titulo: 'El sector eléctrico chileno',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'La energía eléctrica es uno de los pilares del desarrollo económico, industrial y social del país. En Chile, las instalaciones eléctricas deben ejecutarse bajo estrictas normas técnicas y legales que protegen la vida de las personas, los bienes materiales y la continuidad operacional de los sistemas.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Organismos relacionados con el sector eléctrico',
          instruccion: 'Toca cada organismo para ver sus funciones.',
          items: [
            {
              titulo: 'CNE',
              etiqueta: 'Comisión Nacional de Energía',
              resumen: 'Elabora y coordina planes, políticas y normas del sector energético.',
              detalle: ['Elaboración de políticas energéticas.', 'Regulación tarifaria.', 'Estudios técnicos.', 'Desarrollo energético nacional.'],
            },
            {
              titulo: 'SEC',
              etiqueta: 'Superintendencia de Electricidad y Combustibles',
              resumen: 'Organismo fiscalizador de electricidad, combustibles y gas.',
              detalle: [
                'Fiscalización de instalaciones eléctricas.',
                'Emisión de licencias de instalador eléctrico.',
                'Recepción de declaraciones TE1.',
                'Aplicación de sanciones.',
                'Fiscalización de productos eléctricos certificados.',
              ],
            },
            {
              titulo: 'Distribuidoras',
              etiqueta: 'Empresas distribuidoras',
              resumen: 'Suministran energía eléctrica a los usuarios finales.',
              detalle: ['Ejemplos: CGE, SAESA, FRONTEL, CHILQUINTA, ENEL Distribución.'],
            },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Relaciona cada organismo con su función',
          pares: [
            { a: 'SEC', b: 'Fiscaliza instalaciones y emite licencias' },
            { a: 'CNE', b: 'Elabora políticas energéticas y regula tarifas' },
            { a: 'Distribuidora', b: 'Suministra energía al usuario final' },
          ],
        },
        {
          tipo: 'lista',
          titulo: 'Marco normativo nacional que deben cumplir las instalaciones de consumo',
          estilo: 'check',
          items: [
            'Ley General de Servicios Eléctricos.',
            'Decreto Supremo N°8.',
            'Reglamentos Técnicos SEC (RIC).',
            'Normas Chilenas.',
            'Normas IEC adoptadas por Chile.',
            'Reglamentación municipal aplicable.',
          ],
        },
        {
          tipo: 'nota',
          variante: 'peligro',
          titulo: 'Importancia de la seguridad eléctrica',
          texto:
            'Los accidentes eléctricos pueden provocar electrocución, quemaduras, incendios, explosiones, daños a equipos e interrupción de procesos productivos. Por eso toda instalación debe diseñarse considerando: seguridad de las personas, protección de bienes, continuidad de servicio, eficiencia energética y cumplimiento normativo.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es el organismo encargado de fiscalizar las instalaciones eléctricas en Chile?',
          opciones: ['CNE', 'SEC', 'SENCE', 'MINVU'],
          correcta: 1,
          explicacion:
            'La Superintendencia de Electricidad y Combustibles (SEC) es el organismo fiscalizador de las instalaciones eléctricas y de combustibles en Chile.',
        },
      ],
    },
    {
      leccionId: 'lec-1-2',
      titulo: 'Decreto Supremo N°8',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'El Decreto Supremo N°8 del Ministerio de Energía establece las exigencias mínimas de seguridad para las instalaciones de consumo de energía eléctrica en baja tensión.',
        },
        {
          tipo: 'ordenar',
          titulo: 'Ciclo de vida que cubre el DS N°8',
          instruccion: 'Ordena las etapas en las que el reglamento busca garantizar condiciones seguras.',
          items: ['Diseño', 'Construcción', 'Puesta en servicio', 'Operación', 'Mantenimiento', 'Reparación'],
        },
        {
          tipo: 'lista',
          titulo: 'Alcance: aplica a todas las instalaciones de consumo conectadas a redes de distribución pública',
          items: ['Viviendas.', 'Edificios.', 'Comercios.', 'Industrias.', 'Instalaciones especiales.', 'Sistemas fotovoltaicos.'],
        },
        {
          tipo: 'tarjetas',
          titulo: '¿Quién responde por qué?',
          instruccion: 'Compara las responsabilidades del propietario y del instalador.',
          items: [
            {
              titulo: 'Propietario',
              resumen: 'Responsable de mantener la instalación segura.',
              detalle: [
                'Mantener la instalación en condiciones seguras.',
                'Realizar inspecciones periódicas.',
                'Ejecutar normalizaciones.',
                'Contratar personal autorizado.',
              ],
            },
            {
              titulo: 'Instalador autorizado',
              resumen: 'Responsable de ejecutar conforme a normativa.',
              detalle: [
                'Ejecutar instalaciones conforme a normativa.',
                'Utilizar materiales certificados.',
                'Declarar instalaciones cuando corresponda.',
                'Garantizar la seguridad de los trabajos realizados.',
              ],
            },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es el objetivo principal del Decreto Supremo N°8?',
          opciones: ['Reducir costos', 'Aumentar el consumo eléctrico', 'Establecer requisitos mínimos de seguridad', 'Regular tarifas'],
          correcta: 2,
          explicacion: 'El DS N°8 fija las exigencias mínimas de seguridad para instalaciones de consumo en baja tensión.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Quién es responsable de mantener una instalación en condiciones seguras?',
          opciones: ['SEC', 'Distribuidora', 'Propietario', 'Constructor'],
          correcta: 2,
          explicacion: 'Según el manual, el propietario debe mantener la instalación segura, inspeccionarla y contratar personal autorizado.',
        },
      ],
    },
    {
      leccionId: 'lec-1-3',
      titulo: 'Licencias de instalador eléctrico SEC',
      minutos: 20,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'La licencia SEC acredita la competencia técnica para ejecutar instalaciones eléctricas dentro de los límites establecidos para cada categoría.',
        },
        {
          tipo: 'tabla',
          titulo: 'Clasificación de licencias',
          columnas: ['Clase', 'Alcance'],
          filas: [
            ['Clase A', 'Ingenieros eléctricos con atribuciones completas.'],
            ['Clase B', 'Profesionales con atribuciones específicas definidas por SEC.'],
            ['Clase C', 'Instalaciones de mayor complejidad técnica.'],
            ['Clase D', 'Instalaciones de baja tensión domiciliarias y comerciales de menor potencia.'],
          ],
          nota: 'La Clase A es la de mayores atribuciones; la Clase D está orientada a instalaciones domiciliarias.',
        },
        {
          tipo: 'lista',
          titulo: 'Campo de acción del instalador Clase D',
          estilo: 'check',
          items: ['Instalaciones domiciliarias.', 'Ampliaciones eléctricas.', 'Tableros de distribución.', 'Alumbrado.', 'Enchufes.', 'Sistemas de protección.'],
        },
        {
          tipo: 'lista',
          titulo: 'Requisitos generales',
          items: ['Formación técnica reconocida.', 'Documentación requerida por SEC.', 'Cumplimiento normativo vigente.'],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué licencia SEC permite ejecutar instalaciones de baja tensión domiciliarias?',
          opciones: ['Clase A', 'Clase B', 'Clase C', 'Clase D'],
          correcta: 3,
          explicacion: 'La Clase D cubre instalaciones de baja tensión domiciliarias y comerciales de menor potencia.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál de las siguientes licencias SEC posee mayores atribuciones profesionales?',
          opciones: ['Clase D', 'Clase C', 'Clase B', 'Clase A'],
          correcta: 3,
          explicacion: 'La Clase A corresponde al nivel más alto de atribuciones para instalaciones eléctricas.',
        },
      ],
    },
    {
      leccionId: 'lec-1-4',
      titulo: 'Reglamentos Técnicos RIC',
      minutos: 35,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'Los Reglamentos Técnicos para Instalaciones de Consumo (RIC) complementan las disposiciones del Decreto Supremo N°8. Son 19 y todo proyecto debe considerar simultáneamente los RIC aplicables según el tipo de instalación.',
        },
        {
          tipo: 'tabla',
          titulo: 'Estructura general de los RIC',
          buscable: true,
          columnas: ['RIC', 'Materia'],
          filas: [
            ['RIC 01', 'Empalmes'],
            ['RIC 02', 'Tableros eléctricos'],
            ['RIC 03', 'Alimentadores'],
            ['RIC 04', 'Conductores'],
            ['RIC 05', 'Protección contra tensiones peligrosas'],
            ['RIC 06', 'Puesta a tierra'],
            ['RIC 07', 'Instalaciones de equipos'],
            ['RIC 08', 'Sistemas de emergencia'],
            ['RIC 09', 'Sistemas de autogeneración'],
            ['RIC 10', 'Instalaciones de uso general'],
            ['RIC 11', 'Instalaciones especiales'],
            ['RIC 12', 'Ambientes explosivos'],
            ['RIC 13', 'Subestaciones y salas eléctricas'],
            ['RIC 14', 'Eficiencia energética'],
            ['RIC 15', 'Infraestructura de recarga para vehículos eléctricos'],
            ['RIC 16', 'Sistemas de distribución'],
            ['RIC 17', 'Operación y mantenimiento'],
            ['RIC 18', 'Presentación de proyectos'],
            ['RIC 19', 'Puesta en servicio'],
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Memoriza los RIC más preguntados',
          instruccion: 'Selecciona un RIC y luego la materia que regula.',
          pares: [
            { a: 'RIC 02', b: 'Tableros eléctricos' },
            { a: 'RIC 06', b: 'Puesta a tierra' },
            { a: 'RIC 09', b: 'Autogeneración' },
            { a: 'RIC 10', b: 'Instalaciones de uso general' },
            { a: 'RIC 15', b: 'Recarga de vehículos eléctricos' },
            { a: 'RIC 18', b: 'Presentación de proyectos' },
            { a: 'RIC 19', b: 'Puesta en servicio' },
          ],
        },
        {
          tipo: 'nota',
          variante: 'tip',
          titulo: 'Aplicación práctica',
          texto:
            'Una vivienda típica involucra al menos RIC 01 (empalme), RIC 02 (tablero), RIC 03 y 04 (alimentadores y conductores), RIC 05 y 06 (protecciones y tierra), RIC 10 (uso general), RIC 18 (proyecto) y RIC 19 (puesta en servicio).',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué significa RIC?',
          opciones: ['Reglamento Industrial Chileno', 'Reglamento de Instalaciones de Consumo', 'Registro Industrial Comercial', 'Reglamento Interior Constructivo'],
          correcta: 1,
          explicacion: 'RIC = Reglamentos Técnicos para Instalaciones de Consumo.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué reglamento regula la puesta en servicio de instalaciones?',
          opciones: ['RIC 17', 'RIC 18', 'RIC 19', 'RIC 02'],
          correcta: 2,
          explicacion: 'RIC 19 — Puesta en servicio. RIC 18 regula la presentación de proyectos y RIC 17 la operación y mantenimiento.',
        },
      ],
    },
    {
      leccionId: 'lec-1-5',
      titulo: 'Declaración TE1 y responsabilidad del instalador',
      minutos: 20,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'La declaración TE1 es el documento mediante el cual se declara una instalación eléctrica ante SEC. Es responsabilidad del instalador autorizado.',
        },
        {
          tipo: 'lista',
          titulo: 'Objetivos de la TE1',
          estilo: 'check',
          items: ['Certificar cumplimiento normativo.', 'Registrar la instalación.', 'Autorizar la energización.'],
        },
        {
          tipo: 'checklist',
          titulo: 'Información requerida en una TE1',
          items: ['Datos del propietario.', 'Datos del instalador.', 'Potencia instalada.', 'Tipo de instalación.', 'Planos.', 'Memoria técnica.'],
        },
        {
          tipo: 'nota',
          variante: 'importante',
          titulo: 'Responsabilidad legal',
          texto:
            'Una TE1 con información falsa puede generar sanciones al instalador. Si una instalación se modifica sustancialmente, puede requerir una nueva declaración. Ante una condición insegura, el instalador debe informar y corregir.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Quién puede firmar una declaración TE1?',
          opciones: ['Cualquier electricista', 'Propietario', 'Instalador autorizado SEC', 'Arquitecto'],
          correcta: 2,
          explicacion: 'La declaración TE1 es responsabilidad del instalador autorizado SEC.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué documento técnico normalmente acompaña una declaración TE1?',
          opciones: ['Memoria de cálculo', 'Escritura', 'Certificado de dominio', 'Permiso de circulación'],
          correcta: 0,
          explicacion: 'La TE1 se acompaña de planos y memoria técnica/de cálculo que justifican el diseño.',
        },
      ],
    },
  ],
  resumen: [
    'El sector eléctrico chileno está regulado por organismos técnicos y fiscalizadores.',
    'El Decreto Supremo N°8 establece las exigencias mínimas de seguridad.',
    'La SEC fiscaliza las instalaciones eléctricas.',
    'La Licencia Clase D permite ejecutar instalaciones de baja tensión.',
    'Los Reglamentos Técnicos RIC complementan la normativa vigente.',
  ],
  laboratorios: ['Análisis de proyectos reales declarados ante SEC.'],
  taller: {
    titulo: 'Taller práctico',
    descripcion:
      'Analizar una instalación domiciliaria existente e identificar los reglamentos RIC aplicables para su diseño, ejecución y puesta en servicio.',
    entregables: ['Listado de RIC aplicables y justificación de cada uno.'],
  },
};
