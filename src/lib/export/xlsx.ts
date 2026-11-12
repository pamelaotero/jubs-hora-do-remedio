import { formatShortDay, minutesToTime } from '@/lib/date';
import { dayIndexToDate, doseKey, rowsForWeek, weekDayIndexes } from '@/lib/schedule';
import { exportBaseName } from './fileName';
import type { ExportInput, ExportResult } from './types';

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/** Gera a planilha (uma aba por semana). Só escrita — nenhum arquivo externo é lido. */
export const createScheduleXlsx = async ({
  plan,
  givenDoses,
  patientName,
  labels,
  dates,
}: ExportInput): Promise<ExportResult> => {
  const XLSX = await import('xlsx');
  const workbook = XLSX.utils.book_new();

  for (let week = 0; week < plan.weeks; week++) {
    const dayIndexes = weekDayIndexes(week);
    const header = [
      labels.time,
      labels.medicine,
      labels.dose,
      ...dayIndexes.map((d) => formatShortDay(dayIndexToDate(plan, d), dates)),
    ];

    const body = rowsForWeek(plan, week).map((row) => {
      const med = plan.medications[row.medicationIndex];
      const cells = dayIndexes.map((d) => {
        if (!row.days.has(d)) return '—';
        return givenDoses.has(doseKey(row.key, d)) ? labels.givenCell : '☐';
      });
      return [minutesToTime(row.slot), med.name, med.dose, ...cells];
    });

    const sheet = XLSX.utils.aoa_to_sheet([header, ...body]);
    sheet['!cols'] = [{ wch: 9 }, { wch: 22 }, { wch: 14 }, ...dayIndexes.map(() => ({ wch: 10 }))];
    XLSX.utils.book_append_sheet(workbook, sheet, labels.sheet(week + 1));
  }

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return {
    filename: `${exportBaseName(patientName, labels)}.xlsx`,
    data: new Blob([buffer], { type: XLSX_MIME }),
    mimeType: XLSX_MIME,
  };
};
