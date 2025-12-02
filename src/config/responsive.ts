import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

// ============================================================================
// BREAKPOINT REFERENCE (MUI v7 defaults)
// xs: 0px   - Extra small devices (phones, < 600px)
// sm: 600px - Small devices (tablets, >= 600px)
// md: 900px - Medium devices (small laptops, >= 900px)
// lg: 1200px - Large devices (desktops, >= 1200px)
// xl: 1536px - Extra large devices (large desktops, >= 1536px)
//
// Mobile-first approach: styles cascade upward from xs to xl
// Example: { xs: 1, md: 2 } means 1 for xs/sm, 2 for md/lg/xl
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export type BreakpointKey = Breakpoint;

/** Responsive value object - values cascade upward (mobile-first) */
export type ResponsiveValue<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

export const BREAKPOINT_KEYS: readonly BreakpointKey[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const;

/** Breakpoint pixel values matching MUI v7 defaults */
export const BREAKPOINT_VALUES = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const satisfies Record<BreakpointKey, number>;

// ============================================================================
// SPACING (unified - replaces RESPONSIVE_SPACING + RESPONSIVE_GAP)
// Uses theme.spacing() factor (8px base). Material Design: 16px mobile, 24px desktop
// ============================================================================

export const SPACING = {
  /** Section vertical padding: py */
  section: { xs: 4, md: 10 },
  /** Card/container internal padding */
  card: { xs: 2, sm: 3, md: 3 },
  /** Grid gaps between items */
  grid: { xs: 2, sm: 3, md: 4 },
  /** Masonry spacing (sm+ only) */
  masonry: { sm: 3, md: 4 },
  /** Stack gaps */
  stack: { xs: 1.5, md: 2 },
  /** Section header margin bottom */
  headerMargin: { xs: 3, md: 4 },
  /** Container horizontal padding */
  containerPadding: { xs: 2, sm: 3 },
  /** Form field gaps */
  formField: { xs: 1.25, md: 2 },
} as const satisfies Record<string, ResponsiveValue<number>>;

// ============================================================================
// GRID COLUMNS (MUI v7 Grid `size` prop patterns)
// ============================================================================

export const GRID = {
  /** Full width always */
  full: { xs: 12 },
  /** Full mobile, half desktop */
  half: { xs: 12, md: 6 },
  /** Full mobile, third desktop */
  third: { xs: 12, sm: 6, lg: 4 },
  /** Project card layout (responsive 3-column) */
  projectCard: { xs: 12, sm: 6, md: 6, lg: 4 },
  /** Form field layout */
  formField: { xs: 12, md: 6 },
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

export const CONTAINER_WIDTH = {
  narrow: 'sm',
  medium: 'md',
  wide: 'lg',
  full: 'xl',
  fluid: false,
} as const satisfies Record<string, Breakpoint | false>;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const FONT_SIZE = {
  /** Hero name - fluid scaling */
  heroTitle: 'clamp(2.5rem, 5vw, 3.2rem)',
  /** Section headings */
  sectionTitle: { xs: '1.75rem', md: '2.125rem' },
  /** Subtitles */
  subtitle: { xs: '1.2rem', sm: '1.3rem' },
  /** Body text */
  body: { xs: '0.95rem', md: '1rem' },
} as const;

// ============================================================================
// ELEMENT SIZES
// ============================================================================

export const SIZE = {
  /** Profile image dimensions */
  profileImage: { xs: 225, md: 300, lg: 400 },
  /** Section header icons */
  iconMd: { xs: '2rem', md: '2.5rem' },
  /** Skill badge icons */
  iconSm: { xs: '1.5rem', md: '1.75rem' },
  /** Credential badges */
  badge: { xs: '85px', sm: '105px', md: '115px', lg: '140px' },
  /** Credential hover text */
  credentialText: { xs: '1.7rem', sm: '2.5rem' },
} as const;

// ============================================================================
// SECTION SX PRESETS (commonly used patterns)
// ============================================================================

/** Centers content vertically with responsive section padding */
export const sectionCenteredSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  py: SPACING.section,
};

/** Responsive container horizontal padding */
export const containerPaddingSx: SxProps<Theme> = {
  px: SPACING.containerPadding,
};

/** Section header margin bottom */
export const sectionHeaderSx: SxProps<Theme> = {
  mb: SPACING.headerMargin,
};

// ============================================================================
// UTILITY: Resolve responsive value for current breakpoint
// ============================================================================

/**
 * Resolves a responsive value to the appropriate value for a breakpoint.
 * Uses mobile-first cascade: tries exact match, then smaller breakpoints.
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | T,
  breakpoint: BreakpointKey,
  fallback?: T
): T {
  // Handle scalar values
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return (value ?? fallback) as T;
  }

  const map = value as ResponsiveValue<T>;
  const currentIndex = BREAKPOINT_KEYS.indexOf(breakpoint);

  // Mobile-first: check current and smaller breakpoints first
  for (let i = currentIndex; i >= 0; i -= 1) {
    const candidate = map[BREAKPOINT_KEYS[i]];
    if (candidate !== undefined) return candidate;
  }

  // Fallback to larger breakpoints
  for (let i = currentIndex + 1; i < BREAKPOINT_KEYS.length; i += 1) {
    const candidate = map[BREAKPOINT_KEYS[i]];
    if (candidate !== undefined) return candidate;
  }

  return fallback as T;
}

// ============================================================================
// LEGACY EXPORTS (backwards compatibility - to be removed)
// These map old names to new consolidated constants
// ============================================================================

/** @deprecated Use SPACING instead */
export const RESPONSIVE_SPACING = SPACING;

/** @deprecated Use FONT_SIZE instead */
export const RESPONSIVE_FONT_SIZE = FONT_SIZE;

/** @deprecated Use SIZE instead */
export const RESPONSIVE_SIZE = SIZE;

/** @deprecated Use CONTAINER_WIDTH instead */
export const CONTAINER_MAX_WIDTH = CONTAINER_WIDTH;

/** @deprecated Use GRID instead - component-specific patterns should be inline */
export const GRID_COLUMNS = {
  ...GRID,
  // Component-specific patterns (kept for compatibility, should migrate to inline)
  twoColumn: GRID.half,
  threeColumn: GRID.third,
  projectCard: { xs: 12, sm: 6, md: 6, lg: 4 },
  heroImage: { xs: 12, md: 'auto' as const },
  heroContent: { xs: 12, md: 'grow' as const },
  footerLeft: { xs: 12, sm: 6 },
  footerRight: { xs: 12, sm: 6 },
  formFieldFull: { xs: 12 },
  auto: { xs: 'auto' as const },
} as const;

/** @deprecated Inline { sm: 2, md: 2, lg: 3 } at callsite */
export const MASONRY_COLUMNS = {
  projects: { sm: 2, md: 2, lg: 3 },
} as const;

/** @deprecated Inline { xs: 1.5, sm: 2, md: 2.5 } at callsite */
export const RESPONSIVE_CARD_PADDING = {
  projectCard: { xs: 1.5, sm: 2, md: 2.5 },
} as const;

/** @deprecated Inline { xs: 1.5, sm: 2, md: 3 } at callsite */
export const RESPONSIVE_GAP = {
  badge: { xs: 1.5, sm: 2, md: 3 },
} as const;

/** @deprecated Inline sx={{ display: 'flex' }} at callsite */
export const gridItemFlexSx: SxProps<Theme> = {
  display: 'flex',
};

/** @deprecated Inline sx={{ display: { xs: 'none', sm: 'inline' } }} at callsite */
export const hideOnMobileInlineSx: SxProps<Theme> = {
  display: { xs: 'none', sm: 'inline' },
};
