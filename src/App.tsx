import { StrictMode, type ReactNode } from 'react';
import { AppProviders } from '@/context/AppProviders';

/** Raiz comum ao navegador e à pré-renderização. */
export function App({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <AppProviders>{children}</AppProviders>
    </StrictMode>
  );
}
