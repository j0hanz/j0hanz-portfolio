import { useEffect, useRef } from 'react';

import { useNavigation } from '@/hooks/useNavigation';

// Constants
const SCROLL_LOCK_DURATION = 1000;
const SCROLL_TOLERANCE = 2;
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 50;

const DOWN_KEYS = ['ArrowDown', 'PageDown', ' '] as const;
const UP_KEYS = ['ArrowUp', 'PageUp'] as const;

// Scroll direction type
type ScrollDirection = 'up' | 'down';

// Scroll boundary state
interface ScrollBoundaries {
  isAtTop: boolean;
  isAtBottom: boolean;
}

/**
 * Gets scroll boundary state for a container
 */
function getScrollBoundaries(container: HTMLElement | null): ScrollBoundaries {
  if (!container) {
    return { isAtTop: true, isAtBottom: true };
  }

  const { scrollTop, scrollHeight, clientHeight } = container;
  return {
    isAtTop: scrollTop <= 0,
    isAtBottom:
      Math.abs(scrollHeight - clientHeight - scrollTop) < SCROLL_TOLERANCE,
  };
}

/**
 * Checks if navigation should be allowed based on direction and boundaries
 */
function shouldAllowNavigation(
  direction: ScrollDirection,
  boundaries: ScrollBoundaries
): boolean {
  return direction === 'down' ? boundaries.isAtBottom : boundaries.isAtTop;
}

/**
 * Creates a navigation handler with direction-based logic
 */
function createNavigationHandler(
  isScrolling: React.MutableRefObject<boolean>,
  container: HTMLElement | null,
  moveNext: () => void,
  movePrev: () => void
) {
  const executeNavigation = (navigate: () => void) => {
    isScrolling.current = true;
    navigate();
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_LOCK_DURATION);
  };

  const handleNavigation = (direction: ScrollDirection) => {
    if (isScrolling.current) return false;

    const boundaries = getScrollBoundaries(container);
    if (!shouldAllowNavigation(direction, boundaries)) return false;

    const navigate = direction === 'down' ? moveNext : movePrev;
    executeNavigation(navigate);
    return true;
  };

  return handleNavigation;
}

export function useFullPageScroll(): void {
  const { moveNext, movePrev } = useNavigation();
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = document.getElementById('active-section-container');
    const handleNavigation = createNavigationHandler(
      isScrolling,
      container,
      moveNext,
      movePrev
    );

    /**
     * Handles wheel events for full-page scrolling
     */
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= WHEEL_THRESHOLD) return;

      const direction: ScrollDirection = e.deltaY > 0 ? 'down' : 'up';
      handleNavigation(direction);
    };

    /**
     * Handles keyboard events for full-page scrolling
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      const isDownKey = DOWN_KEYS.includes(e.key as (typeof DOWN_KEYS)[number]);
      const isUpKey = UP_KEYS.includes(e.key as (typeof UP_KEYS)[number]);

      if (!isDownKey && !isUpKey) return;

      const direction: ScrollDirection = isDownKey ? 'down' : 'up';
      const handled = handleNavigation(direction);

      if (handled) {
        e.preventDefault();
      }
    };

    /**
     * Handles touch events for full-page scrolling
     */
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) <= TOUCH_THRESHOLD) return;

      const direction: ScrollDirection = deltaY > 0 ? 'down' : 'up';
      handleNavigation(direction);
    };

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
  }, [moveNext, movePrev]);
}
