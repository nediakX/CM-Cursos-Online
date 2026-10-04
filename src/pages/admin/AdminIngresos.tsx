import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download, Loader2, ScanFace, KeyRound } from 'lucide-react';
import { listarIngresos, listarUsuarios, type Ingreso } from '../../services/api';
import type { User } from '../../types';
import { useToast } from '../../components/ui/Toast';
import Avatar from '../../components/Avatar';
import { formatearRut } from '../../utils/rut';
import { descargarCSV } from '../../utils/csv';

const dia = (iso: string) => new Date(iso).toLocaleDateString('es-CL', { timeZone: 'America/Santiago' });
const hora = (iso: string) => new Date(iso).toLocaleTimeString('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const aFecha = (d: Date) => d.toLocaleDateString('sv-SE', { timeZone: 'America/Santiago' }); // AAAA-MM-DD
const METODO: Record<Ingreso['metodo'], string> = { rostro: 'Verificación facial', contrasena: 'Sólo contraseña' };

/**
 * Registro automático de ingresos: cada vez que un alumno entra (verificando su
 * rostro, o con contraseña si no se le exige) queda la fecha y hora. Sirve como
 * respaldo de asistencia del curso online.
 */
export default function AdminIngresos() {
  const { toast } = useToast();
  const [alumnos, setAlumnos] = useState<User[]>([]);
  const [datos, setDatos] = useState<Record<string, Ingreso[]>>({});
  const [cargando, setCargando] = useState(true);
  const [abierto, setAbierto] = useState<string | null>(null);
  const hoy = new Date();
  const [desde, setDesde] = useState(aFecha(new Date(hoy.getFullYear(), hoy.getMonth(), 1)));
  const [hasta, setHasta] = useState(aFecha(hoy));

  useEffect(() => {
    Promise.all([listarUsuarios({ rol: 'alumno' }), listarIngresos()])
      .then(([u, ing]) => {
        setAlumnos(u.sort((a, b) => `${a.apellidos} ${a.nombres}`.localeCompare(`${b.apellidos} ${b.nombres}`)));
        setDatos(Object.fromEntries(ing.map((x) => [x.userId, x.ingresos])));
      })
      .catch(() => toast('No se pudo cargar el registro de ingresos', 'error'))
      .finally(() => setCargando(false));
  }, [toast]);

  const enRango = (iso: string) => {
    const f = aFecha(new Date(iso));
    return f >= desde && f <= hasta;
  };

  const filas = useMemo(
    () =>
      alumnos.map((u) => {
        const lista = (datos[u.id] ?? []).filter((i) => enRango(i.fecha)).sort((a, b) => b.fecha.localeCompare(a.fecha));
        const dias = new Set(lista.map((i) => aFecha(new Date(i.fecha))));
        return { u, lista, dias: dias.size, ultimo: (datos[u.id] ?? []).reduce<string | null>((m, i) => (!m || i.fecha > m ? i.fecha : m), null) };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [alumnos, datos, desde, hasta],
  );

  const exportar = () => {
    const detalle = filas.flatMap(({ u, lista }) =>
      lista.map((i) => ({
        Alumno: `${u.nombres} ${u.apellidos}`,
        RUT: formatearRut(u.rut),
        Fecha: dia(i.fecha),
        Hora: hora(i.fecha),
        Verificación: METODO[i.metodo],
        IP: i.ip ?? '',
      })),
    );
    if (!detalle.length) return toast('No hay ingresos en el período seleccionado', 'info');
    descargarCSV(detalle, `ingresos_${desde}_a_${hasta}.csv`);
  };

  const exportarResumen = () => {
    if (!filas.length) return;
    descargarCSV(
      filas.map(({ u, lista, dias, ultimo }) => ({
        Alumno: `${u.nombres} ${u.apellidos}`,
        RUT: formatearRut(u.rut),
        'Días con ingreso': dias,
        Ingresos: lista.length,
        'Con verificación facial': lista.filter((i) => i.metodo === 'rostro').length,
        'Último ingreso': ultimo ? `${dia(ultimo)} ${hora(ultimo)}` : '',
      })),
      `resumen_ingresos_${desde}_a_${hasta}.csv`,
    );
  };

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Registro de ingresos</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Cada ingreso de un alumno queda registrado con fecha y hora, y si verificó su rostro. Úsalo como respaldo de asistencia del curso online.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={exportarResumen} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} aria-hidden="true" /> Resumen (CSV)
          </button>
          <button type="button" onClick={exportar} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover">
            <Download size={16} aria-hidden="true" /> Detalle (CSV)
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm text-gray-700">
          Desde
          <input type="date" value={desde} max={hasta} onChange={(e) => setDesde(e.target.value)} className="mt-1 block rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm text-gray-700">
          Hasta
          <input type="date" value={hasta} min={desde} onChange={(e) => setHasta(e.target.value)} className="mt-1 block rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </label>
      </div>

      {cargando ? (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 size={18} className="animate-spin" /> Cargando…
        </div>
      ) : alumnos.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm">Aún no hay alumnos.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3">Alumno</th>
                <th scope="col" className="px-4 py-3 text-center">Días con ingreso</th>
                <th scope="col" className="px-4 py-3 text-center">Ingresos</th>
                <th scope="col" className="px-4 py-3">Último ingreso</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Detalle</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filas.map(({ u, lista, dias, ultimo }) => (
                <Fragment key={u.id}>
                  <tr className={u.activo ? '' : 'opacity-50'}>
                    <td className="px-4 py-2.5">
                      <Link to={`/admin/usuarios/${u.id}`} className="flex items-center gap-2.5 hover:underline">
                        <Avatar usuario={u} size={32} />
                        <span>
                          <span className="block font-medium text-primary">{u.nombres} {u.apellidos}</span>
                          <span className="block text-xs text-gray-500">{formatearRut(u.rut)}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-center font-semibold text-gray-800">{dias}</td>
                    <td className="px-4 py-2.5 text-center text-gray-700">{lista.length}</td>
                    <td className="px-4 py-2.5 text-gray-700">{ultimo ? `${dia(ultimo)} · ${hora(ultimo)}` : <span className="text-gray-400">Nunca</span>}</td>
                    <td className="px-4 py-2.5 text-right">
                      {lista.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setAbierto(abierto === u.id ? null : u.id)}
                          aria-expanded={abierto === u.id}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-primary hover:bg-gray-100"
                        >
                          {abierto === u.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />} Ver detalle
                        </button>
                      )}
                    </td>
                  </tr>
                  {abierto === u.id && (
                    <tr>
                      <td colSpan={5} className="bg-gray-50 px-4 py-3">
                        <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                          {lista.map((i) => (
                            <li key={i.fecha} className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs text-gray-700 border border-gray-100">
                              {i.metodo === 'rostro' ? <ScanFace size={14} className="text-emerald-600" aria-label="Verificación facial" /> : <KeyRound size={14} className="text-amber-600" aria-label="Sólo contraseña" />}
                              {dia(i.fecha)} · {hora(i.fecha)}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
