import { useEffect, useEffectEvent, useRef } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { useReducedMotion } from 'motion/react';

import {
  useNavigationActions,
  useNavigationState,
} from '@/hooks/useNavigation';

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

// Gets scroll boundary state (isAtTop, isAtBottom) for a container
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

export function useFullPageScroll(): void {
  const { moveNext, movePrev } = useNavigationActions();
  const { isScrollLocked, isPending } = useNavigationState();
  const isScrolling = useRef(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const prefersReducedMotion = useReducedMotion();

  // Skip if reduced motion, mobile, or scroll not locked (e.g. footer)
  const shouldDisable = prefersReducedMotion || isMobile || !isScrollLocked;

  const onNavigate = useEffectEvent((direction: ScrollDirection) => {
    if (isScrolling.current || isPending) return false;

    // Re-query container each time
    const container = document.getElementById('active-section-container');
    const boundaries = getScrollBoundaries(container);

    // Check if we should allow navigation based on scroll position
    const shouldNavigate =
      direction === 'down' ? boundaries.isAtBottom : boundaries.isAtTop;
    if (!shouldNavigate) return false;

    const navigate = direction === 'down' ? moveNext : movePrev;

    isScrolling.current = true;
    navigate();
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_LOCK_DURATION);

    return true;
  });

  useEffect(() => {
    if (shouldDisable) return;

    // Handles wheel events for full-page scrolling
    const handleWheel = (e: WheelEvent) => {
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
    };

    // Handles keyboard events for full-page scrolling
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      const isDownKey = DOWN_KEYS.includes(e.key as (typeof DOWN_KEYS)[number]);
      const isUpKey = UP_KEYS.includes(e.key as (typeof UP_KEYS)[number]);

      if (!isDownKey && !isUpKey) return;

      const direction: ScrollDirection = isDownKey ? 'down' : 'up';
      const handled = onNavigate(direction);

      if (handled) {
        e.preventDefault();
      }
    };

    // Handles touch events for full-page scrolling
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) <= TOUCH_THRESHOLD) return;

      const direction: ScrollDirection = deltaY > 0 ? 'down' : 'up';
      const handled = onNavigate(direction);

      if (handled) {
        e.preventDefault();
      }
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
  }, [shouldDisable]);
}
