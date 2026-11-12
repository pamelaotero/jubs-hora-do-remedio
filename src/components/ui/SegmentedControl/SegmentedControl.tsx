import type { Option } from '@/constants/options';
import styles from './SegmentedControl.module.css';

interface SegmentedControlProps<T extends string> {
  label: string;
  value: T;
  options: ReadonlyArray<Option<T>>;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ label, value, options, onChange }: SegmentedControlProps<T>) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <div className={styles.group} role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.segment}
            aria-pressed={option.value === value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
