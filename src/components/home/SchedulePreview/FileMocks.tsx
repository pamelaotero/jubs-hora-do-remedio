import { useI18n } from '@/hooks/useI18n';
import type { MockWeek } from './buildMockWeek';
import styles from './FileMocks.module.css';

interface MockProps {
  week: MockWeek;
  title: string;
}

const COLUMN_LETTERS = 'ABCDEFGHIJ';

/** Miniatura da folha A4 que o PDF gera: tabela com quadradinhos para marcar à caneta. */
export function PdfMock({ week, title }: MockProps) {
  const { t } = useI18n();
  const labels = t.exportFile;

  return (
    <div className={styles.paper} aria-hidden="true">
      <p className={styles.paperTitle}>{title}</p>
      <p className={styles.paperHint}>{labels.pdfInstructions}</p>
      <table className={styles.pdfTable}>
        <thead>
          <tr>
            <th>{labels.time}</th>
            <th>{labels.medicine}</th>
            {week.dayHeaders.map((day, i) => (
              <th key={i}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {week.rows.map((row) => (
            <tr key={row.key}>
              <td className={styles.pdfTime}>{row.time}</td>
              <td className={styles.pdfMed}>
                {row.name}
                <span>{row.dose}</span>
              </td>
              {row.cells.map((hasDose, i) => (
                <td key={i} className={hasDose ? styles.pdfDose : styles.pdfEmpty}>
                  {hasDose && <span className={styles.checkbox} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {week.hiddenRows > 0 && <p className={styles.more}>{t.preview.moreRows(week.hiddenRows)}</p>}
      <p className={styles.paperFooter}>{labels.generatedWith}</p>
    </div>
  );
}

/** Miniatura da planilha que o Excel gera: grade com letras, números e aba da semana. */
export function XlsxMock({ week }: Omit<MockProps, 'title'>) {
  const { t } = useI18n();
  const labels = t.exportFile;
  const header = [labels.time, labels.medicine, labels.dose, ...week.dayHeaders];

  return (
    <div className={styles.sheet} aria-hidden="true">
      <table className={styles.xlsxTable}>
        <thead>
          <tr>
            <th className={styles.corner} />
            {header.map((_, i) => (
              <th key={i}>{COLUMN_LETTERS[i]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className={styles.xlsxHeader}>
            <th>1</th>
            {header.map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
          {week.rows.map((row, r) => (
            <tr key={row.key}>
              <th>{r + 2}</th>
              <td>{row.time}</td>
              <td className={styles.xlsxText}>{row.name}</td>
              <td className={styles.xlsxText}>{row.dose}</td>
              {row.cells.map((hasDose, i) => (
                <td key={i}>{hasDose ? '☐' : '—'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {week.hiddenRows > 0 && <p className={styles.more}>{t.preview.moreRows(week.hiddenRows)}</p>}
      <div className={styles.sheetTabs}>
        <span className={styles.sheetTabActive}>{labels.sheet(1)}</span>
      </div>
    </div>
  );
}
