import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Loader2, LogOut, ScanFace, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { registrarMiRostro, verificarMiRostro } from '../../services/api';
import { MENSAJES_ROSTRO, abrirCamara, capturarFoto, cargarReconocimiento, cerrarCamara, describirRostro } from '../../services/rostro';

type Fase = 'cargando' | 'listo' | 'analizando' | 'exito' | 'error';

const ERRORES_SERVIDOR: Record<string, string> = {
  ROSTRO_NO_COINCIDE: 'Tu rostro no coincide con el registrado. Inténtalo de nuevo con buena luz, mirando de frente.',
  ROSTRO_BLOQUEADO: 'Demasiados intentos fallidos. Espera 10 minutos o pide ayuda a tu relator.',
  ROSTRO_YA_REGISTRADO: 'Tu rostro ya estaba registrado. Recarga la página para verificarlo.',
  ROSTRO_INVALIDO: 'No pudimos leer tu rostro. Inténtalo de nuevo.',
};

/**
 * Verificación facial obligatoria para los alumnos:
 *  - Primera vez: registra su rostro (y queda como su fotografía).
 *  - Cada ingreso: compara su rostro con el registrado antes de ver el contenido.
 */
export default function FaceVerification() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [fase, setFase] = useState<Fase>('cargando');
  const [mensaje, setMensaje] = useState('Preparando la cámara…');
  const [consentimiento, setConsentimiento] = useState(false);
  const registro = user?.estadoRostro === 'registrar';

  // Si ya no corresponde verificar, vuelve a la plataforma.
  useEffect(() => {
    if (user && user.estadoRostro !== 'registrar' && user.estadoRostro !== 'verificar') navigate(user.rol === 'admin' ? '/admin' : '/app', { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        if (!videoRef.current) return;
        streamRef.current = await abrirCamara(videoRef.current);
        setMensaje('Cargando el reconocimiento facial…');
        await cargarReconocimiento();
        if (!cancelado) {
          setFase('listo');
          setMensaje('');
        }
      } catch (e) {
        if (cancelado) return;
        const nombre = e instanceof Error ? e.name : '';
        setFase('error');
        setMensaje(
          nombre === 'NotAllowedError'
            ? 'Debes permitir el acceso a la cámara en tu navegador para continuar.'
            : nombre === 'NotFoundError' || (e instanceof Error && e.message === 'SIN_CAMARA')
              ? 'No encontramos una cámara en este dispositivo. Ingresa desde un equipo con cámara o pide ayuda a tu relator.'
              : 'No pudimos iniciar la cámara o el reconocimiento facial. Recarga la página para intentarlo de nuevo.',
        );
      }
    })();
    return () => {
      cancelado = true;
      cerrarCamara(streamRef.current);
    };
  }, []);

  const capturar = useCallback(async () => {
    const video = videoRef.current;
    if (!video || fase === 'analizando') return;
    setFase('analizando');
    setMensaje('Analizando…');
    try {
      const r = await describirRostro(video);
      if (!r.ok) {
        setFase('listo');
        setMensaje(MENSAJES_ROSTRO[r.motivo]);
        return;
      }
      const u = registro ? await registrarMiRostro(r.descriptor, capturarFoto(video)) : await verificarMiRostro(r.descriptor);
      setFase('exito');
      setMensaje(registro ? 'Rostro registrado.' : 'Identidad verificada.');
      cerrarCamara(streamRef.current);
      setTimeout(() => setUser(u), 700);
    } catch (e) {
      const code = e instanceof Error ? e.message : '';
      setFase(code === 'ROSTRO_BLOQUEADO' ? 'error' : 'listo');
      setMensaje(ERRORES_SERVIDOR[code] ?? 'No pudimos completar la verificación. Inténtalo de nuevo.');
    }
  }, [fase, registro, setUser]);

  const salir = async () => {
    cerrarCamara(streamRef.current);
    await logout();
    navigate('/login', { replace: true });
  };

  const puedeCapturar = fase === 'listo' && (!registro || consentimiento);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center mb-5 text-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <ScanFace size={28} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-primary">{registro ? 'Registra tu rostro' : 'Verifica tu identidad'}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {registro
              ? `Hola ${user?.nombres.split(' ')[0] ?? ''}. Para proteger tu cuenta y tu certificado, registraremos tu rostro. En cada ingreso te pediremos mirarte en la cámara.`
              : 'Mira a la cámara para confirmar que eres tú y acceder al contenido del curso.'}
          </p>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-900">
          <video ref={videoRef} playsInline muted className="h-full w-full object-cover -scale-x-100" aria-label="Vista de la cámara" />
          {/* Guía para ubicar el rostro */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className={`h-[70%] aspect-[3/4] rounded-[50%] border-4 transition-colors ${
                fase === 'exito' ? 'border-emerald-400' : fase === 'analizando' ? 'border-accent' : 'border-white/70'
              }`}
            />
          </div>
          {(fase === 'cargando' || fase === 'analizando') && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-black/50 py-2 text-sm text-white">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" /> {mensaje}
            </div>
          )}
          {fase === 'exito' && (
            <div className="absolute inset-0 flex items-center justify-center bg-emerald-600/70 text-white">
              <ShieldCheck size={56} aria-hidden="true" />
            </div>
          )}
        </div>

        <p role="status" aria-live="polite" className={`mt-3 min-h-[1.25rem] text-sm text-center ${fase === 'error' ? 'text-red-700' : fase === 'exito' ? 'text-emerald-700' : 'text-gray-600'}`}>
          {fase !== 'cargando' && fase !== 'analizando' ? mensaje : ''}
        </p>

        {registro && fase !== 'exito' && (
          <label className="mt-3 flex items-start gap-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600">
            <input type="checkbox" checked={consentimiento} onChange={(e) => setConsentimiento(e.target.checked)} className="mt-0.5 accent-primary" />
            <span>
              Autorizo a CM Ingenierías a guardar mi fotografía y una huella numérica de mi rostro, sólo para verificar mi identidad al ingresar a la
              plataforma y para que el relator pueda reconocerme. Puedo pedir que se eliminen al terminar el curso.
            </span>
          </label>
        )}

        <div className="mt-5 flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={salir}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <LogOut size={16} aria-hidden="true" /> Salir
          </button>
          <button
            type="button"
            onClick={capturar}
            disabled={!puedeCapturar}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 px-4 font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {fase === 'analizando' ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Camera size={16} aria-hidden="true" />}
            {registro ? 'Registrar mi rostro' : 'Verificar'}
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">¿Problemas con la cámara? Escribe a tu relator: puede ayudarte a registrar tu rostro desde una fotografía.</p>
      </div>
    </div>
  );
}
