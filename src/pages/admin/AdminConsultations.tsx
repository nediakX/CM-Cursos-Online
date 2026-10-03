import React, { useEffect, useState, useCallback } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { listarConsultas, responderConsulta, listarUsuarios, getCurso } from '../../services/api';
import type { Consulta } from '../../types';
import { useToast } from '../../components/ui/Toast';

type FiltroEstado = 'todas' | 'pendiente' | 'respondida';

const EstadoBadge: React.FC<{ estado: Consulta['estado'] }> = ({ estado }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
    estado === 'pendiente' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
  }`}>
    {estado === 'pendiente' ? 'Pendiente' : 'Respondida'}
  </span>
);

const AdminConsultations: React.FC = () => {
  const { toast } = useToast();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [nombres, setNombres] = useState<Record<string, string>>({});
  const [modulos, setModulos] = useState<Record<string, string>>({});
  useEffect(() => {
    listarUsuarios({ rol: 'alumno' })
      .then((us) => setNombres(Object.fromEntries(us.map((u) => [u.id, `${u.nombres} ${u.apellidos}`]))))
      .catch(() => {});
    getCurso('curso-1')
      .then((c) => setModulos(Object.fromEntries(c.modulos.map((m) => [m.id, `Módulo ${m.orden}: ${m.nombre}`]))))
      .catch(() => {});
  }, []);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<FiltroEstado>('todas');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);

  const fetchConsultas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarConsultas({ estado: filtro !== 'todas' ? filtro : undefined });
      setConsultas(data);
    } catch {
      toast('Error al cargar consultas.', 'error');
    } finally {
      setLoading(false);
    }
  }, [filtro, toast]);

  useEffect(() => { void fetchConsultas(); }, [fetchConsultas]);

  const handleResponder = async (consultaId: string) => {
    const respuesta = respuestas[consultaId]?.trim();
    if (!respuesta) return;
    setSubmitting(consultaId);
    try {
      await responderConsulta(consultaId, respuesta);
      toast('Respuesta enviada correctamente.', 'success');
      setRespuestas((p) => ({ ...p, [consultaId]: '' }));
      setExpanded(null);
      await fetchConsultas();
    } catch {
      toast('Error al enviar respuesta.', 'error');
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Consultas</h1>
        <p className="text-sm text-gray-500 mt-0.5">{consultas.length} consulta(s)</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {(['todas', 'pendiente', 'respondida'] as FiltroEstado[]).map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px capitalize ${
              filtro === f
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {f === 'todas' ? 'Todas' : f === 'pendiente' ? 'Pendientes' : 'Respondidas'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 text-sm">Cargando…</div>
      ) : consultas.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center">
          <MessageSquare size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-500">No hay consultas {filtro !== 'todas' ? filtro + 's' : ''}.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {consultas.map((c) => {
            const isOpen = expanded === c.id;
            return (
              <div key={c.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">{nombres[c.userId] ?? `Alumno ${c.userId}`}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{modulos[c.moduloId] ?? `Módulo: ${c.moduloId}`}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{new Date(c.fecha).toLocaleDateString('es-CL')}</span>
                    </div>
                    <p className="text-sm text-gray-800 truncate">{c.pregunta}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <EstadoBadge estado={c.estado} />
                    {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-semibold text-gray-500 mb-1">Pregunta completa:</p>
                      <p className="text-sm text-gray-800">{c.pregunta}</p>
                    </div>

                    {c.respuesta && (
                      <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <p className="text-xs font-semibold text-emerald-600 mb-1">Respuesta enviada:</p>
                        <p className="text-sm text-emerald-800">{c.respuesta}</p>
                      </div>
                    )}

                    {c.estado === 'pendiente' && (
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Tu respuesta:</label>
                        <textarea
                          rows={3}
                          value={respuestas[c.id] ?? ''}
                          onChange={(e) => setRespuestas((p) => ({ ...p, [c.id]: e.target.value }))}
                          placeholder="Escribe tu respuesta aquí…"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => handleResponder(c.id)}
                            disabled={submitting === c.id || !respuestas[c.id]?.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
                          >
                            <Send size={14} />
                            {submitting === c.id ? 'Enviando…' : 'Responder'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminConsultations;
