import type { Medication } from './prescription';

export interface ScheduledDose {
  medicationIndex: number;
  time: Date;
  /** Minutos desde 00:00 do horário em que a dose aparece na tabela. */
  slot: number;
}

export interface ScheduleRow {
  key: string;
  slot: number;
  medicationIndex: number;
  /** Índices de dia (0 = primeiro dia da tabela) em que há dose. */
  days: Set<number>;
}

export interface SchedulePlan {
  firstDay: Date;
  weeks: number;
  rows: ScheduleRow[];
  medications: Medication[];
  doses: ScheduledDose[];
}
