import { APP_NAME } from '@/constants/app';
import { daysBetween, pad2 } from '@/lib/date';
import { doseKey } from '@/lib/schedule';
import { exportBaseName } from './fileName';
import type { ExportInput, ExportResult } from './types';

const EVENT_DURATION_MS = 10 * 6e4;

const formatIcsDate = (d: Date): string =>
  `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;

const escapeIcs = (text: string): string => text.replace(/[\\,;]/g, '\\$&').replace(/\n/g, '\\n');

/** Gera um .ics com um evento + alarme por dose ainda não dada. */
export const createScheduleIcs = ({ plan, givenDoses, patientName, labels }: ExportInput): ExportResult => {
  const stamp = formatIcsDate(new Date());
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//${APP_NAME}//Medication schedule//EN`, 'CALSCALE:GREGORIAN'];

  plan.doses.forEach((dose, index) => {
    const start = new Date(dose.time);
    start.setHours(Math.floor(dose.slot / 60), dose.slot % 60, 0, 0);

    const rowKey = `${dose.slot}|${dose.medicationIndex}`;
    if (givenDoses.has(doseKey(rowKey, daysBetween(plan.firstDay, start)))) return;

    const med = plan.medications[dose.medicationIndex];
    lines.push(
      'BEGIN:VEVENT',
      `UID:${stamp}-${index}@jubs.local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(new Date(start.getTime() + EVENT_DURATION_MS))}`,
      `SUMMARY:${escapeIcs(`${med.name} — ${med.dose}`)}`,
      `DESCRIPTION:${escapeIcs(med.notes || labels.icsDefaultDescription)}`,
      'BEGIN:VALARM',
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeIcs(labels.icsAlarm(med.name))}`,
      'TRIGGER:PT0M',
      'END:VALARM',
      'END:VEVENT',
    );
  });

  lines.push('END:VCALENDAR');
  return {
    filename: `${exportBaseName(patientName, labels)}.ics`,
    data: lines.join('\r\n'),
    mimeType: 'text/calendar',
  };
};
