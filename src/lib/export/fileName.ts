import { slugify } from '@/lib/medication';
import type { ExportLabels } from './types';

export const exportBaseName = (patientName: string, labels: ExportLabels): string =>
  `${labels.baseName}-${patientName.trim() ? slugify(patientName) : labels.defaultName}`;

export const withPatient = (title: string, patientName: string): string =>
  patientName.trim() ? `${title} — ${patientName.trim()}` : title;
