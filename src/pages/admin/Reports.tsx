import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { exportarReporte } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

type ReporteTipo = 'notas' | 'avance' | 'asistencia';

const TABS: { key: ReporteTipo; label: string }[] = [
  { key: 'notas', label: 'Notas' },
  { key: 'avance', label: 'Avance' },
  { key: 'asistencia', label: 'Asistencia' },
];

const downloadCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data.length) return;
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(r => Object.values(r).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + headers + '\n' + rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const Reports: React.FC = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState<ReporteTipo>('notas');
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Date filters
  const [fechaDesde, setFechaDesde] = useState('2024-01-01');
  const [fechaHasta, setFechaHasta] = useState(new Date().toISOString().slice(0, 10));

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await exportarReporte(tab);
      setData(result);
    } catch {
      toast('Error al cargar reporte.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void fetchData(); }, [tab]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const result = await exportarReporte(tab);
      downloadCSV(result, `reporte_${tab}_${new Date().toISOString().slice(0, 10)}.csv`);
      toast('Reporte exportado correctamente.', 'success');
    } catch {
      toast('Error al exportar reporte.', 'error');
    } finally {
      setExporting(false);
    }
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Reportes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Generación y exportación de reportes</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting || data.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          <Download size={15} />
          {exporting ? 'Exportando…' : 'Exportar CSV'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === key
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div>
          <label htmlFor="fecha-desde" className="block text-xs font-medium text-gray-600 mb-1">Fecha Desde</label>
          <input
            id="fecha-desde"
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label htmlFor="fecha-hasta" className="block text-xs font-medium text-gray-600 mb-1">Fecha Hasta</label>
          <input
            id="fecha-hasta"
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          Aplicar Filtros
        </button>
        <p className="text-xs text-gray-500 self-center">
          {data.length} fila(s) en el reporte actual
        </p>
      </div>

      {/* Preview table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando datos…</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">Sin datos para este reporte.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {headers.map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    {headers.map(h => (
                      <td key={h} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                        {String(row[h] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Reports;
