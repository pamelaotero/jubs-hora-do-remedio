import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import styles from './WeekNavigator.module.css';

interface WeekNavigatorProps {
  week: number;
  totalWeeks: number;
  onChange: (week: number) => void;
}

export function WeekNavigator({ week, totalWeeks, onChange }: WeekNavigatorProps) {
  const { schedule } = useI18n().t;

  return (
    <div className={styles.nav}>
      <Button variant="secondary" size="sm" icon={<ChevronLeft />} disabled={week === 0} onClick={() => onChange(week - 1)}>
        <span className={styles.label}>{schedule.previous}</span>
      </Button>
      <strong aria-live="polite">{schedule.week(week + 1, totalWeeks)}</strong>
      <Button
        variant="secondary"
        size="sm"
        disabled={week >= totalWeeks - 1}
        onClick={() => onChange(week + 1)}
        aria-label={schedule.nextAria}
      >
        <span className={styles.label}>{schedule.next}</span>
        <ChevronRight />
      </Button>
    </div>
  );
}
