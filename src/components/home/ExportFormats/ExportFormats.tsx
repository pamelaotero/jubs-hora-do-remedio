import { CalendarPlus, FileSpreadsheet, FileText, type LucideIcon } from 'lucide-react';
import { Card, IconBadge } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import styles from './ExportFormats.module.css';

const ICONS: ReadonlyArray<LucideIcon> = [FileText, FileSpreadsheet, CalendarPlus];
const BADGES = ['PDF', 'XLSX', 'ICS'];

/** Formatos de saída: PDF, Excel e agenda/calendário. */
export function ExportFormats() {
  const { formats } = useI18n().t;

  return (
    <section aria-labelledby="formats-title" className={styles.section}>
      <SectionHeading id="formats-title" title={formats.title} />
      <div className={styles.grid}>
        {formats.items.map(({ title, description }, i) => {
          const Icon = ICONS[i];
          return (
            <Card key={title} as="article" className={styles.card}>
              <div className={styles.top}>
                <IconBadge size="md" tone="soft">
                  <Icon />
                </IconBadge>
                <span className={styles.badge}>{BADGES[i]}</span>
              </div>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
