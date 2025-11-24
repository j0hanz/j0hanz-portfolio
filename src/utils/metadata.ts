import { ApartmentTwoTone, CalendarTodayTwoTone } from '@mui/icons-material';

import type { IconBadgeMetaItem } from '@/config/types';

// Shared metadata creation utilities for consistent badge rendering

// Generic location metadata factory (workplace or school)
function createLocationMeta(
  type: 'workplace' | 'school',
  text: string
): IconBadgeMetaItem {
  return {
    id: type,
    icon: ApartmentTwoTone,
    text,
  };
}

export function createWorkplaceMeta(workplace: string): IconBadgeMetaItem {
  return createLocationMeta('workplace', workplace);
}

export function createSchoolMeta(school: string): IconBadgeMetaItem {
  return createLocationMeta('school', school);
}

export function createDurationMeta(duration: string): IconBadgeMetaItem {
  return {
    id: 'duration',
    icon: CalendarTodayTwoTone,
    text: duration,
  };
}

// Build stable unique keys for React list items
export function buildItemKey(title: string, duration: string): string {
  return `${title}-${duration}`;
}
