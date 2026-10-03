import type { ContenidoModulo } from '../../types';

/** Módulo 2 — Fuente: MANUAL DEL ALUMNO, Módulo 2. */
export const M2: ContenidoModulo = {
  moduloId: 'mod-2',
  introduccion:
    'Comprenderás las magnitudes eléctricas fundamentales, aplicarás la Ley de Ohm, calcularás potencia monofásica y trifásica, y analizarás circuitos serie, paralelo y mixtos con problemas tipo examen SEC.',
  lecciones: [
    {
      leccionId: 'lec-2-1',
      titulo: 'Magnitudes eléctricas fundamentales',
      minutos: 30,
      bloques: [
        { tipo: 'texto', texto: 'La electricidad es el movimiento ordenado de electrones a través de un conductor.' },
        {
          tipo: 'tarjetas',
          titulo: 'Las seis magnitudes que debes dominar',
          instruccion: 'Toca cada tarjeta para ver su símbolo, unidad, instrumento y un ejemplo.',
          items: [
            { titulo: 'Carga eléctrica', etiqueta: 'Q · Coulomb (C)', resumen: 'Propiedad física de la materia.', detalle: ['Símbolo: Q', 'Unidad: Coulomb (C)'] },
            {
              titulo: 'Corriente',
              etiqueta: 'I · Ampere (A)',
              resumen: 'Flujo de electrones que circula por un conductor.',
              detalle: ['Símbolo: I', 'Unidad: Ampere (A)', 'Instrumento: amperímetro (o pinza amperimétrica sin abrir el circuito)', 'Ejemplo: una ducha eléctrica consume 25 A.'],
            },
            {
              titulo: 'Voltaje',
              etiqueta: 'V · Volt (V)',
              resumen: 'Fuerza que impulsa a los electrones.',
              detalle: ['Símbolo: V', 'Unidad: Volt (V)', 'Instrumento: voltímetro', 'Enchufe domiciliario: 220 V · Sistema trifásico: 380 V'],
            },
            {
              titulo: 'Resistencia',
              etiqueta: 'R · Ohm (Ω)',
              resumen: 'Oposición al paso de la corriente.',
              detalle: ['Símbolo: R', 'Unidad: Ohm (Ω)', 'Instrumento: ohmímetro (siempre con el circuito desenergizado)', 'Ejemplo: un calefactor transforma energía eléctrica en calor.'],
            },
            {
              titulo: 'Potencia',
              etiqueta: 'P · Watt (W)',
              resumen: 'Velocidad con que se consume energía.',
              detalle: ['Símbolo: P', 'Unidad: Watt (W)', 'Instrumento: wattímetro', 'Potencia = Voltaje × Corriente'],
            },
            {
              titulo: 'Energía',
              etiqueta: 'E · kWh',
              resumen: 'Trabajo realizado por la potencia durante un tiempo.',
              detalle: ['Unidad: kWh', 'Un artefacto de 1000 W funcionando 1 hora consume 1 kWh.'],
            },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Magnitud ↔ unidad',
          pares: [
            { a: 'Corriente', b: 'Ampere (A)' },
            { a: 'Voltaje', b: 'Volt (V)' },
            { a: 'Resistencia', b: 'Ohm (Ω)' },
            { a: 'Potencia', b: 'Watt (W)' },
            { a: 'Energía', b: 'kWh' },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Magnitud ↔ instrumento de medida',
          pares: [
            { a: 'Voltaje', b: 'Voltímetro' },
            { a: 'Corriente', b: 'Amperímetro' },
            { a: 'Resistencia', b: 'Ohmímetro' },
            { a: 'Potencia', b: 'Wattímetro' },
          ],
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'Datos de la red chilena',
          texto: 'Tensión nominal domiciliaria: 220 V. Sistema trifásico: 380 V. Frecuencia de la red: 50 Hz.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué instrumento permite medir corriente sin abrir el circuito?',
          opciones: ['Megóhmetro', 'Pinza amperimétrica', 'Voltímetro', 'Telurómetro'],
          correcta: 1,
          explicacion: 'La pinza amperimétrica mide la corriente por inducción, abrazando el conductor.',
        },
      ],
    },
    {
      leccionId: 'lec-2-2',
      titulo: 'Ley de Ohm',
      minutos: 35,
      bloques: [
        { tipo: 'texto', texto: 'La Ley de Ohm es uno de los principios más importantes de la electricidad: relaciona voltaje, corriente y resistencia.' },
        {
          tipo: 'formula',
          titulo: 'Ley de Ohm',
          expresion: 'V = I × R',
          variables: [
            { simbolo: 'V', significado: 'Voltaje (V)' },
            { simbolo: 'I', significado: 'Corriente (A)' },
            { simbolo: 'R', significado: 'Resistencia (Ω)' },
          ],
          despejes: ['I = V / R', 'R = V / I'],
          nota: 'Si el voltaje aumenta con R constante, la corriente aumenta. Si la resistencia aumenta con V constante, la corriente disminuye.',
        },
        { tipo: 'calculadora', calculadora: 'ohm' },
        {
          tipo: 'ejemplo',
          titulo: 'Ejercicio 1 — Calcular la corriente',
          datos: ['V = 220 V', 'R = 22 Ω'],
          pasos: [
            { titulo: 'Fórmula', detalle: 'I = V / R' },
            { titulo: 'Reemplazar', detalle: 'I = 220 / 22' },
          ],
          resultado: 'I = 10 A',
        },
        {
          tipo: 'ejemplo',
          titulo: 'Ejercicio 2 — Potencia de un motor',
          datos: ['I = 15 A', 'V = 220 V'],
          pasos: [
            { titulo: 'Fórmula', detalle: 'P = V × I' },
            { titulo: 'Reemplazar', detalle: 'P = 220 × 15 = 3.300 W' },
          ],
          resultado: 'P = 3,3 kW',
        },
        {
          tipo: 'ejemplo',
          titulo: 'Ejercicio 3 — Corriente de un calefactor',
          datos: ['P = 2.000 W', 'V = 220 V'],
          pasos: [
            { titulo: 'Fórmula', detalle: 'I = P / V' },
            { titulo: 'Reemplazar', detalle: 'I = 2.000 / 220' },
          ],
          resultado: 'I = 9,09 A',
        },
        {
          tipo: 'pregunta',
          enunciado: 'Un circuito tiene 220 V y una resistencia de 22 Ω. ¿Cuál es la corriente?',
          opciones: ['5 A', '10 A', '15 A', '20 A'],
          correcta: 1,
          explicacion: 'I = V/R = 220/22 = 10 A.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es la resistencia de una carga que consume 11 A a 220 V?',
          opciones: ['10 Ω', '15 Ω', '20 Ω', '25 Ω'],
          correcta: 2,
          explicacion: 'R = V/I = 220/11 = 20 Ω.',
        },
      ],
    },
    {
      leccionId: 'lec-2-3',
      titulo: 'Potencia monofásica, trifásica y energía',
      minutos: 35,
      bloques: [
        {
          tipo: 'formula',
          titulo: 'Potencia monofásica',
          expresion: 'P = V × I',
          variables: [
            { simbolo: 'P', significado: 'Potencia (W)' },
            { simbolo: 'V', significado: 'Voltaje (V)' },
            { simbolo: 'I', significado: 'Corriente (A)' },
          ],
          nota: 'Ejemplo: 220 V × 20 A = 4.400 W = 4,4 kW.',
        },
        {
          tipo: 'formula',
          titulo: 'Potencia trifásica',
          expresion: 'P = √3 × V × I × cosφ',
          variables: [
            { simbolo: 'V', significado: 'Voltaje línea-línea (V)' },
            { simbolo: 'I', significado: 'Corriente de línea (A)' },
            { simbolo: 'cosφ', significado: 'Factor de potencia' },
          ],
          nota: 'Se usa en industria, minería, grandes edificios y bombeo.',
        },
        {
          tipo: 'ejemplo',
          titulo: 'Ejemplo industrial',
          datos: ['V = 380 V', 'I = 50 A', 'cosφ = 0,9'],
          pasos: [
            { titulo: 'Fórmula', detalle: 'P = √3 × V × I × cosφ' },
            { titulo: 'Reemplazar', detalle: 'P = 1,732 × 380 × 50 × 0,9' },
            { titulo: 'Calcular', detalle: 'P ≈ 29.617 W' },
          ],
          resultado: 'P ≈ 29,6 kW',
        },
        { tipo: 'calculadora', calculadora: 'potencia' },
        {
          tipo: 'formula',
          titulo: 'Energía eléctrica',
          expresion: 'E = P × t',
          variables: [
            { simbolo: 'E', significado: 'Energía (kWh)' },
            { simbolo: 'P', significado: 'Potencia (kW)' },
            { simbolo: 't', significado: 'Tiempo (h)' },
          ],
          nota: 'Una lámpara de 100 W encendida 10 horas consume 1 kWh. Un equipo de 1 kW, 4 h diarias durante 30 días, consume 120 kWh.',
        },
        { tipo: 'calculadora', calculadora: 'energia' },
        {
          tipo: 'pregunta',
          enunciado: 'Un motor trifásico consume 30 A a 380 V con cosφ = 0,85. ¿Cuál es su potencia aproximada?',
          opciones: ['12 kW', '16,8 kW', '20 kW', '25 kW'],
          correcta: 1,
          explicacion: 'P = 1,732 × 380 × 30 × 0,85 ≈ 16.800 W.',
        },
      ],
    },
    {
      leccionId: 'lec-2-4',
      titulo: 'Factor de potencia',
      minutos: 20,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'El factor de potencia (cosφ) representa la eficiencia con que una instalación utiliza la energía eléctrica. Su rango va de 0 a 1 y el valor ideal es 1: toda la potencia suministrada se transforma en trabajo útil.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de carga',
          items: [
            { titulo: 'Cargas resistivas', etiqueta: 'cosφ ≈ 1', detalle: ['Estufas.', 'Hornos.', 'Resistencias.'] },
            { titulo: 'Cargas inductivas', etiqueta: 'cosφ < 1', detalle: ['Motores.', 'Bombas.', 'Transformadores.'] },
          ],
        },
        {
          tipo: 'lista',
          titulo: 'Consecuencias de un bajo factor de potencia',
          items: ['Mayor corriente para la misma potencia útil.', 'Mayor caída de tensión.', 'Pérdidas eléctricas.', 'Multas de la distribuidora.'],
        },
        {
          tipo: 'nota',
          variante: 'tip',
          titulo: 'Corrección',
          texto:
            'Valores inferiores a 0,90 suelen requerir corrección. El equipo más utilizado es el banco de condensadores; corregir reduce la corriente y las pérdidas.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál de las siguientes cargas posee normalmente un factor de potencia cercano a 1?',
          opciones: ['Motor trifásico', 'Transformador', 'Estufa eléctrica', 'Compresor'],
          correcta: 2,
          explicacion: 'Las cargas resistivas (estufas, hornos) tienen cosφ ≈ 1; motores y transformadores son inductivos.',
        },
        {
          tipo: 'pregunta',
          enunciado: 'Una instalación posee un factor de potencia de 0,65. ¿Cómo se considera?',
          opciones: ['Excelente', 'Bueno', 'Bajo', 'Ideal'],
          correcta: 2,
          explicacion: 'Bajo 0,90 se recomienda corregir con banco de condensadores.',
        },
      ],
    },
    {
      leccionId: 'lec-2-5',
      titulo: 'Circuitos serie, paralelo y mixtos',
      minutos: 30,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Comparación de circuitos',
          items: [
            {
              titulo: 'Serie',
              etiqueta: 'Rt = R1 + R2 + R3',
              resumen: 'Una sola trayectoria.',
              detalle: ['Misma corriente en todos los elementos.', 'Si una resistencia se interrumpe, todo el circuito deja de funcionar.', 'Ejemplo: 10 + 20 + 30 Ω = 60 Ω.'],
            },
            {
              titulo: 'Paralelo',
              etiqueta: '1/Rt = 1/R1 + 1/R2 + …',
              resumen: 'Varias trayectorias.',
              detalle: [
                'Mismo voltaje en todas las ramas.',
                'Si una rama se abre, sólo esa rama deja de operar.',
                'Resistencias iguales: Rt = R / n (ej.: 3 × 30 Ω → 10 Ω).',
                'Aplicación: todas las luminarias y enchufes de una vivienda.',
              ],
            },
            {
              titulo: 'Mixto',
              etiqueta: 'Reducción progresiva',
              resumen: 'Combina serie y paralelo.',
              detalle: ['Se calcula reduciendo progresivamente las combinaciones serie y paralelo.', 'Muy común en instalaciones industriales.'],
            },
          ],
        },
        { tipo: 'calculadora', calculadora: 'resistencias' },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué tipo de circuito se utiliza normalmente en viviendas?',
          opciones: ['Serie', 'Paralelo', 'Resonante', 'Mixto puro'],
          correcta: 1,
          explicacion: 'Enchufes y luminarias se conectan en paralelo para operar de forma independiente con la misma tensión.',
        },
        {
          tipo: 'pregunta',
          enunciado: 'Durante una inspección se mide 220 V y 0 A. ¿Qué condición es más probable?',
          opciones: ['Cortocircuito', 'Circuito abierto', 'Sobrecarga', 'Bajo factor de potencia'],
          correcta: 1,
          explicacion: 'Hay tensión disponible pero no circula corriente: el circuito está abierto.',
        },
      ],
    },
  ],
  resumen: [
    'Identificar magnitudes eléctricas.',
    'Aplicar la Ley de Ohm.',
    'Calcular potencia monofásica y trifásica.',
    'Comprender el factor de potencia.',
    'Analizar circuitos serie y paralelo.',
    'Resolver problemas básicos de instalaciones eléctricas.',
  ],
  laboratorios: [
    'Medición de voltaje domiciliario (uso correcto del multímetro).',
    'Medición de corriente en circuito de iluminación (pinza amperimétrica).',
    'Comprobación experimental de la Ley de Ohm.',
    'Montaje de circuito serie (fuente, interruptor, conductores, lámparas).',
    'Montaje de circuito paralelo (funcionamiento independiente de cargas).',
  ],
};
