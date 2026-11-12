import { StrictMode, type ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { AppProviders } from '@/context/AppProviders';

/** Raiz comum ao navegador e à pré-renderização. */
export function App({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <AppProviders>{children}</AppProviders>
      {/* Contagem anônima de visitas, sem cookies. Não registra nada em desenvolvimento. */}
      <Analytics />
    </StrictMode>
  );
}
