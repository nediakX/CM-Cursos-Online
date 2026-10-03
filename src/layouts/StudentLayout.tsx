import { Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  ClipboardList,
  MessageSquare,
  FolderOpen,
  Award,
  User,
  LogOut,
  Menu,
  X,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BrandLogo from '../components/BrandLogo';

const navItems = [
  { to: '/app', label: 'Inicio', icon: Home, end: true },
  { to: '/app/cursos', label: 'Mis Cursos', icon: BookOpen },
  { to: '/app/evaluaciones', label: 'Evaluaciones', icon: ClipboardList },
  { to: '/app/consultas', label: 'Consultas', icon: MessageSquare },
  { to: '/app/proyecto', label: 'Proyecto Final', icon: FolderOpen },
  { to: '/app/certificados', label: 'Mis Certificados', icon: Award },
  { to: '/app/perfil', label: 'Perfil', icon: User },
];

function formatRut(rut: string): string {
  if (!rut) return '';
  const clean = rut.replace(/[^0-9kK]/g, '');
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formatted}-${dv}`;
}

interface SidebarContentProps {
  onNavClick?: () => void;
}

function SidebarContent({ onNavClick }: SidebarContentProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-primary">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <BrandLogo tono="dark" />
      </div>

      {/* Nav */}
      <nav aria-label="Menú del alumno" className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavClick}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-white text-primary'
                  : 'text-white/80 hover:text-white hover:bg-white/10',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} aria-hidden="true" className={isActive ? 'text-primary' : 'text-white/80'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="border-t border-white/10 p-4">
        <div className="mb-3 px-1">
          <p className="text-white text-sm font-semibold truncate">
            {user?.nombres} {user?.apellidos}
          </p>
          <p className="text-white/70 text-xs">{formatRut(user?.rut ?? '')}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 text-sm transition-all"
        >
          <LogOut size={16} aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default function StudentLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú móvil al navegar y con la tecla Escape.
  useEffect(() => setDrawerOpen(false), [location.pathname]);
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <a href="#contenido-principal" className="skip-link">Saltar al contenido</a>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        id="menu-alumno"
        className={[
          'fixed inset-y-0 left-0 w-64 z-50 lg:hidden transform transition-transform duration-300',
          drawerOpen ? 'translate-x-0 visible' : '-translate-x-full invisible',
        ].join(' ')}
      >
        <SidebarContent onNavClick={() => setDrawerOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-primary shadow-sm shrink-0">
          <BrandLogo tono="dark" size="sm" mostrarSubtitulo={false} />
          <button
            onClick={() => setDrawerOpen((v) => !v)}
            aria-expanded={drawerOpen}
            aria-controls="menu-alumno"
            aria-label={drawerOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {drawerOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Content */}
        <main id="contenido-principal" tabIndex={-1} className="flex-1 overflow-y-auto p-4 lg:p-6 outline-none">
          <Suspense
            fallback={
              <div className="py-20 flex justify-center" role="status">
                <Loader2 className="animate-spin text-primary" size={32} aria-hidden="true" />
                <span className="sr-only">Cargando…</span>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
