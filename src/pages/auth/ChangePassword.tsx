import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cambiarPassword } from '../../services/api';

// ---------------------------------------------------------------------------
// Password strength indicator
// ---------------------------------------------------------------------------
interface StrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
}

function getStrength(password: string): StrengthResult {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const capped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
  const map: Record<number, { label: string; color: string }> = {
    0: { label: 'Muy débil', color: 'bg-red-500' },
    1: { label: 'Débil', color: 'bg-orange-400' },
    2: { label: 'Regular', color: 'bg-yellow-400' },
    3: { label: 'Fuerte', color: 'bg-green-400' },
    4: { label: 'Muy fuerte', color: 'bg-green-600' },
  };
  return { score: capped, ...map[capped] };
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const { score, label, color } = getStrength(password);
  return (
    <div className="mt-1 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i < score ? color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ChangePassword page
// ---------------------------------------------------------------------------
export default function ChangePassword() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [showActual, setShowActual] = useState(false);
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validate = (): string => {
    if (!actual) return 'Ingresa tu contraseña actual.';
    if (nueva.length < 8) return 'La nueva contraseña debe tener al menos 8 caracteres.';
    if (nueva === actual) return 'La nueva contraseña no puede ser igual a la actual.';
    if (nueva !== confirmar) return 'Las contraseñas no coinciden.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    try {
      await cambiarPassword(actual, nueva);
      setUser({ ...user!, debeCambiarPassword: false });
      setSuccess(true);
      setTimeout(() => {
        navigate(user?.rol === 'admin' ? '/admin' : '/app', { replace: true });
      }, 1800);
    } catch {
      setError('No se pudo cambiar la contraseña. Verifica la contraseña actual.');
    } finally {
      setLoading(false);
    }
  };

  const passwordField = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    show: boolean,
    toggle: () => void,
    id: string,
    withStrength = false,
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => { onChange(e.target.value); setError(''); }}
          autoComplete="new-password"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 transition-colors"
          aria-label={show ? 'Ocultar' : 'Mostrar'}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {withStrength && <PasswordStrength password={value} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">Cambiar contraseña</h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            {user?.debeCambiarPassword
              ? 'Debes cambiar tu contraseña antes de continuar.'
              : 'Actualiza tu contraseña de acceso.'}
          </p>
        </div>

        {success ? (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-4 text-center text-sm text-green-700 font-medium">
            ✓ Contraseña actualizada correctamente. Redirigiendo…
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {passwordField(
              'Contraseña actual',
              actual,
              setActual,
              showActual,
              () => setShowActual((v) => !v),
              'actual',
            )}
            {passwordField(
              'Nueva contraseña',
              nueva,
              setNueva,
              showNueva,
              () => setShowNueva((v) => !v),
              'nueva',
              true,
            )}
            {passwordField(
              'Confirmar nueva contraseña',
              confirmar,
              setConfirmar,
              showConfirmar,
              () => setShowConfirmar((v) => !v),
              'confirmar',
            )}

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-2.5 px-4 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Guardando…' : 'Cambiar contraseña'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
