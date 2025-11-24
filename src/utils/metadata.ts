import { ApartmentTwoTone, CalendarTodayTwoTone } from '@mui/icons-material';

import type { IconBadgeMetaItem } from '@/config/types';

// Shared metadata creation utilities for consistent badge rendering

export function createWorkplaceMeta(workplace: string): IconBadgeMetaItem {
  return {
    id: 'workplace',
    icon: ApartmentTwoTone,
    text: workplace,
  };
}

export function createSchoolMeta(school: string): IconBadgeMetaItem {
  return {
    id: 'school',
    icon: ApartmentTwoTone,
    text: school,
  };
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
