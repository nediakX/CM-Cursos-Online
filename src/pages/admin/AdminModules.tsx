import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Layers, Loader2, LockOpen, Search, Sparkles } from 'lucide-react';
import { getCurso, getHabilitacion, habilitarEvaluaciones, habilitarModulos, listarEvaluaciones, type FilaHabilitacion } from '../../services/api';
import type { Curso, Evaluacion } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { formatearRut } from '../../utils/rut';

type Vista = 'modulos' | 'evaluaciones';

/** Etiqueta corta de cada evaluación para las columnas de la tabla. */
function etiqueta(ev: Evaluacion, curso: Curso | null): string {
  if (ev.tipo === 'diagnostica') return 'Diag.';
  if (ev.tipo === 'modulo') return `M${curso?.modulos.find((m) => m.id === ev.moduloId)?.orden ?? ''}`;
  if (ev.tipo === 'parcial') return 'Parcial';
  if (ev.tipo === 'final') return 'Final';
  const n = ev.nombre.match(/\d+/)?.[0];
  return n ? `Sim. ${n}` : 'Sim.';
}

/**
 * Habilitación por alumno. Pestaña Módulos: qué módulos puede estudiar cada
 * alumno. Pestaña Evaluaciones: qué evaluaciones puede rendir; además, el
 * alumno debe cumplir los requisitos de avance de cada una.
 */
export default function AdminModules() {
  const { toast } = useToast();
  const [vista, setVista] = useState<Vista>('modulos');
  const [curso, setCurso] = useState<Curso | null>(null);
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [filas, setFilas] = useState<FilaHabilitacion[]>([]);
  const [marcasMod, setMarcasMod] = useState<Record<string, Set<string>>>({});
  const [marcasEv, setMarcasEv] = useState<Record<string, Set<string>>>({});
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      const [c, f, evs] = await Promise.all([getCurso('curso-1'), getHabilitacion(), listarEvaluaciones('curso-1')]);
      setCurso(c);
      setFilas(f);
      setEvaluaciones(evs);
      setMarcasMod(Object.fromEntries(f.map((x) => [x.userId, new Set(x.modulosHabilitados)])));
      setMarcasEv(Object.fromEntries(f.map((x) => [x.userId, new Set(x.evaluacionesHabilitadas)])));
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

  const distinto = (actual: Set<string> | undefined, original: string[]) =>
    !!actual && (actual.size !== original.length || original.some((id) => !actual.has(id)));
  const cambiosMod = filas.filter((f) => distinto(marcasMod[f.userId], f.modulosHabilitados));
  const cambiosEv = filas.filter((f) => distinto(marcasEv[f.userId], f.evaluacionesHabilitadas));
  const totalCambios = new Set([...cambiosMod, ...cambiosEv].map((f) => f.userId)).size;

  const alternar = (setter: typeof setMarcasMod, userId: string, id: string) =>
    setter((prev) => {
      const s = new Set(prev[userId]);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return { ...prev, [userId]: s };
    });

  /** Módulos: habilita el siguiente a cada alumno que aprobó la evaluación del anterior. */
  const habilitarSiguientes = () => {
    let n = 0;
    const nuevo: Record<string, Set<string>> = {};
    for (const f of filas) {
      const s = new Set(marcasMod[f.userId]);
      modulos.forEach((m, i) => {
        if (i > 0 && !s.has(m.id) && s.has(modulos[i - 1].id) && f.modulos[modulos[i - 1].id]?.aprobado) {
          s.add(m.id);
          n++;
        }
      });
      nuevo[f.userId] = s;
    }
    setMarcasMod(nuevo);
    toast(n ? `${n} módulo(s) marcados. Revisa y guarda los cambios.` : 'No hay alumnos con evaluaciones aprobadas pendientes de habilitar.', 'info');
  };

  /** Evaluaciones: habilita las que el alumno ya puede rendir por avance. */
  const habilitarListas = () => {
    let n = 0;
    const nuevo: Record<string, Set<string>> = {};
    for (const f of filas) {
      const s = new Set(marcasEv[f.userId]);
      for (const ev of evaluaciones) {
        if (!s.has(ev.id) && f.evaluaciones[ev.id]?.requisitos) {
          s.add(ev.id);
          n++;
        }
      }
      nuevo[f.userId] = s;
    }
    setMarcasEv(nuevo);
    toast(n ? `${n} evaluación(es) marcadas. Revisa y guarda los cambios.` : 'No hay alumnos que cumplan requisitos de evaluaciones aún no habilitadas.', 'info');
  };

  const guardar = async () => {
    setGuardando(true);
    try {
      for (const f of cambiosMod) await habilitarModulos(f.userId, modulos.map((m) => m.id).filter((id) => marcasMod[f.userId].has(id)));
      for (const f of cambiosEv) await habilitarEvaluaciones(f.userId, evaluaciones.map((e) => e.id).filter((id) => marcasEv[f.userId].has(id)));
      toast(`Cambios guardados (${totalCambios} alumno${totalCambios === 1 ? '' : 's'})`, 'success');
      await cargar();
    } catch {
      toast('No se pudieron guardar todos los cambios', 'error');
    } finally {
      setGuardando(false);
    }
  };

  const columnas =
    vista === 'modulos'
      ? modulos.map((m) => ({ id: m.id, titulo: `M${m.orden}`, descripcion: m.nombre }))
      : evaluaciones.map((e) => ({ id: e.id, titulo: etiqueta(e, curso), descripcion: e.nombre }));

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Habilitar módulos y evaluaciones</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            {vista === 'modulos'
              ? 'Marca los módulos que cada alumno puede estudiar. Cada casilla muestra el avance de lecciones y la nota de la evaluación del módulo.'
              : 'Marca las evaluaciones que cada alumno puede rendir. Además de habilitarla, el alumno debe cumplir sus requisitos (por ejemplo, completar las lecciones del módulo). "Listo" indica que ya los cumple.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={vista === 'modulos' ? habilitarSiguientes : habilitarListas}
            disabled={cargando}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
          >
            <Sparkles size={16} aria-hidden="true" />
            {vista === 'modulos' ? 'Habilitar siguiente a quienes aprobaron' : 'Habilitar las que ya cumplen requisitos'}
          </button>
          <button
            type="button"
            onClick={guardar}
            disabled={!totalCambios || guardando}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
          >
            {guardando ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <LockOpen size={16} aria-hidden="true" />}
            Guardar cambios{totalCambios ? ` (${totalCambios})` : ''}
          </button>
        </div>
      </div>

      <div className="flex gap-1 rounded-xl bg-gray-100 p-1 w-fit" role="tablist">
        {(
          [
            { id: 'modulos', label: 'Módulos', icon: <Layers size={15} aria-hidden="true" />, n: cambiosMod.length },
            { id: 'evaluaciones', label: 'Evaluaciones', icon: <ClipboardCheck size={15} aria-hidden="true" />, n: cambiosEv.length },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={vista === t.id}
            onClick={() => setVista(t.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${vista === t.id ? 'bg-white text-primary shadow-sm' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {t.icon} {t.label}
            {t.n > 0 && <span className="rounded-full bg-accent px-1.5 text-xs font-bold text-primary">{t.n}</span>}
          </button>
        ))}
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
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-200" /> Aprobada</span>
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
                {columnas.map((c) => (
                  <th key={c.id} scope="col" className="px-2 py-3 text-center whitespace-nowrap" title={c.descripcion}>{c.titulo}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibles.map((f) => (
                <tr key={f.userId} className={f.activo ? '' : 'opacity-50'}>
                  <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-2 text-left font-normal">
                    <Link to={`/admin/usuarios/${f.userId}`} className="font-medium text-primary hover:underline whitespace-nowrap">{f.nombre}</Link>
                    <span className="block text-xs text-gray-500">{formatearRut(f.rut)}</span>
                  </th>
                  {columnas.map((c) => {
                    const esMod = vista === 'modulos';
                    const d = esMod ? f.modulos[c.id] : f.evaluaciones[c.id];
                    const on = (esMod ? marcasMod : marcasEv)[f.userId]?.has(c.id) ?? false;
                    const fondo = d?.nota == null ? 'bg-white' : d.aprobado ? 'bg-emerald-50' : 'bg-red-50';
                    return (
                      <td key={c.id} className={`px-1 py-1 text-center ${fondo}`}>
                        <label className="flex cursor-pointer flex-col items-center gap-0.5 rounded-lg px-1 py-1 hover:bg-gray-100/60">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => alternar(esMod ? setMarcasMod : setMarcasEv, f.userId, c.id)}
                            className="h-4 w-4 accent-primary"
                            aria-label={`${c.descripcion} para ${f.nombre}`}
                          />
                          {esMod ? (
                            <span className="text-[11px] text-gray-500">{(d as FilaHabilitacion['modulos'][string] | undefined)?.avance ?? 0}%</span>
                          ) : (
                            <span className={`text-[11px] ${(d as FilaHabilitacion['evaluaciones'][string] | undefined)?.requisitos ? 'text-emerald-700 font-medium' : 'text-gray-400'}`}>
                              {(d as FilaHabilitacion['evaluaciones'][string] | undefined)?.requisitos ? 'Listo' : 'Pendiente'}
                            </span>
                          )}
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
