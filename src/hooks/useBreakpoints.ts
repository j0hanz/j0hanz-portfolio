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

// Returns true if viewport is below breakpoint (e.g., 'md' = < 900px)
export function useMobileBreakpoint(breakpoint: BreakpointKey = 'md'): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint), { noSsr: true });
}

// Returns true if viewport is at or above breakpoint (e.g., 'md' = >= 900px)
export function useDesktopBreakpoint(
  breakpoint: BreakpointKey = 'md'
): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up(breakpoint), { noSsr: true });
}

// Returns true if viewport is between start (inclusive) and end (exclusive)
export function useBreakpointBetween(
  start: BreakpointKey,
  end: BreakpointKey
): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between(start, end), { noSsr: true });
}

// Returns true if viewport matches exactly one breakpoint range
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

// Returns current active breakpoint ('xs' | 'sm' | 'md' | 'lg' | 'xl')
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

// Alternative using useSyncExternalStore for direct window.innerWidth access
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

// Resolves responsive value { xs: T, md: T } to value for current breakpoint
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

// Returns viewport width, height, and orientation flags (updates on resize)
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

// Returns true if primary input is coarse (touch device)
export function useIsTouchDevice(): boolean {
  return useMediaQuery('(pointer: coarse)', { noSsr: true });
}

// Returns true if user prefers reduced motion (accessibility)
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', { noSsr: true });
}

// Returns true if user prefers dark color scheme
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
}

// Returns true if device supports hover interactions
export function useHasHoverCapability(): boolean {
  return useMediaQuery('(hover: hover)', { noSsr: true });
}

// ============================================================================
// BREAKPOINT INDEX HELPERS
// ============================================================================

// Returns numeric index (0=xs, 1=sm, 2=md, 3=lg, 4=xl) for breakpoint comparison
export function getBreakpointIndex(breakpoint: BreakpointKey): number {
  return BREAKPOINT_KEYS.indexOf(breakpoint);
}

// Returns true if breakpoint a < breakpoint b
export function isBreakpointSmaller(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) < getBreakpointIndex(b);
}

// Returns true if breakpoint a >= breakpoint b
export function isBreakpointLargerOrEqual(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) >= getBreakpointIndex(b);
}
