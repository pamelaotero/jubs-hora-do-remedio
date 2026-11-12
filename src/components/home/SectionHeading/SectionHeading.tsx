import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  id: string;
  title: string;
  lead?: string;
}

export function SectionHeading({ id, title, lead }: SectionHeadingProps) {
  return (
    <header className={styles.heading}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
