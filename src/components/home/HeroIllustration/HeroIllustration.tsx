import { PawPrint } from 'lucide-react';
import hero from '@/assets/shihtzu-hero.webp';
import styles from './HeroIllustration.module.css';

export function HeroIllustration() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <span className={styles.blob} />
      <PawPrint className={styles.paw} />
      <span className={styles.motion}>
        <i />
        <i />
        <i />
      </span>
      <img src={hero} alt="" width={900} height={775} className={styles.dog} fetchPriority="high" />
      <span className={styles.ground} />
    </div>
  );
}
