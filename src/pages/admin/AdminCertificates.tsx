import React, { useEffect, useState, useCallback } from 'react';
import { Eye, Download, XCircle, Search } from 'lucide-react';
import { listarTodosCertificados, anularCertificado } from '../../services/api';
import type { Certificado, User } from '../../types';

type CertificadoConUsuario = Certificado & { usuario: User };
import { useSitio } from '../../context/SiteContext';
import { useToast } from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';

const EstadoBadge: React.FC<{ estado: Certificado['estado'] }> = ({ estado }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
    estado === 'vigente' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
  }`}>
    {estado === 'vigente' ? 'Vigente' : 'Anulado'}
  </span>
);

const AdminCertificates: React.FC = () => {
  const { toast } = useToast();
  const { sitio } = useSitio();
  const [certificados, setCertificados] = useState<CertificadoConUsuario[]>([]);
  const [filtered, setFiltered] = useState<CertificadoConUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [anularTarget, setAnularTarget] = useState<CertificadoConUsuario | null>(null);

  const fetchCertificados = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarTodosCertificados();
      setCertificados(data);
      setFiltered(data);
    } catch {
      toast('Error al cargar certificados.', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { void fetchCertificados(); }, [fetchCertificados]);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(certificados);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(certificados.filter(c =>
      c.codigoVerificacion.toLowerCase().includes(q) ||
      c.usuario.rut.toLowerCase().includes(q) ||
      `${c.usuario.nombres} ${c.usuario.apellidos}`.toLowerCase().includes(q)
    ));
  }, [search, certificados]);

  const handleAnular = async () => {
    if (!anularTarget) return;
    setActionLoading(true);
    try {
      await anularCertificado(anularTarget.id);
      toast('Certificado anulado.', 'success');
      await fetchCertificados();
    } catch {
      toast('Error al anular certificado.', 'error');
    } finally {
      setActionLoading(false);
      setAnularTarget(null);
    }
  };

  const handleDownload = (cert: Certificado) => {
    // Descarga simple en texto (reemplazar por PDF generado en el backend)
    const content = [
      'CERTIFICADO DE APROBACIÓN',
      '========================',
      '',
      `Código: ${cert.codigoVerificacion}`,
      `Usuario ID: ${cert.userId}`,
      `Curso ID: ${cert.cursoId}`,
      `Fecha de Emisión: ${new Date(cert.fechaEmision).toLocaleDateString('es-CL')}`,
      `Nota Final: ${cert.notaFinal.toFixed(1)}`,
      `Horas: ${cert.horas}`,
      `Estado: ${cert.estado}`,
      '',
      `${sitio.marca.nombre} ${sitio.marca.subtitulo}`.trim(),
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado-${cert.codigoVerificacion}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Certificados</h1>
        <p className="text-sm text-gray-500 mt-0.5">{filtered.length} certificado(s)</p>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 max-w-sm">
        <Search size={15} className="text-gray-500" />
        <input
          placeholder="Buscar por RUT o código…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none bg-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando…</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No se encontraron certificados.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Alumno', 'Curso', 'Fecha Emisión', 'Nota', 'Código', 'Estado', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{c.usuario.nombres} {c.usuario.apellidos}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{c.cursoId}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(c.fechaEmision).toLocaleDateString('es-CL')}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{c.notaFinal.toFixed(1)}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{c.codigoVerificacion}</td>
                    <td className="px-4 py-3"><EstadoBadge estado={c.estado} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          title="Ver"
                          className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => toast(`Código: ${c.codigoVerificacion}`, 'info')}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Descargar"
                          onClick={() => handleDownload(c)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          <Download size={15} />
                        </button>
                        {c.estado === 'vigente' && (
                          <button
                            title="Anular"
                            onClick={() => setAnularTarget(c)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <XCircle size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!anularTarget}
        onClose={() => setAnularTarget(null)}
        onConfirm={handleAnular}
        loading={actionLoading}
        variant="danger"
        title="Anular Certificado"
        message={`¿Estás seguro de anular el certificado ${anularTarget?.codigoVerificacion}? Esta acción no se puede deshacer.`}
        confirmLabel="Anular"
      />
    </div>
  );
};

export default AdminCertificates;
