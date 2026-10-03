import type { ContenidoModulo } from '../../types';

/** Módulo 5 — Fuente: MANUAL DEL ALUMNO, Módulo 5 (RIC 02). */
export const M5: ContenidoModulo = {
  moduloId: 'mod-5',
  introduccion:
    'Aprenderás a diseñar, construir, seleccionar, instalar e inspeccionar tableros eléctricos de baja tensión conforme al DS N°8 y al RIC 02.',
  lecciones: [
    {
      leccionId: 'lec-5-1',
      titulo: 'Qué es un tablero y cómo se clasifica',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'Un tablero eléctrico es el conjunto de equipos destinados a distribuir energía, proteger circuitos, comandar cargas, medir variables eléctricas y aislar sectores de una instalación. Es el centro de control de cualquier sistema eléctrico.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Clasificación constructiva',
          items: [
            { titulo: 'Cajas', etiqueta: 'Domiciliario', detalle: ['Tableros pequeños e instalaciones domiciliarias.', 'Montaje embutido o sobrepuesto.'] },
            { titulo: 'Gabinetes', etiqueta: 'Comercio y edificios', detalle: ['Montaje embutido o sobrepuesto.'] },
            { titulo: 'Armarios', etiqueta: 'Industria', detalle: ['Autosoportantes y anclados al piso.', 'Gran capacidad; centros de control.'] },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Clasificación según función',
          instruccion: 'Relaciona cada sigla con su función.',
          pares: [
            { a: 'TG', b: 'Recibe la alimentación desde el empalme' },
            { a: 'TGA', b: 'Distribuye energía a sectores específicos' },
            { a: 'TD', b: 'Distribuye energía a circuitos finales' },
            { a: 'CCM', b: 'Controla motores eléctricos' },
            { a: 'Tablero de transferencia', b: 'Selecciona red normal o grupo electrógeno' },
          ],
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'Tableros fotovoltaicos',
          texto: 'Incorporan protecciones CC, protecciones CA, DPS y seccionadores.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué RIC regula los tableros eléctricos?',
          opciones: ['RIC 01', 'RIC 02', 'RIC 03', 'RIC 10'],
          correcta: 1,
          explicacion: 'RIC 02 — Tableros eléctricos.',
        },
      ],
    },
    {
      leccionId: 'lec-5-2',
      titulo: 'Corte omnipolar y protecciones',
      minutos: 35,
      bloques: [
        {
          tipo: 'nota',
          variante: 'importante',
          titulo: 'Corte omnipolar (RIC 02)',
          texto:
            'Desconexión simultánea de TODOS los conductores activos. Objetivos: seguridad, mantenimiento y aislamiento total. Se aplica en tableros generales, de distribución, sistemas fotovoltaicos e instalaciones industriales.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Dispositivos de protección',
          items: [
            {
              titulo: 'Disyuntor termomagnético',
              etiqueta: 'Sobrecarga + cortocircuito',
              detalle: ['Protección térmica → sobrecarga.', 'Protección magnética → cortocircuito.'],
            },
            { titulo: 'Interruptor diferencial', etiqueta: 'Fugas a tierra', detalle: ['Protección de personas.', 'Protección contra incendios.'] },
            { titulo: 'DPS', etiqueta: 'Sobretensiones', detalle: ['Tipos 1, 2 y 3.'] },
            { titulo: 'AFDD', etiqueta: 'Fallas de arco', detalle: ['Detecta arcos serie y paralelos.', 'Previene incendios y sobrecalentamientos.'] },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Falla ↔ dispositivo que protege',
          pares: [
            { a: 'Sobrecarga y cortocircuito', b: 'Disyuntor termomagnético' },
            { a: 'Fuga a tierra', b: 'Diferencial' },
            { a: 'Sobretensión transitoria', b: 'DPS' },
            { a: 'Arco eléctrico', b: 'AFDD' },
          ],
        },
        {
          tipo: 'tabla',
          titulo: 'Tipos de diferencial',
          columnas: ['Tipo', 'Detecta', 'Recomendado para'],
          filas: [
            ['AC', 'Alterna sinusoidal', 'Cargas convencionales'],
            ['A', 'Alterna y pulsante', 'Computación, electrónica, sistemas FV'],
            ['B', 'Continua y alterna', 'Inversores, cargadores EV, variadores'],
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué significa corte omnipolar?',
          opciones: ['Cortar sólo la fase', 'Cortar fase y tierra', 'Cortar todos los conductores activos', 'Cortar sólo el neutro'],
          correcta: 2,
          explicacion: 'Omnipolar = desconexión simultánea de todos los conductores activos.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué dispositivo protege contra fallas de arco?',
          opciones: ['DPS', 'Diferencial', 'AFDD', 'Contactor'],
          correcta: 2,
          explicacion: 'El AFDD (dispositivo detector de fallas de arco) detecta arcos serie y paralelos.',
        },
      ],
    },
    {
      leccionId: 'lec-5-3',
      titulo: 'Identificación, rotulación y diagrama unilineal',
      minutos: 20,
      bloques: [
        {
          tipo: 'checklist',
          titulo: 'Todo tablero debe disponer de',
          items: ['Cuadro de circuitos.', 'Identificación de protecciones.', 'Numeración de circuitos.', 'Diagrama unilineal actualizado.'],
        },
        {
          tipo: 'lista',
          titulo: 'Información mínima del diagrama unilineal',
          estilo: 'check',
          items: ['Corriente nominal.', 'Calibre de conductores.', 'Potencia instalada.', 'Protección asociada.'],
        },
        {
          tipo: 'texto',
          texto: 'El diagrama unilineal representa gráficamente alimentadores, protecciones y circuitos. Debe mantenerse actualizado dentro del tablero.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué documento debe mantenerse dentro del tablero?',
          opciones: ['Factura de compra', 'Diagrama unilineal actualizado', 'Contrato del instalador', 'Boleta de la distribuidora'],
          correcta: 1,
          explicacion: 'El RIC 02 exige diagrama unilineal actualizado y rotulación de circuitos.',
        },
      ],
    },
    {
      leccionId: 'lec-5-4',
      titulo: 'Grados IP e IK, reserva e instrumentación',
      minutos: 30,
      bloques: [
        {
          tipo: 'tabla',
          titulo: 'Grado IP mínimo según ubicación',
          columnas: ['Ubicación', 'IP mínimo'],
          filas: [
            ['Interior', 'IP41'],
            ['Exterior bajo techo', 'IP44'],
            ['Exterior sin techo', 'IP54'],
          ],
          nota: 'No se aceptan tableros abiertos.',
        },
        { tipo: 'calculadora', calculadora: 'gradoIP' },
        {
          tipo: 'tarjetas',
          titulo: 'Otros requisitos del RIC 02',
          items: [
            { titulo: 'Grado IK', etiqueta: 'Mínimo IK07', detalle: ['Indica la resistencia al impacto mecánico.'] },
            { titulo: 'Reserva de capacidad', etiqueta: '25%', detalle: ['Espacio disponible en riel DIN, barras y canaletas para ampliaciones futuras.'] },
            { titulo: 'Instrumentación', etiqueta: 'Tableros > 100 A', detalle: ['Voltímetro.', 'Amperímetro.', 'Indicadores de presencia de tensión.'] },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es el IP mínimo para un tablero interior?',
          opciones: ['IP20', 'IP30', 'IP41', 'IP54'],
          correcta: 2,
          explicacion: 'Interior IP41 · exterior bajo techo IP44 · exterior sin techo IP54.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué porcentaje de reserva debe considerar un tablero nuevo?',
          opciones: ['10%', '15%', '25%', '50%'],
          correcta: 2,
          explicacion: 'Se exige 25% de espacio disponible para ampliaciones.',
        },
      ],
    },
    {
      leccionId: 'lec-5-5',
      titulo: 'Tableros domiciliarios, industriales y control de calidad',
      minutos: 30,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Composición típica',
          items: [
            {
              titulo: 'Tablero domiciliario',
              detalle: [
                'Circuitos: alumbrado, enchufes generales, cocina, lavadora, aire acondicionado.',
                'Protecciones: disyuntor general, diferencial 30 mA, disyuntores por circuito.',
              ],
            },
            {
              titulo: 'Tablero industrial',
              detalle: ['Interruptor general.', 'Barras de distribución.', 'Contactores.', 'Relés térmicos.', 'Variadores.', 'Instrumentación.'],
            },
          ],
        },
        {
          tipo: 'checklist',
          titulo: 'Verificaciones antes de energizar',
          items: ['Apriete de terminales.', 'Continuidad.', 'Aislación.', 'Rotulación.', 'Operación de protecciones.'],
        },
        {
          tipo: 'nota',
          variante: 'info',
          texto: 'Para tableros superiores a 100 A se requieren verificaciones específicas según RIC 02 e IEC 61439.',
        },
        {
          tipo: 'texto',
          texto: 'Caso práctico: diseña el tablero de una vivienda de 12 kW a 220 V con circuitos de alumbrado, enchufes, cocina, lavadora y aire acondicionado. Usa el cuadro de cargas para seleccionar alimentador y disyuntor general.',
        },
        { tipo: 'calculadora', calculadora: 'cuadroCargas' },
      ],
    },
  ],
  resumen: [
    'Diseñar tableros eléctricos aplicando RIC 02.',
    'Seleccionar protecciones y aplicar corte omnipolar.',
    'Implementar diferenciales y DPS.',
    'Interpretar grados IP e IK.',
    'Elaborar diagramas unilineales.',
    'Verificar tableros conforme a normativa SEC.',
  ],
  laboratorios: [
    'Identificación de componentes de tablero.',
    'Montaje de tablero domiciliario.',
    'Cableado sobre riel DIN.',
    'Instalación de diferencial.',
    'Instalación de DPS.',
    'Diseño de tablero fotovoltaico.',
    'Verificación de tablero según RIC 02.',
    'Prueba funcional completa.',
  ],
  taller: {
    titulo: 'Caso práctico',
    descripcion: 'Diseño de tablero residencial: carga total 12 kW, alimentación 220 V; circuitos de alumbrado, enchufes, cocina, lavadora y aire acondicionado.',
    entregables: ['Alimentador.', 'Disyuntor general.', 'Diferencial.', 'Disyuntores derivados.'],
  },
};
