import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from './useI18n';
import { usePrescription } from './usePrescription';

const SAMPLE_FILE_NAME = 'sample-prescription.pdf';

export interface ReadingState {
  fileName: string;
}

/**
 * Fluxo da tela inicial: escolher arquivo → pedir consentimento → ler.
 * Guardamos apenas o NOME do arquivo para exibir; o conteúdo não é armazenado.
 */
export function useUploadFlow() {
  const navigate = useNavigate();
  const { t, path } = useI18n();
  const { start } = usePrescription();
  const [pendingFileName, setPendingFileName] = useState<string | null>(null);

  const requestReading = useCallback((file: File) => setPendingFileName(file.name), []);
  const requestSample = useCallback(() => setPendingFileName(SAMPLE_FILE_NAME), []);
  const cancel = useCallback(() => setPendingFileName(null), []);

  const confirm = useCallback(() => {
    if (!pendingFileName) return;
    const state: ReadingState = { fileName: pendingFileName };
    setPendingFileName(null);
    navigate(path('reading'), { state });
  }, [navigate, path, pendingFileName]);

  const fillManually = useCallback(() => {
    start('manual', t.sample);
    navigate(path('review'));
  }, [navigate, path, start, t.sample]);

  return { pendingFileName, requestReading, requestSample, cancel, confirm, fillManually };
}
