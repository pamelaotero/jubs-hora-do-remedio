import { BookOpen, House, Settings, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import type { RouteKey } from '@/i18n/routes';

type NavLabelKey = keyof Pick<Messages['nav'], 'home' | 'recipes' | 'settings' | 'privacy' | 'privacyShort'>;

export interface NavItem {
  route: RouteKey;
  labelKey: NavLabelKey;
  /** Rótulo curto para a barra inferior do celular, quando o completo não cabe. */
  shortLabelKey?: NavLabelKey;
  icon: LucideIcon;
}

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { route: 'home', labelKey: 'home', icon: House },
  { route: 'recipes', labelKey: 'recipes', icon: BookOpen },
  { route: 'privacy', labelKey: 'privacy', shortLabelKey: 'privacyShort', icon: ShieldCheck },
  { route: 'settings', labelKey: 'settings', icon: Settings },
];
