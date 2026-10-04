/**
 * Utilidades para generar planillas Excel (.xlsx) con diseño: encabezado con
 * la marca, tablas de Excel con filtros, anchos de columna, formatos de número
 * y fecha, y formato condicional. Usa ExcelJS, que se carga sólo al exportar.
 */
import type { Workbook, Worksheet } from 'exceljs';

export const COLORES = {
  primario: 'FF0B2545',
  acento: 'FFF5A623',
  claro: 'FFF3F6FA',
  borde: 'FFD9E0EA',
  verde: 'FFDCFCE7',
  verdeTexto: 'FF166534',
  rojo: 'FFFEE2E2',
  rojoTexto: 'FF991B1B',
  gris: 'FF6B7280',
};

export async function nuevoLibro(): Promise<Workbook> {
  const ExcelJS = (await import('exceljs')).default;
  const libro = new ExcelJS.Workbook();
  libro.creator = 'CM Ingenierías';
  libro.created = new Date();
  return libro;
}

/**
 * Banda de título en las primeras filas de la hoja. Devuelve la fila donde
 * puede empezar el contenido.
 */
export function encabezado(hoja: Worksheet, titulo: string, subtitulo: string, columnas: number): number {
  hoja.mergeCells(1, 1, 1, columnas);
  const t = hoja.getCell(1, 1);
  t.value = titulo;
  t.font = { name: 'Calibri', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  t.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORES.primario } };
  t.alignment = { vertical: 'middle', indent: 1 };
  hoja.getRow(1).height = 30;

  hoja.mergeCells(2, 1, 2, columnas);
  const s = hoja.getCell(2, 1);
  s.value = subtitulo;
  s.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF374151' } };
  s.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORES.claro } };
  s.alignment = { vertical: 'middle', indent: 1 };
  hoja.getRow(2).height = 20;

  // Línea de acento bajo el título
  for (let c = 1; c <= columnas; c++) {
    hoja.getCell(2, c).border = { bottom: { style: 'medium', color: { argb: COLORES.acento } } };
  }
  return 4;
}

export interface Columna<T> {
  titulo: string;
  valor: (fila: T) => string | number | Date | null | undefined;
  ancho?: number;
  /** Formato de número de Excel, p. ej. '0%', '0.0', 'dd-mm-yyyy'. */
  formato?: string;
  alinear?: 'left' | 'center' | 'right';
}

/**
 * Inserta una tabla de Excel (con filtros y filas en bandas) a partir de una
 * lista de objetos. Devuelve la última fila usada.
 */
export function tabla<T>(hoja: Worksheet, opciones: { nombre: string; filaInicio: number; columnas: Columna<T>[]; filas: T[]; estilo?: string }): number {
  const { nombre, filaInicio, columnas, filas } = opciones;
  const datos = filas.length ? filas.map((f) => columnas.map((c) => c.valor(f) ?? null)) : [columnas.map(() => null)];
  hoja.addTable({
    name: nombre,
    ref: hoja.getCell(filaInicio, 1).address,
    headerRow: true,
    style: { theme: (opciones.estilo ?? 'TableStyleMedium2') as never, showRowStripes: true },
    columns: columnas.map((c) => ({ name: c.titulo, filterButton: true })),
    rows: datos,
  });
  const cabecera = hoja.getRow(filaInicio);
  cabecera.height = 22;
  cabecera.eachCell((celda) => {
    celda.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    celda.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORES.primario } };
    celda.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });
  columnas.forEach((c, i) => {
    const col = hoja.getColumn(i + 1);
    col.width = Math.max(col.width ?? 0, c.ancho ?? Math.min(40, Math.max(12, c.titulo.length + 4)));
    for (let r = filaInicio + 1; r <= filaInicio + datos.length; r++) {
      const celda = hoja.getCell(r, i + 1);
      if (c.formato) celda.numFmt = c.formato;
      celda.alignment = { vertical: 'middle', horizontal: c.alinear ?? (typeof celda.value === 'number' ? 'center' : 'left') };
    }
  });
  return filaInicio + datos.length;
}

/** Bloque de indicadores (etiqueta + valor) en dos columnas. */
export function indicadores(hoja: Worksheet, filaInicio: number, items: { etiqueta: string; valor: string | number; formato?: string }[]): number {
  items.forEach((it, i) => {
    const r = filaInicio + i;
    const e = hoja.getCell(r, 1);
    const v = hoja.getCell(r, 2);
    e.value = it.etiqueta;
    v.value = it.valor;
    if (it.formato) v.numFmt = it.formato;
    e.font = { color: { argb: 'FF374151' } };
    v.font = { bold: true, size: 12, color: { argb: COLORES.primario } };
    v.alignment = { horizontal: 'right' };
    const fondo = i % 2 === 0 ? COLORES.claro : 'FFFFFFFF';
    for (const c of [e, v]) {
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fondo } };
      c.border = { bottom: { style: 'thin', color: { argb: COLORES.borde } } };
    }
    hoja.getRow(r).height = 20;
  });
  return filaInicio + items.length;
}

export async function descargarLibro(libro: Workbook, nombre: string): Promise<void> {
  const buffer = await libro.xlsx.writeBuffer();
  const url = URL.createObjectURL(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Fecha y hora de Chile como texto: "04-10-2026 12:30". */
export const fechaHoraCL = (d: Date = new Date()) =>
  d.toLocaleString('es-CL', { timeZone: 'America/Santiago', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

/**
 * Excel guarda las fechas sin zona horaria: convierte a la hora de Chile para
 * que la celda muestre la misma hora que se ve en la plataforma.
 */
export function fechaExcel(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Santiago', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return new Date(Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second));
}
