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
  /** Section headings - fluid */
  sectionTitle: { xs: '1.75rem', md: '2.125rem' },
  /** Subtitles - fluid */
  subtitle: { xs: '1.2rem', sm: '1.3rem' },
  /** Body text */
  body: { xs: '0.95rem', md: '1rem' },
  /** Small text (captions, labels) */
  small: { xs: '0.75rem', sm: '0.8rem' },
  /** Extra small (badges, chips) */
  xs: { xs: '0.65rem', sm: '0.7rem' },
  /** Fluid hero subtitle using clamp */
  heroSubtitle: 'clamp(1rem, 2.5vw, 1.3rem)',
  /** Fluid section subtitle */
  sectionSubtitle: 'clamp(0.9rem, 1.5vw, 1.1rem)',
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
  /** Minimum touch target (WCAG 2.1 AA: 44x44px) */
  touchTarget: 44,
  /** Avatar sizes */
  avatar: { xs: 32, sm: 40, md: 48 },
  /** Large avatar (profile) */
  avatarLg: { xs: 56, sm: 72, md: 96 },
  /** Icon button sizes - ensures WCAG touch targets */
  iconButton: { xs: 40, sm: 36 },
  /** Large icon button */
  iconButtonLg: { xs: 48, sm: 44 },
  /** Responsive icon scale for common use */
  icon: { xs: '1.25rem', sm: '1.5rem' },
  /** Small icons */
  iconXs: { xs: '1rem', sm: '1.125rem' },
} as const;

// ============================================================================
// RESPONSIVE TYPOGRAPHY ENHANCEMENTS
// Line heights, letter spacing for improved readability
// ============================================================================

export const LINE_HEIGHT = {
  /** Tight - headings */
  tight: { xs: 1.2, md: 1.3 },
  /** Normal - body text */
  normal: { xs: 1.6, md: 1.75 },
  /** Relaxed - improved mobile readability */
  relaxed: { xs: 1.8, md: 2 },
} as const satisfies Record<string, ResponsiveValue<number>>;

export const LETTER_SPACING = {
  /** Tight - large headings */
  tight: { xs: '-0.02em', md: '-0.015em' },
  /** Normal - body text */
  normal: '0',
  /** Wide - small caps, labels */
  wide: { xs: '0.05em', md: '0.08em' },
} as const;

/** Combined typography settings for convenient access */
export const TYPOGRAPHY = {
  lineHeight: LINE_HEIGHT,
  letterSpacing: LETTER_SPACING,
} as const;

// ============================================================================
// DISPLAY UTILITIES
// Visibility and display patterns for responsive layouts
// ============================================================================

export const DISPLAY = {
  /** Hide on mobile (xs), show on sm+ */
  hideOnMobile: { xs: 'none', sm: 'block' },
  /** Show on mobile (xs), hide on sm+ */
  showOnMobile: { xs: 'block', sm: 'none' },
  /** Hide on mobile, flex on desktop */
  hideOnMobileFlex: { xs: 'none', sm: 'flex' },
  /** Flex on mobile, none on desktop */
  showOnMobileFlex: { xs: 'flex', sm: 'none' },
  /** Inline variants */
  hideOnMobileInline: { xs: 'none', sm: 'inline' },
  showOnMobileInline: { xs: 'inline', sm: 'none' },
  /** Print utilities - hide element when printing */
  hidePrint: { '@media print': { display: 'none' } },
  /** Print utilities - show only when printing */
  showPrint: { display: 'none', '@media print': { display: 'block' } },
} as const;

// ============================================================================
// OVERFLOW UTILITIES
// Text and container overflow handling
// ============================================================================

export const OVERFLOW = {
  /** Text ellipsis for single line truncation */
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  /** Multi-line text clamp (use with WebkitLineClamp) */
  lineClamp: (lines: number) => ({
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical' as const,
  }),
  /** Responsive overflow behavior */
  responsive: {
    hidden: { xs: 'hidden', md: 'visible' },
    auto: { xs: 'auto', md: 'hidden' },
  },
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
