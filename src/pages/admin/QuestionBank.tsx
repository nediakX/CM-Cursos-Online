import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Edit, Trash2, Search, Upload, Download } from 'lucide-react';
import { listarPreguntas, crearPregunta, editarPregunta, eliminarPregunta, listarCursos } from '../../services/api';
import type { Pregunta, Dificultad, Modulo } from '../../types';
import { useToast } from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { validarRut } from '../../utils/rut';

const DIFICULTAD_LABELS: Record<Dificultad, { label: string; classes: string }> = {
  baja: { label: 'Baja', classes: 'bg-emerald-100 text-emerald-700' },
  media: { label: 'Media', classes: 'bg-amber-100 text-amber-700' },
  alta: { label: 'Alta', classes: 'bg-red-100 text-red-700' },
};

const DificultadBadge: React.FC<{ d: Dificultad }> = ({ d }) => {
  const { label, classes } = DIFICULTAD_LABELS[d];
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}>{label}</span>;
};

// ─── Question Form Modal ──────────────────────────────────────────────────────

interface PreguntaFormData {
  moduloId: string;
  enunciado: string;
  a: string; b: string; c: string; d: string;
  correcta: 'a' | 'b' | 'c' | 'd';
  explicacion: string;
  dificultad: Dificultad;
}

const emptyForm = (moduloId: string): PreguntaFormData => ({
  moduloId, enunciado: '', a: '', b: '', c: '', d: '',
  correcta: 'a', explicacion: '', dificultad: 'media',
});

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PreguntaFormData) => Promise<void>;
  editPregunta?: Pregunta | null;
  modulos: Modulo[];
  loading: boolean;
  defaultModuloId: string;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen, onClose, onSave, editPregunta, modulos, loading, defaultModuloId,
}) => {
  const [form, setForm] = useState<PreguntaFormData>(emptyForm(defaultModuloId));

  useEffect(() => {
    if (editPregunta) {
      setForm({
        moduloId: editPregunta.moduloId,
        enunciado: editPregunta.enunciado,
        a: editPregunta.alternativas.a, b: editPregunta.alternativas.b,
        c: editPregunta.alternativas.c, d: editPregunta.alternativas.d,
        correcta: editPregunta.correcta,
        explicacion: editPregunta.explicacion,
        dificultad: editPregunta.dificultad,
      });
    } else {
      setForm(emptyForm(defaultModuloId));
    }
  }, [editPregunta, isOpen, defaultModuloId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  const altLabels = ['a', 'b', 'c', 'd'] as const;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editPregunta ? 'Editar Pregunta' : 'Agregar Pregunta'} size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Módulo *</label>
            <select required value={form.moduloId} onChange={(e) => setForm(p => ({ ...p, moduloId: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Dificultad *</label>
            <select value={form.dificultad} onChange={(e) => setForm(p => ({ ...p, dificultad: e.target.value as Dificultad }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Enunciado *</label>
          <textarea required rows={3} value={form.enunciado}
            onChange={(e) => setForm(p => ({ ...p, enunciado: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-xs font-medium text-gray-700">Alternativas *</label>
          {altLabels.map((alt) => (
            <div key={alt} className="flex items-center gap-2">
              <input type="radio" name="correcta" value={alt}
                checked={form.correcta === alt}
                onChange={() => setForm(p => ({ ...p, correcta: alt }))}
                className="accent-primary" title={`Marcar ${alt.toUpperCase()} como correcta`}
              />
              <span className="text-xs font-bold text-gray-500 w-5 uppercase">{alt}.</span>
              <input
                required
                value={form[alt as keyof Pick<PreguntaFormData, 'a' | 'b' | 'c' | 'd'>]}
                onChange={(e) => setForm(p => ({ ...p, [alt]: e.target.value }))}
                placeholder={`Alternativa ${alt.toUpperCase()}`}
                className={`flex-1 border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                  form.correcta === alt ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300'
                }`}
              />
              {form.correcta === alt && <span className="text-xs text-emerald-600 font-medium whitespace-nowrap">✓ Correcta</span>}
            </div>
          ))}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Explicación</label>
          <textarea rows={2} value={form.explicacion}
            onChange={(e) => setForm(p => ({ ...p, explicacion: e.target.value }))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50">
            {loading ? 'Guardando…' : editPregunta ? 'Guardar Cambios' : 'Agregar Pregunta'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// ─── Bulk Import Modal ────────────────────────────────────────────────────────

const downloadCSV = (data: Record<string, unknown>[], filename: string) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(r => Object.values(r).join(',')).join('\n');
  const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

interface BulkPreguntaRow {
  moduloId: string; enunciado: string; a: string; b: string; c: string; d: string;
  correcta: string; dificultad: string;
  _valid: boolean; _error: string;
}

const BulkPreguntaModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void; modulos: Modulo[] }> = ({
  isOpen, onClose, onSuccess, modulos,
}) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<BulkPreguntaRow[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTemplate = () => {
    downloadCSV([{
      moduloId: modulos[0]?.id ?? 'mod-1',
      enunciado: '¿Cuál es la unidad de resistencia?',
      a: 'Voltio', b: 'Amperio', c: 'Ohm', d: 'Watt',
      correcta: 'c', dificultad: 'baja', explicacion: 'La resistencia se mide en Ohms.',
    }], 'plantilla_preguntas.csv');
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const parsed: BulkPreguntaRow[] = lines.slice(1).map((line) => {
        const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const row: Record<string, string> = {};
        headers.forEach((h, i) => { row[h] = vals[i] ?? ''; });
        const validModulo = modulos.some(m => m.id === row['moduloid']);
        const validCorrect = ['a', 'b', 'c', 'd'].includes(row['correcta']);
        const valid = !!row['enunciado'] && !!row['a'] && !!row['b'] && !!row['c'] && !!row['d'] && validModulo && validCorrect;
        return {
          moduloId: row['moduloid'] ?? '', enunciado: row['enunciado'] ?? '',
          a: row['a'] ?? '', b: row['b'] ?? '', c: row['c'] ?? '', d: row['d'] ?? '',
          correcta: row['correcta'] ?? '', dificultad: row['dificultad'] ?? 'media',
          _valid: valid,
          _error: !row['enunciado'] ? 'Enunciado faltante' : !validModulo ? 'Módulo inválido' : !validCorrect ? 'Correcta inválida' : '',
        };
      });
      setRows(parsed);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    const valid = rows.filter(r => r._valid);
    if (!valid.length) return;
    setLoading(true);
    try {
      for (const r of valid) {
        await crearPregunta({
          moduloId: r.moduloId, enunciado: r.enunciado,
          alternativas: { a: r.a, b: r.b, c: r.c, d: r.d },
          correcta: r.correcta as 'a' | 'b' | 'c' | 'd',
          explicacion: '', dificultad: (r.dificultad as Dificultad) || 'media',
        });
      }
      toast(`${valid.length} pregunta(s) importada(s).`, 'success');
      onSuccess();
      onClose();
    } catch {
      toast('Error al importar preguntas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Importar Preguntas" size="xl">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <button onClick={handleTemplate} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={14} /> Descargar Plantilla
          </button>
          <label className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-primary-hover transition-colors">
            <Upload size={14} /> Seleccionar Archivo
            <input type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </label>
        </div>
        {rows.length > 0 && (
          <>
            <p className="text-xs text-gray-500">{rows.filter(r => r._valid).length} válidas · {rows.filter(r => !r._valid).length} errores</p>
            <div className="overflow-x-auto max-h-56 border border-gray-200 rounded-lg">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {['Módulo', 'Enunciado', 'Correc.', 'Dif.', 'Estado'].map(h => (
                      <th key={h} className="px-3 py-2 text-left font-medium text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className={r._valid ? 'bg-green-50' : 'bg-red-50'}>
                      <td className="px-3 py-1.5">{r.moduloId}</td>
                      <td className="px-3 py-1.5 max-w-40 truncate">{r.enunciado}</td>
                      <td className="px-3 py-1.5 uppercase">{r.correcta}</td>
                      <td className="px-3 py-1.5">{r.dificultad}</td>
                      <td className="px-3 py-1.5">
                        {r._valid ? <span className="text-green-700 font-medium">OK</span> : <span className="text-red-700">{r._error}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancelar</button>
              <button onClick={handleImport} disabled={loading || rows.filter(r => r._valid).length === 0}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50">
                {loading ? 'Importando…' : `Importar ${rows.filter(r => r._valid).length}`}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const QuestionBank: React.FC = () => {
  const { toast } = useToast();
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [filterModulo, setFilterModulo] = useState('');
  const [filterDificultad, setFilterDificultad] = useState('');
  const [filterTexto, setFilterTexto] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [editPregunta, setEditPregunta] = useState<Pregunta | null>(null);
  const [showBulk, setShowBulk] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Pregunta | null>(null);

  useEffect(() => {
    listarCursos().then(cs => {
      const mods = cs.flatMap(c => c.modulos);
      setModulos(mods);
      if (mods.length > 0) setFilterModulo('');
    }).catch(() => {});
  }, []);

  const fetchPreguntas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarPreguntas({
        moduloId: filterModulo || undefined,
        dificultad: (filterDificultad || undefined) as Dificultad | undefined,
        busqueda: filterTexto || undefined,
      });
      setPreguntas(data);
    } catch {
      toast('Error al cargar preguntas.', 'error');
    } finally {
      setLoading(false);
    }
  }, [filterModulo, filterDificultad, filterTexto, toast]);

  useEffect(() => { void fetchPreguntas(); }, [fetchPreguntas]);

  const handleSave = async (data: PreguntaFormData) => {
    setActionLoading(true);
    try {
      if (editPregunta) {
        await editarPregunta(editPregunta.id, {
          moduloId: data.moduloId, enunciado: data.enunciado,
          alternativas: { a: data.a, b: data.b, c: data.c, d: data.d },
          correcta: data.correcta, explicacion: data.explicacion, dificultad: data.dificultad,
        });
        toast('Pregunta actualizada.', 'success');
      } else {
        await crearPregunta({
          moduloId: data.moduloId, enunciado: data.enunciado,
          alternativas: { a: data.a, b: data.b, c: data.c, d: data.d },
          correcta: data.correcta, explicacion: data.explicacion, dificultad: data.dificultad,
        });
        toast('Pregunta creada.', 'success');
      }
      setShowModal(false);
      setEditPregunta(null);
      await fetchPreguntas();
    } catch {
      toast('Error al guardar pregunta.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      await eliminarPregunta(deleteTarget.id);
      toast('Pregunta eliminada.', 'success');
      await fetchPreguntas();
    } catch {
      toast('Error al eliminar.', 'error');
    } finally {
      setActionLoading(false);
      setDeleteTarget(null);
    }
  };

  const moduloNombre = (id: string) => modulos.find(m => m.id === id)?.nombre ?? id;
  const defaultModuloId = modulos[0]?.id ?? '';

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Banco de Preguntas</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filterModulo
              ? `${preguntas.length} preguntas para ${moduloNombre(filterModulo)}`
              : `${preguntas.length} preguntas totales`}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowBulk(true)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Upload size={14} /> Importar
          </button>
          <button onClick={() => { setEditPregunta(null); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors">
            <Plus size={14} /> Agregar Pregunta
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-48">
          <Search size={15} className="text-gray-500" />
          <input aria-label="Buscar en enunciado" placeholder="Buscar en enunciado…" value={filterTexto}
            onChange={(e) => setFilterTexto(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent" />
        </div>
        <select aria-label="Filtrar por módulo" value={filterModulo} onChange={(e) => setFilterModulo(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
          <option value="">Todos los módulos</option>
          {modulos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
        </select>
        <select aria-label="Filtrar por dificultad" value={filterDificultad} onChange={(e) => setFilterDificultad(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none">
          <option value="">Todas las dificultades</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando…</div>
        ) : preguntas.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No se encontraron preguntas.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Módulo', 'Enunciado', 'Dificultad', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {preguntas.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap max-w-36 truncate">{moduloNombre(p.moduloId)}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 max-w-sm">
                      <span className="line-clamp-2">{p.enunciado}</span>
                    </td>
                    <td className="px-4 py-3"><DificultadBadge d={p.dificultad} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => { setEditPregunta(p); setShowModal(true); }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Editar">
                          <Edit size={15} />
                        </button>
                        <button onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors" title="Eliminar">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <QuestionModal isOpen={showModal} onClose={() => { setShowModal(false); setEditPregunta(null); }}
        onSave={handleSave} editPregunta={editPregunta} modulos={modulos} loading={actionLoading}
        defaultModuloId={defaultModuloId} />
      <BulkPreguntaModal isOpen={showBulk} onClose={() => setShowBulk(false)} onSuccess={fetchPreguntas} modulos={modulos} />
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete}
        loading={actionLoading} variant="danger" title="Eliminar pregunta"
        message={`¿Seguro que deseas eliminar esta pregunta? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar" />
    </div>
  );
};

export default QuestionBank;
