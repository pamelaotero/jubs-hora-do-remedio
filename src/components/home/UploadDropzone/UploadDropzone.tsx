import { useRef, useState, type DragEvent } from 'react';
import { CloudUpload } from 'lucide-react';
import { ACCEPTED_FILE_TYPES } from '@/constants/app';
import { useI18n } from '@/hooks/useI18n';
import { cx } from '@/lib/cx';
import styles from './UploadDropzone.module.css';

interface UploadDropzoneProps {
  onFileSelected: (file: File) => void;
}

/** Área de envio da receita — aceita clique, teclado e arrastar. */
export function UploadDropzone({ onFileSelected }: UploadDropzoneProps) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (event: DragEvent, dragging: boolean) => {
    event.preventDefault();
    setIsDragging(dragging);
  };

  const handleDrop = (event: DragEvent) => {
    handleDrag(event, false);
    const file = event.dataTransfer.files[0];
    if (file) onFileSelected(file);
  };

  return (
    <button
      type="button"
      className={cx(styles.dropzone, isDragging && styles.dragging)}
      onClick={() => inputRef.current?.click()}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      <span className={styles.icon} aria-hidden="true">
        <CloudUpload />
      </span>
      <span className={styles.title}>{t.upload.title}</span>
      <span className={styles.hint}>{t.upload.hint}</span>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILE_TYPES}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelected(file);
          e.target.value = '';
        }}
      />
    </button>
  );
}
