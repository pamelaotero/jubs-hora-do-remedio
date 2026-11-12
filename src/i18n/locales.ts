export const LOCALES = ['pt', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'pt';

interface LocaleInfo {
  /** Prefixo da URL ('' = raiz). */
  prefix: string;
  /** Atributo lang do <html> e hreflang. */
  htmlLang: string;
  /** og:locale */
  ogLocale: string;
  /** Rótulo curto do seletor de idioma. */
  shortLabel: string;
  /** Nome do idioma no próprio idioma. */
  nativeName: string;
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  pt: { prefix: '', htmlLang: 'pt-BR', ogLocale: 'pt_BR', shortLabel: 'PT', nativeName: 'Português' },
  en: { prefix: '/en', htmlLang: 'en', ogLocale: 'en_US', shortLabel: 'EN', nativeName: 'English' },
};
