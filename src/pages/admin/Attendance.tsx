import React, { useEffect, useState, useCallback } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { getAsistencia, guardarAsistencia, listarUsuarios, getCurso } from '../../services/api';
import type { User, Asistencia, Modulo } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { formatearRut } from '../../utils/rut';

type AttendanceMap = Record<string, Record<string, number>>; // userId → moduloId → pct

const Attendance: React.FC = () => {
  const { toast } = useToast();
  const [alumnos, setAlumnos] = useState<User[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<AttendanceMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [users, curso, asistenciaData] = await Promise.all([
        listarUsuarios({ rol: 'alumno' }),
        getCurso('curso-1'),
        getAsistencia({}),
      ]);
      setAlumnos(users);
      setModulos(curso.modulos.sort((a, b) => a.orden - b.orden));

      // Build map
      const map: AttendanceMap = {};
      for (const u of users) {
        map[u.id] = {};
        for (const m of curso.modulos) {
          const rec = asistenciaData.find(a => a.userId === u.id && a.moduloId === m.id);
          map[u.id][m.id] = rec?.porcentaje ?? 0;
        }
      }
      setAttendanceMap(map);
    } catch {
      toast('Error al cargar datos de asistencia.', 'error');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { void loadData(); }, [loadData]);

  const handleChange = (userId: string, moduloId: string, value: number) => {
    const clamped = Math.min(100, Math.max(0, value));
    setAttendanceMap((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [moduloId]: clamped },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const flat: Asistencia[] = [];
      for (const [userId, mods] of Object.entries(attendanceMap)) {
        for (const [moduloId, porcentaje] of Object.entries(mods)) {
          flat.push({ userId, moduloId, porcentaje });
        }
      }
      await guardarAsistencia(flat);
      toast('Asistencia guardada correctamente.', 'success');
    } catch {
      toast('Error al guardar asistencia.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Calculate per-user averages
  const promediosPorAlumno = alumnos.map((u) => {
    const vals = Object.values(attendanceMap[u.id] ?? {});
    const avg = vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { user: u, promedio: avg };
  });

  const bajoMinimo = promediosPorAlumno.filter(x => x.promedio < 75);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-6" />
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Asistencia</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Gestión de asistencia — {alumnos.length} alumno(s) · {modulos.length} módulo(s)
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
        >
          <Save size={15} />
          {saving ? 'Guardando…' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Alert: below 75% */}
      {bajoMinimo.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">
              {bajoMinimo.length} alumno(s) con asistencia promedio inferior al 75%:
            </p>
            <ul className="text-xs text-amber-700 flex flex-wrap gap-x-4 gap-y-0.5">
              {bajoMinimo.map(({ user, promedio }) => (
                <li key={user.id}>
                  {user.nombres} {user.apellidos} — {promedio.toFixed(0)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 sticky left-0 bg-gray-50 z-10 min-w-44">
                  Alumno
                </th>
                {modulos.map((m) => (
                  <th key={m.id} className="px-3 py-3 text-center text-xs font-semibold text-gray-600 min-w-28">
                    <span className="block max-w-24 mx-auto truncate" title={m.nombre}>
                      {m.nombre.length > 14 ? m.nombre.slice(0, 14) + '…' : m.nombre}
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 min-w-20">Promedio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alumnos.map((u) => {
                const avg = promediosPorAlumno.find(x => x.user.id === u.id)?.promedio ?? 0;
                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 sticky left-0 bg-white z-10">
                      <p className="text-sm font-medium text-gray-800">{u.nombres} {u.apellidos}</p>
                      <p className="text-xs text-gray-500">{formatearRut(u.rut)}</p>
                    </td>
                    {modulos.map((m) => {
                      const pct = attendanceMap[u.id]?.[m.id] ?? 0;
                      return (
                        <td key={m.id} className="px-3 py-2 text-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            aria-label={`Asistencia (%) de ${u.nombres} ${u.apellidos} en ${m.nombre}`}
                            value={pct}
                            onChange={(e) => handleChange(u.id, m.id, parseInt(e.target.value) || 0)}
                            className={`w-16 text-center border rounded-lg px-2 py-1 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors ${
                              pct < 75
                                ? 'border-red-300 bg-red-50 text-red-700'
                                : 'border-gray-200 text-gray-800'
                            }`}
                          />
                          <span className="text-xs text-gray-500 ml-0.5">%</span>
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center">
                      <span className={`text-sm font-bold ${avg < 75 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {avg.toFixed(0)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Las celdas en rojo indican asistencia inferior al 75% mínimo requerido.
      </p>
    </div>
  );
};

export default Attendance;
