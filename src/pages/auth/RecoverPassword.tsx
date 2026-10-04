import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Mail, Phone } from 'lucide-react';
import { useSitio } from '../../context/SiteContext';
import { enlaceWhatsapp, IconoWhatsapp } from '../../components/landing/RedesIconos';

/**
 * La plataforma no envía correos: la contraseña la restablece el relator desde
 * el panel (Usuarios → Restablecer contraseña). Esta página explica cómo
 * pedírselo, con los datos de contacto configurados en el sitio.
 */
export default function RecoverPassword() {
  const { sitio } = useSitio();
  const c = sitio.contacto;
  const hayContacto = !!(c.whatsapp || c.email || c.telefono);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-4">
            <KeyRound size={28} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-primary">¿Olvidaste tu contraseña?</h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Pídele a tu relator que la restablezca. Te entregará una contraseña temporal y, al ingresar, la plataforma te pedirá crear una nueva.
          </p>
        </div>

        {hayContacto ? (
          <ul className="space-y-2">
            {c.whatsapp && (
              <li>
                <a
                  href={enlaceWhatsapp(c.whatsapp, 'Hola, olvidé mi contraseña de la plataforma del curso. Mi RUT es: ')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  <span className="text-[#187a41]"><IconoWhatsapp size={20} /></span> Escribir por WhatsApp
                </a>
              </li>
            )}
            {c.email && (
              <li>
                <a
                  href={`mailto:${c.email}?subject=${encodeURIComponent('Restablecer contraseña')}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  <Mail size={20} className="text-primary" aria-hidden="true" /> {c.email}
                </a>
              </li>
            )}
            {c.telefono && (
              <li>
                <a
                  href={`tel:${c.telefono.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  <Phone size={20} className="text-primary" aria-hidden="true" /> {c.telefono}
                </a>
              </li>
            )}
          </ul>
        ) : (
          <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700">Contacta a tu relator por el medio que usas habitualmente con él.</p>
        )}

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}
