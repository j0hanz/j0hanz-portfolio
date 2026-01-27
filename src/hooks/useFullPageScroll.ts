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
  const { isScrollLocked, isPending } = useNavigationState();
  const isScrollingRef = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileBreakpoint('md');

  // Disable all listeners when reduced motion is preferred or scroll lock is off
  const shouldDisable = Boolean(prefersReducedMotion || !isScrollLocked);

  // Disable wheel/keyboard on mobile, keep touch active
  const disableNonTouchInputs = shouldDisable || isMobile;

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (isScrollingRef.current || isPending || !isAtScrollBoundary(direction)) {
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
