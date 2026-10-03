import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { formatearRut, validarRut, limpiarRut } from '../../utils/rut';
import { recuperarPassword } from '../../services/api';

export default function RecoverPassword() {
  const [rut, setRut] = useState('');
  const [rutError, setRutError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = limpiarRut(e.target.value);
    setRut(clean.length > 0 ? formatearRut(clean) : '');
    setRutError('');
  };

  const handleRutBlur = () => {
    if (rut && !validarRut(rut)) {
      setRutError('RUT inválido. Verifique el dígito verificador.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarRut(rut)) {
      setRutError('RUT inválido. Verifique el dígito verificador.');
      return;
    }
    setLoading(true);
    try {
      await recuperarPassword(limpiarRut(rut));
      setSent(true);
    } catch {
      // Still show success message to avoid RUT enumeration
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">Recuperar contraseña</h1>
          <p className="text-sm text-gray-500 text-center mt-1">
            Ingresa tu RUT y te enviaremos instrucciones a tu correo registrado.
          </p>
        </div>

        {sent ? (
          <div className="space-y-5">
            <div className="rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-sm text-green-700">
              Si el RUT está registrado, recibirás un correo con instrucciones para recuperar tu
              contraseña.
            </div>
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="flex flex-col gap-1">
              <label htmlFor="rut-recover" className="text-sm font-medium text-gray-700">
                RUT
              </label>
              <input
                id="rut-recover"
                type="text"
                placeholder="12.345.678-9"
                value={rut}
                onChange={handleRutChange}
                onBlur={handleRutBlur}
                className={[
                  'w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400',
                  'transition-all duration-150 outline-none focus:ring-2 focus:ring-primary focus:border-primary',
                  rutError ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-300',
                ].join(' ')}
              />
              {rutError && <p className="text-xs text-red-700">{rutError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !rut}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-2.5 px-4 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Enviando…' : 'Recuperar contraseña'}
            </button>

            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Volver al inicio de sesión
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
