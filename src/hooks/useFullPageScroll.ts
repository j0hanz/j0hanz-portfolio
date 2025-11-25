import { useEffect, useRef } from 'react';

import { useReducedMotion } from 'motion/react';

import type { ScrollBoundaries, ScrollDirection } from '@/config/types';

import useEventCallback from './useEventCallback';
import { useMobileBreakpoint } from './useMotions';
import { useNavigationActions, useNavigationState } from './useNavigation';
import { useScrollEvents } from './useScrollEvents';

const SCROLL_LOCK_DURATION_MS = 1000;
const SCROLL_TOLERANCE_PX = 2;
const SECTION_CONTAINER_ID = 'active-section-container';

// Gets scroll boundary state for a container element
function getScrollBoundaries(container: HTMLElement | null): ScrollBoundaries {
  if (!container) return { isAtTop: true, isAtBottom: true };

  const { scrollTop, scrollHeight, clientHeight } = container;

  return {
    isAtTop: scrollTop <= 0,
    isAtBottom:
      Math.abs(scrollHeight - clientHeight - scrollTop) < SCROLL_TOLERANCE_PX,
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
  const containerRef = useRef<HTMLElement | null>(null);

  const isMobile = useMobileBreakpoint('md');
  const prefersReducedMotion = useReducedMotion();

  // Disable when: reduced motion, mobile view, or scroll not locked (e.g. footer)
  const shouldDisable = Boolean(
    prefersReducedMotion || isMobile || !isScrollLocked
  );

  // Cache container reference
  useEffect(() => {
    containerRef.current = document.getElementById(SECTION_CONTAINER_ID);
    return () => {
      containerRef.current = null;
    };
  }, []);

  const resolveContainer = useEventCallback(() => {
    const cached = containerRef.current;
    if (cached?.isConnected) return cached;

    const node = document.getElementById(SECTION_CONTAINER_ID);
    containerRef.current = node;
    return node;
  });

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (isScrolling.current || isPending) return false;

    const container = resolveContainer();
    const boundaries = getScrollBoundaries(container);

    if (!canNavigate(boundaries, direction)) return false;

    // Trigger navigation
    const navigate = direction === 'down' ? moveNext : movePrev;
    isScrolling.current = true;
    navigate();

    // Debounce navigation
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_LOCK_DURATION_MS);

    return true;
  });

  useScrollEvents({
    onNavigate,
    shouldDisable,
    isScrolling,
  });
}
