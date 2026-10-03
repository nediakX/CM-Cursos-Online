import type { ContenidoModulo } from '../../types';

/** Módulo 6 — Fuente: MANUAL DEL ALUMNO, Módulo 6 (RIC 01 y RIC 03). */
export const M6: ContenidoModulo = {
  moduloId: 'mod-6',
  introduccion:
    'Aprenderás a diseñar, dimensionar e instalar empalmes y alimentadores de baja tensión conforme al DS N°8, RIC 01 y RIC 03.',
  lecciones: [
    {
      leccionId: 'lec-6-1',
      titulo: 'Empalmes: definición y clasificación',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'El empalme es el conjunto de equipos que conecta una instalación de consumo a la red pública de distribución. Constituye el límite técnico y administrativo entre la empresa distribuidora y el cliente final.',
        },
        {
          tipo: 'checklist',
          titulo: 'Componentes principales del empalme',
          items: ['Acometida.', 'Caja de empalme.', 'Equipo de medida.', 'Protección general.', 'Alimentador principal.', 'Sistema de puesta a tierra.'],
        },
        {
          tipo: 'tabla',
          titulo: 'Monofásico vs. trifásico',
          columnas: ['', 'Monofásico', 'Trifásico'],
          filas: [
            ['Conductores', '1 fase + neutro', '3 fases + neutro'],
            ['Tensión', '220 V', '380/220 V'],
            ['Potencia típica', 'Hasta 10 kW', 'Superior a 10 kW'],
            ['Aplicaciones', 'Viviendas, pequeños comercios, oficinas', 'Industrias, talleres, edificios, centros comerciales'],
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es la función principal del empalme?',
          opciones: ['Medir tensión', 'Conectar la instalación a la red pública', 'Proteger motores', 'Controlar iluminación'],
          correcta: 1,
          explicacion: 'El empalme conecta la instalación de consumo con la red de distribución.',
        },
      ],
    },
    {
      leccionId: 'lec-6-2',
      titulo: 'Acometidas, centros de medición y cajas de empalme',
      minutos: 25,
      bloques: [
        { tipo: 'texto', texto: 'La acometida es el conjunto de conductores que une la red pública con el punto de empalme.' },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de acometida',
          items: [
            { titulo: 'Aérea', detalle: ['Ventajas: menor costo, fácil instalación.', 'Desventaja: exposición climática.'] },
            { titulo: 'Subterránea', detalle: ['Ventajas: mayor seguridad, mejor estética.', 'Desventaja: mayor costo.'] },
          ],
        },
        {
          tipo: 'tarjetas',
          titulo: 'Centro de medición y caja de empalme',
          items: [
            {
              titulo: 'Centro de medición',
              resumen: 'Registra la energía consumida por el usuario.',
              detalle: ['Componentes: medidor, base de medidor, protección general, caja de protección.', 'Requisitos: acceso para la distribuidora, protección mecánica, identificación visible.'],
            },
            {
              titulo: 'Caja de empalme',
              resumen: 'Protege equipos de medición y maniobra.',
              detalle: ['Material autoextinguente.', 'Protección IP adecuada.', 'Resistencia mecánica.', 'Acceso controlado.'],
            },
          ],
        },
        {
          tipo: 'nota',
          variante: 'info',
          titulo: 'Empalmes para edificios',
          texto: 'Incluyen medidores múltiples, tablero general, alimentadores verticales y puesta a tierra común. La identificación correcta de cada medidor es crítica.',
        },
      ],
    },
    {
      leccionId: 'lec-6-3',
      titulo: 'Alimentadores y criterios de dimensionamiento',
      minutos: 25,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'El alimentador une el empalme con el tablero general. Sus funciones: transportar energía, limitar pérdidas y garantizar continuidad operacional.',
        },
        {
          tipo: 'lista',
          titulo: 'El conductor debe seleccionarse considerando',
          estilo: 'check',
          items: ['Corriente de carga.', 'Caída de tensión.', 'Temperatura ambiente.', 'Agrupamiento.', 'Corriente de cortocircuito.'],
        },
        {
          tipo: 'ordenar',
          titulo: 'Método general de dimensionamiento',
          items: [
            'Determinar potencia instalada',
            'Determinar demanda máxima',
            'Calcular corriente',
            'Seleccionar conductor',
            'Verificar caída de tensión',
            'Seleccionar protección',
          ],
        },
        { tipo: 'calculadora', calculadora: 'conductor' },
      ],
    },
    {
      leccionId: 'lec-6-4',
      titulo: 'Cálculo de demanda máxima',
      minutos: 30,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Conceptos clave',
          items: [
            { titulo: 'Potencia instalada', detalle: ['Suma total de cargas conectadas.'] },
            { titulo: 'Demanda máxima', detalle: ['Máxima potencia probable utilizada simultáneamente.'] },
            { titulo: 'Factor de demanda', detalle: ['Relación entre demanda máxima y potencia instalada.'] },
          ],
        },
        {
          tipo: 'formula',
          titulo: 'Demanda máxima',
          expresion: 'Demanda = Potencia instalada × Factor de demanda',
          variables: [],
        },
        {
          tipo: 'ejemplo',
          titulo: 'Ejemplo resuelto — Vivienda',
          datos: ['Potencia instalada: 12 kW', 'Factor de demanda: 0,75', 'Tensión: 220 V'],
          pasos: [
            { titulo: 'Demanda', detalle: '12 × 0,75 = 9 kW' },
            { titulo: 'Corriente', detalle: 'I = 9.000 / 220 = 40,9 A' },
            { titulo: 'Conductor', detalle: 'Cu 10 mm² (50 A según tabla)' },
          ],
          resultado: 'Conductor Cu 10 mm² · Protección 50 A',
        },
        { tipo: 'calculadora', calculadora: 'cuadroCargas' },
      ],
    },
    {
      leccionId: 'lec-6-5',
      titulo: 'Protecciones generales y casos tipo',
      minutos: 25,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Protecciones generales',
          instruccion: 'Protegen alimentador, instalación y personas.',
          items: [
            { titulo: 'Disyuntor general', detalle: ['Sobrecarga.', 'Cortocircuito.'] },
            { titulo: 'Diferencial general', detalle: ['Fugas a tierra.', 'Contactos indirectos.'] },
            { titulo: 'DPS', detalle: ['Sobretensiones.'] },
          ],
        },
        {
          tipo: 'tabla',
          titulo: 'Casos tipo del manual',
          columnas: ['Caso', 'Potencia', 'Empalme', 'Alimentador', 'Protección'],
          filas: [
            ['Vivienda 150 m²', '10 kW', 'Monofásico 220 V', 'Cu 10 mm²', 'Disyuntor 50 A + diferencial 40 A – 30 mA'],
            ['Local comercial', '25 kW', 'Trifásico', 'Cu 16 mm²', '63 A'],
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: 'Además de la corriente de carga, ¿qué debe verificarse al dimensionar un alimentador?',
          opciones: ['El color del conductor', 'La caída de tensión y la capacidad de la protección', 'Sólo la marca del disyuntor', 'La potencia del medidor'],
          correcta: 1,
          explicacion: 'Se debe verificar caída de tensión y coordinación con la protección.',
        },
        {
          tipo: 'pregunta',
          enunciado: 'El empalme, alimentador y protección cumplen individualmente, pero su coordinación es incorrecta. ¿La instalación cumple?',
          opciones: ['Sí', 'No', 'Sólo si tiene DPS', 'Sólo en monofásico'],
          correcta: 1,
          explicacion: 'La normativa exige verificar la coordinación integral; el cumplimiento individual no garantiza la seguridad del conjunto.',
        },
      ],
    },
    {
      leccionId: 'lec-6-6',
      titulo: 'Declaración TE1 y errores frecuentes',
      minutos: 20,
      bloques: [
        {
          tipo: 'texto',
          texto: 'La TE1 declara la instalación ante SEC para certificar cumplimiento normativo, registrar la instalación y autorizar la energización. Es responsabilidad del instalador autorizado.',
        },
        {
          tipo: 'checklist',
          titulo: 'Información requerida',
          items: ['Datos del propietario.', 'Datos del instalador.', 'Potencia instalada.', 'Tipo de instalación.', 'Planos.', 'Memoria técnica.'],
        },
        {
          tipo: 'lista',
          titulo: 'Errores frecuentes',
          items: [
            'Alimentadores subdimensionados.',
            'Caídas de tensión excesivas.',
            'Protección mal seleccionada.',
            'Falta de diferencial.',
            'Falta de puesta a tierra.',
            'Empalmes no normalizados.',
            'Documentación incompleta.',
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué documento se presenta ante SEC para declarar una instalación?',
          opciones: ['TE2', 'TE3', 'TE4', 'TE1'],
          correcta: 3,
          explicacion: 'La declaración de instalaciones eléctricas se realiza mediante la TE1.',
        },
      ],
    },
  ],
  resumen: [
    'Identificar tipos de empalmes y seleccionar acometidas.',
    'Diseñar centros de medición.',
    'Calcular demanda máxima y dimensionar alimentadores.',
    'Seleccionar protecciones generales.',
    'Elaborar documentación TE1.',
    'Diseñar instalaciones conforme a RIC 01 y RIC 03.',
  ],
  laboratorios: [
    'Identificación de componentes de empalme.',
    'Montaje de centro de medición.',
    'Dimensionamiento de alimentadores.',
    'Selección de protecciones generales.',
    'Diseño de empalme domiciliario.',
    'Diseño de empalme trifásico.',
    'Simulación de declaración TE1.',
    'Verificación normativa de proyecto.',
  ],
  taller: {
    titulo: 'Taller integrador',
    descripcion: 'Diseñar el empalme completo para una vivienda de 180 m².',
    entregables: [
      'Cuadro de cargas.',
      'Demanda máxima.',
      'Corriente total.',
      'Alimentador.',
      'Protección general.',
      'Centro de medición.',
      'Diagrama unilineal.',
      'Memoria técnica.',
      'Formulario TE1 simulado.',
    ],
  },
};
