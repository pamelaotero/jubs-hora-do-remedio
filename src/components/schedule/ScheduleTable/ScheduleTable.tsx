import { Check } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { formatDayMonth, formatShortDay, minutesToTime, weekdayShort } from '@/lib/date';
import { cx } from '@/lib/cx';
import { dayIndexToDate, doseKey, rowsForWeek, weekDayIndexes } from '@/lib/schedule';
import type { SchedulePlan } from '@/types';
import styles from './ScheduleTable.module.css';

interface ScheduleTableProps {
  plan: SchedulePlan;
  week: number;
  givenDoses: ReadonlySet<string>;
  onToggleDose: (key: string) => void;
}

export function ScheduleTable({ plan, week, givenDoses, onToggleDose }: ScheduleTableProps) {
  const { t } = useI18n();
  const dayIndexes = weekDayIndexes(week);
  const rows = rowsForWeek(plan, week);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{t.schedule.time}</th>
            <th scope="col">{t.schedule.medicine}</th>
            {dayIndexes.map((dayIndex) => {
              const date = dayIndexToDate(plan, dayIndex);
              return (
                <th key={dayIndex} scope="col">
                  {weekdayShort(date, t.dates)}
                  <span>{formatDayMonth(date, t.dates)}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const medication = plan.medications[row.medicationIndex];
            const startsNewSlot = i > 0 && rows[i - 1].slot !== row.slot;
            return (
              <tr key={row.key} className={cx(startsNewSlot && styles.newSlot)}>
                <th scope="row" className={styles.time}>
                  {minutesToTime(row.slot)}
                </th>
                <td className={styles.medication}>
                  <strong>{medication.name}</strong>
                  <span>{medication.dose}</span>
                </td>
                {dayIndexes.map((dayIndex) => {
                  if (!row.days.has(dayIndex)) {
                    return <td key={dayIndex} className={styles.off} aria-label={t.schedule.noDose} />;
                  }

                  const key = doseKey(row.key, dayIndex);
                  const given = givenDoses.has(key);
                  const label = `${medication.name} ${minutesToTime(row.slot)} ${formatShortDay(dayIndexToDate(plan, dayIndex), t.dates)}`;
                  return (
                    <td key={dayIndex}>
                      <button
                        type="button"
                        className={cx(styles.dose, given && styles.given)}
                        aria-pressed={given}
                        aria-label={`${given ? t.schedule.given : t.schedule.markGiven}: ${label}`}
                        onClick={() => onToggleDose(key)}
                      >
                        {given && <Check aria-hidden="true" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
