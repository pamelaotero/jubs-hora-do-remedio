import { Link } from 'react-router-dom';
import logo from '@/assets/shihtzu-logo.webp';
import { APP_NAME } from '@/constants/app';
import { useI18n } from '@/hooks/useI18n';
import styles from './Logo.module.css';

export function Logo() {
  const { t, path } = useI18n();
  return (
    <Link to={path('home')} className={styles.logo} aria-label={t.brand.homeAria}>
      <img src={logo} alt="" width={48} height={48} className={styles.mark} />
      <span className={styles.text}>
        <span className={styles.name}>{APP_NAME}</span>
        <span className={styles.tagline}>{t.brand.tagline}</span>
      </span>
    </Link>
  );
}
