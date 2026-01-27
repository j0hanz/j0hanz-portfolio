import { useRef } from 'react';

import { useReducedMotion } from 'motion/react';

import { SCROLL_CONFIG } from '@/config/constants';
import type { ScrollDirection } from '@/config/types';

import { useMobileBreakpoint } from './useBreakpoints';
import { useEventCallback } from './useEventCallback';
import { useNavigationActions, useNavigationState } from './useNavigation';
import { isAtScrollBoundary, useScrollEvents } from './useScrollEvents';

export function useFullPageScroll(): void {
  const { moveNext, movePrev } = useNavigationActions();
  const { isPending, isFirst, isLast } = useNavigationState();
  const isScrollingRef = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileBreakpoint('md');

  // Only fully disable listeners when reduced motion is preferred
  // Keep listeners active on footer so we can navigate back up
  const shouldDisable = Boolean(prefersReducedMotion);

  // Disable wheel/keyboard on mobile (touch still works)
  // Keep wheel/keyboard enabled on desktop even when scroll is unlocked (footer)
  // so we can navigate back when reaching scroll boundaries.
  const disableNonTouchInputs = shouldDisable || isMobile;

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (isScrollingRef.current || isPending) {
      return false;
    }

    // Block navigation at boundaries (can't go before first or after last)
    if ((direction === 'up' && isFirst) || (direction === 'down' && isLast)) {
      return false;
    }

    // Check scroll boundary for unlocked sections (e.g., footer)
    if (!isAtScrollBoundary(direction)) {
      return false;
    }

    isScrollingRef.current = true;
    (direction === 'down' ? moveNext : movePrev)();

    setTimeout(() => {
      isScrollingRef.current = false;
    }, SCROLL_CONFIG.LOCK_DURATION_MS);

    return true;
  });

  useScrollEvents({
    onNavigate,
    shouldDisable,
    disableNonTouchInputs,
    isScrolling: isScrollingRef,
  });
}
