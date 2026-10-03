import React, { useMemo, useState } from 'react';
import { Calculator, CheckCircle2, Plus, Trash2, XCircle, AlertTriangle } from 'lucide-react';
import type { CalculadoraId } from '../../types';

// ---------------------------------------------------------------------------
// Datos de referencia (Manual del Alumno)
// ---------------------------------------------------------------------------
/** Ampacidad referencial Cu, aislación PVC 70 °C (Manual Módulo 3). */
export const AMPACIDAD: { s: number; i: number }[] = [
  { s: 1.5, i: 15 },
  { s: 2.5, i: 20 },
  { s: 4, i: 25 },
  { s: 6, i: 32 },
  { s: 10, i: 50 },
  { s: 16, i: 63 },
  { s: 25, i: 80 },
  { s: 35, i: 100 },
  { s: 50, i: 125 },
  { s: 70, i: 160 },
  { s: 95, i: 200 },
  { s: 120, i: 230 },
];
/** Calibres normalizados de disyuntores (A). */
const PROTECCIONES = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250];
const RHO_CU = 0.0178; // Ω·mm²/m
const SQRT3 = Math.sqrt(3);

const fmt = (n: number, dec = 2): string =>
  Number.isFinite(n) ? n.toLocaleString('es-CL', { maximumFractionDigits: dec, minimumFractionDigits: 0 }) : '—';
const fmtS = (s: number) => fmt(s, 1).replace('.', ',');
const clp = (n: number) => '$' + Math.round(n).toLocaleString('es-CL');

/** Protección: menor calibre normalizado ≥ corriente de diseño y ≤ ampacidad del conductor. */
export function proteccionPara(iDiseno: number, iz: number): number | null {
  const p = PROTECCIONES.find((x) => x >= iDiseno);
  return p !== undefined && p <= iz ? p : null;
}

/** Primer conductor cuya ampacidad (corregida) admite la corriente y una protección normalizada. */
export function conductorPara(i: number, factor = 1): { s: number; iz: number; prot: number } | null {
  for (const c of AMPACIDAD) {
    const iz = c.i * factor;
    const prot = proteccionPara(i, iz);
    if (iz >= i && prot !== null) return { s: c.s, iz, prot };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Controles compartidos
// ---------------------------------------------------------------------------
const inputCls =
  'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white';

function Num({
  label,
  value,
  onChange,
  unidad,
  step = 'any',
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  unidad?: string;
  step?: number | 'any';
  min?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-500 mb-1">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          className={`${inputCls} ${unidad ? 'pr-12' : ''}`}
          value={Number.isFinite(value) ? value : ''}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value === '' ? NaN : Number(e.target.value))}
        />
        {unidad && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none">{unidad}</span>}
      </div>
    </label>
  );
}

function Sel<T extends string | number>({
  label,
  value,
  onChange,
  opciones,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  opciones: { v: T; t: string }[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-500 mb-1">{label}</span>
      <select
        className={inputCls}
        value={String(value)}
        onChange={(e) => {
          const o = opciones.find((x) => String(x.v) === e.target.value);
          if (o) onChange(o.v);
        }}
      >
        {opciones.map((o) => (
          <option key={String(o.v)} value={String(o.v)}>
            {o.t}
          </option>
        ))}
      </select>
    </label>
  );
}

function Segmentado<T extends string>({ value, onChange, opciones }: { value: T; onChange: (v: T) => void; opciones: { v: T; t: string }[] }) {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1 gap-1 flex-wrap">
      {opciones.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${value === o.v ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          {o.t}
        </button>
      ))}
    </div>
  );
}

function Resultado({ label, valor, destacado = false, sub }: { label: string; valor: string; destacado?: boolean; sub?: string }) {
  return (
    <div className={`rounded-xl px-4 py-3 ${destacado ? 'bg-primary text-white' : 'bg-gray-50 text-primary'}`}>
      <p className={`text-xs ${destacado ? 'text-white/70' : 'text-gray-500'}`}>{label}</p>
      <p className="text-xl font-bold leading-tight">{valor}</p>
      {sub && <p className={`text-xs mt-0.5 ${destacado ? 'text-white/70' : 'text-gray-500'}`}>{sub}</p>}
    </div>
  );
}

function Veredicto({ ok, texto }: { ok: boolean; texto: string }) {
  return (
    <div className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
      {ok ? <CheckCircle2 size={18} className="shrink-0" /> : <XCircle size={18} className="shrink-0" />}
      <span>{texto}</span>
    </div>
  );
}

function Marco({ titulo, descripcion, children }: { titulo: string; descripcion: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border-2 border-primary/10 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <Calculator size={16} className="text-primary" />
        </div>
        <h3 className="font-semibold text-primary">{titulo}</h3>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-wide bg-accent/15 text-accent-ink px-2 py-0.5 rounded-full">Simulador</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">{descripcion}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 1. Ley de Ohm
// ---------------------------------------------------------------------------
function CalcOhm() {
  const [incognita, setIncognita] = useState<'I' | 'V' | 'R'>('I');
  const [V, setV] = useState(220);
  const [I, setI] = useState(10);
  const [R, setR] = useState(22);
  const res = incognita === 'I' ? V / R : incognita === 'V' ? I * R : V / I;
  const v = incognita === 'V' ? res : V;
  const i = incognita === 'I' ? res : I;
  const formula = incognita === 'I' ? `I = V / R = ${fmt(V)} / ${fmt(R)}` : incognita === 'V' ? `V = I × R = ${fmt(I)} × ${fmt(R)}` : `R = V / I = ${fmt(V)} / ${fmt(I)}`;
  const unidad = incognita === 'I' ? 'A' : incognita === 'V' ? 'V' : 'Ω';
  return (
    <Marco titulo="Simulador Ley de Ohm" descripcion="Elige qué magnitud quieres calcular e ingresa las otras dos.">
      <Segmentado
        value={incognita}
        onChange={setIncognita}
        opciones={[
          { v: 'I', t: 'Corriente (I)' },
          { v: 'V', t: 'Voltaje (V)' },
          { v: 'R', t: 'Resistencia (R)' },
        ]}
      />
      <div className="grid grid-cols-2 gap-3">
        {incognita !== 'V' && <Num label="Voltaje" value={V} onChange={setV} unidad="V" />}
        {incognita !== 'I' && <Num label="Corriente" value={I} onChange={setI} unidad="A" />}
        {incognita !== 'R' && <Num label="Resistencia" value={R} onChange={setR} unidad="Ω" />}
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2">{formula}</p>
      <div className="grid grid-cols-2 gap-3">
        <Resultado label={`Resultado (${incognita})`} valor={`${fmt(res)} ${unidad}`} destacado />
        <Resultado label="Potencia disipada P = V × I" valor={`${fmt(v * i, 1)} W`} />
      </div>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 2. Resistencias serie / paralelo
// ---------------------------------------------------------------------------
function CalcResistencias() {
  const [modo, setModo] = useState<'serie' | 'paralelo'>('serie');
  const [rs, setRs] = useState<number[]>([10, 20, 30]);
  const [V, setV] = useState(220);
  const validas = rs.filter((r) => r > 0);
  const rt = modo === 'serie' ? validas.reduce((a, b) => a + b, 0) : validas.length ? 1 / validas.reduce((a, b) => a + 1 / b, 0) : NaN;
  const it = V / rt;
  return (
    <Marco titulo="Simulador de circuitos serie y paralelo" descripcion="Agrega resistencias y compara cómo cambia la resistencia total y la corriente.">
      <Segmentado
        value={modo}
        onChange={setModo}
        opciones={[
          { v: 'serie', t: 'Serie' },
          { v: 'paralelo', t: 'Paralelo' },
        ]}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {rs.map((r, i) => (
          <div key={i} className="flex items-end gap-1">
            <Num label={`R${i + 1}`} value={r} onChange={(n) => setRs((a) => a.map((x, j) => (j === i ? n : x)))} unidad="Ω" />
            {rs.length > 1 && (
              <button type="button" onClick={() => setRs((a) => a.filter((_, j) => j !== i))} className="p-2 text-gray-500 hover:text-red-700" aria-label="Quitar">
                <Trash2 size={15} />
              </button>
            )}
          </div>
        ))}
      </div>
      {rs.length < 8 && (
        <button type="button" onClick={() => setRs((a) => [...a, 10])} className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          <Plus size={14} /> Agregar resistencia
        </button>
      )}
      <div className="max-w-[200px]">
        <Num label="Tensión aplicada" value={V} onChange={setV} unidad="V" />
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2 break-words">
        {modo === 'serie' ? `Rt = ${validas.map((r) => fmt(r)).join(' + ')}` : `1/Rt = ${validas.map((r) => `1/${fmt(r)}`).join(' + ')}`}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Resultado label="Resistencia total" valor={`${fmt(rt)} Ω`} destacado />
        <Resultado label="Corriente total I = V / Rt" valor={`${fmt(it)} A`} />
      </div>
      <p className="text-xs text-gray-500">
        {modo === 'serie'
          ? 'En serie la corriente es la misma en todos los elementos y la tensión se reparte.'
          : 'En paralelo todas las ramas tienen la misma tensión; la resistencia total es menor que la menor de las resistencias.'}
      </p>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 3. Potencia monofásica / trifásica
// ---------------------------------------------------------------------------
function CalcPotencia() {
  const [sistema, setSistema] = useState<'mono' | 'tri'>('mono');
  const [calc, setCalc] = useState<'P' | 'I'>('P');
  const [V, setV] = useState(220);
  const [I, setI] = useState(20);
  const [P, setP] = useState(4400);
  const [fp, setFp] = useState(1);
  const k = sistema === 'tri' ? SQRT3 : 1;
  const p = calc === 'P' ? k * V * I * fp : P;
  const i = calc === 'I' ? P / (k * V * fp) : I;
  const s = k * V * i;
  const cambiarSistema = (s2: 'mono' | 'tri') => {
    setSistema(s2);
    setV(s2 === 'tri' ? 380 : 220);
    setFp(s2 === 'tri' ? 0.9 : 1);
  };
  return (
    <Marco titulo="Simulador de potencia eléctrica" descripcion="Calcula potencia o corriente en sistemas monofásicos (220 V) y trifásicos (380 V).">
      <div className="flex flex-wrap gap-2">
        <Segmentado
          value={sistema}
          onChange={cambiarSistema}
          opciones={[
            { v: 'mono', t: 'Monofásico' },
            { v: 'tri', t: 'Trifásico' },
          ]}
        />
        <Segmentado
          value={calc}
          onChange={setCalc}
          opciones={[
            { v: 'P', t: 'Calcular P' },
            { v: 'I', t: 'Calcular I' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Num label={sistema === 'tri' ? 'Voltaje línea-línea' : 'Voltaje'} value={V} onChange={setV} unidad="V" />
        {calc === 'P' ? <Num label="Corriente" value={I} onChange={setI} unidad="A" /> : <Num label="Potencia" value={P} onChange={setP} unidad="W" />}
        <Num label="Factor de potencia (cosφ)" value={fp} onChange={(n) => setFp(Math.min(1, n))} step={0.01} />
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2">
        {calc === 'P'
          ? `P = ${sistema === 'tri' ? '√3 × ' : ''}${fmt(V)} × ${fmt(I)}${fp !== 1 || sistema === 'tri' ? ` × ${fmt(fp)}` : ''}`
          : `I = ${fmt(P)} / (${sistema === 'tri' ? '√3 × ' : ''}${fmt(V)}${fp !== 1 || sistema === 'tri' ? ` × ${fmt(fp)}` : ''})`}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {calc === 'P' ? (
          <Resultado label="Potencia activa" valor={`${fmt(p / 1000)} kW`} sub={`${fmt(p, 0)} W`} destacado />
        ) : (
          <Resultado label="Corriente" valor={`${fmt(i)} A`} destacado />
        )}
        <Resultado label="Potencia aparente S" valor={`${fmt(s / 1000)} kVA`} />
        {fp < 1 && <Resultado label="Corriente extra por cosφ bajo" valor={`+${fmt((1 / fp - 1) * 100, 0)}%`} sub="vs. cosφ = 1" />}
      </div>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 4. Energía y consumo
// ---------------------------------------------------------------------------
function CalcEnergia() {
  const [equipos, setEquipos] = useState([
    { n: 'Lámpara', w: 100, h: 10 },
    { n: 'Calefactor', w: 2000, h: 5 },
    { n: 'Equipo 1 kW', w: 1000, h: 4 },
  ]);
  const [dias, setDias] = useState(30);
  const [precio, setPrecio] = useState(180);
  const diario = equipos.reduce((a, e) => a + ((e.w || 0) * (e.h || 0)) / 1000, 0);
  const upd = (i: number, k: 'n' | 'w' | 'h', v: string | number) => setEquipos((a) => a.map((e, j) => (j === i ? { ...e, [k]: v } : e)));
  return (
    <Marco titulo="Simulador de consumo de energía" descripcion="E = P × t. Calcula el consumo diario y mensual de tus equipos.">
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_90px_80px_32px] gap-2 text-xs font-medium text-gray-500">
          <span>Equipo</span>
          <span>Potencia (W)</span>
          <span>Horas/día</span>
          <span />
        </div>
        {equipos.map((e, i) => (
          <div key={i} className="grid grid-cols-[1fr_90px_80px_32px] gap-2">
            <input className={inputCls} value={e.n} onChange={(ev) => upd(i, 'n', ev.target.value)} />
            <input type="number" className={inputCls} value={e.w} onChange={(ev) => upd(i, 'w', Number(ev.target.value))} />
            <input type="number" className={inputCls} value={e.h} max={24} onChange={(ev) => upd(i, 'h', Number(ev.target.value))} />
            <button type="button" onClick={() => setEquipos((a) => a.filter((_, j) => j !== i))} className="text-gray-500 hover:text-red-700" aria-label="Quitar">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setEquipos((a) => [...a, { n: 'Nuevo equipo', w: 500, h: 1 }])} className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          <Plus size={14} /> Agregar equipo
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-sm">
        <Num label="Días" value={dias} onChange={setDias} />
        <Num label="Precio energía" value={precio} onChange={setPrecio} unidad="$/kWh" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Resultado label="Consumo diario" valor={`${fmt(diario)} kWh`} />
        <Resultado label={`Consumo en ${fmt(dias, 0)} días`} valor={`${fmt(diario * dias, 1)} kWh`} destacado />
        <Resultado label="Costo estimado" valor={clp(diario * dias * (precio || 0))} sub="Precio referencial editable" />
      </div>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 5. Dimensionamiento de conductor (ampacidad + factores + ΔV + protección)
// ---------------------------------------------------------------------------
function CalcConductor() {
  const [sistema, setSistema] = useState<'mono' | 'tri'>('mono');
  const [P, setP] = useState(8000);
  const [fp, setFp] = useState(1);
  const [L, setL] = useState(30);
  const [limite, setLimite] = useState(3);
  const [ft, setFt] = useState(1);
  const [fa, setFa] = useState(1);
  const V = sistema === 'tri' ? 380 : 220;
  const k = sistema === 'tri' ? SQRT3 : 2;
  const I = sistema === 'tri' ? P / (SQRT3 * V * fp) : P / (V * fp);
  const filas = AMPACIDAD.map((c) => {
    const iz = c.i * ft * fa;
    const dv = k * I * L * (RHO_CU / c.s);
    const pct = (dv / V) * 100;
    const okI = iz >= I;
    const okV = pct <= limite;
    const prot = proteccionPara(I, iz);
    return { ...c, iz, dv, pct, okI, okV, prot, ok: okI && okV && prot !== null };
  });
  const elegido = filas.find((f) => f.ok);
  return (
    <Marco
      titulo="Simulador de dimensionamiento de conductores"
      descripcion="Selecciona la sección que cumple simultáneamente ampacidad corregida, caída de tensión y coordinación con la protección (tabla referencial Cu PVC 70 °C)."
    >
      <Segmentado
        value={sistema}
        onChange={(s) => {
          setSistema(s);
          setFp(s === 'tri' ? 0.9 : 1);
        }}
        opciones={[
          { v: 'mono', t: 'Monofásico 220 V' },
          { v: 'tri', t: 'Trifásico 380 V' },
        ]}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Num label="Potencia de la carga" value={P} onChange={setP} unidad="W" />
        <Num label="Factor de potencia" value={fp} onChange={(n) => setFp(Math.min(1, n))} step={0.01} />
        <Num label="Longitud del tramo" value={L} onChange={setL} unidad="m" />
        <Sel
          label="Tipo de circuito (límite ΔV)"
          value={limite}
          onChange={setLimite}
          opciones={[
            { v: 3, t: 'Alumbrado — 3%' },
            { v: 5, t: 'Fuerza / alimentador — 5%' },
          ]}
        />
        <Sel
          label="Temperatura ambiente"
          value={ft}
          onChange={setFt}
          opciones={[
            { v: 1, t: '30 °C (factor 1,00)' },
            { v: 0.87, t: '40 °C (factor 0,87)' },
          ]}
        />
        <Sel
          label="Agrupamiento"
          value={fa}
          onChange={setFa}
          opciones={[
            { v: 1, t: 'Sin agrupamiento (1,00)' },
            { v: 0.8, t: '4 circuitos (0,80)' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Resultado label="Corriente de diseño" valor={`${fmt(I, 1)} A`} />
        <Resultado label="Conductor Cu" valor={elegido ? `${fmtS(elegido.s)} mm²` : 'Fuera de tabla'} destacado />
        <Resultado label="Protección" valor={elegido?.prot ? `${elegido.prot} A` : '—'} sub={elegido ? `ΔV = ${fmt(elegido.pct)}%` : undefined} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
              <th className="text-left py-1.5 pr-2">Sección</th>
              <th className="text-right px-2">Iz corregida</th>
              <th className="text-center px-2">Ampacidad</th>
              <th className="text-right px-2">ΔV</th>
              <th className="text-center px-2">Caída</th>
              <th className="text-right pl-2">Protección</th>
            </tr>
          </thead>
          <tbody>
            {filas.slice(0, Math.max(6, filas.findIndex((f) => f.ok) + 2)).map((f) => (
              <tr key={f.s} className={`border-b border-gray-100 ${elegido?.s === f.s ? 'bg-amber-50 font-semibold' : ''}`}>
                <td className="py-1.5 pr-2">{fmtS(f.s)} mm²</td>
                <td className="text-right px-2">{fmt(f.iz, 1)} A</td>
                <td className="text-center px-2">{f.okI ? <CheckCircle2 size={14} className="inline text-emerald-500" /> : <XCircle size={14} className="inline text-red-400" />}</td>
                <td className="text-right px-2">{fmt(f.pct)}%</td>
                <td className="text-center px-2">{f.okV ? <CheckCircle2 size={14} className="inline text-emerald-500" /> : <XCircle size={14} className="inline text-red-400" />}</td>
                <td className="text-right pl-2">{f.prot ? `${f.prot} A` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500">
        ΔV = {sistema === 'tri' ? '√3' : '2'} × I × L × (ρ/S), con ρ Cu = 0,0178 Ω·mm²/m. La protección debe ser ≥ I de diseño y ≤ ampacidad del conductor. Valores referenciales para
        aprendizaje: en proyectos reales usa las tablas vigentes del RIC 04.
      </p>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 6. Caída de tensión
// ---------------------------------------------------------------------------
function CalcCaida() {
  const [sistema, setSistema] = useState<'mono' | 'tri'>('mono');
  const [I, setI] = useState(36.4);
  const [L, setL] = useState(30);
  const [S, setS] = useState(10);
  const [limite, setLimite] = useState(3);
  const V = sistema === 'tri' ? 380 : 220;
  const r = RHO_CU / S;
  const dv = (sistema === 'tri' ? SQRT3 : 2) * I * L * r;
  const pct = (dv / V) * 100;
  return (
    <Marco titulo="Simulador de caída de tensión" descripcion="Prueba cómo influyen la corriente, la longitud y la sección del conductor.">
      <Segmentado
        value={sistema}
        onChange={setSistema}
        opciones={[
          { v: 'mono', t: 'Monofásico 220 V' },
          { v: 'tri', t: 'Trifásico 380 V' },
        ]}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Num label="Corriente" value={I} onChange={setI} unidad="A" />
        <Num label="Longitud" value={L} onChange={setL} unidad="m" />
        <Sel label="Sección Cu" value={S} onChange={setS} opciones={AMPACIDAD.map((c) => ({ v: c.s, t: `${fmtS(c.s)} mm²` }))} />
        <Sel
          label="Límite"
          value={limite}
          onChange={setLimite}
          opciones={[
            { v: 3, t: 'Alumbrado 3%' },
            { v: 5, t: 'Fuerza 5%' },
          ]}
        />
      </div>
      <div>
        <span className="block text-xs font-medium text-gray-500 mb-1">Longitud: {fmt(L, 0)} m</span>
        <input type="range" min={1} max={150} value={L} onChange={(e) => setL(Number(e.target.value))} className="w-full accent-primary" />
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2">
        ΔV = {sistema === 'tri' ? '√3' : '2'} × {fmt(I)} × {fmt(L)} × {fmt(r, 5)} = {fmt(dv)} V
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Resultado label="Caída de tensión" valor={`${fmt(dv)} V`} />
        <Resultado label="Porcentaje" valor={`${fmt(pct)}%`} destacado />
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
        <div className={`h-full ${pct <= limite ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (pct / (limite * 2)) * 100)}%` }} />
        <div className="absolute top-0 bottom-0 w-0.5 bg-primary" style={{ left: '50%' }} title={`Límite ${limite}%`} />
      </div>
      <Veredicto ok={pct <= limite} texto={pct <= limite ? `Cumple: ${fmt(pct)}% ≤ ${limite}%.` : `No cumple: ${fmt(pct)}% > ${limite}%. Aumenta la sección o reduce la longitud.`} />
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 7. Efectos de la corriente en el cuerpo humano
// ---------------------------------------------------------------------------
const EFECTOS = [
  { desde: 0, hasta: 1, txt: 'Imperceptible', color: 'bg-emerald-500' },
  { desde: 1, hasta: 5, txt: 'Percepción', color: 'bg-emerald-400' },
  { desde: 5, hasta: 10, txt: 'Cosquilleo', color: 'bg-lime-400' },
  { desde: 10, hasta: 30, txt: 'Contracción muscular', color: 'bg-amber-400' },
  { desde: 30, hasta: 50, txt: 'Riesgo severo', color: 'bg-orange-500' },
  { desde: 50, hasta: 100, txt: 'Fibrilación ventricular', color: 'bg-red-500' },
  { desde: 100, hasta: Infinity, txt: 'Alto riesgo de muerte', color: 'bg-red-700' },
];
function CalcEfecto() {
  const [mA, setMA] = useState(10);
  const e = EFECTOS.find((x) => mA >= x.desde && mA < x.hasta) ?? EFECTOS[EFECTOS.length - 1];
  return (
    <Marco titulo="Efectos de la corriente sobre el cuerpo humano" descripcion="Mueve el control para ver el efecto según la tabla del manual y cuándo actúa un diferencial de 30 mA.">
      <input type="range" min={0} max={150} value={mA} onChange={(ev) => setMA(Number(ev.target.value))} className="w-full accent-primary" aria-label="Corriente en mA" />
      <div className="flex h-3 rounded-full overflow-hidden">
        {EFECTOS.map((x) => (
          <div key={x.txt} className={x.color} style={{ flex: Math.min(x.hasta, 150) - x.desde }} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Resultado label="Corriente" valor={`${mA} mA`} destacado />
        <Resultado label="Efecto" valor={e.txt} />
      </div>
      {mA >= 30 ? (
        <Veredicto ok texto="Un diferencial de 30 mA ya habría desconectado el circuito (protección de personas)." />
      ) : (
        <div className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm bg-amber-50 text-amber-800">
          <AlertTriangle size={18} className="shrink-0" />
          Bajo 30 mA el diferencial de protección de personas no actúa; las medidas contra contactos directos (aislación, barreras, cubiertas) siguen siendo esenciales.
        </div>
      )}
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 8. Método Wenner
// ---------------------------------------------------------------------------
const TERRENOS = [
  { t: 'Pantanoso', r: 10 },
  { t: 'Arcilloso', r: 30 },
  { t: 'Agrícola', r: 100 },
  { t: 'Arenoso', r: 500 },
  { t: 'Rocoso', r: 1000 },
];
function CalcWenner() {
  const [a, setA] = useState(4);
  const [R, setR] = useState(4);
  const rho = 2 * Math.PI * a * R;
  const cercano = TERRENOS.reduce((best, x) => (Math.abs(Math.log(x.r / rho)) < Math.abs(Math.log(best.r / rho)) ? x : best), TERRENOS[0]);
  return (
    <Marco titulo="Simulador método Wenner" descripcion="ρ = 2πaR. Ingresa la separación entre electrodos y la resistencia medida con el telurómetro.">
      <div className="grid grid-cols-2 gap-3">
        <Num label="Separación entre electrodos (a)" value={a} onChange={setA} unidad="m" />
        <Num label="Resistencia medida (R)" value={R} onChange={setR} unidad="Ω" />
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2">
        ρ = 2 × π × {fmt(a)} × {fmt(R)} = {fmt(rho, 1)} Ω·m
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Resultado label="Resistividad" valor={`${fmt(rho, 1)} Ω·m`} destacado />
        <Resultado label="Terreno referencial más parecido" valor={cercano.t} sub={`≈ ${fmt(cercano.r, 0)} Ω·m`} />
      </div>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 9. Grado IP
// ---------------------------------------------------------------------------
const IP1 = ['Sin protección', 'Sólidos > 50 mm', 'Sólidos > 12,5 mm (dedos)', 'Sólidos > 2,5 mm (herramientas)', 'Sólidos > 1 mm (alambres)', 'Protegido contra polvo', 'Totalmente estanco al polvo'];
const IP2 = [
  'Sin protección',
  'Gotas verticales',
  'Gotas con inclinación hasta 15°',
  'Lluvia (agua pulverizada)',
  'Salpicaduras desde cualquier dirección',
  'Chorros de agua',
  'Chorros potentes',
  'Inmersión temporal',
  'Inmersión continua',
];
const UBICACIONES = [
  { v: 'interior', t: 'Interior', min: [4, 1] },
  { v: 'bajo_techo', t: 'Exterior bajo techo', min: [4, 4] },
  { v: 'sin_techo', t: 'Exterior sin techo', min: [5, 4] },
] as const;
function CalcIP() {
  const [d1, setD1] = useState(4);
  const [d2, setD2] = useState(1);
  const [ub, setUb] = useState<(typeof UBICACIONES)[number]['v']>('interior');
  const u = UBICACIONES.find((x) => x.v === ub)!;
  const cumple = d1 >= u.min[0] && d2 >= u.min[1];
  return (
    <Marco titulo="Decodificador de grado IP" descripcion="Primer dígito: sólidos. Segundo dígito: líquidos. Verifica si un tablero cumple el mínimo del RIC 02.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Sel label="Primer dígito (sólidos)" value={d1} onChange={setD1} opciones={IP1.map((t, i) => ({ v: i, t: `${i} — ${t}` }))} />
        <Sel label="Segundo dígito (líquidos)" value={d2} onChange={setD2} opciones={IP2.map((t, i) => ({ v: i, t: `${i} — ${t}` }))} />
        <Sel label="Ubicación del tablero" value={ub} onChange={setUb} opciones={UBICACIONES.map((x) => ({ v: x.v, t: x.t }))} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Resultado label="Grado seleccionado" valor={`IP${d1}${d2}`} destacado sub={`${IP1[d1]} · ${IP2[d2]}`} />
        <Resultado label="Mínimo exigido" valor={`IP${u.min[0]}${u.min[1]}`} sub={u.t} />
      </div>
      <Veredicto ok={cumple} texto={cumple ? `IP${d1}${d2} cumple para "${u.t}".` : `IP${d1}${d2} NO cumple: se requiere al menos IP${u.min[0]}${u.min[1]} en "${u.t}".`} />
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 10. Cuadro de cargas y demanda máxima
// ---------------------------------------------------------------------------
function CalcCuadroCargas() {
  const [filas, setFilas] = useState([
    { n: 'Alumbrado', w: 1200 },
    { n: 'Enchufes', w: 3000 },
    { n: 'Cocina', w: 6000 },
    { n: 'Lavadora', w: 1500 },
    { n: 'Aire acondicionado', w: 2500 },
  ]);
  const [fd, setFd] = useState(0.75);
  const [sistema, setSistema] = useState<'mono' | 'tri'>('mono');
  const total = filas.reduce((a, f) => a + (f.w || 0), 0);
  const demanda = total * (fd || 0);
  const I = sistema === 'tri' ? demanda / (SQRT3 * 380) : demanda / 220;
  const sel = conductorPara(I);
  const upd = (i: number, k: 'n' | 'w', v: string | number) => setFilas((a) => a.map((f, j) => (j === i ? { ...f, [k]: v } : f)));
  return (
    <Marco titulo="Cuadro de cargas y demanda máxima" descripcion="Edita los circuitos, aplica el factor de demanda y obtén la corriente, el alimentador y la protección general sugeridos.">
      <div className="space-y-2">
        {filas.map((f, i) => (
          <div key={i} className="grid grid-cols-[28px_1fr_120px_32px] gap-2 items-center">
            <span className="text-xs font-bold text-gray-500 text-center">C{i + 1}</span>
            <input className={inputCls} value={f.n} onChange={(e) => upd(i, 'n', e.target.value)} />
            <div className="relative">
              <input type="number" className={`${inputCls} pr-8`} value={f.w} onChange={(e) => upd(i, 'w', Number(e.target.value))} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">W</span>
            </div>
            <button type="button" onClick={() => setFilas((a) => a.filter((_, j) => j !== i))} className="text-gray-500 hover:text-red-700" aria-label="Quitar">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setFilas((a) => [...a, { n: 'Nuevo circuito', w: 1000 }])} className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          <Plus size={14} /> Agregar circuito
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <Num label="Factor de demanda" value={fd} onChange={(n) => setFd(Math.min(1, n))} step={0.05} />
        <Sel
          label="Empalme"
          value={sistema}
          onChange={setSistema}
          opciones={[
            { v: 'mono', t: 'Monofásico 220 V' },
            { v: 'tri', t: 'Trifásico 380 V' },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Resultado label="Potencia instalada" valor={`${fmt(total / 1000)} kW`} sub={`${fmt(total, 0)} W`} />
        <Resultado label="Demanda máxima" valor={`${fmt(demanda / 1000)} kW`} sub={`${fmt(total / 1000)} × ${fmt(fd)}`} />
        <Resultado label="Corriente de demanda" valor={`${fmt(I, 1)} A`} sub={sistema === 'tri' ? 'I = P / (√3 × 380)' : 'I = P / 220'} />
        <Resultado label="Alimentador Cu sugerido" valor={sel ? `${fmtS(sel.s)} mm²` : 'Fuera de tabla'} destacado sub={sel ? `Ampacidad ${sel.iz} A` : undefined} />
        <Resultado label="Disyuntor general sugerido" valor={sel ? `${sel.prot} A` : '—'} destacado />
        <Resultado label="Diferencial" valor="30 mA" sub="Protección de personas" />
      </div>
      {sistema === 'mono' && total > 10000 && (
        <div className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm bg-amber-50 text-amber-800">
          <AlertTriangle size={18} className="shrink-0" />
          La potencia instalada supera los 10 kW típicos de un empalme monofásico; evalúa un empalme trifásico.
        </div>
      )}
      <p className="text-xs text-gray-500">Sugerencia referencial con la tabla de ampacidad del manual; verifica además la caída de tensión del alimentador.</p>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 11. Motor: corriente y métodos de partida
// ---------------------------------------------------------------------------
function CalcMotor() {
  const [hp, setHp] = useState(30);
  const [sistema, setSistema] = useState<'mono' | 'tri'>('tri');
  const [fp, setFp] = useState(0.85);
  const [eta, setEta] = useState(0.9);
  const [mult, setMult] = useState(6);
  const V = sistema === 'tri' ? 380 : 220;
  const P = hp * 746;
  const In = sistema === 'tri' ? P / (SQRT3 * V * fp * eta) : P / (V * fp * eta);
  const Ip = In * mult;
  const metodo =
    hp <= 7.5
      ? { t: 'Partida directa', d: 'Motores pequeños (hasta ≈ 7,5 HP): bajo costo y fácil implementación.' }
      : hp < 15
        ? { t: 'Partida suave o estrella-triángulo', d: 'Sobre 7,5 HP conviene limitar la corriente de partida.' }
        : hp <= 100
          ? { t: 'Estrella-triángulo', d: 'Motores medianos (15 a 100 HP): corriente ≈ 1/3 de la partida directa.' }
          : { t: 'Partida suave o variador (VFD)', d: 'Motores grandes: control gradual de tensión o de frecuencia.' };
  const cond = conductorPara(In * 1.25);
  return (
    <Marco titulo="Simulador de motores" descripcion="Calcula corriente nominal, corriente de partida y el método de partida recomendado.">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Num label="Potencia" value={hp} onChange={setHp} unidad="HP" />
        <Sel
          label="Alimentación"
          value={sistema}
          onChange={setSistema}
          opciones={[
            { v: 'tri', t: 'Trifásico 380 V' },
            { v: 'mono', t: 'Monofásico 220 V' },
          ]}
        />
        <Num label="Factor de potencia" value={fp} onChange={(n) => setFp(Math.min(1, n))} step={0.01} />
        <Num label="Rendimiento" value={eta} onChange={(n) => setEta(Math.min(1, n))} step={0.01} />
      </div>
      <div>
        <span className="block text-xs font-medium text-gray-500 mb-1">Corriente de partida directa: {mult} × In (rango típico 5 a 8)</span>
        <input type="range" min={5} max={8} step={0.5} value={mult} onChange={(e) => setMult(Number(e.target.value))} className="w-full accent-primary" />
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2 break-words">
        P = {fmt(hp)} × 746 = {fmt(P, 0)} W · In = {fmt(P, 0)} / ({sistema === 'tri' ? '√3 × ' : ''}
        {V} × {fmt(fp)} × {fmt(eta)}) = {fmt(In, 1)} A
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Resultado label="Corriente nominal (In)" valor={`${fmt(In, 1)} A`} destacado />
        <Resultado label="Partida directa" valor={`${fmt(Ip, 0)} A`} sub={`${mult} × In`} />
        <Resultado label="Estrella-triángulo" valor={`${fmt(Ip / 3, 0)} A`} sub="≈ 1/3 de la directa" />
        <Resultado label="Ajuste relé térmico" valor={`${fmt(In, 1)} A`} sub="Se calibra a la In del motor" />
        <Resultado label="Conductor Cu sugerido" valor={cond ? `${fmtS(cond.s)} mm²` : 'Fuera de tabla'} sub="Criterio práctico: Iz ≥ 125% In" />
        <Resultado label="Método recomendado" valor={metodo.t} />
      </div>
      <p className="text-xs text-gray-500">{metodo.d} Para controlar velocidad, torque o sentido de giro se usa un variador de frecuencia.</p>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 12. Sistema fotovoltaico
// ---------------------------------------------------------------------------
const CIUDADES = [
  { v: 6.8, t: 'Copiapó — 6,8 HSP' },
  { v: 5.2, t: 'Santiago — 5,2 HSP' },
  { v: 5.5, t: 'Zona central — 5,5 HSP' },
  { v: 3.5, t: 'Puerto Montt — 3,5 HSP' },
];
const INVERSORES = [3, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100];
function CalcFV() {
  const [consumo, setConsumo] = useState(1200);
  const [hsp, setHsp] = useState(5.2);
  const [eta, setEta] = useState(0.8);
  const [wp, setWp] = useState(550);
  const [margen, setMargen] = useState(0);
  const kwpReq = (consumo / (30 * hsp * eta)) * (1 + margen / 100);
  const n = Math.ceil((kwpReq * 1000) / wp);
  const kwp = (n * wp) / 1000;
  const diario = kwp * hsp * eta;
  const inv = INVERSORES.find((x) => x >= kwp * 0.95) ?? INVERSORES[INVERSORES.length - 1];
  return (
    <Marco titulo="Simulador de sistema fotovoltaico On Grid" descripcion="E = P × HSP × η. Dimensiona paneles e inversor a partir del consumo mensual.">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Num label="Consumo mensual" value={consumo} onChange={setConsumo} unidad="kWh" />
        <Sel label="Ubicación (HSP)" value={hsp} onChange={setHsp} opciones={CIUDADES} />
        <Num label="Rendimiento global (η)" value={eta} onChange={(x) => setEta(Math.min(1, x))} step={0.01} />
        <Num label="Potencia por panel" value={wp} onChange={setWp} unidad="W" />
        <Num label="Sobredimensionamiento" value={margen} onChange={setMargen} unidad="%" />
      </div>
      <p className="font-mono text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2 break-words">
        P requerida = {fmt(consumo)} / (30 × {fmt(hsp)} × {fmt(eta)}){margen ? ` × ${fmt(1 + margen / 100)}` : ''} = {fmt(kwpReq)} kWp
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Resultado label="Paneles" valor={`${n} × ${fmt(wp, 0)} W`} destacado sub={`${fmt(kwp)} kWp instalados`} />
        <Resultado label="Inversor sugerido" valor={`${inv} kW`} sub={kwp > 10 ? 'Evaluar inversor trifásico' : 'On Grid'} />
        <Resultado label="Generación diaria" valor={`${fmt(diario, 1)} kWh`} />
        <Resultado label="Generación mensual" valor={`${fmt(diario * 30, 0)} kWh`} />
        <Resultado label="Generación anual" valor={`${fmt(diario * 365, 0)} kWh`} />
        <Resultado label="Cobertura del consumo" valor={`${fmt(((diario * 30) / consumo) * 100, 0)}%`} />
      </div>
      <p className="text-xs text-gray-500">Protecciones mínimas: fusibles CC, DPS CC, DPS CA, diferencial y disyuntor general. Excedentes se inyectan a la red vía Net Billing (Ley 20.571).</p>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
// 13. Presupuesto
// ---------------------------------------------------------------------------
function CalcPresupuesto() {
  const [mat, setMat] = useState(2500000);
  const [mo, setMo] = useState(1500000);
  const [eq, setEq] = useState(0);
  const [tr, setTr] = useState(0);
  const [util, setUtil] = useState(20);
  const [iva, setIva] = useState(false);
  const costo = (mat || 0) + (mo || 0) + (eq || 0) + (tr || 0);
  const utilidad = costo * ((util || 0) / 100);
  const neto = costo + utilidad;
  const total = iva ? neto * 1.19 : neto;
  return (
    <Marco titulo="Simulador de presupuesto eléctrico" descripcion="Valores en pesos chilenos. El ejemplo del manual: materiales $2.500.000 + mano de obra $1.500.000 + utilidad $800.000.">
      <div className="grid grid-cols-2 gap-3">
        <Num label="Materiales" value={mat} onChange={setMat} unidad="$" step={1000} />
        <Num label="Mano de obra" value={mo} onChange={setMo} unidad="$" step={1000} />
        <Num label="Equipos" value={eq} onChange={setEq} unidad="$" step={1000} />
        <Num label="Transporte" value={tr} onChange={setTr} unidad="$" step={1000} />
        <Num label="Utilidad" value={util} onChange={setUtil} unidad="%" />
        <label className="flex items-center gap-2 text-sm text-gray-700 mt-5">
          <input type="checkbox" checked={iva} onChange={(e) => setIva(e.target.checked)} className="accent-primary w-4 h-4" />
          Incluir IVA (19%)
        </label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Resultado label="Costo directo" valor={clp(costo)} />
        <Resultado label="Utilidad" valor={clp(utilidad)} />
        <Resultado label="Neto" valor={clp(neto)} />
        <Resultado label={iva ? 'Total con IVA' : 'Total'} valor={clp(total)} destacado />
      </div>
    </Marco>
  );
}

// ---------------------------------------------------------------------------
const MAPA: Record<CalculadoraId, React.FC> = {
  ohm: CalcOhm,
  resistencias: CalcResistencias,
  potencia: CalcPotencia,
  energia: CalcEnergia,
  conductor: CalcConductor,
  caidaTension: CalcCaida,
  efectoCorriente: CalcEfecto,
  wenner: CalcWenner,
  gradoIP: CalcIP,
  cuadroCargas: CalcCuadroCargas,
  motor: CalcMotor,
  fotovoltaico: CalcFV,
  presupuesto: CalcPresupuesto,
};

export const NOMBRES_CALCULADORAS: Record<CalculadoraId, string> = {
  ohm: 'Ley de Ohm',
  resistencias: 'Circuitos serie y paralelo',
  potencia: 'Potencia eléctrica',
  energia: 'Consumo de energía',
  conductor: 'Dimensionamiento de conductores',
  caidaTension: 'Caída de tensión',
  efectoCorriente: 'Efectos de la corriente',
  wenner: 'Método Wenner',
  gradoIP: 'Grado IP',
  cuadroCargas: 'Cuadro de cargas',
  motor: 'Motores y partida',
  fotovoltaico: 'Sistema fotovoltaico',
  presupuesto: 'Presupuesto',
};

export default function Calculadora({ id }: { id: CalculadoraId }) {
  const C = useMemo(() => MAPA[id], [id]);
  return C ? <C /> : null;
}
