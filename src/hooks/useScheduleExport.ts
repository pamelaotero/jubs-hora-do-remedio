import { useCallback, useState } from 'react';
import {
  createScheduleIcs,
  createSchedulePdf,
  createScheduleXlsx,
  downloadFile,
  type ExportInput,
  type ExportResult,
} from '@/lib/export';
import type { SchedulePlan } from '@/types';
import { useI18n } from './useI18n';
import { usePrescription } from './usePrescription';
import { useToast } from './useToast';

export type ExportFormat = 'pdf' | 'xlsx' | 'ics';

const EXPORTERS: Record<ExportFormat, (input: ExportInput) => ExportResult | Promise<ExportResult>> = {
  pdf: createSchedulePdf,
  xlsx: createScheduleXlsx,
  ics: createScheduleIcs,
};

const NO_DOSES: ReadonlySet<string> = new Set();

/** Tabela a exportar quando não é a receita aberta (ex.: o exemplo da página inicial). */
export interface ExportSource {
  plan: SchedulePlan;
  patientName: string;
  /** Prefixo do nome do arquivo, ex.: "exemplo-". */
  filePrefix?: string;
}

/** Gera os arquivos no navegador e dispara o download. */
export function useScheduleExport(source?: ExportSource | null) {
  const { t } = useI18n();
  const prescriptionState = usePrescription();
  const plan = source ? source.plan : prescriptionState.plan;
  const givenDoses = source ? NO_DOSES : prescriptionState.givenDoses;
  const patientName = source ? source.patientName : (prescriptionState.prescription?.patientName ?? '');
  const filePrefix = source?.filePrefix ?? '';
  const showToast = useToast();
  const [busy, setBusy] = useState<ExportFormat | null>(null);

  const exportAs = useCallback(
    async (format: ExportFormat) => {
      if (!plan) return;
      setBusy(format);
      try {
        const file = await EXPORTERS[format]({ plan, givenDoses, patientName, labels: t.exportFile, dates: t.dates });
        const filename = `${filePrefix}${file.filename}`;
        downloadFile(filename, file.data, file.mimeType);
        showToast(t.exportPanel.ready(filename));
      } catch {
        showToast(t.exportPanel.failed);
      } finally {
        setBusy(null);
      }
    },
    [plan, givenDoses, patientName, filePrefix, showToast, t],
  );

  return { exportAs, busy };
}
