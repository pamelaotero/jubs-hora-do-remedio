import type { Medication, ScheduledDose, SchedulePlan, ScheduleRow } from '@/types';
import { MERGE_WINDOW_MINUTES, OPEN_ENDED_HORIZON_DAYS } from '@/constants/app';
import { MS_PER_DAY, MS_PER_HOUR, addDays, daysBetween, parseLocalDateTime, startOfDay } from './date';

export const DAYS_PER_WEEK = 7;

const treatmentDays = (m: Medication): number =>
  m.durationType === 'dias' ? m.days : OPEN_ENDED_HORIZON_DAYS;

/** Gera todas as doses de um remédio a partir da 1ª dose e do intervalo. */
const expandDoses = (m: Medication, medicationIndex: number): ScheduledDose[] => {
  const start = parseLocalDateTime(m.startDate, m.startTime);
  const end = start.getTime() + treatmentDays(m) * MS_PER_DAY;
  const doses: ScheduledDose[] = [];

  for (let t = start.getTime(); t < end; t += m.intervalHours * MS_PER_HOUR) {
    const time = new Date(t);
    doses.push({ medicationIndex, time, slot: time.getHours() * 60 + time.getMinutes() });
  }
  return doses;
};

/** Move cada dose para o horário já usado mais cedo, dentro da janela permitida. */
const mergeNearbySlots = (doses: ScheduledDose[]): ScheduledDose[] => {
  const slots: number[] = [];
  return [...doses]
    .sort((a, b) => a.slot - b.slot)
    .map((dose) => {
      const target = slots.find((s) => dose.slot - s >= 0 && dose.slot - s <= MERGE_WINDOW_MINUTES);
      if (target === undefined) {
        slots.push(dose.slot);
        return dose;
      }
      return { ...dose, slot: target };
    });
};

const groupIntoRows = (doses: ScheduledDose[], firstDay: Date): ScheduleRow[] => {
  const rows = new Map<string, ScheduleRow>();

  doses.forEach((dose) => {
    const key = `${dose.slot}|${dose.medicationIndex}`;
    const row = rows.get(key) ?? {
      key,
      slot: dose.slot,
      medicationIndex: dose.medicationIndex,
      days: new Set<number>(),
    };
    row.days.add(daysBetween(firstDay, dose.time));
    rows.set(key, row);
  });

  return [...rows.values()].sort((a, b) => a.slot - b.slot || a.medicationIndex - b.medicationIndex);
};

/** Função pura: transforma a lista de remédios no plano da tabela. */
export const buildSchedulePlan = (medications: Medication[], mergeNearbyTimes: boolean): SchedulePlan => {
  const expanded = medications.flatMap(expandDoses);
  const doses = mergeNearbyTimes ? mergeNearbySlots(expanded) : expanded;

  const times = doses.map((d) => d.time.getTime());
  const firstDay = startOfDay(new Date(Math.min(...times)));
  const totalDays = daysBetween(firstDay, new Date(Math.max(...times))) + 1;

  return {
    firstDay,
    weeks: Math.max(1, Math.ceil(totalDays / DAYS_PER_WEEK)),
    rows: groupIntoRows(doses, firstDay),
    medications: medications.map((m) => ({ ...m })),
    doses,
  };
};

export const dayIndexToDate = (plan: SchedulePlan, dayIndex: number): Date => addDays(plan.firstDay, dayIndex);

export const weekDayIndexes = (week: number): number[] =>
  Array.from({ length: DAYS_PER_WEEK }, (_, i) => week * DAYS_PER_WEEK + i);

export const rowsForWeek = (plan: SchedulePlan, week: number): ScheduleRow[] => {
  const from = week * DAYS_PER_WEEK;
  const to = from + DAYS_PER_WEEK;
  return plan.rows.filter((row) => [...row.days].some((d) => d >= from && d < to));
};

/** Horários distintos com dose em um dia. */
export const slotsForDay = (plan: SchedulePlan, dayIndex: number): number[] =>
  [...new Set(plan.rows.filter((r) => r.days.has(dayIndex)).map((r) => r.slot))].sort((a, b) => a - b);

export const doseKey = (rowKey: string, dayIndex: number): string => `${rowKey}|${dayIndex}`;
