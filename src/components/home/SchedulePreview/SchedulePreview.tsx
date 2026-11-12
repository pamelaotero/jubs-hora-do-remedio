import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, CalendarDays, Download, FileSpreadsheet, FileText, LayoutGrid, Pill } from 'lucide-react';
import { Button, ButtonLink, Card } from '@/components/ui';
import type { PreviewDays } from '@/constants/options';
import { createPreviewMedications } from '@/data/sampleMedications';
import { useI18n } from '@/hooks/useI18n';
import { useLocalizedOptions } from '@/hooks/useLocalizedOptions';
import { usePrescription } from '@/hooks/usePrescription';
import { useScheduleExport } from '@/hooks/useScheduleExport';
import { useToday } from '@/hooks/useToday';
import { formatDayMonth, minutesToTime, weekdayLong } from '@/lib/date';
import { withPatient } from '@/lib/export/fileName';
import { buildSchedulePlan } from '@/lib/schedule';
import { cx } from '@/lib/cx';
import type { SchedulePlan } from '@/types';
import { buildMockWeek } from './buildMockWeek';
import { buildPreviewDays } from './buildPreviewDays';
import { PdfMock, XlsxMock } from './FileMocks';
import styles from './SchedulePreview.module.css';

interface SchedulePreviewProps {
  plan: SchedulePlan | null;
  days: PreviewDays;
  onDaysChange: (days: PreviewDays) => void;
}

type PreviewTab = 'pdf' | 'xlsx' | 'days';

const TABS: ReadonlyArray<{ id: PreviewTab; icon: typeof FileText }> = [
  { id: 'pdf', icon: FileText },
  { id: 'xlsx', icon: FileSpreadsheet },
  { id: 'days', icon: LayoutGrid },
];

/** Data fixa só para montar o exemplo na pré-renderização; as datas não aparecem até o navegador assumir. */
const PRERENDER_DATE = '2026-01-05';

export function SchedulePreview({ plan, days, onDaysChange }: SchedulePreviewProps) {
  const { t, path } = useI18n();
  const { preview } = t;
  const options = useLocalizedOptions();
  const today = useToday();
  const { prescription } = usePrescription();
  const [tab, setTab] = useState<PreviewTab>('pdf');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const isExample = !plan;
  const patientName = plan ? (prescription?.patientName ?? '') : t.sample.patientName;

  const filePlan = useMemo(
    () => plan ?? buildSchedulePlan(createPreviewMedications(t.sample, today ?? PRERENDER_DATE), false),
    [plan, t.sample, today],
  );
  const mockWeek = useMemo(() => buildMockWeek(filePlan, t.dates, Boolean(today)), [filePlan, t.dates, today]);
  const previewDays = buildPreviewDays(plan, days, today);

  const { exportAs, busy } = useScheduleExport({
    plan: filePlan,
    patientName,
    filePrefix: isExample ? preview.filePrefix : '',
  });

  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const pdfTitle = `${withPatient(t.exportFile.pdfTitle, patientName)}  ·  ${t.exportFile.week(1, filePlan.weeks)}`;
  const format = tab === 'xlsx' ? 'Excel' : 'PDF';

  return (
    <Card as="section" padding="lg" className={styles.card} aria-labelledby="preview-title">
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 id="preview-title" className={styles.title}>
            <CalendarDays aria-hidden="true" />
            {preview.title}
            {isExample && <span className={styles.tag}>{preview.example}</span>}
          </h2>
          <p className={styles.lead}>{isExample ? preview.leadExample : preview.leadOwn}</p>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div role="tablist" aria-label={preview.tabsLabel} className={styles.tabs}>
          {TABS.map(({ id, icon: Icon }, index) => (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`preview-tab-${id}`}
              aria-selected={tab === id}
              aria-controls="preview-panel"
              tabIndex={tab === id ? 0 : -1}
              className={cx(styles.tab, tab === id && styles.tabActive)}
              onClick={() => setTab(id)}
              onKeyDown={(e) => handleTabKey(e, index)}
            >
              <Icon aria-hidden="true" />
              {preview.tabs[id]}
            </button>
          ))}
        </div>

        {tab === 'days' && (
          <label className={styles.daysSelect}>
            <span className="visually-hidden">{preview.daysLabel}</span>
            <select value={days} onChange={(e) => onDaysChange(Number(e.target.value) as PreviewDays)}>
              {options.previewDays.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div id="preview-panel" role="tabpanel" aria-labelledby={`preview-tab-${tab}`} className={styles.panel}>
        {tab === 'days' ? (
          <div className={styles.scroller}>
            <ol className={styles.days}>
              {previewDays.map(({ date, slots }, index) => (
                <li key={index} className={styles.day}>
                  <span className={styles.weekday}>{date ? weekdayLong(date, t.dates) : ' '}</span>
                  <span className={styles.date}>{date ? formatDayMonth(date, t.dates) : ' '}</span>
                  {slots.length ? (
                    <ul className={styles.slots}>
                      {slots.map((slot) => (
                        <li key={slot}>
                          <Pill aria-hidden="true" />
                          {minutesToTime(slot)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className={styles.none}>{preview.noDoses}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <>
            <p className={styles.caption}>{tab === 'pdf' ? preview.pdfCaption : preview.xlsxCaption}</p>
            <div className={styles.fileStage}>
              {tab === 'pdf' ? <PdfMock week={mockWeek} title={pdfTitle} /> : <XlsxMock week={mockWeek} />}
            </div>
            <div className={styles.fileActions}>
              <Button
                variant="primary"
                icon={<Download />}
                disabled={busy !== null}
                onClick={() => exportAs(tab === 'xlsx' ? 'xlsx' : 'pdf')}
              >
                {busy ? t.exportPanel.generating : isExample ? preview.downloadExample(format) : preview.download(format)}
              </Button>
              {isExample && <span className={styles.fileNote}>{preview.exampleNote}</span>}
            </div>
          </>
        )}
      </div>

      {plan && (
        <ButtonLink to={path('schedule')} variant="secondary" icon={<ArrowRight />} className={styles.cta}>
          {preview.seeFull}
        </ButtonLink>
      )}
    </Card>
  );
}
