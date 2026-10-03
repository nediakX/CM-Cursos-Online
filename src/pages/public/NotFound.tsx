import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página no encontrada';
  }, []);
  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <header className="px-6 py-5">
        <Link to="/" aria-label="Volver al inicio" className="inline-block rounded-lg">
          <BrandLogo tono="dark" />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="text-center max-w-md">
          <p className="text-7xl font-extrabold text-accent" aria-hidden="true">404</p>
          <h1 className="mt-4 text-2xl font-bold text-white">No encontramos esta página</h1>
          <p className="mt-2 text-white/80">Puede que el enlace esté mal escrito o que la página ya no exista.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-primary font-bold hover:bg-accent-hover">
              <ArrowLeft size={18} aria-hidden="true" /> Ir al inicio
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10">
              Ingresar al aula
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
