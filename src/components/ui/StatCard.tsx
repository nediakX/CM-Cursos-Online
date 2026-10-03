import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

type StatColor = 'primary' | 'accent' | 'success' | 'warning' | 'danger';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: number;
  color?: StatColor;
}

const colorMap: Record<StatColor, { icon: string; bg: string; text: string }> = {
  primary: { icon: 'text-primary', bg: 'bg-primary/10', text: 'text-primary' },
  accent: { icon: 'text-accent', bg: 'bg-accent/15', text: 'text-accent-hover' },
  success: { icon: 'text-emerald-600', bg: 'bg-emerald-100', text: 'text-emerald-600' },
  warning: { icon: 'text-amber-600', bg: 'bg-amber-100', text: 'text-amber-600' },
  danger: { icon: 'text-red-600', bg: 'bg-red-100', text: 'text-red-600' },
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
}) => {
  const colors = colorMap[color];
  const trendPositive = trend !== undefined && trend >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-start gap-4">
      {icon && (
        <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${colors.bg}`}>
          <span className={colors.icon}>{icon}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 font-medium truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5 leading-none">{value}</p>
        <div className="flex items-center gap-2 mt-1.5">
          {trend !== undefined && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                trendPositive ? 'text-emerald-600' : 'text-red-700'
              }`}
            >
              {trendPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {Math.abs(trend)}%
            </span>
          )}
          {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
