import { Card, Checkbox, SegmentedControl, TextField } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { useLocalizedOptions } from '@/hooks/useLocalizedOptions';
import type { Prescription } from '@/types';
import styles from './PatientDetailsCard.module.css';

type Details = Pick<Prescription, 'patientName' | 'patientType' | 'mergeNearbyTimes'>;

interface PatientDetailsCardProps {
  details: Details;
  onChange: (changes: Partial<Details>) => void;
}

export function PatientDetailsCard({ details, onChange }: PatientDetailsCardProps) {
  const { patient } = useI18n().t;
  const options = useLocalizedOptions();

  return (
    <Card className={styles.card}>
      <div className={styles.grid}>
        <TextField
          label={patient.nameLabel}
          placeholder={patient.namePlaceholder}
          value={details.patientName}
          onChange={(e) => onChange({ patientName: e.target.value })}
        />
        <SegmentedControl
          label={patient.typeLabel}
          value={details.patientType}
          options={options.patientType}
          onChange={(patientType) => onChange({ patientType })}
        />
      </div>
      <Checkbox
        checked={details.mergeNearbyTimes}
        onChange={(mergeNearbyTimes) => onChange({ mergeNearbyTimes })}
        label={patient.merge}
        description={patient.mergeDescription}
      />
    </Card>
  );
}
