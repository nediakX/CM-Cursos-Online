import React, { useEffect, useState } from 'react';
import { FileSpreadsheet, Loader2 } from 'lucide-react';
import { exportarReporte } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

type ReporteTipo = 'notas' | 'avance' | 'asistencia';

const TABS: { key: ReporteTipo; label: string }[] = [
  { key: 'notas', label: 'Notas' },
  { key: 'avance', label: 'Avance' },
  { key: 'asistencia', label: 'Asistencia' },
];

const Reports: React.FC = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState<ReporteTipo>('notas');
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);


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
      const { exportarReportesExcel } = await import('../../services/exportarReportes');
      await exportarReportesExcel();
      toast('Excel generado con los tres reportes.', 'success');
    } catch {
      toast('Error al generar el Excel.', 'error');
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
          <p className="text-sm text-gray-500 mt-0.5">Notas, avance y asistencia de los alumnos. El Excel incluye un resumen y los tres reportes.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          {exporting ? <Loader2 size={15} className="animate-spin" /> : <FileSpreadsheet size={15} />}
          {exporting ? 'Generando…' : 'Exportar Excel'}
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

      <p className="text-xs text-gray-500 -mt-2">{data.length} fila(s) en este reporte</p>

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
