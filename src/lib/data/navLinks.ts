import { sections } from '@/config/sections';
import type { NavLink } from '@/config/types';

// Filter out sections that shouldn't appear in the main navigation
// e.g., Hero (usually handled by logo/top) and Footer
const EXCLUDED_NAV_IDS = ['hero', 'footer'];

export const navLinks: NavLink[] = sections
  .filter((section) => !EXCLUDED_NAV_IDS.includes(section.id) && section.icon)
  .map((section) => ({
    id: section.id,
    icon: section.icon!,
    label: section.title,
  }));
