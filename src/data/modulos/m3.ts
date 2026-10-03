import type { ContenidoModulo } from '../../types';

/** Módulo 3 — Fuente: MANUAL DEL ALUMNO, Módulo 3. */
export const M3: ContenidoModulo = {
  moduloId: 'mod-3',
  introduccion:
    'Aprenderás a seleccionar, dimensionar e instalar conductores, canalizaciones y alimentadores conforme al DS N°8, RIC 03 y RIC 04, garantizando seguridad, eficiencia y cumplimiento normativo.',
  lecciones: [
    {
      leccionId: 'lec-3-1',
      titulo: 'Conductores, materiales y aislación',
      minutos: 30,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'Los conductores eléctricos transportan corriente desde una fuente de alimentación hacia una carga, permitiendo el flujo de electrones con la menor pérdida de energía posible.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Materiales conductores',
          items: [
            {
              titulo: 'Cobre',
              etiqueta: 'Conductividad 100%',
              detalle: ['Alta conductividad eléctrica.', 'Excelente resistencia mecánica.', 'Alta resistencia a la corrosión.', 'Fácil instalación.', 'Uso: viviendas, comercio, industria, sistemas FV.'],
            },
            {
              titulo: 'Aluminio',
              etiqueta: 'Conductividad 61%',
              detalle: ['Menor peso.', 'Menor costo.', 'Menor conductividad.', 'Uso: alimentadores, redes de distribución, grandes instalaciones.'],
            },
          ],
        },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de conductor',
          items: [
            { titulo: 'Sólido', etiqueta: 'Un solo hilo', detalle: ['Ventajas: bajo costo, fácil terminación.', 'Desventaja: menor flexibilidad.', 'Uso: instalaciones fijas.'] },
            { titulo: 'Flexible', etiqueta: 'Múltiples filamentos', detalle: ['Ventajas: alta flexibilidad, fácil montaje.', 'Uso: tableros, equipos móviles, automatización.'] },
          ],
        },
        {
          tipo: 'tabla',
          titulo: 'Aislación de conductores',
          columnas: ['Aislación', 'Temperatura máx.', 'Aplicaciones'],
          filas: [
            ['PVC', '70 °C', 'Instalaciones domiciliarias'],
            ['XLPE', '90 °C', 'Industria, alimentadores, fotovoltaico'],
            ['EPR', '—', 'Minería, ambientes severos'],
          ],
          nota: 'La aislación evita contactos directos entre conductores y personas.',
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'Secciones normalizadas (mm²)',
          texto: '1,5 · 2,5 · 4 · 6 · 10 · 16 · 25 · 35 · 50 · 70 · 95 · 120. La sección es el área transversal del conductor y se expresa en mm².',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué aislación soporta normalmente 90 °C?',
          opciones: ['PVC', 'XLPE', 'Goma natural', 'Papel'],
          correcta: 1,
          explicacion: 'XLPE trabaja hasta 90 °C; el PVC hasta 70 °C.',
        },
      ],
    },
    {
      leccionId: 'lec-3-2',
      titulo: 'Ampacidad y factores de corrección',
      minutos: 30,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'La ampacidad es la máxima corriente que puede transportar un conductor sin superar la temperatura permitida. Disminuye con la temperatura ambiente, el agrupamiento y el tipo de instalación.',
        },
        {
          tipo: 'tabla',
          titulo: 'Tabla referencial — Cobre aislación PVC 70 °C',
          columnas: ['Sección (mm²)', 'Corriente (A)'],
          filas: [
            ['1,5', '15'],
            ['2,5', '20'],
            ['4', '25'],
            ['6', '32'],
            ['10', '50'],
            ['16', '63'],
            ['25', '80'],
            ['35', '100'],
            ['50', '125'],
            ['70', '160'],
            ['95', '200'],
            ['120', '230'],
          ],
          nota: 'Valores referenciales del manual. Para proyectos reales verifica las tablas vigentes del RIC 04.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Factores de corrección',
          items: [
            { titulo: 'Temperatura ambiente', etiqueta: 'Ej.: 40 °C → 0,87', detalle: ['Temperatura de diseño: 30 °C.', 'Si la temperatura real es 40 °C, el factor es 0,87.'] },
            { titulo: 'Agrupamiento', etiqueta: 'Ej.: 4 circuitos → 0,80', detalle: ['Aplica cuando varios conductores comparten una misma canalización.', 'Con 4 circuitos el factor es 0,80.'] },
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Ampacidad corregida',
          expresion: 'I corregida = I tabla × Ft × Fa',
          variables: [
            { simbolo: 'Ft', significado: 'Factor por temperatura' },
            { simbolo: 'Fa', significado: 'Factor por agrupamiento' },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué factor afecta la capacidad de corriente de un conductor?',
          opciones: ['Temperatura', 'Agrupamiento', 'Tipo de instalación', 'Todas las anteriores'],
          correcta: 3,
          explicacion: 'La ampacidad depende de la temperatura ambiente, el agrupamiento y la forma de instalación.',
        },
      ],
    },
    {
      leccionId: 'lec-3-3',
      titulo: 'Caída de tensión',
      minutos: 30,
      bloques: [
        { tipo: 'texto', texto: 'La caída de tensión es la pérdida de voltaje que se produce por la resistencia del conductor. Aumenta con la longitud y la corriente, y disminuye al aumentar la sección.' },
        {
          tipo: 'formula',
          titulo: 'Caída de tensión monofásica',
          expresion: 'ΔV = 2 × I × L × R',
          variables: [
            { simbolo: 'I', significado: 'Corriente (A)' },
            { simbolo: 'L', significado: 'Longitud del tramo (m)' },
            { simbolo: 'R', significado: 'Resistencia del conductor por metro (Ω/m) = ρ / S; para cobre ρ ≈ 0,0178 Ω·mm²/m' },
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Caída de tensión trifásica',
          expresion: 'ΔV = √3 × I × L × R',
          variables: [{ simbolo: '√3', significado: '≈ 1,732' }],
        },
        {
          tipo: 'tabla',
          titulo: 'Límites recomendados',
          columnas: ['Tipo de circuito', 'Máximo'],
          filas: [
            ['Alumbrado', '3%'],
            ['Fuerza', '5%'],
            ['Instalación completa', '5%'],
          ],
        },
        { tipo: 'calculadora', calculadora: 'caidaTension' },
        {
          tipo: 'pregunta',
          enunciado: 'Un conductor cumple ampacidad pero excede la caída de tensión permitida. ¿La instalación cumple?',
          opciones: ['Sí, basta la ampacidad', 'No, debe cumplir ambos criterios', 'Sí, si la protección es adecuada', 'Depende del propietario'],
          correcta: 1,
          explicacion: 'La selección correcta exige verificar capacidad de corriente y límites de caída de tensión (RIC 03 y RIC 04).',
        },
      ],
    },
    {
      leccionId: 'lec-3-4',
      titulo: 'Cálculo de un alimentador paso a paso',
      minutos: 30,
      bloques: [
        {
          tipo: 'ejemplo',
          titulo: 'Ejemplo del manual',
          datos: ['Carga: 8.000 W', 'Voltaje: 220 V', 'Distancia: 30 m'],
          pasos: [
            { titulo: 'Paso 1 — Corriente', detalle: 'I = P / V = 8.000 / 220 = 36,4 A' },
            { titulo: 'Paso 2 — Selección preliminar', detalle: '6 mm² = 32 A → no cumple. 10 mm² = 50 A → cumple.' },
            { titulo: 'Paso 3 — Caída de tensión', detalle: 'ΔV = 2 × 36,4 × 30 × (0,0178/10) ≈ 3,9 V ≈ 1,8% → menor al límite.' },
            { titulo: 'Paso 4 — Protección', detalle: 'Debe ser ≥ corriente de diseño (36,4 A) y ≤ ampacidad del conductor (50 A) → 40 A.' },
          ],
          resultado: 'Conductor Cu 10 mm² · Protección 40 A',
        },
        { tipo: 'calculadora', calculadora: 'conductor' },
        {
          tipo: 'ordenar',
          titulo: 'Ordena el procedimiento de dimensionamiento',
          items: ['Calcular la corriente de la carga', 'Seleccionar conductor por ampacidad', 'Aplicar factores de corrección', 'Verificar caída de tensión', 'Seleccionar la protección'],
        },
      ],
    },
    {
      leccionId: 'lec-3-5',
      titulo: 'Canalizaciones y ocupación',
      minutos: 25,
      bloques: [
        { tipo: 'texto', texto: 'Las canalizaciones protegen mecánica y eléctricamente a los conductores.' },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de canalización',
          items: [
            { titulo: 'Tubo PVC', etiqueta: 'Viviendas y oficinas', detalle: ['Económico.', 'Resistente a la corrosión.'] },
            { titulo: 'EMT', etiqueta: 'Comercio e industria liviana', detalle: ['Tubo metálico liviano.'] },
            { titulo: 'IMC', etiqueta: 'Industria', detalle: ['Mayor resistencia mecánica.'] },
            { titulo: 'RMC', etiqueta: 'Minería y faenas', detalle: ['Acero galvanizado pesado.'] },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Canalización ↔ aplicación típica',
          pares: [
            { a: 'PVC', b: 'Viviendas y oficinas' },
            { a: 'EMT', b: 'Comercio e industria liviana' },
            { a: 'IMC', b: 'Industria' },
            { a: 'RMC', b: 'Minería y faenas' },
          ],
        },
        {
          tipo: 'tabla',
          titulo: 'Ocupación máxima de canalizaciones',
          columnas: ['N° de conductores', 'Ocupación máxima'],
          filas: [
            ['1 conductor', '53%'],
            ['2 conductores', '31%'],
            ['3 o más conductores', '40%'],
          ],
          nota: 'La cantidad de conductores debe permitir instalación segura, disipación térmica y facilidad de mantenimiento.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es la ocupación máxima de una canalización con 3 o más conductores?',
          opciones: ['31%', '40%', '53%', '75%'],
          correcta: 1,
          explicacion: '1 conductor: 53% · 2 conductores: 31% · 3 o más: 40%.',
        },
      ],
    },
    {
      leccionId: 'lec-3-6',
      titulo: 'Alimentadores y aplicación fotovoltaica',
      minutos: 20,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Alimentador vs. subalimentador',
          items: [
            { titulo: 'Alimentador', etiqueta: 'Empalme → Tablero General', detalle: ['Conecta el empalme con el tablero general.'] },
            { titulo: 'Subalimentador', etiqueta: 'TG → Tablero Secundario', detalle: ['Conecta el tablero general con un tablero secundario.'] },
          ],
        },
        {
          tipo: 'lista',
          titulo: 'Conductores para sistemas solares (norma EN 50618)',
          estilo: 'check',
          items: ['Resistencia UV.', 'Resistencia a la humedad.', 'Temperatura 90 °C.', 'Libres de halógenos.'],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué conductor une el empalme con el tablero general?',
          opciones: ['Subalimentador', 'Alimentador', 'Derivación', 'Acometida'],
          correcta: 1,
          explicacion: 'El alimentador va del empalme al tablero general; el subalimentador, del TG a un tablero secundario.',
        },
      ],
    },
  ],
  resumen: [
    'Seleccionar conductores.',
    'Calcular ampacidad y aplicar factores de corrección.',
    'Determinar la caída de tensión.',
    'Diseñar alimentadores.',
    'Seleccionar canalizaciones.',
    'Aplicar criterios SEC en instalaciones reales.',
  ],
  laboratorios: [
    'Identificación de conductores.',
    'Medición de resistencia eléctrica.',
    'Dimensionamiento de conductores.',
    'Cálculo de caída de tensión.',
    'Instalación de canalizaciones EMT.',
    'Construcción de alimentador domiciliario.',
  ],
  taller: {
    titulo: 'Taller integrador',
    descripcion: 'Diseñar la alimentación eléctrica completa de una vivienda de 120 m².',
    entregables: ['Cuadro de cargas.', 'Corriente total.', 'Alimentador.', 'Protección general.', 'Canalización.', 'Memoria de cálculo.'],
  },
};
