import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Users, TrendingUp, CheckCircle2, Award, MessageSquare, Activity, Globe, Inbox, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMetricas, listarSolicitudes } from '../../services/api';
import { useSitio } from '../../context/SiteContext';
import { pendientesSitio } from '../../data/sitio';
import type { MetricasAdmin } from '../../types';
import { Skeleton } from '../../components/ui/Skeleton';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'var(--color-primary)' }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${color} 9%, transparent)` }}>
      <div style={{ color }}>{icon}</div>
    </div>
    <div>
      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-0.5">{value}</p>
    </div>
  </div>
);

const PIE_COLORS = ['#22c55e', '#ef4444'];

const AdminDashboard: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricasAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [solicitudesNuevas, setSolicitudesNuevas] = useState(0);
  const { sitio } = useSitio();

  useEffect(() => {
    listarSolicitudes().then((s) => setSolicitudesNuevas(s.filter((x) => x.estado === 'nueva').length)).catch(() => {});
  }, []);

  useEffect(() => {
    getMetricas()
      .then(setMetricas)
      .catch(() => setError('No se pudieron cargar las métricas.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">{error}</div>
      </div>
    );
  }

  if (!metricas) return null;

  const pendientes = pendientesSitio(sitio);

  const stats = [
    { title: 'Total Alumnos', value: metricas.totalAlumnos, icon: <Users size={22} />, color: 'var(--color-primary)' },
    { title: 'Alumnos Activos', value: metricas.alumnosActivos, icon: <Activity size={22} />, color: '#3b82f6' },
    { title: 'Promedio Avance', value: `${metricas.promedioAvance}%`, icon: <TrendingUp size={22} />, color: '#8b5cf6' },
    { title: 'Tasa Aprobación', value: `${metricas.tasaAprobacion}%`, icon: <CheckCircle2 size={22} />, color: '#22c55e' },
    { title: 'Certificados Emitidos', value: metricas.certificadosEmitidos, icon: <Award size={22} />, color: 'var(--color-accent)' },
    { title: 'Consultas Pendientes', value: metricas.consultasPendientes, icon: <MessageSquare size={22} />, color: '#ef4444' },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Link to="/admin/solicitudes" className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:border-primary/30">
          <span className="w-12 h-12 rounded-xl bg-accent/20 text-accent-ink flex items-center justify-center shrink-0"><Inbox size={22} aria-hidden="true" /></span>
          <span className="flex-1">
            <span className="block text-2xl font-bold text-gray-900">{solicitudesNuevas}</span>
            <span className="block text-sm text-gray-600">solicitudes de inscripción nuevas</span>
          </span>
          <ArrowRight size={18} className="text-gray-500 group-hover:text-primary" aria-hidden="true" />
        </Link>
        {pendientes.length > 0 ? (
          <Link to="/admin/sitio" className="group bg-amber-50 rounded-xl p-5 border border-amber-200 flex items-start gap-4 hover:border-amber-400">
            <span className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0"><Globe size={22} aria-hidden="true" /></span>
            <span className="flex-1">
              <span className="block font-semibold text-amber-950">Termina de configurar tu sitio web</span>
              <span className="block text-sm text-amber-900 mt-1">{pendientes.join(' · ')}</span>
            </span>
            <ArrowRight size={18} className="text-amber-700 mt-1" aria-hidden="true" />
          </Link>
        ) : (
          <Link to="/admin/sitio" className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4 hover:border-primary/30">
            <span className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0"><Globe size={22} aria-hidden="true" /></span>
            <span className="flex-1">
              <span className="block font-semibold text-gray-900">Sitio web listo</span>
              <span className="block text-sm text-gray-600">Edita textos, precios y colores cuando quieras.</span>
            </span>
            <ArrowRight size={18} className="text-gray-500 group-hover:text-primary" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Avance por módulo */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Avance Promedio por Módulo</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={metricas.avancePorModulo} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} fontSize={11} />
              <YAxis type="category" dataKey="modulo" width={80} fontSize={11} />
              <Tooltip formatter={(v) => [`${v}%`, 'Avance']} />
              <Bar dataKey="promedio" fill={sitio.marca.colorPrimario} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Aprobados vs Reprobados */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Aprobados vs Reprobados</h2>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={metricas.aprobadosVsReprobados}
                dataKey="valor"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label={(props: any) => `${props.nombre}: ${props.valor}`}
              >
                {metricas.aprobadosVsReprobados.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alumnos por mes */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Alumnos Nuevos por Mes</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={metricas.alumnosPorMes} margin={{ left: 0, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" fontSize={11} />
            <YAxis fontSize={11} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill={sitio.marca.colorAcento} radius={[4, 4, 0, 0]} name="Alumnos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
