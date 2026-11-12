const REVOKE_DELAY_MS = 4000;

/** Salva um arquivo gerado no próprio navegador. Nada é enviado a servidores. */
export const downloadFile = (filename: string, data: Blob | string, mimeType = 'application/octet-stream'): void => {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), REVOKE_DELAY_MS);
};
