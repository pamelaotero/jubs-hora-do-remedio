import type { DurationType, PatientType } from '@/types';

export interface Option<T> {
  value: T;
  label: string;
}

/** Só os valores: os rótulos vêm das traduções (ver useLocalizedOptions). */
export const INTERVAL_HOURS: ReadonlyArray<number> = [4, 6, 8, 12, 24, 48];

export const DURATION_TYPES: ReadonlyArray<DurationType> = ['dias', 'acabar', 'continuo'];

export const PATIENT_TYPES: ReadonlyArray<PatientType> = ['pet', 'pessoa'];

export const PREVIEW_DAY_OPTIONS = [7, 14] as const;
export type PreviewDays = (typeof PREVIEW_DAY_OPTIONS)[number];
