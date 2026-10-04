import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  ClipboardList,
  Clock,
  FileText,
  Download,
  FlaskConical,
  Lock,
  MessageSquare,
  Send,
  Target,
  Trophy,
  Wrench,
  Calculator,
  Presentation,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import ProgressBar from '../../components/ui/ProgressBar';
import { ListaBloques } from '../../components/modulo/Bloques';
import Calculadora, { NOMBRES_CALCULADORAS } from '../../components/modulo/Calculadoras';
import PracticaModulo from '../../components/modulo/PracticaModulo';
import Presentacion from '../../components/modulo/Presentacion';
import { modulosHabilitados } from '../../utils/evaluaciones';
import { getCurso, getProgreso, marcarLeccion, listarConsultas, crearConsulta, listarEvaluaciones, listarIntentos, getContenidoModulo } from '../../services/api';
import type { CalculadoraId, Consulta, ContenidoModulo, Curso, Evaluacion, Intento, Modulo, Progreso } from '../../types';

type Tab = 'lecciones' | 'presentacion' | 'practica' | 'recursos' | 'consultas';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

const scrollArriba = () => document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });

export default function ModulePage() {
  const { moduloId } = useParams<{ moduloId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [curso, setCurso] = useState<Curso | null>(null);
  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [evaluacion, setEvaluacion] = useState<Evaluacion | null>(null);
  const [intentos, setIntentos] = useState<Intento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>('lecciones');
  const [guardando, setGuardando] = useState(false);
  const [consultaText, setConsultaText] = useState('');
  const [enviandoConsulta, setEnviandoConsulta] = useState(false);
  const [calcAbierta, setCalcAbierta] = useState<CalculadoraId | null>(null);
  const [indiceAbierto, setIndiceAbierto] = useState(false);
  const [contenido, setContenido] = useState<ContenidoModulo | undefined>(undefined);

  useEffect(() => {
    if (!user || !moduloId) return;
    setLoading(true);
    setError(false);
    getCurso('curso-1')
      .then(async (c) => {
        const mod = c.modulos.find((m) => m.id === moduloId);
        if (!mod) throw new Error('HTTP_404');
        const [prog, evs, ints, cons, cont] = await Promise.all([
          getProgreso(user.id, mod.cursoId),
          listarEvaluaciones(mod.cursoId),
          listarIntentos(user.id),
          listarConsultas({ userId: user.id, moduloId }).catch(() => [] as Consulta[]),
          getContenidoModulo(moduloId).catch(() => undefined),
        ]);
        setContenido(cont);
        setCurso(c);
        setProgreso(prog);
        setEvaluacion(evs.find((e) => e.moduloId === moduloId && e.tipo === 'modulo') ?? null);
        setIntentos(ints);
        setConsultas(cons);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [user, moduloId]);

  const modulo: Modulo | null = curso?.modulos.find((m) => m.id === moduloId) ?? null;
  const completadas = useMemo(() => new Set(progreso?.leccionesCompletadas ?? []), [progreso]);

  // Lecciones a mostrar: las del contenido interactivo, o las del módulo si fue creado desde el panel.
  const lecciones = useMemo(() => {
    if (!modulo) return [];
    return modulo.lecciones.map((l) => ({
      id: l.id,
      titulo: l.titulo,
      contenido: contenido?.lecciones.find((c) => c.leccionId === l.id),
    }));
  }, [modulo, contenido]);

  const hechas = lecciones.filter((l) => completadas.has(l.id)).length;
  const pct = lecciones.length ? Math.round((hechas / lecciones.length) * 100) : 0;
  const todoCompleto = lecciones.length > 0 && hechas === lecciones.length;

  const leccionParam = searchParams.get('leccion');
  const actualIdx = Math.max(
    0,
    leccionParam ? lecciones.findIndex((l) => l.id === leccionParam) : lecciones.findIndex((l) => !completadas.has(l.id)),
  );
  const actual = lecciones[actualIdx];

  const irALeccion = (i: number) => {
    const l = lecciones[i];
    if (!l) return;
    setSearchParams({ leccion: l.id }, { replace: true });
    setTab('lecciones');
    setIndiceAbierto(false);
    scrollArriba();
  };

  // Bloqueo: el relator habilita cada módulo para el alumno.
  const bloqueado = useMemo(() => !!curso && !!modulo && !modulosHabilitados(user, curso).has(modulo.id), [curso, modulo, user]);

  const mejorIntento = evaluacion
    ? intentos.filter((i) => i.evaluacionId === evaluacion.id).reduce<Intento | null>((b, i) => (!b || i.nota > b.nota ? i : b), null)
    : null;

  const completarYContinuar = async () => {
    if (!user || !actual) return;
    setGuardando(true);
    try {
      if (!completadas.has(actual.id)) {
        const p = await marcarLeccion(user.id, actual.id, true);
        setProgreso(p);
        toast('Lección completada', 'success');
      }
      if (actualIdx < lecciones.length - 1) irALeccion(actualIdx + 1);
      else scrollArriba();
    } catch {
      toast('No se pudo guardar tu avance', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const desmarcar = async () => {
    if (!user || !actual) return;
    try {
      setProgreso(await marcarLeccion(user.id, actual.id, false));
    } catch {
      toast('No se pudo actualizar la lección', 'error');
    }
  };

  const enviarConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !moduloId || !consultaText.trim()) return;
    setEnviandoConsulta(true);
    try {
      const nueva = await crearConsulta({ userId: user.id, moduloId, pregunta: consultaText.trim() });
      setConsultas((prev) => [nueva, ...prev]);
      setConsultaText('');
      toast('Consulta enviada al instructor', 'success');
    } catch {
      toast('Error al enviar la consulta', 'error');
    } finally {
      setEnviandoConsulta(false);
    }
  };

  // ── Estados de carga ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4 max-w-6xl">
        <Skeleton className="h-36" />
        <div className="grid lg:grid-cols-[280px_1fr] gap-5">
          <Skeleton className="h-72 hidden lg:block" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }
  if (error || !modulo || !progreso) {
    return <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-3xl">Módulo no encontrado.</div>;
  }
  if (bloqueado) {
    return (
      <div className="max-w-xl bg-white rounded-xl shadow-sm p-8 text-center">
        <Lock size={36} className="mx-auto text-gray-300 mb-3" />
        <h1 className="font-bold text-primary text-lg">Módulo {modulo.orden} bloqueado</h1>
        <p className="text-sm text-gray-500 mt-1">Tu relator habilitará este módulo cuando apruebes la evaluación del módulo anterior.</p>
        <button onClick={() => navigate(`/app/cursos/${modulo.cursoId}`)} className="mt-5 px-5 py-2 bg-primary text-white rounded-xl text-sm font-medium">
          Volver al curso
        </button>
      </div>
    );
  }

  const calculadoras = Array.from(
    new Set((contenido?.lecciones ?? []).flatMap((l) => l.bloques.flatMap((b) => (b.tipo === 'calculadora' ? [b.calculadora] : [])))),
  );
  const siguienteModulo = curso?.modulos.find((m) => m.orden === modulo.orden + 1);

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'lecciones', label: 'Lecciones', icon: <BookOpen size={15} /> },
    ...(contenido?.presentacion?.length ? [{ id: 'presentacion' as Tab, label: 'Presentación', icon: <Presentation size={15} /> }] : []),
    { id: 'practica', label: 'Práctica', icon: <Target size={15} /> },
    { id: 'recursos', label: 'Recursos', icon: <Wrench size={15} /> },
    { id: 'consultas', label: 'Consultas', icon: <MessageSquare size={15} /> },
  ];

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Encabezado */}
      <div className="bg-primary rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-accent/10" aria-hidden />
        <Link to={`/app/cursos/${modulo.cursoId}`} className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white mb-3">
          <ArrowLeft size={13} /> Volver al curso
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-accent text-primary text-xs font-bold px-2.5 py-1 rounded-full">Módulo {modulo.orden}</span>
          <span className="flex items-center gap-1 text-xs text-white/60">
            <Clock size={12} /> {modulo.horas} h
          </span>
          <span className="text-xs text-white/60">· {lecciones.length} lecciones</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold leading-tight">{modulo.nombre}</h1>
        {(contenido?.introduccion || modulo.objetivo) && <p className="text-sm text-white/70 mt-2 max-w-3xl">{contenido?.introduccion ?? modulo.objetivo}</p>}
        <div className="mt-4 max-w-md">
          <div className="flex justify-between text-xs text-white/70 mb-1.5">
            <span>
              {hechas} de {lecciones.length} lecciones
            </span>
            <span className="font-semibold text-white">{pct}%</span>
          </div>
          <ProgressBar value={pct} color="accent" size="md" showLabel={false} />
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              'flex-1 min-w-fit flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              tab === t.id ? 'bg-white text-primary shadow-sm' : 'text-gray-700 hover:text-gray-900',
            ].join(' ')}
          >
            {t.icon}
            {t.label}
            {t.id === 'consultas' && consultas.some((c) => c.estado === 'respondida') && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
          </button>
        ))}
      </div>

      {/* ── PRESENTACIÓN ────────────────────────────────────────────────────── */}
      {tab === 'presentacion' && contenido?.presentacion && <Presentacion diapositivas={contenido.presentacion} modulo={`Módulo ${modulo.orden}`} />}

      {/* ── LECCIONES ───────────────────────────────────────────────────────── */}
      {tab === 'lecciones' && (
        <div className="grid lg:grid-cols-[280px_1fr] gap-5 items-start">
          {/* Índice */}
          <aside className="bg-white rounded-xl shadow-sm p-3 lg:sticky lg:top-0">
            <button
              type="button"
              onClick={() => setIndiceAbierto((v) => !v)}
              className="w-full flex items-center justify-between px-2 py-1.5 lg:cursor-default"
              aria-expanded={indiceAbierto}
            >
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contenido del módulo</span>
              <span className="lg:hidden flex items-center gap-1 text-xs text-gray-600">
                {actualIdx + 1}/{lecciones.length}
                <ChevronDown size={15} className={`transition-transform ${indiceAbierto ? 'rotate-180' : ''}`} />
              </span>
            </button>
            <nav className={`space-y-1 ${indiceAbierto ? 'block' : 'hidden'} lg:block`}>
              {lecciones.map((l, i) => {
                const done = completadas.has(l.id);
                const activa = i === actualIdx;
                return (
                  <button
                    key={l.id}
                    onClick={() => irALeccion(i)}
                    className={[
                      'w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors',
                      activa ? 'bg-primary/5 ring-1 ring-primary/15' : 'hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {done ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /> : <Circle size={18} className={`shrink-0 mt-0.5 ${activa ? 'text-accent' : 'text-gray-300'}`} />}
                    <span className="min-w-0">
                      <span className={`block text-sm leading-snug ${activa ? 'font-semibold text-primary' : 'text-gray-700'}`}>
                        {i + 1}. {l.titulo}
                      </span>
                      {l.contenido && <span className="text-xs text-gray-600">{l.contenido.minutos} min</span>}
                    </span>
                  </button>
                );
              })}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => setTab('practica')}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Target size={18} className="text-accent shrink-0" /> Práctica del módulo
                </button>
                <div className={`flex items-center gap-2.5 px-2.5 py-2 text-sm ${todoCompleto ? 'text-gray-700' : 'text-gray-500'}`}>
                  {todoCompleto ? <ClipboardList size={18} className="text-primary shrink-0" /> : <Lock size={18} className="shrink-0" />} Evaluación del módulo
                </div>
              </div>
            </nav>
          </aside>

          {/* Lección actual */}
          <div className="min-w-0 space-y-5">
            {actual ? (
              <>
                <div>
                  <p className="text-xs font-semibold text-accent-ink uppercase tracking-wide">
                    Lección {actualIdx + 1} de {lecciones.length}
                    {actual.contenido && ` · ${actual.contenido.minutos} min`}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1">{actual.titulo}</h2>
                </div>

                {actual.contenido ? (
                  <ListaBloques key={actual.id} bloques={actual.contenido.bloques} />
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-6 text-sm text-gray-500">
                    El contenido de esta lección se entrega en clase y en el material de apoyo del módulo (pestaña Recursos).
                  </div>
                )}

                {/* Navegación */}
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <button
                    onClick={() => irALeccion(actualIdx - 1)}
                    disabled={actualIdx === 0}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary disabled:opacity-30"
                  >
                    <ArrowLeft size={15} /> Anterior
                  </button>
                  <div className="flex items-center gap-3 flex-wrap">
                    {completadas.has(actual.id) && (
                      <button onClick={desmarcar} className="text-xs text-gray-600 hover:text-gray-600">
                        Marcar como pendiente
                      </button>
                    )}
                    {completadas.has(actual.id) && actualIdx === lecciones.length - 1 ? (
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                        <CheckCircle2 size={16} /> Lección completada
                      </span>
                    ) : (
                      <button
                        onClick={completarYContinuar}
                        disabled={guardando}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50"
                      >
                        {completadas.has(actual.id)
                          ? 'Siguiente lección'
                          : actualIdx === lecciones.length - 1
                            ? 'Completar lección'
                            : 'Completar y continuar'}
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 text-sm text-gray-500">Este módulo aún no tiene lecciones.</div>
            )}

            {/* Evaluación */}
            <div className={`rounded-xl p-5 border-2 ${todoCompleto ? 'bg-amber-50 border-accent' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${todoCompleto ? 'bg-accent' : 'bg-gray-100'}`}>
                  {todoCompleto ? <Trophy size={22} className="text-primary" /> : <Lock size={20} className="text-gray-500" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{evaluacion?.nombre ?? 'Evaluación del módulo'}</h3>
                  <p className="text-sm text-gray-600">
                    {todoCompleto
                      ? evaluacion
                        ? `${evaluacion.cantidadPreguntas} preguntas · ${evaluacion.tiempoMinutos} min · nota mínima ${evaluacion.notaMinima.toFixed(1)}`
                        : 'Completaste todas las lecciones.'
                      : `Completa las ${lecciones.length - hechas} lecciones restantes para desbloquearla.`}
                  </p>
                  {mejorIntento && (
                    <p className={`text-sm font-semibold mt-1 ${mejorIntento.aprobado ? 'text-emerald-600' : 'text-red-700'}`}>
                      Mejor nota: {mejorIntento.nota.toFixed(1)} · {mejorIntento.aprobado ? 'Aprobado' : 'Reprobado'}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {evaluacion && (
                    <button
                      disabled={!todoCompleto}
                      onClick={() => navigate(`/app/evaluaciones/${evaluacion.id}/rendir`)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-hover disabled:bg-gray-100 disabled:text-gray-500"
                    >
                      <ClipboardList size={16} /> {mejorIntento ? 'Volver a rendir' : 'Rendir evaluación'}
                    </button>
                  )}
                  {todoCompleto && siguienteModulo && modulosHabilitados(user, curso!).has(siguienteModulo.id) && (
                    <button onClick={() => navigate(`/app/modulos/${siguienteModulo.id}`)} className="text-sm font-medium text-primary hover:underline">
                      Ir al Módulo {siguienteModulo.orden} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PRÁCTICA ────────────────────────────────────────────────────────── */}
      {tab === 'practica' && moduloId && (
        <div className="max-w-3xl">
          <PracticaModulo moduloId={moduloId} />
        </div>
      )}

      {/* ── RECURSOS ────────────────────────────────────────────────────────── */}
      {tab === 'recursos' && (
        <div className="grid md:grid-cols-2 gap-5 items-start">
          <div className="space-y-5">
            {modulo.objetivo && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-primary mb-2">Objetivo general</h3>
                <p className="text-sm text-gray-600">{modulo.objetivo}</p>
              </div>
            )}
            {modulo.aprendizajesEsperados.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-primary mb-3">Aprendizajes esperados</h3>
                <ul className="space-y-1.5">
                  {modulo.aprendizajesEsperados.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-accent font-bold">•</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {contenido && contenido.resumen.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-primary mb-3">Al terminar serás capaz de</h3>
                <ul className="space-y-1.5">
                  {contenido.resumen.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {modulo.materiales.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-primary mb-3">Material de apoyo</h3>
                <div className="space-y-2">
                  {modulo.materiales.map((mat) => (
                    <a
                      key={mat.id}
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-gray-50"
                    >
                      <FileText size={16} className="text-red-700 shrink-0" />
                      <span className="text-sm text-gray-700 flex-1">{mat.nombre}</span>
                      <Download size={15} className="text-gray-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {calculadoras.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <Calculator size={17} className="text-accent" /> Simuladores del módulo
                </h3>
                <div className="space-y-2">
                  {calculadoras.map((c) => (
                    <div key={c}>
                      <button
                        onClick={() => setCalcAbierta((x) => (x === c ? null : c))}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-gray-100 hover:bg-gray-50 text-sm text-gray-700"
                      >
                        {NOMBRES_CALCULADORAS[c]}
                        <ChevronDown size={15} className={`text-gray-500 transition-transform ${calcAbierta === c ? 'rotate-180' : ''}`} />
                      </button>
                      {calcAbierta === c && (
                        <div className="mt-2">
                          <Calculadora id={c} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {contenido && contenido.laboratorios.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <FlaskConical size={17} className="text-accent" /> Laboratorios prácticos
                </h3>
                <ol className="space-y-2">
                  {contenido.laboratorios.map((l, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="pt-0.5">{l}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-gray-600 mt-3">Los laboratorios se realizan en las sesiones prácticas con el relator.</p>
              </div>
            )}
            {contenido?.taller && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-semibold text-primary mb-1">{contenido.taller.titulo}</h3>
                <p className="text-sm text-gray-700 mb-3">{contenido.taller.descripcion}</p>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Entregables</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {contenido.taller.entregables.map((e, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" /> {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CONSULTAS ───────────────────────────────────────────────────────── */}
      {tab === 'consultas' && (
        <div className="space-y-4 max-w-3xl">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h3 className="font-semibold text-primary mb-1">Pregúntale al instructor</h3>
            <p className="text-sm text-gray-500 mb-3">Tus consultas sobre este módulo llegan al relator; recibirás la respuesta aquí.</p>
            <form onSubmit={enviarConsulta} className="space-y-3">
              <textarea
                value={consultaText}
                onChange={(e) => setConsultaText(e.target.value)}
                placeholder={actual ? `Ej.: tengo una duda sobre "${actual.titulo}"…` : 'Escribe tu pregunta…'}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                required
              />
              <button
                type="submit"
                disabled={enviandoConsulta || !consultaText.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover disabled:opacity-50"
              >
                <Send size={14} /> {enviandoConsulta ? 'Enviando…' : 'Enviar consulta'}
              </button>
            </form>
          </div>
          {consultas.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <MessageSquare size={32} className="text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No hay consultas para este módulo.</p>
            </div>
          ) : (
            consultas.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-600">{new Date(c.fecha).toLocaleDateString('es-CL')}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.estado === 'respondida' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                  >
                    {c.estado === 'respondida' ? 'Respondida' : 'Pendiente'}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{c.pregunta}</p>
                {c.respuesta && (
                  <div className="bg-blue-50 rounded-lg p-3 mt-2">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Respuesta del instructor:</p>
                    <p className="text-sm text-blue-800">{c.respuesta}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
