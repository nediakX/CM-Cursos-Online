import React, { useEffect, useState, useCallback } from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { listarEntregas, calificarEntrega, listarUsuarios } from '../../services/api';
import type { EntregaProyecto } from '../../types';
import { useToast } from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';

const EstadoBadge: React.FC<{ estado: EntregaProyecto['estado'] }> = ({ estado }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
    estado === 'revisado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
  }`}>
    {estado === 'revisado' ? 'Revisado' : 'Entregado'}
  </span>
);

interface CalificarModalProps {
  isOpen: boolean;
  onClose: () => void;
  entrega: EntregaProyecto | null;
  onSave: (nota: number, comentario: string) => Promise<void>;
  loading: boolean;
}

const CalificarModal: React.FC<CalificarModalProps> = ({ isOpen, onClose, entrega, onSave, loading }) => {
  const [nota, setNota] = useState<number>(entrega?.nota ?? 4);
  const [comentario, setComentario] = useState(entrega?.comentario ?? '');

  useEffect(() => {
    setNota(entrega?.nota ?? 4);
    setComentario(entrega?.comentario ?? '');
  }, [entrega]);

  if (!entrega) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Calificar Entrega" size="md">
      <div className="flex flex-col gap-4">
        {/* Files */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">Archivos entregados:</p>
          <div className="flex flex-col gap-1.5 bg-gray-50 rounded-lg p-3">
            {entrega.archivos.map((f) => (
              <a
                key={f.nombre}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <ExternalLink size={13} />
                {f.nombre}
              </a>
            ))}
          </div>
        </div>

        {/* Grade */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Nota (1.0 – 7.0) *
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range" min={1} max={7} step={0.1}
              value={nota}
              onChange={(e) => setNota(parseFloat(e.target.value))}
              className="flex-1 accent-primary"
            />
            <input
              type="number" min={1} max={7} step={0.1}
              value={nota}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (v >= 1 && v <= 7) setNota(v);
              }}
              className="w-16 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-center font-bold focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-1 mt-1">
            {[1,2,3,4,5,6,7].map((n) => (
              <div
                key={n}
                className={`w-2 h-2 rounded-full transition-colors ${nota >= n ? 'bg-accent' : 'bg-gray-200'}`}
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              {nota >= 4 ? <span className="text-emerald-600 font-medium">Aprobado</span> : <span className="text-red-700 font-medium">Reprobado</span>}
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Comentario</label>
          <textarea
            rows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Retroalimentación al alumno…"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button
            onClick={() => onSave(nota, comentario)}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            <Star size={14} />
            {loading ? 'Guardando…' : 'Calificar'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

const AdminProjects: React.FC = () => {
  const { toast } = useToast();
  const [entregas, setEntregas] = useState<EntregaProyecto[]>([]);
  const [nombres, setNombres] = useState<Record<string, string>>({});
  useEffect(() => {
    listarUsuarios({ rol: 'alumno' })
      .then((us) => setNombres(Object.fromEntries(us.map((u) => [u.id, `${u.nombres} ${u.apellidos}`]))))
      .catch(() => {});
  }, []);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedEntrega, setSelectedEntrega] = useState<EntregaProyecto | null>(null);

  const fetchEntregas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarEntregas();
      setEntregas(data);
    } catch {
      toast('Error al cargar entregas.', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { void fetchEntregas(); }, [fetchEntregas]);

  const handleCalificar = async (nota: number, comentario: string) => {
    if (!selectedEntrega) return;
    setActionLoading(true);
    try {
      await calificarEntrega(selectedEntrega.id, nota, comentario);
      toast('Entrega calificada correctamente.', 'success');
      setSelectedEntrega(null);
      await fetchEntregas();
    } catch {
      toast('Error al calificar.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Proyectos</h1>
        <p className="text-sm text-gray-500 mt-0.5">{entregas.length} entrega(s)</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando…</div>
        ) : entregas.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No hay entregas de proyectos.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Alumno', 'Fecha Entrega', 'Archivos', 'Estado', 'Nota', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {entregas.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{nombres[e.userId] ?? `Alumno ${e.userId}`}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{new Date(e.fecha).toLocaleDateString('es-CL')}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        {e.archivos.map((f) => (
                          <a key={f.nombre} href={f.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                            <ExternalLink size={11} />{f.nombre}
                          </a>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3"><EstadoBadge estado={e.estado} /></td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                      {e.nota !== undefined ? e.nota.toFixed(1) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedEntrega(e)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-hover transition-colors"
                      >
                        <Star size={12} />
                        {e.estado === 'revisado' ? 'Recalificar' : 'Calificar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CalificarModal
        isOpen={!!selectedEntrega}
        onClose={() => setSelectedEntrega(null)}
        entrega={selectedEntrega}
        onSave={handleCalificar}
        loading={actionLoading}
      />
    </div>
  );
};

export default AdminProjects;
