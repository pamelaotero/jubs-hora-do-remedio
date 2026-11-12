import { formatShortDay, minutesToTime, type DateLabels } from '@/lib/date';
import { dayIndexToDate, rowsForWeek, weekDayIndexes } from '@/lib/schedule';
import type { SchedulePlan } from '@/types';

export interface MockRow {
  key: string;
  time: string;
  name: string;
  dose: string;
  /** true = tem dose nesse dia (quadradinho); false = sem dose (cinza). */
  cells: boolean[];
}

export interface MockWeek {
  /** Vazio na pré-renderização, quando a data de hoje ainda não é conhecida. */
  dayHeaders: string[];
  rows: MockRow[];
  hiddenRows: number;
}

const MAX_ROWS = 6;

/** Primeira semana da tabela, no formato usado pelas miniaturas de PDF e Excel. */
export const buildMockWeek = (plan: SchedulePlan, dates: DateLabels, showDates: boolean): MockWeek => {
  const dayIndexes = weekDayIndexes(0);
  const rows = rowsForWeek(plan, 0);

  return {
    dayHeaders: dayIndexes.map((d) => (showDates ? formatShortDay(dayIndexToDate(plan, d), dates) : '')),
    rows: rows.slice(0, MAX_ROWS).map((row) => {
      const med = plan.medications[row.medicationIndex];
      return {
        key: row.key,
        time: minutesToTime(row.slot),
        name: med.name,
        dose: med.dose,
        cells: dayIndexes.map((d) => row.days.has(d)),
      };
    }),
    hiddenRows: Math.max(0, rows.length - MAX_ROWS),
  };
};
