import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/shihtzu-logo.webp';
import { StepIndicator } from '@/components/schedule';
import { Card } from '@/components/ui';
import { READING_DELAY_MS } from '@/constants/app';
import { useI18n } from '@/hooks/useI18n';
import { usePrescription } from '@/hooks/usePrescription';
import type { ReadingState } from '@/hooks/useUploadFlow';
import pageStyles from './Page.module.css';
import styles from './ReadingPage.module.css';

/**
 * Leitura da receita. No protótipo a extração é simulada com uma receita de exemplo;
 * o arquivo escolhido nunca é enviado nem armazenado.
 */
export function ReadingPage() {
  const navigate = useNavigate();
  const { t, path } = useI18n();
  const { state } = useLocation() as { state: ReadingState | null };
  const { start } = usePrescription();
  const fileName = state?.fileName;

  useEffect(() => {
    if (!fileName) return;
    const timer = setTimeout(() => {
      start('arquivo', t.sample);
      navigate(path('review'), { replace: true });
    }, READING_DELAY_MS);
    return () => clearTimeout(timer);
  }, [fileName, start, navigate, path, t.sample]);

  if (!fileName) return <Navigate to={path('home')} replace />;

  return (
    <div className={pageStyles.page}>
      <StepIndicator current={1} />
      <Card padding="lg" className={styles.card} role="status" aria-live="polite">
        <img src={logo} alt="" width={96} height={96} className={styles.logo} />
        <h1 className={styles.title}>{t.reading.title}</h1>
        <div className={styles.bar}>
          <span />
        </div>
        <p className={styles.text}>{t.reading.text(fileName)}</p>
      </Card>
    </div>
  );
}
