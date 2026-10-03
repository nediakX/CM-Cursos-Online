import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const typeConfig: Record<ToastType, { icon: React.ReactNode; classes: string }> = {
  success: {
    icon: <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />,
    classes: 'border-l-4 border-emerald-500',
  },
  error: {
    icon: <XCircle size={18} className="text-red-700 shrink-0" />,
    classes: 'border-l-4 border-red-500',
  },
  warning: {
    icon: <AlertTriangle size={18} className="text-amber-500 shrink-0" />,
    classes: 'border-l-4 border-amber-500',
  },
  info: {
    icon: <Info size={18} className="text-blue-500 shrink-0" />,
    classes: 'border-l-4 border-blue-500',
  },
};

const TOAST_DURATION = 4000;

interface SingleToastProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

const SingleToast: React.FC<SingleToastProps> = ({ item, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Trigger enter animation
    const raf = requestAnimationFrame(() => setVisible(true));

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(item.id), 300);
    }, TOAST_DURATION);

    return () => {
      cancelAnimationFrame(raf);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [item.id, onDismiss]);

  const { icon, classes } = typeConfig[item.type];

  return (
    <div
      className={[
        'flex items-start gap-3 bg-white rounded-xl shadow-lg px-4 py-3 min-w-[280px] max-w-sm',
        'transition-all duration-300 ease-out',
        classes,
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8',
      ].join(' ')}
      role="alert"
    >
      {icon}
      <p className="flex-1 text-sm text-gray-800 font-medium leading-snug">{item.message}</p>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(item.id), 300);
        }}
        className="text-gray-500 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
        aria-label="Cerrar"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {/* Portal-like fixed container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            <SingleToast item={item} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

// Standalone Toast display component (for use outside provider context if needed)
const Toast: React.FC<SingleToastProps> = ({ item, onDismiss }) => (
  <SingleToast item={item} onDismiss={onDismiss} />
);

export default Toast;
