export const APP_NAME = 'Jubs';

export const AUTHOR = {
  name: 'Pamela Otero',
} as const;

/** Contato para dúvidas (link do WhatsApp: só números, com 55 + DDD). */
export const CONTACT = {
  whatsappNumber: '5592993879214',
} as const;

/**
 * Apoio voluntário ao projeto. Deixe um campo vazio ('') para esconder a opção.
 * Pix: prefira uma chave ALEATÓRIA do seu banco em vez de celular/CPF (fica público no site).
 */
export const SUPPORT = {
  /** Ex.: 'https://buymeacoffee.com/seu-usuario' */
  buyMeACoffeeUrl: '',
  /** Valor copiado (formato oficial de chave celular: +55 DDD número). */
  pixKey: '+5592993879214',
  /** Como a chave é exibida. */
  pixKeyDisplay: '(92) 99387-9214',
  pixHolder: AUTHOR.name,
} as const;

export const ACCEPTED_FILE_TYPES = '.pdf,image/png,image/jpeg';

/** Dias exibidos para tratamentos contínuos ou "até acabar". */
export const OPEN_ENDED_HORIZON_DAYS = 28;

/** Diferença máxima (min) para juntar horários próximos. */
export const MERGE_WINDOW_MINUTES = 60;

export const READING_DELAY_MS = 1400;
export const TOAST_DURATION_MS = 4200;
