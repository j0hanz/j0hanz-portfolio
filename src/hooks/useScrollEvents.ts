import { useEffect, useRef } from 'react';

import { SCROLL_CONFIG } from '@/config/constants';
import type { ScrollDirection, UseScrollEventsProps } from '@/config/types';

import { useEventCallback } from './useEventCallback';

// Key mappings for keyboard navigation
const NAVIGATION_KEYS: Record<string, ScrollDirection> = {
  ArrowDown: 'down',
  PageDown: 'down',
  ' ': 'down',
  ArrowUp: 'up',
  PageUp: 'up',
};

// Check if container is at scroll boundary for given direction
export function isAtScrollBoundary(direction: ScrollDirection): boolean {
  const container = document.getElementById(SCROLL_CONFIG.CONTAINER_ID);
  if (!container) return true;

  const { scrollTop, scrollHeight, clientHeight } = container;
  const isAtTop = scrollTop <= SCROLL_CONFIG.TOLERANCE_PX;
  const isAtBottom =
    Math.abs(scrollHeight - clientHeight - scrollTop) <=
    SCROLL_CONFIG.TOLERANCE_PX;

  return direction === 'down' ? isAtBottom : isAtTop;
}

export function useScrollEvents({
  onNavigate,
  shouldDisable,
  disableNonTouchInputs = false,
  isScrolling,
}: UseScrollEventsProps): void {
  const touchStartYRef = useRef(0);
  const touchStartTimeRef = useRef(0);
  const isTouchActiveRef = useRef(false);

  const handleWheel = useEventCallback((e: WheelEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    if (Math.abs(e.deltaY) <= SCROLL_CONFIG.WHEEL_THRESHOLD_PX) return;

    const direction: ScrollDirection = e.deltaY > 0 ? 'down' : 'up';
    if (onNavigate(direction)) {
      e.preventDefault();
    }
  });

  const handleKeyDown = useEventCallback((e: KeyboardEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const direction = NAVIGATION_KEYS[e.key];
    if (direction && onNavigate(direction)) {
      e.preventDefault();
    }
  });

  const handleTouchStart = useEventCallback((e: TouchEvent) => {
    // Don't interfere with ongoing scroll animation
    if (isScrolling.current) return;

    const touch = e.touches[0];
    if (!touch) return;

    touchStartYRef.current = touch.clientY;
    touchStartTimeRef.current = Date.now();
    isTouchActiveRef.current = true;
  });

  const handleTouchEnd = useEventCallback((e: TouchEvent) => {
    if (!isTouchActiveRef.current || isScrolling.current) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const deltaY = touchStartYRef.current - touch.clientY;
    const elapsed = Date.now() - touchStartTimeRef.current;
    isTouchActiveRef.current = false;

    // Validate swipe gesture
    if (
      Math.abs(deltaY) < SCROLL_CONFIG.SWIPE_MIN_DISTANCE_PX ||
      elapsed > SCROLL_CONFIG.SWIPE_MAX_DURATION_MS
    )
      return;

    const direction: ScrollDirection = deltaY > 0 ? 'down' : 'up';
    if (isAtScrollBoundary(direction) && onNavigate(direction)) {
      e.preventDefault();
    }
  });

  useEffect(() => {
    if (shouldDisable) return;

    const passiveOption = { passive: false };
    const passiveTouchOption = { passive: true };

    if (!disableNonTouchInputs) {
      window.addEventListener('wheel', handleWheel, passiveOption);
      window.addEventListener('keydown', handleKeyDown);
    }

    // touchstart can be passive (we don't preventDefault there)
    window.addEventListener('touchstart', handleTouchStart, passiveTouchOption);
    // touchend needs non-passive for preventDefault
    window.addEventListener('touchend', handleTouchEnd, passiveOption);

    return () => {
      if (!disableNonTouchInputs) {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);

      // Reset touch state refs on unmount
      touchStartYRef.current = 0;
      touchStartTimeRef.current = 0;
      isTouchActiveRef.current = false;
    };
  }, [
    shouldDisable,
    disableNonTouchInputs,
    handleWheel,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd,
  ]);
}
