import type { SchedulePlan } from '@/types';
import { addDays, parseLocalDateTime } from '@/lib/date';
import { dayIndexToDate, slotsForDay } from '@/lib/schedule';

export interface PreviewDay {
  /** null quando a data ainda não é conhecida (pré-renderização). */
  date: Date | null;
  slots: number[];
}

/** Horários mostrados quando ainda não há tabela gerada (08:00 e 18:00). */
const EXAMPLE_SLOTS = [8 * 60, 18 * 60];

export const buildPreviewDays = (plan: SchedulePlan | null, count: number, todayIso: string | null): PreviewDay[] =>
  Array.from({ length: count }, (_, i) => {
    if (plan) return { date: dayIndexToDate(plan, i), slots: slotsForDay(plan, i) };
    const date = todayIso ? addDays(parseLocalDateTime(todayIso, '00:00'), i) : null;
    return { date, slots: EXAMPLE_SLOTS };
  });
