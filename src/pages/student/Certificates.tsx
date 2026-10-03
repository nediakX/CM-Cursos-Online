import React, { useEffect, useState } from 'react';
import { Award, CheckCircle, XCircle, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSitio } from '../../context/SiteContext';
import {
  puedeEmitirCertificado,
  listarCertificados,
  emitirCertificado,
  listarEntregas,
} from '../../services/api';
import type { Certificado } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { Skeleton } from '../../components/ui/Skeleton';

type EmisionCheck = {
  puede: boolean;
  razon?: string;
  asistenciaPromedio: number;
  notaFinal: number;
};

function formatRut(rut: string): string {
  if (!rut) return '';
  const clean = rut.replace(/[^0-9kK]/g, '');
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toUpperCase();
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
}

export default function Certificates() {
  const { sitio } = useSitio();
  const marca = `${sitio.marca.nombre} ${sitio.marca.subtitulo}`.trim();
  const { user } = useAuth();
  const { toast } = useToast();
  const [emision, setEmision] = useState<EmisionCheck | null>(null);
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [proyectoEntregado, setProyectoEntregado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      puedeEmitirCertificado(user.id, 'curso-1'),
      listarCertificados(user.id),
      listarEntregas(),
    ])
      .then(([em, certs, entregas]) => {
        setEmision(em);
        setCertificados(certs);
        setProyectoEntregado(entregas.some((e) => e.userId === user.id));
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleGenerar = async () => {
    if (!user) return;
    setGenerating(true);
    try {
      const cert = await emitirCertificado(user.id, 'curso-1');
      setCertificados((prev) => [cert, ...prev]);
      toast('Certificado generado exitosamente', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al generar el certificado';
      toast(msg, 'error');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  const cert = certificados[0] ?? null;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-primary">Mis Certificados</h1>

      {/* Requirements checklist */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-primary mb-4">Requisitos de Certificación</h2>
        <div className="space-y-3">
          {/* Asistencia */}
          <div className="flex items-center gap-3">
            {emision && emision.asistenciaPromedio >= 75 ? (
              <CheckCircle size={20} className="text-emerald-500 shrink-0" />
            ) : (
              <XCircle size={20} className="text-red-400 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">Asistencia mínima 75%</p>
              <p
                className={`text-xs font-semibold ${
                  emision && emision.asistenciaPromedio >= 75 ? 'text-emerald-600' : 'text-red-700'
                }`}
              >
                {emision?.asistenciaPromedio ?? 0}% actual
              </p>
            </div>
          </div>

          {/* Nota final */}
          <div className="flex items-center gap-3">
            {emision && emision.notaFinal >= 4.0 ? (
              <CheckCircle size={20} className="text-emerald-500 shrink-0" />
            ) : (
              <XCircle size={20} className="text-red-400 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">Nota final mínima 4,0</p>
              <p
                className={`text-xs font-semibold ${
                  emision && emision.notaFinal >= 4.0 ? 'text-emerald-600' : 'text-red-700'
                }`}
              >
                {emision?.notaFinal ? emision.notaFinal.toFixed(1) : 'Sin nota'} actual
              </p>
            </div>
          </div>

          {/* Proyecto */}
          <div className="flex items-center gap-3">
            {proyectoEntregado ? (
              <CheckCircle size={20} className="text-emerald-500 shrink-0" />
            ) : (
              <XCircle size={20} className="text-red-400 shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium text-gray-700">Proyecto integrador entregado</p>
              <p
                className={`text-xs font-semibold ${
                  proyectoEntregado ? 'text-emerald-600' : 'text-red-700'
                }`}
              >
                {proyectoEntregado ? 'Entregado' : 'Pendiente'}
              </p>
            </div>
          </div>
        </div>

        {/* Motivos / Generate */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          {cert ? (
            <p className="text-sm text-emerald-700 font-medium flex items-center gap-2">
              <Award size={16} /> Ya tienes un certificado emitido
            </p>
          ) : emision?.puede ? (
            <button
              onClick={handleGenerar}
              disabled={generating}
              className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary rounded-xl text-sm font-bold hover:bg-accent-hover disabled:opacity-50 transition-all"
            >
              <Award size={16} />
              {generating ? 'Generando...' : 'Generar Certificado'}
            </button>
          ) : (
            <div>
              <p className="text-sm font-medium text-red-600 mb-2">Requisitos pendientes:</p>
              {emision?.razon && (
                <p className="text-sm text-red-700 flex items-start gap-1.5">
                  <XCircle size={13} className="shrink-0 mt-0.5" /> {emision.razon}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Certificate preview */}
      {cert && (
        <div>
          <div className="flex justify-end mb-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Download size={15} /> Descargar PDF
            </button>
          </div>

          {/* Certificate card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-primary p-8">
            {/* Header */}
            <div className="text-center border-b-2 border-accent pb-6 mb-6">
              <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-1">
                {marca}
              </p>
              <h2 className="text-2xl font-black text-primary tracking-wide">
                CERTIFICADO DE APROBACIÓN
              </h2>
            </div>

            {/* Body */}
            <div className="text-center space-y-3 mb-8">
              <p className="text-gray-500 text-sm">Se certifica que</p>
              <p className="text-2xl font-bold text-primary">
                {user?.nombres} {user?.apellidos}
              </p>
              <p className="text-sm text-gray-500">
                RUT: <span className="font-semibold">{formatRut(user?.rut ?? '')}</span>
              </p>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                ha aprobado satisfactoriamente el programa de formación
              </p>
              <p className="text-lg font-bold text-primary">
                Instalador Eléctrico Clase D SEC
              </p>
              <div className="flex justify-center gap-8 text-sm text-gray-600 mt-2">
                <div>
                  <p className="text-xs text-gray-500">Horas</p>
                  <p className="font-bold text-primary text-lg">{cert.horas}h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nota Final</p>
                  <p className="font-bold text-primary text-lg">{cert.notaFinal.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fecha</p>
                  <p className="font-bold text-primary text-lg">
                    {new Date(cert.fechaEmision).toLocaleDateString('es-CL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <div>
                <div className="w-32 border-b border-gray-400 mb-1" />
                <p className="text-xs text-gray-500">Dirección Académica</p>
                <p className="text-xs text-gray-600 font-medium">{marca}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Código de verificación</p>
                <p className="text-xs font-mono font-bold text-primary">
                  {cert.codigoVerificacion}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
