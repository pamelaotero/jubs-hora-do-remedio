import type { ComponentType } from 'react';
import type { RouteObject } from 'react-router-dom';
import { LocaleLayout } from '@/components/layout';
import { LOCALES, LOCALE_INFO, type Locale } from '@/i18n/locales';
import { ROUTE_KEYS, routeSlug, type RouteKey } from '@/i18n/routes';
import {
  HomePage,
  NotFoundPage,
  PrivacyPage,
  ReadingPage,
  RecipesPage,
  ReviewPage,
  SchedulePage,
  SettingsPage,
} from '@/pages';

const PAGES: Record<RouteKey, ComponentType> = {
  home: HomePage,
  reading: ReadingPage,
  review: ReviewPage,
  schedule: SchedulePage,
  recipes: RecipesPage,
  settings: SettingsPage,
  privacy: PrivacyPage,
};

const localeRoute = (locale: Locale): RouteObject => ({
  path: LOCALE_INFO[locale].prefix || '/',
  element: <LocaleLayout locale={locale} />,
  children: [
    ...ROUTE_KEYS.map((key): RouteObject => {
      const Page = PAGES[key];
      const slug = routeSlug(locale, key);
      return slug ? { path: slug, element: <Page /> } : { index: true, element: <Page /> };
    }),
    { path: '*', element: <NotFoundPage /> },
  ],
});

/** Rotas compartilhadas entre o navegador e a pré-renderização (SEO). */
export const routes: RouteObject[] = LOCALES.map(localeRoute);
