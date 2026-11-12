import { useContext } from 'react';
import { SettingsContext } from '@/context/settings/SettingsContext';

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings precisa estar dentro de <SettingsProvider>.');
  return context;
}
