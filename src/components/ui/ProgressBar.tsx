import React from 'react';

type ProgressColor = 'primary' | 'accent' | 'success' | 'danger';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number;
  label?: string;
  showLabel?: boolean;
  color?: ProgressColor;
  size?: ProgressSize;
  animated?: boolean;
  /** Usar sobre fondos oscuros (texto claro). */
  sobreOscuro?: boolean;
}

const colorClasses: Record<ProgressColor, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-emerald-500',
  danger: 'bg-red-500',
};

const trackColors: Record<ProgressColor, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/20',
  success: 'bg-emerald-100',
  danger: 'bg-red-100',
};

const heightClasses: Record<ProgressSize, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showLabel = true,
  color = 'primary',
  size = 'md',
  animated = false,
  sobreOscuro = false,
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {(label || showLabel) && (
        <div className="flex items-center justify-between">
          {label && <span className={`text-sm font-medium ${sobreOscuro ? 'text-white/90' : 'text-gray-700'}`}>{label}</span>}
          {showLabel && (
            <span className={`text-sm font-semibold ${sobreOscuro ? 'text-white/90' : 'text-gray-600'}`}>{clamped}%</span>
          )}
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${trackColors[color]} ${heightClasses[size]}`}>
        <div
          className={[
            'h-full rounded-full transition-all duration-500 ease-out',
            colorClasses[color],
            animated ? 'animate-pulse' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-label={label ?? 'Progreso'}
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
