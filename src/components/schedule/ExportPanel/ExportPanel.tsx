import { CalendarPlus, FileDown, FileSpreadsheet } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { useScheduleExport } from '@/hooks/useScheduleExport';
import styles from './ExportPanel.module.css';

export function ExportPanel() {
  const { exportPanel } = useI18n().t;
  const { exportAs, busy } = useScheduleExport();
  const label = (format: 'pdf' | 'xlsx' | 'ics') => (busy === format ? exportPanel.generating : exportPanel[format]);

  return (
    <Card as="section" aria-labelledby="export-title" className={styles.panel}>
      <h2 id="export-title" className={styles.title}>
        {exportPanel.title}
      </h2>
      <div className={styles.actions}>
        <Button variant="primary" icon={<FileDown />} disabled={busy !== null} onClick={() => exportAs('pdf')}>
          {label('pdf')}
        </Button>
        <Button icon={<FileSpreadsheet />} disabled={busy !== null} onClick={() => exportAs('xlsx')}>
          {label('xlsx')}
        </Button>
        <Button icon={<CalendarPlus />} disabled={busy !== null} onClick={() => exportAs('ics')}>
          {label('ics')}
        </Button>
      </div>
      <p className={styles.help}>{exportPanel.help}</p>
    </Card>
  );
}
