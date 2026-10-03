import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, ChevronDown, ChevronRight, FileEdit } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  listarCursos, crearCurso, editarCurso, getCurso, crearModulo, editarModulo,
  listarEvaluaciones, editarEvaluacion,
} from '../../services/api';
import type { Curso, Evaluacion, Modulo } from '../../types';
import { useToast } from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';

// ─── Course Form ──────────────────────────────────────────────────────────────

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  editing?: Curso | null;
}

const CourseForm: React.FC<CourseFormProps> = ({ isOpen, onClose, onSaved, editing }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: '', descripcion: '', horasTotales: 0, modalidad: 'online' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({ nombre: editing.nombre, descripcion: editing.descripcion, horasTotales: editing.horasTotales, modalidad: editing.modalidad });
    } else {
      setForm({ nombre: '', descripcion: '', horasTotales: 0, modalidad: 'online' });
    }
  }, [editing, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await editarCurso(editing.id, form);
        toast('Curso actualizado', 'success');
      } else {
        await crearCurso(form);
        toast('Curso creado', 'success');
      }
      onSaved();
      onClose();
    } catch {
      toast('Error al guardar curso', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Editar Curso' : 'Nuevo Curso'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" value={form.descripcion} onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horas Totales</label>
            <input type="number" min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.horasTotales} onChange={(e) => setForm((f) => ({ ...f, horasTotales: Number(e.target.value) }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.modalidad} onChange={(e) => setForm((f) => ({ ...f, modalidad: e.target.value }))}>
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
              <option value="mixta">Mixta</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancelar</button>
          <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50">{saving ? 'Guardando...' : editing ? 'Actualizar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  );
};

// ─── Module Form ──────────────────────────────────────────────────────────────

interface ModuleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  cursoId: string;
  editing?: Modulo | null;
  nextOrden: number;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ isOpen, onClose, onSaved, cursoId, editing, nextOrden }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    nombre: '', horas: 0, objetivo: '',
    aprendizajesEsperados: '', contenidos: '',
    tipoEvaluacion: 'modulo',
    cantidadPreguntas: 20, tiempoMinutos: 60, notaMinima: 4.0,
    orden: nextOrden,
  });
  const [saving, setSaving] = useState(false);
  const [evaluacion, setEvaluacion] = useState<Evaluacion | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setEvaluacion(null);
    if (editing) {
      setForm({
        nombre: editing.nombre, horas: editing.horas, objetivo: editing.objetivo,
        aprendizajesEsperados: editing.aprendizajesEsperados.join('\n'),
        contenidos: editing.contenidos.join('\n'),
        tipoEvaluacion: editing.tipoEvaluacion,
        cantidadPreguntas: 20, tiempoMinutos: 30, notaMinima: 4.0,
        orden: editing.orden,
      });
      // Carga la configuración real de la evaluación del módulo
      listarEvaluaciones(cursoId)
        .then((evs) => {
          const ev = evs.find((e) => e.moduloId === editing.id && e.tipo === 'modulo') ?? null;
          setEvaluacion(ev);
          if (ev) setForm((f) => ({ ...f, cantidadPreguntas: ev.cantidadPreguntas, tiempoMinutos: ev.tiempoMinutos, notaMinima: ev.notaMinima }));
        })
        .catch(() => {});
    } else {
      setForm({ nombre: '', horas: 0, objetivo: '', aprendizajesEsperados: '', contenidos: '', tipoEvaluacion: 'modulo', cantidadPreguntas: 20, tiempoMinutos: 30, notaMinima: 4.0, orden: nextOrden });
    }
  }, [editing, isOpen, nextOrden, cursoId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        nombre: form.nombre, horas: form.horas, objetivo: form.objetivo,
        aprendizajesEsperados: form.aprendizajesEsperados.split('\n').map((x) => x.trim()).filter(Boolean),
        contenidos: form.contenidos.split('\n').map((x) => x.trim()).filter(Boolean),
        tipoEvaluacion: form.tipoEvaluacion,
        orden: form.orden,
      };
      if (editing) {
        // No se envían lecciones ni materiales: editarlos aquí borraría el avance de los alumnos.
        await editarModulo(editing.id, payload);
        if (evaluacion) {
          await editarEvaluacion(evaluacion.id, {
            cantidadPreguntas: form.cantidadPreguntas,
            tiempoMinutos: form.tiempoMinutos,
            notaMinima: form.notaMinima,
          });
        }
        toast('Módulo actualizado', 'success');
      } else {
        await crearModulo(cursoId, { ...payload, materiales: [] });
        toast('Módulo creado', 'success');
      }
      onSaved();
      onClose();
    } catch {
      toast('Error al guardar módulo', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Editar Módulo' : 'Nuevo Módulo'} size="xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horas</label>
            <input type="number" min={0} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.horas} onChange={(e) => setForm((f) => ({ ...f, horas: Number(e.target.value) }))} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
          <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" value={form.objetivo} onChange={(e) => setForm((f) => ({ ...f, objetivo: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aprendizajes Esperados (uno por línea)</label>
          <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" value={form.aprendizajesEsperados} onChange={(e) => setForm((f) => ({ ...f, aprendizajesEsperados: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenidos (uno por línea)</label>
          <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" value={form.contenidos} onChange={(e) => setForm((f) => ({ ...f, contenidos: e.target.value }))} />
        </div>
        {editing && evaluacion && (
        <div className="border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">Configuración de la evaluación del módulo</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nº Preguntas</label>
              <input type="number" min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.cantidadPreguntas} onChange={(e) => setForm((f) => ({ ...f, cantidadPreguntas: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiempo (min)</label>
              <input type="number" min={1} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.tiempoMinutos} onChange={(e) => setForm((f) => ({ ...f, tiempoMinutos: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nota Mínima</label>
              <input type="number" min={1} max={7} step={0.1} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={form.notaMinima} onChange={(e) => setForm((f) => ({ ...f, notaMinima: Number(e.target.value) }))} />
            </div>
          </div>
        </div>
        )}
        {!editing && (
          <p className="text-xs text-gray-500">Cada línea de "Contenidos" se convierte en una lección del nuevo módulo.</p>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancelar</button>
          <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50">{saving ? 'Guardando...' : editing ? 'Actualizar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  );
};

// ─── Course Row ───────────────────────────────────────────────────────────────

interface CourseRowProps {
  curso: Curso;
  onEdit: (c: Curso) => void;
}

const CourseRow: React.FC<CourseRowProps> = ({ curso, onEdit }) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<Curso | null>(null);
  const [modFormOpen, setModFormOpen] = useState(false);
  const [editingMod, setEditingMod] = useState<Modulo | null>(null);

  const loadDetail = async () => {
    if (detail) return;
    try {
      const c = await getCurso(curso.id);
      setDetail(c);
    } catch { toast('Error al cargar módulos', 'error'); }
  };

  const handleExpand = () => {
    if (!expanded) loadDetail();
    setExpanded((v) => !v);
  };

  const refreshDetail = async () => {
    try { setDetail(await getCurso(curso.id)); } catch { /**/ }
  };

  const modulos = detail?.modulos ?? curso.modulos;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-3">
        <div className="flex items-center gap-3 px-5 py-4">
          <button onClick={handleExpand} aria-expanded={expanded} aria-label={expanded ? 'Ocultar módulos' : 'Mostrar módulos'} className="text-gray-500 hover:text-gray-700 transition-colors">
            {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800">{curso.nombre}</p>
            <p className="text-xs text-gray-500 mt-0.5">{curso.modalidad} · {curso.horasTotales}h · {modulos.length} módulos</p>
          </div>
          <button onClick={() => onEdit(curso)} aria-label={`Editar curso ${curso.nombre}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors"><Edit2 size={15} /></button>
        </div>

        {expanded && (
          <div className="border-t border-gray-100 p-4 space-y-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-600">Módulos <span className="font-normal text-gray-500">· usa “Lecciones” para editar textos, videos e imágenes</span></p>
              <button onClick={() => { setEditingMod(null); setModFormOpen(true); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-primary text-xs font-semibold hover:opacity-90 transition-opacity">
                <Plus size={12} /> Agregar Módulo
              </button>
            </div>
            {modulos.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold shrink-0">{m.orden}</span>
                <span className="flex-1 text-sm text-gray-700">{m.nombre}</span>
                <span className="text-xs text-gray-500">{m.lecciones.length} lecciones · {m.horas}h</span>
                <Link to={`/admin/contenido/${m.id}`} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10">
                  <FileEdit size={13} aria-hidden="true" /> Lecciones<span className="sr-only"> del módulo {m.orden}</span>
                </Link>
                <button onClick={() => { setEditingMod(m); setModFormOpen(true); }} aria-label={`Editar datos del módulo ${m.orden}`} className="p-1.5 rounded hover:bg-gray-200 text-gray-500 transition-colors"><Edit2 size={13} /></button>
              </div>
            ))}
            {modulos.length === 0 && <p className="text-sm text-gray-500 text-center py-3">Sin módulos. Agregue uno.</p>}
          </div>
        )}
      </div>

      <ModuleForm
        isOpen={modFormOpen}
        onClose={() => setModFormOpen(false)}
        onSaved={() => { setModFormOpen(false); refreshDetail(); }}
        cursoId={curso.id}
        editing={editingMod}
        nextOrden={modulos.length + 1}
      />
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AdminCourses: React.FC = () => {
  const { toast } = useToast();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setCursos(await listarCursos()); }
    catch { toast('Error al cargar cursos', 'error'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Cursos</h1>
        <button onClick={() => { setEditingCurso(null); setFormOpen(true); }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors">
          <Plus size={14} /> Nuevo Curso
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-sm">Cargando...</div>
      ) : cursos.length === 0 ? (
        <div className="text-gray-500 text-sm">No hay cursos.</div>
      ) : (
        <div>
          {cursos.map((c) => (
            <CourseRow key={c.id} curso={c} onEdit={(curso) => { setEditingCurso(curso); setFormOpen(true); }} />
          ))}
        </div>
      )}

      <CourseForm isOpen={formOpen} onClose={() => setFormOpen(false)} onSaved={load} editing={editingCurso} />
    </div>
  );
};

export default AdminCourses;
