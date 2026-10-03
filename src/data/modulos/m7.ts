import type { ContenidoModulo } from '../../types';

/** Módulo 7 — Fuente: MANUAL DEL ALUMNO, Módulo 7 (RIC 10). */
export const M7: ContenidoModulo = {
  moduloId: 'mod-7',
  introduccion:
    'Aprenderás a diseñar, calcular, ejecutar y verificar instalaciones eléctricas residenciales conforme al DS N°8 y RIC 10, terminando con el proyecto de una vivienda de 150 m².',
  lecciones: [
    {
      leccionId: 'lec-7-1',
      titulo: 'Normativa y etapas del diseño',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'Una instalación domiciliaria es el conjunto de conductores, canalizaciones, protecciones, tableros y equipos que suministran energía a una vivienda. Debe garantizar seguridad de las personas, protección de bienes, continuidad de servicio, facilidad de mantenimiento y posibilidad de ampliaciones futuras.',
        },
        {
          tipo: 'tabla',
          titulo: 'Reglamentos aplicables',
          columnas: ['Reglamento', 'Materia'],
          filas: [
            ['DS N°8', 'Exigencias mínimas de seguridad'],
            ['RIC 01', 'Empalmes'],
            ['RIC 02', 'Tableros'],
            ['RIC 03', 'Alimentadores'],
            ['RIC 04', 'Conductores'],
            ['RIC 05', 'Protección contra tensiones peligrosas'],
            ['RIC 06', 'Puesta a tierra'],
            ['RIC 10', 'Instalaciones de uso general'],
            ['RIC 18', 'Presentación de proyectos'],
            ['RIC 19', 'Puesta en servicio'],
          ],
        },
        {
          tipo: 'ordenar',
          titulo: 'Ordena las etapas del diseño eléctrico',
          items: [
            'Levantamiento arquitectónico',
            'Determinación de cargas',
            'Definición de circuitos',
            'Dimensionamiento de conductores',
            'Selección de protecciones',
            'Diseño del tablero',
            'Diseño de puesta a tierra',
            'Elaboración de planos',
            'Memoria de cálculo',
          ],
        },
      ],
    },
    {
      leccionId: 'lec-7-2',
      titulo: 'Circuitos de alumbrado, enchufes y especiales',
      minutos: 30,
      bloques: [
        {
          tipo: 'tabla',
          titulo: 'Resumen de circuitos domiciliarios',
          columnas: ['Circuito', 'Conductor Cu', 'Protección', 'Observación'],
          filas: [
            ['Alumbrado', '1,5 mm²', '10 A o 16 A', 'Distribución uniforme y sectorización'],
            ['Enchufes', '2,5 mm²', '16 A o 20 A', 'Separar cocina, dormitorios, living y exterior'],
            ['Cocina eléctrica', '6 mm²', '32 A', 'Circuito exclusivo'],
            ['Horno eléctrico', '—', '—', 'Circuito exclusivo'],
            ['Aire acondicionado', '—', '—', 'Circuito exclusivo'],
            ['Termo eléctrico', '—', '—', 'Circuito exclusivo'],
            ['Cargador de vehículo eléctrico', '—', '—', 'Circuito dedicado + diferencial tipo A o B'],
          ],
          nota: 'Tensión de servicio: 220 V.',
        },
        {
          tipo: 'emparejar',
          titulo: 'Circuito ↔ sección de conductor',
          pares: [
            { a: 'Alumbrado', b: '1,5 mm²' },
            { a: 'Enchufes', b: '2,5 mm²' },
            { a: 'Cocina eléctrica', b: '6 mm²' },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué sección mínima se utiliza habitualmente para circuitos de enchufes?',
          opciones: ['1,0 mm²', '1,5 mm²', '2,5 mm²', '4 mm²'],
          correcta: 2,
          explicacion: 'Enchufes: 2,5 mm² Cu con protección de 16 A o 20 A.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué color identifica normalmente al conductor de protección (tierra)?',
          opciones: ['Rojo', 'Azul', 'Verde/amarillo', 'Negro'],
          correcta: 2,
          explicacion: 'El conductor de protección se identifica con verde/amarillo.',
        },
      ],
    },
    {
      leccionId: 'lec-7-3',
      titulo: 'Cuadro de cargas y balance',
      minutos: 30,
      bloques: [
        { tipo: 'texto', texto: 'El cuadro de cargas determina potencia instalada, corriente y demanda máxima.' },
        {
          tipo: 'tabla',
          titulo: 'Ejemplo del manual',
          columnas: ['Circuito', 'Potencia'],
          filas: [
            ['Alumbrado', '1.200 W'],
            ['Enchufes', '3.000 W'],
            ['Cocina', '6.000 W'],
            ['Lavadora', '1.500 W'],
            ['Aire acondicionado', '2.500 W'],
            ['Total', '14.200 W'],
          ],
        },
        { tipo: 'calculadora', calculadora: 'cuadroCargas' },
        {
          tipo: 'tarjetas',
          titulo: 'Balance de cargas',
          instruccion: 'Distribuir cargas uniformemente reduce caída de tensión y calentamiento, y mejora el rendimiento.',
          items: [
            { titulo: 'Monofásico', detalle: ['Balance simplificado entre circuitos.'] },
            { titulo: 'Trifásico', detalle: ['Distribución equilibrada entre las tres fases.'] },
          ],
        },
      ],
    },
    {
      leccionId: 'lec-7-4',
      titulo: 'Tablero, canalizaciones y puesta a tierra residencial',
      minutos: 25,
      bloques: [
        {
          tipo: 'checklist',
          titulo: 'Componentes del tablero domiciliario',
          items: ['Disyuntor general.', 'Diferencial 30 mA.', 'Disyuntores derivados.', 'DPS.', 'Barra de neutro.', 'Barra de tierra.'],
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'Ejemplo',
          texto: 'Disyuntor general 50 A · diferencial 40 A – 30 mA · circuitos de alumbrado, enchufes, cocina y aire acondicionado.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Canalizaciones y tierra',
          items: [
            { titulo: 'Canalizaciones', detalle: ['Opciones: PVC conduit, EMT, canaletas.', 'Minimizar curvas.', 'Facilitar mantenimiento.', 'Considerar futuras ampliaciones.'] },
            { titulo: 'Puesta a tierra residencial', etiqueta: 'R < 10 Ω', detalle: ['Varilla Copperweld 5/8" × 2,4 m.', 'Conductor de cobre desnudo 16 mm².'] },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué protección se utiliza para proteger personas?',
          opciones: ['DPS', 'Fusible', 'Diferencial', 'Contactor'],
          correcta: 2,
          explicacion: 'El diferencial de 30 mA protege a las personas contra contactos.',
        },
      ],
    },
    {
      leccionId: 'lec-7-5',
      titulo: 'Memoria de cálculo, plano y simbología',
      minutos: 25,
      bloques: [
        {
          tipo: 'ordenar',
          titulo: 'Contenido de una memoria de cálculo',
          items: [
            'Descripción del proyecto',
            'Normativa aplicable',
            'Cuadro de cargas',
            'Demanda máxima',
            'Cálculo de alimentadores',
            'Protecciones',
            'Puesta a tierra',
            'Verificación normativa',
          ],
        },
        {
          tipo: 'checklist',
          titulo: 'Información mínima del plano eléctrico',
          items: ['Luminarias.', 'Interruptores.', 'Enchufes.', 'Tablero.', 'Canalizaciones.', 'Circuitos.', 'Tierra de protección.'],
        },
        {
          tipo: 'emparejar',
          titulo: 'Simbología básica',
          pares: [
            { a: '○', b: 'Luminaria' },
            { a: 'S', b: 'Interruptor' },
            { a: 'E', b: 'Enchufe' },
            { a: 'TG', b: 'Tablero General' },
            { a: 'TP', b: 'Tierra de Protección' },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué documento resume todos los cálculos del proyecto?',
          opciones: ['Presupuesto', 'Memoria de cálculo', 'Factura', 'Plano de ubicación'],
          correcta: 1,
          explicacion: 'La memoria de cálculo justifica técnicamente el diseño.',
        },
      ],
    },
    {
      leccionId: 'lec-7-6',
      titulo: 'Proyecto integrador: vivienda de 150 m²',
      minutos: 35,
      bloques: [
        {
          tipo: 'texto',
          texto: 'Vivienda unifamiliar de 150 m² con living-comedor, cocina, lavandería, 3 dormitorios, 2 baños, terraza y estacionamiento.',
        },
        {
          tipo: 'ordenar',
          titulo: 'Pasos del proyecto',
          items: [
            'Determinar cargas',
            'Diseñar circuitos',
            'Seleccionar protecciones',
            'Diseñar tablero',
            'Dimensionar alimentador',
            'Diseñar puesta a tierra',
            'Elaborar plano',
            'Generar memoria de cálculo',
          ],
        },
        {
          tipo: 'ejemplo',
          titulo: 'Caso práctico resuelto',
          datos: ['Potencia instalada: 15 kW', 'Voltaje: 220 V'],
          pasos: [
            { titulo: 'Corriente instalada', detalle: 'I = 15.000 / 220 ≈ 68 A' },
            { titulo: 'Demanda máxima', detalle: 'Aplicando factor de demanda: 45 A' },
            { titulo: 'Alimentador', detalle: 'Cu 16 mm²' },
            { titulo: 'Protección general', detalle: '63 A' },
            { titulo: 'Diferencial', detalle: '63 A – 30 mA' },
            { titulo: 'Puesta a tierra', detalle: 'Varilla Copperweld 2,4 m' },
          ],
          resultado: 'Alimentador 16 mm² · Disyuntor 63 A · Diferencial 63 A – 30 mA',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué circuitos deben ser exclusivos?',
          opciones: ['Sólo el alumbrado', 'Cocina eléctrica, aire acondicionado, horno y otras cargas importantes', 'Todos los enchufes del living', 'Ninguno'],
          correcta: 1,
          explicacion: 'Las cargas importantes (cocina, horno, A/C, termo, cargador EV) llevan circuito exclusivo.',
        },
      ],
    },
  ],
  resumen: [
    'Diseñar instalaciones domiciliarias.',
    'Elaborar cuadros de carga y balancear circuitos.',
    'Seleccionar protecciones y diseñar tableros.',
    'Diseñar puesta a tierra.',
    'Elaborar planos eléctricos y memorias de cálculo.',
    'Desarrollar proyectos reales conforme a normativa SEC.',
  ],
  laboratorios: [
    'Diseño de circuito de alumbrado.',
    'Diseño de circuito de enchufes.',
    'Dimensionamiento de conductores.',
    'Diseño de tablero domiciliario.',
    'Diseño de puesta a tierra.',
    'Plano eléctrico en AutoCAD.',
    'Memoria de cálculo.',
    'Proyecto completo de vivienda.',
  ],
  taller: {
    titulo: 'Proyecto integrador',
    descripcion: 'Vivienda unifamiliar de 150 m² (living-comedor, cocina, lavandería, 3 dormitorios, 2 baños, terraza y estacionamiento).',
    entregables: ['Cuadro de cargas.', 'Circuitos.', 'Protecciones.', 'Tablero.', 'Alimentador.', 'Puesta a tierra.', 'Plano.', 'Memoria de cálculo.'],
  },
};
