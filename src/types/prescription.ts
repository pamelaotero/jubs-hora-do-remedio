export type PatientType = 'pet' | 'pessoa';

export type DurationType = 'dias' | 'acabar' | 'continuo';

export type PrescriptionSource = 'arquivo' | 'manual';

export interface Medication {
  id: string;
  name: string;
  dose: string;
  intervalHours: number;
  durationType: DurationType;
  days: number;
  /** yyyy-mm-dd */
  startDate: string;
  /** HH:mm */
  startTime: string;
  notes: string;
}

export interface Prescription {
  patientName: string;
  patientType: PatientType;
  mergeNearbyTimes: boolean;
  source: PrescriptionSource;
  medications: Medication[];
}
