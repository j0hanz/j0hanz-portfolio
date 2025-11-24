import { useEffect, useRef } from 'react';

import { useEventCallback } from '@/hooks';

// Constants
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 50;

const DOWN_KEYS = ['ArrowDown', 'PageDown', ' '] as const;
const UP_KEYS = ['ArrowUp', 'PageUp'] as const;

type ScrollDirection = 'up' | 'down';

// Determines scroll direction from keyboard event
function getKeyboardDirection(key: string): ScrollDirection | null {
  if (DOWN_KEYS.includes(key as (typeof DOWN_KEYS)[number])) return 'down';
  if (UP_KEYS.includes(key as (typeof UP_KEYS)[number])) return 'up';
  return null;
}

interface UseScrollEventsProps {
  onNavigate: (direction: ScrollDirection) => boolean;
  shouldDisable: boolean;
  isScrolling: React.MutableRefObject<boolean>;
}

export function useScrollEvents({
  onNavigate,
  shouldDisable,
  isScrolling,
}: UseScrollEventsProps): void {
  // Handles wheel events for full-page scrolling
  const handleWheel = useEventCallback((e: WheelEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    if (Math.abs(e.deltaY) <= WHEEL_THRESHOLD) return;

    const direction: ScrollDirection = e.deltaY > 0 ? 'down' : 'up';
    const handled = onNavigate(direction);

    if (handled) {
      e.preventDefault();
    }
  });

  // Handles keyboard events for full-page scrolling
  const handleKeyDown = useEventCallback((e: KeyboardEvent) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const direction = getKeyboardDirection(e.key);
    if (!direction) return;

    const handled = onNavigate(direction);
    if (handled) {
      e.preventDefault();
    }
  });

  // Handles touch events for full-page scrolling
  const touchStartY = useRef(0);

  const handleTouchStart = useEventCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  });

  const handleTouchEnd = useEventCallback((e: TouchEvent) => {
    if (isScrolling.current) return;

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) <= TOUCH_THRESHOLD) return;

    const direction: ScrollDirection = deltaY > 0 ? 'down' : 'up';
    const handled = onNavigate(direction);

    if (handled) {
      e.preventDefault();
    }
  });

  useEffect(() => {
    if (shouldDisable) return;

    // Register event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    shouldDisable,
    handleWheel,
    handleKeyDown,
    handleTouchStart,
    handleTouchEnd,
  ]);
}
