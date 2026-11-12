import type { ReactNode } from 'react';
import { PrescriptionProvider } from './prescription/PrescriptionProvider';
import { SettingsProvider } from './settings/SettingsProvider';
import { ToastProvider } from './toast/ToastProvider';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <PrescriptionProvider>
        <ToastProvider>{children}</ToastProvider>
      </PrescriptionProvider>
    </SettingsProvider>
  );
}
