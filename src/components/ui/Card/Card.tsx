import type { ElementType, HTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import styles from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  padding?: 'md' | 'lg';
}

export function Card({ as: Component = 'div', padding = 'md', className, ...rest }: CardProps) {
  return <Component className={cx(styles.card, styles[padding], className)} {...rest} />;
}
