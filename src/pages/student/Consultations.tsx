import React, { useEffect, useState } from 'react';
import { MessageSquare, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listarConsultas, crearConsulta, getCurso } from '../../services/api';
import type { Consulta, Modulo } from '../../types';
import { useToast } from '../../components/ui/Toast';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

function ConsultaCard({ consulta, modulos }: { consulta: Consulta; modulos: Modulo[] }) {
  const [open, setOpen] = useState(false);
  const modulo = modulos.find((m) => m.id === consulta.moduloId);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full text-left p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {modulo ? modulo.nombre : consulta.moduloId}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                consulta.estado === 'respondida'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {consulta.estado === 'respondida' ? 'Respondida' : 'Pendiente'}
            </span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">{consulta.pregunta}</p>
          <p className="text-xs text-gray-500 mt-1">
            {new Date(consulta.fecha).toLocaleDateString('es-CL')}
          </p>
        </div>
        {open ? (
          <ChevronUp size={16} className="text-gray-500 shrink-0 mt-1" />
        ) : (
          <ChevronDown size={16} className="text-gray-500 shrink-0 mt-1" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">Tu pregunta:</p>
            <p className="text-sm text-gray-700">{consulta.pregunta}</p>
          </div>
          {consulta.respuesta ? (
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">Respuesta del instructor:</p>
              <p className="text-sm text-blue-800">{consulta.respuesta}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Esperando respuesta del instructor…</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Consultations() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedModulo, setSelectedModulo] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      listarConsultas({ userId: user.id }),
      getCurso('curso-1'),
    ])
      .then(([cons, curso]) => {
        setConsultas(cons);
        setModulos(curso.modulos);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedModulo || !pregunta.trim()) return;
    setSubmitting(true);
    try {
      const nueva = await crearConsulta({
        userId: user.id,
        moduloId: selectedModulo,
        pregunta: pregunta.trim(),
      });
      setConsultas((prev) => [nueva, ...prev]);
      setPregunta('');
      setSelectedModulo('');
      setShowModal(false);
      toast('Consulta enviada correctamente', 'success');
    } catch {
      toast('Error al enviar la consulta', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-12" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">Mis Consultas</h1>
          <p className="text-sm text-gray-500 mt-0.5">{consultas.length} consulta(s) registrada(s)</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all"
        >
          <Plus size={16} />
          Nueva Consulta
        </button>
      </div>

      {/* List */}
      {consultas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <MessageSquare size={36} className="text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-500">No tienes consultas aún.</p>
          <p className="text-sm text-gray-500 mt-1">
            Haz clic en "Nueva Consulta" para hacer una pregunta.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {consultas.map((c) => (
            <ConsultaCard key={c.id} consulta={c} modulos={modulos} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-primary text-lg">Nueva Consulta</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Módulo</label>
                <select
                  value={selectedModulo}
                  onChange={(e) => setSelectedModulo(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecciona un módulo…</option>
                  {modulos.map((m) => (
                    <option key={m.id} value={m.id}>
                      Módulo {m.orden}: {m.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
                <textarea
                  value={pregunta}
                  onChange={(e) => setPregunta(e.target.value)}
                  placeholder="Escribe tu pregunta al instructor…"
                  rows={4}
                  required
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting || !selectedModulo || !pregunta.trim()}
                  className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 transition-all"
                >
                  {submitting ? 'Enviando…' : 'Enviar Consulta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
