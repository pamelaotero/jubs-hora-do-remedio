import { APP_NAME, AUTHOR } from '@/constants/app';
import { LOCALES, LOCALE_INFO, type Locale } from '@/i18n/locales';
import { MESSAGES } from '@/i18n/messages';
import { INDEXABLE_ROUTES, localizedPath, type RouteKey } from '@/i18n/routes';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL, absoluteUrl, ogImagePath } from './site';

export interface HeadAlternate {
  hreflang: string;
  href: string;
}

export interface HeadData {
  lang: string;
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical: string;
  alternates: HeadAlternate[];
  ogLocale: string;
  ogLocaleAlternates: string[];
  ogImage: string;
  ogImageAlt: string;
  jsonLd: object[];
}

/** Idioma usado para buscas em idiomas que não temos (público mundial → inglês). */
const X_DEFAULT_LOCALE: Locale = 'en';

const buildAlternates = (key: RouteKey): HeadAlternate[] => [
  ...LOCALES.map((locale) => ({ hreflang: LOCALE_INFO[locale].htmlLang, href: absoluteUrl(localizedPath(locale, key)) })),
  { hreflang: 'x-default', href: absoluteUrl(localizedPath(X_DEFAULT_LOCALE, key)) },
];

const webApplicationSchema = (locale: Locale) => {
  const t = MESSAGES[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: APP_NAME,
    alternateName: `${APP_NAME} — ${t.brand.tagline}`,
    url: absoluteUrl(localizedPath(locale, 'home')),
    description: t.seo.pages.home.description,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    inLanguage: LOCALES.map((l) => LOCALE_INFO[l].htmlLang),
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: t.formats.items.map((item) => item.title),
    image: absoluteUrl(ogImagePath(locale)),
    author: { '@type': 'Person', name: AUTHOR.name },
  };
};

const faqSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: LOCALE_INFO[locale].htmlLang,
  mainEntity: MESSAGES[locale].faq.items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

const howToSchema = (locale: Locale) => {
  const { howItWorks } = MESSAGES[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howItWorks.title,
    description: howItWorks.lead,
    inLanguage: LOCALE_INFO[locale].htmlLang,
    step: howItWorks.steps.map((step, i) => ({ '@type': 'HowToStep', position: i + 1, name: step.title, text: step.description })),
  };
};

/** Metadados de uma página. `key = null` representa a página 404. */
export const getHeadData = (locale: Locale, key: RouteKey | null): HeadData => {
  const t = MESSAGES[locale];
  const info = LOCALE_INFO[locale];
  const routeKey = key ?? 'home';
  const page = t.seo.pages[routeKey];
  const indexable = key !== null && INDEXABLE_ROUTES.includes(key);

  return {
    lang: info.htmlLang,
    title: key === null ? t.seo.notFoundTitle : page.title,
    description: page.description || t.seo.pages.home.description,
    keywords: t.seo.keywords,
    robots: indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow',
    canonical: absoluteUrl(localizedPath(locale, routeKey)),
    alternates: indexable ? buildAlternates(routeKey) : [],
    ogLocale: info.ogLocale,
    ogLocaleAlternates: LOCALES.filter((l) => l !== locale).map((l) => LOCALE_INFO[l].ogLocale),
    ogImage: absoluteUrl(ogImagePath(locale)),
    ogImageAlt: t.seo.ogImageAlt,
    jsonLd: key === 'home' ? [webApplicationSchema(locale), howToSchema(locale), faqSchema(locale)] : [],
  };
};

/* ---------- Renderização em HTML (usada na pré-renderização) ---------- */

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON dentro de <script> não pode conter "</script>". */
const safeJson = (value: object): string => JSON.stringify(value).replace(/</g, '\\u003c');

export const renderHeadHtml = (head: HeadData): string => {
  const meta = (attr: 'name' | 'property', key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    meta('name', 'description', head.description),
    meta('name', 'keywords', head.keywords),
    meta('name', 'robots', head.robots),
    meta('name', 'author', AUTHOR.name),
    `<link rel="canonical" href="${head.canonical}" />`,
    ...head.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:site_name', APP_NAME),
    meta('property', 'og:title', head.title),
    meta('property', 'og:description', head.description),
    meta('property', 'og:url', head.canonical),
    meta('property', 'og:locale', head.ogLocale),
    ...head.ogLocaleAlternates.map((l) => meta('property', 'og:locale:alternate', l)),
    meta('property', 'og:image', head.ogImage),
    meta('property', 'og:image:width', String(OG_IMAGE_WIDTH)),
    meta('property', 'og:image:height', String(OG_IMAGE_HEIGHT)),
    meta('property', 'og:image:alt', head.ogImageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', head.title),
    meta('name', 'twitter:description', head.description),
    meta('name', 'twitter:image', head.ogImage),
    ...head.jsonLd.map((data) => `<script type="application/ld+json">${safeJson(data)}</script>`),
  ].join('\n    ');
};

/* ---------- Atualização no navegador (navegação SPA) ---------- */

const upsert = (selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) => {
  const el = document.head.querySelector<HTMLElement>(selector) ?? document.head.appendChild(create());
  apply(el);
};

const setMeta = (attr: 'name' | 'property', key: string, content: string) =>
  upsert(
    `meta[${attr}="${key}"]`,
    () => document.createElement('meta'),
    (el) => {
      el.setAttribute(attr, key);
      el.setAttribute('content', content);
    },
  );

/** Mantém <head> coerente quando o usuário navega sem recarregar a página. */
export const applyHeadToDocument = (head: HeadData): void => {
  document.documentElement.lang = head.lang;
  document.title = head.title;
  setMeta('name', 'description', head.description);
  setMeta('name', 'keywords', head.keywords);
  setMeta('name', 'robots', head.robots);
  setMeta('property', 'og:title', head.title);
  setMeta('property', 'og:description', head.description);
  setMeta('property', 'og:url', head.canonical);
  setMeta('property', 'og:locale', head.ogLocale);
  setMeta('property', 'og:image', head.ogImage);
  setMeta('name', 'twitter:title', head.title);
  setMeta('name', 'twitter:description', head.description);

  upsert(
    'link[rel="canonical"]',
    () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
    (el) => el.setAttribute('href', head.canonical),
  );

  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  head.alternates.forEach(({ hreflang, href }) => {
    const link = Object.assign(document.createElement('link'), { rel: 'alternate', hreflang, href });
    document.head.appendChild(link);
  });
};

export { SITE_URL };
