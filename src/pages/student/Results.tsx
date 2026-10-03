import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, ChevronDown, ChevronUp, RotateCcw, ArrowLeft } from 'lucide-react';
import { getResultado, listarEvaluaciones } from '../../services/api';
import type { ResultadoIntento, Evaluacion } from '../../types';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

function AccordionItem({
  index,
  pregunta,
  studentAnswer,
}: {
  index: number;
  pregunta: ResultadoIntento['preguntas'][number];
  studentAnswer?: 'a' | 'b' | 'c' | 'd';
}) {
  const [open, setOpen] = useState(false);
  const isCorrect = studentAnswer === pregunta.correcta;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
          }`}
        >
          {index + 1}
        </span>
        <p className="flex-1 text-sm text-gray-700 leading-snug line-clamp-2">
          {pregunta.enunciado}
        </p>
        <span className="shrink-0">
          {isCorrect ? (
            <CheckCircle2 size={16} className="text-emerald-500" />
          ) : (
            <XCircle size={16} className="text-red-700" />
          )}
        </span>
        {open ? (
          <ChevronUp size={16} className="text-gray-500 shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-gray-500 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          {/* Student answer */}
          <div>
            <p className="text-xs text-gray-500 mb-1 font-medium">Tu respuesta:</p>
            {studentAnswer ? (
              <div
                className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                  isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}
              >
                <span className="font-bold shrink-0">
                  {studentAnswer.toUpperCase()}.
                </span>
                <span>{pregunta.alternativas[studentAnswer]}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Sin responder</p>
            )}
          </div>

          {/* Correct answer (only if wrong) */}
          {!isCorrect && (
            <div>
              <p className="text-xs text-gray-500 mb-1 font-medium">Respuesta correcta:</p>
              <div className="flex items-start gap-2 p-3 rounded-lg text-sm bg-emerald-50 text-emerald-800">
                <span className="font-bold shrink-0">{pregunta.correcta.toUpperCase()}.</span>
                <span>{pregunta.alternativas[pregunta.correcta]}</span>
              </div>
            </div>
          )}

          {/* Explanation */}
          {pregunta.explicacion && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">Explicación:</p>
              <p className="text-sm text-blue-800">{pregunta.explicacion}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Results() {
  const { intentoId } = useParams<{ intentoId: string }>();
  const navigate = useNavigate();

  const [resultado, setResultado] = useState<ResultadoIntento | null>(null);
  const [evaluacion, setEvaluacion] = useState<Evaluacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!intentoId) return;
    Promise.all([getResultado(intentoId), listarEvaluaciones('curso-1')])
      .then(([res, evals]) => {
        setResultado(res);
        const ev = evals.find((e) => e.id === res.evaluacionId);
        setEvaluacion(ev ?? null);
      })
      .catch(() => setError('No se pudo cargar el resultado.'))
      .finally(() => setLoading(false));
  }, [intentoId]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error || !resultado) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-3xl">
        {error ?? 'Resultado no encontrado.'}
      </div>
    );
  }

  const minutesUsed = resultado.tiempoUsado ? Math.floor(resultado.tiempoUsado / 60) : null;
  const moduloId = evaluacion?.moduloId;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Result card */}
      <div
        className={`rounded-xl shadow-sm p-8 text-center ${
          resultado.aprobado ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
        }`}
      >
        <div
          className={`text-7xl font-extrabold mb-2 ${
            resultado.aprobado ? 'text-emerald-600' : 'text-red-700'
          }`}
        >
          {resultado.nota.toFixed(1)}
        </div>
        <div
          className={`text-lg font-bold tracking-widest mb-4 ${
            resultado.aprobado ? 'text-emerald-700' : 'text-red-600'
          }`}
        >
          {resultado.aprobado ? 'APROBADO' : 'REPROBADO'}
        </div>

        <div className="flex justify-center gap-8 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Correctas</p>
            <p className="font-bold text-primary text-lg">
              {resultado.puntaje} / {resultado.preguntas.length}
            </p>
          </div>
          {minutesUsed !== null && (
            <div className="text-center">
              <p className="text-gray-500">Tiempo utilizado</p>
              <p className="font-bold text-primary text-lg flex items-center gap-1 justify-center">
                <Clock size={16} /> {minutesUsed} min
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Evaluacion name */}
      {evaluacion && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-xs text-gray-500 mb-1">Evaluación</p>
          <p className="font-semibold text-primary">{evaluacion.nombre}</p>
        </div>
      )}

      {/* Review */}
      <div className="space-y-3">
        <h2 className="font-semibold text-primary text-lg">Revisión de Preguntas</h2>
        {resultado.preguntas.map((pregunta, i) => (
          <AccordionItem
            key={pregunta.id}
            index={i}
            pregunta={pregunta}
            studentAnswer={resultado.respuestas[pregunta.id]}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        {moduloId && (
          <button
            onClick={() => navigate(`/app/modulos/${moduloId}`)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            <ArrowLeft size={15} />
            Volver al módulo
          </button>
        )}
        {evaluacion && (
          <button
            onClick={() => navigate(`/app/evaluaciones/${evaluacion.id}/rendir`)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-all"
          >
            <RotateCcw size={15} />
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
