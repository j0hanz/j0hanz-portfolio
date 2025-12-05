import { useRef } from 'react';

import { useReducedMotion } from 'motion/react';

import { SCROLL_CONFIG } from '@/config/constants';
import type { ScrollDirection } from '@/config/types';

import { useMobileBreakpoint } from './useBreakpoints';
import useEventCallback from './useEventCallback';
import { useNavigationActions, useNavigationState } from './useNavigation';
import { useScrollEvents } from './useScrollEvents';

// Check if navigation is allowed based on scroll position
function canNavigateFromBoundary(direction: ScrollDirection): boolean {
  const container = document.getElementById(SCROLL_CONFIG.CONTAINER_ID);
  if (!container) return true;

  const { scrollTop, scrollHeight, clientHeight } = container;
  const isAtTop = scrollTop <= 0;
  const isAtBottom =
    Math.abs(scrollHeight - clientHeight - scrollTop) <
    SCROLL_CONFIG.TOLERANCE_PX;

  return direction === 'down' ? isAtBottom : isAtTop;
}

export function useFullPageScroll(): void {
  const { moveNext, movePrev } = useNavigationActions();
  const { isScrollLocked, isPending } = useNavigationState();
  const isScrolling = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileBreakpoint('md');

  // Disable all listeners when reduced motion is preferred or scroll lock is off
  const shouldDisable = Boolean(prefersReducedMotion || !isScrollLocked);

  // Disable wheel/keyboard on mobile, keep touch active
  const disableNonTouchInputs = shouldDisable || isMobile;

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (
      isScrolling.current ||
      isPending ||
      !canNavigateFromBoundary(direction)
    ) {
      return false;
    }

    isScrolling.current = true;
    (direction === 'down' ? moveNext : movePrev)();

    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_CONFIG.LOCK_DURATION_MS);

    return true;
  });

  useScrollEvents({
    onNavigate,
    shouldDisable,
    disableNonTouchInputs,
    isScrolling,
  });
}
