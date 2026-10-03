import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  GraduationCap,
  Zap,
  Sun,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatearRut, validarRut, limpiarRut } from '../../utils/rut';
import BrandLogo from '../../components/BrandLogo';
import { useSitio } from '../../context/SiteContext';

export default function Login() {
  const { login } = useAuth();
  const { sitio } = useSitio();
  const navigate = useNavigate();

  const [rut, setRut] = useState('');
  const [rutError, setRutError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = limpiarRut(raw);
    setRut(clean.length > 0 ? formatearRut(clean) : '');
    setRutError('');
    setError('');
  };

  const handleRutBlur = () => {
    if (rut && !validarRut(rut)) {
      setRutError('RUT inválido. Verifique el dígito verificador.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validarRut(rut)) {
      setRutError('RUT inválido. Verifique el dígito verificador.');
      return;
    }

    setLoading(true);
    try {
      const u = await login(limpiarRut(rut), password);
      navigate(u.rol === 'admin' ? '/admin' : '/app', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg === 'CREDENCIALES_INVALIDAS') {
        setError('Credenciales incorrectas. Verifique su RUT y contraseña.');
      } else if (msg === 'USUARIO_DESACTIVADO') {
        setError('Tu cuenta está desactivada. Contacta al administrador.');
      } else {
        setError('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-between p-10 relative overflow-hidden">
        {/* Decorative SVG background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Solar panel grid */}
          {[0, 80, 160, 240, 320].map((y) =>
            [0, 90, 180, 270, 360, 450].map((x) => (
              <rect
                key={`${x}-${y}`}
                x={x + 20}
                y={y + 400}
                width={70}
                height={60}
                rx={4}
                fill="var(--color-accent)"
                opacity={0.6}
              />
            )),
          )}
          {/* Electrical panel */}
          <rect x={60} y={100} width={160} height={220} rx={8} fill="white" opacity={0.15} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={80} y={120 + i * 30} width={120} height={18} rx={4} fill="white" opacity={0.2} />
          ))}
          {/* Lightning bolts */}
          <path d="M300 50 L280 110 L310 110 L290 170" stroke="var(--color-accent)" strokeWidth={4} fill="none" opacity={0.5} />
          <path d="M480 200 L460 260 L490 260 L470 320" stroke="var(--color-accent)" strokeWidth={3} fill="none" opacity={0.4} />
        </svg>

        {/* Logo */}
        <Link to="/" className="relative z-10 self-start rounded-lg" aria-label={`${sitio.marca.nombre}: volver al sitio`}>
          <BrandLogo tono="dark" size="lg" />
        </Link>

        {/* Main copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Plataforma de Formación Eléctrica
          </h1>
          <p className="text-accent font-medium mb-10 text-lg">
            Instalador Eléctrico Clase D SEC • Sistemas Fotovoltaicos
          </p>

          <ul className="space-y-5">
            {[
              { icon: <GraduationCap size={20} />, text: 'Clases online cuando quieras' },
              { icon: <Zap size={20} />, text: 'Simuladores de examen SEC' },
              { icon: <Sun size={20} />, text: 'Certificación reconocida' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-white/90">
                <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0">
                  {icon}
                </span>
                <span className="text-base">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom tagline */}
        <p className="relative z-10 text-white/70 text-xs">
          © {new Date().getFullYear()} {sitio.marca.nombre} {sitio.marca.subtitulo}
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="flex md:hidden mb-8 self-start rounded-lg" aria-label={`${sitio.marca.nombre}: volver al sitio`}>
            <BrandLogo tono="light" />
          </Link>

          <h2 className="text-2xl font-bold text-primary mb-1">Iniciar Sesión</h2>
          <p className="text-gray-600 text-sm mb-8">El acceso es entregado por tu administrador</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* RUT */}
            <div className="flex flex-col gap-1">
              <label htmlFor="rut" className="text-sm font-medium text-gray-700">
                RUT
              </label>
              <input
                id="rut"
                type="text"
                autoComplete="username"
                placeholder="12.345.678-9"
                value={rut}
                onChange={handleRutChange}
                onBlur={handleRutBlur}
                aria-invalid={!!rutError || undefined}
                aria-describedby={rutError ? 'rut-error' : undefined}
                className={[
                  'w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400',
                  'transition-all duration-150 outline-none',
                  'focus:ring-2 focus:ring-primary focus:border-primary',
                  rutError ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-300',
                ].join(' ')}
              />
              {rutError && <p id="rut-error" className="text-xs text-red-700">{rutError}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Recover link */}
            <div className="flex justify-end">
              <Link
                to="/recuperar-password"
                className="text-sm text-primary hover:text-accent transition-colors underline underline-offset-2"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Global error */}
            {error && (
              <div role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !rut || !password}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-2.5 px-4 hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? 'Ingresando…' : 'Ingresar'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Aún no eres alumno?{' '}
            <Link to="/#inscripcion" className="font-semibold text-primary underline underline-offset-2">
              Conoce el curso e inscríbete
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}