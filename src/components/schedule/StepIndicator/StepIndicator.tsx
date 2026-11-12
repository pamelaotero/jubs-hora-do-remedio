import { Check } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { cx } from '@/lib/cx';
import styles from './StepIndicator.module.css';

/** Etapas do fluxo. `current` começa em 1. */
export function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const { steps } = useI18n().t;

  return (
    <ol className={styles.steps} aria-label={steps.label}>
      {steps.items.map((label, index) => {
        const step = index + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li
            key={label}
            className={cx(styles.step, active && styles.active, done && styles.done)}
            aria-current={active ? 'step' : undefined}
          >
            <span className={styles.number}>{done ? <Check aria-hidden="true" /> : step}</span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}
