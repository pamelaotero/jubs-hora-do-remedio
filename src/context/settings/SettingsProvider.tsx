import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_SETTINGS, SettingsContext, type Settings } from './SettingsContext';

/** Preferências também ficam só em memória: fechar a aba volta ao padrão. */
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const updateSettings = useCallback((changes: Partial<Settings>) => {
    setSettings((current) => ({ ...current, ...changes }));
  }, []);

  const resetSettings = useCallback(() => setSettings(DEFAULT_SETTINGS), []);

  const value = useMemo(() => ({ settings, updateSettings, resetSettings }), [settings, updateSettings, resetSettings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
