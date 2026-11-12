import type { Messages } from '@/i18n/messages';
import { createMedication } from '@/lib/medication';
import type { Medication } from '@/types';

export type SampleLabels = Messages['sample'];

/** Receita de exemplo usada enquanto a leitura automática é simulada. */
export const createSampleMedications = (labels: SampleLabels): Medication[] => [
  createMedication({ name: 'Mercepton', dose: labels.drops(30), intervalHours: 8, days: 5, startTime: '00:00' }),
  createMedication({ name: 'Luftal', dose: '1 ml', intervalHours: 8, days: 2, startTime: '01:00' }),
  createMedication({
    name: 'Vonau 6 mg',
    dose: labels.quarterTablet,
    intervalHours: 12,
    days: 2,
    startTime: '10:00',
    notes: labels.vonauNote,
  }),
  createMedication({
    name: 'Glicol Pet',
    dose: '1,25 ml',
    intervalHours: 12,
    durationType: 'acabar',
    startTime: '10:00',
    notes: labels.glicolNote,
  }),
  createMedication({ name: 'Entero Fort', dose: labels.halfTablet, intervalHours: 24, days: 5, startTime: '08:00' }),
  createMedication({
    name: 'Vermivet',
    dose: '3 ml',
    intervalHours: 24,
    days: 3,
    startTime: '08:00',
    notes: labels.vermivetNote,
  }),
];
