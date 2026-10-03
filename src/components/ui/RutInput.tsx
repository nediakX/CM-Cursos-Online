import React from 'react';
import Input from './Input';

// Inline RUT utilities to avoid dependency on external util file during isolated use
function formatearRut(rut: string): string {
  // Remove non-numeric and non-k characters
  let cleaned = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (!cleaned) return '';

  // Separate verifier digit
  const verifier = cleaned.slice(-1);
  let body = cleaned.slice(0, -1);

  // Format body with dots every 3 digits from the right
  let formatted = '';
  while (body.length > 3) {
    formatted = '.' + body.slice(-3) + formatted;
    body = body.slice(0, -3);
  }
  formatted = body + formatted;

  return `${formatted}-${verifier}`;
}

function validarRut(rut: string): boolean {
  const cleaned = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleaned.length < 2) return false;

  const body = cleaned.slice(0, -1);
  const verifier = cleaned.slice(-1);

  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const expected = remainder === 0 ? '0' : remainder === 1 ? 'K' : String(11 - remainder);

  return verifier === expected;
}

interface RutInputProps {
  value: string;
  onChange: (rut: string) => void;
  error?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

const RutInput: React.FC<RutInputProps> = ({
  value,
  onChange,
  error,
  label = 'RUT',
  disabled,
  placeholder = '12.345.678-9',
}) => {
  const [touched, setTouched] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9kK]/g, '');
    const formatted = raw.length > 1 ? formatearRut(raw) : raw;
    onChange(formatted);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const showError =
    error ||
    (touched && value.length > 1 && !validarRut(value.replace(/[^0-9kK]/g, ''))
      ? 'RUT inválido'
      : undefined);

  return (
    <Input
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={showError}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={12}
      inputMode="text"
      autoComplete="off"
    />
  );
};

export default RutInput;
