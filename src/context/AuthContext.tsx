import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User } from '../types';
import { getToken, getSesion, login as apiLogin, logout as apiLogout } from '../services/api';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (rut: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  /** Vuelve a leer la sesión (p. ej. para ver módulos recién habilitados). */
  refrescar: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restaura la sesión al recargar la página
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    getSesion()
      .then(setUser)
      .catch(() => {
        void apiLogout();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (rut: string, password: string) => {
    const u = await apiLogin(rut, password);
    setUser(u);
    return u;
  }, []);

  const refrescar = useCallback(async () => {
    if (!getToken()) return;
    try {
      const nuevo = await getSesion();
      // Sólo actualiza si algo cambió, para no recargar las páginas sin motivo.
      setUser((actual) => (JSON.stringify(actual) === JSON.stringify(nuevo) ? actual : nuevo));
    } catch (e) {
      // Sesión inválida o usuario desactivado: se cierra la sesión.
      if (e instanceof Error && (e.message === 'HTTP_401' || e.message === 'VERIFICACION_FACIAL_REQUERIDA')) {
        await apiLogout();
        setUser(null);
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  // Mantiene la sesión al día (módulos habilitados, cuenta desactivada…):
  // al volver a la pestaña y cada minuto mientras está abierta.
  useEffect(() => {
    if (!user) return;
    const alVolver = () => {
      if (document.visibilityState === 'visible') void refrescar();
    };
    document.addEventListener('visibilitychange', alVolver);
    const t = window.setInterval(alVolver, 60_000);
    return () => {
      document.removeEventListener('visibilitychange', alVolver);
      window.clearInterval(t);
    };
  }, [user?.id, refrescar]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser, refrescar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
