/**
 * Descarga un CSV que Excel en español abre bien: separador ";", BOM UTF-8
 * (para tildes y ñ) y valores entre comillas cuando hace falta.
 */
export function descargarCSV(filas: Record<string, string | number | null | undefined>[], nombre: string): void {
  if (!filas.length) return;
  const celda = (v: unknown) => {
    const t = v == null ? '' : String(v);
    return /[";\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  };
  const columnas = Object.keys(filas[0]);
  const texto = [columnas.map(celda).join(';'), ...filas.map((f) => columnas.map((c) => celda(f[c])).join(';'))].join('\r\n');
  const url = URL.createObjectURL(new Blob(['﻿' + texto], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
