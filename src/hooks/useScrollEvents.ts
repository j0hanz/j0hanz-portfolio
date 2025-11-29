import { useEffect, useRef } from 'react';

import type { ScrollDirection, UseScrollEventsProps } from '@/config/types';

import useEventCallback from './useEventCallback';

// Threshold values for gesture detection
const WHEEL_THRESHOLD_PX = 30;
const TOUCH_THRESHOLD_PX = 50;

// Key mappings for keyboard navigation
const KEYS_DOWN = new Set(['ArrowDown', 'PageDown', ' ']);
const KEYS_UP = new Set(['ArrowUp', 'PageUp']);

function getKeyboardDirection(key: string): ScrollDirection | null {
  if (KEYS_DOWN.has(key)) return 'down';
  if (KEYS_UP.has(key)) return 'up';
  return null;
}

export function useScrollEvents({
  onNavigate,
  shouldDisable,
  disableNonTouchInputs = false,
  isScrolling,
}: UseScrollEventsProps): void {
  const touchStartY = useRef(0);

  const handleWheel = useEventCallback((e: WheelEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    if (Math.abs(e.deltaY) <= WHEEL_THRESHOLD_PX) return;

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
    touchStartY.current = e.touches[0].clientY;
  });

  const handleTouchEnd = useEventCallback((e: TouchEvent) => {
    if (isScrolling.current) return;

    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) <= TOUCH_THRESHOLD_PX) return;

    const direction: ScrollDirection = deltaY > 0 ? 'down' : 'up';
    if (onNavigate(direction)) {
      e.preventDefault();
    }
  });

  useEffect(() => {
    if (shouldDisable) return;

    const passiveOption = { passive: false };

    if (!disableNonTouchInputs) {
      window.addEventListener('wheel', handleWheel, passiveOption);
      window.addEventListener('keydown', handleKeyDown);
    }

    window.addEventListener('touchstart', handleTouchStart, passiveOption);
    window.addEventListener('touchend', handleTouchEnd, passiveOption);

    return () => {
      if (!disableNonTouchInputs) {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
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
