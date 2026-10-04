import React, { useEffect, useState } from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { listarEntregas, entregarProyecto } from '../../services/api';
// listarEntregas() returns all; we filter by userId client-side
import type { EntregaProyecto } from '../../types';
import { useToast } from '../../components/ui/Toast';
import { Skeleton } from '../../components/ui/Skeleton';
import FileDropzone from '../../components/ui/FileDropzone';
import { subirArchivo } from '../../services/archivos';

const ENTREGABLES = [
  'Plano eléctrico de instalación domiciliaria',
  'Memoria de cálculo',
  'Diagrama unilineal',
  'Cálculo de conductores',
  'Selección de protecciones eléctricas',
  'Diseño de puesta a tierra',
  'Presupuesto de materiales',
];

export default function FinalProject() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [entrega, setEntrega] = useState<EntregaProyecto | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [progreso, setProgreso] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    listarEntregas()
      .then((entregas) => setEntrega(entregas.find((e) => e.userId === user.id) ?? null))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || selectedFiles.length === 0) return;
    setSubmitting(true);
    try {
      // Primero se suben los archivos; la entrega se registra sólo si todos subieron bien.
      const archivos = [];
      for (const [i, f] of selectedFiles.entries()) {
        setProgreso(`Subiendo ${i + 1} de ${selectedFiles.length}: ${f.name}`);
        archivos.push(
          await subirArchivo(f, 'entrega', {
            userId: user.id,
            onProgreso: (p) => setProgreso(`Subiendo ${i + 1} de ${selectedFiles.length}: ${f.name} (${p}%)`),
          }),
        );
      }
      setProgreso('Registrando la entrega…');
      const result = await entregarProyecto(user.id, archivos);
      setEntrega(result);
      setSelectedFiles([]);
      toast('Proyecto entregado exitosamente', 'success');
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      toast(
        code === 'ARCHIVOS_NO_CONFIGURADOS'
          ? 'La subida de archivos aún no está habilitada. Avísale a tu relator.'
          : code === 'TIPO_NO_PERMITIDO'
            ? 'Uno de los archivos no tiene un formato permitido (PDF, Word, Excel, imagen, DWG/DXF o ZIP).'
            : code === 'ARCHIVO_MUY_GRANDE'
              ? 'Uno de los archivos supera los 50 MB.'
              : 'Error al entregar el proyecto. Revisa tu conexión e inténtalo de nuevo.',
        'error',
      );
    } finally {
      setSubmitting(false);
      setProgreso(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 max-w-3xl">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Proyecto Integrador Final</h1>
        <p className="text-gray-500 text-sm mt-1">
          Entrega tu proyecto final para obtener tu certificado de aprobación.
        </p>
      </div>

      {/* Entregables list */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-semibold text-primary mb-4">Entregables Requeridos</h2>
        <div className="space-y-2">
          {ENTREGABLES.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0"
            >
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <span className="text-sm text-gray-700 flex-1">{item}</span>
              {entrega && (
                <CheckCircle size={16} className="text-emerald-500 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* If already submitted */}
      {entrega ? (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={24} className="text-emerald-500" />
            <div>
              <h2 className="font-semibold text-primary">Proyecto Entregado</h2>
              <p className="text-xs text-gray-500">
                {new Date(entrega.fecha).toLocaleDateString('es-CL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <span
              className={`ml-auto text-xs px-2.5 py-1 rounded-full font-semibold ${
                entrega.estado === 'revisado'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {entrega.estado === 'revisado' ? 'Revisado' : 'Pendiente de revisión'}
            </span>
          </div>

          {entrega.nota !== undefined && (
            <div className="bg-emerald-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-emerald-700 font-medium">
                Nota obtenida:{' '}
                <span className="text-2xl font-bold">{entrega.nota.toFixed(1)}</span>
              </p>
              {entrega.comentario && (
                <p className="text-sm text-emerald-600 mt-1">{entrega.comentario}</p>
              )}
            </div>
          )}

          <h3 className="text-sm font-semibold text-gray-500 mb-2">Archivos entregados:</h3>
          <div className="space-y-1.5">
            {entrega.archivos.map((archivo, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                <FileText size={15} className="text-gray-500 shrink-0" />
                {archivo.url && archivo.url !== '#' ? (
                  <a href={archivo.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {archivo.nombre}
                  </a>
                ) : (
                  <span className="text-sm text-gray-700">{archivo.nombre} <span className="text-xs text-red-700">(archivo no disponible, entregado antes de habilitar la subida)</span></span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Upload form */
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-semibold text-primary mb-4">Subir Archivos del Proyecto</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FileDropzone
              onFilesSelected={(files) => setSelectedFiles(files)}
              multiple
              accept=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.dwg,.dxf,.png,.jpg,.jpeg,.webp,.zip"
              label="Arrastra tus archivos del proyecto aquí o haz clic para seleccionar"
              maxSizeMB={50}
            />
            <button
              type="submit"
              disabled={submitting || selectedFiles.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? 'Subiendo...' : 'Entregar Proyecto'}
            </button>
            {progreso && (
              <p role="status" aria-live="polite" className="text-sm text-gray-600">
                {progreso}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
