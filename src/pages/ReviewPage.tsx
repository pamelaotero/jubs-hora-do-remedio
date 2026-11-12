import { CalendarCheck, Plus } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MedicationCard, PatientDetailsCard } from '@/components/review';
import { StepIndicator } from '@/components/schedule';
import { Button, Notice, PageHeader } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { usePrescription } from '@/hooks/usePrescription';
import { useToast } from '@/hooks/useToast';
import { isMedicationComplete } from '@/lib/medication';
import styles from './Page.module.css';

export function ReviewPage() {
  const navigate = useNavigate();
  const showToast = useToast();
  const { t, path } = useI18n();
  const { prescription, updateDetails, addMedication, updateMedication, removeMedication, generatePlan } =
    usePrescription();

  if (!prescription) return <Navigate to={path('home')} replace />;

  const { medications, source } = prescription;

  const handleGenerate = () => {
    if (!medications.every(isMedicationComplete)) {
      showToast(t.review.incomplete);
      return;
    }
    generatePlan();
    navigate(path('schedule'));
  };

  return (
    <div className={`${styles.page} ${styles.narrow}`}>
      <StepIndicator current={2} />
      <PageHeader
        title={t.review.title}
        description={
          source === 'manual' ? t.review.descriptionManual : t.review.descriptionFile(medications.length)
        }
      />

      {source === 'arquivo' && <Notice>{t.review.simulated}</Notice>}

      <PatientDetailsCard details={prescription} onChange={updateDetails} />

      <div className={styles.stack}>
        {medications.map((medication, index) => (
          <MedicationCard
            key={medication.id}
            medication={medication}
            position={index + 1}
            onChange={(changes) => updateMedication(medication.id, changes)}
            onRemove={() => removeMedication(medication.id)}
          />
        ))}
      </div>

      <div className={`${styles.actions} ${styles.spread}`}>
        <Button icon={<Plus />} onClick={addMedication}>
          {t.review.add}
        </Button>
        <Button variant="primary" icon={<CalendarCheck />} onClick={handleGenerate}>
          {t.review.generate}
        </Button>
      </div>
    </div>
  );
}
