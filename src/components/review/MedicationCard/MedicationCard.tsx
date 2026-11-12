import { Trash2 } from 'lucide-react';
import { Button, Card, SelectField, TextAreaField, TextField } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { useLocalizedOptions } from '@/hooks/useLocalizedOptions';
import type { Medication } from '@/types';
import styles from './MedicationCard.module.css';

const MIN_DAYS = 1;
const MAX_DAYS = 90;

const clampDays = (value: string) => Math.min(MAX_DAYS, Math.max(MIN_DAYS, Number(value) || MIN_DAYS));

interface MedicationCardProps {
  medication: Medication;
  position: number;
  onChange: (changes: Partial<Medication>) => void;
  onRemove: () => void;
}

export function MedicationCard({ medication, position, onChange, onRemove }: MedicationCardProps) {
  const { medication: labels } = useI18n().t;
  const options = useLocalizedOptions();
  const title = labels.title(position);

  return (
    <Card as="article" className={styles.card} aria-label={title}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.number}>{position}</span>
          {medication.name.trim() || title}
        </h2>
        <Button variant="ghost" size="sm" icon={<Trash2 />} onClick={onRemove} aria-label={labels.removeAria(title)}>
          {labels.remove}
        </Button>
      </header>

      <div className={styles.grid}>
        <TextField
          label={labels.name}
          placeholder={labels.namePlaceholder}
          value={medication.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <TextField
          label={labels.dose}
          placeholder={labels.dosePlaceholder}
          value={medication.dose}
          onChange={(e) => onChange({ dose: e.target.value })}
        />
        <SelectField
          label={labels.frequency}
          value={medication.intervalHours}
          options={options.interval}
          onValueChange={(intervalHours) => onChange({ intervalHours })}
        />
        <SelectField
          label={labels.duration}
          value={medication.durationType}
          options={options.duration}
          onValueChange={(durationType) => onChange({ durationType })}
        />
        {medication.durationType === 'dias' && (
          <TextField
            label={labels.days}
            type="number"
            inputMode="numeric"
            min={MIN_DAYS}
            max={MAX_DAYS}
            value={medication.days}
            onChange={(e) => onChange({ days: clampDays(e.target.value) })}
          />
        )}
        <TextField
          label={labels.startDate}
          type="date"
          value={medication.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
        />
        <TextField
          label={labels.startTime}
          type="time"
          value={medication.startTime}
          onChange={(e) => onChange({ startTime: e.target.value })}
        />
      </div>

      <TextAreaField
        label={labels.notes}
        placeholder={labels.notesPlaceholder}
        value={medication.notes}
        onChange={(e) => onChange({ notes: e.target.value })}
      />
    </Card>
  );
}
