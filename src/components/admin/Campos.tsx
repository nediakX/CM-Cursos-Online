import React, { useId } from 'react';
import { ArrowDown, ArrowUp, Plus, Trash2, Upload } from 'lucide-react';

/** Controles de formulario reutilizables para los editores del administrador. */

const base =
  'mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary';

export function Campo({
  label, value, onChange, ayuda, type = 'text', placeholder, required, className = '',
}: {
  label: string; value: string; onChange: (v: string) => void; ayuda?: string; type?: string; placeholder?: string; required?: boolean; className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-700" aria-hidden="true">*</span>}
      </label>
      <input id={id} type={type} value={value} placeholder={placeholder} required={required} onChange={(e) => onChange(e.target.value)} className={base} aria-describedby={ayuda ? `${id}-ayuda` : undefined} />
      {ayuda && <p id={`${id}-ayuda`} className="mt-1 text-xs text-gray-600">{ayuda}</p>}
    </div>
  );
}

export function Area({
  label, value, onChange, ayuda, rows = 3, placeholder, className = '', mono = false,
}: {
  label: string; value: string; onChange: (v: string) => void; ayuda?: string; rows?: number; placeholder?: string; className?: string; mono?: boolean;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">{label}</label>
      <textarea id={id} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={`${base} resize-y ${mono ? 'font-mono text-xs' : ''}`} aria-describedby={ayuda ? `${id}-ayuda` : undefined} />
      {ayuda && <p id={`${id}-ayuda`} className="mt-1 text-xs text-gray-600">{ayuda}</p>}
    </div>
  );
}

/** Lista de textos editada como "uno por línea". */
export function ListaLineas({
  label, value, onChange, ayuda = 'Escribe un elemento por línea.', rows = 4, className = '',
}: {
  label: string; value: string[]; onChange: (v: string[]) => void; ayuda?: string; rows?: number; className?: string;
}) {
  return (
    <Area
      label={label}
      rows={rows}
      ayuda={ayuda}
      className={className}
      value={value.join('\n')}
      onChange={(v) => onChange(v.split('\n').map((x) => x.replace(/\s+$/, '')).filter((x, i, arr) => x.trim() || i === arr.length - 1))}
    />
  );
}

export function Interruptor({ label, checked, onChange, ayuda }: { label: string; checked: boolean; onChange: (v: boolean) => void; ayuda?: string }) {
  const id = useId();
  return (
    <div className="flex items-start gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 w-11 h-6 rounded-full shrink-0 transition-colors ${checked ? 'bg-emerald-600' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
        <span className="sr-only">{label}</span>
      </button>
      <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-800 cursor-pointer" aria-hidden="true">{label}</label>
        {ayuda && <p className="text-xs text-gray-600">{ayuda}</p>}
      </div>
    </div>
  );
}

export function Selector({
  label, value, onChange, opciones, className = '',
}: {
  label: string; value: string; onChange: (v: string) => void; opciones: { value: string; label: string }[]; className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={base}>
        {opciones.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

const MAX_IMAGEN = 400 * 1024;

/** Campo de imagen: pegar URL o subir un archivo pequeño (se guarda embebido). */
export function CampoImagen({
  label, value, onChange, ayuda, onError,
}: {
  label: string; value: string; onChange: (v: string) => void; ayuda?: string; onError?: (msg: string) => void;
}) {
  const id = useId();
  const subir = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) return onError?.('El archivo debe ser una imagen.');
    if (file.size > MAX_IMAGEN) return onError?.('La imagen pesa más de 400 KB. Comprímela o pega un enlace (URL) a la imagen.');
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">{label}</label>
      <div className="mt-1 flex gap-2 items-start">
        {value && <img src={value} alt="" className="w-11 h-11 rounded-lg object-cover border border-gray-200 shrink-0" />}
        <input
          id={id}
          type="url"
          value={value.startsWith('data:') ? '(imagen subida)' : value}
          readOnly={value.startsWith('data:')}
          placeholder="https://…"
          onChange={(e) => onChange(e.target.value)}
          className={`${base} mt-0`}
        />
        <label className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer focus-within:ring-2 focus-within:ring-primary">
          <Upload size={16} aria-hidden="true" /> Subir
          <input type="file" accept="image/*" className="sr-only" onChange={subir} />
        </label>
        {value && (
          <button type="button" onClick={() => onChange('')} className="shrink-0 p-2 rounded-xl text-red-700 hover:bg-red-50" aria-label={`Quitar ${label.toLowerCase()}`}>
            <Trash2 size={16} />
          </button>
        )}
      </div>
      {ayuda && <p className="mt-1 text-xs text-gray-600">{ayuda}</p>}
    </div>
  );
}

/** Editor genérico de listas de objetos: agregar, quitar y reordenar. */
export function EditorLista<T>({
  items, onChange, nuevo, render, etiqueta, titulo, max,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  nuevo: () => T;
  render: (item: T, set: (v: T) => void, i: number) => React.ReactNode;
  etiqueta: (item: T, i: number) => string;
  titulo: string;
  max?: number;
}) {
  const mover = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const a = [...items];
    [a[i], a[j]] = [a[j], a[i]];
    onChange(a);
  };
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <fieldset key={i} className="border border-gray-200 rounded-2xl p-4 bg-gray-50/60">
          <legend className="sr-only">{etiqueta(it, i)}</legend>
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-sm font-semibold text-gray-800 truncate" aria-hidden="true">{etiqueta(it, i)}</p>
            <div className="flex items-center gap-1 shrink-0">
              <button type="button" onClick={() => mover(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg text-gray-600 hover:bg-white disabled:opacity-30" aria-label={`Subir ${etiqueta(it, i)}`}>
                <ArrowUp size={16} />
              </button>
              <button type="button" onClick={() => mover(i, 1)} disabled={i === items.length - 1} className="p-1.5 rounded-lg text-gray-600 hover:bg-white disabled:opacity-30" aria-label={`Bajar ${etiqueta(it, i)}`}>
                <ArrowDown size={16} />
              </button>
              <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-1.5 rounded-lg text-red-700 hover:bg-red-50" aria-label={`Eliminar ${etiqueta(it, i)}`}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {render(it, (v) => onChange(items.map((x, j) => (j === i ? v : x))), i)}
        </fieldset>
      ))}
      {(!max || items.length < max) && (
        <button type="button" onClick={() => onChange([...items, nuevo()])} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary">
          <Plus size={16} aria-hidden="true" /> Agregar {titulo}
        </button>
      )}
    </div>
  );
}

/** Calcula el contraste WCAG entre dos colores hex. */
export function contraste(a: string, b: string): number {
  const lum = (hex: string) => {
    const n = hex.replace('#', '');
    if (n.length !== 6) return 0;
    const [r, g, bl] = [0, 2, 4].map((i) => {
      const c = parseInt(n.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
