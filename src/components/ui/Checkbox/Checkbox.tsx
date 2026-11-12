import { useId, type ReactNode } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  description?: ReactNode;
}

export function Checkbox({ checked, onChange, label, description }: CheckboxProps) {
  const id = useId();
  return (
    <label htmlFor={id} className={styles.checkbox}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>
        <strong>{label}</strong>
        {description && <span className={styles.description}>{description}</span>}
      </span>
    </label>
  );
}
