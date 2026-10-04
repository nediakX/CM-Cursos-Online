import { useEffect, useState } from 'react';
import type { User } from '../types';
import { getFoto } from '../services/api';
import { iniciales } from '../utils/iniciales';

interface AvatarProps {
  usuario: Pick<User, 'id' | 'nombres' | 'apellidos'> & { tieneFoto?: boolean };
  /** Lado en píxeles. */
  size?: number;
  className?: string;
  /** Forma: círculo (por defecto) o cuadrado redondeado. */
  forma?: 'circulo' | 'cuadrado';
  /** Foto ya conocida (evita pedirla al servidor). */
  foto?: string | null;
  /** Colores de las iniciales: sobre fondo claro (primario) o sobre fondo oscuro (acento). */
  tono?: 'primario' | 'acento';
}

/** Fotografía del usuario o, si no tiene, sus iniciales (nombre + apellido). */
export default function Avatar({ usuario, size = 40, className = '', forma = 'circulo', foto: fotoDada, tono = 'primario' }: AvatarProps) {
  const [foto, setFoto] = useState<string | null>(fotoDada ?? null);

  useEffect(() => {
    if (fotoDada !== undefined) {
      setFoto(fotoDada);
      return;
    }
    let vivo = true;
    setFoto(null);
    if (usuario.tieneFoto) getFoto(usuario.id).then((f) => vivo && setFoto(f));
    return () => {
      vivo = false;
    };
  }, [usuario.id, usuario.tieneFoto, fotoDada]);

  const radio = forma === 'circulo' ? 'rounded-full' : 'rounded-2xl';
  const nombre = `${usuario.nombres} ${usuario.apellidos}`;
  if (foto) {
    return <img src={foto} alt={`Fotografía de ${nombre}`} width={size} height={size} className={`${radio} object-cover shrink-0 ${className}`} style={{ width: size, height: size }} />;
  }
  return (
    <div
      role="img"
      aria-label={nombre}
      className={`${radio} ${tono === 'acento' ? 'bg-accent text-primary' : 'bg-primary text-white'} flex items-center justify-center font-bold shrink-0 select-none ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
    >
      {iniciales(usuario.nombres, usuario.apellidos)}
    </div>
  );
}
