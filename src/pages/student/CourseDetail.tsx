import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, ChevronRight, Lock, CheckCircle, PlayCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getCurso, getProgreso } from '../../services/api';
import type { Curso, Progreso, Modulo } from '../../types';
import ProgressBar from '../../components/ui/ProgressBar';
import { modulosHabilitados } from '../../utils/evaluaciones';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

type ModuleStatus = 'bloqueado' | 'disponible' | 'en_progreso' | 'completado';

/** Un módulo está disponible sólo si el relator lo habilitó para el alumno. */
function getModuleStatus(modulo: Modulo, progreso: Progreso, habilitados: Set<string>): ModuleStatus {
  if (!habilitados.has(modulo.id)) return 'bloqueado';
  const completedSet = new Set(progreso.leccionesCompletadas);
  const allDone = modulo.lecciones.length > 0 && modulo.lecciones.every((l) => completedSet.has(l.id));
  if (allDone) return 'completado';
  return modulo.lecciones.some((l) => completedSet.has(l.id)) ? 'en_progreso' : 'disponible';
}

function getModuleProgress(modulo: Modulo, progreso: Progreso): number {
  if (modulo.lecciones.length === 0) return 0;
  const completedSet = new Set(progreso.leccionesCompletadas);
  const done = modulo.lecciones.filter((l) => completedSet.has(l.id)).length;
  return Math.round((done / modulo.lecciones.length) * 100);
}

const statusConfig: Record<ModuleStatus, { label: string; color: string; icon: React.ReactNode }> = {
  bloqueado: {
    label: 'Bloqueado',  // lo habilita el relator
    color: 'bg-gray-100 text-gray-500',
    icon: <Lock size={14} />,
  },
  disponible: {
    label: 'Disponible',
    color: 'bg-blue-50 text-blue-700',
    icon: <PlayCircle size={14} />,
  },
  en_progreso: {
    label: 'En progreso',
    color: 'bg-amber-100 text-amber-700',
    icon: <PlayCircle size={14} />,
  },
  completado: {
    label: 'Completado',
    color: 'bg-emerald-100 text-emerald-700',
    icon: <CheckCircle size={14} />,
  },
};

export default function CourseDetail() {
  const { cursoId } = useParams<{ cursoId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [curso, setCurso] = useState<Curso | null>(null);
  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !cursoId) return;
    Promise.all([getCurso(cursoId), getProgreso(user.id, cursoId)])
      .then(([c, p]) => {
        setCurso(c);
        setProgreso(p);
      })
      .catch(() => setError('Error al cargar el curso.'))
      .finally(() => setLoading(false));
  }, [user, cursoId]);

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-28" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  const habilitados = curso ? modulosHabilitados(user, curso) : new Set<string>();

  if (error || !curso || !progreso) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 max-w-3xl">
        {error ?? 'Curso no encontrado.'}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-primary rounded-xl p-6 text-white">
        <h1 className="text-xl font-bold mb-2">{curso.nombre}</h1>
        <p className="text-white/70 text-sm mb-4">{curso.descripcion}</p>
        <div className="flex items-center gap-4 text-sm text-white/80">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {curso.horasTotales} horas
          </span>
          <span className="bg-accent text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">
            {curso.modalidad}
          </span>
        </div>
        <div className="mt-4">
          <ProgressBar value={progreso.porcentaje} color="accent" size="md" sobreOscuro label="Avance del curso" />
        </div>
      </div>

      {/* Modules list */}
      <div className="space-y-3">
        <h2 className="font-semibold text-primary text-lg">Módulos del Curso</h2>
        <p className="text-sm text-gray-500 -mt-1">Tu relator habilita cada módulo cuando apruebas la evaluación del anterior.</p>
        {curso.modulos.map((modulo) => {
          const status = getModuleStatus(modulo, progreso, habilitados);
          const pct = getModuleProgress(modulo, progreso);
          const cfg = statusConfig[status];
          const isLocked = status === 'bloqueado';

          return (
            <button
              key={modulo.id}
              disabled={isLocked}
              onClick={() => !isLocked && navigate(`/app/modulos/${modulo.id}`)}
              className={[
                'w-full bg-white rounded-xl shadow-sm p-4 text-left transition-all',
                isLocked ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md cursor-pointer',
              ].join(' ')}
            >
              <div className="flex items-center gap-4">
                {/* Order badge */}
                <div
                  className={[
                    'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm',
                    status === 'completado'
                      ? 'bg-emerald-100 text-emerald-700'
                      : status === 'bloqueado'
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-primary/10 text-primary',
                  ].join(' ')}
                >
                  {modulo.orden}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-primary text-sm truncate pr-2">
                      {modulo.nombre}
                    </p>
                    <span
                      className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${cfg.color}`}
                    >
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {modulo.horas}h
                    </span>
                    <span>{modulo.lecciones.length} lecciones</span>
                  </div>
                  {!isLocked && <ProgressBar value={pct} size="sm" showLabel={false} />}
                </div>

                {!isLocked && (
                  <ChevronRight size={16} className="text-gray-500 shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
