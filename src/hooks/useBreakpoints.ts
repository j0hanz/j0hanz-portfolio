import { useEffect, useRef, useSyncExternalStore } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  BREAKPOINT_KEYS,
  BREAKPOINT_VALUES,
  resolveResponsiveValue,
} from '@/config/responsive';
import type { BreakpointKey, ResponsiveValue } from '@/config/responsive';

import { usePrevious } from './usePrevious';

// ============================================================================
// INTERNAL UTILITIES
// ============================================================================

// Note: MUI's useMediaQuery handles caching internally
// Additional caching utilities removed to avoid unused code

// ============================================================================
// BREAKPOINT DETECTION HOOKS
// ============================================================================

/**
 * Returns true if viewport is below the specified breakpoint.
 * Uses MUI's breakpoints.down() which is exclusive of the breakpoint.
 *
 * @param breakpoint - Upper bound breakpoint (exclusive)
 * @returns true if viewport width < breakpoint
 *
 * @example
 * const isMobile = useMobileBreakpoint('md'); // true if < 900px
 */
export function useMobileBreakpoint(breakpoint: BreakpointKey = 'md'): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint), { noSsr: true });
}

/**
 * Returns true if viewport is at or above the specified breakpoint.
 * Uses MUI's breakpoints.up() which is inclusive of the breakpoint.
 *
 * @param breakpoint - Lower bound breakpoint (inclusive)
 * @returns true if viewport width >= breakpoint
 *
 * @example
 * const isDesktop = useDesktopBreakpoint('md'); // true if >= 900px
 */
export function useDesktopBreakpoint(
  breakpoint: BreakpointKey = 'md'
): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint), { noSsr: true });
}

/**
 * Returns true if viewport is between start (inclusive) and end (exclusive).
 *
 * @param start - Start breakpoint (inclusive)
 * @param end - End breakpoint (exclusive)
 * @returns true if start <= viewport width < end
 *
 * @example
 * const isTablet = useBreakpointBetween('sm', 'lg'); // true if 600px <= width < 1200px
 */
export function useBreakpointBetween(
  start: BreakpointKey,
  end: BreakpointKey
): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between(start, end), { noSsr: true });
}

/**
 * Returns true if viewport matches exactly one breakpoint range.
 *
 * @param breakpoint - The breakpoint to match
 * @returns true if viewport is within the breakpoint's range only
 *
 * @example
 * const isMdOnly = useBreakpointOnly('md'); // true if 900px <= width < 1200px
 */
export function useBreakpointOnly(breakpoint: BreakpointKey): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.only(breakpoint), { noSsr: true });
}

// ============================================================================
// CURRENT BREAKPOINT DETECTION
// ============================================================================

// Breakpoint thresholds from BREAKPOINT_VALUES (in descending order for matching)
const BREAKPOINT_THRESHOLDS: readonly {
  key: BreakpointKey;
  minWidth: number;
}[] = [
  { key: 'xl', minWidth: BREAKPOINT_VALUES.xl },
  { key: 'lg', minWidth: BREAKPOINT_VALUES.lg },
  { key: 'md', minWidth: BREAKPOINT_VALUES.md },
  { key: 'sm', minWidth: BREAKPOINT_VALUES.sm },
  { key: 'xs', minWidth: BREAKPOINT_VALUES.xs },
] as const;

// Efficient breakpoint detection from viewport width
function getCurrentBreakpointFromWidth(width: number): BreakpointKey {
  for (const { key, minWidth } of BREAKPOINT_THRESHOLDS) {
    if (width >= minWidth) return key;
  }
  return 'xs';
}

/**
 * Returns the current active breakpoint based on viewport width.
 * Uses multiple useMediaQuery calls for React concurrent-safe detection.
 *
 * @returns Current breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *
 * @example
 * const breakpoint = useCurrentBreakpoint();
 * if (breakpoint === 'xs' || breakpoint === 'sm') { ... }
 */
export function useCurrentBreakpoint(): BreakpointKey {
  const theme = useTheme();

  // Call hooks unconditionally at top level (Rules of Hooks)
  const isXl = useMediaQuery(theme.breakpoints.up('xl'), { noSsr: true });
  const isLg = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true });
  const isMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true });
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });

  // Determine current breakpoint (largest matching breakpoint wins)
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}

/**
 * Alternative breakpoint detection using useSyncExternalStore.
 * Provides direct window.innerWidth access with proper SSR handling.
 * Slightly more efficient than multiple useMediaQuery calls.
 *
 * @returns Current breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *
 * @example
 * const breakpoint = useCurrentBreakpointSync();
 */
export function useCurrentBreakpointSync(): BreakpointKey {
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  const getSnapshot = () => {
    if (typeof window === 'undefined') return 'xs';
    return getCurrentBreakpointFromWidth(window.innerWidth);
  };

  const getServerSnapshot = () => 'md' as BreakpointKey; // SSR default

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ============================================================================
// RESPONSIVE VALUE RESOLUTION
// ============================================================================

/**
 * Resolves a responsive value object to the appropriate value for the current breakpoint.
 * Uses mobile-first cascade: tries exact match, then smaller breakpoints, then larger.
 *
 * @param value - ResponsiveValue object or scalar value
 * @param fallback - Default value if no match found
 * @returns Resolved value for current breakpoint
 *
 * @example
 * // Returns 4 on lg+ (cascades from md), 2 on xs/sm
 * const padding = useResponsiveValue({ xs: 2, md: 4 });
 *
 * @example
 * // Conditional layout based on breakpoint
 * const layout = useResponsiveValue({ xs: 'stack', md: 'grid' }, 'grid');
 */
export function useResponsiveValue<T>(
  value: ResponsiveValue<T> | T,
  fallback?: T
): T {
  const breakpoint = useCurrentBreakpoint();
  return resolveResponsiveValue(value, breakpoint, fallback);
}

// ============================================================================
// VIEWPORT DIMENSIONS
// ============================================================================

interface ViewportDimensions {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
}

const DEFAULT_VIEWPORT: ViewportDimensions = {
  width: 1024, // SSR default
  height: 768,
  isPortrait: false,
  isLandscape: true,
};

// Cache for viewport dimensions to prevent object identity changes
let cachedViewport: ViewportDimensions = DEFAULT_VIEWPORT;
let cachedKey = '';

function getViewportSnapshot(): ViewportDimensions {
  if (typeof window === 'undefined') return DEFAULT_VIEWPORT;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const key = `${width}-${height}`;

  // Return cached object if dimensions unchanged (preserves referential equality)
  if (key === cachedKey) return cachedViewport;

  cachedKey = key;
  cachedViewport = {
    width,
    height,
    isPortrait: height > width,
    isLandscape: width >= height,
  };

  return cachedViewport;
}

/**
 * Returns viewport dimensions with orientation flags.
 * Uses ResizeObserver on documentElement for efficient resize handling.
 * Falls back to window resize events if ResizeObserver is unavailable.
 *
 * @returns ViewportDimensions object with width, height, and orientation
 *
 * @example
 * const { width, height, isPortrait } = useViewportDimensions();
 */
export function useViewportDimensions(): ViewportDimensions {
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};

    // Prefer ResizeObserver for better performance (fires less often than resize)
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(callback);
      observer.observe(document.documentElement);
      return () => observer.disconnect();
    }

    // Fallback for older browsers
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  return useSyncExternalStore(
    subscribe,
    getViewportSnapshot,
    () => DEFAULT_VIEWPORT
  );
}

// ============================================================================
// UTILITY HOOKS
// Device capability and user preference detection
// ============================================================================

/**
 * Returns true if primary input is coarse (touch device).
 * Useful for showing/hiding touch-specific UI elements.
 */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(pointer: coarse)', { noSsr: true });
}

/**
 * Returns true if user prefers reduced motion (accessibility).
 * Use to disable animations for users who have enabled this setting.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
}

/**
 * Returns true if user prefers dark color scheme.
 * Theme provider handles this automatically, but useful for edge cases.
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
}

/**
 * Returns true if device supports hover interactions.
 * False on touch-only devices.
 */
export function useHasHoverCapability(): boolean {
  return useMediaQuery('(hover: hover)', { noSsr: true });
}

// ============================================================================
// BREAKPOINT INDEX HELPERS
// Utility functions for comparing breakpoints
// ============================================================================

/**
 * Returns numeric index (0=xs, 1=sm, 2=md, 3=lg, 4=xl) for breakpoint comparison.
 *
 * @param breakpoint - Breakpoint key to get index for
 * @returns Numeric index (0-4)
 */
export function getBreakpointIndex(breakpoint: BreakpointKey): number {
  return BREAKPOINT_KEYS.indexOf(breakpoint);
}

/**
 * Returns true if breakpoint a is smaller than breakpoint b.
 *
 * @example
 * isBreakpointSmaller('sm', 'lg') // true
 * isBreakpointSmaller('lg', 'sm') // false
 */
export function isBreakpointSmaller(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) < getBreakpointIndex(b);
}

/**
 * Returns true if breakpoint a is larger than or equal to breakpoint b.
 *
 * @example
 * isBreakpointLargerOrEqual('lg', 'md') // true
 * isBreakpointLargerOrEqual('sm', 'lg') // false
 */
export function isBreakpointLargerOrEqual(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) >= getBreakpointIndex(b);
}

// ============================================================================
// RESIZE OBSERVER UTILITIES
// More efficient than window resize events for element-level observation
// ============================================================================

interface ElementSize {
  width: number;
  height: number;
}

const DEFAULT_SIZE: ElementSize = { width: 0, height: 0 };

/**
 * Observes an element's size using ResizeObserver.
 * More efficient than window resize events for container-level responsiveness.
 *
 * @param ref - RefObject pointing to the element to observe
 * @returns Current element size { width, height }
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { width } = useElementSize(containerRef);
 * const isWide = width >= 600;
 */
export function useElementSize(
  ref: React.RefObject<Element | null>
): ElementSize {
  const sizeRef = useRef<ElementSize>(DEFAULT_SIZE);

  const subscribe = (callback: () => void) => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === 'undefined') {
      return () => {};
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        // Only update if size actually changed
        if (
          sizeRef.current.width !== width ||
          sizeRef.current.height !== height
        ) {
          sizeRef.current = { width, height };
          callback();
        }
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  };

  const getSnapshot = () => sizeRef.current;
  const getServerSnapshot = () => DEFAULT_SIZE;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Container query-like hook using ResizeObserver.
 * Checks if an element's width matches a breakpoint threshold.
 *
 * @param ref - RefObject pointing to the container element
 * @param breakpoint - Breakpoint to compare against
 * @param direction - 'up' (>=) or 'down' (<)
 * @returns true if element matches the breakpoint condition
 *
 * @example
 * const cardRef = useRef<HTMLDivElement>(null);
 * const isWideCard = useElementQuery(cardRef, 'sm', 'up'); // true if card >= 600px
 */
export function useElementQuery(
  ref: React.RefObject<Element | null>,
  breakpoint: BreakpointKey,
  direction: 'up' | 'down' = 'up'
): boolean {
  const { width } = useElementSize(ref);
  const threshold = BREAKPOINT_VALUES[breakpoint];

  return direction === 'up' ? width >= threshold : width < threshold;
}

// ============================================================================
// BREAKPOINT CALLBACK HOOK
// Fires callback when breakpoint changes
// ============================================================================

/**
 * Calls a callback function when the current breakpoint changes.
 * Useful for imperative actions that need to run on breakpoint transitions.
 *
 * @param callback - Function to call with (current, previous) breakpoints
 *
 * @example
 * useBreakpointCallback((current, previous) => {
 *   if (previous === 'sm' && current === 'md') {
 *     console.log('Entered desktop view');
 *   }
 * });
 */
export function useBreakpointCallback(
  callback: (
    current: BreakpointKey,
    previous: BreakpointKey | undefined
  ) => void
): void {
  const currentBreakpoint = useCurrentBreakpoint();
  const previousBreakpoint = usePrevious(currentBreakpoint);

  useEffect(() => {
    // Only fire when breakpoint actually changes (not on mount)
    if (
      previousBreakpoint !== undefined &&
      currentBreakpoint !== previousBreakpoint
    ) {
      callback(currentBreakpoint, previousBreakpoint);
    }
  }, [currentBreakpoint, previousBreakpoint, callback]);
}

/**
 * Returns true when transitioning between mobile and desktop breakpoints.
 * Useful for triggering layout recalculations or animations.
 *
 * @param threshold - Breakpoint that separates mobile from desktop (default: 'md')
 * @returns Object with isMobile, isDesktop, and didTransition flags
 *
 * @example
 * const { isMobile, didTransition } = useMobileDesktopTransition();
 * if (didTransition) resetLayout();
 */
export function useMobileDesktopTransition(threshold: BreakpointKey = 'md'): {
  isMobile: boolean;
  isDesktop: boolean;
  didTransition: boolean;
} {
  const currentBreakpoint = useCurrentBreakpoint();
  const previousBreakpoint = usePrevious(currentBreakpoint);

  const thresholdIndex = getBreakpointIndex(threshold);
  const currentIndex = getBreakpointIndex(currentBreakpoint);
  const previousIndex = previousBreakpoint
    ? getBreakpointIndex(previousBreakpoint)
    : currentIndex;

  const isMobile = currentIndex < thresholdIndex;
  const isDesktop = !isMobile;
  const wasMobile = previousIndex < thresholdIndex;
  const didTransition =
    previousBreakpoint !== undefined && isMobile !== wasMobile;

  return { isMobile, isDesktop, didTransition };
}
