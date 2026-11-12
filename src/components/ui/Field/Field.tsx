import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import type { Option } from '@/constants/options';
import styles from './Field.module.css';

interface FieldWrapperProps {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}

function FieldWrapper({ label, hint, children }: FieldWrapperProps) {
  const id = useId();
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children(id)}
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}

type TextFieldProps = { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ label, hint, ...inputProps }: TextFieldProps) {
  return (
    <FieldWrapper label={label} hint={hint}>
      {(id) => <input id={id} className={styles.control} {...inputProps} />}
    </FieldWrapper>
  );
}

type TextAreaFieldProps = { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ label, hint, ...textareaProps }: TextAreaFieldProps) {
  return (
    <FieldWrapper label={label} hint={hint}>
      {(id) => <textarea id={id} className={`${styles.control} ${styles.textarea}`} {...textareaProps} />}
    </FieldWrapper>
  );
}

type SelectFieldProps<T extends string | number> = {
  label: string;
  hint?: string;
  value: T;
  options: ReadonlyArray<Option<T>>;
  onValueChange: (value: T) => void;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>;

export function SelectField<T extends string | number>({
  label,
  hint,
  value,
  options,
  onValueChange,
  ...selectProps
}: SelectFieldProps<T>) {
  const handleChange = (raw: string) => {
    const match = options.find((o) => String(o.value) === raw);
    if (match) onValueChange(match.value);
  };

  return (
    <FieldWrapper label={label} hint={hint}>
      {(id) => (
        <select
          id={id}
          className={`${styles.control} ${styles.select}`}
          value={String(value)}
          onChange={(e) => handleChange(e.target.value)}
          {...selectProps}
        >
          {options.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </FieldWrapper>
  );
}
