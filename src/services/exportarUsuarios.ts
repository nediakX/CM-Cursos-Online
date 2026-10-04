/**
 * Exportación de usuarios a Excel con diseño: hoja de resumen, listado de
 * usuarios como tabla de Excel y matrices de avance y notas por módulo.
 */
import type { User } from '../types';
import { getCurso, getHabilitacion, listarIngresos, type FilaHabilitacion } from './api';
import { formatearRut } from '../utils/rut';
import { COLORES, descargarLibro, encabezado, fechaExcel, fechaHoraCL, indicadores, nuevoLibro, tabla, type Columna } from '../utils/excel';

export async function exportarUsuariosExcel(usuarios: User[], filtros: string): Promise<void> {
  const [curso, habilitacion, ingresos] = await Promise.all([getCurso('curso-1'), getHabilitacion(), listarIngresos()]);
  const modulos = [...curso.modulos].sort((a, b) => a.orden - b.orden);
  const porAlumno = new Map<string, FilaHabilitacion>(habilitacion.map((h) => [h.userId, h]));
  const ultimoIngreso = new Map(ingresos.map((x) => [x.userId, x.ingresos.reduce<string | null>((m, i) => (!m || i.fecha > m ? i.fecha : m), null)]));
  const hace30 = Date.now() - 30 * 24 * 3600 * 1000;
  const ingresos30 = new Map(ingresos.map((x) => [x.userId, x.ingresos.filter((i) => new Date(i.fecha).getTime() >= hace30).length]));

  const ordenados = [...usuarios].sort((a, b) => (a.rol === b.rol ? `${a.apellidos} ${a.nombres}`.localeCompare(`${b.apellidos} ${b.nombres}`, 'es') : a.rol === 'admin' ? -1 : 1));
  const alumnos = ordenados.filter((u) => u.rol === 'alumno');

  const avanceTotal = (u: User) => {
    const h = porAlumno.get(u.id);
    if (!h) return null;
    const total = modulos.reduce((s, m) => s + m.lecciones.length, 0);
    const hechas = modulos.reduce((s, m) => s + Math.round(((h.modulos[m.id]?.avance ?? 0) / 100) * m.lecciones.length), 0);
    return total ? hechas / total : 0;
  };
  const aprobadas = (u: User) => {
    const h = porAlumno.get(u.id);
    return h ? modulos.filter((m) => h.modulos[m.id]?.aprobado).length : null;
  };
  const verificacion = (u: User) =>
    u.rol !== 'alumno' ? '—' : u.requiereRostro === false ? 'No exigida' : u.rostroRegistrado ? 'Registrado' : 'Pendiente';

  const libro = await nuevoLibro();
  const generado = `Generado el ${fechaHoraCL()} · ${curso.nombre}${filtros ? ` · Filtros: ${filtros}` : ''}`;

  // ── Hoja 1: Resumen ─────────────────────────────────────────────────────────
  const resumen = libro.addWorksheet('Resumen', { views: [{ showGridLines: false }], properties: { tabColor: { argb: COLORES.acento } } });
  resumen.getColumn(1).width = 62;
  resumen.getColumn(2).width = 18;
  let fila = encabezado(resumen, 'Reporte de usuarios · CM Ingenierías', generado, 2);
  const avances = alumnos.map(avanceTotal).filter((x): x is number => x !== null);
  const sub = resumen.getCell(fila, 1);
  sub.value = 'Indicadores generales';
  sub.font = { bold: true, size: 12, color: { argb: COLORES.primario } };
  fila = indicadores(resumen, fila + 1, [
    { etiqueta: 'Usuarios en el reporte', valor: ordenados.length },
    { etiqueta: 'Alumnos', valor: alumnos.length },
    { etiqueta: 'Administradores', valor: ordenados.length - alumnos.length },
    { etiqueta: 'Alumnos activos', valor: alumnos.filter((u) => u.activo).length },
    { etiqueta: 'Alumnos inactivos', valor: alumnos.filter((u) => !u.activo).length },
    { etiqueta: 'Avance promedio del curso', valor: avances.length ? avances.reduce((a, b) => a + b, 0) / avances.length : 0, formato: '0%' },
    { etiqueta: 'Alumnos que completaron el curso', valor: avances.filter((a) => a >= 1).length },
    { etiqueta: 'Alumnos con rostro registrado', valor: alumnos.filter((u) => u.rostroRegistrado).length },
    { etiqueta: 'Alumnos con ingreso en los últimos 30 días', valor: alumnos.filter((u) => (ingresos30.get(u.id) ?? 0) > 0).length },
  ]);
  fila += 1;
  const sub2 = resumen.getCell(fila, 1);
  sub2.value = 'Alumnos por módulo habilitado';
  sub2.font = { bold: true, size: 12, color: { argb: COLORES.primario } };
  indicadores(
    resumen,
    fila + 1,
    modulos.map((m) => ({
      etiqueta: `M${m.orden} · ${m.nombre}`,
      valor: alumnos.filter((u) => porAlumno.get(u.id)?.modulosHabilitados.includes(m.id)).length,
    })),
  );

  // ── Hoja 2: Usuarios ────────────────────────────────────────────────────────
  const hojaU = libro.addWorksheet('Usuarios', { views: [{ state: 'frozen', ySplit: 4, xSplit: 3, showGridLines: false }] });
  const colsU: Columna<User>[] = [
    { titulo: 'N°', valor: (u) => ordenados.indexOf(u) + 1, ancho: 6, alinear: 'center' },
    { titulo: 'RUT', valor: (u) => formatearRut(u.rut), ancho: 14 },
    { titulo: 'Apellidos', valor: (u) => u.apellidos, ancho: 22 },
    { titulo: 'Nombres', valor: (u) => u.nombres, ancho: 22 },
    { titulo: 'Correo', valor: (u) => u.email, ancho: 30 },
    { titulo: 'Teléfono', valor: (u) => u.telefono || '', ancho: 15 },
    { titulo: 'Rol', valor: (u) => (u.rol === 'admin' ? 'Administrador' : 'Alumno'), ancho: 15, alinear: 'center' },
    { titulo: 'Estado', valor: (u) => (u.activo ? 'Activo' : 'Inactivo'), ancho: 11, alinear: 'center' },
    { titulo: 'Fecha de creación', valor: (u) => fechaExcel(u.creadoEn), ancho: 14, formato: 'dd-mm-yyyy', alinear: 'center' },
    { titulo: 'Avance del curso', valor: (u) => (u.rol === 'alumno' ? avanceTotal(u) : null), ancho: 13, formato: '0%', alinear: 'center' },
    { titulo: 'Módulos habilitados', valor: (u) => (u.rol === 'alumno' ? `${porAlumno.get(u.id)?.modulosHabilitados.length ?? 0} de ${modulos.length}` : '—'), ancho: 13, alinear: 'center' },
    { titulo: 'Evaluaciones de módulo aprobadas', valor: (u) => (u.rol === 'alumno' ? aprobadas(u) : null), ancho: 15, alinear: 'center' },
    { titulo: 'Verificación facial', valor: verificacion, ancho: 13, alinear: 'center' },
    { titulo: 'Ingresos (30 días)', valor: (u) => (u.rol === 'alumno' ? (ingresos30.get(u.id) ?? 0) : null), ancho: 12, alinear: 'center' },
    { titulo: 'Último ingreso', valor: (u) => fechaExcel(ultimoIngreso.get(u.id)), ancho: 17, formato: 'dd-mm-yyyy hh:mm', alinear: 'center' },
  ];
  const finU = tabla(hojaU, { nombre: 'Usuarios', filaInicio: 4, columnas: colsU, filas: ordenados });
  encabezado(hojaU, 'Listado de usuarios', generado, colsU.length);
  hojaU.getRow(4).height = 34;
  if (ordenados.length) {
    const rango = (col: number) => `${hojaU.getCell(5, col).address}:${hojaU.getCell(finU, col).address}`;
    const estado = colsU.findIndex((c) => c.titulo === 'Estado') + 1;
    hojaU.addConditionalFormatting({
      ref: rango(estado),
      rules: [
        { type: 'containsText', operator: 'containsText', text: 'Inactivo', priority: 1, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: COLORES.rojo } }, font: { color: { argb: COLORES.rojoTexto } } } },
        { type: 'containsText', operator: 'containsText', text: 'Activo', priority: 2, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: COLORES.verde } }, font: { color: { argb: COLORES.verdeTexto } } } },
      ],
    });
    const avance = colsU.findIndex((c) => c.titulo === 'Avance del curso') + 1;
    hojaU.addConditionalFormatting({
      ref: rango(avance),
      rules: [{ type: 'dataBar', priority: 3, minLength: 0, maxLength: 100, cfvo: [{ type: 'num', value: 0 }, { type: 'num', value: 1 }], color: { argb: 'FF5B8DEF' } } as never],
    });
    const facial = colsU.findIndex((c) => c.titulo === 'Verificación facial') + 1;
    hojaU.addConditionalFormatting({
      ref: rango(facial),
      rules: [{ type: 'containsText', operator: 'containsText', text: 'Pendiente', priority: 4, style: { font: { color: { argb: 'FFB45309' }, bold: true } } }],
    });
  }
  hojaU.pageSetup = { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, printTitlesRow: '4:4' };

  // ── Hojas 3 y 4: avance y notas por módulo (sólo alumnos) ───────────────────
  const matriz = (nombreHoja: string, nombreTabla: string, titulo: string, valor: (h: FilaHabilitacion | undefined, moduloId: string) => number | string | null, formato?: string) => {
    const hoja = libro.addWorksheet(nombreHoja, { views: [{ state: 'frozen', ySplit: 4, xSplit: 2, showGridLines: false }] });
    const cols: Columna<User>[] = [
      { titulo: 'Alumno', valor: (u) => `${u.apellidos}, ${u.nombres}`, ancho: 32 },
      { titulo: 'RUT', valor: (u) => formatearRut(u.rut), ancho: 14 },
      ...modulos.map((m) => ({ titulo: `M${m.orden}`, valor: (u: User) => valor(porAlumno.get(u.id), m.id), ancho: 8, formato, alinear: 'center' as const })),
    ];
    const fin = tabla(hoja, { nombre: nombreTabla, filaInicio: 4, columnas: cols, filas: alumnos, estilo: 'TableStyleLight9' });
    encabezado(hoja, titulo, `${generado} · M1 a M${modulos.length}: ${modulos.map((m) => `M${m.orden} ${m.nombre}`).join(' · ')}`.slice(0, 250), cols.length);
    hoja.getRow(2).height = 32;
    hoja.getCell(2, 1).alignment = { wrapText: true, vertical: 'middle', indent: 1 };
    // Nombres completos de los módulos como nota en cada encabezado
    modulos.forEach((m, i) => {
      hoja.getCell(4, i + 3).note = m.nombre;
    });
    return { hoja, rango: alumnos.length ? `${hoja.getCell(5, 3).address}:${hoja.getCell(fin, cols.length).address}` : null };
  };

  const av = matriz('Avance por módulo', 'AvanceModulos', 'Avance de lecciones por módulo', (h, id) => (h ? (h.modulos[id]?.avance ?? 0) / 100 : null), '0%');
  if (av.rango) {
    av.hoja.addConditionalFormatting({
      ref: av.rango,
      rules: [{ type: 'colorScale', priority: 1, cfvo: [{ type: 'num', value: 0 }, { type: 'num', value: 0.5 }, { type: 'num', value: 1 }], color: [{ argb: 'FFFFFFFF' }, { argb: 'FFFFE8A3' }, { argb: 'FF86EFAC' }] }],
    });
  }

  const notas = matriz('Notas por módulo', 'NotasModulos', 'Mejor nota de la evaluación de cada módulo (escala 1,0 a 7,0)', (h, id) => h?.modulos[id]?.nota ?? null, '0.0');
  if (notas.rango) {
    notas.hoja.addConditionalFormatting({
      ref: notas.rango,
      rules: [
        { type: 'cellIs', operator: 'greaterThan', formulae: ['3.99'], priority: 1, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: COLORES.verde } }, font: { color: { argb: COLORES.verdeTexto }, bold: true } } },
        { type: 'cellIs', operator: 'between', formulae: ['1', '3.99'], priority: 2, style: { fill: { type: 'pattern', pattern: 'solid', bgColor: { argb: COLORES.rojo } }, font: { color: { argb: COLORES.rojoTexto }, bold: true } } },
      ],
    });
  }

  const hoy = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Santiago' });
  await descargarLibro(libro, `usuarios_cm_${hoy}.xlsx`);
}
