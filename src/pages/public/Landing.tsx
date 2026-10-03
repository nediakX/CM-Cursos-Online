import React, { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, BadgeCheck, CheckCircle2, ChevronDown, Clock, Loader2, Mail, MapPin, Menu, Phone,
  PlayCircle, Quote, ShieldCheck, Sparkles, X,
} from 'lucide-react';
import { useSitio } from '../../context/SiteContext';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../../components/BrandLogo';
import { Icono } from '../../components/landing/iconos';
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

function EncabezadoSeccion({ titulo, subtitulo, id, claro = false }: { titulo: string; subtitulo?: string; id: string; claro?: boolean }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-12">
      <h2 id={id} className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${claro ? 'text-white' : 'text-primary'}`}>
        {titulo}
      </h2>
      {subtitulo && <p className={`mt-3 text-lg ${claro ? 'text-white/80' : 'text-gray-600'}`}>{subtitulo}</p>}
    </div>
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
    <header className={`sticky top-0 z-40 bg-primary/95 backdrop-blur border-b ${scrolled ? 'border-white/10 shadow-lg' : 'border-transparent'}`}>
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
          <Link to={aula} className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-white/10">
            {user ? 'Ir a mi aula' : 'Ingresar'}
          </Link>
          {visibles.has('inscripcion') && (
            <a href="#inscripcion" onClick={(ev) => { ev.preventDefault(); irA('inscripcion'); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-accent text-primary hover:bg-accent-hover">
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
function MaquetaCurso({ curso }: { curso: Curso | null }) {
  const modulos = (curso?.modulos ?? []).slice(0, 4);
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-6 bg-accent/20 blur-3xl rounded-full" />
      <div className="relative bg-white rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <PlayCircle size={20} className="text-accent" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Tu avance</p>
            <p className="font-bold text-primary truncate">{curso?.nombre ?? 'Instalador Eléctrico Clase D'}</p>
          </div>
        </div>
        <ul className="space-y-3">
          {(modulos.length ? modulos : Array.from({ length: 4 }, (_, i) => ({ id: String(i), orden: i + 1, nombre: 'Módulo' }))).map((m, i) => (
            <li key={m.id} className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${i < 2 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                {i < 2 ? <CheckCircle2 size={16} /> : m.orden}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{m.nombre}</p>
                <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${[100, 100, 60, 15][i]}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3 -rotate-2">
        <Award size={22} className="text-accent-ink" />
        <div>
          <p className="text-xs text-gray-500">Certificado</p>
          <p className="text-sm font-bold text-primary">Verificable en línea</p>
        </div>
      </div>
    </div>
  );
}

function Hero({ curso, mostrarInscripcion, mostrarTemario }: { curso: Curso | null; mostrarInscripcion: boolean; mostrarTemario: boolean }) {
  const { sitio } = useSitio();
  const h = sitio.hero;
  return (
    <section aria-labelledby="hero-titulo" className="relative overflow-hidden bg-primary text-white">
      {/* Fondo decorativo: retícula técnica + brillo */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-accent/25 blur-3xl pointer-events-none" aria-hidden="true" />

      <Contenedor className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center py-16 sm:py-24">
        <div className="min-w-0">
          {h.etiqueta && (
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-sm font-medium text-white">
              <Sparkles size={14} className="text-accent" aria-hidden="true" />
              {h.etiqueta}
            </p>
          )}
          <h1 id="hero-titulo" className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.08] text-balance">
            {h.titulo} {h.tituloDestacado && <span className="text-accent">{h.tituloDestacado}</span>}
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">{h.subtitulo}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {mostrarInscripcion && (
              <a href="#inscripcion" onClick={(e) => { e.preventDefault(); irA('inscripcion'); }} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-primary font-bold text-base hover:bg-accent-hover shadow-lg shadow-black/20">
                {h.ctaPrincipal}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            )}
            {mostrarTemario && h.ctaSecundario && (
              <a href="#temario" onClick={(e) => { e.preventDefault(); irA('temario'); }} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-base hover:bg-white/10">
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

        <div className="max-w-md w-full min-w-0 mx-auto lg:mx-0 lg:ml-auto">
          {h.imagenUrl ? (
            <img src={h.imagenUrl} alt="" className="w-full rounded-2xl shadow-2xl object-cover aspect-[4/3]" />
          ) : (
            <MaquetaCurso curso={curso} />
          )}
        </div>
      </Contenedor>

      {h.estadisticas.length > 0 && (
        <div className="relative border-t border-white/10 bg-black/10">
          <Contenedor>
            <dl className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10">
              {h.estadisticas.map((e, i) => (
                <div key={i} className={`py-6 px-4 text-center flex flex-col-reverse ${i >= 2 ? 'border-t border-white/10 md:border-t-0' : ''}`}>
                  <dt className="text-sm text-white/75 mt-1">{e.etiqueta}</dt>
                  <dd className="text-3xl font-extrabold text-accent">{e.valor}</dd>
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
    <section id="beneficios" aria-labelledby="t-beneficios" className="py-20 sm:py-24 bg-white scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-beneficios" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sitio.beneficios.map((b, i) => (
            <li key={i} className="group rounded-2xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-lg transition-shadow bg-white">
              <span className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-colors">
                <Icono nombre={b.icono} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-primary">{b.titulo}</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{b.texto}</p>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  );
}

function Temario({ sec, curso }: { sec: Sec; curso: Curso | null }) {
  if (!curso) return null;
  return (
    <section id="temario" aria-labelledby="t-temario" className="py-20 sm:py-24 bg-gray-50 scroll-mt-16 outline-none">
      <Contenedor className="max-w-4xl">
        <EncabezadoSeccion id="t-temario" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3 py-1.5 text-gray-700">
            <Clock size={16} aria-hidden="true" className="text-primary" /> {curso.horasTotales} horas
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3 py-1.5 text-gray-700">
            <BadgeCheck size={16} aria-hidden="true" className="text-primary" /> {curso.modulos.length} módulos
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3 py-1.5 text-gray-700">
            <PlayCircle size={16} aria-hidden="true" className="text-primary" /> Modalidad {curso.modalidad.toLowerCase()}
          </span>
        </div>
        <ol className="space-y-3">
          {curso.modulos.map((m) => (
            <li key={m.id}>
              <details className="group bg-white rounded-2xl border border-gray-200 open:shadow-md">
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded-2xl">
                  <span className="w-11 h-11 rounded-xl bg-primary text-white font-bold flex items-center justify-center shrink-0" aria-hidden="true">
                    {String(m.orden).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="sr-only">Módulo {m.orden}: </span>
                    <span className="block font-semibold text-gray-900">{m.nombre}</span>
                    <span className="block text-sm text-gray-600 mt-0.5">
                      {m.lecciones.length} lecciones{m.horas ? ` · ${m.horas} h` : ''}
                    </span>
                  </span>
                  <ChevronDown size={20} className="text-gray-500 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="px-5 pb-5 sm:pl-20">
                  {m.objetivo && <p className="text-gray-700 mb-3">{m.objetivo}</p>}
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                    {m.lecciones.map((l) => (
                      <li key={l.id} className="flex items-start gap-2 text-sm text-gray-700">
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
  return (
    <section id="metodologia" aria-labelledby="t-metodologia" className="py-20 sm:py-24 bg-white scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-metodologia" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sitio.metodologia.map((p, i) => (
            <li key={i} className="relative text-center px-2">
              <span className="relative mx-auto w-16 h-16 rounded-2xl bg-primary text-accent flex items-center justify-center shadow-lg">
                <Icono nombre={p.icono} size={26} />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-primary text-sm font-extrabold flex items-center justify-center" aria-hidden="true">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-bold text-primary">
                <span className="sr-only">Paso {i + 1}: </span>
                {p.titulo}
              </h3>
              <p className="mt-2 text-gray-600">{p.texto}</p>
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
  const iniciales = ins.nombre.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <section id="instructor" aria-labelledby="t-instructor" className="py-20 sm:py-24 bg-gray-50 scroll-mt-16 outline-none">
      <Contenedor className="max-w-5xl">
        <EncabezadoSeccion id="t-instructor" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <div className="grid md:grid-cols-[260px_1fr] gap-10 items-center bg-white rounded-3xl border border-gray-200 p-6 sm:p-10">
          {ins.fotoUrl ? (
            <img src={ins.fotoUrl} alt={`Fotografía de ${ins.nombre}`} className="w-full aspect-square object-cover rounded-2xl" />
          ) : (
            <div className="w-full aspect-square rounded-2xl bg-primary flex items-center justify-center text-6xl font-extrabold text-accent" aria-hidden="true">
              {iniciales}
            </div>
          )}
          <div>
            <h3 className="text-2xl font-bold text-primary">{ins.nombre}</h3>
            <p className="text-accent-ink font-semibold mt-1">{ins.cargo}</p>
            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">{ins.bio}</p>
            {ins.credenciales.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {ins.credenciales.map((c, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 text-primary px-3 py-1.5 text-sm font-medium">
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
                      {t.nombre.charAt(0)}
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
    <section id="precios" aria-labelledby="t-precios" className="py-20 sm:py-24 bg-white scroll-mt-16 outline-none">
      <Contenedor>
        <EncabezadoSeccion id="t-precios" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <ul className={`grid gap-6 mx-auto ${planes.length === 1 ? 'max-w-md' : planes.length === 2 ? 'md:grid-cols-2 max-w-4xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {planes.map((p) => (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-3xl p-7 sm:p-8 ${p.destacado ? 'bg-primary text-white shadow-2xl ring-2 ring-accent lg:-my-2' : 'bg-white border border-gray-200'}`}
            >
              {p.destacado && (
                <p className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent text-primary text-xs font-extrabold uppercase tracking-wide px-3 py-1.5 whitespace-nowrap">
                  Más elegido
                </p>
              )}
              <h3 className={`text-xl font-bold ${p.destacado ? 'text-white' : 'text-primary'}`}>{p.nombre}</h3>
              <p className={`mt-2 text-sm ${p.destacado ? 'text-white/80' : 'text-gray-600'}`}>{p.descripcion}</p>
              <p className="mt-6 flex items-baseline flex-wrap gap-x-2">
                {p.precioAnterior && (
                  <span className={`text-lg line-through ${p.destacado ? 'text-white/60' : 'text-gray-500'}`}>
                    <span className="sr-only">Antes </span>{p.precioAnterior}
                  </span>
                )}
                <span className="text-4xl font-extrabold tracking-tight">
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
                  className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold ${p.destacado ? 'bg-accent text-primary hover:bg-accent-hover' : 'bg-primary text-white hover:bg-primary-hover'}`}
                >
                  {p.textoBoton}
                  <span className="sr-only"> (abre el pago en una pestaña nueva)</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onElegir(p.id)}
                  className={`mt-8 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold ${p.destacado ? 'bg-accent text-primary hover:bg-accent-hover' : 'bg-primary text-white hover:bg-primary-hover'}`}
                >
                  {p.textoBoton}
                  <span className="sr-only">: {p.nombre}</span>
                  <ArrowRight size={18} aria-hidden="true" />
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
    <section id="faq" aria-labelledby="t-faq" className="py-20 sm:py-24 bg-gray-50 scroll-mt-16 outline-none">
      <Contenedor className="max-w-3xl">
        <EncabezadoSeccion id="t-faq" titulo={sec.titulo} subtitulo={sec.subtitulo} />
        <div className="space-y-3">
          {sitio.faq.map((f, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-gray-200">
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-semibold text-gray-900 rounded-2xl">
                {f.pregunta}
                <ChevronDown size={20} className="text-gray-500 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-gray-700 leading-relaxed whitespace-pre-line">{f.respuesta}</p>
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
    <section id="inscripcion" aria-labelledby="t-inscripcion" className="py-20 sm:py-24 bg-primary relative overflow-hidden scroll-mt-16 outline-none">
      <div className="absolute -bottom-48 -left-48 w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <Contenedor className="relative grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div className="text-white min-w-0">
          <h2 id="t-inscripcion" className="text-3xl sm:text-4xl font-extrabold tracking-tight">{ins.titulo || sec.titulo}</h2>
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

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
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
              <button type="submit" disabled={enviando} className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent text-primary font-extrabold text-base hover:bg-accent-hover disabled:opacity-60">
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
    <footer className="bg-gray-950 text-gray-300">
      <Contenedor className="py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo tono="dark" size="lg" />
          {sitio.pie.texto && <p className="mt-4 max-w-sm text-gray-500">{sitio.pie.texto}</p>}
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
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">Plataforma</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/login" className="hover:text-white hover:underline">Ingresar al aula</Link></li>
            <li><Link to="/verificar-certificado" className="hover:text-white hover:underline">Verificar un certificado</Link></li>
            <li><Link to="/recuperar-password" className="hover:text-white hover:underline">Recuperar contraseña</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white uppercase tracking-wide">Contacto</h2>
          <ul className="mt-4 space-y-2.5">
            {c.email && <li className="flex items-center gap-2"><Mail size={16} aria-hidden="true" /><a href={`mailto:${c.email}`} className="hover:text-white hover:underline">{c.email}</a></li>}
            {c.telefono && <li className="flex items-center gap-2"><Phone size={16} aria-hidden="true" /><a href={`tel:${c.telefono.replace(/\s/g, '')}`} className="hover:text-white hover:underline">{c.telefono}</a></li>}
            {c.direccion && <li className="flex items-start gap-2"><MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />{c.direccion}</li>}
          </ul>
        </div>
      </Contenedor>
      <div className="border-t border-white/10">
        <Contenedor className="py-6 text-sm text-gray-500 flex flex-col sm:flex-row gap-2 justify-between">
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
    <div className="min-h-screen bg-white">
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
        <Hero curso={curso} mostrarInscripcion={visibles.has('inscripcion')} mostrarTemario={visibles.has('temario')} />
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
