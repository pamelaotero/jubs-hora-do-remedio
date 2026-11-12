import { useState } from 'react';
import { CalendarDays, ChevronLeft, Trash2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ExportPanel, ScheduleNotes, ScheduleTable, StepIndicator, WeekNavigator } from '@/components/schedule';
import { SupportCard } from '@/components/support';
import { Button, ButtonLink, PageHeader } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { usePrescription } from '@/hooks/usePrescription';
import { useToast } from '@/hooks/useToast';
import styles from './Page.module.css';

export function SchedulePage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { t, path } = useI18n();
  const { prescription, plan, givenDoses, toggleDose, clear } = usePrescription();
  const [week, setWeek] = useState(0);

  if (!prescription) return <Navigate to={path('home')} replace />;
  if (!plan) return <Navigate to={path('review')} replace />;

  const currentWeek = Math.min(week, plan.weeks - 1);
  const patientName = prescription.patientName.trim();

  const handleClear = () => {
    clear();
    showToast(t.schedule.cleared);
    navigate(path('home'));
  };

  return (
    <div className={styles.page}>
      <StepIndicator current={3} />
      <PageHeader
        icon={<CalendarDays aria-hidden="true" />}
        title={patientName ? t.schedule.titleWithName(patientName) : t.schedule.title}
        description={t.schedule.description}
      />

      <div className={styles.stack}>
        <WeekNavigator week={currentWeek} totalWeeks={plan.weeks} onChange={setWeek} />
        <ScheduleTable plan={plan} week={currentWeek} givenDoses={givenDoses} onToggleDose={toggleDose} />
        <ScheduleNotes plan={plan} mergedTimes={prescription.mergeNearbyTimes} />
      </div>

      <ExportPanel />
      <SupportCard />

      <div className={`${styles.actions} ${styles.spread}`}>
        <ButtonLink to={path('review')} variant="ghost" icon={<ChevronLeft />}>
          {t.schedule.back}
        </ButtonLink>
        <Button variant="danger" icon={<Trash2 />} onClick={handleClear}>
          {t.schedule.clear}
        </Button>
      </div>
    </div>
  );
}
