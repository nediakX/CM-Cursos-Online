import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, LockOpen, Search, Sparkles } from 'lucide-react';
import { getCurso, getHabilitacion, habilitarModulos, type FilaHabilitacion } from '../../services/api';
import type { Curso } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { formatearRut } from '../../utils/rut';

/**
 * Habilitación de módulos por alumno. El relator ve el avance y la nota de la
 * evaluación de cada módulo, y decide qué módulos puede estudiar cada alumno.
 */
export default function AdminModules() {
  const { toast } = useToast();
  const [curso, setCurso] = useState<Curso | null>(null);
  const [filas, setFilas] = useState<FilaHabilitacion[]>([]);
  const [marcas, setMarcas] = useState<Record<string, Set<string>>>({});
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const [c, f] = await Promise.all([getCurso('curso-1'), getHabilitacion()]);
      setCurso(c);
      setFilas(f);
      setMarcas(Object.fromEntries(f.map((x) => [x.userId, new Set(x.modulosHabilitados)])));
    } catch {
      toast('No se pudo cargar la información', 'error');
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    void cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modulos = useMemo(() => [...(curso?.modulos ?? [])].sort((a, b) => a.orden - b.orden), [curso]);
  const visibles = filas.filter((f) => !busqueda || `${f.nombre} ${f.rut}`.toLowerCase().includes(busqueda.toLowerCase()));
  const cambiados = filas.filter((f) => {
    const m = marcas[f.userId];
    return m && (m.size !== f.modulosHabilitados.length || f.modulosHabilitados.some((id) => !m.has(id)));
  });

  const alternar = (userId: string, moduloId: string) =>
    setMarcas((prev) => {
      const s = new Set(prev[userId]);
      if (s.has(moduloId)) s.delete(moduloId);
      else s.add(moduloId);
      return { ...prev, [userId]: s };
    });

  /** Para cada alumno, habilita el módulo siguiente al último que aprobó. */
  const habilitarSiguientes = () => {
    let n = 0;
    const nuevo: Record<string, Set<string>> = {};
    for (const f of filas) {
      const s = new Set(marcas[f.userId]);
      modulos.forEach((m, i) => {
        if (i > 0 && !s.has(m.id) && s.has(modulos[i - 1].id) && f.modulos[modulos[i - 1].id]?.aprobado) {
          s.add(m.id);
          n++;
        }
      });
      nuevo[f.userId] = s;
    }
    setMarcas(nuevo);
    toast(n ? `${n} módulo(s) marcados. Revisa y guarda los cambios.` : 'No hay alumnos con evaluaciones aprobadas pendientes de habilitar.', 'info');
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      for (const f of cambiados) {
        const orden = modulos.map((m) => m.id).filter((id) => marcas[f.userId].has(id));
        await habilitarModulos(f.userId, orden);
      }
      toast(`Cambios guardados (${cambiados.length} alumno${cambiados.length === 1 ? '' : 's'})`, 'success');
      await cargar();
    } catch {
      toast('No se pudieron guardar todos los cambios', 'error');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Habilitar módulos</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Marca los módulos que cada alumno puede estudiar. Cada casilla muestra el avance de lecciones y la nota de la evaluación del módulo. Las
            evaluaciones se abren sólo cuando el alumno completa todas las lecciones.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={habilitarSiguientes}
            disabled={cargando}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
          >
            <Sparkles size={16} aria-hidden="true" /> Habilitar siguiente a quienes aprobaron
          </button>
          <button
            type="button"
            onClick={guardar}
            disabled={!cambiados.length || guardando}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
          >
            {guardando ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <LockOpen size={16} aria-hidden="true" />}
            Guardar cambios{cambiados.length ? ` (${cambiados.length})` : ''}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
        <label className="relative">
          <span className="sr-only">Buscar alumno</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o RUT"
            className="w-64 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm"
          />
        </label>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-200" /> Evaluación aprobada</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-red-200" /> Reprobada</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-gray-300 bg-white" /> Sin rendir</span>
      </div>

      {cargando ? (
        <div className="flex items-center gap-2 text-gray-500"><Loader2 size={18} className="animate-spin" /> Cargando…</div>
      ) : filas.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">Aún no hay alumnos. Créalos en Usuarios.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-gray-50 px-4 py-3 text-left">Alumno</th>
                {modulos.map((m) => (
                  <th key={m.id} scope="col" className="px-2 py-3 text-center" title={m.nombre}>M{m.orden}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibles.map((f) => (
                <tr key={f.userId} className={f.activo ? '' : 'opacity-50'}>
                  <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-2 text-left font-normal">
                    <Link to={`/admin/usuarios/${f.userId}`} className="font-medium text-primary hover:underline">{f.nombre}</Link>
                    <span className="block text-xs text-gray-500">{formatearRut(f.rut)}</span>
                  </th>
                  {modulos.map((m) => {
                    const d = f.modulos[m.id];
                    const on = marcas[f.userId]?.has(m.id) ?? false;
                    const fondo = d?.nota == null ? 'bg-white' : d.aprobado ? 'bg-emerald-50' : 'bg-red-50';
                    return (
                      <td key={m.id} className={`px-1 py-1 text-center ${fondo}`}>
                        <label className="flex cursor-pointer flex-col items-center gap-0.5 rounded-lg px-1 py-1 hover:bg-gray-100/60">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => alternar(f.userId, m.id)}
                            className="h-4 w-4 accent-primary"
                            aria-label={`Módulo ${m.orden} para ${f.nombre}`}
                          />
                          <span className="text-[11px] text-gray-500">{d?.avance ?? 0}%</span>
                          {d?.nota != null && (
                            <span className={`text-[11px] font-semibold ${d.aprobado ? 'text-emerald-700' : 'text-red-700'}`}>{d.nota.toFixed(1)}</span>
                          )}
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
