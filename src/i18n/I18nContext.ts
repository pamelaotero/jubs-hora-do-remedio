import { createContext } from 'react';
import type { Locale } from './locales';
import type { Messages } from './messages';
import type { RouteKey } from './routes';

export interface I18nContextValue {
  locale: Locale;
  t: Messages;
  /** Caminho da página no idioma atual. */
  path: (key: RouteKey) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
