import { useEffect, useRef } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { useReducedMotion } from 'motion/react';

import { useEventCallback } from '@/hooks';
import {
  useNavigationActions,
  useNavigationState,
} from '@/hooks/useNavigation';
import { useScrollEvents } from '@/hooks/useScrollEvents';

// Constants
const SCROLL_LOCK_DURATION = 1000;
const SCROLL_TOLERANCE = 2;

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

// Checks if navigation should proceed based on scroll position and direction
function shouldAllowNavigation(
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const prefersReducedMotion = useReducedMotion();

  // Skip if reduced motion, mobile, or scroll not locked (e.g. footer)
  const shouldDisable = prefersReducedMotion || isMobile || !isScrollLocked;

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    containerRef.current = document.getElementById('active-section-container');

    return () => {
      containerRef.current = null;
    };
  }, []);

  const resolveContainer = useEventCallback(() => {
    if (typeof document === 'undefined') {
      return null;
    }

    const cached = containerRef.current;
    if (cached && cached.isConnected) {
      return cached;
    }

    const node = document.getElementById('active-section-container');
    containerRef.current = node;
    return node;
  });

  const onNavigate = useEventCallback((direction: ScrollDirection) => {
    if (isScrolling.current || isPending) return false;

    const container = resolveContainer();
    const boundaries = getScrollBoundaries(container);

    if (!shouldAllowNavigation(boundaries, direction)) return false;

    const navigate = direction === 'down' ? moveNext : movePrev;

    isScrolling.current = true;
    navigate();
    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_LOCK_DURATION);

    return true;
  });

  useScrollEvents({
    onNavigate,
    shouldDisable: !!shouldDisable,
    isScrolling,
  });
}
