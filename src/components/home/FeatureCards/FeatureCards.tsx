import { CalendarDays, Heart, Pill, type LucideIcon } from 'lucide-react';
import { Card, IconBadge } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import styles from './FeatureCards.module.css';

const ICONS: ReadonlyArray<LucideIcon> = [CalendarDays, Pill, Heart];

export function FeatureCards() {
  const { t } = useI18n();

  return (
    <section aria-label={t.features.label} className={styles.grid}>
      {t.features.items.map(({ title, description }, i) => {
        const Icon = ICONS[i];
        return (
          <Card key={title} as="article" className={styles.card}>
            <IconBadge>
              <Icon />
            </IconBadge>
            <div>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>
          </Card>
        );
      })}
    </section>
  );
}
