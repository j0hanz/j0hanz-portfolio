// Filters HTML drag/animation events that conflict with Motion's drag system
// These events are defined on HTMLAttributes but cause runtime issues when passed to Motion components

const CONFLICTING_EVENTS = [
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
] as const;

type ConflictingEvent = (typeof CONFLICTING_EVENTS)[number];

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
