import { useContext } from 'react';
import { PrescriptionContext } from '@/context/prescription/PrescriptionContext';

export function usePrescription() {
  const context = useContext(PrescriptionContext);
  if (!context) throw new Error('usePrescription precisa estar dentro de <PrescriptionProvider>.');
  return context;
}
