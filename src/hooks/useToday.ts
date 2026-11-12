import { useSyncExternalStore } from 'react';
import { toIsoDate } from '@/lib/date';

const subscribe = () => () => {};
const getSnapshot = () => toIsoDate(new Date());
const getServerSnapshot = () => null;

/**
 * Data de hoje (yyyy-mm-dd) só no navegador. Na pré-renderização retorna null,
 * evitando divergência de hidratação entre a data do build e a do visitante.
 */
export function useToday(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
