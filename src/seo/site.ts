/**
 * URL pública do site (sem barra no final). Usada em canonical, hreflang, sitemap e Open Graph.
 * Configure VITE_SITE_URL no .env com o domínio real antes de publicar.
 */
export const SITE_URL: string = (import.meta.env.VITE_SITE_URL || 'https://jubstime.com').replace(
  /\/+$/,
  '',
);

/** URL pública com barra final (cada página é publicada como pasta/index.html). */
export const absoluteUrl = (path: string): string => `${SITE_URL}${path.replace(/\/?$/, '/')}`;

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const ogImagePath = (locale: string): string => `/og-${locale}.png`;
