import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  BREAKPOINT_KEYS,
  BREAKPOINT_VALUES,
  resolveResponsiveValue,
} from '@/config/responsive';
import type { BreakpointKey, ResponsiveValue } from '@/config/responsive';

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

// ============================================================================
// CURRENT BREAKPOINT DETECTION
// ============================================================================

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
// BREAKPOINT INDEX HELPERS
// Utility functions for comparing breakpoints
// ============================================================================

/**
 * Returns numeric index (0=xs, 1=sm, 2=md, 3=lg, 4=xl) for breakpoint comparison.
 */
export function getBreakpointIndex(breakpoint: BreakpointKey): number {
  return BREAKPOINT_KEYS.indexOf(breakpoint);
}

/**
 * Returns true if breakpoint a is smaller than breakpoint b.
 */
export function isBreakpointSmaller(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) < getBreakpointIndex(b);
}

/**
 * Returns true if breakpoint a is larger than or equal to breakpoint b.
 */
export function isBreakpointLargerOrEqual(
  a: BreakpointKey,
  b: BreakpointKey
): boolean {
  return getBreakpointIndex(a) >= getBreakpointIndex(b);
}

// Re-export constants for convenience
export { BREAKPOINT_KEYS, BREAKPOINT_VALUES };
