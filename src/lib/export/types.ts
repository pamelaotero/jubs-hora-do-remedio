import type { Messages } from '@/i18n/messages';
import type { DateLabels } from '@/lib/date';
import type { SchedulePlan } from '@/types';

export type ExportLabels = Messages['exportFile'];

export interface ExportInput {
  plan: SchedulePlan;
  givenDoses: ReadonlySet<string>;
  patientName: string;
  labels: ExportLabels;
  dates: DateLabels;
}

export interface ExportResult {
  filename: string;
  data: Blob | string;
  mimeType: string;
}
