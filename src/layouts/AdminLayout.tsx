import React, { Suspense, useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, LockOpen, LogIn, BookOpen, HelpCircle, MessageSquare, FolderOpen, Calendar, Award, BarChart3,
  LogOut, Menu, X, Globe, Inbox, ExternalLink, Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BrandLogo from '../components/BrandLogo';
import { listarSolicitudes } from '../services/api';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const GRUPOS: { titulo: string; items: NavItem[] }[] = [
  {
    titulo: 'General',
    items: [
      { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
      { to: '/admin/solicitudes', icon: <Inbox size={18} />, label: 'Solicitudes' },
      { to: '/admin/usuarios', icon: <Users size={18} />, label: 'Usuarios' },
    ],
  },
  {
    titulo: 'Contenido',
    items: [
      { to: '/admin/sitio', icon: <Globe size={18} />, label: 'Sitio web' },
      { to: '/admin/cursos', icon: <BookOpen size={18} />, label: 'Cursos y lecciones' },
      { to: '/admin/banco-preguntas', icon: <HelpCircle size={18} />, label: 'Banco de preguntas' },
    ],
  },
  {
    titulo: 'Seguimiento',
    items: [
      { to: '/admin/consultas', icon: <MessageSquare size={18} />, label: 'Consultas' },
      { to: '/admin/proyectos', icon: <FolderOpen size={18} />, label: 'Proyectos' },
      { to: '/admin/modulos', icon: <LockOpen size={18} />, label: 'Habilitar módulos' },
      { to: '/admin/ingresos', icon: <LogIn size={18} />, label: 'Registro de ingresos' },
      { to: '/admin/asistencia', icon: <Calendar size={18} />, label: 'Asistencia' },
      { to: '/admin/certificados', icon: <Award size={18} />, label: 'Certificados' },
      { to: '/admin/reportes', icon: <BarChart3 size={18} />, label: 'Reportes' },
    ],
  },
];

const SidebarContent: React.FC<{ onNavClick?: () => void; nuevas: number }> = ({ onNavClick, nuevas }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-white/10">
        <BrandLogo tono="dark" />
      </div>

      <nav aria-label="Menú de administración" className="flex-1 overflow-y-auto px-3 py-4">
        {GRUPOS.map((g) => (
          <div key={g.titulo} className="mb-4">
            <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/60">{g.titulo}</p>
            <ul className="flex flex-col gap-0.5">
              {g.items.map(({ to, icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/admin'}
                    onClick={onNavClick}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive ? 'bg-primary text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white',
                      ].join(' ')
                    }
                  >
                    <span aria-hidden="true">{icon}</span>
                    <span className="flex-1">{label}</span>
                    {to === '/admin/solicitudes' && nuevas > 0 && (
                      <span className="min-w-5 h-5 px-1.5 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center">
                        {nuevas}
                        <span className="sr-only"> nuevas</span>
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
          <ExternalLink size={18} aria-hidden="true" />
          Ver página pública
          <span className="sr-only"> (pestaña nueva)</span>
        </a>
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 py-2 mb-1 flex items-center gap-3">
          {user && <Avatar usuario={user} size={36} className="ring-2 ring-white/20" tono="acento" />}
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user ? `${user.nombres} ${user.apellidos}` : 'Administrador'}</p>
            <p className="text-white/70 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={18} aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

const AdminLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [nuevas, setNuevas] = useState(0);
  const location = useLocation();

  useEffect(() => setDrawerOpen(false), [location.pathname]);

  // Contador de solicitudes nuevas (se actualiza al cambiar de página).
  useEffect(() => {
    listarSolicitudes()
      .then((s) => setNuevas(s.filter((x) => x.estado === 'nueva').length))
      .catch(() => {});
  }, [location.pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <a href="#contenido-admin" className="skip-link">Saltar al contenido</a>

      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-primary-light">
        <SidebarContent nuevas={nuevas} />
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <aside id="menu-admin" className="relative w-72 max-w-[85vw] bg-primary-light flex flex-col h-full shadow-2xl" aria-label="Menú">
            <button className="absolute top-4 right-4 p-1 rounded-lg text-white/80 hover:text-white" onClick={() => setDrawerOpen(false)} aria-label="Cerrar menú">
              <X size={20} />
            </button>
            <SidebarContent nuevas={nuevas} onNavClick={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="menu-admin"
            aria-label="Abrir menú"
            className="p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <BrandLogo tono="light" size="sm" mostrarSubtitulo={false} />
        </header>

        <main id="contenido-admin" tabIndex={-1} className="flex-1 overflow-y-auto outline-none">
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
};

export default AdminLayout;
