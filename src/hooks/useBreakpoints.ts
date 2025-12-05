import type { Breakpoint } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
export function useMobileBreakpoint(breakpoint: Breakpoint = 'md'): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint), { noSsr: true });
}
