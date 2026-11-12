import { House, PawPrint } from 'lucide-react';
import { ButtonLink, EmptyState } from '@/components/ui';
import { useI18n } from '@/hooks/useI18n';

export function NotFoundPage() {
  const { t, path } = useI18n();
  return (
    <EmptyState
      icon={<PawPrint />}
      title={t.notFound.title}
      description={t.notFound.description}
      action={
        <ButtonLink to={path('home')} variant="primary" icon={<House />}>
          {t.notFound.action}
        </ButtonLink>
      }
    />
  );
}
