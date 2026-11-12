import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Toast } from '@/components/ui';
import { TOAST_DURATION_MS } from '@/constants/app';
import { ToastContext } from './ToastContext';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast message={message} />
    </ToastContext.Provider>
  );
}
