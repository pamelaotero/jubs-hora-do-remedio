import type { ReactNode } from 'react';
import { Info, ShieldCheck } from 'lucide-react';
import { cx } from '@/lib/cx';
import styles from './Notice.module.css';

interface NoticeProps {
  children: ReactNode;
  variant?: 'info' | 'privacy';
}

const ICONS = { info: Info, privacy: ShieldCheck };

export function Notice({ children, variant = 'info' }: NoticeProps) {
  const Icon = ICONS[variant];
  return (
    <div className={cx(styles.notice, styles[variant])}>
      <Icon aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
