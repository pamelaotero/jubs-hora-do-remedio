import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { ButtonLink, Card, Notice, PageHeader } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import pageStyles from './Page.module.css';
import styles from './PrivacyPage.module.css';

export function PrivacyPage() {
  const { t, path } = useI18n();
  const { privacy } = t;

  return (
    <div className={`${pageStyles.page} ${pageStyles.narrow}`}>
      <PageHeader icon={<ShieldCheck aria-hidden="true" />} title={privacy.title} description={privacy.description} />

      <Notice variant="privacy">
        <strong className={styles.highlightTitle}>{privacy.highlightTitle}</strong>
        {privacy.highlightBody}
      </Notice>

      <Notice>{privacy.draft}</Notice>

      <Card padding="lg" className={styles.content}>
        <section>
          <h2>{privacy.summaryTitle}</h2>
          <ul>
            {privacy.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {privacy.sections.map(({ title, body }) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </Card>

      <div className={pageStyles.actions}>
        <ButtonLink to={path('home')} icon={<ChevronLeft />}>
          {privacy.back}
        </ButtonLink>
      </div>
    </div>
  );
}
