/**
 * Exportación de reportes a Excel con diseño: resumen con indicadores y una
 * hoja por reporte (notas, avance y asistencia), cada una como tabla de Excel
 * con filtros, formatos y colores según el resultado.
 */
import { exportarReporte, getCurso, getMetricas } from './api';
import { COLORES, descargarLibro, encabezado, fechaHoraCL, indicadores, nuevoLibro, tabla, type Columna } from '../utils/excel';
import type { Worksheet } from 'exceljs';
import { formatearRut } from '../utils/rut';

type Fila = Record<string, unknown>;
export type TipoReporte = 'notas' | 'avance' | 'asistencia';

const num = (v: unknown): number | null => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v.replace(',', '.')))) return Number(v.replace(',', '.'));
  return null;
};
/** "04-10-2026" (es-CL) → fecha de Excel. */
const fechaCL = (v: unknown): Date | null => {
  const m = typeof v === 'string' ? v.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/) : null;
  return m ? new Date(Date.UTC(+m[3], +m[2] - 1, +m[1])) : null;
};

/** Columnas con formato según el nombre del campo que entrega el servidor. */
function columnasPara(filas: Fila[]): Columna<Fila>[] {
  const claves = filas.length ? Object.keys(filas[0]) : [];
  return claves.map((k): Columna<Fila> => {
    if (/%/.test(k)) return { titulo: k.replace(/\s*\(%\)/, ''), valor: (f) => { const n = num(f[k]); return n === null ? null : n / 100; }, formato: '0%', ancho: 14, alinear: 'center' };
    if (k === 'Nota') return { titulo: k, valor: (f) => num(f[k]), formato: '0.0', ancho: 9, alinear: 'center' };
    if (k === 'Fecha') return { titulo: k, valor: (f) => fechaCL(f[k]) ?? (f[k] as string), formato: 'dd-mm-yyyy', ancho: 13, alinear: 'center' };
    if (k === 'Alumno') return { titulo: k, valor: (f) => f[k] as string, ancho: 30 };
    if (k === 'Evaluación' || k === 'Módulo') return { titulo: k, valor: (f) => f[k] as string, ancho: 52 };
    if (k === 'RUT') return { titulo: k, valor: (f) => formatearRut(String(f[k] ?? '')), ancho: 14 };
    const n = filas.every((f) => num(f[k]) !== null);
    return { titulo: k, valor: (f) => (n ? num(f[k]) : (f[k] as string)), ancho: Math.max(12, k.length + 4), alinear: n ? 'center' : 'left' };
  });
}

function rangoColumna(hoja: Worksheet, desde: number, hasta: number, col: number) {
  return `${hoja.getCell(desde, col).address}:${hoja.getCell(hasta, col).address}`;
}

const TITULOS: Record<TipoReporte, { hoja: string; titulo: string; tabla: string }> = {
  notas: { hoja: 'Notas', titulo: 'Notas de evaluaciones', tabla: 'Notas' },
  avance: { hoja: 'Avance', titulo: 'Avance del curso por alumno', tabla: 'Avance' },
  asistencia: { hoja: 'Asistencia', titulo: 'Asistencia por módulo', tabla: 'Asistencia' },
};

export async function exportarReportesExcel(): Promise<void> {
  const tipos: TipoReporte[] = ['notas', 'avance', 'asistencia'];
  const [curso, metricas, ...datos] = await Promise.all([getCurso('curso-1'), getMetricas(), ...tipos.map((t) => exportarReporte(t))]);
  const libro = await nuevoLibro();
  const generado = `Generado el ${fechaHoraCL()} · ${curso.nombre}`;

  // ── Resumen ────────────────────────────────────────────────────────────────
  const resumen = libro.addWorksheet('Resumen', { views: [{ showGridLines: false }], properties: { tabColor: { argb: COLORES.acento } } });
  resumen.getColumn(1).width = 46;
  resumen.getColumn(2).width = 16;
  let fila = encabezado(resumen, 'Reporte académico · CM Ingenierías', generado, 2);
  const t1 = resumen.getCell(fila, 1);
  t1.value = 'Indicadores generales';
  t1.font = { bold: true, size: 12, color: { argb: COLORES.primario } };
  fila = indicadores(resumen, fila + 1, [
    { etiqueta: 'Alumnos', valor: metricas.totalAlumnos },
    { etiqueta: 'Alumnos activos', valor: metricas.alumnosActivos },
    { etiqueta: 'Avance promedio', valor: metricas.promedioAvance / 100, formato: '0%' },
    { etiqueta: 'Tasa de aprobación de evaluaciones', valor: metricas.tasaAprobacion / 100, formato: '0%' },
    { etiqueta: 'Certificados emitidos', valor: metricas.certificadosEmitidos },
    { etiqueta: 'Consultas pendientes', valor: metricas.consultasPendientes },
    ...metricas.aprobadosVsReprobados.map((x) => ({ etiqueta: `Intentos ${x.nombre.toLowerCase()}`, valor: x.valor })),
  ]);
  fila += 1;
  const t2 = resumen.getCell(fila, 1);
  t2.value = 'Avance promedio por módulo';
  t2.font = { bold: true, size: 12, color: { argb: COLORES.primario } };
  const inicioMod = fila + 1;
  const finMod = indicadores(
    resumen,
    inicioMod,
    metricas.avancePorModulo.map((m) => {
      const mod = curso.modulos.find((x) => `M${x.orden}` === m.modulo);
      return { etiqueta: mod ? `${m.modulo} · ${mod.nombre}` : m.modulo, valor: m.promedio / 100, formato: '0%' };
    }),
  );
  if (metricas.avancePorModulo.length) {
    resumen.addConditionalFormatting({
      ref: rangoColumna(resumen, inicioMod, finMod - 1, 2),
      rules: [{ type: 'dataBar', priority: 1, cfvo: [{ type: 'num', value: 0 }, { type: 'num', value: 1 }], color: { argb: 'FF5B8DEF' } } as never],
    });
  }

  // ── Una hoja por reporte ────────────────────────────────────────────────────
  tipos.forEach((tipo, i) => {
    const filas = datos[i];
    const meta = TITULOS[tipo];
    const hoja = libro.addWorksheet(meta.hoja, { views: [{ state: 'frozen', ySplit: 4, showGridLines: false }] });
    if (!filas.length) {
      encabezado(hoja, meta.titulo, generado, 4);
      hoja.getCell(4, 1).value = 'Aún no hay datos para este reporte.';
      hoja.getCell(4, 1).font = { italic: true, color: { argb: COLORES.gris } };
      hoja.getColumn(1).width = 40;
      return;
    }
    const cols = columnasPara(filas);
    const fin = tabla(hoja, { nombre: meta.tabla, filaInicio: 4, columnas: cols, filas });
    encabezado(hoja, meta.titulo, `${generado} · ${filas.length} registro(s)`, cols.length);
    hoja.getRow(4).height = 26;

    cols.forEach((c, j) => {
      const ref = rangoColumna(hoja, 5, fin, j + 1);
      if (c.titulo === 'Estado') {
        hoja.addConditionalFormatting({
          ref,
          rules: [
            { type: 'containsText', operator: 'containsText', text: 'Reprobado', priority: 1, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: COLORES.rojo } }, font: { color: { argb: COLORES.rojoTexto }, bold: true } } },
            { type: 'containsText', operator: 'containsText', text: 'Aprobado', priority: 2, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: COLORES.verde } }, font: { color: { argb: COLORES.verdeTexto }, bold: true } } },
          ],
        });
      }
      if (c.titulo === 'Nota') {
        hoja.addConditionalFormatting({
          ref,
          rules: [
            { type: 'cellIs', operator: 'lessThan', formulae: ['4'], priority: 3, style: { font: { color: { argb: COLORES.rojoTexto }, bold: true } } },
            { type: 'cellIs', operator: 'greaterThan', formulae: ['3.99'], priority: 4, style: { font: { color: { argb: COLORES.verdeTexto }, bold: true } } },
          ],
        });
      }
      if (c.formato === '0%') {
        hoja.addConditionalFormatting({
          ref,
          rules: [{ type: 'dataBar', priority: 5, cfvo: [{ type: 'num', value: 0 }, { type: 'num', value: 1 }], color: { argb: 'FF5B8DEF' } } as never],
        });
      }
      if (c.titulo === 'Asistencia') {
        hoja.addConditionalFormatting({
          ref,
          rules: [{ type: 'cellIs', operator: 'lessThan', formulae: ['0.75'], priority: 6, style: { font: { color: { argb: COLORES.rojoTexto }, bold: true } } }],
        });
      }
    });
    hoja.pageSetup = { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: '4:4' };
  });

  const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Santiago' });
  await descargarLibro(libro, `reportes_cm_${hoy}.xlsx`);
}
