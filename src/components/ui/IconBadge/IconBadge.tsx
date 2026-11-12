import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import styles from './IconBadge.module.css';

interface IconBadgeProps {
  children: ReactNode;
  size?: 'md' | 'lg';
  tone?: 'soft' | 'dark';
}

/** Círculo com ícone, como nos cards de destaque do protótipo. */
export function IconBadge({ children, size = 'lg', tone = 'soft' }: IconBadgeProps) {
  return (
    <span className={cx(styles.badge, styles[size], styles[tone])} aria-hidden="true">
      {children}
    </span>
  );
}
