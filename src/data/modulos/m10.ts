import type { ContenidoModulo } from '../../types';

/** Módulo 10 — Fuente: MANUAL DEL ALUMNO, Módulo 10. */
export const M10: ContenidoModulo = {
  moduloId: 'mod-10',
  introduccion:
    'Aprenderás a elaborar planos profesionales, memorias de cálculo, documentación técnica, presupuestos y proyectos completos conforme a SEC y RIC 18, y prepararás tu proyecto final y el examen SEC.',
  lecciones: [
    {
      leccionId: 'lec-10-1',
      titulo: 'El proyecto eléctrico',
      minutos: 20,
      bloques: [
        { tipo: 'texto', texto: 'Un proyecto eléctrico es el conjunto de documentos técnicos que permiten diseñar, construir, operar y mantener una instalación eléctrica.' },
        {
          tipo: 'lista',
          titulo: 'Objetivos',
          estilo: 'check',
          items: ['Garantizar seguridad.', 'Cumplir normativa.', 'Optimizar costos.', 'Facilitar construcción.', 'Permitir futuras ampliaciones.'],
        },
        {
          tipo: 'checklist',
          titulo: 'Documentación básica',
          items: ['Planos.', 'Diagramas.', 'Memorias de cálculo.', 'Especificaciones técnicas.', 'Presupuestos.', 'Declaraciones SEC.'],
        },
      ],
    },
    {
      leccionId: 'lec-10-2',
      titulo: 'AutoCAD eléctrico',
      minutos: 30,
      bloques: [
        {
          tipo: 'texto',
          texto: 'AutoCAD es una herramienta fundamental para el diseño eléctrico profesional: planos domiciliarios, industriales, sistemas fotovoltaicos, diagramas unilineales y multifilares.',
        },
        {
          tipo: 'emparejar',
          titulo: 'Comando ↔ función',
          pares: [
            { a: 'LINE', b: 'Dibujar líneas' },
            { a: 'OFFSET', b: 'Crear copias paralelas a una distancia' },
            { a: 'COPY', b: 'Copiar objetos' },
            { a: 'TRIM', b: 'Recortar partes sobrantes de líneas' },
            { a: 'MIRROR', b: 'Crear una copia en espejo' },
            { a: 'LAYER', b: 'Organizar el dibujo en capas' },
            { a: 'BLOCK', b: 'Crear símbolos reutilizables' },
          ],
        },
        {
          tipo: 'tarjetas',
          titulo: 'Configuración inicial',
          items: [
            { titulo: 'Unidades', etiqueta: 'Metros', detalle: ['Trabaja el dibujo en metros.'] },
            { titulo: 'Escalas habituales', etiqueta: '1:50 · 1:75 · 1:100 · 1:200', detalle: ['Verifica escala, capas y rotulación antes de imprimir.'] },
            { titulo: 'Otros comandos', etiqueta: 'MOVE · EXTEND · DIMENSION', detalle: ['MOVE mueve objetos.', 'EXTEND extiende líneas hasta un borde.', 'DIMENSION acota el dibujo.'] },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué ventaja tienen los bloques (BLOCK) en AutoCAD?',
          opciones: ['Aumentan el tamaño del archivo', 'Permiten reutilizar símbolos de forma estandarizada', 'Eliminan capas', 'Imprimen automáticamente'],
          correcta: 1,
          explicacion: 'Los bloques permiten reutilizar simbología eléctrica de manera uniforme.',
        },
      ],
    },
    {
      leccionId: 'lec-10-3',
      titulo: 'Simbología SEC y planos',
      minutos: 25,
      bloques: [
        {
          tipo: 'emparejar',
          titulo: 'Simbología eléctrica',
          pares: [
            { a: '○', b: 'Luminaria' },
            { a: '◎', b: 'Luminaria exterior' },
            { a: 'S', b: 'Interruptor simple' },
            { a: 'SC', b: 'Interruptor conmutado' },
            { a: 'SP', b: 'Pulsador' },
            { a: 'E', b: 'Enchufe' },
            { a: 'ET', b: 'Enchufe trifásico' },
            { a: 'TD', b: 'Tablero de distribución' },
          ],
        },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de plano',
          items: [
            { titulo: 'Plano de alumbrado', detalle: ['Luminarias.', 'Interruptores.', 'Canalizaciones.', 'Circuitos.'] },
            { titulo: 'Plano de fuerza', detalle: ['Enchufes.', 'Equipos especiales.', 'Tableros.', 'Alimentadores.'] },
            { titulo: 'Plano de canalizaciones', detalle: ['Tuberías.', 'Diámetros.', 'Recorridos.'] },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: 'Durante la revisión de un plano se observa que un circuito no tiene identificación. Esto puede provocar:',
          opciones: ['Ahorro de energía', 'Errores de mantenimiento y fiscalización', 'Mejor estética', 'Mayor ampacidad'],
          correcta: 1,
          explicacion: 'Numerar e identificar circuitos facilita operación, mantenimiento y fiscalización.',
        },
      ],
    },
    {
      leccionId: 'lec-10-4',
      titulo: 'Diagramas y cuadros de carga',
      minutos: 25,
      bloques: [
        {
          tipo: 'tabla',
          titulo: 'Unilineal vs. multifilar',
          columnas: ['', 'Unilineal', 'Multifilar'],
          filas: [
            ['Definición', 'Representación simplificada de la instalación', 'Representación detallada de todos los conductores'],
            ['Información', 'Potencia, conductores, protecciones, alimentadores', 'Cada conductor y conexión'],
            ['Uso', 'Presentación SEC, mantenimiento', 'Tableros, CCM, automatización'],
            ['Ventaja', 'Fácil interpretación', 'Mayor detalle, facilita el montaje'],
          ],
        },
        {
          tipo: 'texto',
          texto: 'El cuadro de cargas determina potencia instalada, demanda máxima, corriente y balance. Ejemplo del manual: alumbrado 1.200 W + enchufes 3.000 W + cocina 6.000 W + aire acondicionado 2.500 W = 12.700 W.',
        },
        { tipo: 'calculadora', calculadora: 'cuadroCargas' },
      ],
    },
    {
      leccionId: 'lec-10-5',
      titulo: 'Memoria de cálculo, RIC 18 y TE1',
      minutos: 25,
      bloques: [
        {
          tipo: 'ordenar',
          titulo: 'Estructura de la memoria de cálculo',
          items: ['Descripción del proyecto', 'Normativa aplicable', 'Cuadro de cargas', 'Demanda máxima', 'Cálculo de alimentadores', 'Protecciones', 'Puesta a tierra', 'Verificaciones'],
        },
        {
          tipo: 'tarjetas',
          titulo: 'RIC 18 — Presentación de proyectos',
          items: [
            { titulo: 'Documentos', detalle: ['Planos.', 'Memorias.', 'Especificaciones.', 'Diagramas.', 'Certificados.'] },
            { titulo: 'Requisitos', detalle: ['Legibilidad.', 'Identificación del proyectista.', 'Información técnica suficiente.'] },
          ],
        },
        {
          tipo: 'checklist',
          titulo: 'Información de la TE1',
          items: ['Propietario.', 'Instalador.', 'Potencia.', 'Dirección.', 'Tipo de instalación.', 'Planos.', 'Memoria.'],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué debe existir entre el plano eléctrico y la memoria de cálculo?',
          opciones: ['Nada, son independientes', 'Coherencia total de la información', 'Sólo el mismo formato de hoja', 'La firma del propietario'],
          correcta: 1,
          explicacion: 'Plano y memoria deben ser coherentes: la documentación debe permitir construir, verificar, operar y fiscalizar.',
        },
      ],
    },
    {
      leccionId: 'lec-10-6',
      titulo: 'Presupuestos, cubicaciones y Excel',
      minutos: 25,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Cubicación y presupuesto',
          items: [
            { titulo: 'Cubicación', resumen: 'Cuantificar los recursos del proyecto.', detalle: ['Conductores.', 'Canalizaciones.', 'Tableros.', 'Protecciones.', 'Mano de obra.'] },
            { titulo: 'Presupuesto', resumen: 'Valorizar el proyecto.', detalle: ['Materiales.', 'Mano de obra.', 'Equipos.', 'Transporte.', 'Utilidad.', 'IVA.'] },
          ],
        },
        { tipo: 'calculadora', calculadora: 'presupuesto' },
        {
          tipo: 'lista',
          titulo: 'Excel aplicado a proyectos eléctricos',
          items: [
            'Usos: cuadros de carga, caída de tensión, potencia, presupuestos, generación fotovoltaica.',
            'Fórmulas habituales: SUMA, PROMEDIO, SI, BUSCARV, tablas dinámicas.',
          ],
        },
      ],
    },
    {
      leccionId: 'lec-10-7',
      titulo: 'Proyecto final y preparación SEC',
      minutos: 30,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Elige tu proyecto final',
          items: [
            {
              titulo: 'Proyecto 1 — Vivienda 150 m²',
              detalle: ['Plano eléctrico.', 'Cuadro de cargas.', 'Diagrama unilineal.', 'Memoria de cálculo.', 'Puesta a tierra.', 'Presupuesto.', 'TE1 simulado.'],
            },
            {
              titulo: 'Proyecto 2 — Taller industrial',
              detalle: ['Motores, iluminación y tomas industriales.', 'Plano de fuerza.', 'CCM.', 'Alimentadores.', 'Protecciones.', 'Memoria técnica.'],
            },
            {
              titulo: 'Proyecto 3 — Sistema FV 10 kWp',
              detalle: ['Plano FV.', 'Diagrama unilineal.', 'Selección de paneles e inversor.', 'DPS.', 'Puesta a tierra.', 'Simulación PVsyst.', 'Evaluación económica.'],
            },
          ],
        },
        {
          tipo: 'checklist',
          titulo: 'Portafolio profesional',
          items: ['Proyecto residencial.', 'Proyecto industrial.', 'Proyecto fotovoltaico.', 'Currículum profesional.', 'Certificaciones.', 'Fotografías de trabajos.'],
        },
        {
          tipo: 'nota',
          variante: 'importante',
          titulo: 'Temas críticos del examen SEC',
          texto: 'Conductores · Protecciones · Puesta a tierra · Tableros · Empalmes · RIC · Fotovoltaica. Practica con los Simuladores SEC de la sección Evaluaciones.',
        },
        {
          tipo: 'tabla',
          titulo: 'Evaluación final del curso',
          columnas: ['Componente', 'Ponderación'],
          filas: [
            ['Teoría (evaluaciones)', '40%'],
            ['Talleres y laboratorios', '30%'],
            ['Proyecto final', '30%'],
          ],
          nota: 'Requisitos de aprobación: nota mínima 4,0 y asistencia mínima 75%.',
        },
      ],
    },
  ],
  resumen: [
    'Elaborar planos profesionales en AutoCAD.',
    'Elaborar memorias de cálculo y documentación TE1.',
    'Elaborar presupuestos y usar Excel.',
    'Desarrollar proyectos domiciliarios, industriales y fotovoltaicos completos.',
    'Prepararse para la Licencia SEC Clase D.',
  ],
  laboratorios: [
    'Plano domiciliario en AutoCAD.',
    'Diagrama unilineal y multifilar.',
    'Cuadro de cargas y memoria de cálculo en Excel.',
    'Cubicación y presupuesto.',
    'Simulación de declaración TE1.',
  ],
  taller: {
    titulo: 'Proyecto final integrador',
    descripcion: 'Desarrolla uno de los tres proyectos finales (vivienda 150 m², taller industrial o sistema FV 10 kWp) y súbelo en la sección "Proyecto Final".',
    entregables: ['Memoria de cálculo.', 'Plano eléctrico.', 'Diagrama unilineal.', 'Cuadro de cargas.', 'Cálculo de conductores.', 'Selección de protecciones.', 'Diseño de puesta a tierra.', 'Presupuesto.', 'Carta Gantt.'],
  },
};
