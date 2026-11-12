import type { Medication, PatientType, Prescription, PrescriptionSource, SchedulePlan } from '@/types';
import { createMedication } from '@/lib/medication';
import { buildSchedulePlan } from '@/lib/schedule';
import { createSampleMedications, type SampleLabels } from '@/data/sampleMedications';

/**
 * Estado da receita. Vive SÓ na memória do navegador enquanto a aba está aberta:
 * não há localStorage, cookies nem envio para servidores.
 */
export interface PrescriptionState {
  prescription: Prescription | null;
  plan: SchedulePlan | null;
  givenDoses: ReadonlySet<string>;
}

export interface StartOptions {
  patientType: PatientType;
  mergeNearbyTimes: boolean;
  /** Textos da receita de exemplo no idioma atual. */
  sample: SampleLabels;
}

export type PrescriptionAction =
  | { type: 'start'; source: PrescriptionSource; options: StartOptions }
  | { type: 'updateDetails'; changes: Partial<Omit<Prescription, 'medications' | 'source'>> }
  | { type: 'addMedication' }
  | { type: 'updateMedication'; id: string; changes: Partial<Medication> }
  | { type: 'removeMedication'; id: string }
  | { type: 'generatePlan' }
  | { type: 'toggleDose'; key: string }
  | { type: 'clear' };

export const initialPrescriptionState: PrescriptionState = {
  prescription: null,
  plan: null,
  givenDoses: new Set(),
};

const createPrescription = (
  source: PrescriptionSource,
  { patientType, mergeNearbyTimes, sample }: StartOptions,
): Prescription =>
  source === 'arquivo'
    ? { source, patientType, mergeNearbyTimes, patientName: sample.patientName, medications: createSampleMedications(sample) }
    : { source, patientType, mergeNearbyTimes, patientName: '', medications: [createMedication()] };

/** Qualquer edição na receita invalida a tabela gerada. */
const withPrescription = (prescription: Prescription): PrescriptionState => ({
  prescription,
  plan: null,
  givenDoses: new Set(),
});

const toggle = (set: ReadonlySet<string>, key: string): Set<string> => {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
};

export const prescriptionReducer = (state: PrescriptionState, action: PrescriptionAction): PrescriptionState => {
  if (action.type === 'start') {
    return { ...initialPrescriptionState, prescription: createPrescription(action.source, action.options) };
  }
  if (action.type === 'clear') return initialPrescriptionState;

  const { prescription } = state;
  if (!prescription) return state;

  switch (action.type) {
    case 'updateDetails':
      return withPrescription({ ...prescription, ...action.changes });

    case 'addMedication':
      return withPrescription({ ...prescription, medications: [...prescription.medications, createMedication()] });

    case 'updateMedication':
      return withPrescription({
        ...prescription,
        medications: prescription.medications.map((m) => (m.id === action.id ? { ...m, ...action.changes } : m)),
      });

    case 'removeMedication': {
      const remaining = prescription.medications.filter((m) => m.id !== action.id);
      return withPrescription({ ...prescription, medications: remaining.length ? remaining : [createMedication()] });
    }

    case 'generatePlan':
      return {
        ...state,
        plan: buildSchedulePlan(prescription.medications, prescription.mergeNearbyTimes),
        givenDoses: new Set(),
      };

    case 'toggleDose':
      return state.plan ? { ...state, givenDoses: toggle(state.givenDoses, action.key) } : state;

    default:
      return state;
  }
};
