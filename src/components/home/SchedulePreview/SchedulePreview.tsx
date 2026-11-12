import { ArrowRight, CalendarDays, Pill } from 'lucide-react';
import { ButtonLink, Card } from '@/components/ui';
import type { PreviewDays } from '@/constants/options';
import { useI18n } from '@/hooks/useI18n';
import { useLocalizedOptions } from '@/hooks/useLocalizedOptions';
import { useToday } from '@/hooks/useToday';
import { formatDayMonth, minutesToTime, weekdayLong } from '@/lib/date';
import type { SchedulePlan } from '@/types';
import { buildPreviewDays } from './buildPreviewDays';
import styles from './SchedulePreview.module.css';

interface SchedulePreviewProps {
  plan: SchedulePlan | null;
  days: PreviewDays;
  onDaysChange: (days: PreviewDays) => void;
}

export function SchedulePreview({ plan, days, onDaysChange }: SchedulePreviewProps) {
  const { t, path } = useI18n();
  const options = useLocalizedOptions();
  const today = useToday();
  const previewDays = buildPreviewDays(plan, days, today);

  return (
    <Card as="section" padding="lg" className={styles.card} aria-labelledby="preview-title">
      <header className={styles.header}>
        <h2 id="preview-title" className={styles.title}>
          <CalendarDays aria-hidden="true" />
          {t.preview.title}
          {!plan && <span className={styles.tag}>{t.preview.example}</span>}
        </h2>
        <label className={styles.daysSelect}>
          <span className="visually-hidden">{t.preview.daysLabel}</span>
          <select value={days} onChange={(e) => onDaysChange(Number(e.target.value) as PreviewDays)}>
            {options.previewDays.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className={styles.scroller}>
        <ol className={styles.days}>
          {previewDays.map(({ date, slots }, index) => (
            <li key={index} className={styles.day}>
              <span className={styles.weekday}>{date ? weekdayLong(date, t.dates) : ' '}</span>
              <span className={styles.date}>{date ? formatDayMonth(date, t.dates) : ' '}</span>
              {slots.length ? (
                <ul className={styles.slots}>
                  {slots.map((slot) => (
                    <li key={slot}>
                      <Pill aria-hidden="true" />
                      {minutesToTime(slot)}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className={styles.none}>{t.preview.noDoses}</span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {plan && (
        <ButtonLink to={path('schedule')} variant="primary" icon={<ArrowRight />} className={styles.cta}>
          {t.preview.seeFull}
        </ButtonLink>
      )}
    </Card>
  );
}
