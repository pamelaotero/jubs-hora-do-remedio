import { useI18n } from '@/hooks/useI18n';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import styles from './HowItWorks.module.css';

/** Passo a passo — conteúdo em texto que ajuda o Google a entender a página. */
export function HowItWorks() {
  const { howItWorks } = useI18n().t;

  return (
    <section aria-labelledby="how-title" className={styles.section}>
      <SectionHeading id="how-title" title={howItWorks.title} lead={howItWorks.lead} />
      <ol className={styles.steps}>
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {i + 1}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
