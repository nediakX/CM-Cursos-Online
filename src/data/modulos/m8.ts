import type { ContenidoModulo } from '../../types';

/** Módulo 8 — Fuente: MANUAL DEL ALUMNO, Módulo 8. */
export const M8: ContenidoModulo = {
  moduloId: 'mod-8',
  introduccion:
    'Aprenderás a diseñar, instalar, operar y mantener sistemas eléctricos industriales: motores, métodos de partida, protecciones, control y alimentadores.',
  lecciones: [
    {
      leccionId: 'lec-8-1',
      titulo: 'Instalaciones industriales y motores',
      minutos: 25,
      bloques: [
        {
          tipo: 'lista',
          titulo: 'Características de una instalación industrial',
          items: ['Potencias elevadas.', 'Sistemas trifásicos.', 'Motores eléctricos.', 'Automatización.', 'Continuidad operacional.', 'Altos niveles de seguridad.'],
        },
        {
          tipo: 'texto',
          texto: 'Un motor eléctrico transforma energía eléctrica en energía mecánica. Se usa en bombas, ventiladores, correas transportadoras, compresores y maquinaria industrial.',
        },
        {
          tipo: 'tabla',
          titulo: 'Monofásico vs. trifásico',
          columnas: ['', 'Monofásico', 'Trifásico'],
          filas: [
            ['Alimentación', '220 V', '380 V'],
            ['Potencias típicas', '0,25 a 5 HP', '1 HP a miles de HP'],
            ['Aplicaciones', 'Talleres, equipos pequeños, sistemas domésticos', 'Industria, minería, procesos continuos'],
            ['Ventajas', '—', 'Mayor rendimiento, menor corriente, mayor potencia'],
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es la principal ventaja de un motor trifásico?',
          opciones: ['Menor costo', 'Mayor rendimiento', 'Menor tamaño', 'Menor potencia'],
          correcta: 1,
          explicacion: 'El motor trifásico ofrece mayor rendimiento, menor corriente y mayor potencia.',
        },
      ],
    },
    {
      leccionId: 'lec-8-2',
      titulo: 'Corriente y métodos de partida',
      minutos: 35,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'La corriente de partida es la que absorbe el motor al arrancar: puede alcanzar 5 a 8 veces la corriente nominal. Provoca caídas de tensión, disparo de protecciones y sobrecarga mecánica.',
        },
        {
          tipo: 'ejemplo',
          titulo: 'Ejemplo de corriente de partida',
          datos: ['Motor: 15 HP', 'Corriente nominal: 22 A'],
          pasos: [{ titulo: 'Partida directa (≈ 6 × In)', detalle: '22 × 6 = 132 A' }],
          resultado: 'Ip ≈ 132 A',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Métodos de partida',
          items: [
            {
              titulo: 'Partida directa',
              etiqueta: 'Hasta ≈ 7,5 HP',
              detalle: ['El motor recibe tensión plena instantáneamente.', 'Ventajas: bajo costo, fácil implementación.', 'Desventaja: alta corriente de partida.'],
            },
            {
              titulo: 'Estrella – triángulo',
              etiqueta: '15 a 100 HP',
              detalle: ['Primera etapa en estrella, segunda en triángulo.', 'Corriente ≈ 1/3 de la partida directa.'],
            },
            {
              titulo: 'Partida suave',
              etiqueta: 'Bombas, compresores, ventiladores',
              detalle: ['Controla gradualmente la tensión aplicada.', 'Menor corriente, menor esfuerzo mecánico, mayor vida útil.'],
            },
            {
              titulo: 'Variador de frecuencia (VFD)',
              etiqueta: 'Control de velocidad',
              detalle: [
                'Modifica frecuencia y voltaje.',
                'Controla velocidad, torque y sentido de giro.',
                'Beneficios: ahorro energético, control preciso, menor desgaste.',
                'Aplicaciones: bombeo, HVAC, cintas transportadoras, minería.',
              ],
            },
          ],
        },
        { tipo: 'calculadora', calculadora: 'motor' },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué método reduce la corriente de partida aproximadamente a 1/3 de la partida directa?',
          opciones: ['Partida directa', 'Estrella-triángulo', 'Inversión de giro', 'Contactor auxiliar'],
          correcta: 1,
          explicacion: 'La partida estrella-triángulo reduce la corriente a ≈ 1/3.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué equipo controla la velocidad de un motor?',
          opciones: ['Relé térmico', 'Variador de frecuencia', 'DPS', 'Guardamotor'],
          correcta: 1,
          explicacion: 'El VFD modifica frecuencia y voltaje para controlar velocidad y torque.',
        },
      ],
    },
    {
      leccionId: 'lec-8-3',
      titulo: 'Contactores, relés térmicos y guardamotores',
      minutos: 25,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Dispositivos de maniobra y protección de motores',
          items: [
            {
              titulo: 'Contactor',
              etiqueta: 'Maniobra',
              detalle: ['Dispositivo electromagnético para maniobrar cargas.', 'Componentes: bobina, contactos principales y auxiliares.', 'Uso: motores, bombas, iluminación industrial, automatización.'],
            },
            {
              titulo: 'Relé térmico',
              etiqueta: 'Sobrecarga',
              detalle: ['Protege motores contra sobrecargas prolongadas.', 'Usa láminas bimetálicas que se deforman por efecto térmico.', 'Se calibra a la corriente nominal del motor.'],
            },
            {
              titulo: 'Guardamotor',
              etiqueta: 'Protección compacta',
              detalle: ['Protege contra sobrecarga, cortocircuito y pérdida de fase.', 'Fácil instalación, alta confiabilidad, ajuste regulable.'],
            },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué dispositivo protege contra sobrecargas en motores?',
          opciones: ['DPS', 'Relé térmico', 'Fusible', 'Contactor'],
          correcta: 1,
          explicacion: 'El relé térmico protege contra sobrecargas prolongadas y se ajusta a la corriente nominal del motor.',
        },
      ],
    },
    {
      leccionId: 'lec-8-4',
      titulo: 'CCM, tableros y protecciones industriales',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'El Centro de Control de Motores (CCM) es un conjunto de tableros para controlar y proteger motores. Incluye interruptor general, barras, guardamotores, contactores, relés térmicos, variadores e instrumentación. Ventajas: organización, seguridad y mantenimiento simplificado.',
        },
        {
          tipo: 'emparejar',
          titulo: 'Falla ↔ protección industrial',
          pares: [
            { a: 'Sobrecarga', b: 'Relé térmico' },
            { a: 'Cortocircuito', b: 'Disyuntor' },
            { a: 'Fugas a tierra', b: 'Diferencial' },
            { a: 'Sobretensiones', b: 'DPS' },
            { a: 'Fallas de arco', b: 'AFDD' },
          ],
        },
        {
          tipo: 'lista',
          titulo: 'Tableros industriales',
          items: ['Construcción robusta.', 'Protección IP adecuada.', 'Instrumentación y señalización.', 'Elementos: interruptores, contactores, PLC, variadores, DPS, relés.'],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué significa CCM?',
          opciones: ['Circuito de Control Monofásico', 'Centro de Control de Motores', 'Cuadro de Cargas Máximas', 'Control de Corriente Media'],
          correcta: 1,
          explicacion: 'CCM = Centro de Control de Motores.',
        },
      ],
    },
    {
      leccionId: 'lec-8-5',
      titulo: 'Alimentadores industriales y proyecto',
      minutos: 35,
      bloques: [
        {
          tipo: 'formula',
          titulo: 'Corriente de un motor trifásico',
          expresion: 'I = P / (√3 × V × cosφ × η)',
          variables: [
            { simbolo: 'P', significado: 'Potencia mecánica (W) = HP × 746' },
            { simbolo: 'V', significado: 'Tensión de línea (V)' },
            { simbolo: 'cosφ', significado: 'Factor de potencia' },
            { simbolo: 'η', significado: 'Rendimiento' },
          ],
        },
        {
          tipo: 'ejemplo',
          titulo: 'Alimentador para motor de 30 HP',
          datos: ['Motor: 30 HP', 'Voltaje: 380 V', 'cosφ = 0,85', 'Rendimiento: 90%'],
          pasos: [
            { titulo: 'Potencia', detalle: '30 × 746 = 22.380 W' },
            { titulo: 'Corriente', detalle: 'I = 22.380 / (1,732 × 380 × 0,85 × 0,90) ≈ 45 A' },
            { titulo: 'Conductor', detalle: 'Cu 16 mm²' },
            { titulo: 'Protección', detalle: '63 A' },
          ],
          resultado: 'I ≈ 45 A · Cu 16 mm² · Protección 63 A',
        },
        {
          tipo: 'ejemplo',
          titulo: 'Caso práctico — bomba industrial',
          datos: ['Motor: 15 HP', 'Voltaje: 380 V', 'Corriente: 22 A'],
          pasos: [
            { titulo: 'Guardamotor', detalle: '20–25 A' },
            { titulo: 'Contactor', detalle: '32 A' },
            { titulo: 'Relé térmico', detalle: '20–25 A' },
            { titulo: 'Conductor', detalle: 'Cu 6 mm²' },
            { titulo: 'Protección general', detalle: '32 A' },
          ],
          resultado: 'Guardamotor 20–25 A · Contactor 32 A · Cu 6 mm²',
        },
        {
          tipo: 'ordenar',
          titulo: 'Etapas del proyecto industrial (taller mecánico)',
          items: [
            'Levantamiento de cargas',
            'Cuadro de cargas',
            'Cálculo de demanda',
            'Alimentadores',
            'Tablero general',
            'CCM',
            'Puesta a tierra',
            'Protecciones',
            'Plano eléctrico',
            'Memoria técnica',
          ],
        },
      ],
    },
  ],
  resumen: [
    'Seleccionar motores y calcular corrientes de operación.',
    'Diseñar sistemas de partida.',
    'Seleccionar protecciones industriales.',
    'Utilizar variadores de frecuencia.',
    'Diseñar CCM y dimensionar alimentadores industriales.',
    'Elaborar proyectos industriales completos.',
  ],
  laboratorios: [
    'Identificación de motores.',
    'Medición de corriente de motor.',
    'Partida directa.',
    'Partida estrella-triángulo.',
    'Configuración de variador.',
    'Montaje de guardamotor.',
    'Diseño de CCM.',
    'Proyecto industrial completo.',
  ],
  taller: {
    titulo: 'Proyecto industrial',
    descripcion: 'Taller mecánico con compresor 10 HP, bomba 5 HP, ventilador 3 HP, iluminación LED y tomas industriales.',
    entregables: ['Cuadro de cargas.', 'Demanda.', 'Alimentadores.', 'Tablero general y CCM.', 'Puesta a tierra.', 'Protecciones.', 'Plano eléctrico.', 'Memoria técnica.'],
  },
};
