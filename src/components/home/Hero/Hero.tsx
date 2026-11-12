import { FilePenLine, FileSearch, PawPrint, ShieldCheck, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';
import { HeroIllustration } from '../HeroIllustration/HeroIllustration';
import { UploadDropzone } from '../UploadDropzone/UploadDropzone';
import styles from './Hero.module.css';

interface HeroProps {
  onFileSelected: (file: File) => void;
  onTrySample: () => void;
  onFillManually: () => void;
}

export function Hero({ onFileSelected, onTrySample, onFillManually }: HeroProps) {
  const { t, path } = useI18n();
  const { hero } = t;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <UserRound aria-hidden="true" />
          {hero.eyebrowPeople}
          <span aria-hidden="true">·</span>
          <PawPrint aria-hidden="true" />
          {hero.eyebrowPet}
        </p>
        <h1 id="hero-title" className={styles.title}>
          {hero.title}
        </h1>
        <p className={styles.lead}>
          {hero.lead} <strong>{hero.leadStrong}</strong>
        </p>

        <UploadDropzone onFileSelected={onFileSelected} />

        <div className={styles.secondary}>
          <Button variant="secondary" size="sm" icon={<FilePenLine />} onClick={onFillManually}>
            {hero.fillManually}
          </Button>
          <Button variant="ghost" size="sm" icon={<FileSearch />} onClick={onTrySample}>
            {hero.trySample}
          </Button>
        </div>

        <p className={styles.privacy}>
          <ShieldCheck aria-hidden="true" />
          <span>
            {hero.privacyPrefix} <strong>{hero.privacyStrong}</strong>
            {hero.privacySuffix} <Link to={path('privacy')}>{hero.privacyLink}</Link>
          </span>
        </p>
      </div>

      <HeroIllustration />
    </section>
  );
}
