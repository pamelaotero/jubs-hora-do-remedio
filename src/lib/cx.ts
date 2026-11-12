/** Junta classes CSS ignorando valores falsos. */
export const cx = (...classes: Array<string | false | null | undefined>): string => classes.filter(Boolean).join(' ');
