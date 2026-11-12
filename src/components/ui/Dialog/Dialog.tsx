import { useEffect, useId, useRef, type ReactNode } from 'react';
import styles from './Dialog.module.css';

interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions: ReactNode;
}

/** Wrapper do <dialog> nativo: foco preso, Esc e backdrop acessíveis. */
export function Dialog({ open, title, onClose, children, actions }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        // Esc: o estado `open` do componente pai é a fonte da verdade.
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.body}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        {children}
        <div className={styles.actions}>{actions}</div>
      </div>
    </dialog>
  );
}
