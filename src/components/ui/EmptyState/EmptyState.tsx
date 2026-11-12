import type { ReactNode } from 'react';
import { Card } from '../Card/Card';
import { IconBadge } from '../IconBadge/IconBadge';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card padding="lg" className={styles.empty}>
      <IconBadge>{icon}</IconBadge>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      {action}
    </Card>
  );
}
