import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { getFichaAlumno, getCurso } from '../../services/api';
import type { FichaAlumno, Curso } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { formatearRut } from '../../utils/rut';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/Avatar';
import { EvaluacionesAlumnoPanel, IdentidadPanel, ModulosAlumnoPanel } from '../../components/admin/PanelesAlumno';
import type { User } from '../../types';

const TABS = ['Módulos', 'Identidad', 'Progreso', 'Evaluaciones', 'Asistencia', 'Proyecto', 'Certificados'] as const;
type Tab = typeof TABS[number];

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ficha, setFicha] = useState<FichaAlumno | null>(null);
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('Módulos');

  useEffect(() => {
    if (!id) return;
    Promise.all([getFichaAlumno(id), getCurso('curso-1')])
      .then(([f, c]) => { setFicha(f); setCurso(c); })
      .catch(() => toast('Error al cargar ficha del alumno', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-500">Cargando...</div>;
  }

  if (!ficha) {
    return (
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-4"><ArrowLeft size={16} /> Volver</button>
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">No se encontró el alumno.</div>
      </div>
    );
  }

  const { usuario, progreso, intentos, asistencia, entregas, certificados } = ficha;
  const actualizarUsuario = (u: User) => setFicha((f) => (f ? { ...f, usuario: u } : f));

  const moduloNombre = (moduloId: string) => curso?.modulos.find((m) => m.id === moduloId)?.nombre ?? moduloId;

  return (
    <div className="p-6 space-y-6">
      {/* Back */}
      <button onClick={() => navigate('/admin/usuarios')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
        <ArrowLeft size={16} /> Volver a Usuarios
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-5">
        <Avatar usuario={usuario} size={72} forma="cuadrado" />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-800">{usuario.nombres} {usuario.apellidos}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{formatearRut(usuario.rut)} · {usuario.email}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant={usuario.rol === 'admin' ? 'info' : 'default'}>{usuario.rol}</Badge>
            <Badge variant={usuario.activo ? 'success' : 'danger'}>{usuario.activo ? 'Activo' : 'Inactivo'}</Badge>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500 shrink-0">
          <p>Creado</p>
          <p className="font-medium text-gray-700">{new Date(usuario.creadoEn).toLocaleDateString('es-CL')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-0 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {activeTab === 'Módulos' && curso && (
          <>
            <ModulosAlumnoPanel usuario={usuario} curso={curso} onCambio={actualizarUsuario} />
            <EvaluacionesAlumnoPanel usuario={usuario} onCambio={actualizarUsuario} />
          </>
        )}
        {activeTab === 'Identidad' && <IdentidadPanel usuario={usuario} onCambio={actualizarUsuario} />}
        {/* Progreso */}
        {activeTab === 'Progreso' && (
          <div className="p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Progreso por Curso</h2>
            {progreso.length === 0 ? (
              <p className="text-gray-500 text-sm">Sin datos de progreso.</p>
            ) : (
              <div className="space-y-3">
                {progreso.map((p) => (
                  <div key={`${p.userId}-${p.cursoId}`} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-32 truncate">{p.cursoId}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${p.porcentaje}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-12 text-right">{p.porcentaje}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Evaluaciones */}
        {activeTab === 'Evaluaciones' && (
          <div className="overflow-x-auto">
            {intentos.length === 0 ? (
              <div className="p-5 text-gray-500 text-sm">Sin evaluaciones.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Evaluación</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Nota</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {intentos.map((intento) => (
                    <tr key={intento.id} className="border-t border-gray-50">
                      <td className="px-4 py-3 text-gray-700">{intento.evaluacionId}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(intento.fecha).toLocaleDateString('es-CL')}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{intento.nota.toFixed(1)}</td>
                      <td className="px-4 py-3">
                        {intento.aprobado
                          ? <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium"><CheckCircle2 size={13} /> Aprobado</span>
                          : <span className="inline-flex items-center gap-1 text-red-700 text-xs font-medium"><XCircle size={13} /> Reprobado</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Asistencia */}
        {activeTab === 'Asistencia' && (
          <div className="overflow-x-auto">
            {asistencia.length === 0 ? (
              <div className="p-5 text-gray-500 text-sm">Sin datos de asistencia.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Módulo</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">% Asistencia</th>
                  </tr>
                </thead>
                <tbody>
                  {asistencia.map((a) => (
                    <tr key={`${a.userId}-${a.moduloId}`} className={`border-t ${a.porcentaje < 75 ? 'bg-red-50' : ''}`}>
                      <td className="px-4 py-3 text-gray-700">{moduloNombre(a.moduloId)}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${a.porcentaje < 75 ? 'text-red-600' : 'text-gray-800'}`}>{a.porcentaje}%</span>
                        {a.porcentaje < 75 && <span className="ml-2 text-xs text-red-700">Bajo mínimo</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Proyecto */}
        {activeTab === 'Proyecto' && (
          <div className="p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Entregas de Proyecto</h2>
            {entregas.length === 0 ? (
              <p className="text-gray-500 text-sm">Sin entregas.</p>
            ) : (
              <div className="space-y-3">
                {entregas.map((e) => (
                  <div key={e.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{new Date(e.fecha).toLocaleDateString('es-CL')}</span>
                      <Badge variant={e.estado === 'revisado' ? 'success' : 'warning'}>{e.estado}</Badge>
                    </div>
                    {e.nota !== undefined && <p className="text-sm font-semibold text-gray-800">Nota: {e.nota}</p>}
                    {e.comentario && <p className="text-sm text-gray-600 mt-1">{e.comentario}</p>}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {e.archivos.map((f) => (
                        <a key={f.url} href={f.url} target="_blank" rel="noreferrer" className="text-xs text-primary underline">{f.nombre}</a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certificados */}
        {activeTab === 'Certificados' && (
          <div className="overflow-x-auto">
            {certificados.length === 0 ? (
              <div className="p-5 text-gray-500 text-sm">Sin certificados.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Código</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Fecha</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Nota</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {certificados.map((c) => (
                    <tr key={c.id} className="border-t border-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-600">{c.codigoVerificacion}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(c.fechaEmision).toLocaleDateString('es-CL')}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{c.notaFinal.toFixed(1)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={c.estado === 'vigente' ? 'success' : 'danger'}>{c.estado}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
