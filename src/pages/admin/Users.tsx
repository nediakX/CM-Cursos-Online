import React, { useEffect, useState, useCallback } from 'react';
import Avatar from '../../components/Avatar';
import { useNavigate } from 'react-router-dom';
import {
  Eye, Edit, UserCheck, UserX, Key, Trash2, Plus, Upload,
  Search, RefreshCw, Download,
} from 'lucide-react';
import {
  listarUsuarios, crearUsuario, editarUsuario,
  desactivarUsuario, reactivarUsuario, resetearPassword, eliminarUsuario,
  listarCursos, crearUsuariosMasivo,
} from '../../services/api';
import type { User, Curso, UserRole } from '../../types';
import { useToast } from '../../components/ui/Toast';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { validarRut, formatearRut, limpiarRut } from '../../utils/rut';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 10;

function generatePassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#';
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const RolBadge: React.FC<{ rol: UserRole }> = ({ rol }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
    rol === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
  }`}>
    {rol === 'admin' ? 'Admin' : 'Alumno'}
  </span>
);

const EstadoBadge: React.FC<{ activo: boolean }> = ({ activo }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
    activo ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
  }`}>
    {activo ? 'Activo' : 'Inactivo'}
  </span>
);

// ─── User Form ────────────────────────────────────────────────────────────────

interface UserFormData {
  nombres: string;
  apellidos: string;
  rut: string;
  email: string;
  telefono: string;
  rol: UserRole;
  cursosAsignados: string[];
  passwordTemporal: string;
}

const emptyForm = (): UserFormData => ({
  nombres: '', apellidos: '', rut: '', email: '', telefono: '',
  rol: 'alumno', cursosAsignados: ['curso-1'], passwordTemporal: generatePassword(),
});

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void>;
  editUser?: User | null;
  cursos: Curso[];
  loading: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, editUser, cursos, loading }) => {
  const [form, setForm] = useState<UserFormData>(emptyForm());
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  useEffect(() => {
    if (editUser) {
      setForm({
        nombres: editUser.nombres, apellidos: editUser.apellidos,
        rut: formatearRut(editUser.rut), email: editUser.email,
        telefono: editUser.telefono, rol: editUser.rol,
        cursosAsignados: editUser.cursosAsignados,
        passwordTemporal: '',
      });
    } else {
      setForm(emptyForm());
    }
    setErrors({});
  }, [editUser, isOpen]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof UserFormData, string>> = {};
    if (!form.nombres.trim()) errs.nombres = 'Requerido';
    if (!form.apellidos.trim()) errs.apellidos = 'Requerido';
    if (!form.rut.trim()) errs.rut = 'Requerido';
    else if (!validarRut(form.rut)) errs.rut = 'RUT inválido';
    if (!form.email.trim()) errs.email = 'Requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido';
    if (!editUser && !form.passwordTemporal.trim()) errs.passwordTemporal = 'Requerido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(form);
  };

  const field = (
    key: keyof UserFormData,
    label: string,
    props?: React.InputHTMLAttributes<HTMLInputElement>,
  ) => (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        value={form[key] as string}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
          errors[key] ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {errors[key] && <p className="text-red-700 text-xs mt-0.5">{errors[key]}</p>}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editUser ? 'Editar Usuario' : 'Agregar Usuario'} size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          {field('nombres', 'Nombres *')}
          {field('apellidos', 'Apellidos *')}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">RUT *</label>
            <input
              value={form.rut}
              onChange={(e) => {
                const v = formatearRut(e.target.value);
                setForm((p) => ({ ...p, rut: v }));
              }}
              placeholder="12.345.678-9"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                errors.rut ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.rut && <p className="text-red-700 text-xs mt-0.5">{errors.rut}</p>}
          </div>
          {field('email', 'Email *', { type: 'email' })}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {field('telefono', 'Teléfono', { type: 'tel', placeholder: '+56912345678' })}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Rol *</label>
            <select
              value={form.rol}
              onChange={(e) => setForm((p) => ({ ...p, rol: e.target.value as UserRole }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="alumno">Alumno</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Cursos */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Cursos Asignados</label>
          <div className="flex flex-col gap-1.5 border border-gray-200 rounded-lg p-3">
            {cursos.map((c) => (
              <label key={c.id} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.cursosAsignados.includes(c.id)}
                  onChange={(e) => {
                    setForm((p) => ({
                      ...p,
                      cursosAsignados: e.target.checked
                        ? [...p.cursosAsignados, c.id]
                        : p.cursosAsignados.filter((id) => id !== c.id),
                    }));
                  }}
                  className="rounded"
                />
                {c.nombre}
              </label>
            ))}
          </div>
        </div>

        {/* Password */}
        {!editUser && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Contraseña Temporal *</label>
            <div className="flex gap-2">
              <input
                value={form.passwordTemporal}
                onChange={(e) => setForm((p) => ({ ...p, passwordTemporal: e.target.value }))}
                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                  errors.passwordTemporal ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, passwordTemporal: generatePassword() }))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors whitespace-nowrap"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            {errors.passwordTemporal && <p className="text-red-700 text-xs mt-0.5">{errors.passwordTemporal}</p>}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Guardando…' : editUser ? 'Guardar Cambios' : 'Crear Usuario'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

// ─── Bulk Upload Modal ────────────────────────────────────────────────────────

interface BulkRow {
  nombres: string;
  apellidos: string;
  rut: string;
  email: string;
  telefono: string;
  rol: string;
  _valid: boolean;
  _error: string;
}

const downloadCSV = (data: Record<string, unknown>[], filename: string) => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(r => Object.values(r).join(',')).join('\n');
  const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};

const BulkModal: React.FC<{ isOpen: boolean; onClose: () => void; onSuccess: () => void }> = ({
  isOpen, onClose, onSuccess,
}) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<BulkRow[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTemplate = () => {
    downloadCSV([{ nombres: 'Juan', apellidos: 'Pérez', rut: '12.345.678-9', email: 'juan@ejemplo.cl', telefono: '+56912345678', rol: 'alumno' }], 'plantilla_usuarios.csv');
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const parsed: BulkRow[] = lines.slice(1).map((line) => {
        const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        const row: Record<string, string> = {};
        headers.forEach((h, i) => { row[h] = vals[i] ?? ''; });
        const valid = !!row['nombres'] && !!row['apellidos'] && !!row['rut'] && !!row['email'] && validarRut(row['rut']);
        return {
          nombres: row['nombres'] ?? '',
          apellidos: row['apellidos'] ?? '',
          rut: row['rut'] ?? '',
          email: row['email'] ?? '',
          telefono: row['telefono'] ?? '',
          rol: row['rol'] ?? 'alumno',
          _valid: valid,
          _error: !row['nombres'] || !row['apellidos'] || !row['rut'] || !row['email']
            ? 'Campos faltantes'
            : !validarRut(row['rut']) ? 'RUT inválido' : '',
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
      const res = await crearUsuariosMasivo(valid.map(r => ({
        nombres: r.nombres, apellidos: r.apellidos,
        rut: limpiarRut(r.rut), email: r.email, telefono: r.telefono,
        rol: r.rol as UserRole, cursosAsignados: ['curso-1'], activo: true,
        password: 'Temp1234!',
      })));
      toast(`${res.exitosos.length} usuario(s) importado(s). ${res.errores.length} error(es).`, res.errores.length > 0 ? 'warning' : 'success');
      onSuccess();
      onClose();
    } catch {
      toast('Error al importar usuarios.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Carga Masiva de Usuarios" size="xl">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleTemplate}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={14} />
            Descargar Plantilla CSV
          </button>
          <label className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-primary-hover transition-colors">
            <Upload size={14} />
            Seleccionar Archivo
            <input type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </label>
        </div>

        {rows.length > 0 && (
          <>
            <p className="text-xs text-gray-500">
              {rows.filter(r => r._valid).length} válidas · {rows.filter(r => !r._valid).length} con errores
            </p>
            <div className="overflow-x-auto max-h-64 border border-gray-200 rounded-lg">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {['RUT', 'Nombres', 'Apellidos', 'Email', 'Teléfono', 'Rol', 'Estado'].map(h => (
                      <th key={h} className="px-3 py-2 text-left font-medium text-gray-600">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className={r._valid ? 'bg-green-50' : 'bg-red-50'}>
                      <td className="px-3 py-1.5">{r.rut}</td>
                      <td className="px-3 py-1.5">{r.nombres}</td>
                      <td className="px-3 py-1.5">{r.apellidos}</td>
                      <td className="px-3 py-1.5">{r.email}</td>
                      <td className="px-3 py-1.5">{r.telefono}</td>
                      <td className="px-3 py-1.5">{r.rol}</td>
                      <td className="px-3 py-1.5">
                        {r._valid
                          ? <span className="text-green-700 font-medium">OK</span>
                          : <span className="text-red-700 font-medium">{r._error}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button
                onClick={handleImport}
                disabled={loading || rows.filter(r => r._valid).length === 0}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                {loading ? 'Importando…' : `Importar ${rows.filter(r => r._valid).length} válidas`}
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

// ─── Temp Password Modal ──────────────────────────────────────────────────────

const TempPasswordModal: React.FC<{ isOpen: boolean; onClose: () => void; password: string }> = ({
  isOpen, onClose, password,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Contraseña Temporal" size="sm">
    <div className="flex flex-col gap-4 items-center text-center">
      <p className="text-sm text-gray-600">La nueva contraseña temporal es:</p>
      <div className="bg-gray-100 rounded-xl px-6 py-3 font-mono text-xl font-bold text-primary tracking-widest">
        {password}
      </div>
      <p className="text-xs text-gray-500">Comparte esta contraseña con el usuario de forma segura.<br />El usuario deberá cambiarla en su próximo inicio de sesión.</p>
      <button
        onClick={onClose}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
      >
        Cerrar
      </button>
    </div>
  </Modal>
);

// ─── Main Users Page ──────────────────────────────────────────────────────────

const Users: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [filterRol, setFilterRol] = useState('todos');

  // Pagination
  const [page, setPage] = useState(1);

  // Modals
  const [showUserModal, setShowUserModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [showBulk, setShowBulk] = useState(false);
  const [confirm, setConfirm] = useState<{ type: 'toggle' | 'delete' | 'reset'; user: User } | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarUsuarios({
        busqueda: search || undefined,
        activo: filterEstado !== 'todos' ? filterEstado === 'activo' : undefined,
        rol: filterRol !== 'todos' ? (filterRol as UserRole) : undefined,
      });
      setUsers(data);
      setPage(1);
    } catch {
      toast('Error al cargar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  }, [search, filterEstado, filterRol, toast]);

  useEffect(() => { void fetchUsers(); }, [fetchUsers]);

  useEffect(() => {
    listarCursos().then(setCursos).catch(() => {});
  }, []);

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const paginated = users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSaveUser = async (data: UserFormData) => {
    setActionLoading(true);
    try {
      if (editUser) {
        await editarUsuario(editUser.id, {
          nombres: data.nombres, apellidos: data.apellidos, rut: limpiarRut(data.rut),
          email: data.email, telefono: data.telefono, rol: data.rol,
          cursosAsignados: data.cursosAsignados,
        });
        toast('Usuario actualizado correctamente', 'success');
      } else {
        await crearUsuario({
          nombres: data.nombres, apellidos: data.apellidos,
          rut: limpiarRut(data.rut), email: data.email, telefono: data.telefono,
          rol: data.rol, cursosAsignados: data.cursosAsignados, activo: true,
          debeCambiarPassword: true,
          password: data.passwordTemporal,
        });
        toast('Usuario creado correctamente', 'success');
      }
      setShowUserModal(false);
      setEditUser(null);
      await fetchUsers();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error';
      toast(msg === 'RUT_DUPLICADO' ? 'El RUT ya está registrado en otro usuario.' : msg === 'RUT_INVALIDO' ? 'El RUT no es válido.' : 'Error al guardar usuario.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!confirm) return;
    setActionLoading(true);
    try {
      if (confirm.type === 'toggle') {
        if (confirm.user.activo) {
          await desactivarUsuario(confirm.user.id);
        } else {
          await reactivarUsuario(confirm.user.id);
        }
        toast(`Usuario ${confirm.user.activo ? 'desactivado' : 'activado'}.`, 'success');
        await fetchUsers();
      } else if (confirm.type === 'delete') {
        await eliminarUsuario(confirm.user.id);
        toast('Usuario eliminado.', 'success');
        await fetchUsers();
      } else if (confirm.type === 'reset') {
        const pw = await resetearPassword(confirm.user.id);
        toast('Contraseña restablecida.', 'success');
        setTempPassword(pw);
      }
    } catch {
      toast('Error al realizar la acción.', 'error');
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Usuarios</h1>
          <p className="text-sm text-gray-500 mt-0.5">{users.length} usuario(s) encontrado(s)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulk(true)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Upload size={15} />
            Carga Masiva
          </button>
          <button
            onClick={() => { setEditUser(null); setShowUserModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            <Plus size={15} />
            Agregar Usuario
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-52">
          <Search size={15} className="text-gray-500" />
          <input
            placeholder="Buscar por nombre o RUT…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
        </div>
        <select
          aria-label="Filtrar por estado"
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
        >
          <option value="todos">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>
        <select
          aria-label="Filtrar por rol"
          value={filterRol}
          onChange={(e) => setFilterRol(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
        >
          <option value="todos">Todos los roles</option>
          <option value="alumno">Alumno</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando…</div>
        ) : paginated.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No se encontraron usuarios.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['RUT', 'Nombre', 'Email', 'Teléfono', 'Rol', 'Estado', 'Acciones'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginated.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-gray-700">{formatearRut(u.rut)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      <span className="flex items-center gap-2.5">
                        <Avatar usuario={u} size={32} />
                        {u.nombres} {u.apellidos}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{u.telefono || '—'}</td>
                    <td className="px-4 py-3"><RolBadge rol={u.rol} /></td>
                    <td className="px-4 py-3"><EstadoBadge activo={u.activo} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          title="Ver ficha"
                          onClick={() => navigate(`/admin/usuarios/${u.id}`)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          title="Editar"
                          onClick={() => { setEditUser(u); setShowUserModal(true); }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          title={u.activo ? 'Desactivar' : 'Activar'}
                          onClick={() => setConfirm({ type: 'toggle', user: u })}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          {u.activo ? <UserX size={15} /> : <UserCheck size={15} />}
                        </button>
                        <button
                          title="Restablecer clave"
                          onClick={() => setConfirm({ type: 'reset', user: u })}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                        >
                          <Key size={15} />
                        </button>
                        <button
                          title="Eliminar"
                          onClick={() => setConfirm({ type: 'delete', user: u })}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Página {page} de {totalPages} ({users.length} total)
          </span>
          <div className="flex gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                  p === page
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <UserModal
        isOpen={showUserModal}
        onClose={() => { setShowUserModal(false); setEditUser(null); }}
        onSave={handleSaveUser}
        editUser={editUser}
        cursos={cursos}
        loading={actionLoading}
      />
      <BulkModal
        isOpen={showBulk}
        onClose={() => setShowBulk(false)}
        onSuccess={fetchUsers}
      />
      {tempPassword && (
        <TempPasswordModal
          isOpen={!!tempPassword}
          onClose={() => setTempPassword(null)}
          password={tempPassword}
        />
      )}
      <ConfirmDialog
        isOpen={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={handleConfirmAction}
        loading={actionLoading}
        variant={confirm?.type === 'delete' ? 'danger' : 'warning'}
        title={
          confirm?.type === 'delete' ? 'Eliminar usuario' :
          confirm?.type === 'toggle' ? (confirm.user.activo ? 'Desactivar usuario' : 'Activar usuario') :
          'Restablecer contraseña'
        }
        message={
          confirm?.type === 'delete'
            ? `¿Seguro que deseas eliminar a ${confirm.user.nombres} ${confirm.user.apellidos}? Esta acción no se puede deshacer.`
            : confirm?.type === 'toggle'
            ? `¿Deseas ${confirm.user.activo ? 'desactivar' : 'activar'} a ${confirm.user.nombres} ${confirm.user.apellidos}?`
            : `¿Generar una nueva contraseña temporal para ${confirm?.user.nombres} ${confirm?.user.apellidos}?`
        }
        confirmLabel={
          confirm?.type === 'delete' ? 'Eliminar' :
          confirm?.type === 'toggle' ? (confirm.user.activo ? 'Desactivar' : 'Activar') :
          'Restablecer'
        }
      />
    </div>
  );
};

export default Users;
