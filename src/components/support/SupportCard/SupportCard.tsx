import { Coffee, Copy, Eye, HandHeart, QrCode } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, IconBadge } from '@/components/ui';
import { SUPPORT } from '@/constants/app';
import { useI18n } from '@/hooks/useI18n';
import { useToast } from '@/hooks/useToast';
import styles from './SupportCard.module.css';

/** Pix só existe no Brasil: aparece apenas na versão em português. */
const PIX_LOCALES = ['pt'];

function PixKey() {
  const { support } = useI18n().t;
  const showToast = useToast();
  // A chave só entra no HTML depois do clique: dificulta a coleta por robôs.
  const [revealed, setRevealed] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT.pixKey);
      showToast(support.pixCopied);
    } catch {
      showToast(support.pixCopyFailed);
    }
  };

  if (!revealed) {
    return (
      <Button icon={<Eye />} onClick={() => setRevealed(true)}>
        {support.pixReveal}
      </Button>
    );
  }

  return (
    <div className={styles.pix}>
      <span className={styles.pixLabel}>
        <QrCode aria-hidden="true" />
        {support.pixKeyLabel}
      </span>
      <div className={styles.pixRow}>
        <code className={styles.pixKey}>{SUPPORT.pixKeyDisplay}</code>
        <Button size="sm" variant="primary" icon={<Copy />} onClick={copy}>
          {support.pixCopy}
        </Button>
      </div>
      <span className={styles.pixHolder}>{support.pixHolder(SUPPORT.pixHolder)}</span>
    </div>
  );
}

/** Apoio voluntário (Buy Me a Coffee / Pix). Não renderiza nada se não houver opção configurada. */
export function SupportCard() {
  const { t, locale } = useI18n();
  const hasCoffee = Boolean(SUPPORT.buyMeACoffeeUrl);
  const hasPix = Boolean(SUPPORT.pixKey) && PIX_LOCALES.includes(locale);

  if (!hasCoffee && !hasPix) return null;

  return (
    <Card as="aside" padding="lg" className={styles.card} aria-labelledby="support-title">
      <IconBadge>
        <HandHeart />
      </IconBadge>
      <div className={styles.body}>
        <h2 id="support-title" className={styles.title}>
          {t.support.title}
        </h2>
        <p className={styles.description}>{t.support.description}</p>
        <div className={styles.actions}>
          {hasCoffee && (
            <a className={styles.coffee} href={SUPPORT.buyMeACoffeeUrl} target="_blank" rel="noopener">
              <Coffee aria-hidden="true" />
              {t.support.coffee}
            </a>
          )}
          {hasPix && <PixKey />}
        </div>
        <p className={styles.disclaimer}>{t.support.disclaimer}</p>
      </div>
    </Card>
  );
}
