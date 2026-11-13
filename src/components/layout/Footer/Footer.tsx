import { Heart, MessageCircle, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AUTHOR, CONTACT } from '@/constants/app';
import { useI18n } from '@/hooks/useI18n';
import styles from './Footer.module.css';

export function Footer() {
  const { t, path } = useI18n();

  return (
    <footer className={styles.footer}>
      <svg className={styles.wave} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 240 0, 480 80, 720 40 S 1200 0, 1440 40 V80 H0 Z" />
      </svg>
      <div className={styles.inner}>
        <p className={styles.tagline}>
          <PawPrint aria-hidden="true" />
          {t.footer.tagline}
          <Heart aria-hidden="true" className={styles.heart} />
        </p>
        <nav aria-label={t.footer.label} className={styles.links}>
          <Link to={path('privacy')}>{t.footer.privacy}</Link>
          <span>{t.footer.noStorage}</span>
        </nav>
        <section className={styles.help} aria-labelledby="footer-help-title">
          <p>
            <strong id="footer-help-title">{t.footer.helpTitle}</strong> {t.footer.helpBody}
          </p>
          <a
            className={styles.helpLink}
            href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(t.footer.helpMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            {t.footer.helpCta}
          </a>
        </section>
        <p className={styles.credit}>
          {t.footer.createdBy} <strong>{AUTHOR.name}</strong>
        </p>
      </div>
    </footer>
  );
}
