import { Zap } from 'lucide-react';
import { useSitio } from '../context/SiteContext';

interface BrandLogoProps {
  /** `dark`: sobre fondo oscuro (texto blanco). `light`: sobre fondo claro. */
  tono?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  mostrarSubtitulo?: boolean;
  className?: string;
}

const CAJA = { sm: 'w-7 h-7 rounded-md', md: 'w-9 h-9 rounded-lg', lg: 'w-12 h-12 rounded-xl' };
const ICONO = { sm: 14, md: 18, lg: 24 };

/** Logo + nombre de la marca configurados en "Sitio web → Marca". */
export default function BrandLogo({ tono = 'dark', size = 'md', mostrarSubtitulo = true, className = '' }: BrandLogoProps) {
  const { sitio } = useSitio();
  const { nombre, subtitulo, logoUrl } = sitio.marca;
  return (
    <span className={`flex items-center gap-2.5 min-w-0 ${className}`}>
      {logoUrl ? (
        <img src={logoUrl} alt="" className={`${CAJA[size]} object-contain shrink-0 bg-white`} />
      ) : (
        <span className={`${CAJA[size]} bg-accent flex items-center justify-center shrink-0`} aria-hidden="true">
          <Zap size={ICONO[size]} className="text-primary" />
        </span>
      )}
      <span className="min-w-0 leading-tight">
        <span className={`block font-bold truncate ${size === 'lg' ? 'text-lg' : 'text-sm'} ${tono === 'dark' ? 'text-white' : 'text-primary'}`}>
          {nombre}
        </span>
        {mostrarSubtitulo && subtitulo && (
          <span className={`block text-xs truncate ${tono === 'dark' ? 'text-white/70' : 'text-gray-600'}`}>{subtitulo}</span>
        )}
      </span>
    </span>
  );
}
