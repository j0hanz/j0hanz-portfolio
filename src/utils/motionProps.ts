// Filters HTML drag/animation events that conflict with Motion's drag system
// These events are defined on HTMLAttributes but cause runtime issues when passed to Motion components
import type { ConflictingEvent } from '@/config/types';

const CONFLICTING_EVENTS: ConflictingEvent[] = [
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'onDragOver',
  'onDragEnter',
  'onDragLeave',
  'onDrop',
  'onAnimationStart',
  'onAnimationEnd',
  'onAnimationIteration',
];

// Filters props object to remove HTML events that conflict with Motion's event system
export function filterMotionConflicts<T extends Record<string, unknown>>(
  props: T
): Omit<T, ConflictingEvent> {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => !CONFLICTING_EVENTS.includes(key as ConflictingEvent)
    )
  ) as Omit<T, ConflictingEvent>;
}
