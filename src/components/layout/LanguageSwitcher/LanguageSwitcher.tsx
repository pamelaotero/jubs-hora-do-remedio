import { Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { LOCALES, LOCALE_INFO } from '@/i18n/locales';
import { localizedPath, matchRoute } from '@/i18n/routes';
import { cx } from '@/lib/cx';
import styles from './LanguageSwitcher.module.css';

/** Troca o idioma mantendo a mesma página (e a receita aberta, que fica em memória). */
export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const { pathname } = useLocation();
  const currentKey = matchRoute(pathname).key ?? 'home';

  return (
    <nav aria-label={t.nav.language} className={styles.switcher}>
      <Languages aria-hidden="true" className={styles.icon} />
      {LOCALES.map((option) => {
        const info = LOCALE_INFO[option];
        const active = option === locale;
        return (
          <Link
            key={option}
            to={localizedPath(option, currentKey)}
            hrefLang={info.htmlLang}
            lang={info.htmlLang}
            title={info.nativeName}
            aria-label={info.nativeName}
            aria-current={active ? 'true' : undefined}
            className={cx(styles.option, active && styles.active)}
          >
            {info.shortLabel}
          </Link>
        );
      })}
    </nav>
  );
}
