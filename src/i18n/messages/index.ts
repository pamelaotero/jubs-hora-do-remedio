import type { Locale } from '../locales';
import { en } from './en';
import { pt, type Messages } from './pt';

export const MESSAGES: Record<Locale, Messages> = { pt, en };

export type { Messages };
