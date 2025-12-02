import { useRef } from 'react';

import { useReducedMotion } from 'motion/react';

import { SCROLL_CONFIG } from '@/config/constants';
import type { ScrollBoundaries, ScrollDirection } from '@/config/types';

import { useMobileBreakpoint } from './useBreakpoints';
import useEventCallback from './useEventCallback';
import { useNavigationActions, useNavigationState } from './useNavigation';
import { useScrollEvents } from './useScrollEvents';

// Gets scroll boundary state for a container element
function getScrollBoundaries(container: HTMLElement | null): ScrollBoundaries {
  if (!container) return { isAtTop: true, isAtBottom: true };

  const { scrollTop, scrollHeight, clientHeight } = container;

  return {
    isAtTop: scrollTop <= 0,
    isAtBottom:
      Math.abs(scrollHeight - clientHeight - scrollTop) <
      SCROLL_CONFIG.TOLERANCE_PX,
  };
}

// Checks if navigation is allowed based on scroll position
function canNavigate(
  boundaries: ScrollBoundaries,
  direction: ScrollDirection
): boolean {
  return direction === 'down' ? boundaries.isAtBottom : boundaries.isAtTop;
}

export function useFullPageScroll(): void {
  const { moveNext, movePrev } = useNavigationActions();
  const { isScrollLocked, isPending } = useNavigationState();
  const isScrolling = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const isTouchPrimaryBreakpoint = useMobileBreakpoint('md');

  // Disable all listeners when reduced motion is preferred or scroll lock is off (e.g. footer)
  const shouldDisable = Boolean(prefersReducedMotion || !isScrollLocked);

  // Wheel/keyboard navigation can be noisy on touch devices; keep gestures active.
  // Only disable non-touch inputs on mobile, never disable touch events
  const disableNonTouchInputs = Boolean(
    shouldDisable || isTouchPrimaryBreakpoint
  );

  // Touch events should work on mobile even when non-touch inputs are disabled
  // Only disable touch when reduced motion is preferred or scroll is unlocked
  const disableTouchInputs = shouldDisable;

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (isScrolling.current || isPending) return false;

    // Direct DOM access is safe and efficient here
    const container = document.getElementById(SCROLL_CONFIG.CONTAINER_ID);
    const boundaries = getScrollBoundaries(container);

    if (!canNavigate(boundaries, direction)) return false;

    // Trigger navigation
    const navigate = direction === 'down' ? moveNext : movePrev;
    isScrolling.current = true;
    navigate();

    // Debounce navigation
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_CONFIG.LOCK_DURATION_MS);

    return true;
  });

  useScrollEvents({
    onNavigate,
    shouldDisable: disableTouchInputs,
    disableNonTouchInputs,
    isScrolling,
  });
}
