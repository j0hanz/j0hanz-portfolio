import {
  ApartmentTwoTone,
  CalendarTodayTwoTone,
  SchoolTwoTone,
} from '@mui/icons-material';

import type { IconBadgeMetaItem, IconComponent } from '@/config/types';

// Shared metadata creation utilities for consistent badge rendering

type MetaType = 'workplace' | 'school' | 'duration';

const META_ICONS: Record<MetaType, IconComponent> = {
  workplace: ApartmentTwoTone,
  school: SchoolTwoTone,
  duration: CalendarTodayTwoTone,
};

// Unified metadata factory
function createMeta(type: MetaType, text: string): IconBadgeMetaItem {
  return {
    id: type,
    icon: META_ICONS[type],
    text,
  };
}

export const createWorkplaceMeta = (workplace: string) =>
  createMeta('workplace', workplace);

export const createSchoolMeta = (school: string) =>
  createMeta('school', school);

export const createDurationMeta = (duration: string) =>
  createMeta('duration', duration);

// Build stable unique keys for React list items
export function buildItemKey(title: string, identifier: string): string {
  return `${title}-${identifier}`;
}
