import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, Award } from 'lucide-react';
import { verificarCertificado } from '../../services/api';
import { Certificado, User, Curso } from '../../types';
import { formatFechaCL, formatearRut } from '../../utils/rut';
import BrandLogo from '../../components/BrandLogo';
import { useSitio } from '../../context/SiteContext';

type VerifyResult = (Certificado & { usuario: User; curso: Curso }) | null;

export default function VerifyCertificate() {
  const { codigo } = useParams<{ codigo?: string }>();
  const navigate = useNavigate();
  const { sitio } = useSitio();
  const [input, setInput] = useState(codigo || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult>(undefined as any);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (codigo) {
      handleVerify(codigo);
    }
  }, []);

  const handleVerify = async (code?: string) => {
    const c = code || input.trim();
    if (!c) return;
    setLoading(true);
    setSearched(false);
    try {
      const res = await verificarCertificado(c);
      setResult(res);
      setSearched(true);
    } catch {
      setResult(null);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="rounded-lg" aria-label={`${sitio.marca.nombre}: ir al inicio`}>
            <BrandLogo tono="dark" mostrarSubtitulo={false} />
          </Link>
          <p className="hidden sm:block text-sm text-white/80">Verificación de certificados</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">Verificar Certificado</h1>
          <p className="text-gray-600 text-sm">Ingresa el código de verificación para validar la autenticidad del certificado</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <label htmlFor="codigo-verificacion" className="block text-sm font-medium text-gray-700 mb-2">Código de Verificación</label>
          <div className="flex gap-2">
            <input
              id="codigo-verificacion"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && handleVerify()}
              placeholder="Ej: CM-2026-AB12CD"
              className="flex-1 min-w-0 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
            />
            <button
              onClick={() => handleVerify()}
              disabled={loading || !input.trim()}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              Verificar
            </button>
          </div>
        </div>

        {/* Result */}
        {searched && result && result.estado === 'vigente' && (
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-green-500 p-6">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-green-700 text-lg">Certificado Válido</h2>
                <p className="text-sm text-green-600">Este certificado es auténtico y está vigente</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Nombre</p>
                <p className="font-medium text-gray-900">{result.usuario.nombres} {result.usuario.apellidos}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">RUT</p>
                <p className="font-medium text-gray-900">{formatearRut(result.usuario.rut)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Curso</p>
                <p className="font-medium text-gray-900">{result.curso.nombre}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Horas</p>
                <p className="font-medium text-gray-900">{result.horas} horas</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Nota Final</p>
                <p className="font-bold text-green-700">{result.notaFinal.toFixed(1)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Fecha de Emisión</p>
                <p className="font-medium text-gray-900">{formatFechaCL(result.fechaEmision)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Código</p>
                <p className="font-mono text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">{result.codigoVerificacion}</p>
              </div>
            </div>
          </div>
        )}

        {searched && result && result.estado === 'anulado' && (
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-red-500 p-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-red-700 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-red-700 text-lg">Certificado Anulado</h2>
                <p className="text-sm text-red-600">Este certificado ha sido anulado y no es válido</p>
              </div>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-gray-300 p-6">
            <div className="flex items-start gap-3">
              <XCircle className="w-6 h-6 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-gray-700 text-lg">Código No Encontrado</h2>
                <p className="text-sm text-gray-500">No se encontró ningún certificado con el código ingresado. Verifica que el código esté correcto.</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-600 mt-8">
          {sitio.marca.nombre} {sitio.marca.subtitulo}
        </p>
      </main>
    </div>
  );
}
