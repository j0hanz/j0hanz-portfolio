import {
  ApartmentTwoTone,
  CalendarTodayTwoTone,
  SchoolTwoTone,
} from '@mui/icons-material';

import type {
  IconBadgeMetaItem,
  IconComponent,
  MetaType,
  MetaValue,
} from '@/config/types';

// Shared metadata creation utilities for consistent badge rendering

const META_ICONS: Record<MetaType, IconComponent> = {
  workplace: ApartmentTwoTone,
  school: SchoolTwoTone,
  duration: CalendarTodayTwoTone,
};

const isPresent = (value: MetaValue): value is string =>
  typeof value === 'string' && value.trim().length > 0;

// Unified metadata factory
export function createMeta(
  type: MetaType,
  text: MetaValue
): IconBadgeMetaItem | null {
  if (!isPresent(text)) return null;

  return { id: type, icon: META_ICONS[type], text: text.trim() };
}

// Remove null metadata entries
export function compactMetadata(
  entries: Array<IconBadgeMetaItem | null | undefined>
): IconBadgeMetaItem[] {
  return entries.filter((entry): entry is IconBadgeMetaItem =>
    Boolean(entry?.text)
  );
}

// Build stable unique keys for React list items
export function buildItemKey(
  title: string,
  identifier: string,
  uniqueSuffix?: string | number
): string {
  const suffix = uniqueSuffix ?? '';
  return [title, identifier, suffix]
    .filter((part) => part !== undefined && part !== null && `${part}` !== '')
    .join('-');
}
