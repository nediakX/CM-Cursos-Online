import React, { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ArrowDown, ArrowUp, CheckCircle2, ExternalLink, Eye, EyeOff, Loader2, RotateCcw, Save,
} from 'lucide-react';
import { useSitio, aplicarColores } from '../../context/SiteContext';
import { useToast } from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { guardarSitio, restaurarSitio } from '../../services/api';
import { pendientesSitio } from '../../data/sitio';
import { ICONOS_DISPONIBLES, Icono } from '../../components/landing/iconos';
import { Area, Campo, CampoImagen, EditorLista, Interruptor, ListaLineas, Selector, contraste } from '../../components/admin/Campos';
import type { ItemIcono, SeccionLandingId, SiteConfig } from '../../types';

type TabId = 'marca' | 'portada' | 'secciones' | 'contenido' | 'personas' | 'precios' | 'faq' | 'contacto' | 'seo';

const TABS: { id: TabId; label: string }[] = [
  { id: 'marca', label: 'Marca y colores' },
  { id: 'portada', label: 'Portada' },
  { id: 'secciones', label: 'Secciones' },
  { id: 'contenido', label: 'Beneficios y pasos' },
  { id: 'personas', label: 'Instructor y testimonios' },
  { id: 'precios', label: 'Precios' },
  { id: 'faq', label: 'Preguntas frecuentes' },
  { id: 'contacto', label: 'Inscripción y contacto' },
  { id: 'seo', label: 'Buscadores (SEO)' },
];

const NOMBRE_SECCION: Record<SeccionLandingId, string> = {
  beneficios: 'Beneficios',
  temario: 'Temario (se genera desde los módulos del curso)',
  metodologia: 'Cómo funciona',
  instructor: 'Quién te enseña',
  testimonios: 'Testimonios',
  precios: 'Precios',
  faq: 'Preguntas frecuentes',
  inscripcion: 'Formulario de inscripción',
};

const Panel: React.FC<{ titulo: string; descripcion?: string; children: React.ReactNode }> = ({ titulo, descripcion, children }) => (
  <section className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
    <h2 className="text-base font-bold text-primary">{titulo}</h2>
    {descripcion && <p className="text-sm text-gray-600 mt-1">{descripcion}</p>}
    <div className="mt-5 space-y-4">{children}</div>
  </section>
);

/** Quita líneas vacías de las listas de texto antes de guardar. */
function limpiar(s: SiteConfig): SiteConfig {
  const l = (xs: string[]) => xs.map((x) => x.trim()).filter(Boolean);
  return {
    ...s,
    hero: { ...s.hero, puntos: l(s.hero.puntos) },
    instructor: { ...s.instructor, credenciales: l(s.instructor.credenciales) },
    planes: s.planes.map((p) => ({ ...p, caracteristicas: l(p.caracteristicas) })),
  };
}

function ColorCampo({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = React.useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">{label}</label>
      <div className="mt-1 flex gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer p-1 bg-white" aria-label={`${label} (selector)`} />
        <input id={id} value={value} onChange={(e) => onChange(e.target.value)} pattern="#[0-9a-fA-F]{6}" className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
    </div>
  );
}

function Contraste({ a, b, texto }: { a: string; b: string; texto: string }) {
  const r = contraste(a, b);
  const ok = r >= 4.5;
  return (
    <li className="flex items-center gap-3 text-sm">
      <span className="w-20 h-9 rounded-lg flex items-center justify-center font-bold text-xs border border-gray-200" style={{ background: b, color: a }} aria-hidden="true">
        Aa
      </span>
      <span className="flex-1 text-gray-700">{texto}</span>
      <span className={`inline-flex items-center gap-1 font-semibold ${ok ? 'text-emerald-700' : 'text-red-700'}`}>
        {ok ? <CheckCircle2 size={16} aria-hidden="true" /> : <AlertTriangle size={16} aria-hidden="true" />}
        {r.toFixed(1)}:1 {ok ? 'legible' : 'poco legible'}
      </span>
    </li>
  );
}

function EditorItemsIcono({ items, onChange, titulo }: { items: ItemIcono[]; onChange: (v: ItemIcono[]) => void; titulo: string }) {
  return (
    <EditorLista
      items={items}
      onChange={onChange}
      titulo={titulo}
      nuevo={() => ({ icono: 'Zap', titulo: '', texto: '' })}
      etiqueta={(it, i) => it.titulo || `${titulo} ${i + 1}`}
      render={(it, set) => (
        <div className="grid sm:grid-cols-[180px_1fr] gap-3">
          <div>
            <Selector label="Ícono" value={it.icono} onChange={(v) => set({ ...it, icono: v })} opciones={ICONOS_DISPONIBLES.map((x) => ({ value: x, label: x }))} />
            <span className="mt-2 w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><Icono nombre={it.icono} size={20} /></span>
          </div>
          <div className="space-y-3">
            <Campo label="Título" value={it.titulo} onChange={(v) => set({ ...it, titulo: v })} />
            <Area label="Texto" rows={2} value={it.texto} onChange={(v) => set({ ...it, texto: v })} />
          </div>
        </div>
      )}
    />
  );
}

export default function AdminSite() {
  const { sitio, setSitio } = useSitio();
  const { toast } = useToast();
  const [draft, setDraft] = useState<SiteConfig>(sitio);
  const [tab, setTab] = useState<TabId>('marca');
  const [guardando, setGuardando] = useState(false);
  const [confirmarReset, setConfirmarReset] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const guardadoRef = useRef(sitio);

  useEffect(() => {
    setDraft(sitio);
    guardadoRef.current = sitio;
  }, [sitio]);

  // Vista previa en vivo de los colores; al salir sin guardar se restauran.
  useEffect(() => {
    aplicarColores(draft.marca.colorPrimario, draft.marca.colorAcento);
  }, [draft.marca.colorPrimario, draft.marca.colorAcento]);
  useEffect(() => () => aplicarColores(guardadoRef.current.marca.colorPrimario, guardadoRef.current.marca.colorAcento), []);

  const sinGuardar = JSON.stringify(draft) !== JSON.stringify(sitio);

  useEffect(() => {
    if (!sinGuardar) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [sinGuardar]);

  const upd = <K extends keyof SiteConfig>(k: K, v: Partial<SiteConfig[K]> | SiteConfig[K]) =>
    setDraft((d) => ({ ...d, [k]: Array.isArray(v) ? v : typeof v === 'object' && v !== null ? { ...(d[k] as object), ...v } : v }));

  const guardar = async () => {
    setGuardando(true);
    try {
      const s = await guardarSitio(limpiar(draft));
      setSitio(s);
      toast('Cambios publicados en el sitio', 'success');
    } catch (e) {
      toast(e instanceof Error && e.message === 'ALMACENAMIENTO_LLENO' ? 'No hay espacio: usa imágenes más livianas o enlaces (URL).' : 'No se pudieron guardar los cambios', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const restaurar = async () => {
    try {
      const s = await restaurarSitio();
      setSitio(s);
      toast('Se restauraron los valores iniciales', 'success');
    } catch {
      toast('No se pudo restaurar', 'error');
    }
    setConfirmarReset(false);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    let j = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % TABS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') j = 0;
    else if (e.key === 'End') j = TABS.length - 1;
    else return;
    e.preventDefault();
    setTab(TABS[j].id);
    tabsRef.current[j]?.focus();
  };

  const pendientes = pendientesSitio(draft);
  const error = (m: string) => toast(m, 'error');
  const sec = draft.secciones;
  const moverSeccion = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= sec.length) return;
    const a = [...sec];
    [a[i], a[j]] = [a[j], a[i]];
    upd('secciones', a);
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl">
      {/* Encabezado + barra de acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Sitio web</h1>
          <p className="text-sm text-gray-600 mt-1">Edita la página de venta del curso, tu marca y los datos de contacto.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50">
            <ExternalLink size={16} aria-hidden="true" /> Ver sitio<span className="sr-only"> (pestaña nueva)</span>
          </a>
          <button type="button" onClick={() => setConfirmarReset(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50">
            <RotateCcw size={16} aria-hidden="true" /> Restaurar
          </button>
        </div>
      </div>

      {pendientes.length > 0 && (
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-4">
          <p className="font-semibold text-amber-900 flex items-center gap-2"><AlertTriangle size={18} aria-hidden="true" /> Antes de compartir tu sitio</p>
          <ul className="mt-2 ml-7 list-disc text-sm text-amber-900 space-y-0.5">
            {pendientes.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      )}

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <div role="tablist" aria-label="Secciones del editor" aria-orientation="vertical" className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { tabsRef.current[i] = el; }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`text-left whitespace-nowrap px-3 py-2.5 rounded-xl text-sm font-medium ${tab === t.id ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} tabIndex={0} className="space-y-6 min-w-0 outline-none pb-24">
          {tab === 'marca' && (
            <>
              <Panel titulo="Identidad" descripcion="Aparece en la cabecera del sitio, en el aula, en el inicio de sesión y en los certificados.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Campo label="Nombre de la marca" value={draft.marca.nombre} onChange={(v) => upd('marca', { nombre: v })} />
                  <Campo label="Subtítulo" value={draft.marca.subtitulo} onChange={(v) => upd('marca', { subtitulo: v })} />
                </div>
                <CampoImagen label="Logo" value={draft.marca.logoUrl} onChange={(v) => upd('marca', { logoUrl: v })} onError={error} ayuda="Imagen cuadrada, idealmente PNG o SVG con fondo transparente. Si no subes uno, se usa el ícono de rayo." />
              </Panel>
              <Panel titulo="Colores" descripcion="Se aplican a toda la plataforma. Verás el cambio al instante; se publica al guardar.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <ColorCampo label="Color principal" value={draft.marca.colorPrimario} onChange={(v) => upd('marca', { colorPrimario: v })} />
                  <ColorCampo label="Color de acento" value={draft.marca.colorAcento} onChange={(v) => upd('marca', { colorAcento: v })} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-2">Revisión de legibilidad (mínimo recomendado 4.5:1)</p>
                  <ul className="space-y-2">
                    <Contraste a="#ffffff" b={draft.marca.colorPrimario} texto="Texto blanco sobre el color principal" />
                    <Contraste a={draft.marca.colorPrimario} b={draft.marca.colorAcento} texto="Texto principal sobre botones de acento" />
                    <Contraste a={draft.marca.colorPrimario} b="#ffffff" texto="Títulos sobre fondo blanco" />
                  </ul>
                </div>
              </Panel>
            </>
          )}

          {tab === 'portada' && (
            <>
              <Panel titulo="Barra de anuncio" descripcion="Franja superior para promociones o fechas de inicio.">
                <Interruptor label="Mostrar barra de anuncio" checked={draft.anuncio.activo} onChange={(v) => upd('anuncio', { activo: v })} />
                <Campo label="Texto" value={draft.anuncio.texto} onChange={(v) => upd('anuncio', { texto: v })} />
                <Campo label="Enlace (opcional)" value={draft.anuncio.enlace ?? ''} onChange={(v) => upd('anuncio', { enlace: v })} ayuda="Usa #inscripcion o #precios para llevar a una sección, o una dirección completa." />
              </Panel>
              <Panel titulo="Portada principal">
                <Campo label="Etiqueta superior" value={draft.hero.etiqueta} onChange={(v) => upd('hero', { etiqueta: v })} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Campo label="Título" value={draft.hero.titulo} onChange={(v) => upd('hero', { titulo: v })} />
                  <Campo label="Parte destacada del título" value={draft.hero.tituloDestacado} onChange={(v) => upd('hero', { tituloDestacado: v })} ayuda="Se muestra en color de acento." />
                </div>
                <Area label="Bajada" rows={3} value={draft.hero.subtitulo} onChange={(v) => upd('hero', { subtitulo: v })} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Campo label="Botón principal" value={draft.hero.ctaPrincipal} onChange={(v) => upd('hero', { ctaPrincipal: v })} />
                  <Campo label="Botón secundario" value={draft.hero.ctaSecundario} onChange={(v) => upd('hero', { ctaSecundario: v })} ayuda="Lleva al temario. Déjalo vacío para ocultarlo." />
                </div>
                <ListaLineas label="Puntos destacados" value={draft.hero.puntos} onChange={(v) => upd('hero', { puntos: v })} />
                <CampoImagen label="Imagen de portada (opcional)" value={draft.hero.imagenUrl} onChange={(v) => upd('hero', { imagenUrl: v })} onError={error} ayuda="Si la dejas vacía se muestra una vista de la plataforma." />
              </Panel>
              <Panel titulo="Cifras" descripcion="Franja de números bajo la portada.">
                <EditorLista
                  items={draft.hero.estadisticas}
                  onChange={(v) => upd('hero', { estadisticas: v })}
                  titulo="cifra"
                  max={4}
                  nuevo={() => ({ valor: '', etiqueta: '' })}
                  etiqueta={(e, i) => e.valor ? `${e.valor} ${e.etiqueta}` : `Cifra ${i + 1}`}
                  render={(e, set) => (
                    <div className="grid grid-cols-2 gap-3">
                      <Campo label="Valor" value={e.valor} onChange={(v) => set({ ...e, valor: v })} />
                      <Campo label="Descripción" value={e.etiqueta} onChange={(v) => set({ ...e, etiqueta: v })} />
                    </div>
                  )}
                />
              </Panel>
            </>
          )}

          {tab === 'secciones' && (
            <Panel titulo="Orden y visibilidad" descripcion="Muestra u oculta secciones, cambia su orden y sus títulos.">
              <ol className="space-y-3">
                {sec.map((s, i) => (
                  <li key={s.id} className={`rounded-2xl border p-4 ${s.visible ? 'border-gray-200 bg-white' : 'border-dashed border-gray-300 bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                      <p className="flex-1 font-semibold text-gray-900 text-sm">{NOMBRE_SECCION[s.id]}</p>
                      <button type="button" onClick={() => upd('secciones', sec.map((x) => (x.id === s.id ? { ...x, visible: !x.visible } : x)))} className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${s.visible ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-200 text-gray-700'}`} aria-pressed={s.visible}>
                        {s.visible ? <Eye size={14} aria-hidden="true" /> : <EyeOff size={14} aria-hidden="true" />}
                        {s.visible ? 'Visible' : 'Oculta'}
                        <span className="sr-only">: {NOMBRE_SECCION[s.id]}</span>
                      </button>
                      <button type="button" onClick={() => moverSeccion(i, -1)} disabled={i === 0} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30" aria-label={`Subir ${NOMBRE_SECCION[s.id]}`}><ArrowUp size={16} /></button>
                      <button type="button" onClick={() => moverSeccion(i, 1)} disabled={i === sec.length - 1} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30" aria-label={`Bajar ${NOMBRE_SECCION[s.id]}`}><ArrowDown size={16} /></button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Campo label="Título" value={s.titulo} onChange={(v) => upd('secciones', sec.map((x) => (x.id === s.id ? { ...x, titulo: v } : x)))} />
                      <Campo label="Subtítulo" value={s.subtitulo} onChange={(v) => upd('secciones', sec.map((x) => (x.id === s.id ? { ...x, subtitulo: v } : x)))} />
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          )}

          {tab === 'contenido' && (
            <>
              <Panel titulo="Beneficios"><EditorItemsIcono items={draft.beneficios} onChange={(v) => upd('beneficios', v)} titulo="beneficio" /></Panel>
              <Panel titulo="Cómo funciona (pasos)"><EditorItemsIcono items={draft.metodologia} onChange={(v) => upd('metodologia', v)} titulo="paso" /></Panel>
            </>
          )}

          {tab === 'personas' && (
            <>
              <Panel titulo="Quién te enseña" descripcion="Recuerda activar la sección en la pestaña Secciones cuando esté lista.">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Campo label="Nombre" value={draft.instructor.nombre} onChange={(v) => upd('instructor', { nombre: v })} />
                  <Campo label="Cargo o especialidad" value={draft.instructor.cargo} onChange={(v) => upd('instructor', { cargo: v })} />
                </div>
                <Area label="Biografía" rows={5} value={draft.instructor.bio} onChange={(v) => upd('instructor', { bio: v })} />
                <ListaLineas label="Credenciales" value={draft.instructor.credenciales} onChange={(v) => upd('instructor', { credenciales: v })} />
                <CampoImagen label="Fotografía" value={draft.instructor.fotoUrl} onChange={(v) => upd('instructor', { fotoUrl: v })} onError={error} />
              </Panel>
              <Panel titulo="Testimonios" descripcion="Publica sólo testimonios reales y con autorización de la persona.">
                <EditorLista
                  items={draft.testimonios}
                  onChange={(v) => upd('testimonios', v)}
                  titulo="testimonio"
                  nuevo={() => ({ nombre: '', cargo: '', texto: '', fotoUrl: '' })}
                  etiqueta={(t, i) => t.nombre || `Testimonio ${i + 1}`}
                  render={(t, set) => (
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Campo label="Nombre" value={t.nombre} onChange={(v) => set({ ...t, nombre: v })} />
                        <Campo label="Cargo / ciudad" value={t.cargo} onChange={(v) => set({ ...t, cargo: v })} />
                      </div>
                      <Area label="Testimonio" value={t.texto} onChange={(v) => set({ ...t, texto: v })} />
                      <CampoImagen label="Foto (opcional)" value={t.fotoUrl ?? ''} onChange={(v) => set({ ...t, fotoUrl: v })} onError={error} />
                    </div>
                  )}
                />
              </Panel>
            </>
          )}

          {tab === 'precios' && (
            <>
              <Panel titulo="Planes" descripcion="Si agregas un link de pago (Webpay, Mercado Pago, Flow, etc.) el botón lleva directo al pago. Si lo dejas vacío, abre el formulario de inscripción.">
                <EditorLista
                  items={draft.planes}
                  onChange={(v) => upd('planes', v)}
                  titulo="plan"
                  max={3}
                  nuevo={() => ({ id: `plan-${Date.now().toString(36)}`, nombre: '', precio: '', precioAnterior: '', periodo: '', descripcion: '', caracteristicas: [], destacado: false, textoBoton: 'Inscribirme', urlPago: '' })}
                  etiqueta={(p, i) => p.nombre || `Plan ${i + 1}`}
                  render={(p, set) => (
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <Campo label="Nombre del plan" value={p.nombre} onChange={(v) => set({ ...p, nombre: v })} />
                        <Campo label="Texto del botón" value={p.textoBoton} onChange={(v) => set({ ...p, textoBoton: v })} />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Campo label="Precio" value={p.precio} placeholder="$249.000" onChange={(v) => set({ ...p, precio: v })} />
                        <Campo label="Precio anterior (tachado)" value={p.precioAnterior ?? ''} onChange={(v) => set({ ...p, precioAnterior: v })} />
                        <Campo label="Condición" value={p.periodo ?? ''} placeholder="pago único" onChange={(v) => set({ ...p, periodo: v })} />
                      </div>
                      <Area label="Descripción" rows={2} value={p.descripcion} onChange={(v) => set({ ...p, descripcion: v })} />
                      <ListaLineas label="Qué incluye" value={p.caracteristicas} onChange={(v) => set({ ...p, caracteristicas: v })} />
                      <Campo label="Link de pago (opcional)" type="url" value={p.urlPago ?? ''} placeholder="https://…" onChange={(v) => set({ ...p, urlPago: v })} />
                      <Interruptor label="Destacar como “Más elegido”" checked={p.destacado} onChange={(v) => set({ ...p, destacado: v })} />
                    </div>
                  )}
                />
              </Panel>
              <Panel titulo="Nota bajo los precios">
                <Area label="Texto de confianza / garantía" rows={2} value={draft.garantia} onChange={(v) => upd('garantia', v)} />
              </Panel>
            </>
          )}

          {tab === 'faq' && (
            <Panel titulo="Preguntas frecuentes">
              <EditorLista
                items={draft.faq}
                onChange={(v) => upd('faq', v)}
                titulo="pregunta"
                nuevo={() => ({ pregunta: '', respuesta: '' })}
                etiqueta={(f, i) => f.pregunta || `Pregunta ${i + 1}`}
                render={(f, set) => (
                  <div className="space-y-3">
                    <Campo label="Pregunta" value={f.pregunta} onChange={(v) => set({ ...f, pregunta: v })} />
                    <Area label="Respuesta" value={f.respuesta} onChange={(v) => set({ ...f, respuesta: v })} />
                  </div>
                )}
              />
            </Panel>
          )}

          {tab === 'contacto' && (
            <>
              <Panel titulo="Formulario de inscripción" descripcion="Las solicitudes llegan a Administración → Solicitudes.">
                <Campo label="Título" value={draft.inscripcion.titulo} onChange={(v) => upd('inscripcion', { titulo: v })} />
                <Area label="Texto" rows={2} value={draft.inscripcion.texto} onChange={(v) => upd('inscripcion', { texto: v })} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Campo label="Texto del botón" value={draft.inscripcion.textoBoton} onChange={(v) => upd('inscripcion', { textoBoton: v })} />
                  <Campo label="Mensaje al enviar" value={draft.inscripcion.mensajeExito} onChange={(v) => upd('inscripcion', { mensajeExito: v })} />
                </div>
                <Interruptor label="Pedir RUT (opcional para la persona)" checked={draft.inscripcion.pedirRut} onChange={(v) => upd('inscripcion', { pedirRut: v })} ayuda="Permite crear su cuenta de alumno con un clic." />
              </Panel>
              <Panel titulo="Datos de contacto">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Campo label="Correo" type="email" value={draft.contacto.email} onChange={(v) => upd('contacto', { email: v })} />
                  <Campo label="Teléfono" value={draft.contacto.telefono} onChange={(v) => upd('contacto', { telefono: v })} placeholder="+56 2 2345 6789" />
                  <Campo label="WhatsApp" value={draft.contacto.whatsapp} onChange={(v) => upd('contacto', { whatsapp: v.replace(/[^\d+]/g, '') })} placeholder="56912345678" ayuda="Con código de país, sin espacios." />
                  <Campo label="Horario de atención" value={draft.contacto.horario} onChange={(v) => upd('contacto', { horario: v })} />
                </div>
                <Campo label="Mensaje inicial de WhatsApp" value={draft.contacto.mensajeWhatsapp} onChange={(v) => upd('contacto', { mensajeWhatsapp: v })} />
                <Campo label="Dirección" value={draft.contacto.direccion} onChange={(v) => upd('contacto', { direccion: v })} />
                <Interruptor label="Mostrar botón flotante de WhatsApp" checked={draft.contacto.botonWhatsappFlotante} onChange={(v) => upd('contacto', { botonWhatsappFlotante: v })} />
              </Panel>
              <Panel titulo="Redes sociales" descripcion="Pega el enlace completo. Las que dejes vacías no se muestran.">
                <div className="grid sm:grid-cols-2 gap-4">
                  {(['facebook', 'instagram', 'linkedin', 'youtube', 'tiktok'] as const).map((r) => (
                    <Campo key={r} label={r.charAt(0).toUpperCase() + r.slice(1)} type="url" value={draft.redes[r]} placeholder="https://…" onChange={(v) => upd('redes', { [r]: v })} />
                  ))}
                </div>
                <Campo label="Texto del pie de página" value={draft.pie.texto} onChange={(v) => upd('pie', { texto: v })} />
              </Panel>
            </>
          )}

          {tab === 'seo' && (
            <Panel titulo="Cómo aparece en Google y redes" descripcion="Título y descripción de la página de inicio.">
              <Campo label="Título" value={draft.seo.titulo} onChange={(v) => upd('seo', { titulo: v })} ayuda={`${draft.seo.titulo.length}/60 caracteres recomendados`} />
              <Area label="Descripción" rows={3} value={draft.seo.descripcion} onChange={(v) => upd('seo', { descripcion: v })} ayuda={`${draft.seo.descripcion.length}/160 caracteres recomendados`} />
              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50" aria-label="Vista previa en buscadores">
                <p className="text-[#1a0dab] text-lg leading-snug truncate">{draft.seo.titulo}</p>
                <p className="text-sm text-[#006621]">{window.location.host}</p>
                <p className="text-sm text-gray-700 line-clamp-2">{draft.seo.descripcion}</p>
              </div>
            </Panel>
          )}
        </div>
      </div>

      {/* Barra fija de guardado */}
      <div className="fixed bottom-0 right-0 left-0 md:left-64 z-30 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-gray-700" role="status">
            {sinGuardar ? 'Tienes cambios sin publicar.' : 'Todo está publicado.'}
          </p>
          <button type="button" onClick={guardar} disabled={!sinGuardar || guardando} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover disabled:opacity-50">
            {guardando ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Save size={16} aria-hidden="true" />}
            Guardar y publicar
          </button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmarReset}
        onClose={() => setConfirmarReset(false)}
        onConfirm={restaurar}
        title="Restaurar sitio"
        message="Se perderán todos los textos, precios, colores e imágenes que hayas configurado. ¿Continuar?"
        confirmLabel="Restaurar"
        variant="danger"
      />
    </div>
  );
}
