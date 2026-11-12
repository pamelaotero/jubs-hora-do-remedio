import { useI18n } from '@/hooks/useI18n';
import type { Messages } from '@/i18n/messages';
import type { SchedulePlan } from '@/types';
import styles from './ScheduleNotes.module.css';

interface Note {
  title?: string;
  text: string;
}

const buildNotes = (plan: SchedulePlan, mergedTimes: boolean, labels: Messages['schedule']): Note[] => {
  const notes: Note[] = plan.medications.filter((m) => m.notes.trim()).map((m) => ({ title: m.name, text: m.notes }));

  if (plan.medications.some((m) => m.durationType !== 'dias')) notes.push({ text: labels.openEnded });
  if (mergedTimes) notes.push({ text: labels.merged });
  return notes;
};

interface ScheduleNotesProps {
  plan: SchedulePlan;
  mergedTimes: boolean;
}

export function ScheduleNotes({ plan, mergedTimes }: ScheduleNotesProps) {
  const { schedule } = useI18n().t;
  const notes = buildNotes(plan, mergedTimes, schedule);
  if (!notes.length) return null;

  return (
    <ul className={styles.notes} aria-label={schedule.notesLabel}>
      {notes.map(({ title, text }) => (
        <li key={`${title ?? ''}${text}`}>
          {title && <strong>{title}: </strong>}
          {text}
        </li>
      ))}
    </ul>
  );
}
