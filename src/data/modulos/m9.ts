import type { ContenidoModulo } from '../../types';

/** Módulo 9 — Fuente: MANUAL DEL ALUMNO, Módulo 9. */
export const M9: ContenidoModulo = {
  moduloId: 'mod-9',
  introduccion:
    'Aprenderás a diseñar, dimensionar, instalar y mantener sistemas fotovoltaicos residenciales e industriales, aplicando normativa SEC, Net Billing (Ley 20.571) y criterios de seguridad.',
  lecciones: [
    {
      leccionId: 'lec-9-1',
      titulo: 'Energía solar y recurso solar en Chile',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'La energía solar proviene de la radiación emitida por el Sol y puede transformarse en energía térmica o eléctrica. Es renovable, no genera emisiones, requiere bajo mantenimiento y tiene alta vida útil.',
        },
        {
          tipo: 'tabla',
          titulo: 'Radiación solar por zona (kWh/m²/día)',
          columnas: ['Zona', 'Radiación'],
          filas: [
            ['Norte Grande', '6,5 a 8'],
            ['Zona Central', '4,5 a 5,5'],
            ['Zona Sur', '3 a 4,5'],
          ],
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'Horas Solares Pico (HSP)',
          texto: 'Cantidad equivalente de horas con irradiancia de 1.000 W/m². Ejemplos: Copiapó 6,8 HSP · Santiago 5,2 HSP · Puerto Montt 3,5 HSP.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué zona de Chile presenta la mayor radiación solar?',
          opciones: ['Zona Sur', 'Zona Central', 'Norte Grande', 'Zona Austral'],
          correcta: 2,
          explicacion: 'El Norte Grande recibe entre 6,5 y 8 kWh/m²/día.',
        },
      ],
    },
    {
      leccionId: 'lec-9-2',
      titulo: 'Efecto fotovoltaico y paneles',
      minutos: 25,
      bloques: [
        {
          tipo: 'ordenar',
          titulo: 'Ordena el principio de funcionamiento',
          items: ['La radiación incide sobre la celda', 'Los fotones liberan electrones', 'Se genera corriente continua (CC)', 'La energía se conduce al inversor'],
        },
        {
          tipo: 'checklist',
          titulo: 'Componentes de un panel',
          items: ['Vidrio templado.', 'Encapsulante EVA.', 'Celdas fotovoltaicas.', 'Backsheet.', 'Marco de aluminio.'],
        },
        {
          tipo: 'tarjetas',
          titulo: 'Tecnologías de paneles',
          items: [
            { titulo: 'Monocristalino', etiqueta: '20% a 24%', detalle: ['Mayor eficiencia.', 'Menor superficie requerida.'] },
            { titulo: 'Policristalino', etiqueta: '15% a 18%', detalle: ['Menor costo.'] },
            { titulo: 'Bifacial', etiqueta: 'Ambas caras', detalle: ['Genera energía por ambas caras.', 'Uso: plantas solares y estacionamientos.'] },
          ],
        },
      ],
    },
    {
      leccionId: 'lec-9-3',
      titulo: 'Inversores, MPPT y baterías',
      minutos: 30,
      bloques: [
        { tipo: 'texto', texto: 'El inversor transforma la corriente continua (CC) de los paneles en corriente alterna (CA).' },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de inversor',
          items: [
            { titulo: 'On Grid', etiqueta: 'Conectado a red', detalle: ['Sin baterías.', 'Sistema más económico.', 'Permite Net Billing.'] },
            { titulo: 'Off Grid', etiqueta: 'Aislado', detalle: ['Utiliza baterías.', 'Operación autónoma.'] },
            { titulo: 'Híbrido', etiqueta: 'Red + paneles + baterías', detalle: ['Combina red eléctrica, paneles solares y baterías.'] },
          ],
        },
        {
          tipo: 'nota',
          variante: 'tip',
          titulo: 'MPPT — Maximum Power Point Tracking',
          texto: 'Sistema electrónico que busca permanentemente el punto de máxima potencia del panel: mayor producción, mejor rendimiento y menor pérdida energética.',
        },
        {
          tipo: 'tabla',
          titulo: 'Baterías',
          columnas: ['Tecnología', 'Ventajas', 'Desventajas'],
          filas: [
            ['Plomo ácido', 'Bajo costo', 'Menor vida útil'],
            ['Litio', 'Alta eficiencia, mayor vida útil, menor mantenimiento', '— (tecnología predominante actual)'],
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Relaciona cada concepto',
          pares: [
            { a: 'Inversor', b: 'Convierte CC en CA' },
            { a: 'MPPT', b: 'Busca el punto de máxima potencia' },
            { a: 'Batería', b: 'Almacena energía' },
            { a: 'On Grid', b: 'Permite Net Billing sin baterías' },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué transforma el inversor?',
          opciones: ['CA en CC', 'CC en CA', 'CA en CA', 'CC en CC'],
          correcta: 1,
          explicacion: 'El inversor convierte la corriente continua de los paneles en corriente alterna.',
        },
      ],
    },
    {
      leccionId: 'lec-9-4',
      titulo: 'Net Billing — Ley 20.571',
      minutos: 20,
      bloques: [
        {
          tipo: 'texto',
          texto: 'La Ley 20.571 (Net Billing / generación distribuida) permite inyectar los excedentes de energía a la red pública.',
        },
        {
          tipo: 'ordenar',
          titulo: 'Flujo operacional',
          items: ['Paneles', 'Inversor', 'Consumo propio', 'Excedentes a la red pública'],
        },
        {
          tipo: 'lista',
          titulo: 'Beneficios',
          estilo: 'check',
          items: ['Reducción de la cuenta eléctrica.', 'Aprovechamiento de excedentes.', 'Retorno económico.'],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué ley regula el Net Billing en Chile?',
          opciones: ['Ley 19.300', 'Ley 20.571', 'DS N°8', 'RIC 02'],
          correcta: 1,
          explicacion: 'La Ley 20.571 regula la generación distribuida (Net Billing).',
        },
      ],
    },
    {
      leccionId: 'lec-9-5',
      titulo: 'Diseño y cálculo de generación',
      minutos: 35,
      bloques: [
        {
          tipo: 'ordenar',
          titulo: 'Etapas del diseño FV',
          items: [
            'Levantamiento de consumo',
            'Determinación de HSP',
            'Selección de paneles',
            'Selección de inversor',
            'Selección de protecciones',
            'Diseño estructural',
            'Diseño eléctrico',
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Energía generada',
          expresion: 'E = P instalada × HSP × η',
          variables: [
            { simbolo: 'E', significado: 'Energía diaria (kWh/día)' },
            { simbolo: 'P', significado: 'Potencia instalada (kWp)' },
            { simbolo: 'HSP', significado: 'Horas solares pico' },
            { simbolo: 'η', significado: 'Rendimiento global' },
          ],
          nota: 'Ejemplo: 10 kWp × 5,5 HSP × 0,80 = 44 kWh/día.',
        },
        { tipo: 'calculadora', calculadora: 'fotovoltaico' },
        {
          tipo: 'tabla',
          titulo: 'Casos del manual',
          columnas: ['Caso', 'Consumo', 'Paneles', 'Inversor', 'Generación'],
          filas: [
            ['Residencial Santiago', '1.200 kWh/mes', '18 × 550 W (9,9 kWp)', '10 kW On Grid', '≈ 1.350 kWh/mes'],
            ['Industrial', '8.000 kWh/mes', '90 × 550 W (49,5 kWp)', '50 kW trifásico', '6.500 a 8.000 kWh/mes'],
            ['Vivienda Copiapó (100%)', '900 kWh/mes', '13 × 550 W (≈ 7 kWp)', '8 kW', '≈ 13.000 kWh/año'],
          ],
        },
      ],
    },
    {
      leccionId: 'lec-9-6',
      titulo: 'Protecciones, puesta a tierra y PVsyst',
      minutos: 30,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Protecciones fotovoltaicas',
          items: [
            { titulo: 'Lado CC', detalle: ['Fusibles CC.', 'Seccionadores CC.', 'DPS CC.'] },
            { titulo: 'Lado CA', detalle: ['Disyuntores.', 'Diferenciales.', 'DPS CA.'] },
          ],
        },
        {
          tipo: 'tabla',
          titulo: 'DPS fotovoltaicos',
          columnas: ['Tipo', 'Uso'],
          filas: [
            ['Tipo 1', 'Instalaciones con riesgo de descargas atmosféricas'],
            ['Tipo 2', 'Uso habitual'],
          ],
          nota: 'Protegen inversores, módulos y equipos electrónicos.',
        },
        {
          tipo: 'lista',
          titulo: 'Puesta a tierra FV — elementos a conectar',
          items: ['Estructuras.', 'Inversores.', 'Tableros.', 'DPS.'],
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'PVsyst',
          texto: 'Software de simulación FV: simulación energética, análisis de sombras, producción anual y evaluación económica. Parámetros: ubicación, radiación, paneles, inversor y pérdidas.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué software se utiliza para simulación fotovoltaica?',
          opciones: ['AutoCAD', 'PVsyst', 'Excel', 'Dialux'],
          correcta: 1,
          explicacion: 'PVsyst simula producción, sombras y evaluación económica de sistemas FV.',
        },
      ],
    },
  ],
  resumen: [
    'Comprender el recurso solar.',
    'Seleccionar paneles fotovoltaicos e inversores.',
    'Diseñar sistemas On Grid, Off Grid e Híbridos.',
    'Aplicar Net Billing.',
    'Diseñar protecciones FV y puestas a tierra.',
    'Utilizar PVsyst y desarrollar proyectos FV completos.',
  ],
  laboratorios: [
    'Identificación de módulos FV.',
    'Medición de tensión y corriente CC.',
    'Configuración de inversor.',
    'Configuración MPPT.',
    'Instalación de DPS FV.',
    'Diseño de sistema residencial.',
    'Diseño de sistema industrial.',
    'Simulación en PVsyst.',
  ],
  taller: {
    titulo: 'Proyecto fotovoltaico completo',
    descripcion: 'Diseñar un sistema FV para vivienda de 900 kWh/mes en Copiapó con el objetivo de cubrir el 100% del consumo.',
    entregables: [
      'Levantamiento energético.',
      'Memoria de cálculo.',
      'Plano de distribución.',
      'Diagrama unilineal.',
      'Selección de paneles e inversor.',
      'Diseño de protecciones y puesta a tierra.',
      'Simulación PVsyst.',
      'Presupuesto, Carta Gantt y evaluación económica.',
    ],
  },
};
