import {
  Award, BookOpen, Briefcase, Calculator, CheckCircle2, ClipboardCheck, Clock, Cpu, FileText, GraduationCap,
  HardHat, Lightbulb, MessageCircle, MonitorPlay, PlugZap, Shield, Smartphone, Star, Sun, Target, TrendingUp,
  UserPlus, Users, Wrench, Zap, type LucideIcon,
} from 'lucide-react';

/** Íconos que el administrador puede elegir para beneficios y pasos de la landing. */
export const ICONOS: Record<string, LucideIcon> = {
  Award, BookOpen, Briefcase, Calculator, CheckCircle2, ClipboardCheck, Clock, Cpu, FileText, GraduationCap,
  HardHat, Lightbulb, MessageCircle, MonitorPlay, PlugZap, Shield, Smartphone, Star, Sun, Target, TrendingUp,
  UserPlus, Users, Wrench, Zap,
};

export const ICONOS_DISPONIBLES = Object.keys(ICONOS);

export function Icono({ nombre, size = 22, className }: { nombre: string; size?: number; className?: string }) {
  const C = ICONOS[nombre] ?? Zap;
  return <C size={size} className={className} aria-hidden="true" />;
}
