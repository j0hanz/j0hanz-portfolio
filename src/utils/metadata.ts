import {
  ApartmentTwoTone,
  CalendarTodayTwoTone,
  SchoolTwoTone,
} from '@mui/icons-material';

import type { IconBadgeMetaItem, IconComponent } from '@/config/types';

// Shared metadata creation utilities for consistent badge rendering

type MetaType = 'workplace' | 'school' | 'duration';
type MetaValue = string | null | undefined;

const META_ICONS: Record<MetaType, IconComponent> = {
  workplace: ApartmentTwoTone,
  school: SchoolTwoTone,
  duration: CalendarTodayTwoTone,
};

const isPresent = (value: MetaValue): value is string =>
  typeof value === 'string' && value.trim().length > 0;

// Unified metadata factory
function createMeta(type: MetaType, text: MetaValue): IconBadgeMetaItem | null {
  if (!isPresent(text)) return null;

  return { id: type, icon: META_ICONS[type], text: text.trim() };
}

export const createWorkplaceMeta = (workplace: MetaValue) =>
  createMeta('workplace', workplace);

export const createSchoolMeta = (school: MetaValue) =>
  createMeta('school', school);

export const createDurationMeta = (duration: MetaValue) =>
  createMeta('duration', duration);

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
