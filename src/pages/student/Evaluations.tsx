import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, HelpCircle, ChevronRight, CheckCircle, XCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listarEvaluaciones, listarIntentos, getCurso, getProgreso } from '../../services/api';
import type { Curso, Evaluacion, Intento, Progreso, TipoEvaluacion } from '../../types';
import { estadoEvaluacion } from '../../utils/evaluaciones';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

const TIPO_LABELS: Record<TipoEvaluacion, string> = {
  diagnostica: 'Diagnóstica',
  modulo: 'Módulo',
  parcial: 'Parcial',
  simulador_sec: 'Simulador SEC',
  final: 'Final',
};

const TIPO_COLORS: Record<TipoEvaluacion, string> = {
  diagnostica: 'bg-purple-100 text-purple-700',
  modulo: 'bg-blue-100 text-blue-700',
  parcial: 'bg-amber-100 text-amber-700',
  simulador_sec: 'bg-orange-100 text-orange-700',
  final: 'bg-red-100 text-red-700',
};

const TIPO_ORDER: TipoEvaluacion[] = ['diagnostica', 'modulo', 'parcial', 'simulador_sec', 'final'];

export default function Evaluations() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [intentos, setIntentos] = useState<Intento[]>([]);
  const [curso, setCurso] = useState<Curso | null>(null);
  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([listarEvaluaciones('curso-1'), listarIntentos(user.id), getCurso('curso-1'), getProgreso(user.id, 'curso-1')])
      .then(([evs, ints, c, p]) => {
        setEvaluaciones(evs);
        setIntentos(ints);
        setCurso(c);
        setProgreso(p);
      })
      .catch(() => setError('Error al cargar evaluaciones.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-3xl">{error}</div>;
  }

  // Group by tipo
  const grouped = TIPO_ORDER.reduce<Record<string, Evaluacion[]>>((acc, tipo) => {
    const evs = evaluaciones.filter((e) => e.tipo === tipo);
    if (evs.length > 0) acc[tipo] = evs;
    return acc;
  }, {});

  const getBestIntento = (evaluacionId: string): Intento | null => {
    const evIntentos = intentos.filter((i) => i.evaluacionId === evaluacionId);
    if (evIntentos.length === 0) return null;
    return evIntentos.reduce((best, i) => (i.nota > best.nota ? i : best));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">Evaluaciones</h1>

      {Object.entries(grouped).map(([tipo, evs]) => (
        <div key={tipo}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            {TIPO_LABELS[tipo as TipoEvaluacion]}
          </h2>
          <div className="space-y-3">
            {evs.map((ev) => {
              const best = getBestIntento(ev.id);
              const estado = curso && progreso ? estadoEvaluacion(ev, curso, progreso, user) : { desbloqueada: false };
              return (
                <button
                  key={ev.id}
                  disabled={!estado.desbloqueada}
                  onClick={() => navigate(`/app/evaluaciones/${ev.id}/rendir`)}
                  className={`w-full bg-white rounded-xl shadow-sm p-4 text-left transition-shadow ${estado.desbloqueada ? 'hover:shadow-md' : 'opacity-60 cursor-not-allowed'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${TIPO_COLORS[ev.tipo]}`}
                        >
                          {TIPO_LABELS[ev.tipo]}
                        </span>
                        {best && (
                          best.aprobado ? (
                            <CheckCircle size={14} className="text-emerald-500" />
                          ) : (
                            <XCircle size={14} className="text-red-400" />
                          )
                        )}
                      </div>
                      <p className="font-semibold text-primary text-sm truncate pr-4">
                        {ev.nombre}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <HelpCircle size={12} /> {ev.cantidadPreguntas} preguntas
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {ev.tiempoMinutos} min
                        </span>
                        <span>Nota mínima: {ev.notaMinima.toFixed(1)}</span>
                      </div>
                      {!estado.desbloqueada && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Lock size={11} /> {estado.motivo}
                        </p>
                      )}
                      {best && (
                        <p
                          className={`text-xs font-semibold mt-1 ${
                            best.aprobado ? 'text-emerald-600' : 'text-red-700'
                          }`}
                        >
                          Mejor nota: {best.nota.toFixed(1)} ({best.aprobado ? 'Aprobado' : 'Reprobado'})
                        </p>
                      )}
                    </div>
                    {estado.desbloqueada ? <ChevronRight size={18} className="text-gray-500 shrink-0" /> : <Lock size={16} className="text-gray-500 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
