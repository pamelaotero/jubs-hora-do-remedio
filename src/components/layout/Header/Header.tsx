import { NavLink } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { cx } from '@/lib/cx';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { Logo } from '../Logo/Logo';
import { NAV_ITEMS } from '../navigation';
import styles from './Header.module.css';

/** Topo com logo, navegação e idioma. No celular a navegação vira uma barra fixa embaixo. */
export function Header() {
  const { t, path } = useI18n();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />
        <div className={styles.right}>
          <nav aria-label={t.nav.main} className={styles.nav}>
            {NAV_ITEMS.map(({ route, labelKey, icon: Icon }) => (
              <NavLink
                key={route}
                to={path(route)}
                end
                className={({ isActive }) => cx(styles.link, isActive && styles.active)}
              >
                <Icon aria-hidden="true" />
                <span>{t.nav[labelKey]}</span>
              </NavLink>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
