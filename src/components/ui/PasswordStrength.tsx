import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

type StrengthLevel = 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';

interface StrengthResult {
  score: number;
  level: StrengthLevel;
  label: string;
  color: string;
  trackColor: string;
}

function evaluateStrength(password: string): StrengthResult {
  if (!password) {
    return { score: 0, level: 'very-weak', label: '', color: 'bg-gray-200', trackColor: 'bg-gray-100' };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Normalize to 0-4
  const normalized = Math.min(4, Math.floor((score / 6) * 5));

  const map: Record<number, Omit<StrengthResult, 'score'>> = {
    0: { level: 'very-weak', label: 'Muy débil', color: 'bg-red-500', trackColor: 'bg-red-100' },
    1: { level: 'weak', label: 'Débil', color: 'bg-orange-500', trackColor: 'bg-orange-100' },
    2: { level: 'medium', label: 'Regular', color: 'bg-amber-400', trackColor: 'bg-amber-100' },
    3: { level: 'strong', label: 'Fuerte', color: 'bg-emerald-500', trackColor: 'bg-emerald-100' },
    4: { level: 'very-strong', label: 'Muy fuerte', color: 'bg-emerald-600', trackColor: 'bg-emerald-100' },
  };

  return { score: normalized, ...map[normalized] };
}

const criteria = [
  { label: 'Mínimo 8 caracteres', test: (p: string) => p.length >= 8 },
  { label: 'Letra mayúscula', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Letra minúscula', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Número', test: (p: string) => /[0-9]/.test(p) },
  { label: 'Carácter especial', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const { score, label, color, trackColor } = evaluateStrength(password);

  if (!password) return null;

  return (
    <div className="flex flex-col gap-2 mt-1">
      {/* Strength bars */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= score - 1 ? color : trackColor
              }`}
            />
          ))}
        </div>
        {label && (
          <span
            className={`text-xs font-semibold whitespace-nowrap ${
              score <= 1
                ? 'text-red-700'
                : score === 2
                ? 'text-amber-500'
                : 'text-emerald-600'
            }`}
          >
            {label}
          </span>
        )}
      </div>

      {/* Criteria checklist */}
      <ul className="flex flex-col gap-0.5">
        {criteria.map(({ label: cLabel, test }) => {
          const passed = test(password);
          return (
            <li key={cLabel} className="flex items-center gap-1.5">
              <span
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 transition-colors ${
                  passed ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {passed ? '✓' : '·'}
              </span>
              <span className={`text-xs ${passed ? 'text-gray-600' : 'text-gray-500'}`}>
                {cLabel}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrength;
