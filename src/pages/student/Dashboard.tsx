import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, ArrowRight, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getProgreso,
  listarIntentos,
  listarCertificados,
  getAsistencia,
  getCurso,
} from '../../services/api';
import type { Progreso, Intento, Asistencia, Modulo } from '../../types';
import ProgressBar from '../../components/ui/ProgressBar';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 ${className ?? ''}`}>{children}</div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [intentos, setIntentos] = useState<Intento[]>([]);
  const [asistencia, setAsistencia] = useState<Asistencia[]>([]);
  const [nextModule, setNextModule] = useState<Modulo | null>(null);
  const [loading, setLoading] = useState(true);

  const todayStr = new Date().toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const firstName = user?.nombres?.split(' ')[0] ?? '';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? '¡Buen día' : hour < 20 ? '¡Buenas tardes' : '¡Buenas noches';

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getProgreso(user.id, 'curso-1'),
      listarIntentos(user.id),
      listarCertificados(user.id),
      getAsistencia({ userId: user.id }),
      getCurso('curso-1'),
    ])
      .then(([prog, ints, _certs, asist, curso]) => {
        setProgreso(prog);
        setIntentos(ints);
        setAsistencia(asist);
        // Find first incomplete module
        const completedSet = new Set(prog.leccionesCompletadas);
        const incomplete = curso.modulos.find(
          (m) => !m.lecciones.every((l) => completedSet.has(l.id)),
        );
        setNextModule(incomplete ?? null);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const asistenciaPromedio =
    asistencia.length > 0
      ? Math.round(asistencia.filter((a) => a.porcentaje > 0).reduce((acc, a) => acc + a.porcentaje, 0) /
          (asistencia.filter((a) => a.porcentaje > 0).length || 1))
      : 0;

  // Promedio de la mejor nota de cada evaluación calificada (módulos, parcial y final).
  // La diagnóstica y los simuladores SEC son de práctica y no promedian.
  const mejores = Object.values(
    intentos
      .filter((i) => i.evaluacionId.startsWith('eval-modulo') || i.evaluacionId === 'eval-parcial' || i.evaluacionId === 'eval-final')
      .reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.evaluacionId]: Math.max(acc[i.evaluacionId] ?? 0, i.nota) }), {}),
  );
  const notaFinal = mejores.length > 0 ? parseFloat((mejores.reduce((a, n) => a + n, 0) / mejores.length).toFixed(1)) : null;

  const ultimasNotas = [...intentos]
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 3);

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-10 w-72" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {greeting}, {firstName}!
        </h1>
        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5 capitalize">
          <Calendar size={14} />
          {todayStr}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Progress card */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Avance del Curso
          </h2>
          {progreso && (
            <>
              <ProgressBar value={progreso.porcentaje} color="primary" size="lg" />
              <p className="text-sm text-gray-500 mt-3">
                <span className="font-semibold text-primary">{progreso.horasCompletadas}</span> de{' '}
                <span className="font-semibold">240</span> horas completadas
              </p>
            </>
          )}
        </Card>

        {/* Continue card */}
        <Card className="flex flex-col justify-between">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Continúa donde quedaste
          </h2>
          {nextModule ? (
            <div>
              <p className="text-xs text-accent-ink font-semibold uppercase tracking-wide mb-1">
                Módulo {nextModule.orden}
              </p>
              <p className="font-semibold text-primary text-base mb-4">{nextModule.nombre}</p>
              <button
                onClick={() => navigate(`/app/modulos/${nextModule.id}`)}
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
              >
                Ir al módulo <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">¡Has completado todos los módulos!</p>
          )}
        </Card>

        {/* Last grades */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Últimas Evaluaciones
          </h2>
          {ultimasNotas.length === 0 ? (
            <p className="text-gray-500 text-sm">Sin evaluaciones rendidas aún.</p>
          ) : (
            <div className="space-y-2">
              {ultimasNotas.map((intento) => (
                <div
                  key={intento.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {intento.evaluacionId.replace('eval-', '').replace(/-/g, ' ')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(intento.fecha).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <span
                    className={[
                      'text-lg font-bold ml-4',
                      intento.aprobado ? 'text-emerald-600' : 'text-red-700',
                    ].join(' ')}
                  >
                    {intento.nota.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Certification requirements */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Requisitos de Certificación
          </h2>
          <div className="space-y-3">
            {/* Asistencia */}
            <div className="flex items-center gap-3">
              {asistenciaPromedio >= 75 ? (
                <CheckCircle size={20} className="text-emerald-500 shrink-0" />
              ) : (
                <XCircle size={20} className="text-red-400 shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">Asistencia mínima 75%</p>
                <p
                  className={`text-xs font-semibold ${
                    asistenciaPromedio >= 75 ? 'text-emerald-600' : 'text-red-700'
                  }`}
                >
                  {asistenciaPromedio}% actual
                </p>
              </div>
            </div>
            {/* Nota */}
            <div className="flex items-center gap-3">
              {notaFinal !== null && notaFinal >= 4.0 ? (
                <CheckCircle size={20} className="text-emerald-500 shrink-0" />
              ) : (
                <XCircle size={20} className="text-red-400 shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">Nota final mínima 4,0</p>
                <p
                  className={`text-xs font-semibold ${
                    notaFinal !== null && notaFinal >= 4.0 ? 'text-emerald-600' : 'text-red-700'
                  }`}
                >
                  {notaFinal !== null ? `${notaFinal.toFixed(1)} actual` : 'Sin nota aún'}
                </p>
              </div>
            </div>
            {/* Asistencia bar */}
            <div className="pt-1">
              <ProgressBar
                value={asistenciaPromedio}
                label="Asistencia promedio"
                color={asistenciaPromedio >= 75 ? 'success' : 'danger'}
                size="sm"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
