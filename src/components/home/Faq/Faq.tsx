import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import styles from './Faq.module.css';

/** Perguntas frequentes com <details>: acessível, sem JS e lido pelo Google. */
export function Faq() {
  const { faq } = useI18n().t;

  return (
    <section aria-labelledby="faq-title" className={styles.section}>
      <SectionHeading id="faq-title" title={faq.title} />
      <div className={styles.list}>
        {faq.items.map(({ question, answer }) => (
          <details key={question} className={styles.item}>
            <summary className={styles.question}>
              <h3>{question}</h3>
              <ChevronDown aria-hidden="true" className={styles.chevron} />
            </summary>
            <p className={styles.answer}>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
