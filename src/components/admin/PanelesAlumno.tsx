import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Image as ImageIcon, Loader2, Lock, LockOpen, RotateCcw, ScanFace, Trash2, Upload } from 'lucide-react';
import type { Curso, Evaluacion, User } from '../../types';
import {
  borrarFoto,
  borrarRostroAlumno,
  editarUsuario,
  getFoto,
  getHabilitacion,
  habilitarEvaluaciones,
  habilitarModulos,
  listarEvaluaciones,
  registrarRostroAlumno,
  subirFoto,
  type FilaHabilitacion,
} from '../../services/api';
import { useToast } from '../ui/Toast';
import Avatar from '../Avatar';

// ---------------------------------------------------------------------------
// Módulos habilitados para un alumno
// ---------------------------------------------------------------------------
export function ModulosAlumnoPanel({ usuario, curso, onCambio }: { usuario: User; curso: Curso; onCambio: (u: User) => void }) {
  const { toast } = useToast();
  const [fila, setFila] = useState<FilaHabilitacion | null>(null);
  const [marcados, setMarcados] = useState<Set<string>>(new Set());
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    getHabilitacion()
      .then((filas) => {
        const f = filas.find((x) => x.userId === usuario.id) ?? null;
        setFila(f);
        setMarcados(new Set(f?.modulosHabilitados ?? []));
      })
      .catch(() => toast('No se pudo cargar el avance del alumno', 'error'));
  }, [usuario.id, toast]);

  if (!fila) return <div className="p-5 text-sm text-gray-500">Cargando…</div>;

  const modulos = [...curso.modulos].sort((a, b) => a.orden - b.orden);
  const original = new Set(fila.modulosHabilitados);
  const cambiado = marcados.size !== original.size || [...marcados].some((m) => !original.has(m));
  // Siguiente módulo sugerido: el primero no habilitado cuyo anterior ya está aprobado.
  const sugerido = modulos.find((m, i) => !marcados.has(m.id) && i > 0 && fila.modulos[modulos[i - 1].id]?.aprobado);

  const alternar = (id: string) =>
    setMarcados((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });

  const guardar = async () => {
    setGuardando(true);
    try {
      const orden = modulos.map((m) => m.id).filter((id) => marcados.has(id));
      const u = await habilitarModulos(usuario.id, orden);
      setFila({ ...fila, modulosHabilitados: orden });
      onCambio(u);
      toast('Módulos actualizados', 'success');
    } catch {
      toast('No se pudieron guardar los módulos', 'error');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-semibold text-gray-800">Módulos habilitados</h2>
          <p className="text-sm text-gray-500">El alumno sólo puede estudiar los módulos marcados. Revisa su avance y la nota de cada evaluación antes de habilitar el siguiente.</p>
        </div>
        {sugerido && (
          <button
            type="button"
            onClick={() => alternar(sugerido.id)}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
          >
            <LockOpen size={16} aria-hidden="true" /> Habilitar Módulo {sugerido.orden}
          </button>
        )}
      </div>
      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
        {modulos.map((m) => {
          const d = fila.modulos[m.id];
          const on = marcados.has(m.id);
          return (
            <li key={m.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <label className="flex flex-1 min-w-[220px] items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={on} onChange={() => alternar(m.id)} className="h-4 w-4 accent-primary" />
                {on ? <LockOpen size={16} className="text-emerald-600" aria-hidden="true" /> : <Lock size={16} className="text-gray-400" aria-hidden="true" />}
                <span className="text-sm text-gray-800">
                  <span className="font-semibold">M{m.orden}</span> {m.nombre}
                </span>
              </label>
              <div className="flex items-center gap-2 w-40">
                <div className="h-2 flex-1 rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${d?.avance ?? 0}%` }} />
                </div>
                <span className="w-10 text-right text-xs text-gray-600">{d?.avance ?? 0}%</span>
              </div>
              <span
                className={`w-28 text-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  d?.nota == null ? 'bg-gray-100 text-gray-500' : d.aprobado ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                }`}
              >
                {d?.nota == null ? 'Sin evaluación' : `Nota ${d.nota.toFixed(1)}`}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={guardar}
          disabled={!cambiado || guardando}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
        >
          {guardando && <Loader2 size={16} className="animate-spin" aria-hidden="true" />} Guardar cambios
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Evaluaciones habilitadas para un alumno
// ---------------------------------------------------------------------------
export function EvaluacionesAlumnoPanel({ usuario, onCambio }: { usuario: User; onCambio: (u: User) => void }) {
  const { toast } = useToast();
  const [evs, setEvs] = useState<Evaluacion[]>([]);
  const [fila, setFila] = useState<FilaHabilitacion | null>(null);
  const [marcadas, setMarcadas] = useState<Set<string>>(new Set());
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    Promise.all([listarEvaluaciones('curso-1'), getHabilitacion()])
      .then(([e, filas]) => {
        setEvs(e);
        const f = filas.find((x) => x.userId === usuario.id) ?? null;
        setFila(f);
        setMarcadas(new Set(f?.evaluacionesHabilitadas ?? []));
      })
      .catch(() => toast('No se pudieron cargar las evaluaciones', 'error'));
  }, [usuario.id, toast]);

  if (!fila) return null;
  const original = new Set(fila.evaluacionesHabilitadas);
  const cambiado = marcadas.size !== original.size || [...marcadas].some((m) => !original.has(m));
  const listas = evs.filter((e) => !marcadas.has(e.id) && fila.evaluaciones[e.id]?.requisitos);

  const alternar = (id: string) =>
    setMarcadas((prev) => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id);
      else s.add(id);
      return s;
    });

  const guardar = async () => {
    setGuardando(true);
    try {
      const orden = evs.map((e) => e.id).filter((id) => marcadas.has(id));
      const u = await habilitarEvaluaciones(usuario.id, orden);
      setFila({ ...fila, evaluacionesHabilitadas: orden });
      onCambio(u);
      toast('Evaluaciones actualizadas', 'success');
    } catch {
      toast('No se pudieron guardar las evaluaciones', 'error');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="p-5 border-t border-gray-100">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-semibold text-gray-800">Evaluaciones habilitadas</h2>
          <p className="text-sm text-gray-500">El alumno sólo puede rendir las evaluaciones marcadas, y sólo cuando cumple sus requisitos de avance.</p>
        </div>
        {listas.length > 0 && (
          <button
            type="button"
            onClick={() => setMarcadas((prev) => new Set([...prev, ...listas.map((e) => e.id)]))}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
          >
            <LockOpen size={16} aria-hidden="true" /> Habilitar las que ya cumplen requisitos ({listas.length})
          </button>
        )}
      </div>
      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200">
        {evs.map((e) => {
          const d = fila.evaluaciones[e.id];
          const on = marcadas.has(e.id);
          return (
            <li key={e.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
              <label className="flex flex-1 min-w-[220px] items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={on} onChange={() => alternar(e.id)} className="h-4 w-4 accent-primary" />
                {on ? <LockOpen size={16} className="text-emerald-600" aria-hidden="true" /> : <Lock size={16} className="text-gray-400" aria-hidden="true" />}
                <span className="text-sm text-gray-800">{e.nombre}</span>
              </label>
              <span className={`w-36 text-xs ${d?.requisitos ? 'text-emerald-700 font-medium' : 'text-gray-500'}`}>
                {d?.requisitos ? 'Cumple requisitos' : 'Requisitos pendientes'}
              </span>
              <span
                className={`w-28 text-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  d?.nota == null ? 'bg-gray-100 text-gray-500' : d.aprobado ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'
                }`}
              >
                {d?.nota == null ? 'Sin rendir' : `Nota ${d.nota.toFixed(1)}`}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={guardar}
          disabled={!cambiado || guardando}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
        >
          {guardando && <Loader2 size={16} className="animate-spin" aria-hidden="true" />} Guardar evaluaciones
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Fotografía y verificación facial
// ---------------------------------------------------------------------------
export function IdentidadPanel({ usuario, onCambio }: { usuario: User; onCambio: (u: User) => void }) {
  const { toast } = useToast();
  const [foto, setFoto] = useState<string | null>(null);
  const [trabajando, setTrabajando] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let vivo = true;
    if (usuario.tieneFoto) getFoto(usuario.id).then((f) => vivo && setFoto(f));
    else setFoto(null);
    return () => {
      vivo = false;
    };
  }, [usuario.id, usuario.tieneFoto]);

  const conTrabajo = async (etiqueta: string, fn: () => Promise<void>) => {
    setTrabajando(etiqueta);
    try {
      await fn();
    } catch {
      toast('No se pudo completar la acción', 'error');
    } finally {
      setTrabajando(null);
    }
  };

  const elegirFoto = (archivo: File | undefined) => {
    if (!archivo) return;
    void conTrabajo('foto', async () => {
      const { cargarImagen, capturarFoto, describirRostro } = await import('../../services/rostro');
      const img = await cargarImagen(archivo);
      const recorte = capturarFoto(img, 320);
      const r = await describirRostro(img);
      if (r.ok) {
        const u = await registrarRostroAlumno(usuario.id, r.descriptor, recorte);
        onCambio(u);
        setFoto(recorte);
        toast('Fotografía guardada y rostro registrado', 'success');
      } else {
        const u = await subirFoto(usuario.id, recorte);
        onCambio(u);
        setFoto(recorte);
        toast('Fotografía guardada, pero no se detectó un rostro claro: el alumno deberá registrarlo con su cámara.', 'warning');
      }
    });
  };

  const exige = usuario.requiereRostro !== false;

  return (
    <div className="p-5 grid gap-6 md:grid-cols-[200px_1fr]">
      <div className="flex flex-col items-center gap-3">
        <Avatar usuario={usuario} foto={foto} size={160} forma="cuadrado" />
        <input ref={inputRef} type="file" accept="image/*" className="sr-only" onChange={(e) => elegirFoto(e.target.files?.[0])} aria-label="Elegir fotografía" />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={!!trabajando}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
        >
          {trabajando === 'foto' ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Upload size={16} aria-hidden="true" />}
          {foto ? 'Cambiar fotografía' : 'Subir fotografía'}
        </button>
        {foto && (
          <button
            type="button"
            disabled={!!trabajando}
            onClick={() =>
              conTrabajo('borrar-foto', async () => {
                onCambio(await borrarFoto(usuario.id));
                setFoto(null);
                toast('Fotografía eliminada', 'success');
              })
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <Trash2 size={16} aria-hidden="true" /> Quitar fotografía
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <ImageIcon size={18} aria-hidden="true" /> Fotografía y verificación facial
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            La fotografía te permite reconocer al alumno. Si subes una foto con su rostro visible, también queda registrada para la verificación facial al
            iniciar sesión.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 p-4 flex flex-wrap items-center gap-3">
          <ScanFace size={20} className={usuario.rostroRegistrado ? 'text-emerald-600' : 'text-gray-400'} aria-hidden="true" />
          <div className="flex-1 min-w-[200px]">
            <p className="text-sm font-medium text-gray-800">{usuario.rostroRegistrado ? 'Rostro registrado' : 'Rostro sin registrar'}</p>
            <p className="text-xs text-gray-500">
              {usuario.rostroRegistrado ? 'El alumno debe verificar su rostro en cada ingreso.' : 'Se le pedirá registrarlo con la cámara en su próximo ingreso.'}
            </p>
          </div>
          {usuario.rostroRegistrado && (
            <button
              type="button"
              disabled={!!trabajando}
              onClick={() =>
                conTrabajo('rostro', async () => {
                  onCambio(await borrarRostroAlumno(usuario.id));
                  toast('Rostro restablecido: el alumno lo registrará de nuevo al entrar', 'success');
                })
              }
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <RotateCcw size={16} aria-hidden="true" /> Restablecer rostro
            </button>
          )}
        </div>

        <label className="rounded-xl border border-gray-200 p-4 flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={exige}
            disabled={!!trabajando}
            onChange={(e) =>
              conTrabajo('exige', async () => {
                onCambio(await editarUsuario(usuario.id, { requiereRostro: e.target.checked }));
              })
            }
            className="mt-1 h-4 w-4 accent-primary"
          />
          <span>
            <span className="block text-sm font-medium text-gray-800">Exigir verificación facial al iniciar sesión</span>
            <span className="block text-xs text-gray-500">
              Desactívalo sólo si el alumno no tiene cámara o el reconocimiento no funciona en su equipo.
              {exige ? '' : ' Actualmente el alumno entra sólo con su contraseña.'}
            </span>
          </span>
          {exige && <CheckCircle2 size={18} className="ml-auto text-emerald-600 shrink-0" aria-hidden="true" />}
        </label>
      </div>
    </div>
  );
}
