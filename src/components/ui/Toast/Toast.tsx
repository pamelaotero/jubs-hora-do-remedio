import styles from './Toast.module.css';

export function Toast({ message }: { message: string | null }) {
  return (
    <div className={styles.region} role="status" aria-live="polite">
      {message && <div className={styles.toast}>{message}</div>}
    </div>
  );
}
