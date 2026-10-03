import type { ContenidoModulo } from '../../types';

/** Módulo 4 — Fuente: MANUAL DEL ALUMNO, Módulo 4. */
export const M4: ContenidoModulo = {
  moduloId: 'mod-4',
  introduccion:
    'Aprenderás a diseñar, construir, medir y verificar sistemas de puesta a tierra y protecciones contra tensiones peligrosas según el DS N°8, RIC 05 y RIC 06. Es uno de los temas más importantes del examen SEC.',
  lecciones: [
    {
      leccionId: 'lec-4-1',
      titulo: 'Seguridad eléctrica y contactos',
      minutos: 30,
      bloques: [
        {
          tipo: 'lista',
          titulo: 'Principales riesgos eléctricos',
          items: ['Electrocución.', 'Quemaduras.', 'Incendios.', 'Explosiones.', 'Daños a equipos.', 'Interrupciones operacionales.'],
        },
        { tipo: 'calculadora', calculadora: 'efectoCorriente' },
        {
          tipo: 'tarjetas',
          titulo: 'Tipos de contacto eléctrico',
          items: [
            {
              titulo: 'Contacto directo',
              resumen: 'Tocar partes activas energizadas.',
              detalle: [
                'Ejemplos: conductores desnudos, barras energizadas, terminales sin protección.',
                'Protección: aislación, barreras, cubiertas, diferenciales de alta sensibilidad.',
              ],
            },
            {
              titulo: 'Contacto indirecto',
              resumen: 'Tocar masas metálicas energizadas por una falla.',
              detalle: [
                'Ejemplos: carcasa de motor, gabinete metálico, tablero eléctrico.',
                'Protección: puesta a tierra, equipotencialización, diferenciales, DPS.',
              ],
            },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: 'Una persona toca la carcasa metálica de una lavadora que quedó energizada por una falla de aislación. ¿Qué tipo de contacto es?',
          opciones: ['Contacto directo', 'Contacto indirecto', 'Sobretensión', 'Cortocircuito'],
          correcta: 1,
          explicacion: 'Es un contacto indirecto: la masa metálica se energizó accidentalmente por una falla.',
        },
      ],
    },
    {
      leccionId: 'lec-4-2',
      titulo: 'Sistemas y esquemas de puesta a tierra',
      minutos: 30,
      bloques: [
        {
          tipo: 'texto',
          texto:
            'Un sistema de puesta a tierra conecta eléctricamente las masas metálicas con el terreno. Sus objetivos: proteger personas, proteger equipos, limitar tensiones peligrosas y facilitar la operación de las protecciones.',
        },
        {
          tipo: 'tarjetas',
          titulo: 'Esquemas de conexión a tierra',
          items: [
            {
              titulo: 'TT',
              etiqueta: 'Viviendas',
              resumen: 'Neutro a tierra; masas a una tierra independiente.',
              detalle: ['Alta seguridad.', 'Uso generalizado en instalaciones domiciliarias.'],
            },
            {
              titulo: 'TN',
              etiqueta: 'Industria y edificios',
              resumen: 'Masas conectadas al mismo punto de tierra del neutro.',
              detalle: ['Variantes: TN-S, TN-C, TN-C-S.'],
            },
            {
              titulo: 'IT',
              etiqueta: 'Procesos críticos',
              resumen: 'Fuente aislada de tierra.',
              detalle: ['Aplicaciones: hospitales, procesos críticos, minería.'],
            },
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Esquema ↔ aplicación',
          pares: [
            { a: 'TT', b: 'Instalaciones domiciliarias' },
            { a: 'TN', b: 'Industria y edificios' },
            { a: 'IT', b: 'Hospitales y procesos críticos' },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué sistema de tierra es más utilizado en viviendas?',
          opciones: ['IT', 'TN', 'TT', 'Flotante'],
          correcta: 2,
          explicacion: 'El esquema TT es de uso generalizado en viviendas.',
        },
      ],
    },
    {
      leccionId: 'lec-4-3',
      titulo: 'Resistividad del terreno y mediciones',
      minutos: 35,
      bloques: [
        {
          tipo: 'tabla',
          titulo: 'Resistividad referencial del terreno (Ω·m)',
          columnas: ['Terreno', 'Resistividad'],
          filas: [
            ['Pantanoso', '10 Ω·m'],
            ['Arcilloso', '30 Ω·m'],
            ['Agrícola', '100 Ω·m'],
            ['Arenoso', '500 Ω·m'],
            ['Rocoso', '1.000 Ω·m'],
          ],
          nota: 'La resistividad representa la dificultad del terreno para conducir corriente.',
        },
        {
          tipo: 'formula',
          titulo: 'Método Wenner',
          expresion: 'ρ = 2 × π × a × R',
          variables: [
            { simbolo: 'ρ', significado: 'Resistividad (Ω·m)' },
            { simbolo: 'a', significado: 'Separación entre electrodos (m)' },
            { simbolo: 'R', significado: 'Resistencia medida (Ω)' },
          ],
          nota: 'Se usa ANTES de diseñar la puesta a tierra. Equipo: telurómetro, cuatro electrodos y cables de prueba.',
        },
        { tipo: 'calculadora', calculadora: 'wenner' },
        {
          tipo: 'ordenar',
          titulo: 'Procedimiento del método Wenner',
          items: ['Instalar cuatro electrodos alineados', 'Mantener igual separación', 'Aplicar corriente de prueba', 'Medir resistencia', 'Calcular resistividad'],
        },
        {
          tipo: 'ordenar',
          titulo: 'Método de caída de potencial (mide la puesta a tierra ya instalada)',
          items: ['Desconectar la puesta a tierra', 'Instalar electrodos auxiliares', 'Medir resistencia', 'Verificar estabilidad de mediciones'],
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué método se utiliza para medir la resistividad del terreno?',
          opciones: ['Ohm', 'Wenner', 'Kirchhoff', 'Maxwell'],
          correcta: 1,
          explicacion: 'El método Wenner determina la resistividad; la caída de potencial mide la resistencia de una tierra instalada.',
        },
      ],
    },
    {
      leccionId: 'lec-4-4',
      titulo: 'Electrodos y diseño de puesta a tierra',
      minutos: 25,
      bloques: [
        {
          tipo: 'tarjetas',
          titulo: 'Electrodos',
          items: [
            { titulo: 'Varilla Copperweld', etiqueta: '1,5 · 2,4 · 3,0 m', detalle: ['Núcleo de acero con recubrimiento de cobre.'] },
            { titulo: 'Malla de tierra', etiqueta: 'Subestaciones e industria', detalle: ['Usada en subestaciones, industria y plantas fotovoltaicas.'] },
            { titulo: 'Anillo de tierra', etiqueta: 'Edificios', detalle: ['Edificios, hospitales y centros de datos.'] },
          ],
        },
        {
          tipo: 'ejemplo',
          titulo: 'Diseño para una vivienda',
          datos: ['Carga: 15 kW', 'Sistema: TT', 'Objetivo: resistencia menor a 10 Ω'],
          pasos: [
            { titulo: 'Electrodo', detalle: '1 varilla Copperweld 5/8" × 2,4 m.' },
            { titulo: 'Conductor', detalle: 'Cobre desnudo 16 mm².' },
          ],
          resultado: 'R < 10 Ω con varilla 5/8" × 2,4 m y Cu desnudo 16 mm²',
        },
        {
          tipo: 'ejemplo',
          titulo: 'Diseño industrial',
          datos: ['Potencia: 250 kVA', 'Objetivo: resistencia menor a 5 Ω'],
          pasos: [{ titulo: 'Solución', detalle: 'Malla de tierra con varias varillas interconectadas.' }],
          resultado: 'R < 5 Ω mediante malla',
        },
      ],
    },
    {
      leccionId: 'lec-4-5',
      titulo: 'Protección diferencial y DPS',
      minutos: 35,
      bloques: [
        {
          tipo: 'texto',
          texto: 'El diferencial compara la corriente que entra y la que sale del circuito. Si existe diferencia (fuga a tierra), desconecta automáticamente.',
        },
        {
          tipo: 'tabla',
          titulo: 'Sensibilidades comunes',
          columnas: ['Sensibilidad', 'Uso'],
          filas: [
            ['10 mA', 'Protección especial'],
            ['30 mA', 'Protección de personas'],
            ['300 mA', 'Protección contra incendios'],
          ],
        },
        {
          tipo: 'emparejar',
          titulo: 'Tipo de diferencial ↔ qué detecta',
          pares: [
            { a: 'Tipo AC', b: 'Alterna sinusoidal (cargas convencionales)' },
            { a: 'Tipo A', b: 'Alterna y pulsante (electrónica, FV)' },
            { a: 'Tipo B', b: 'Continua y alterna (inversores, cargadores EV)' },
          ],
        },
        {
          tipo: 'tarjetas',
          titulo: 'DPS — Dispositivos de protección contra sobretensiones',
          instruccion: 'Limitan sobretensiones transitorias causadas por rayos, maniobras o fallas de red.',
          items: [
            { titulo: 'Tipo 1', detalle: ['Descarga directa (rayo).'] },
            { titulo: 'Tipo 2', detalle: ['Tableros principales.'] },
            { titulo: 'Tipo 3', detalle: ['Equipos sensibles.'] },
          ],
        },
        {
          tipo: 'ordenar',
          titulo: 'Secuencia de protección recomendada por el manual',
          instruccion: 'Ordena desde la red hasta la carga.',
          items: ['Red', 'DPS', 'Disyuntor', 'Diferencial', 'Carga'],
        },
        {
          tipo: 'nota',
          variante: 'importante',
          titulo: 'Sistemas fotovoltaicos',
          texto:
            'Riesgos: corriente continua, sobretensiones atmosféricas y arcos eléctricos. Requisitos: tierra de protección, DPS CC, DPS CA y diferencial tipo A o B.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Qué protege un diferencial de 30 mA?',
          opciones: ['Sobrecarga', 'Cortocircuito', 'Personas', 'Sobretensión'],
          correcta: 2,
          explicacion: 'El diferencial de 30 mA está destinado a la protección de personas.',
        },
        {
          tipo: 'pregunta',
          enunciado: '¿Cuál es la función principal del DPS?',
          opciones: ['Medir energía', 'Proteger contra sobretensiones transitorias', 'Detectar fugas a tierra', 'Proteger contra sobrecarga'],
          correcta: 1,
          explicacion: 'El DPS limita sobretensiones transitorias (rayos, maniobras, fallas de red).',
        },
      ],
    },
    {
      leccionId: 'lec-4-6',
      titulo: 'Casos reales',
      minutos: 15,
      bloques: [
        {
          tipo: 'casos',
          titulo: 'Aprende de los errores en terreno',
          casos: [
            {
              titulo: 'Caso 1 — Vivienda',
              situacion: 'Vivienda sin interruptor diferencial.',
              resultado: 'Electrocución por falla en una lavadora.',
              leccion: 'Instalar diferencial de 30 mA.',
            },
            {
              titulo: 'Caso 2 — Industria',
              situacion: 'Industria sin DPS.',
              resultado: 'Daño masivo de PLC y variadores.',
              leccion: 'Implementar protección coordinada.',
            },
            {
              titulo: 'Caso 3 — Sistema solar',
              situacion: 'Sistema solar sin puesta a tierra.',
              resultado: 'Daño del inversor por descarga atmosférica.',
              leccion: 'Diseñar una puesta a tierra específica para el sistema FV.',
            },
          ],
        },
        {
          tipo: 'pregunta',
          enunciado: 'Una instalación tiene electrodo de tierra, pero las masas no están conectadas a él. ¿Está protegida contra contactos indirectos?',
          opciones: ['Sí, basta con el electrodo', 'No, debe existir continuidad entre masas y tierra', 'Sí, si tiene DPS', 'Sólo en sistemas IT'],
          correcta: 1,
          explicacion: 'La existencia del electrodo no basta: debe haber continuidad efectiva entre las masas y el sistema de puesta a tierra.',
        },
      ],
    },
  ],
  resumen: [
    'Identificar tensiones peligrosas y diferenciar contactos directos e indirectos.',
    'Diseñar sistemas TT, TN e IT.',
    'Medir resistividad del terreno (método Wenner) y resistencia de puesta a tierra.',
    'Seleccionar diferenciales y coordinar DPS y protecciones.',
    'Diseñar sistemas seguros para viviendas, industrias y plantas fotovoltaicas.',
  ],
  laboratorios: [
    'Medición de continuidad de tierra.',
    'Uso de telurómetro.',
    'Método Wenner en terreno.',
    'Medición de resistencia de puesta a tierra.',
    'Prueba de diferencial.',
    'Instalación de DPS.',
    'Diseño de puesta a tierra residencial.',
    'Diseño de puesta a tierra fotovoltaica.',
  ],
  taller: {
    titulo: 'Taller integrador',
    descripcion: 'Diseñar la protección completa de una vivienda de 150 m².',
    entregables: ['Sistema TT.', 'Cálculo de puesta a tierra.', 'Diferencial.', 'DPS.', 'Diagrama unilineal.', 'Memoria técnica.'],
  },
};
