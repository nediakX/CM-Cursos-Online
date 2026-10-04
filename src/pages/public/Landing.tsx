import React, { useEffect, useId, useRef, useState } from 'react';
import { iniciales } from '../../utils/iniciales';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, BadgeCheck, CheckCircle2, ChevronDown, Clock, Loader2, Mail, MapPin, Menu, Phone,
  PlayCircle, Quote, ShieldCheck, Sparkles, X,
  BookOpen,
} from 'lucide-react';
import { useSitio } from '../../context/SiteContext';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/BrandLogo';
import { Icono } from '../../components/landing/iconos';
import DiagramaUnilineal from '../../components/landing/DiagramaUnilineal';
import {
  IconoFacebook, IconoInstagram, IconoLinkedin, IconoTiktok, IconoWhatsapp, IconoYoutube, enlaceWhatsapp,
} from '../../components/landing/RedesIconos';
import { enviarSolicitud, getCursoPublico } from '../../services/api';
import { formatearRut, limpiarRut, validarRut } from '../../utils/rut';
import type { Curso, SeccionLandingId, SiteConfig } from '../../types';

// ─── Utilidades ────────────────────────────────────────────────────────────────
const Contenedor: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>
);

function EncabezadoSeccion({ titulo, subtitulo, id, claro = false, centrado = false }: { titulo: string; subtitulo?: string; id: string; claro?: boolean; centrado?: boolean }) {
  return (
    <div className={`max-w-2xl mb-12 ${centrado ? 'mx-auto text-center' : ''}`}>
      <h2 id={id} className={`display-sm text-3xl sm:text-[2.6rem] leading-[1.08] text-balance ${claro ? 'text-white' : 'text-primary'}`}>
        {titulo}
      </h2>
      {subtitulo && <p className={`mt-4 text-lg leading-relaxed ${claro ? 'text-white/80' : 'text-slate-600'}`}>{subtitulo}</p>}
    </div>
  );
}

/** true cuando el usuario pidió reducir el movimiento. */
const sinMovimiento = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Cifra que cuenta desde 0 al cargar la página ("240 h", "590+", "10"). */
function Cifra({ valor }: { valor: string }) {
  const m = valor.match(/^(\D*)(\d[\d.]*)(.*)$/);
  const objetivo = m ? Number(m[2].replace(/\./g, '')) : NaN;
  const [n, setN] = useState(() => (sinMovimiento() || Number.isNaN(objetivo) ? objetivo : 0));
  useEffect(() => {
    if (Number.isNaN(objetivo) || sinMovimiento()) return;
    let raf = 0;
    const inicio = performance.now() + 900; // empieza cuando el diagrama ya se dibujó
    const dur = 1300;
    const paso = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - inicio) / dur));
      setN(Math.round(objetivo * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [objetivo]);
  if (!m || Number.isNaN(objetivo)) return <>{valor}</>;
  return (
    <>
      <span className="sr-only">{valor}</span>
      <span aria-hidden="true">
        {m[1]}
        {n.toLocaleString('es-CL')}
        {m[3]}
      </span>
    </>
  );
}

const usarSeo = (sitio: SiteConfig) => {
  useEffect(() => {
    const anterior = document.title;
    document.title = sitio.seo.titulo || sitio.marca.nombre;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = sitio.seo.descripcion;
    return () => {
      document.title = anterior;
    };
  }, [sitio.seo.titulo, sitio.seo.descripcion, sitio.marca.nombre]);
};

const irA = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  // Mueve el foco a la sección para lectores de pantalla y teclado.
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
};

// ─── Cabecera ─────────────────────────────────────────────────────────────────
function Cabecera({ visibles }: { visibles: Set<SeccionLandingId> }) {
  const { sitio } = useSitio();
  const { user } = useAuth();
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAbierto(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [abierto]);

  const enlaces: { id: SeccionLandingId; label: string }[] = (
    [
      { id: 'beneficios', label: 'Beneficios' },
      { id: 'temario', label: 'Temario' },
      { id: 'metodologia', label: 'Cómo funciona' },
      { id: 'precios', label: 'Precios' },
      { id: 'faq', label: 'Preguntas' },
    ] as const
  ).filter((e) => visibles.has(e.id));

  const aula = user ? (user.rol === 'admin' ? '/admin' : '/app') : '/login';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur border-b transition-colors ${scrolled ? 'bg-primary/90 border-white/10 shadow-lg' : 'bg-primary border-transparent'}`}>
      <Contenedor className="flex items-center justify-between h-16 gap-4">
        <Link to="/" aria-label={`${sitio.marca.nombre}, inicio`} className="rounded-lg">
          <BrandLogo tono="dark" />
        </Link>

        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {enlaces.map((e) => (
              <li key={e.id}>
                <a href={`#${e.id}`} onClick={(ev) => { ev.preventDefault(); irA(e.id); }} className="px-3 py-2 rounded-lg text-sm font-medium text-white/85 hover:text-white hover:bg-white/10">
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden sm:flex items-center gap-2">
          <Link to={aula} className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:bg-white/10">
            {user ? 'Ir a mi aula' : 'Ingresar'}
          </Link>
          {visibles.has('inscripcion') && (
            <a href="#inscripcion" onClick={(ev) => { ev.preventDefault(); irA('inscripcion'); }} className="px-5 py-2 rounded-full text-sm font-bold bg-accent text-primary hover:bg-accent-hover">
              Inscríbete
            </a>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -mr-2 rounded-lg text-white hover:bg-white/10"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Contenedor>

      {abierto && (
        <div id="menu-movil" className="lg:hidden border-t border-white/10 bg-primary">
          <Contenedor className="py-4 flex flex-col gap-1">
            {enlaces.map((e) => (
              <a key={e.id} href={`#${e.id}`} onClick={(ev) => { ev.preventDefault(); setAbierto(false); irA(e.id); }} className="px-3 py-3 rounded-lg text-base font-medium text-white hover:bg-white/10">
                {e.label}
              </a>
            ))}
            <div className="sm:hidden grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-white/10">
              <Link to={aula} className="text-center px-4 py-3 rounded-xl text-sm font-semibold text-white border border-white/30">
                {user ? 'Mi aula' : 'Ingresar'}
              </Link>
              <a href="#inscripcion" onClick={(ev) => { ev.preventDefault(); setAbierto(false); irA('inscripcion'); }} className="text-center px-4 py-3 rounded-xl text-sm font-bold bg-accent text-primary">
                Inscríbete
              </a>
            </div>
          </Contenedor>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ mostrarInscripcion, mostrarTemario }: { mostrarInscripcion: boolean; mostrarTemario: boolean }) {
  const { sitio } = useSitio();
  const h = sitio.hero;
  return (
    <section aria-labelledby="hero-titulo" className="relative overflow-hidden bg-primary text-white">
      <div className="plano absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(60% 50% at 78% 45%, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)' }}
        aria-hidden="true"
      />

      <Contenedor className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-center pt-12 pb-10 sm:pt-16 lg:pb-12">
        <div className="entrada min-w-0">
          {h.etiqueta && <p className="text-accent font-semibold text-base">{h.etiqueta}</p>}
          <h1 id="hero-titulo" className="display mt-4 text-[2.4rem] sm:text-[3.4rem] lg:text-[3.6rem] text-balance">
            {h.titulo}
            {h.tituloDestacado && <span className="block mt-2 text-white/70">{h.tituloDestacado}</span>}
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">{h.subtitulo}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {mostrarInscripcion && (
              <a
                href="#inscripcion"
                onClick={(e) => {
                  e.preventDefault();
                  irA('inscripcion');
                }}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-accent text-primary font-bold text-base hover:bg-accent-hover shadow-[0_10px_30px_-10px_var(--color-accent)]"
              >
                {h.ctaPrincipal}
              </a>
            )}
            {mostrarTemario && h.ctaSecundario && (
              <a
                href="#temario"
                onClick={(e) => {
                  e.preventDefault();
                  irA('temario');
                }}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/30 text-white font-semibold text-base hover:bg-white/10"
              >
                {h.ctaSecundario}
              </a>
            )}
          </div>

          {h.puntos.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
              {h.puntos.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                  <CheckCircle2 size={18} className="text-accent shrink-0 mt-px" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="min-w-0 w-full max-w-xl mx-auto lg:max-w-none">
          {h.imagenUrl ? <img src={h.imagenUrl} alt="" className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3]" /> : <DiagramaUnilineal />}
        </div>
      </Contenedor>

      {h.estadisticas.length > 0 && (
        <div className="relative border-t border-white/10">
          <Contenedor>
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {h.estadisticas.map((e, i) => (
                <div
                  key={i}
                  className={`py-7 flex flex-col-reverse ${i % 2 === 1 ? 'pl-6 border-l border-white/10' : 'md:pl-6'} ${i >= 2 ? 'border-t border-white/10 md:border-t-0' : ''} ${i > 0 ? 'md:border-l md:border-white/10' : 'md:pl-0'}`}
                >
                  <dt className="text-sm text-white/70 mt-1">{e.etiqueta}</dt>
                  <dd className="display text-4xl sm:text-5xl text-accent tabular-nums">
                    <Cifra valor={e.valor} />
                  </dd>
                </div>
              ))}
            </dl>
          </Contenedor>
        </div>
      )}
    </section>
  );
}

// ─── Secciones ────────────────────────────────────────────────────────────────
type Sec = SiteConfig['secciones'][number];

function Beneficios({ sec }: { sec: Sec }) {
  const { sitio } = useSitio();
  return (
    <section id="beneficios" aria-labelledby="t-beneficios" className="py-20 sm:py-28 bg-white scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-beneficios" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-t border-slate-200">
          {sitio.beneficios.map((b, i) => (
            <li key={i} className="flex gap-4 py-8 border-b border-slate-200">
              <span className="w-11 h-11 rounded-full bg-primary text-accent flex items-center justify-center shrink-0">
                <Icono nombre={b.icono} size={20} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-primary">{b.titulo}</h3>
                <p className="mt-1.5 text-slate-600 leading-relaxed">{b.texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}

/** Progreso (0 a 1) del scroll a través de un elemento, para "energizar" el cable del temario. */
function useProgresoScroll<T extends HTMLElement>(listo: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (sinMovimiento()) {
      el.style.setProperty('--progreso', '1');
      return;
    }
    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      el.style.setProperty('--progreso', p.toFixed(3));
      el.querySelectorAll<HTMLElement>('[data-nodo]').forEach((n) => {
        n.classList.toggle('nodo-on', n.getBoundingClientRect().top < vh * 0.6);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [listo]);
  return ref;
}

function Temario({ sec, curso }: { sec: Sec; curso: Curso | null }) {
  const cable = useProgresoScroll<HTMLOListElement>(!!curso);
  if (!curso) return null;
  const lecciones = curso.modulos.reduce((n, m) => n + m.lecciones.length, 0);
  return (
    <section id="temario" aria-labelledby="t-temario" className="py-20 sm:py-28 bg-slate-50 scroll-mt-16 outline-none">
      <Contenedor className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <div className="lg:sticky lg:top-28 self-start">
          <EncabezadoSeccion id="t-temario" titulo={sec.titulo} subtitulo={sec.subtitulo} />
          <dl className="grid grid-cols-3 gap-4 -mt-4 max-w-sm">
            {[
              { v: `${curso.horasTotales}`, e: 'horas' },
              { v: `${curso.modulos.length}`, e: 'módulos' },
              { v: `${lecciones}`, e: 'lecciones' },
            ].map((x) => (
              <div key={x.e} className="flex flex-col-reverse">
                <dt className="text-sm text-slate-600">{x.e}</dt>
                <dd className="display text-3xl text-primary">{x.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ol ref={cable} className="cable-temario relative space-y-3">
          {/* Cable que se energiza al bajar */}
          <span className="absolute left-[21px] top-6 bottom-6 w-[3px] rounded bg-slate-200" aria-hidden="true">
            <span className="relleno absolute inset-0 rounded bg-accent transition-transform duration-150" />
          </span>
          {curso.modulos.map((m) => (
            <li key={m.id} className="relative">
              <details className="group pl-14">
                <summary className="flex items-center gap-4 py-3 pr-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded-xl">
                  <span
                    data-nodo
                    className="absolute left-0 top-2.5 w-[45px] h-[45px] rounded-full border-2 border-slate-300 bg-white text-primary font-extrabold flex items-center justify-center transition-colors duration-300"
                    aria-hidden="true"
                  >
                    {m.orden}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="sr-only">Módulo {m.orden}: </span>
                    <span className="block font-bold text-lg text-primary leading-snug">{m.nombre}</span>
                    <span className="block text-sm text-slate-600 mt-0.5">
                      {m.lecciones.length} lecciones{m.horas ? `, ${m.horas} horas` : ''}
                    </span>
                  </span>
                  <ChevronDown size={20} className="text-slate-500 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="pb-5 pr-3">
                  {m.objetivo && <p className="text-slate-700 mb-3 leading-relaxed">{m.objetivo}</p>}
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {m.lecciones.map((l) => (
                      <li key={l.id} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        {l.titulo}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Contenedor>
    </section>
  );
}

function Metodologia({ sec }: { sec: Sec }) {
  const { sitio } = useSitio();
  const n = sitio.metodologia.length;
  return (
    <section id="metodologia" aria-labelledby="t-metodologia" className="py-20 sm:py-28 bg-white scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-metodologia" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <ol className={`relative grid gap-10 sm:grid-cols-2 ${n >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {/* Conductor que une los pasos */}
          <span className="hidden lg:block absolute top-7 left-7 right-7 h-[2px] bg-gradient-to-r from-accent via-accent/50 to-slate-200" aria-hidden="true" />
          {sitio.metodologia.map((p, i) => (
            <li key={i} className="relative">
              <span className="relative w-14 h-14 rounded-full bg-primary text-accent flex items-center justify-center ring-8 ring-white">
                <Icono nombre={p.icono} size={24} />
              </span>
              <p className="mt-5 text-sm font-semibold text-accent-ink">Paso {i + 1}</p>
              <h3 className="mt-1 text-xl font-bold text-primary">{p.titulo}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Contenedor>
    </section>
  );
}

function Instructor({ sec }: { sec: Sec }) {
  const { sitio } = useSitio();
  const ins = sitio.instructor;
  const ini = iniciales(ins.nombre);
  return (
    <section id="instructor" aria-labelledby="t-instructor" className="py-20 sm:py-28 bg-slate-50 scroll-mt-16 outline-none">
      <Contenedor className="max-w-5xl">
        <EncabezadoSeccion id="t-instructor" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <div className="grid md:grid-cols-[280px_1fr] gap-10 items-center">
          {ins.fotoUrl ? (
            <img src={ins.fotoUrl} alt={`Fotografía de ${ins.nombre}`} className="w-full aspect-square object-cover rounded-[2rem]" />
          ) : (
            <div className="plano w-full aspect-square rounded-[2rem] bg-primary flex items-center justify-center text-7xl display text-accent" aria-hidden="true">
              {ini}
            </div>
          )}
          <div>
            <h3 className="display-sm text-3xl text-primary">{ins.nombre}</h3>
            <p className="text-accent-ink font-semibold mt-1">{ins.cargo}</p>
            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">{ins.bio}</p>
            {ins.credenciales.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {ins.credenciales.map((c, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 text-primary px-3 py-1.5 text-sm font-medium">
                    <ShieldCheck size={16} aria-hidden="true" /> {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Contenedor>
    </section>
  );
}

function Testimonios({ sec }: { sec: Sec }) {
  const { sitio } = useSitio();
  return (
    <section id="testimonios" aria-labelledby="t-testimonios" className="py-20 sm:py-24 bg-primary scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-testimonios" titulo={sec.titulo} subtitulo={sec.subtitulo} claro />
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sitio.testimonios.map((t, i) => (
            <li key={i}>
              <figure className="h-full bg-white rounded-2xl p-6 flex flex-col">
                <Quote size={28} className="text-accent" aria-hidden="true" />
                <blockquote className="mt-3 text-gray-700 leading-relaxed flex-1">“{t.texto}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {t.fotoUrl ? (
                    <img src={t.fotoUrl} alt="" className="w-11 h-11 rounded-full object-cover" />
                  ) : (
                    <span className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center" aria-hidden="true">
                      {iniciales(t.nombre)}
                    </span>
                  )}
                  <span>
                    <span className="block font-semibold text-gray-900">{t.nombre}</span>
                    <span className="block text-sm text-gray-600">{t.cargo}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}

function Precios({ sec, onElegir }: { sec: Sec; onElegir: (planId: string) => void }) {
  const { sitio } = useSitio();
  const planes = sitio.planes;
  return (
    <section id="precios" aria-labelledby="t-precios" className="py-20 sm:py-28 bg-white scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-precios" titulo={sec.titulo} subtitulo={sec.subtitulo} centrado />
        <ul className={`grid gap-6 mx-auto ${planes.length === 1 ? 'max-w-md' : planes.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {planes.map((p) => (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-[2rem] p-8 sm:p-10 ${p.destacado ? 'plano bg-primary text-white shadow-2xl' : 'bg-slate-50 border border-slate-200'}`}
            >
              {p.destacado && (
                <p className="absolute top-8 right-8 rounded-full bg-accent text-primary text-xs font-bold px-3 py-1.5 whitespace-nowrap">
                  Recomendado
                </p>
              )}
              <h3 className={`display-sm text-2xl pr-28 ${p.destacado ? 'text-white' : 'text-primary'}`}>{p.nombre}</h3>
              <p className={`mt-2 text-sm ${p.destacado ? 'text-white/80' : 'text-gray-600'}`}>{p.descripcion}</p>
              <p className="mt-6 flex items-baseline flex-wrap gap-x-2">
                {p.precioAnterior && (
                  <span className={`text-lg line-through ${p.destacado ? 'text-white/60' : 'text-gray-500'}`}>
                    <span className="sr-only">Antes </span>{p.precioAnterior}
                  </span>
                )}
                <span className="display text-5xl">
                  {p.precioAnterior && <span className="sr-only">ahora </span>}
                  {p.precio}
                </span>
                {p.periodo && <span className={`text-sm ${p.destacado ? 'text-white/75' : 'text-gray-600'}`}>{p.periodo}</span>}
              </p>
              <ul className="mt-6 space-y-3 flex-1">
                {p.caracteristicas.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={18} className={`shrink-0 mt-px ${p.destacado ? 'text-accent' : 'text-emerald-600'}`} aria-hidden="true" />
                    <span className={p.destacado ? 'text-white/90' : 'text-gray-700'}>{c}</span>
                  </li>
                ))}
              </ul>
              {p.urlPago ? (
                <a
                  href={p.urlPago}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold ${p.destacado ? 'bg-accent text-primary hover:bg-accent-hover' : 'bg-primary text-white hover:bg-primary-hover'}`}
                >
                  {p.textoBoton}
                  <span className="sr-only"> (abre el pago en una pestaña nueva)</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onElegir(p.id)}
                  className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold ${p.destacado ? 'bg-accent text-primary hover:bg-accent-hover' : 'bg-primary text-white hover:bg-primary-hover'}`}
                >
                  {p.textoBoton}
                  <span className="sr-only">: {p.nombre}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
        {sitio.garantia && (
          <p className="mt-10 text-center text-sm text-gray-600 flex items-center justify-center gap-2 max-w-xl mx-auto">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0" aria-hidden="true" />
            {sitio.garantia}
          </p>
        )}
      </Contenedor>
    </section>
  );
}

function Faq({ sec }: { sec: Sec }) {
  const { sitio } = useSitio();
  return (
    <section id="faq" aria-labelledby="t-faq" className="py-20 sm:py-28 bg-slate-50 scroll-mt-16 outline-none">
      <Contenedor className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
        <EncabezadoSeccion id="t-faq" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <div className="border-t border-slate-300">
          {sitio.faq.map((f, i) => (
            <details key={i} className="group border-b border-slate-300">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-lg text-primary rounded-lg">
                {f.pregunta}
                <ChevronDown size={20} className="text-gray-500 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-10 text-slate-700 leading-relaxed whitespace-pre-line">{f.respuesta}</p>
            </details>
          ))}
        </div>
      </Contenedor>
    </section>
  );
}

// ─── Formulario de inscripción ────────────────────────────────────────────────
type Campos = { nombre: string; email: string; telefono: string; rut: string; planId: string; mensaje: string; acepta: boolean };
type Errores = Partial<Record<keyof Campos, string>>;

function Inscripcion({ sec, planInicial }: { sec: Sec; planInicial: string }) {
  const { sitio } = useSitio();
  const ins = sitio.inscripcion;
  const c = sitio.contacto;
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [f, setF] = useState<Campos>({ nombre: '', email: '', telefono: '', rut: '', planId: planInicial, mensaje: '', acepta: false });
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');
  const exitoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (planInicial) setF((x) => ({ ...x, planId: planInicial }));
  }, [planInicial]);

  const set = <K extends keyof Campos>(k: K, v: Campos[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    if (errores[k]) setErrores((e) => ({ ...e, [k]: undefined }));
  };

  const validar = (): Errores => {
    const e: Errores = {};
    if (f.nombre.trim().length < 3) e.nombre = 'Ingresa tu nombre completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.';
    if (f.telefono.replace(/\D/g, '').length < 8) e.telefono = 'Ingresa un teléfono de al menos 8 dígitos.';
    if (ins.pedirRut && f.rut && !validarRut(f.rut)) e.rut = 'El RUT no es válido. Revisa el dígito verificador.';
    if (!f.acepta) e.acepta = 'Debes aceptar ser contactado para continuar.';
    return e;
  };

  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErrorGeneral('');
    const e = validar();
    setErrores(e);
    const primero = (Object.keys(e) as (keyof Campos)[])[0];
    if (primero) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }
    setEnviando(true);
    try {
      await enviarSolicitud({
        nombre: f.nombre.trim(),
        email: f.email.trim(),
        telefono: f.telefono.trim(),
        rut: f.rut ? limpiarRut(f.rut) : undefined,
        planId: f.planId || undefined,
        mensaje: f.mensaje.trim() || undefined,
      });
      setEnviado(true);
      setTimeout(() => exitoRef.current?.focus(), 50);
    } catch {
      setErrorGeneral('No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos directamente.');
    } finally {
      setEnviando(false);
    }
  };

  const campo = 'mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary';
  const cls = (k: keyof Campos) => `${campo} ${errores[k] ? 'border-red-600' : 'border-gray-300'}`;
  const err = (k: keyof Campos) =>
    errores[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-sm text-red-700">
        {errores[k]}
      </p>
    ) : null;
  const aria = (k: keyof Campos) => ({ 'aria-invalid': !!errores[k] || undefined, 'aria-describedby': errores[k] ? `${uid}-${k}-err` : undefined });

  return (
    <section id="inscripcion" aria-labelledby="t-inscripcion" className="py-20 sm:py-28 bg-primary relative overflow-hidden scroll-mt-16 outline-none">
      <div className="plano absolute inset-0 pointer-events-none" aria-hidden="true" />
      <Contenedor className="relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div className="text-white min-w-0">
          <h2 id="t-inscripcion" className="display text-4xl sm:text-5xl text-balance">{ins.titulo || sec.titulo}</h2>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">{ins.texto}</p>

          <ul className="mt-8 space-y-4">
            {c.whatsapp && (
              <li>
                <a href={enlaceWhatsapp(c.whatsapp, c.mensajeWhatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl bg-[#1f8f4e] hover:bg-[#187a41] px-5 py-3 font-semibold text-white">
                  <IconoWhatsapp size={22} />
                  Escríbenos por WhatsApp
                  <span className="sr-only"> (abre en una pestaña nueva)</span>
                </a>
              </li>
            )}
            {c.telefono && (
              <li className="flex items-center gap-3 text-white/90">
                <Phone size={20} className="text-accent" aria-hidden="true" />
                <a href={`tel:${c.telefono.replace(/\s/g, '')}`} className="hover:underline">{c.telefono}</a>
              </li>
            )}
            {c.email && (
              <li className="flex items-center gap-3 text-white/90">
                <Mail size={20} className="text-accent" aria-hidden="true" />
                <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
              </li>
            )}
            {c.horario && (
              <li className="flex items-center gap-3 text-white/90">
                <Clock size={20} className="text-accent" aria-hidden="true" />
                {c.horario}
              </li>
            )}
          </ul>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-9">
          {enviado ? (
            <div ref={exitoRef} tabIndex={-1} role="status" className="text-center py-8 outline-none">
              <span className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 size={32} aria-hidden="true" />
              </span>
              <p className="mt-5 text-xl font-bold text-primary">¡Solicitud enviada!</p>
              <p className="mt-2 text-gray-700">{ins.mensajeExito}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={enviar} noValidate className="space-y-5">
              <p className="text-sm text-gray-600">
                Los campos marcados con <span aria-hidden="true" className="text-red-700">*</span><span className="sr-only">asterisco</span> son obligatorios.
              </p>
              <div>
                <label htmlFor={`${uid}-nombre`} className="block text-sm font-semibold text-gray-800">
                  Nombre completo <span aria-hidden="true" className="text-red-700">*</span>
                </label>
                <input id={`${uid}-nombre`} name="nombre" autoComplete="name" required value={f.nombre} onChange={(e) => set('nombre', e.target.value)} className={cls('nombre')} {...aria('nombre')} />
                {err('nombre')}
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor={`${uid}-email`} className="block text-sm font-semibold text-gray-800">
                    Correo electrónico <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required value={f.email} onChange={(e) => set('email', e.target.value)} className={cls('email')} {...aria('email')} />
                  {err('email')}
                </div>
                <div>
                  <label htmlFor={`${uid}-telefono`} className="block text-sm font-semibold text-gray-800">
                    Teléfono / WhatsApp <span aria-hidden="true" className="text-red-700">*</span>
                  </label>
                  <input id={`${uid}-telefono`} name="telefono" type="tel" autoComplete="tel" inputMode="tel" placeholder="+56 9 1234 5678" required value={f.telefono} onChange={(e) => set('telefono', e.target.value)} className={cls('telefono')} {...aria('telefono')} />
                  {err('telefono')}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {ins.pedirRut && (
                  <div>
                    <label htmlFor={`${uid}-rut`} className="block text-sm font-semibold text-gray-800">
                      RUT <span className="font-normal text-gray-600">(opcional)</span>
                    </label>
                    <input id={`${uid}-rut`} name="rut" inputMode="text" placeholder="12.345.678-9" value={f.rut} onChange={(e) => set('rut', limpiarRut(e.target.value) ? formatearRut(e.target.value) : '')} className={cls('rut')} {...aria('rut')} />
                    {err('rut')}
                  </div>
                )}
                {sitio.planes.length > 0 && (
                  <div className={ins.pedirRut ? '' : 'sm:col-span-2'}>
                    <label htmlFor={`${uid}-plan`} className="block text-sm font-semibold text-gray-800">Plan de interés</label>
                    <select id={`${uid}-plan`} name="planId" value={f.planId} onChange={(e) => set('planId', e.target.value)} className={`${campo} border-gray-300`}>
                      <option value="">Aún no lo sé</option>
                      {sitio.planes.map((p) => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor={`${uid}-mensaje`} className="block text-sm font-semibold text-gray-800">
                  ¿Tienes alguna pregunta? <span className="font-normal text-gray-600">(opcional)</span>
                </label>
                <textarea id={`${uid}-mensaje`} name="mensaje" rows={3} value={f.mensaje} onChange={(e) => set('mensaje', e.target.value)} className={`${campo} border-gray-300 resize-y`} />
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <input id={`${uid}-acepta`} name="acepta" type="checkbox" checked={f.acepta} onChange={(e) => set('acepta', e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-400 accent-primary" {...aria('acepta')} />
                  <label htmlFor={`${uid}-acepta`} className="text-sm text-gray-700">
                    Acepto que {sitio.marca.nombre} me contacte por correo, teléfono o WhatsApp para entregarme información del curso.
                  </label>
                </div>
                {err('acepta')}
              </div>
              {errorGeneral && (
                <p role="alert" className="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">{errorGeneral}</p>
              )}
              <button type="submit" disabled={enviando} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-primary font-extrabold text-base hover:bg-accent-hover disabled:opacity-60">
                {enviando ? <Loader2 size={20} className="animate-spin" aria-hidden="true" /> : null}
                {enviando ? 'Enviando…' : ins.textoBoton}
              </button>
            </form>
          )}
        </div>
      </Contenedor>
    </section>
  );
}

// ─── Pie de página ────────────────────────────────────────────────────────────
function Pie() {
  const { sitio } = useSitio();
  const r = sitio.redes;
  const c = sitio.contacto;
  const redes = [
    { url: r.facebook, label: 'Facebook', Icon: IconoFacebook },
    { url: r.instagram, label: 'Instagram', Icon: IconoInstagram },
    { url: r.linkedin, label: 'LinkedIn', Icon: IconoLinkedin },
    { url: r.youtube, label: 'YouTube', Icon: IconoYoutube },
    { url: r.tiktok, label: 'TikTok', Icon: IconoTiktok },
  ].filter((x) => x.url);
  return (
    <footer className="bg-primary text-white/70 border-t border-white/10">
      <Contenedor className="py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo tono="dark" size="lg" />
          {sitio.pie.texto && <p className="mt-4 max-w-sm text-white/60">{sitio.pie.texto}</p>}
          {redes.length > 0 && (
            <ul className="mt-6 flex gap-2" aria-label="Redes sociales">
              {redes.map(({ url, label, Icon }) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (abre en una pestaña nueva)`} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/15 flex items-center justify-center text-white">
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Enlaces del pie">
          <h2 className="text-base font-semibold text-white">Plataforma</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/login" className="hover:text-white hover:underline">Ingresar al aula</Link></li>
            <li><Link to="/verificar-certificado" className="hover:text-white hover:underline">Verificar un certificado</Link></li>
            <li><Link to="/recuperar-password" className="hover:text-white hover:underline">Recuperar contraseña</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-base font-semibold text-white">Contacto</h2>
          <ul className="mt-4 space-y-2.5">
            {c.email && <li className="flex items-center gap-2"><Mail size={16} aria-hidden="true" /><a href={`mailto:${c.email}`} className="hover:text-white hover:underline">{c.email}</a></li>}
            {c.telefono && <li className="flex items-center gap-2"><Phone size={16} aria-hidden="true" /><a href={`tel:${c.telefono.replace(/\s/g, '')}`} className="hover:text-white hover:underline">{c.telefono}</a></li>}
            {c.direccion && <li className="flex items-start gap-2"><MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />{c.direccion}</li>}
          </ul>
        </div>
      </Contenedor>
      <div className="border-t border-white/10">
        <Contenedor className="py-6 text-sm text-white/50 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {sitio.marca.nombre} {sitio.marca.subtitulo}</p>
        </Contenedor>
      </div>
    </footer>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────
export default function Landing() {
  const { sitio } = useSitio();
  const [curso, setCurso] = useState<Curso | null>(null);
  const [plan, setPlan] = useState('');
  usarSeo(sitio);

  useEffect(() => {
    getCursoPublico().then(setCurso).catch(() => setCurso(null));
    // Permite enlaces directos como /#inscripcion o /#precios.
    const hash = window.location.hash.slice(1);
    if (hash) setTimeout(() => irA(hash), 150);
  }, []);

  const visibles = new Set(sitio.secciones.filter((s) => s.visible).map((s) => s.id));
  const c = sitio.contacto;

  const elegirPlan = (id: string) => {
    setPlan(id);
    irA('inscripcion');
  };

  const render = (s: Sec) => {
    switch (s.id) {
      case 'beneficios': return <Beneficios key={s.id} sec={s} />;
      case 'temario': return <Temario key={s.id} sec={s} curso={curso} />;
      case 'metodologia': return <Metodologia key={s.id} sec={s} />;
      case 'instructor': return <Instructor key={s.id} sec={s} />;
      case 'testimonios': return sitio.testimonios.length ? <Testimonios key={s.id} sec={s} /> : null;
      case 'precios': return sitio.planes.length ? <Precios key={s.id} sec={s} onElegir={elegirPlan} /> : null;
      case 'faq': return sitio.faq.length ? <Faq key={s.id} sec={s} /> : null;
      case 'inscripcion': return <Inscripcion key={s.id} sec={s} planInicial={plan} />;
    }
  };

  return (
    <div className="landing min-h-screen bg-white">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>

      {sitio.anuncio.activo && sitio.anuncio.texto && (
        <div className="bg-accent text-primary text-sm font-semibold text-center px-4 py-2">
          {sitio.anuncio.enlace ? (
            <a
              href={sitio.anuncio.enlace}
              onClick={(e) => {
                if (sitio.anuncio.enlace?.startsWith('#')) {
                  e.preventDefault();
                  irA(sitio.anuncio.enlace.slice(1));
                }
              }}
              className="underline underline-offset-4 decoration-primary/40 hover:decoration-primary"
            >
              {sitio.anuncio.texto}
            </a>
          ) : (
            sitio.anuncio.texto
          )}
        </div>
      )}

      <Cabecera visibles={visibles} />

      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero mostrarInscripcion={visibles.has('inscripcion')} mostrarTemario={visibles.has('temario')} />
        {sitio.secciones.filter((s) => s.visible).map(render)}
      </main>

      <Pie />

      {c.whatsapp && c.botonWhatsappFlotante && (
        <a
          href={enlaceWhatsapp(c.whatsapp, c.mensajeWhatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp (abre en una pestaña nueva)"
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#1f8f4e] hover:bg-[#187a41] text-white shadow-xl flex items-center justify-center"
        >
          <IconoWhatsapp size={28} />
        </a>
      )}
    </div>
  );
}
