import { ConsentDialog, ExportFormats, Faq, FeatureCards, Hero, HowItWorks, SchedulePreview } from '@/components/home';
import { SupportCard } from '@/components/support';
import { usePrescription } from '@/hooks/usePrescription';
import { useSettings } from '@/hooks/useSettings';
import { useUploadFlow } from '@/hooks/useUploadFlow';
import styles from './Page.module.css';

export function HomePage() {
  const { plan } = usePrescription();
  const { settings, updateSettings } = useSettings();
  const upload = useUploadFlow();

  return (
    <div className={`${styles.page} ${styles.landing}`}>
      <Hero
        onFileSelected={upload.requestReading}
        onTrySample={upload.requestSample}
        onFillManually={upload.fillManually}
      />
      <FeatureCards />
      <SchedulePreview
        plan={plan}
        days={settings.previewDays}
        onDaysChange={(previewDays) => updateSettings({ previewDays })}
      />
      <HowItWorks />
      <ExportFormats />
      <Faq />
      <SupportCard />      <ConsentDialog
        open={upload.pendingFileName !== null}
        fileName={upload.pendingFileName ?? ''}
        onConfirm={upload.confirm}
        onCancel={upload.cancel}
      />
    </div>
  );
}
