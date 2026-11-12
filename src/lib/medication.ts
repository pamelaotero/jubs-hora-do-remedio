import type { Medication } from '@/types';
import { todayIso } from './date';

const createId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 10);

export const createMedication = (overrides: Partial<Medication> = {}): Medication => ({
  id: createId(),
  name: '',
  dose: '',
  intervalHours: 8,
  durationType: 'dias',
  days: 5,
  startDate: todayIso(),
  startTime: '08:00',
  notes: '',
  ...overrides,
});

export const isMedicationComplete = (m: Medication): boolean =>
  Boolean(m.name.trim() && m.dose.trim() && m.startDate && m.startTime);

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '');
