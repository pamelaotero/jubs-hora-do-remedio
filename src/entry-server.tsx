import { renderToString } from 'react-dom/server';
import { StaticRouterProvider, createStaticHandler, createStaticRouter } from 'react-router-dom';
import { App } from '@/App';
import { LOCALES, LOCALE_INFO } from '@/i18n/locales';
import { INDEXABLE_ROUTES, ROUTE_KEYS, localizedPath } from '@/i18n/routes';
import { routes } from '@/routes';
import { getHeadData, renderHeadHtml } from '@/seo/head';
import { SITE_URL, absoluteUrl } from '@/seo/site';

/** Entrada usada só no build para gerar HTML estático das páginas públicas. */
export async function renderPage(path: string): Promise<string> {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(`http://localhost${path}`));
  if (context instanceof Response) throw new Error(`Rota ${path} redirecionou durante a pré-renderização.`);

  const router = createStaticRouter(handler.dataRoutes, context);
  return renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </App>,
  );
}

export interface PageToBuild {
  path: string;
  lang: string;
  head: string;
  /** Páginas públicas recebem o HTML do React; etapas do app ficam só com o "shell". */
  prerender: boolean;
}

export const pagesToBuild = (): PageToBuild[] =>
  LOCALES.flatMap((locale) =>
    ROUTE_KEYS.map((key) => ({
      path: localizedPath(locale, key),
      lang: LOCALE_INFO[locale].htmlLang,
      head: renderHeadHtml(getHeadData(locale, key)),
      prerender: INDEXABLE_ROUTES.includes(key),
    })),
  );

export const notFoundPage = () => ({
  lang: LOCALE_INFO.pt.htmlLang,
  head: renderHeadHtml(getHeadData('pt', null)),
});

/** sitemap.xml com as versões de cada idioma (hreflang). */
export const buildSitemap = (lastmod: string): string => {
  const urls = INDEXABLE_ROUTES.flatMap((key) =>
    LOCALES.map((locale) => {
      const alternates = LOCALES.map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${LOCALE_INFO[alt].htmlLang}" href="${absoluteUrl(localizedPath(alt, key))}"/>`,
      );
      alternates.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(localizedPath('en', key))}"/>`,
      );
      return [
        '  <url>',
        `    <loc>${absoluteUrl(localizedPath(locale, key))}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${key === 'home' ? 'weekly' : 'yearly'}</changefreq>`,
        `    <priority>${key === 'home' ? '1.0' : '0.3'}</priority>`,
        ...alternates,
        '  </url>',
      ].join('\n');
    }),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
};

export const buildRobots = (): string =>
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n');
