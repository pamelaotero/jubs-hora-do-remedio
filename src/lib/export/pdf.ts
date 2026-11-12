import { formatShortDay, minutesToTime } from '@/lib/date';
import { dayIndexToDate, doseKey, rowsForWeek, weekDayIndexes } from '@/lib/schedule';
import { exportBaseName, withPatient } from './fileName';
import type { ExportInput, ExportResult } from './types';

const CHECKBOX_SIZE_MM = 6;
const FIXED_COLUMNS = 2;
const GRAY_CELL: [number, number, number] = [225, 225, 225];
const HEAD_FILL: [number, number, number] = [31, 31, 31];

/** Gera o PDF (A4 paisagem, uma página por semana) com quadradinhos para marcar à caneta. */
export const createSchedulePdf = async ({
  plan,
  givenDoses,
  patientName,
  labels,
  dates,
}: ExportInput): Promise<ExportResult> => {
  const [{ jsPDF }, { autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')]);
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  for (let week = 0; week < plan.weeks; week++) {
    if (week > 0) doc.addPage();

    const dayIndexes = weekDayIndexes(week);
    const rows = rowsForWeek(plan, week);

    doc.setFont('helvetica', 'bold').setFontSize(16);
    doc.text(`${withPatient(labels.pdfTitle, patientName)}  ·  ${labels.week(week + 1, plan.weeks)}`, 12, 14);
    doc.setFont('helvetica', 'normal').setFontSize(9);
    doc.text(labels.pdfInstructions, 12, 20);

    autoTable(doc, {
      startY: 24,
      theme: 'grid',
      head: [[labels.time, labels.medicine, ...dayIndexes.map((d) => formatShortDay(dayIndexToDate(plan, d), dates))]],
      body: rows.map((row) => {
        const med = plan.medications[row.medicationIndex];
        return [
          minutesToTime(row.slot),
          `${med.name}\n${med.dose}`,
          ...dayIndexes.map((d) => (givenDoses.has(doseKey(row.key, d)) ? labels.givenShort : '')),
        ];
      }),
      styles: { fontSize: 10, cellPadding: 2.5, valign: 'middle', lineColor: [60, 60, 60], lineWidth: 0.25, minCellHeight: 11 },
      headStyles: { fillColor: HEAD_FILL, textColor: 255, halign: 'center' },
      columnStyles: { 0: { cellWidth: 18, fontStyle: 'bold', halign: 'center' }, 1: { cellWidth: 58 } },
      didParseCell: (cell) => {
        if (cell.section !== 'body' || cell.column.index < FIXED_COLUMNS) return;
        const dayIndex = dayIndexes[cell.column.index - FIXED_COLUMNS];
        cell.cell.styles.halign = 'center';
        cell.cell.styles.fontSize = 8;
        if (!rows[cell.row.index].days.has(dayIndex)) cell.cell.styles.fillColor = GRAY_CELL;
      },
      didDrawCell: (cell) => {
        if (cell.section !== 'body' || cell.column.index < FIXED_COLUMNS) return;
        const row = rows[cell.row.index];
        const dayIndex = dayIndexes[cell.column.index - FIXED_COLUMNS];
        if (!row.days.has(dayIndex) || givenDoses.has(doseKey(row.key, dayIndex))) return;
        doc.setDrawColor(20).setLineWidth(0.5);
        doc.rect(
          cell.cell.x + (cell.cell.width - CHECKBOX_SIZE_MM) / 2,
          cell.cell.y + (cell.cell.height - CHECKBOX_SIZE_MM) / 2,
          CHECKBOX_SIZE_MM,
          CHECKBOX_SIZE_MM,
        );
      },
    });

    const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
    let y = finalY + 7;
    doc.setFontSize(9);
    plan.medications
      .filter((m) => m.notes.trim())
      .forEach((m) => {
        doc.text(`• ${m.name}: ${m.notes}`, 12, y);
        y += 5;
      });
    doc.setTextColor(120).text(labels.generatedWith, 12, 200).setTextColor(0);
  }

  return {
    filename: `${exportBaseName(patientName, labels)}.pdf`,
    data: doc.output('blob'),
    mimeType: 'application/pdf',
  };
};
