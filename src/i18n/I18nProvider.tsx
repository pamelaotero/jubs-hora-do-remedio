import { useMemo, type ReactNode } from 'react';
import { I18nContext } from './I18nContext';
import type { Locale } from './locales';
import { MESSAGES } from './messages';
import { localizedPath } from './routes';

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo(
    () => ({ locale, t: MESSAGES[locale], path: (key: Parameters<typeof localizedPath>[1]) => localizedPath(locale, key) }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
