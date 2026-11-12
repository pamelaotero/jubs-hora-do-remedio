import { useMemo } from 'react';
import { DURATION_TYPES, INTERVAL_HOURS, PATIENT_TYPES, PREVIEW_DAY_OPTIONS } from '@/constants/options';
import { useI18n } from './useI18n';

/** Opções de formulário com rótulos no idioma atual. */
export function useLocalizedOptions() {
  const { t } = useI18n();

  return useMemo(
    () => ({
      interval: INTERVAL_HOURS.map((value) => ({ value, label: t.options.interval(value) })),
      duration: DURATION_TYPES.map((value) => ({ value, label: t.options.duration[value] })),
      patientType: PATIENT_TYPES.map((value) => ({ value, label: t.options.patientType[value] })),
      previewDays: PREVIEW_DAY_OPTIONS.map((value) => ({ value, label: t.preview.days(value) })),
    }),
    [t],
  );
}
