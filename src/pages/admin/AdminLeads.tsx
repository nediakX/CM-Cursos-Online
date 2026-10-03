import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Download, Inbox, Mail, Search, Trash2, UserPlus } from 'lucide-react';
import Papa from 'papaparse';
import { crearUsuario, editarSolicitud, eliminarSolicitud, listarSolicitudes } from '../../services/api';
import { useSitio } from '../../context/SiteContext';
import { useToast } from '../../components/ui/Toast';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Modal from '../../components/ui/Modal';
import { enlaceWhatsapp, IconoWhatsapp } from '../../components/landing/RedesIconos';
import { formatFechaHoraCL, formatearRut, validarRut } from '../../utils/rut';
import type { EstadoSolicitud, Solicitud } from '../../types';

const ESTADOS: { id: EstadoSolicitud; label: string; cls: string }[] = [
  { id: 'nueva', label: 'Nueva', cls: 'bg-blue-100 text-blue-800' },
  { id: 'contactada', label: 'Contactada', cls: 'bg-amber-100 text-amber-900' },
  { id: 'inscrita', label: 'Inscrita', cls: 'bg-emerald-100 text-emerald-800' },
  { id: 'descartada', label: 'Descartada', cls: 'bg-gray-200 text-gray-700' },
];
const estadoInfo = (e: EstadoSolicitud) => ESTADOS.find((x) => x.id === e) ?? ESTADOS[0];

const passwordTemporal = () => `Cm${Math.random().toString(36).slice(2, 8)}${Math.floor(Math.random() * 90 + 10)}!`;

export default function AdminLeads() {
  const { sitio } = useSitio();
  const { toast } = useToast();
  const [items, setItems] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState<EstadoSolicitud | 'todas'>('todas');
  const [q, setQ] = useState('');
  const [borrar, setBorrar] = useState<Solicitud | null>(null);
  const [credenciales, setCredenciales] = useState<{ nombre: string; rut: string; password: string } | null>(null);

  const cargar = () =>
    listarSolicitudes()
      .then(setItems)
      .catch(() => toast('No se pudieron cargar las solicitudes', 'error'))
      .finally(() => setCargando(false));

  useEffect(() => {
    void cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const planNombre = (id?: string) => sitio.planes.find((p) => p.id === id)?.nombre ?? (id ? id : '—');

  const visibles = useMemo(() => {
    const t = q.trim().toLowerCase();
    return items.filter(
      (s) => (filtro === 'todas' || s.estado === filtro) && (!t || `${s.nombre} ${s.email} ${s.telefono} ${s.rut ?? ''}`.toLowerCase().includes(t)),
    );
  }, [items, filtro, q]);

  const conteo = (e: EstadoSolicitud) => items.filter((s) => s.estado === e).length;

  const actualizar = async (s: Solicitud, data: Partial<Solicitud>) => {
    try {
      const n = await editarSolicitud(s.id, data);
      setItems((xs) => xs.map((x) => (x.id === s.id ? n : x)));
    } catch {
      toast('No se pudo actualizar', 'error');
    }
  };

  const crearCuenta = async (s: Solicitud) => {
    if (!s.rut || !validarRut(s.rut)) return toast('La solicitud no tiene un RUT válido. Crea la cuenta desde Usuarios.', 'error');
    const [nombres, ...resto] = s.nombre.trim().split(/\s+/);
    const password = passwordTemporal();
    try {
      const u = await crearUsuario({
        rut: s.rut, nombres, apellidos: resto.join(' '), email: s.email, telefono: s.telefono,
        rol: 'alumno', activo: true, debeCambiarPassword: true, cursosAsignados: ['curso-1'], password,
      });
      await actualizar(s, { estado: 'inscrita', userId: u.id });
      setCredenciales({ nombre: s.nombre, rut: formatearRut(s.rut), password });
    } catch (e) {
      toast(e instanceof Error && e.message === 'RUT_DUPLICADO' ? 'Ya existe un usuario con ese RUT.' : 'No se pudo crear la cuenta', 'error');
    }
  };

  const exportar = () => {
    const csv = Papa.unparse(
      visibles.map((s) => ({
        Fecha: formatFechaHoraCL(s.fecha), Nombre: s.nombre, Correo: s.email, Teléfono: s.telefono, RUT: s.rut ? formatearRut(s.rut) : '',
        Plan: planNombre(s.planId), Estado: estadoInfo(s.estado).label, Mensaje: s.mensaje ?? '', Notas: s.notas ?? '',
      })),
    );
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `solicitudes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const mensajeAcceso = credenciales
    ? `Hola ${credenciales.nombre.split(' ')[0]}, ya tienes acceso al curso. Ingresa en ${window.location.origin}/login con tu RUT ${credenciales.rut} y la contraseña temporal ${credenciales.password}. Te pediremos cambiarla al entrar.`
    : '';

  return (
    <div className="p-4 sm:p-6 max-w-6xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-primary">Solicitudes de inscripción</h1>
          <p className="text-sm text-gray-600 mt-1">Personas que dejaron sus datos en la página del curso.</p>
        </div>
        <button type="button" onClick={exportar} disabled={!visibles.length} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-800 hover:bg-gray-50 disabled:opacity-50">
          <Download size={16} aria-hidden="true" /> Exportar CSV
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por estado">
          <button type="button" aria-pressed={filtro === 'todas'} onClick={() => setFiltro('todas')} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filtro === 'todas' ? 'bg-primary text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
            Todas ({items.length})
          </button>
          {ESTADOS.map((e) => (
            <button key={e.id} type="button" aria-pressed={filtro === e.id} onClick={() => setFiltro(e.id)} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filtro === e.id ? 'bg-primary text-white' : 'bg-white border border-gray-300 text-gray-700'}`}>
              {e.label} ({conteo(e.id)})
            </button>
          ))}
        </div>
        <div className="relative md:ml-auto md:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <label htmlFor="buscar-sol" className="sr-only">Buscar solicitudes</label>
          <input id="buscar-sol" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar nombre, correo, RUT…" className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      {cargando ? (
        <p className="text-gray-600" role="status">Cargando…</p>
      ) : visibles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
          <Inbox size={36} className="mx-auto text-gray-500" aria-hidden="true" />
          <p className="mt-3 font-semibold text-gray-800">{items.length ? 'No hay solicitudes con ese filtro' : 'Aún no hay solicitudes'}</p>
          <p className="text-sm text-gray-600 mt-1">
            Comparte tu <Link to="/" className="text-primary underline">página del curso</Link> para empezar a recibir interesados.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {visibles.map((s) => {
            const est = estadoInfo(s.estado);
            return (
              <li key={s.id} className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-gray-900">{s.nombre}</h2>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${est.cls}`}>{est.label}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {formatFechaHoraCL(s.fecha)} · Plan: {planNombre(s.planId)}
                      {s.rut && <> · RUT {formatearRut(s.rut)}</>}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 text-primary hover:underline"><Mail size={14} aria-hidden="true" />{s.email}</a>
                      <a href={enlaceWhatsapp(s.telefono.startsWith('9') ? `56${s.telefono}` : s.telefono, `Hola ${s.nombre.split(' ')[0]}, te escribimos de ${sitio.marca.nombre} por tu interés en el curso.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#187a41] hover:underline">
                        <IconoWhatsapp size={14} />{s.telefono}<span className="sr-only"> (WhatsApp, pestaña nueva)</span>
                      </a>
                    </div>
                    {s.mensaje && <p className="mt-3 text-sm text-gray-700 bg-gray-50 rounded-xl px-3 py-2">“{s.mensaje}”</p>}
                    <label htmlFor={`nota-${s.id}`} className="sr-only">Notas internas de {s.nombre}</label>
                    <textarea
                      id={`nota-${s.id}`}
                      defaultValue={s.notas ?? ''}
                      onBlur={(e) => e.target.value !== (s.notas ?? '') && actualizar(s, { notas: e.target.value })}
                      placeholder="Notas internas (se guardan al salir del campo)"
                      rows={1}
                      className="mt-3 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                    />
                  </div>
                  <div className="flex lg:flex-col gap-2 shrink-0 lg:w-48">
                    <label htmlFor={`est-${s.id}`} className="sr-only">Estado de {s.nombre}</label>
                    <select id={`est-${s.id}`} value={s.estado} onChange={(e) => actualizar(s, { estado: e.target.value as EstadoSolicitud })} className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                      {ESTADOS.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                    </select>
                    {s.userId ? (
                      <Link to={`/admin/usuarios/${s.userId}`} className="flex-1 text-center px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-medium hover:bg-emerald-100">Ver alumno</Link>
                    ) : (
                      <button type="button" onClick={() => crearCuenta(s)} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover">
                        <UserPlus size={16} aria-hidden="true" /> Crear alumno
                      </button>
                    )}
                    <button type="button" onClick={() => setBorrar(s)} className="p-2 rounded-xl text-red-700 hover:bg-red-50 self-center" aria-label={`Eliminar solicitud de ${s.nombre}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        isOpen={!!borrar}
        onClose={() => setBorrar(null)}
        onConfirm={async () => {
          if (!borrar) return;
          try {
            await eliminarSolicitud(borrar.id);
            setItems((xs) => xs.filter((x) => x.id !== borrar.id));
          } catch {
            toast('No se pudo eliminar', 'error');
          }
          setBorrar(null);
        }}
        title="Eliminar solicitud"
        message={`¿Eliminar la solicitud de ${borrar?.nombre ?? ''}? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
      />

      <Modal isOpen={!!credenciales} onClose={() => setCredenciales(null)} title="Cuenta creada">
        {credenciales && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700">Comparte estos datos de acceso con <strong>{credenciales.nombre}</strong>. Deberá cambiar la contraseña al ingresar.</p>
            <dl className="rounded-xl bg-gray-50 p-4 text-sm space-y-1">
              <div className="flex gap-2"><dt className="text-gray-600 w-40">RUT:</dt><dd className="font-mono">{credenciales.rut}</dd></div>
              <div className="flex gap-2"><dt className="text-gray-600 w-40">Contraseña temporal:</dt><dd className="font-mono">{credenciales.password}</dd></div>
            </dl>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(mensajeAcceso).then(() => toast('Mensaje copiado', 'success'), () => toast('No se pudo copiar', 'error'))}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover"
            >
              <Copy size={16} aria-hidden="true" /> Copiar mensaje de bienvenida
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
