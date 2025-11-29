import { useSyncExternalStore } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { BREAKPOINT_KEYS, resolveResponsiveValue } from '@/config/responsive';
import type { BreakpointKey, ResponsiveValue } from '@/config/responsive';

// ============================================================================
// INTERNAL UTILITIES
// ============================================================================

// Note: MUI's useMediaQuery handles caching internally
// Additional caching utilities removed to avoid unused code

// ============================================================================
// BREAKPOINT DETECTION HOOKS
// ============================================================================

/**
 * Detects if viewport is below the specified breakpoint (exclusive).
 * Uses MUI's useMediaQuery with theme breakpoints.
 *
 * This is the primary hook for mobile/responsive detection.
 * Performance optimized with noSsr to avoid double render on client.
 *
 * @param breakpoint - The breakpoint to check against (default: 'md')
 * @returns `true` if viewport is below the breakpoint
 *
 * @example
 * const isMobile = useMobileBreakpoint('md');      // < 900px
 * const isTablet = useMobileBreakpoint('lg');      // < 1200px
 * const isSmallScreen = useMobileBreakpoint('sm'); // < 600px
 */
export function useMobileBreakpoint(breakpoint: BreakpointKey = 'md'): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint), { noSsr: true });
}

/**
 * Detects if viewport is at or above the specified breakpoint (inclusive).
 * Inverse of useMobileBreakpoint.
 *
 * @param breakpoint - The breakpoint to check against (default: 'md')
 * @returns `true` if viewport is at or above the breakpoint
 *
 * @example
 * const isDesktop = useDesktopBreakpoint('md');  // >= 900px
 * const isLarge = useDesktopBreakpoint('lg');    // >= 1200px
 */
export function useDesktopBreakpoint(
  breakpoint: BreakpointKey = 'md'
): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint), { noSsr: true });
}

/**
 * Checks if viewport matches a specific breakpoint range (inclusive start, exclusive end).
 *
 * @param start - The starting breakpoint (inclusive)
 * @param end - The ending breakpoint (exclusive)
 * @returns `true` if viewport is within the range
 *
 * @example
 * const isTabletOnly = useBreakpointBetween('sm', 'md'); // 600px - 899px
 * const isMidSize = useBreakpointBetween('md', 'lg');    // 900px - 1199px
 */
export function useBreakpointBetween(
  start: BreakpointKey,
  end: BreakpointKey
): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between(start, end), { noSsr: true });
}

/**
 * Checks if viewport matches exactly one breakpoint range.
 *
 * @param breakpoint - The exact breakpoint to match
 * @returns `true` if viewport matches only this breakpoint
 *
 * @example
 * const isExactlyMd = useBreakpointOnly('md'); // 900px - 1199px only
 */
export function useBreakpointOnly(breakpoint: BreakpointKey): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.only(breakpoint), { noSsr: true });
}

// ============================================================================
// CURRENT BREAKPOINT DETECTION
// ============================================================================

// Breakpoint thresholds from MUI defaults (in descending order for matching)
const BREAKPOINT_THRESHOLDS: readonly {
  key: BreakpointKey;
  minWidth: number;
}[] = [
  { key: 'xl', minWidth: 1536 },
  { key: 'lg', minWidth: 1200 },
  { key: 'md', minWidth: 900 },
  { key: 'sm', minWidth: 600 },
  { key: 'xs', minWidth: 0 },
] as const;

// Efficient breakpoint detection from viewport width
function getCurrentBreakpointFromWidth(width: number): BreakpointKey {
  for (const { key, minWidth } of BREAKPOINT_THRESHOLDS) {
    if (width >= minWidth) return key;
  }
  return 'xs';
}

/**
 * Returns the current active breakpoint name.
 * Uses an optimized approach with useSyncExternalStore for better performance.
 *
 * @returns The current breakpoint key ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 *
 * @example
 * const breakpoint = useCurrentBreakpoint();
 * switch (breakpoint) {
 *   case 'xs': return <MobileLayout />;
 *   case 'sm':
 *   case 'md': return <TabletLayout />;
 *   default: return <DesktopLayout />;
 * }
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
 * Alternative implementation using useSyncExternalStore for cases where
 * useMediaQuery is not available or when you need direct window.innerWidth access.
 *
 * @returns The current breakpoint key based on window.innerWidth
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
 * Returns the responsive value mapped to the current breakpoint.
 * Automatically resolves responsive objects to their appropriate value.
 *
 * @param value - A responsive value object or scalar value
 * @param fallback - Optional fallback if no value matches
 * @returns The resolved value for the current breakpoint
 *
 * @example
 * // Returns 'stack' on mobile, 'grid' on tablet+
 * const layout = useResponsiveValue({ xs: 'stack', md: 'grid' }, 'grid');
 *
 * // Returns different padding based on breakpoint
 * const padding = useResponsiveValue({ xs: 2, sm: 3, md: 4 });
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

/**
 * Returns current viewport dimensions with orientation detection.
 * Updates on window resize.
 *
 * @returns Viewport width, height, and orientation flags
 *
 * @example
 * const { width, height, isPortrait } = useViewportDimensions();
 */
export function useViewportDimensions(): ViewportDimensions {
  const subscribe = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  const getSnapshot = (): ViewportDimensions => {
    if (typeof window === 'undefined') return DEFAULT_VIEWPORT;

    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
      isPortrait: height > width,
      isLandscape: width >= height,
    };
  };

  const getServerSnapshot = () => DEFAULT_VIEWPORT;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ============================================================================
// UTILITY HOOKS
// ============================================================================

/**
 * Returns true if the device is likely a touch device.
 * Uses media query for pointer detection.
 *
 * @returns `true` if primary input is coarse (touch)
 */
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(pointer: coarse)', { noSsr: true });
}

/**
 * Returns true if user prefers reduced motion.
 * Useful for disabling animations for accessibility.
 *
 * @returns `true` if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
}

/**
 * Returns true if user prefers dark color scheme.
 * Useful for detecting system theme preference.
 *
 * @returns `true` if user prefers dark mode
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
}

/**
 * Returns true if device has hover capability.
 * Useful for showing hover-only UI elements.
 *
 * @returns `true` if device supports hover
 */
export function useHasHoverCapability(): boolean {
  return useMediaQuery('(hover: hover)', { noSsr: true });
}

// ============================================================================
// BREAKPOINT INDEX HELPERS
// ============================================================================

/**
 * Returns the numeric index of a breakpoint key.
 * Useful for comparing breakpoints.
 *
 * @param breakpoint - The breakpoint key
 * @returns The index (0=xs, 1=sm, 2=md, 3=lg, 4=xl)
 */
export function getBreakpointIndex(breakpoint: BreakpointKey): number {
  return BREAKPOINT_KEYS.indexOf(breakpoint);
}

/**
 * Compares two breakpoints and returns if first is smaller.
 *
 * @param a - First breakpoint
 * @param b - Second breakpoint
 * @returns `true` if a < b
 */
export function isBreakpointSmaller(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) < getBreakpointIndex(b);
}

/**
 * Compares two breakpoints and returns if first is larger or equal.
 *
 * @param a - First breakpoint
 * @param b - Second breakpoint
 * @returns `true` if a >= b
 */
export function isBreakpointLargerOrEqual(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) >= getBreakpointIndex(b);
}
