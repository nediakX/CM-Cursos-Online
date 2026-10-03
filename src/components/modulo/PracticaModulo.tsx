import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Target, RotateCcw, ArrowRight, Trophy } from 'lucide-react';
import { listarPreguntas } from '../../services/api';
import type { Dificultad, Pregunta } from '../../types';
import { mezclar } from './Bloques';

type Letra = 'a' | 'b' | 'c' | 'd';
const LETRAS: Letra[] = ['a', 'b', 'c', 'd'];
const DIF_LABEL: Record<Dificultad, string> = { baja: 'Básico', media: 'Intermedio', alta: 'Avanzado' };
const DIF_COLOR: Record<Dificultad, string> = {
  baja: 'bg-emerald-100 text-emerald-700',
  media: 'bg-amber-100 text-amber-700',
  alta: 'bg-red-100 text-red-700',
};

/** Escala chilena 1,0–7,0 con 60% de exigencia. */
const nota = (p: number) => {
  const n = p >= 0.6 ? 4 + (3 * (p - 0.6)) / 0.4 : 1 + (3 * p) / 0.6;
  return Math.round(n * 10) / 10;
};

/**
 * Modo práctica: preguntas del banco del módulo con retroalimentación inmediata.
 * No registra nota; sirve para prepararse antes de rendir la evaluación oficial.
 */
export default function PracticaModulo({ moduloId }: { moduloId: string }) {
  const [banco, setBanco] = useState<Pregunta[] | null>(null);
  const [error, setError] = useState(false);
  const [cantidad, setCantidad] = useState(10);
  const [dificultad, setDificultad] = useState<Dificultad | 'todas'>('todas');

  const [ronda, setRonda] = useState<Pregunta[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, Letra>>({});
  const [revelada, setRevelada] = useState(false);

  useEffect(() => {
    let vivo = true;
    listarPreguntas({ moduloId })
      .then((p) => vivo && setBanco(p))
      .catch(() => vivo && setError(true));
    return () => {
      vivo = false;
    };
  }, [moduloId]);

  const disponibles = (banco ?? []).filter((p) => dificultad === 'todas' || p.dificultad === dificultad);

  const iniciar = (preguntas?: Pregunta[]) => {
    const set = preguntas ?? mezclar(disponibles).slice(0, cantidad);
    setRonda(set);
    setIdx(0);
    setRespuestas({});
    setRevelada(false);
  };

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-sm text-gray-500 text-center">
        El banco de práctica no está disponible en este momento. Puedes seguir con las lecciones y rendir la evaluación del módulo.
      </div>
    );
  }
  if (!banco) return <div className="h-48 bg-gray-200 animate-pulse rounded-xl" />;

  // ── Configuración ───────────────────────────────────────────────────────────
  if (!ronda) {
    const cuenta = (d: Dificultad) => banco.filter((p) => p.dificultad === d).length;
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <Target size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Practica con el banco oficial del módulo</h3>
            <p className="text-sm text-gray-500">
              {banco.length} preguntas tipo examen SEC con corrección inmediata y explicación. La práctica no afecta tus notas.
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Nivel</p>
          <div className="flex flex-wrap gap-2">
            {(['todas', 'baja', 'media', 'alta'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDificultad(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${dificultad === d ? 'border-primary bg-primary text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                {d === 'todas' ? `Todos (${banco.length})` : `${DIF_LABEL[d]} (${cuenta(d)})`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Cantidad de preguntas</p>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 20].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCantidad(n)}
                className={`w-14 py-1.5 rounded-lg text-sm font-semibold border-2 ${cantidad === n ? 'border-accent bg-amber-50 text-primary' : 'border-gray-200 text-gray-600'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          disabled={disponibles.length === 0}
          onClick={() => iniciar()}
          className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-40"
        >
          Comenzar práctica ({Math.min(cantidad, disponibles.length)} preguntas)
        </button>
      </div>
    );
  }

  // ── Resultado ──────────────────────────────────────────────────────────────
  if (idx >= ronda.length) {
    const correctas = ronda.filter((p) => respuestas[p.id] === p.correcta).length;
    const pct = correctas / ronda.length;
    const n = nota(pct);
    const erradas = ronda.filter((p) => respuestas[p.id] !== p.correcta);
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div className="text-center">
          <Trophy size={36} className={`mx-auto mb-2 ${n >= 4 ? 'text-accent' : 'text-gray-300'}`} />
          <p className="text-sm text-gray-500">Resultado de la práctica</p>
          <p className="text-4xl font-bold text-primary mt-1">{n.toFixed(1)}</p>
          <p className="text-sm text-gray-600 mt-1">
            {correctas} de {ronda.length} correctas ({Math.round(pct * 100)}%)
          </p>
          <p className={`text-sm font-semibold mt-2 ${n >= 4 ? 'text-emerald-600' : 'text-red-700'}`}>
            {n >= 4 ? '¡Vas bien! Estás listo para la evaluación del módulo.' : 'Repasa las lecciones y vuelve a practicar.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {erradas.length > 0 && (
            <button type="button" onClick={() => iniciar(mezclar(erradas))} className="flex items-center gap-1.5 px-4 py-2 bg-accent text-primary rounded-lg text-sm font-semibold">
              <RotateCcw size={14} /> Repetir las {erradas.length} erradas
            </button>
          )}
          <button type="button" onClick={() => iniciar()} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
            Nueva práctica
          </button>
          <button type="button" onClick={() => setRonda(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-primary">
            Cambiar configuración
          </button>
        </div>
      </div>
    );
  }

  // ── Pregunta actual ────────────────────────────────────────────────────────
  const p = ronda[idx];
  const sel = respuestas[p.id];
  const ok = sel === p.correcta;
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-gray-500">
          Pregunta {idx + 1} de {ronda.length}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIF_COLOR[p.dificultad]}`}>{DIF_LABEL[p.dificultad]}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-accent transition-all" style={{ width: `${(idx / ronda.length) * 100}%` }} />
      </div>
      <p className="text-base font-medium text-primary leading-relaxed">{p.enunciado}</p>
      <div className="space-y-2">
        {LETRAS.map((l) => {
          let cls = 'border-gray-200 hover:border-gray-300';
          if (revelada && l === p.correcta) cls = 'border-emerald-500 bg-emerald-50';
          else if (revelada && l === sel) cls = 'border-red-400 bg-red-50';
          else if (sel === l) cls = 'border-accent bg-amber-50';
          return (
            <button
              key={l}
              type="button"
              disabled={revelada}
              onClick={() => setRespuestas((r) => ({ ...r, [p.id]: l }))}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border-2 transition-all ${cls}`}
            >
              <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">{l.toUpperCase()}</span>
              <span className="text-sm text-gray-700 pt-1">{p.alternativas[l]}</span>
            </button>
          );
        })}
      </div>
      {revelada ? (
        <>
          <div className={`rounded-xl p-3 text-sm flex gap-2 ${ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>
            {ok ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <XCircle size={18} className="text-red-700 shrink-0" />}
            <div>
              <p className="font-semibold">{ok ? '¡Correcto!' : `Incorrecto — la respuesta es ${p.correcta.toUpperCase()}`}</p>
              <p className="mt-0.5">{p.explicacion}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setIdx((i) => i + 1);
              setRevelada(false);
            }}
            className="flex items-center gap-1.5 px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover"
          >
            {idx + 1 === ronda.length ? 'Ver resultado' : 'Siguiente'} <ArrowRight size={14} />
          </button>
        </>
      ) : (
        <button
          type="button"
          disabled={!sel}
          onClick={() => setRevelada(true)}
          className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-primary-hover"
        >
          Responder
        </button>
      )}
    </div>
  );
}
