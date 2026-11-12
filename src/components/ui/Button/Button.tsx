import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cx } from '@/lib/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'md' | 'sm';

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const buttonClass = ({ variant = 'secondary', size = 'md', fullWidth }: StyleProps, className?: string) =>
  cx(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className);

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, icon, fullWidth, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass({ variant, size, fullWidth }, className)} {...rest}>
      {icon}
      {children}
    </button>
  );
}

type ButtonLinkProps = StyleProps & LinkProps;

export function ButtonLink({ variant, size, icon, fullWidth, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClass({ variant, size, fullWidth }, className)} {...rest}>
      {icon}
      {children}
    </Link>
  );
}
