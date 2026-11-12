import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useI18n } from '@/hooks/useI18n';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

function useScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
}

export function Layout() {
  const { t } = useI18n();
  useScrollToTopOnNavigate();

  return (
    <div className={styles.shell}>
      <a href="#conteudo" className={styles.skipLink}>
        {t.nav.skip}
      </a>
      <Header />
      <main id="conteudo" className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
