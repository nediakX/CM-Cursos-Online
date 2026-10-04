import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, AlertTriangle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listarEvaluaciones, iniciarIntento, enviarIntento, getCurso, getProgreso } from '../../services/api';
import type { Evaluacion, PreguntaSinRespuesta } from '../../types';
import { estadoEvaluacion } from '../../utils/evaluaciones';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

type Step = 'instrucciones' | 'examen';

const TIPO_LABEL: Record<Evaluacion['tipo'], string> = {
  diagnostica: 'Diagnóstica',
  modulo: 'Módulo',
  parcial: 'Parcial',
  simulador_sec: 'Simulador SEC',
  final: 'Examen final',
};

export default function TakeEvaluation() {
  const { evaluacionId } = useParams<{ evaluacionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('instrucciones');
  const [evaluacion, setEvaluacion] = useState<Evaluacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  // Exam state
  const [intentoId, setIntentoId] = useState<string | null>(null);
  const [preguntas, setPreguntas] = useState<PreguntaSinRespuesta[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>({});
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bloqueo, setBloqueo] = useState<string | null>(null);
  const deadlineRef = useRef<number>(0);
  const enviadoRef = useRef(false);

  useEffect(() => {
    if (!evaluacionId || !user) return;
    Promise.all([listarEvaluaciones('curso-1'), getCurso('curso-1'), getProgreso(user.id, 'curso-1')])
      .then(([evals, curso, prog]) => {
        const ev = evals.find((e) => e.id === evaluacionId);
        if (!ev) throw new Error('not found');
        setEvaluacion(ev);
        const estado = estadoEvaluacion(ev, curso, prog, user);
        setBloqueo(estado.desbloqueada ? null : estado.motivo ?? 'Evaluación bloqueada');
      })
      .catch(() => setError('Evaluación no encontrada.'))
      .finally(() => setLoading(false));
  }, [evaluacionId, user]);

  const handleSubmit = useCallback(async () => {
    if (!intentoId || enviadoRef.current) return;
    enviadoRef.current = true;
    setSubmitting(true);
    const total = (evaluacion?.tiempoMinutos ?? 0) * 60;
    const restante = Math.max(0, Math.round((deadlineRef.current - Date.now()) / 1000));
    try {
      await enviarIntento(intentoId, answers, total ? total - restante : undefined);
      navigate(`/app/resultados/${intentoId}`);
    } catch {
      enviadoRef.current = false;
      setSubmitting(false);
      setShowConfirm(false);
      setError('No se pudo enviar el examen. Revisa tu conexión e intenta nuevamente.');
    }
  }, [intentoId, answers, navigate, evaluacion]);

  // Temporizador basado en hora límite (no se desfasa si la pestaña queda en segundo plano)
  const submitRef = useRef(handleSubmit);
  submitRef.current = handleSubmit;
  useEffect(() => {
    if (step !== 'examen') return;
    const tick = () => {
      const restante = Math.max(0, Math.round((deadlineRef.current - Date.now()) / 1000));
      setTimeLeft(restante);
      if (restante <= 0) {
        clearInterval(interval);
        void submitRef.current();
      }
    };
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // Warn on unload
  useEffect(() => {
    if (step !== 'examen') return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [step]);

  const handleStart = async () => {
    if (!evaluacionId) return;
    setStarting(true);
    try {
      const { intentoId: id, preguntas: qs } = await iniciarIntento(evaluacionId);
      const segundos = (evaluacion?.tiempoMinutos ?? 30) * 60;
      deadlineRef.current = Date.now() + segundos * 1000;
      enviadoRef.current = false;
      setIntentoId(id);
      setPreguntas(qs);
      setAnswers({});
      setCurrentQ(0);
      setTimeLeft(segundos);
      setStep('examen');
    } catch (e) {
      setError(e instanceof Error && e.message === 'EVALUACION_BLOQUEADA' ? 'Esta evaluación aún está bloqueada.' : 'Error al iniciar el intento.');
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-48" />
      </div>
    );
  }

  if ((error && step !== 'examen') || !evaluacion) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-2xl">
        {error ?? 'Evaluación no encontrada.'}
      </div>
    );
  }

  // ── Step 1: Instructions ──────────────────────────────────────────────────
  if (step === 'instrucciones') {
    return (
      <div className="max-w-2xl space-y-6">
        <div className="bg-primary rounded-xl p-6 text-white">
          <h1 className="text-xl font-bold mb-1">{evaluacion.nombre}</h1>
          <span className="text-xs bg-accent text-primary px-2.5 py-0.5 rounded-full font-semibold">
            {TIPO_LABEL[evaluacion.tipo]}
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-primary text-lg">Instrucciones</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'N° de preguntas', value: evaluacion.cantidadPreguntas },
              { label: 'Tiempo límite', value: `${evaluacion.tiempoMinutos} minutos` },
              { label: 'Nota mínima', value: evaluacion.notaMinima.toFixed(1) },
              { label: 'Tipo', value: TIPO_LABEL[evaluacion.tipo] },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-lg font-bold text-primary">{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
            <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Antes de comenzar:</p>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>Asegúrate de tener una conexión estable a internet.</li>
                <li>El temporizador comenzará al hacer clic en "Comenzar".</li>
                <li>No cierres esta ventana durante el examen.</li>
              </ul>
            </div>
          </div>

          {bloqueo && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-3 text-sm text-gray-600">
              <Lock size={18} className="text-gray-500 shrink-0 mt-0.5" />
              <span>
                <span className="font-semibold text-gray-700">Evaluación bloqueada.</span> {bloqueo} para poder rendirla.
              </span>
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={starting || !!bloqueo}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-hover disabled:opacity-50 transition-all"
          >
            {starting ? 'Iniciando...' : 'Comenzar Evaluación'}
          </button>
        </div>
      </div>
    );
  }

  // ── Step 2: Exam ──────────────────────────────────────────────────────────
  const question = preguntas[currentQ];
  const answeredCount = Object.keys(answers).length;
  const isLowTime = timeLeft < 120;
  const LETTERS = ['a', 'b', 'c', 'd'] as const;

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="bg-primary text-white px-4 py-3 flex items-center gap-4 shrink-0">
        <div className="flex-1">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${(answeredCount / preguntas.length) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-sm font-medium shrink-0">
          Pregunta {currentQ + 1} de {preguntas.length}
        </p>
        <div
          className={`flex items-center gap-1.5 font-mono font-bold text-sm px-3 py-1 rounded-lg shrink-0 ${
            isLowTime ? 'bg-red-600 text-white' : 'bg-white/20 text-white'
          }`}
        >
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1 p-6 max-w-3xl w-full mx-auto space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">{error}</div>
            )}
            {/* Question */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-xs text-gray-500 mb-2">Pregunta {currentQ + 1}</p>
              <p className="text-base font-medium text-primary leading-relaxed">
                {question.enunciado}
              </p>
            </div>

            {/* Answers */}
            <div className="space-y-3">
              {LETTERS.map((letter) => {
                const text = question.alternativas[letter];
                const selected = answers[question.id] === letter;
                return (
                  <button
                    key={letter}
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [question.id]: letter }))
                    }
                    className={[
                      'w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all',
                      selected
                        ? 'border-accent bg-amber-50'
                        : 'border-gray-200 bg-white hover:border-gray-300',
                    ].join(' ')}
                  >
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                        selected
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {letter.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-700 leading-relaxed pt-0.5">{text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
            <button
              onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
              disabled={currentQ === 0}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={16} /> Anterior
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setMarked((prev) => {
                    const next = new Set(prev);
                    if (next.has(currentQ)) next.delete(currentQ);
                    else next.add(currentQ);
                    return next;
                  })
                }
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  marked.has(currentQ)
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Flag size={13} />
                {marked.has(currentQ) ? 'Marcada' : 'Marcar'}
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-all"
              >
                <CheckCircle size={13} />
                Finalizar
              </button>
            </div>

            <button
              onClick={() => setCurrentQ((q) => Math.min(preguntas.length - 1, q + 1))}
              disabled={currentQ === preguntas.length - 1}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary disabled:opacity-30 transition-colors"
            >
              Siguiente <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right panel: question grid */}
        <div className="w-48 bg-white border-l border-gray-200 p-4 overflow-y-auto shrink-0 hidden md:block">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Preguntas
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {preguntas.map((q, i) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = i === currentQ;
              const isMarked = marked.has(i);
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQ(i)}
                  className={[
                    'w-8 h-8 rounded-lg text-xs font-bold transition-all',
                    isCurrent
                      ? 'bg-primary text-white'
                      : isMarked
                      ? 'bg-blue-200 text-blue-800'
                      : isAnswered
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-500',
                  ].join(' ')}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <div className="mt-4 space-y-2">
            {[
              { color: 'bg-accent', label: 'Respondida' },
              { color: 'bg-primary', label: 'Actual' },
              { color: 'bg-blue-200', label: 'Marcada' },
              { color: 'bg-gray-100', label: 'Sin responder' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${color} shrink-0`} />
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-primary text-lg mb-2">¿Finalizar Examen?</h3>
            <p className="text-sm text-gray-500 mb-2">
              Has respondido{' '}
              <span className="font-semibold text-primary">{answeredCount}</span> de{' '}
              <span className="font-semibold">{preguntas.length}</span> preguntas.
            </p>
            {answeredCount < preguntas.length && (
              <p className="text-sm text-amber-600 mb-4">
                Tienes {preguntas.length - answeredCount} pregunta(s) sin responder.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
              >
                Volver
              </button>
              <button
                onClick={() => void handleSubmit()}
                disabled={submitting}
                className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 transition-all"
              >
                {submitting ? 'Enviando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
