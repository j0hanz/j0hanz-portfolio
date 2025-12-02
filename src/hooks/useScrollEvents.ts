import { useEffect, useRef } from 'react';

import { SCROLL_CONFIG } from '@/config/constants';
import type { ScrollDirection, UseScrollEventsProps } from '@/config/types';

import useEventCallback from './useEventCallback';

// Key mappings for keyboard navigation
const NAVIGATION_KEYS: Record<string, ScrollDirection> = {
  ArrowDown: 'down',
  PageDown: 'down',
  ' ': 'down',
  ArrowUp: 'up',
  PageUp: 'up',
} as const;

const getKeyboardDirection = (key: string): ScrollDirection | null =>
  NAVIGATION_KEYS[key] ?? null;

// Gets scroll boundary state from container
const getScrollBoundaryState = (container: HTMLElement) => {
  const { scrollTop, scrollHeight, clientHeight } = container;
  return {
    isAtTop: scrollTop <= SCROLL_CONFIG.TOLERANCE_PX,
    isAtBottom:
      Math.abs(scrollHeight - clientHeight - scrollTop) <=
      SCROLL_CONFIG.TOLERANCE_PX,
  };
};

// Check if container is at scroll boundary for given direction
function isAtScrollBoundary(direction: ScrollDirection): boolean {
  const container = document.getElementById(SCROLL_CONFIG.CONTAINER_ID);
  if (!container) return true;

  const { isAtTop, isAtBottom } = getScrollBoundaryState(container);
  return direction === 'down' ? isAtBottom : isAtTop;
}

export function useScrollEvents({
  onNavigate,
  shouldDisable,
  disableNonTouchInputs = false,
  isScrolling,
}: UseScrollEventsProps): void {
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const isTouchActive = useRef(false);

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

    const direction = getKeyboardDirection(e.key);
    if (direction && onNavigate(direction)) {
      e.preventDefault();
    }
  });

  const handleTouchStart = useEventCallback((e: TouchEvent) => {
    // Don't interfere with ongoing scroll animation
    if (isScrolling.current) return;

    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    isTouchActive.current = true;
  });

  const handleTouchMove = useEventCallback((_e: TouchEvent) => {
    // Track touch movement but don't prevent default here
    // This allows natural scrolling within sections
    if (!isTouchActive.current) return;
  });

  const handleTouchEnd = useEventCallback((e: TouchEvent) => {
    if (!isTouchActive.current) return;

    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const elapsed = Date.now() - touchStartTime.current;

    // Reset touch state first
    isTouchActive.current = false;

    // Don't navigate if already scrolling
    if (isScrolling.current) return;

    // More forgiving swipe detection: 40px minimum, 600ms maximum
    if (Math.abs(deltaY) < 40 || elapsed > 600) return;

    const direction: ScrollDirection = deltaY > 0 ? 'down' : 'up';

    // Check boundary and navigate
    if (isAtScrollBoundary(direction)) {
      if (onNavigate(direction)) {
        e.preventDefault();
      }
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
    // touchmove can be passive (we simplified it to only track position)
    window.addEventListener('touchmove', handleTouchMove, passiveTouchOption);
    // touchend needs non-passive for preventDefault
    window.addEventListener('touchend', handleTouchEnd, passiveOption);

    return () => {
      if (!disableNonTouchInputs) {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      // Reset touch state refs to prevent stale data on remount
      touchStartY.current = 0;
      touchStartTime.current = 0;
      isTouchActive.current = false;
    };
  }, [
    shouldDisable,
    disableNonTouchInputs,
    handleWheel,
    handleKeyDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  ]);
}
