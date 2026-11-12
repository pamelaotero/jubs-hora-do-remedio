import { BookOpen, CalendarDays, PencilLine, Pill, Trash2, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonLink, Card, EmptyState, IconBadge, Notice, PageHeader } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { usePrescription } from '@/hooks/usePrescription';
import { useToast } from '@/hooks/useToast';
import { medicationSummary } from '@/lib/labels';
import pageStyles from './Page.module.css';
import styles from './RecipesPage.module.css';

export function RecipesPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { t, path } = useI18n();
  const { recipes } = t;
  const { prescription, plan, clear } = usePrescription();

  const handleClear = () => {
    clear();
    showToast(recipes.cleared);
    navigate(path('home'));
  };

  return (
    <div className={`${pageStyles.page} ${pageStyles.narrow}`}>
      <PageHeader icon={<BookOpen aria-hidden="true" />} title={recipes.title} description={recipes.description} />

      <Notice variant="privacy">{recipes.privacy}</Notice>

      {prescription ? (
        <Card as="article" padding="lg" className={styles.summary}>
          <header className={styles.header}>
            <h2 className={styles.name}>{prescription.patientName.trim() || recipes.unnamed}</h2>
            <p className={styles.meta}>
              {[
                t.options.patientType[prescription.patientType],
                recipes.medicationCount(prescription.medications.length),
                plan ? recipes.planReady : recipes.planPending,
              ].join(' · ')}
            </p>
          </header>

          <ul className={styles.list}>
            {prescription.medications.map((m) => (
              <li key={m.id} className={styles.item}>
                <IconBadge size="md">
                  <Pill />
                </IconBadge>
                <div>
                  <strong>{m.name.trim() || t.medication.unnamed}</strong>
                  <span>{medicationSummary(m, t)}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className={pageStyles.actions}>
            {plan && (
              <ButtonLink to={path('schedule')} variant="primary" icon={<CalendarDays />}>
                {recipes.viewSchedule}
              </ButtonLink>
            )}
            <ButtonLink to={path('review')} icon={<PencilLine />}>
              {recipes.edit}
            </ButtonLink>
            <Button variant="danger" icon={<Trash2 />} onClick={handleClear}>
              {recipes.clear}
            </Button>
          </div>
        </Card>
      ) : (
        <EmptyState
          icon={<BookOpen />}
          title={recipes.emptyTitle}
          description={recipes.emptyDescription}
          action={
            <ButtonLink to={path('home')} variant="primary" icon={<Upload />}>
              {recipes.emptyAction}
            </ButtonLink>
          }
        />
      )}
    </div>
  );
}
