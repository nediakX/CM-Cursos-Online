import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Monitor, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listarCursos, getProgreso } from '../../services/api';
import type { Curso, Progreso } from '../../types';
import ProgressBar from '../../components/ui/ProgressBar';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 rounded-xl ${className ?? ''}`} />;
}

export default function Courses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    Promise.all([listarCursos(), getProgreso(user.id, 'curso-1')])
      .then(([cs, prog]) => {
        setCursos(cs);
        setProgreso(prog);
      })
      .catch(() => setError('Error al cargar los cursos. Intente nuevamente.'))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-52" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-primary">Mis Cursos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cursos.map((curso) => (
          <button
            key={curso.id}
            onClick={() => navigate(`/app/cursos/${curso.id}`)}
            className="bg-white rounded-xl shadow-sm p-5 text-left hover:shadow-md transition-shadow group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                <Monitor size={20} className="text-primary" />
              </div>
              <ArrowRight
                size={18}
                className="text-gray-500 group-hover:text-accent transition-colors mt-1"
              />
            </div>

            <h2 className="font-bold text-primary text-base mb-1 leading-tight">
              {curso.nombre}
            </h2>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{curso.descripcion}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Clock size={13} /> {curso.horasTotales}h
              </span>
              <span className="bg-accent/15 text-primary px-2 py-0.5 rounded-full font-medium">
                {curso.modalidad}
              </span>
            </div>

            {progreso && curso.id === 'curso-1' && (
              <ProgressBar value={progreso.porcentaje} color="primary" size="sm" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
