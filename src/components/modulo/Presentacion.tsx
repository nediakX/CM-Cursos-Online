import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import type { BloqueDiapositiva, Diapositiva, ItemDiapositiva } from '../../types';

/** Muestra "Etiqueta: valor" con la etiqueta destacada. */
function Dato({ texto }: { texto: string }) {
  const i = texto.indexOf(':');
  if (i <= 0 || i > 60) return <>{texto}</>;
  return (
    <>
      <span className="font-semibold text-primary">{texto.slice(0, i + 1)}</span>
      {texto.slice(i + 1)}
    </>
  );
}

function Item({ item, resumen }: { item: ItemDiapositiva; resumen: boolean }) {
  switch (item.tipo) {
    case 'punto':
      return (
        <li className="flex gap-2.5">
          {resumen ? (
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
          ) : (
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          )}
          <span>
            <Dato texto={item.texto} />
          </span>
        </li>
      );
    case 'encabezado':
      return item.texto.length <= 32 ? (
        <li className="pt-1 text-sm font-semibold uppercase tracking-wide text-gray-500">{item.texto.replace(/:$/, '')}</li>
      ) : (
        <li className="pt-1 font-semibold text-gray-700">{item.texto}</li>
      );
    case 'formula':
      return (
        <li>
          <code className="inline-block rounded-lg bg-primary/5 px-3 py-1.5 font-mono text-[0.95em] text-primary">{item.texto}</code>
        </li>
      );
    case 'dato':
      return (
        <li className="rounded-lg bg-gray-50 px-3 py-1.5">
          <Dato texto={item.texto} />
        </li>
      );
    default:
      return <li className="leading-relaxed text-gray-700">{item.texto}</li>;
  }
}

function Bloque({ bloque, resumen }: { bloque: BloqueDiapositiva; resumen: boolean }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      {bloque.subtitulo && <h3 className="mb-3 text-lg font-bold text-primary">{bloque.subtitulo}</h3>}
      <ul className="space-y-2 text-[0.95rem] text-gray-800 sm:text-base">
        {bloque.items.map((it, i) => (
          <Item key={i} item={it} resumen={resumen} />
        ))}
      </ul>
    </section>
  );
}

function Diapo({ d, modulo }: { d: Diapositiva; modulo: string }) {
  if (d.tipo === 'portada') {
    const objetivo = d.bloques[0]?.items[0]?.texto;
    return (
      <div className="flex h-full min-h-[420px] flex-col justify-center gap-5 bg-gradient-to-br from-primary to-primary-hover p-8 text-white sm:p-12">
        <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">{d.etiqueta ?? modulo}</span>
        <h2 className="text-2xl font-black leading-tight sm:text-4xl">{d.titulo}</h2>
        {objetivo && (
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Objetivo general</p>
            <p className="mt-1 text-base leading-relaxed text-white/90 sm:text-lg">{objetivo}</p>
          </div>
        )}
        <p className="text-sm text-white/60">Usa las flechas para avanzar →</p>
      </div>
    );
  }
  const resumen = d.tipo === 'resumen';
  return (
    <div className="flex h-full min-h-[420px] flex-col bg-gray-50 p-5 sm:p-8">
      <header className="mb-5">
        {d.etiqueta && <p className="text-xs font-bold uppercase tracking-wider text-accent-ink">{d.etiqueta}</p>}
        <h2 className="text-xl font-black text-primary sm:text-3xl">{d.titulo}</h2>
        <div className="mt-2 h-1 w-16 rounded-full bg-accent" aria-hidden="true" />
      </header>
      <div className={`grid flex-1 content-start gap-4 ${d.bloques.length > 1 ? 'md:grid-cols-2' : ''}`}>
        {d.bloques.map((b, i) => (
          <Bloque key={i} bloque={b} resumen={resumen} />
        ))}
      </div>
    </div>
  );
}

/** Visor de diapositivas del módulo (teclado: ← →, pantalla completa). */
export default function Presentacion({ diapositivas, modulo }: { diapositivas: Diapositiva[]; modulo: string }) {
  const [i, setI] = useState(0);
  const [completa, setCompleta] = useState(false);
  const marco = useRef<HTMLDivElement>(null);
  const total = diapositivas.length;
  const ir = useCallback((n: number) => setI(Math.max(0, Math.min(total - 1, n))), [total]);

  useEffect(() => {
    const onFs = () => setCompleta(document.fullscreenElement === marco.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const pantallaCompleta = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void marco.current?.requestFullscreen?.();
  };

  if (!total) return <p className="rounded-xl bg-white p-6 text-sm text-gray-500 shadow-sm">Este módulo aún no tiene presentación.</p>;
  const d = diapositivas[i];

  return (
    <div
      ref={marco}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          ir(i + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          ir(i - 1);
        } else if (e.key === 'Home') ir(0);
        else if (e.key === 'End') ir(total - 1);
      }}
      className={`overflow-hidden rounded-2xl bg-white shadow-sm outline-none ring-primary focus-visible:ring-2 ${completa ? 'flex h-screen flex-col overflow-y-auto' : ''}`}
      aria-roledescription="presentación"
      aria-label={`Presentación del ${modulo}`}
    >
      <div className={`relative ${completa ? 'flex-1' : ''}`} aria-live="polite">
        <Diapo d={d} modulo={modulo} />
      </div>

      <div className="h-1 bg-gray-100" aria-hidden="true">
        <div className="h-1 bg-accent transition-all" style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 px-3 py-2">
        <button
          type="button"
          onClick={() => ir(i - 1)}
          disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} aria-hidden="true" /> Anterior
        </button>
        <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-gray-600">
          <span className="sr-only">Ir a la diapositiva</span>
          <select
            value={i}
            onChange={(e) => ir(Number(e.target.value))}
            className="min-w-0 flex-1 truncate rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm"
          >
            {diapositivas.map((x, n) => (
              <option key={n} value={n}>
                {n + 1}. {x.titulo}
              </option>
            ))}
          </select>
          <span className="shrink-0 tabular-nums">
            {i + 1} / {total}
          </span>
        </label>
        <button
          type="button"
          onClick={pantallaCompleta}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label={completa ? 'Salir de pantalla completa' : 'Pantalla completa'}
          title={completa ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {completa ? <Minimize2 size={18} aria-hidden="true" /> : <Maximize2 size={18} aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={() => ir(i + 1)}
          disabled={i === total - 1}
          className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-40"
        >
          Siguiente <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
