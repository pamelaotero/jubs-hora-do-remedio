import { createContext } from 'react';
import type { SampleLabels } from '@/data/sampleMedications';
import type { Medication, Prescription, PrescriptionSource } from '@/types';
import type { PrescriptionState } from './prescriptionReducer';

export interface PrescriptionActions {
  start: (source: PrescriptionSource, sample: SampleLabels) => void;
  updateDetails: (changes: Partial<Omit<Prescription, 'medications' | 'source'>>) => void;
  addMedication: () => void;
  updateMedication: (id: string, changes: Partial<Medication>) => void;
  removeMedication: (id: string) => void;
  generatePlan: () => void;
  toggleDose: (key: string) => void;
  clear: () => void;
}

export type PrescriptionContextValue = PrescriptionState & PrescriptionActions;

export const PrescriptionContext = createContext<PrescriptionContextValue | null>(null);
