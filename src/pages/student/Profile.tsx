import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { editarUsuario, cambiarPassword } from '../../services/api';
import { useToast } from '../../components/ui/Toast';

function formatRut(rut: string): string {
  if (!rut) return '';
  const clean = rut.replace(/[^0-9kK]/g, '');
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv.toUpperCase()}`;
}

export default function Profile() {
  const { user, setUser } = useAuth();
  const { toast } = useToast();

  // Profile form
  const [email, setEmail] = useState(user?.email ?? '');
  const [telefono, setTelefono] = useState(user?.telefono ?? '');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password form
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    try {
      const updated = await editarUsuario(user.id, { email, telefono });
      setUser(updated);
      toast('Perfil actualizado correctamente', 'success');
    } catch {
      toast('Error al actualizar el perfil', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordNueva !== passwordConfirm) {
      toast('Las contraseñas no coinciden', 'error');
      return;
    }
    if (passwordNueva.length < 6) {
      toast('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }
    setSavingPassword(true);
    try {
      await cambiarPassword(passwordActual, passwordNueva);
      setPasswordActual('');
      setPasswordNueva('');
      setPasswordConfirm('');
      toast('Contraseña actualizada correctamente', 'success');
    } catch {
      toast('Error al cambiar la contraseña. Verifica tu contraseña actual.', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-primary">Mi Perfil</h1>

      {/* User avatar / info summary */}
      <div className="bg-primary rounded-xl p-5 flex items-center gap-4 text-white">
        <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shrink-0">
          <span className="text-primary font-black text-xl">
            {user.nombres.charAt(0)}{user.apellidos.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-bold text-lg">
            {user.nombres} {user.apellidos}
          </p>
          <p className="text-white/60 text-sm">RUT: {formatRut(user.rut)}</p>
          <span className="text-xs bg-accent text-primary px-2 py-0.5 rounded-full font-semibold capitalize">
            {user.rol}
          </span>
        </div>
      </div>

      {/* Read-only info */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-primary mb-4">Datos Personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              RUT
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <User size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600 font-mono">{formatRut(user.rut)}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Nombres
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-sm text-gray-600">{user.nombres}</span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Apellidos
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-sm text-gray-600">{user.apellidos}</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Los datos marcados no son editables. Contacta a tu instructor para modificarlos.
        </p>
      </div>

      {/* Editable fields */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-primary mb-4">Información de Contacto</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                aria-label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Teléfono
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                aria-label="Teléfono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+56912345678"
                className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={savingProfile}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 transition-all"
          >
            <Save size={15} />
            {savingProfile ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-primary mb-4">Cambiar Contraseña</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {[
            {
              label: 'Contraseña actual',
              value: passwordActual,
              onChange: setPasswordActual,
            },
            {
              label: 'Nueva contraseña',
              value: passwordNueva,
              onChange: setPasswordNueva,
            },
            {
              label: 'Confirmar nueva contraseña',
              value: passwordConfirm,
              onChange: setPasswordConfirm,
            },
          ].map(({ label, value, onChange }) => (
            <div key={label}>
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                {label}
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  aria-label={label}
                  type="password"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>
          ))}
          {passwordNueva && passwordConfirm && passwordNueva !== passwordConfirm && (
            <p className="text-xs text-red-700">Las contraseñas no coinciden</p>
          )}
          <button
            type="submit"
            disabled={savingPassword}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-50 transition-all"
          >
            <Lock size={15} />
            {savingPassword ? 'Cambiando...' : 'Cambiar Contraseña'}
          </button>
        </form>
      </div>
    </div>
  );
}
