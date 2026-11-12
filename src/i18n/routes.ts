import { LOCALES, LOCALE_INFO, type Locale } from './locales';

export const ROUTE_KEYS = ['home', 'reading', 'review', 'schedule', 'recipes', 'settings', 'privacy'] as const;
export type RouteKey = (typeof ROUTE_KEYS)[number];

/** Slugs traduzidos: URLs legíveis em cada idioma ajudam no SEO. */
const ROUTE_SLUGS: Record<Locale, Record<RouteKey, string>> = {
  pt: {
    home: '',
    reading: 'lendo',
    review: 'conferir',
    schedule: 'tabela',
    recipes: 'receitas',
    settings: 'configuracoes',
    privacy: 'privacidade',
  },
  en: {
    home: '',
    reading: 'reading',
    review: 'review',
    schedule: 'schedule',
    recipes: 'prescriptions',
    settings: 'settings',
    privacy: 'privacy',
  },
};

/** Páginas com conteúdo público que devem aparecer no Google. As demais são etapas do app. */
export const INDEXABLE_ROUTES: ReadonlyArray<RouteKey> = ['home', 'privacy'];

export const routeSlug = (locale: Locale, key: RouteKey): string => ROUTE_SLUGS[locale][key];

export const localizedPath = (locale: Locale, key: RouteKey): string => {
  const { prefix } = LOCALE_INFO[locale];
  const slug = routeSlug(locale, key);
  if (!slug) return prefix || '/';
  return `${prefix}/${slug}`;
};

const normalize = (pathname: string): string => pathname.replace(/\/+$/, '') || '/';

/** Descobre idioma e página a partir da URL (null quando a página não existe). */
export const matchRoute = (pathname: string): { locale: Locale; key: RouteKey | null } => {
  const path = normalize(pathname);
  const locale: Locale = path === '/en' || path.startsWith('/en/') ? 'en' : 'pt';
  const key = ROUTE_KEYS.find((k) => localizedPath(locale, k) === path) ?? null;
  return { locale, key };
};

export const allLocalizedPaths = (key: RouteKey): Array<{ locale: Locale; path: string }> =>
  LOCALES.map((locale) => ({ locale, path: localizedPath(locale, key) }));
