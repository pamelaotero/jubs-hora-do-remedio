import { RotateCcw, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';
import { Button, ButtonLink, Card, Checkbox, Notice, PageHeader, SegmentedControl, SelectField } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { useLocalizedOptions } from '@/hooks/useLocalizedOptions';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/useToast';
import pageStyles from './Page.module.css';
import styles from './SettingsPage.module.css';

export function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { t, path } = useI18n();
  const labels = t.settings;
  const options = useLocalizedOptions();
  const showToast = useToast();

  const handleReset = () => {
    resetSettings();
    showToast(labels.resetDone);
  };

  return (
    <div className={`${pageStyles.page} ${pageStyles.narrow}`}>
      <PageHeader icon={<SettingsIcon aria-hidden="true" />} title={labels.title} description={labels.description} />

      <Card as="section" padding="lg" className={styles.section} aria-labelledby="settings-recipe">
        <h2 id="settings-recipe" className={styles.title}>
          {labels.newRecipes}
        </h2>
        <SegmentedControl
          label={labels.defaultType}
          value={settings.defaultPatientType}
          options={options.patientType}
          onChange={(defaultPatientType) => updateSettings({ defaultPatientType })}
        />
        <Checkbox
          checked={settings.mergeNearbyTimes}
          onChange={(mergeNearbyTimes) => updateSettings({ mergeNearbyTimes })}
          label={labels.merge}
          description={labels.mergeDescription}
        />
      </Card>

      <Card as="section" padding="lg" className={styles.section} aria-labelledby="settings-display">
        <h2 id="settings-display" className={styles.title}>
          {labels.display}
        </h2>
        <div className={styles.field}>
          <SelectField
            label={labels.previewDays}
            value={settings.previewDays}
            options={options.previewDays}
            onValueChange={(previewDays) => updateSettings({ previewDays })}
          />
        </div>
      </Card>

      <Notice variant="privacy">{labels.privacy}</Notice>

      <div className={pageStyles.actions}>
        <Button icon={<RotateCcw />} onClick={handleReset}>
          {labels.reset}
        </Button>
        <ButtonLink to={path('privacy')} variant="ghost" icon={<ShieldCheck />}>
          {labels.privacyLink}
        </ButtonLink>
      </div>
    </div>
  );
}
