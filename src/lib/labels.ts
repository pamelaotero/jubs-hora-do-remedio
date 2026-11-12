import type { Messages } from '@/i18n/messages';
import type { Medication } from '@/types';

export const durationLabel = (m: Medication, t: Messages): string =>
  m.durationType === 'dias' ? t.options.durationDays(m.days) : t.options.duration[m.durationType];

export const medicationSummary = (m: Medication, t: Messages): string =>
  [m.dose, t.options.interval(m.intervalHours), durationLabel(m, t)].filter(Boolean).join(' · ');
