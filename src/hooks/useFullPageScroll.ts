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
  const isScrolling = useRef(false);

  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMobileBreakpoint('md');

  // Disable all listeners when reduced motion is preferred or scroll lock is off
  const shouldDisable = Boolean(prefersReducedMotion || !isScrollLocked);

  // Disable wheel/keyboard on mobile, keep touch active
  const disableNonTouchInputs = shouldDisable || isMobile;

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (isScrolling.current || isPending || !isAtScrollBoundary(direction)) {
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
