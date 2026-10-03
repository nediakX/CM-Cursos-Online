import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertTriangle, ArrowDown, ArrowLeft, ArrowUp, Calculator, CheckSquare, Code, Eye, FileText, HelpCircle, Image as ImageIcon,
  Info, List, Loader2, Pencil, Plus, RotateCcw, Save, Table, Trash2, Type, Video,
} from 'lucide-react';
import { getContenidoModulo, getModulo, guardarContenidoModulo, restaurarContenidoModulo } from '../../services/api';
import { useToast } from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { Area, Campo, CampoImagen, Interruptor, ListaLineas, Selector } from '../../components/admin/Campos';
import { ListaBloques, urlEmbed } from '../../components/modulo/Bloques';
import { NOMBRES_CALCULADORAS } from '../../components/modulo/Calculadoras';
import type { BloqueContenido, CalculadoraId, ContenidoModulo, LeccionContenido, Modulo } from '../../types';

// ─── Catálogo de bloques ──────────────────────────────────────────────────────
type Tipo = BloqueContenido['tipo'];

const INFO_BLOQUE: Record<Tipo, { label: string; icon: React.ReactNode }> = {
  texto: { label: 'Texto', icon: <Type size={16} /> },
  video: { label: 'Video', icon: <Video size={16} /> },
  imagen: { label: 'Imagen', icon: <ImageIcon size={16} /> },
  nota: { label: 'Nota destacada', icon: <Info size={16} /> },
  lista: { label: 'Lista', icon: <List size={16} /> },
  checklist: { label: 'Checklist', icon: <CheckSquare size={16} /> },
  pregunta: { label: 'Pregunta de repaso', icon: <HelpCircle size={16} /> },
  tabla: { label: 'Tabla', icon: <Table size={16} /> },
  calculadora: { label: 'Calculadora', icon: <Calculator size={16} /> },
  formula: { label: 'Fórmula', icon: <Code size={16} /> },
  ejemplo: { label: 'Ejemplo resuelto', icon: <Code size={16} /> },
  tarjetas: { label: 'Tarjetas desplegables', icon: <Code size={16} /> },
  emparejar: { label: 'Actividad: emparejar', icon: <Code size={16} /> },
  ordenar: { label: 'Actividad: ordenar', icon: <Code size={16} /> },
  casos: { label: 'Casos reales', icon: <Code size={16} /> },
};

const NUEVO: Record<Tipo, () => BloqueContenido> = {
  texto: () => ({ tipo: 'texto', texto: '' }),
  video: () => ({ tipo: 'video', url: '', titulo: '' }),
  imagen: () => ({ tipo: 'imagen', url: '', alt: '' }),
  nota: () => ({ tipo: 'nota', variante: 'info', texto: '' }),
  lista: () => ({ tipo: 'lista', items: [''], estilo: 'punto' }),
  checklist: () => ({ tipo: 'checklist', titulo: 'Verifica', items: [''] }),
  pregunta: () => ({ tipo: 'pregunta', enunciado: '', opciones: ['', '', ''], correcta: 0, explicacion: '' }),
  tabla: () => ({ tipo: 'tabla', columnas: ['Columna 1', 'Columna 2'], filas: [['', '']] }),
  calculadora: () => ({ tipo: 'calculadora', calculadora: 'ohm' }),
  formula: () => ({ tipo: 'formula', titulo: '', expresion: '', variables: [{ simbolo: '', significado: '' }] }),
  ejemplo: () => ({ tipo: 'ejemplo', titulo: '', datos: [''], pasos: [{ titulo: '', detalle: '' }], resultado: '' }),
  tarjetas: () => ({ tipo: 'tarjetas', items: [{ titulo: '', detalle: [''] }] }),
  emparejar: () => ({ tipo: 'emparejar', titulo: '', pares: [{ a: '', b: '' }] }),
  ordenar: () => ({ tipo: 'ordenar', titulo: '', items: [''] }),
  casos: () => ({ tipo: 'casos', casos: [{ titulo: '', situacion: '', resultado: '', leccion: '' }] }),
};

const SIMPLES: Tipo[] = ['texto', 'video', 'imagen', 'nota', 'lista', 'checklist', 'pregunta', 'tabla', 'calculadora'];
const AVANZADOS: Tipo[] = ['formula', 'ejemplo', 'tarjetas', 'emparejar', 'ordenar', 'casos'];

function resumen(b: BloqueContenido): string {
  switch (b.tipo) {
    case 'texto': return b.texto;
    case 'video': return b.titulo || b.url;
    case 'imagen': return b.alt || b.url;
    case 'nota': return b.titulo || b.texto;
    case 'lista': case 'checklist': return b.titulo || b.items.join(' · ');
    case 'pregunta': return b.enunciado;
    case 'tabla': return b.titulo || b.columnas.join(' | ');
    case 'calculadora': return NOMBRES_CALCULADORAS[b.calculadora];
    case 'formula': case 'ejemplo': case 'emparejar': case 'ordenar': return b.titulo;
    case 'tarjetas': return b.titulo || b.items.map((x) => x.titulo).join(' · ');
    case 'casos': return b.titulo || b.casos.map((x) => x.titulo).join(' · ');
  }
}

// ─── Editor de un bloque ──────────────────────────────────────────────────────
function EditorJson({ bloque, onChange }: { bloque: BloqueContenido; onChange: (b: BloqueContenido) => void }) {
  const [texto, setTexto] = useState(() => JSON.stringify(bloque, null, 2));
  const [error, setError] = useState('');
  const aplicar = () => {
    try {
      const v = JSON.parse(texto);
      if (v?.tipo !== bloque.tipo) throw new Error(`El campo "tipo" debe seguir siendo "${bloque.tipo}".`);
      setError('');
      onChange(v);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'JSON inválido');
    }
  };
  return (
    <div>
      <Area label="Estructura del bloque (formato JSON)" rows={12} mono value={texto} onChange={setTexto} ayuda="Edita el texto entre comillas. Los cambios se aplican al salir del campo o con el botón." />
      <div className="mt-2 flex items-center gap-3">
        <button type="button" onClick={aplicar} className="px-3 py-1.5 rounded-lg bg-gray-800 text-white text-xs font-semibold">Aplicar cambios</button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </div>
    </div>
  );
}

function EditorBloque({ bloque, onChange, onError }: { bloque: BloqueContenido; onChange: (b: BloqueContenido) => void; onError: (m: string) => void }) {
  const b = bloque;
  switch (b.tipo) {
    case 'texto':
      return <Area label="Párrafo" rows={5} value={b.texto} onChange={(v) => onChange({ ...b, texto: v })} />;
    case 'video': {
      const valido = !b.url || urlEmbed(b.url) !== null || /\.(mp4|webm|ogg)(\?|$)/i.test(b.url);
      return (
        <div className="space-y-3">
          <Campo label="Enlace del video" type="url" value={b.url} onChange={(v) => onChange({ ...b, url: v.trim() })} placeholder="https://www.youtube.com/watch?v=…" ayuda="YouTube, Vimeo, Google Drive (compartido) o un archivo .mp4." />
          {!valido && <p className="text-sm text-red-700">El enlace no parece válido.</p>}
          <Campo label="Título del video" value={b.titulo ?? ''} onChange={(v) => onChange({ ...b, titulo: v })} ayuda="Ayuda a los lectores de pantalla a identificar el video." />
          <Area label="Descripción (opcional)" rows={2} value={b.descripcion ?? ''} onChange={(v) => onChange({ ...b, descripcion: v })} />
        </div>
      );
    }
    case 'imagen':
      return (
        <div className="space-y-3">
          <CampoImagen label="Imagen" value={b.url} onChange={(v) => onChange({ ...b, url: v })} onError={onError} />
          <Campo label="Texto alternativo" required value={b.alt} onChange={(v) => onChange({ ...b, alt: v })} ayuda="Describe lo que muestra la imagen para quienes no pueden verla." />
          <Campo label="Pie de imagen (opcional)" value={b.pie ?? ''} onChange={(v) => onChange({ ...b, pie: v })} />
        </div>
      );
    case 'nota':
      return (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Selector label="Tipo" value={b.variante} onChange={(v) => onChange({ ...b, variante: v as typeof b.variante })} opciones={[
              { value: 'info', label: 'Información' }, { value: 'tip', label: 'Consejo' }, { value: 'importante', label: 'Importante' }, { value: 'peligro', label: 'Peligro' },
            ]} />
            <Campo label="Título (opcional)" value={b.titulo ?? ''} onChange={(v) => onChange({ ...b, titulo: v })} />
          </div>
          <Area label="Texto" value={b.texto} onChange={(v) => onChange({ ...b, texto: v })} />
        </div>
      );
    case 'lista':
      return (
        <div className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Campo label="Título (opcional)" value={b.titulo ?? ''} onChange={(v) => onChange({ ...b, titulo: v })} />
            <Selector label="Estilo" value={b.estilo ?? 'punto'} onChange={(v) => onChange({ ...b, estilo: v as 'punto' })} opciones={[
              { value: 'punto', label: 'Viñetas' }, { value: 'check', label: 'Checks' }, { value: 'numero', label: 'Numerada' },
            ]} />
          </div>
          <ListaLineas label="Elementos" value={b.items} onChange={(v) => onChange({ ...b, items: v })} />
        </div>
      );
    case 'checklist':
      return (
        <div className="space-y-3">
          <Campo label="Título" value={b.titulo} onChange={(v) => onChange({ ...b, titulo: v })} />
          <ListaLineas label="Puntos a verificar" value={b.items} onChange={(v) => onChange({ ...b, items: v })} />
        </div>
      );
    case 'pregunta':
      return (
        <div className="space-y-3">
          <Area label="Enunciado" rows={2} value={b.enunciado} onChange={(v) => onChange({ ...b, enunciado: v })} />
          <ListaLineas label="Alternativas" value={b.opciones} onChange={(v) => onChange({ ...b, opciones: v, correcta: Math.min(b.correcta, Math.max(0, v.length - 1)) })} ayuda="Una alternativa por línea." />
          <Selector label="Respuesta correcta" value={String(b.correcta)} onChange={(v) => onChange({ ...b, correcta: Number(v) })} opciones={b.opciones.map((o, i) => ({ value: String(i), label: `${String.fromCharCode(65 + i)}) ${o || '(vacía)'}` }))} />
          <Area label="Explicación" rows={2} value={b.explicacion} onChange={(v) => onChange({ ...b, explicacion: v })} />
        </div>
      );
    case 'tabla':
      return (
        <div className="space-y-3">
          <Campo label="Título (opcional)" value={b.titulo ?? ''} onChange={(v) => onChange({ ...b, titulo: v })} />
          <Campo label="Columnas" value={b.columnas.join(' | ')} onChange={(v) => onChange({ ...b, columnas: v.split('|').map((x) => x.trim()) })} ayuda="Separa las columnas con el carácter |" />
          <Area label="Filas" rows={6} mono value={b.filas.map((f) => f.join(' | ')).join('\n')} onChange={(v) => onChange({ ...b, filas: v.split('\n').map((l) => l.split('|').map((x) => x.trim())) })} ayuda="Una fila por línea; separa las celdas con |" />
          <Campo label="Nota al pie (opcional)" value={b.nota ?? ''} onChange={(v) => onChange({ ...b, nota: v })} />
          <Interruptor label="Permitir buscar en la tabla" checked={!!b.buscable} onChange={(v) => onChange({ ...b, buscable: v })} />
        </div>
      );
    case 'calculadora':
      return (
        <Selector label="Calculadora" value={b.calculadora} onChange={(v) => onChange({ ...b, calculadora: v as CalculadoraId })} opciones={Object.entries(NOMBRES_CALCULADORAS).map(([value, label]) => ({ value, label }))} />
      );
    default:
      return <EditorJson key={JSON.stringify(b).length} bloque={b} onChange={onChange} />;
  }
}

// ─── Página ───────────────────────────────────────────────────────────────────
const nuevaLeccionId = (moduloId: string) => `${moduloId}-l-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;

export default function ContentEditor() {
  const { moduloId = '' } = useParams<{ moduloId: string }>();
  const { toast } = useToast();
  const [modulo, setModulo] = useState<Modulo | null>(null);
  const [original, setOriginal] = useState<ContenidoModulo | null>(null);
  const [c, setC] = useState<ContenidoModulo | null>(null);
  const [sel, setSel] = useState<number | 'modulo'>(0);
  const [abierto, setAbierto] = useState<number | null>(null);
  const [vista, setVista] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [menuBloque, setMenuBloque] = useState(false);
  const [confirmar, setConfirmar] = useState<null | { titulo: string; mensaje: string; accion: () => void }>(null);

  useEffect(() => {
    Promise.all([getModulo(moduloId), getContenidoModulo(moduloId)])
      .then(([m, cont]) => {
        setModulo(m);
        setOriginal(cont);
        setC(structuredClone(cont));
      })
      .catch(() => toast('No se pudo cargar el módulo', 'error'));
  }, [moduloId, toast]);

  const sinGuardar = useMemo(() => JSON.stringify(c) !== JSON.stringify(original), [c, original]);

  useEffect(() => {
    if (!sinGuardar) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [sinGuardar]);

  if (!c || !modulo) {
    return (
      <div className="p-6" role="status">
        <Loader2 className="animate-spin text-primary" aria-hidden="true" /> <span className="sr-only">Cargando</span>
      </div>
    );
  }

  const lecciones = c.lecciones;
  const leccion: LeccionContenido | null = typeof sel === 'number' ? lecciones[sel] ?? null : null;

  const setLecciones = (ls: LeccionContenido[]) => setC({ ...c, lecciones: ls });
  const setLeccion = (l: LeccionContenido) => typeof sel === 'number' && setLecciones(lecciones.map((x, i) => (i === sel ? l : x)));
  const setBloques = (bs: BloqueContenido[]) => leccion && setLeccion({ ...leccion, bloques: bs });

  const moverLeccion = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= lecciones.length) return;
    const a = [...lecciones];
    [a[i], a[j]] = [a[j], a[i]];
    setLecciones(a);
    setSel(j);
  };

  const agregarLeccion = () => {
    const l: LeccionContenido = { leccionId: nuevaLeccionId(moduloId), titulo: `Nueva lección ${lecciones.length + 1}`, minutos: 30, bloques: [{ tipo: 'texto', texto: '' }] };
    setLecciones([...lecciones, l]);
    setSel(lecciones.length);
    setAbierto(0);
  };

  const eliminarLeccion = (i: number) =>
    setConfirmar({
      titulo: 'Eliminar lección',
      mensaje: `Se eliminará "${lecciones[i].titulo}" y todo su contenido. El avance de los alumnos en esta lección dejará de contarse.`,
      accion: () => {
        setLecciones(lecciones.filter((_, j) => j !== i));
        setSel(Math.max(0, i - 1));
      },
    });

  const agregarBloque = (t: Tipo) => {
    if (!leccion) return;
    setBloques([...leccion.bloques, NUEVO[t]()]);
    setAbierto(leccion.bloques.length);
    setMenuBloque(false);
  };

  const moverBloque = (i: number, d: number) => {
    if (!leccion) return;
    const j = i + d;
    if (j < 0 || j >= leccion.bloques.length) return;
    const a = [...leccion.bloques];
    [a[i], a[j]] = [a[j], a[i]];
    setBloques(a);
    setAbierto(abierto === i ? j : abierto);
  };

  const guardar = async () => {
    if (!lecciones.length) return toast('El módulo debe tener al menos una lección', 'error');
    const sinAlt = lecciones.some((l) => l.bloques.some((b) => b.tipo === 'imagen' && b.url && !b.alt.trim()));
    if (sinAlt) return toast('Hay imágenes sin texto alternativo. Complétalo para que el contenido sea accesible.', 'error');
    setGuardando(true);
    try {
      const limpio: ContenidoModulo = {
        ...c,
        resumen: c.resumen.filter((x) => x.trim()),
        laboratorios: c.laboratorios.filter((x) => x.trim()),
        lecciones: lecciones.map((l) => ({ ...l, titulo: l.titulo.trim() || 'Lección sin título' })),
      };
      const g = await guardarContenidoModulo(moduloId, limpio);
      setOriginal(g);
      setC(structuredClone(g));
      toast('Contenido publicado para los alumnos', 'success');
    } catch (e) {
      toast(e instanceof Error && e.message === 'ALMACENAMIENTO_LLENO' ? 'No hay espacio: usa enlaces (URL) en vez de subir imágenes pesadas.' : 'No se pudo guardar', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const restaurar = () =>
    setConfirmar({
      titulo: 'Restaurar contenido original',
      mensaje: 'Se descartarán todas las ediciones hechas a este módulo y se volverá al contenido original.',
      accion: async () => {
        try {
          const r = await restaurarContenidoModulo(moduloId);
          setOriginal(r);
          setC(structuredClone(r));
          setSel(0);
          toast('Contenido restaurado', 'success');
        } catch {
          toast('No se pudo restaurar', 'error');
        }
      },
    });

  return (
    <div className="p-4 sm:p-6 max-w-7xl pb-28">
      <Link to="/admin/cursos" className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Volver a cursos
      </Link>
      <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <p className="text-sm font-semibold text-accent-ink">Módulo {modulo.orden}</p>
          <h1 className="text-2xl font-bold text-primary">{modulo.nombre}</h1>
          <p className="text-sm text-gray-600 mt-1">Edita las lecciones que ven los alumnos: textos, videos, imágenes, actividades y calculadoras.</p>
        </div>
        <button type="button" onClick={restaurar} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50 self-start">
          <RotateCcw size={16} aria-hidden="true" /> Restaurar original
        </button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Índice */}
        <nav aria-label="Lecciones del módulo" className="bg-white rounded-2xl border border-gray-200 p-3 lg:sticky lg:top-4">
          <button type="button" onClick={() => setSel('modulo')} aria-current={sel === 'modulo' ? 'true' : undefined} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${sel === 'modulo' ? 'bg-primary text-white' : 'text-gray-800 hover:bg-gray-100'}`}>
            <FileText size={16} aria-hidden="true" /> Introducción y cierre
          </button>
          <p className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-600">Lecciones ({lecciones.length})</p>
          <ol className="space-y-1">
            {lecciones.map((l, i) => (
              <li key={l.leccionId} className="group flex items-center gap-1">
                <button type="button" onClick={() => { setSel(i); setAbierto(null); }} aria-current={sel === i ? 'true' : undefined} className={`flex-1 min-w-0 text-left px-3 py-2 rounded-xl text-sm ${sel === i ? 'bg-primary text-white font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}>
                  <span className="block truncate">{i + 1}. {l.titulo || 'Sin título'}</span>
                </button>
                <div className="flex flex-col">
                  <button type="button" onClick={() => moverLeccion(i, -1)} disabled={i === 0} className="p-0.5 text-gray-500 hover:text-primary disabled:opacity-20" aria-label={`Subir lección ${l.titulo}`}><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => moverLeccion(i, 1)} disabled={i === lecciones.length - 1} className="p-0.5 text-gray-500 hover:text-primary disabled:opacity-20" aria-label={`Bajar lección ${l.titulo}`}><ArrowDown size={14} /></button>
                </div>
              </li>
            ))}
          </ol>
          <button type="button" onClick={agregarLeccion} className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl border-2 border-dashed border-gray-300 text-sm font-medium text-gray-700 hover:border-primary hover:text-primary">
            <Plus size={16} aria-hidden="true" /> Agregar lección
          </button>
        </nav>

        {/* Panel principal */}
        <div className="min-w-0 space-y-5">
          {sel === 'modulo' && (
            <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 space-y-4">
              <h2 className="text-lg font-bold text-primary">Introducción y cierre del módulo</h2>
              <Area label="Introducción" rows={3} value={c.introduccion} onChange={(v) => setC({ ...c, introduccion: v })} ayuda="Aparece bajo el título del módulo." />
              <ListaLineas label="Resumen / ideas clave" rows={5} value={c.resumen} onChange={(v) => setC({ ...c, resumen: v })} />
              <ListaLineas label="Laboratorios y actividades prácticas" rows={4} value={c.laboratorios} onChange={(v) => setC({ ...c, laboratorios: v })} />
              <fieldset className="border border-gray-200 rounded-2xl p-4 space-y-3">
                <legend className="px-1 text-sm font-semibold text-gray-800">Taller del módulo (opcional)</legend>
                <Interruptor label="Incluir taller" checked={!!c.taller} onChange={(v) => setC({ ...c, taller: v ? { titulo: '', descripcion: '', entregables: [] } : undefined })} />
                {c.taller && (
                  <>
                    <Campo label="Título" value={c.taller.titulo} onChange={(v) => setC({ ...c, taller: { ...c.taller!, titulo: v } })} />
                    <Area label="Descripción" value={c.taller.descripcion} onChange={(v) => setC({ ...c, taller: { ...c.taller!, descripcion: v } })} />
                    <ListaLineas label="Entregables" value={c.taller.entregables} onChange={(v) => setC({ ...c, taller: { ...c.taller!, entregables: v } })} />
                  </>
                )}
              </fieldset>
            </section>
          )}

          {leccion && typeof sel === 'number' && (
            <>
              <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h2 className="text-lg font-bold text-primary">Lección {sel + 1}</h2>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setVista((v) => !v)} aria-pressed={vista} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${vista ? 'bg-primary text-white' : 'border border-gray-300 text-gray-800 hover:bg-gray-50'}`}>
                      {vista ? <Pencil size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
                      {vista ? 'Editar' : 'Vista del alumno'}
                    </button>
                    <button type="button" onClick={() => eliminarLeccion(sel)} disabled={lecciones.length === 1} className="p-2 rounded-lg text-red-700 hover:bg-red-50 disabled:opacity-30" aria-label="Eliminar esta lección">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-[1fr_140px] gap-3">
                  <Campo label="Título de la lección" value={leccion.titulo} onChange={(v) => setLeccion({ ...leccion, titulo: v })} />
                  <Campo label="Duración (min)" type="number" value={String(leccion.minutos)} onChange={(v) => setLeccion({ ...leccion, minutos: Math.max(0, Number(v) || 0) })} />
                </div>
              </section>

              {vista ? (
                <section aria-label="Vista previa" className="bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6">
                  {leccion.bloques.length ? <ListaBloques bloques={leccion.bloques} /> : <p className="text-gray-600">Esta lección aún no tiene contenido.</p>}
                </section>
              ) : (
                <>
                  <ol className="space-y-3" aria-label="Bloques de contenido">
                    {leccion.bloques.map((b, i) => {
                      const info = INFO_BLOQUE[b.tipo];
                      const open = abierto === i;
                      const texto = resumen(b) || '(vacío)';
                      return (
                        <li key={i} className={`bg-white rounded-2xl border ${open ? 'border-primary shadow-md' : 'border-gray-200'}`}>
                          <div className="flex items-center gap-2 p-3">
                            <span className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0" aria-hidden="true">{info.icon}</span>
                            <button type="button" onClick={() => setAbierto(open ? null : i)} aria-expanded={open} className="flex-1 min-w-0 text-left rounded-lg px-1">
                              <span className="block text-xs font-semibold text-gray-600">{info.label}</span>
                              <span className="block text-sm text-gray-900 truncate">{texto}</span>
                            </button>
                            <button type="button" onClick={() => moverBloque(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30" aria-label={`Subir bloque ${i + 1}`}><ArrowUp size={16} /></button>
                            <button type="button" onClick={() => moverBloque(i, 1)} disabled={i === leccion.bloques.length - 1} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30" aria-label={`Bajar bloque ${i + 1}`}><ArrowDown size={16} /></button>
                            <button type="button" onClick={() => { setBloques(leccion.bloques.filter((_, j) => j !== i)); setAbierto(null); }} className="p-1.5 rounded-lg text-red-700 hover:bg-red-50" aria-label={`Eliminar bloque ${i + 1}: ${info.label}`}><Trash2 size={16} /></button>
                          </div>
                          {open && (
                            <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                              <div className="pt-3">
                                <EditorBloque bloque={b} onError={(m) => toast(m, 'error')} onChange={(nb) => setBloques(leccion.bloques.map((x, j) => (j === i ? nb : x)))} />
                              </div>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>

                  <div className="relative">
                    <button type="button" onClick={() => setMenuBloque((v) => !v)} aria-expanded={menuBloque} aria-controls="menu-bloques" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary">
                      <Plus size={18} aria-hidden="true" /> Agregar bloque
                    </button>
                    {menuBloque && (
                      <div id="menu-bloques" className="mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2">Básicos</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {SIMPLES.map((t) => (
                            <button key={t} type="button" onClick={() => agregarBloque(t)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 hover:border-primary hover:bg-primary/5">
                              <span className="text-primary" aria-hidden="true">{INFO_BLOQUE[t].icon}</span>{INFO_BLOQUE[t].label}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 mt-4 mb-2">Avanzados (edición en formato JSON)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {AVANZADOS.map((t) => (
                            <button key={t} type="button" onClick={() => agregarBloque(t)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 hover:border-primary hover:bg-primary/5">
                              <span className="text-primary" aria-hidden="true">{INFO_BLOQUE[t].icon}</span>{INFO_BLOQUE[t].label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Barra de guardado */}
      <div className="fixed bottom-0 right-0 left-0 md:left-64 z-30 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-700 flex items-center gap-2" role="status">
            {sinGuardar && <AlertTriangle size={16} className="text-amber-600" aria-hidden="true" />}
            {sinGuardar ? 'Cambios sin publicar' : 'Los alumnos ven la versión actual'}
          </p>
          <button type="button" onClick={guardar} disabled={!sinGuardar || guardando} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover disabled:opacity-50">
            {guardando ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}
            Guardar y publicar
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!confirmar}
        onClose={() => setConfirmar(null)}
        onConfirm={() => { confirmar?.accion(); setConfirmar(null); }}
        title={confirmar?.titulo ?? ''}
        message={confirmar?.mensaje ?? ''}
        confirmLabel="Continuar"
      />
    </div>
  );
}
