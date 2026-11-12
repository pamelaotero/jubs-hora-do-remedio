import { useState } from 'react';
import { Button, Checkbox, Dialog } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import styles from './ConsentDialog.module.css';

interface ConsentDialogProps {
  open: boolean;
  fileName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConsentDialog({ open, fileName, onConfirm, onCancel }: ConsentDialogProps) {
  const { consent } = useI18n().t;
  const [accepted, setAccepted] = useState(false);

  const close = (confirmed: boolean) => {
    setAccepted(false);
    if (confirmed) onConfirm();
    else onCancel();
  };

  return (
    <Dialog
      open={open}
      title={consent.title}
      onClose={() => close(false)}
      actions={
        <>
          <Button variant="ghost" onClick={() => close(false)}>
            {consent.cancel}
          </Button>
          <Button variant="primary" disabled={!accepted} onClick={() => close(true)}>
            {consent.confirm}
          </Button>
        </>
      }
    >
      <p>
        {consent.bodyPrefix} <strong>{fileName}</strong> {consent.bodyMiddle} <strong>{consent.bodyStrong}</strong>
        {consent.bodySuffix}
      </p>
      <p className={styles.muted}>{consent.note}</p>
      <Checkbox checked={accepted} onChange={setAccepted} label={consent.accept} />
    </Dialog>
  );
}
