import { createContext } from 'react';
import type { PatientType } from '@/types';
import type { PreviewDays } from '@/constants/options';

export interface Settings {
  defaultPatientType: PatientType;
  mergeNearbyTimes: boolean;
  previewDays: PreviewDays;
}

export const DEFAULT_SETTINGS: Settings = {
  defaultPatientType: 'pet',
  mergeNearbyTimes: false,
  previewDays: 7,
};

export interface SettingsContextValue {
  settings: Settings;
  updateSettings: (changes: Partial<Settings>) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);
