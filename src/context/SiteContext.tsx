import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { SiteConfig } from '../types';
import { getSitio } from '../services/api';
import { SITIO_POR_DEFECTO } from '../data/sitio';

interface SiteContextValue {
  sitio: SiteConfig;
  cargado: boolean;
  /** Reemplaza la configuración en memoria (vista previa en vivo desde el editor). */
  setSitio: (s: SiteConfig) => void;
  recargar: () => Promise<void>;
}

const SiteContext = createContext<SiteContextValue | null>(null);

const HEX = /^#[0-9a-f]{6}$/i;

/** Aplica los colores de marca como variables CSS (las usan todas las clases `primary`/`accent`). */
export function aplicarColores(primario: string, acento: string) {
  const root = document.documentElement;
  if (HEX.test(primario)) root.style.setProperty('--color-primary', primario);
  if (HEX.test(acento)) root.style.setProperty('--color-accent', acento);
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [sitio, setSitioState] = useState<SiteConfig>(SITIO_POR_DEFECTO);
  const [cargado, setCargado] = useState(false);

  const recargar = useCallback(async () => {
    try {
      setSitioState(await getSitio());
    } catch {
      /* sin conexión: se mantienen los valores por defecto */
    } finally {
      setCargado(true);
    }
  }, []);

  useEffect(() => {
    void recargar();
  }, [recargar]);

  useEffect(() => {
    aplicarColores(sitio.marca.colorPrimario, sitio.marca.colorAcento);
  }, [sitio.marca.colorPrimario, sitio.marca.colorAcento]);

  return (
    <SiteContext.Provider value={{ sitio, cargado, setSitio: setSitioState, recargar }}>{children}</SiteContext.Provider>
  );
}

export function useSitio(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSitio debe usarse dentro de SiteProvider');
  return ctx;
}
