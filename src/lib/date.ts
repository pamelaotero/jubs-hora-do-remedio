import type { Messages } from '@/i18n/messages';

export type DateLabels = Messages['dates'];

export const MS_PER_DAY = 864e5;
export const MS_PER_HOUR = 36e5;

export const pad2 = (n: number): string => String(n).padStart(2, '0');

export const toIsoDate = (d: Date): string =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

export const todayIso = (): string => toIsoDate(new Date());

export const startOfDay = (d: Date): Date => {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

export const addDays = (d: Date, days: number): Date => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const daysBetween = (from: Date, to: Date): number =>
  Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / MS_PER_DAY);

/** Converte minutos desde 00:00 em "HH:mm". */
export const minutesToTime = (minutes: number): string =>
  `${pad2(Math.floor(minutes / 60))}:${pad2(minutes % 60)}`;

export const parseLocalDateTime = (isoDate: string, time: string): Date => {
  const [year, month, day] = isoDate.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

/* ---- Formatação no idioma do usuário ---- */

export const formatDayMonth = (d: Date, labels: DateLabels): string =>
  labels.dayMonth(pad2(d.getDate()), pad2(d.getMonth() + 1));

export const weekdayShort = (d: Date, labels: DateLabels): string => labels.weekdaysShort[d.getDay()];

export const weekdayLong = (d: Date, labels: DateLabels): string => labels.weekdaysLong[d.getDay()];

export const formatShortDay = (d: Date, labels: DateLabels): string =>
  `${weekdayShort(d, labels)} ${formatDayMonth(d, labels)}`;
