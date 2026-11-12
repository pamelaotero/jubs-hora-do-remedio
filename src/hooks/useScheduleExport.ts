import { useCallback, useState } from 'react';
import {
  createScheduleIcs,
  createSchedulePdf,
  createScheduleXlsx,
  downloadFile,
  type ExportInput,
  type ExportResult,
} from '@/lib/export';
import { useI18n } from './useI18n';
import { usePrescription } from './usePrescription';
import { useToast } from './useToast';

export type ExportFormat = 'pdf' | 'xlsx' | 'ics';

const EXPORTERS: Record<ExportFormat, (input: ExportInput) => ExportResult | Promise<ExportResult>> = {
  pdf: createSchedulePdf,
  xlsx: createScheduleXlsx,
  ics: createScheduleIcs,
};

/** Gera os arquivos no navegador e dispara o download. */
export function useScheduleExport() {
  const { t } = useI18n();
  const { plan, givenDoses, prescription } = usePrescription();
  const patientName = prescription?.patientName ?? '';
  const showToast = useToast();
  const [busy, setBusy] = useState<ExportFormat | null>(null);

  const exportAs = useCallback(
    async (format: ExportFormat) => {
      if (!plan) return;
      setBusy(format);
      try {
        const file = await EXPORTERS[format]({ plan, givenDoses, patientName, labels: t.exportFile, dates: t.dates });
        downloadFile(file.filename, file.data, file.mimeType);
        showToast(t.exportPanel.ready(file.filename));
      } catch {
        showToast(t.exportPanel.failed);
      } finally {
        setBusy(null);
      }
    },
    [plan, givenDoses, patientName, showToast, t],
  );

  return { exportAs, busy };
}
