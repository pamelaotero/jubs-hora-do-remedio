import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { I18nProvider } from '@/i18n/I18nProvider';
import type { Locale } from '@/i18n/locales';
import { matchRoute } from '@/i18n/routes';
import { applyHeadToDocument, getHeadData } from '@/seo/head';
import { Layout } from '../Layout/Layout';

/** Mantém título, descrição, canonical e hreflang certos a cada navegação. */
function useDocumentHead(locale: Locale) {
  const { pathname } = useLocation();
  useEffect(() => {
    applyHeadToDocument(getHeadData(locale, matchRoute(pathname).key));
  }, [locale, pathname]);
}

/** Raiz de cada idioma: `/` (português) e `/en` (inglês). */
export function LocaleLayout({ locale }: { locale: Locale }) {
  useDocumentHead(locale);
  return (
    <I18nProvider locale={locale}>
      <Layout />
    </I18nProvider>
  );
}
