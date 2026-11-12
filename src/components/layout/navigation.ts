import { BookOpen, House, Settings, type LucideIcon } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import type { RouteKey } from '@/i18n/routes';

export interface NavItem {
  route: RouteKey;
  labelKey: keyof Pick<Messages['nav'], 'home' | 'recipes' | 'settings'>;
  icon: LucideIcon;
}

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { route: 'home', labelKey: 'home', icon: House },
  { route: 'recipes', labelKey: 'recipes', icon: BookOpen },
  { route: 'settings', labelKey: 'settings', icon: Settings },
];
