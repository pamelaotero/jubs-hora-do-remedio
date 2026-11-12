import { useMemo, useReducer, type ReactNode } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { PrescriptionContext, type PrescriptionActions } from './PrescriptionContext';
import { initialPrescriptionState, prescriptionReducer } from './prescriptionReducer';

export function PrescriptionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(prescriptionReducer, initialPrescriptionState);
  const { settings } = useSettings();

  const actions = useMemo<PrescriptionActions>(
    () => ({
      start: (source, sample) =>
        dispatch({
          type: 'start',
          source,
          options: { patientType: settings.defaultPatientType, mergeNearbyTimes: settings.mergeNearbyTimes, sample },
        }),
      updateDetails: (changes) => dispatch({ type: 'updateDetails', changes }),
      addMedication: () => dispatch({ type: 'addMedication' }),
      updateMedication: (id, changes) => dispatch({ type: 'updateMedication', id, changes }),
      removeMedication: (id) => dispatch({ type: 'removeMedication', id }),
      generatePlan: () => dispatch({ type: 'generatePlan' }),
      toggleDose: (key) => dispatch({ type: 'toggleDose', key }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [settings.defaultPatientType, settings.mergeNearbyTimes],
  );

  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return <PrescriptionContext.Provider value={value}>{children}</PrescriptionContext.Provider>;
}
