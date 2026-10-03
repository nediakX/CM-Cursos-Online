import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Eye,
  Info,
  Lightbulb,
  RotateCcw,
  Search,
  ShieldAlert,
  Shuffle,
  XCircle,
  Sigma,
  ListChecks,
  ArrowRight,
} from 'lucide-react';
import type { BloqueContenido } from '../../types';
import Calculadora from './Calculadoras';

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------
export function mezclar<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Mezcla asegurando que el resultado no quede en el orden original (si hay más de 1 elemento). */
function mezclarDistinto<T>(arr: T[]): T[] {
  if (arr.length < 2) return [...arr];
  let r = mezclar(arr);
  let intentos = 0;
  while (r.every((x, i) => x === arr[i]) && intentos < 10) {
    r = mezclar(arr);
    intentos++;
  }
  return r;
}

const Caja: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>{children}</div>
);

const Titulo: React.FC<{ icon?: React.ReactNode; children: React.ReactNode; extra?: React.ReactNode }> = ({ icon, children, extra }) => (
  <div className="flex items-center justify-between gap-3 mb-3">
    <h3 className="font-semibold text-primary flex items-center gap-2">
      {icon}
      {children}
    </h3>
    {extra}
  </div>
);

const Interactivo: React.FC<{ label: string }> = ({ label }) => (
  <span className="text-[10px] font-bold uppercase tracking-wide bg-accent/15 text-accent-ink px-2 py-0.5 rounded-full shrink-0">
    {label}
  </span>
);

// ---------------------------------------------------------------------------
// Bloques simples
// ---------------------------------------------------------------------------
function BloqueTexto({ texto }: { texto: string }) {
  return <p className="text-[15px] leading-relaxed text-gray-700">{texto}</p>;
}

function BloqueLista({ titulo, items, estilo = 'punto' }: { titulo?: string; items: string[]; estilo?: 'punto' | 'check' | 'numero' }) {
  return (
    <Caja>
      {titulo && <Titulo>{titulo}</Titulo>}
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
            {estilo === 'check' ? (
              <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
            ) : estilo === 'numero' ? (
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
            )}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </Caja>
  );
}

const NOTA_ESTILOS = {
  info: { cls: 'bg-blue-50 border-blue-200 text-blue-900', icon: <Info size={18} className="text-blue-500 shrink-0 mt-0.5" /> },
  importante: { cls: 'bg-amber-50 border-amber-200 text-amber-900', icon: <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" /> },
  tip: { cls: 'bg-emerald-50 border-emerald-200 text-emerald-900', icon: <Lightbulb size={18} className="text-emerald-600 shrink-0 mt-0.5" /> },
  peligro: { cls: 'bg-red-50 border-red-200 text-red-900', icon: <ShieldAlert size={18} className="text-red-700 shrink-0 mt-0.5" /> },
} as const;

function BloqueNota({ variante, titulo, texto }: { variante: keyof typeof NOTA_ESTILOS; titulo?: string; texto: string }) {
  const e = NOTA_ESTILOS[variante];
  return (
    <div className={`border rounded-xl p-4 flex gap-3 ${e.cls}`}>
      {e.icon}
      <div className="text-sm leading-relaxed">
        {titulo && <p className="font-semibold mb-0.5">{titulo}</p>}
        <p>{texto}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tarjetas expandibles
// ---------------------------------------------------------------------------
function BloqueTarjetas({
  titulo,
  instruccion,
  items,
}: {
  titulo?: string;
  instruccion?: string;
  items: { titulo: string; etiqueta?: string; resumen?: string; detalle: string[] }[];
}) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const [vistas, setVistas] = useState<Set<number>>(new Set());
  const abrir = (i: number) => {
    setAbierta((a) => (a === i ? null : i));
    setVistas((v) => new Set(v).add(i));
  };
  const cols = items.length === 2 || items.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <Caja>
      {titulo && (
        <Titulo extra={<span className="text-xs text-gray-500 shrink-0">{vistas.size}/{items.length} exploradas</span>}>{titulo}</Titulo>
      )}
      {instruccion && <p className="text-sm text-gray-500 -mt-1 mb-3">{instruccion}</p>}
      <div className={`grid grid-cols-1 ${cols} gap-3`}>
        {items.map((it, i) => {
          const open = abierta === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => abrir(i)}
              aria-expanded={open}
              className={[
                'text-left rounded-xl border-2 p-4 transition-all',
                open ? 'border-accent bg-amber-50/60 shadow-sm' : 'border-gray-100 hover:border-primary/30 bg-gray-50/50',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-primary">{it.titulo}</p>
                  {it.etiqueta && <p className="text-xs font-medium text-accent-ink mt-0.5">{it.etiqueta}</p>}
                </div>
                <ChevronDown size={16} className={`text-gray-500 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`} />
              </div>
              {it.resumen && <p className="text-sm text-gray-600 mt-2">{it.resumen}</p>}
              {open && (
                <ul className="mt-3 space-y-1.5 border-t border-amber-200/70 pt-3">
                  {it.detalle.map((d, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </div>
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Tabla (con búsqueda opcional)
// ---------------------------------------------------------------------------
function BloqueTabla({ titulo, columnas, filas, nota, buscable }: { titulo?: string; columnas: string[]; filas: string[][]; nota?: string; buscable?: boolean }) {
  const [q, setQ] = useState('');
  const visibles = q ? filas.filter((f) => f.join(' ').toLowerCase().includes(q.toLowerCase())) : filas;
  return (
    <Caja>
      {titulo && <Titulo>{titulo}</Titulo>}
      {buscable && (
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar en la tabla…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white">
              {columnas.map((c, i) => (
                <th key={i} className={`px-3 py-2 text-left font-semibold ${i === 0 ? 'rounded-l-lg' : ''} ${i === columnas.length - 1 ? 'rounded-r-lg' : ''}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibles.map((f, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-amber-50/50">
                {f.map((c, j) => (
                  <td key={j} className={`px-3 py-2 align-top ${j === 0 ? 'font-medium text-primary whitespace-nowrap' : 'text-gray-700'}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
            {visibles.length === 0 && (
              <tr>
                <td colSpan={columnas.length} className="px-3 py-4 text-center text-gray-500">
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {nota && <p className="text-xs text-gray-500 mt-3">{nota}</p>}
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Fórmula
// ---------------------------------------------------------------------------
function BloqueFormula({
  titulo,
  expresion,
  variables,
  despejes,
  nota,
}: {
  titulo: string;
  expresion: string;
  variables: { simbolo: string; significado: string }[];
  despejes?: string[];
  nota?: string;
}) {
  const [mostrarDespejes, setMostrarDespejes] = useState(false);
  return (
    <Caja className="border-l-4 border-l-primary">
      <Titulo icon={<Sigma size={18} className="text-accent" />}>{titulo}</Titulo>
      <div className="bg-primary text-white rounded-xl px-5 py-4 text-center font-mono text-xl sm:text-2xl tracking-wide">{expresion}</div>
      {variables.length > 0 && (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-4">
          {variables.map((v) => (
            <div key={v.simbolo} className="flex gap-2 text-sm">
              <dt className="font-mono font-bold text-primary min-w-10">{v.simbolo}</dt>
              <dd className="text-gray-600">{v.significado}</dd>
            </div>
          ))}
        </dl>
      )}
      {despejes && despejes.length > 0 && (
        <div className="mt-4">
          <button type="button" onClick={() => setMostrarDespejes((m) => !m)} className="text-sm font-medium text-primary hover:underline">
            {mostrarDespejes ? 'Ocultar despejes' : 'Ver despejes'}
          </button>
          {mostrarDespejes && (
            <div className="flex flex-wrap gap-2 mt-2">
              {despejes.map((d) => (
                <span key={d} className="font-mono text-sm bg-amber-50 border border-amber-200 text-primary px-3 py-1.5 rounded-lg">
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {nota && <p className="text-sm text-gray-500 mt-3">{nota}</p>}
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Ejemplo resuelto paso a paso
// ---------------------------------------------------------------------------
function BloqueEjemplo({ titulo, datos, pasos, resultado }: { titulo: string; datos: string[]; pasos: { titulo: string; detalle: string }[]; resultado: string }) {
  const [visibles, setVisibles] = useState(0);
  const terminado = visibles >= pasos.length;
  return (
    <Caja>
      <Titulo icon={<ListChecks size={18} className="text-accent" />} extra={<Interactivo label="Paso a paso" />}>
        {titulo}
      </Titulo>
      <div className="flex flex-wrap gap-2 mb-4">
        {datos.map((d) => (
          <span key={d} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-medium">
            {d}
          </span>
        ))}
      </div>
      <ol className="space-y-2">
        {pasos.slice(0, visibles).map((p, i) => (
          <li key={i} className="flex gap-3 items-start animate-[fadeIn_.25s_ease-out]">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
            <div className="text-sm">
              <p className="font-semibold text-primary">{p.titulo}</p>
              <p className="text-gray-700 font-mono">{p.detalle}</p>
            </div>
          </li>
        ))}
      </ol>
      {terminado ? (
        <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <p className="text-sm font-semibold text-emerald-800">{resultado}</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            onClick={() => setVisibles((v) => v + 1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover"
          >
            <ArrowRight size={14} /> {visibles === 0 ? 'Resolver paso 1' : `Ver paso ${visibles + 1}`}
          </button>
          <button type="button" onClick={() => setVisibles(pasos.length)} className="px-4 py-2 text-sm text-gray-600 hover:text-primary">
            Ver solución completa
          </button>
        </div>
      )}
      {terminado && pasos.length > 1 && (
        <button type="button" onClick={() => setVisibles(0)} className="mt-2 text-xs text-gray-500 hover:text-primary flex items-center gap-1">
          <RotateCcw size={12} /> Repetir
        </button>
      )}
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Pregunta de comprobación
// ---------------------------------------------------------------------------
function BloquePregunta({ enunciado, opciones, correcta, explicacion }: { enunciado: string; opciones: string[]; correcta: number; explicacion: string }) {
  const [sel, setSel] = useState<number | null>(null);
  const [comprobada, setComprobada] = useState(false);
  const ok = sel === correcta;
  return (
    <Caja className="border-l-4 border-l-accent">
      <Titulo extra={<Interactivo label="Comprueba" />}>Pregunta tipo examen SEC</Titulo>
      <p className="text-[15px] font-medium text-gray-800 mb-3">{enunciado}</p>
      <div className="space-y-2">
        {opciones.map((op, i) => {
          const letra = String.fromCharCode(65 + i);
          let cls = 'border-gray-200 hover:border-gray-300 bg-white';
          if (comprobada && i === correcta) cls = 'border-emerald-500 bg-emerald-50';
          else if (comprobada && i === sel) cls = 'border-red-400 bg-red-50';
          else if (sel === i) cls = 'border-accent bg-amber-50';
          return (
            <button
              key={i}
              type="button"
              disabled={comprobada}
              onClick={() => setSel(i)}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border-2 transition-all ${cls}`}
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center shrink-0">{letra}</span>
              <span className="text-sm text-gray-700 pt-0.5">{op}</span>
            </button>
          );
        })}
      </div>
      {!comprobada ? (
        <button
          type="button"
          disabled={sel === null}
          onClick={() => setComprobada(true)}
          className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-primary-hover"
        >
          Comprobar
        </button>
      ) : (
        <div className={`mt-3 rounded-xl p-3 text-sm flex gap-2 ${ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'}`}>
          {ok ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <XCircle size={18} className="text-red-700 shrink-0" />}
          <div>
            <p className="font-semibold">{ok ? '¡Correcto!' : 'Incorrecto'}</p>
            <p className="mt-0.5">{explicacion}</p>
            {!ok && (
              <button
                type="button"
                onClick={() => {
                  setSel(null);
                  setComprobada(false);
                }}
                className="mt-2 text-xs font-semibold underline"
              >
                Intentar de nuevo
              </button>
            )}
          </div>
        </div>
      )}
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Emparejar
// ---------------------------------------------------------------------------
function BloqueEmparejar({ titulo, instruccion, pares }: { titulo: string; instruccion?: string; pares: { a: string; b: string }[] }) {
  const [derecha, setDerecha] = useState(() => mezclarDistinto(pares.map((_, i) => i)));
  const [selA, setSelA] = useState<number | null>(null);
  const [hechos, setHechos] = useState<Set<number>>(new Set());
  const [error, setError] = useState<number | null>(null);
  const [errores, setErrores] = useState(0);

  const elegirB = (idx: number) => {
    if (selA === null || hechos.has(idx)) return;
    if (idx === selA) {
      setHechos((h) => new Set(h).add(idx));
      setSelA(null);
    } else {
      setError(idx);
      setErrores((e) => e + 1);
      setTimeout(() => setError(null), 600);
    }
  };
  const reiniciar = () => {
    setDerecha(mezclarDistinto(pares.map((_, i) => i)));
    setHechos(new Set());
    setSelA(null);
    setErrores(0);
  };
  const completo = hechos.size === pares.length;

  return (
    <Caja>
      <Titulo icon={<Shuffle size={18} className="text-accent" />} extra={<Interactivo label="Actividad" />}>
        {titulo}
      </Titulo>
      <p className="text-sm text-gray-500 -mt-1 mb-4">{instruccion ?? 'Selecciona un elemento de la izquierda y luego su pareja de la derecha.'}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {pares.map((p, i) => (
            <button
              key={i}
              type="button"
              disabled={hechos.has(i)}
              onClick={() => setSelA(i)}
              className={[
                'w-full text-left text-sm px-3 py-2.5 rounded-lg border-2 transition-all min-h-11',
                hechos.has(i)
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : selA === i
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 hover:border-primary/40 text-gray-800 font-medium',
              ].join(' ')}
            >
              {p.a}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {derecha.map((idx) => (
            <button
              key={idx}
              type="button"
              disabled={hechos.has(idx) || selA === null}
              onClick={() => elegirB(idx)}
              className={[
                'w-full text-left text-sm px-3 py-2.5 rounded-lg border-2 transition-all min-h-11',
                hechos.has(idx)
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : error === idx
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : selA !== null
                      ? 'border-gray-200 hover:border-accent hover:bg-amber-50 text-gray-700'
                      : 'border-gray-100 text-gray-500',
              ].join(' ')}
            >
              {pares[idx].b}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        {completo ? (
          <p className="font-semibold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> ¡Completado{errores === 0 ? ' sin errores' : ` con ${errores} error${errores > 1 ? 'es' : ''}`}!
          </p>
        ) : (
          <p className="text-gray-500">
            {hechos.size}/{pares.length} parejas
          </p>
        )}
        <button type="button" onClick={reiniciar} className="flex items-center gap-1 text-gray-500 hover:text-primary">
          <RotateCcw size={13} /> Reiniciar
        </button>
      </div>
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Ordenar secuencia
// ---------------------------------------------------------------------------
function BloqueOrdenar({ titulo, instruccion, items }: { titulo: string; instruccion?: string; items: string[] }) {
  const [disponibles, setDisponibles] = useState(() => mezclarDistinto(items.map((_, i) => i)));
  const [orden, setOrden] = useState<number[]>([]);
  const [comprobado, setComprobado] = useState(false);

  const tomar = (idx: number) => {
    if (comprobado) return;
    setOrden((o) => [...o, idx]);
    setDisponibles((d) => d.filter((x) => x !== idx));
  };
  const quitar = (pos: number) => {
    if (comprobado) return;
    const idx = orden[pos];
    setOrden((o) => o.filter((_, i) => i !== pos));
    setDisponibles((d) => [...d, idx]);
  };
  const reiniciar = () => {
    setDisponibles(mezclarDistinto(items.map((_, i) => i)));
    setOrden([]);
    setComprobado(false);
  };
  const aciertos = orden.filter((idx, pos) => idx === pos).length;
  const perfecto = comprobado && aciertos === items.length;

  return (
    <Caja>
      <Titulo icon={<ListChecks size={18} className="text-accent" />} extra={<Interactivo label="Actividad" />}>
        {titulo}
      </Titulo>
      <p className="text-sm text-gray-500 -mt-1 mb-4">{instruccion ?? 'Toca los elementos en el orden correcto.'}</p>

      <ol className="space-y-2 mb-3">
        {orden.map((idx, pos) => {
          const bien = idx === pos;
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => quitar(pos)}
                className={[
                  'w-full flex items-center gap-3 text-left text-sm px-3 py-2 rounded-lg border-2',
                  comprobado ? (bien ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50') : 'border-primary/20 bg-primary/5 hover:border-red-300',
                ].join(' ')}
                title={comprobado ? undefined : 'Quitar'}
              >
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{pos + 1}</span>
                <span className="flex-1 text-gray-800">{items[idx]}</span>
                {comprobado && (bien ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-red-700" />)}
              </button>
            </li>
          );
        })}
        {orden.length === 0 && <li className="text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg px-3 py-3 text-center">Tu secuencia aparecerá aquí</li>}
      </ol>

      {disponibles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {disponibles.map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => tomar(idx)}
              className="text-sm px-3 py-2 rounded-lg border-2 border-gray-200 bg-white hover:border-accent hover:bg-amber-50 text-gray-700"
            >
              {items[idx]}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 text-sm">
        {!comprobado ? (
          <button
            type="button"
            disabled={disponibles.length > 0}
            onClick={() => setComprobado(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg font-medium disabled:opacity-40 hover:bg-primary-hover"
          >
            Comprobar orden
          </button>
        ) : perfecto ? (
          <p className="font-semibold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 size={16} /> ¡Secuencia correcta!
          </p>
        ) : (
          <p className="font-medium text-red-600">
            {aciertos}/{items.length} en la posición correcta
          </p>
        )}
        <button type="button" onClick={reiniciar} className="flex items-center gap-1 text-gray-500 hover:text-primary">
          <RotateCcw size={13} /> {comprobado && !perfecto ? 'Intentar de nuevo' : 'Reiniciar'}
        </button>
      </div>
      {comprobado && !perfecto && (
        <button type="button" onClick={() => setOrden(items.map((_, i) => i))} className="mt-2 text-xs text-gray-500 hover:text-primary flex items-center gap-1">
          <Eye size={12} /> Ver orden correcto
        </button>
      )}
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Casos reales
// ---------------------------------------------------------------------------
function BloqueCasos({ titulo, casos }: { titulo?: string; casos: { titulo: string; situacion: string; resultado: string; leccion: string }[] }) {
  const [revelados, setRevelados] = useState<Set<number>>(new Set());
  return (
    <Caja>
      {titulo && <Titulo extra={<Interactivo label="Casos" />}>{titulo}</Titulo>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {casos.map((c, i) => {
          const r = revelados.has(i);
          return (
            <div key={i} className="rounded-xl border border-gray-200 p-4 flex flex-col">
              <p className="font-semibold text-primary text-sm">{c.titulo}</p>
              <p className="text-sm text-gray-700 mt-2">{c.situacion}</p>
              {r ? (
                <div className="mt-3 space-y-2 text-sm">
                  <p className="bg-red-50 text-red-800 rounded-lg px-3 py-2">
                    <span className="font-semibold">Resultado: </span>
                    {c.resultado}
                  </p>
                  <p className="bg-emerald-50 text-emerald-800 rounded-lg px-3 py-2">
                    <span className="font-semibold">Lección: </span>
                    {c.leccion}
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setRevelados((s) => new Set(s).add(i))}
                  className="mt-auto pt-3 text-sm font-medium text-primary hover:underline text-left"
                >
                  ¿Qué ocurrió? →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Checklist
// ---------------------------------------------------------------------------
function BloqueChecklist({ titulo, items }: { titulo: string; items: string[] }) {
  const [marcados, setMarcados] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setMarcados((m) => {
      const n = new Set(m);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  return (
    <Caja>
      <Titulo extra={<span className="text-xs text-gray-500">{marcados.size}/{items.length}</span>}>{titulo}</Titulo>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((it, i) => {
          const on = marcados.has(i);
          return (
            <label key={i} className={`flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg border cursor-pointer select-none ${on ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-gray-100 hover:bg-gray-50 text-gray-700'}`}>
              <input type="checkbox" checked={on} onChange={() => toggle(i)} className="accent-emerald-600 w-4 h-4" />
              {it}
            </label>
          );
        })}
      </div>
    </Caja>
  );
}

// ---------------------------------------------------------------------------
// Renderizador principal
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Multimedia (video e imagen) — agregados desde el editor de contenido
// ---------------------------------------------------------------------------
/** Convierte enlaces de YouTube / Vimeo / Google Drive a su versión "embed". Devuelve null si es un archivo de video directo. */
export function urlEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    if (host.endsWith('youtube.com')) {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').filter(Boolean).pop();
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === 'vimeo.com') return `https://player.vimeo.com/video/${u.pathname.split('/').filter(Boolean)[0]}`;
    if (host === 'player.vimeo.com') return url;
    if (host === 'drive.google.com') return url.replace(/\/view.*$/, '/preview');
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(u.pathname)) return null;
    return url;
  } catch {
    return null;
  }
}

function BloqueVideo({ url, titulo, descripcion }: { url: string; titulo?: string; descripcion?: string }) {
  if (!url) return null;
  const embed = urlEmbed(url);
  return (
    <figure className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="aspect-video bg-black">
        {embed ? (
          <iframe
            src={embed}
            title={titulo || 'Video de la lección'}
            className="w-full h-full"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <video src={url} controls preload="metadata" className="w-full h-full">
            Tu navegador no puede reproducir este video. <a href={url}>Descárgalo aquí</a>.
          </video>
        )}
      </div>
      {(titulo || descripcion) && (
        <figcaption className="p-4">
          {titulo && <p className="font-semibold text-primary">{titulo}</p>}
          {descripcion && <p className="text-sm text-gray-600 mt-1">{descripcion}</p>}
        </figcaption>
      )}
    </figure>
  );
}

function BloqueImagen({ url, alt, pie }: { url: string; alt: string; pie?: string }) {
  if (!url) return null;
  return (
    <figure className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <img src={url} alt={alt} loading="lazy" className="w-full h-auto" />
      {pie && <figcaption className="px-4 py-3 text-sm text-gray-600">{pie}</figcaption>}
    </figure>
  );
}

export function Bloque({ bloque }: { bloque: BloqueContenido }) {
  switch (bloque.tipo) {
    case 'texto':
      return <BloqueTexto texto={bloque.texto} />;
    case 'lista':
      return <BloqueLista titulo={bloque.titulo} items={bloque.items} estilo={bloque.estilo} />;
    case 'tarjetas':
      return <BloqueTarjetas titulo={bloque.titulo} instruccion={bloque.instruccion} items={bloque.items} />;
    case 'tabla':
      return <BloqueTabla titulo={bloque.titulo} columnas={bloque.columnas} filas={bloque.filas} nota={bloque.nota} buscable={bloque.buscable} />;
    case 'formula':
      return <BloqueFormula {...bloque} />;
    case 'ejemplo':
      return <BloqueEjemplo titulo={bloque.titulo} datos={bloque.datos} pasos={bloque.pasos} resultado={bloque.resultado} />;
    case 'nota':
      return <BloqueNota variante={bloque.variante} titulo={bloque.titulo} texto={bloque.texto} />;
    case 'pregunta':
      return <BloquePregunta enunciado={bloque.enunciado} opciones={bloque.opciones} correcta={bloque.correcta} explicacion={bloque.explicacion} />;
    case 'calculadora':
      return <Calculadora id={bloque.calculadora} />;
    case 'emparejar':
      return <BloqueEmparejar titulo={bloque.titulo} instruccion={bloque.instruccion} pares={bloque.pares} />;
    case 'ordenar':
      return <BloqueOrdenar titulo={bloque.titulo} instruccion={bloque.instruccion} items={bloque.items} />;
    case 'casos':
      return <BloqueCasos titulo={bloque.titulo} casos={bloque.casos} />;
    case 'video':
      return <BloqueVideo url={bloque.url} titulo={bloque.titulo} descripcion={bloque.descripcion} />;
    case 'imagen':
      return <BloqueImagen url={bloque.url} alt={bloque.alt} pie={bloque.pie} />;
    case 'checklist':
      return <BloqueChecklist titulo={bloque.titulo} items={bloque.items} />;
    default:
      return null;
  }
}

export function ListaBloques({ bloques }: { bloques: BloqueContenido[] }) {
  // La clave incluye el índice para que cada lección remonte sus actividades.
  const claves = useMemo(() => bloques.map((b, i) => `${b.tipo}-${i}`), [bloques]);
  return (
    <div className="space-y-5">
      {bloques.map((b, i) => (
        <Bloque key={claves[i]} bloque={b} />
      ))}
    </div>
  );
}
