import type { CSSProperties } from 'react';

import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';

// ============================================================================
// BREAKPOINT REFERENCE (MUI v7 defaults)
// xs: 0px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px
// ============================================================================

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type BreakpointKey = Breakpoint;

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

type DisplayValue = CSSProperties['display'];

// Resolves a responsive value using the current breakpoint with safe fallbacks
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | T,
  breakpoint: BreakpointKey,
  fallback?: T
): T {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return (value ?? fallback) as T;
  }

  const map = value as ResponsiveValue<T>;
  const currentIndex = BREAKPOINT_KEYS.indexOf(breakpoint);

  // Prefer exact or smaller breakpoint match first
  for (let i = currentIndex; i >= 0; i -= 1) {
    const candidate = map[BREAKPOINT_KEYS[i]];
    if (candidate !== undefined) return candidate;
  }

  // Fallback to larger breakpoints if nothing smaller exists
  for (let i = currentIndex + 1; i < BREAKPOINT_KEYS.length; i += 1) {
    const candidate = map[BREAKPOINT_KEYS[i]];
    if (candidate !== undefined) return candidate;
  }

  const firstDefined = BREAKPOINT_KEYS.map((key) => map[key]).find(
    (item) => item !== undefined
  );

  if (firstDefined !== undefined) return firstDefined;
  return fallback as T;
}

// Utility to build display toggles for common visibility helpers
export function createDisplayToggle({
  mobile = 'none',
  desktop = 'block',
  breakpoint = 'sm',
}: {
  mobile?: DisplayValue;
  desktop?: DisplayValue;
  breakpoint?: BreakpointKey;
}): SxProps<Theme> {
  return {
    display: {
      xs: mobile,
      [breakpoint]: desktop,
    },
  };
}

// ============================================================================
// RESPONSIVE SPACING SCALE
// Consistent spacing that adapts across breakpoints
// Uses theme.spacing() factor (8px by default)
// ============================================================================

export const RESPONSIVE_SPACING = {
  // Section padding (py for vertical sections)
  section: { xs: 4, md: 10 } satisfies ResponsiveValue<number>,
  // Card/container internal padding
  card: { xs: 2, sm: 3, md: 3 } satisfies ResponsiveValue<number>,
  // Grid gaps between items
  grid: { xs: 2, sm: 3, md: 4 } satisfies ResponsiveValue<number>,
  // Masonry spacing (excludes xs since masonry usually used on sm+)
  masonry: { sm: 3, md: 4 } satisfies ResponsiveValue<number>,
  // Stack gaps for vertical/horizontal lists
  stack: { xs: 1.5, md: 2 } satisfies ResponsiveValue<number>,
  // Compact spacing for dense layouts
  compact: { xs: 1, sm: 1.5, md: 2 } satisfies ResponsiveValue<number>,
  // Section header margin bottom
  headerMargin: { xs: 3, md: 4 } satisfies ResponsiveValue<number>,
  // Container horizontal padding
  containerPadding: { xs: 2, sm: 3 } satisfies ResponsiveValue<number>,
} as const;

// ============================================================================
// RESPONSIVE CONTAINER WIDTHS
// Max-width constraints for different section types
// ============================================================================

export const CONTAINER_MAX_WIDTH = {
  narrow: 'sm', // ~600px - single column content
  medium: 'md', // ~900px - forms, small cards
  wide: 'lg', // ~1200px - standard sections (default)
  full: 'xl', // ~1536px - portfolio grids
  fluid: false, // Full width
} as const satisfies Record<string, Breakpoint | false>;

// ============================================================================
// RESPONSIVE COLUMN CONFIGURATIONS
// Grid column spans for common layout patterns
// ============================================================================

export const GRID_COLUMNS = {
  // Full width always
  full: { xs: 12 },
  // Full width on mobile, half on tablet+
  twoColumn: { xs: 12, md: 6 },
  // Full width on mobile, third on desktop
  threeColumn: { xs: 12, sm: 6, lg: 4 },
  // Portfolio/project cards
  projectCard: { xs: 12, sm: 6, md: 6, lg: 4 },
  // Hero layout - image/content split
  heroImage: { xs: 12, md: 'auto' as const },
  heroContent: { xs: 12, md: 'grow' as const },
  // Footer columns
  footerLeft: { xs: 12, sm: 6 },
  footerRight: { xs: 12, sm: 6 },
  // Form fields layout
  formField: { xs: 12, md: 6 },
  formFieldFull: { xs: 12 },
  // Auto-size column
  auto: { xs: 'auto' as const },
} as const;

// ============================================================================
// RESPONSIVE TYPOGRAPHY SIZES
// Font sizes that scale with viewport
// ============================================================================

export const RESPONSIVE_FONT_SIZE = {
  // Hero name (largest) - uses clamp for fluid scaling
  heroTitle: 'clamp(2.5rem, 5vw, 3.2rem)',
  // Section headings
  sectionTitle: {
    xs: '1.75rem',
    md: '2.125rem',
  } satisfies ResponsiveValue<string>,
  // Subtitles
  subtitle: { xs: '1.2rem', sm: '1.3rem' } satisfies ResponsiveValue<string>,
  // Body text
  body: { xs: '0.95rem', md: '1rem' } satisfies ResponsiveValue<string>,
  // Small/caption text
  small: { xs: '0.8rem', md: '0.875rem' } satisfies ResponsiveValue<string>,
} as const;

// ============================================================================
// RESPONSIVE ELEMENT SIZES
// Dimensions for images, icons, and interactive elements
// ============================================================================

export const RESPONSIVE_SIZE = {
  // Profile image dimensions
  profileImage: { xs: 225, md: 300, lg: 400 } satisfies ResponsiveValue<number>,
  // Icon sizes - medium (section headers)
  iconMd: { xs: '2rem', md: '2.5rem' } satisfies ResponsiveValue<string>,
  // Icon sizes - small (skill badges, etc.)
  iconSm: { xs: '1.5rem', md: '1.75rem' } satisfies ResponsiveValue<string>,
  // Button heights
  buttonLarge: 35,
  buttonStandard: 30,
  // Badge dimensions (credential badges)
  badge: {
    xs: 85,
    sm: 105,
    md: 115,
    lg: 140,
  } satisfies ResponsiveValue<number>,
  badgeWidth: {
    xs: '85px',
    sm: '105px',
    md: '115px',
    lg: '140px',
  } satisfies ResponsiveValue<string>,
  // Min width badge
  badgeMinWidth: 45,
  badgeHeight: 21,
  // Credential hover text
  credentialText: {
    xs: '1.7rem',
    sm: '2.5rem',
  } satisfies ResponsiveValue<string>,
} as const;

// ============================================================================
// RESPONSIVE CARD PADDING
// Padding for project cards and similar containers
// ============================================================================

export const RESPONSIVE_CARD_PADDING = {
  // Project card padding
  projectCard: { xs: 1.5, sm: 2, md: 2.5 } satisfies ResponsiveValue<number>,
} as const;

// ============================================================================
// RESPONSIVE GAPS
// Flexible gap configurations
// ============================================================================

export const RESPONSIVE_GAP = {
  // Badge container gap
  badge: { xs: 1.5, sm: 2, md: 3 } satisfies ResponsiveValue<number>,
} as const;

// ============================================================================
// MASONRY COLUMN CONFIGURATIONS
// For MUI Lab Masonry component
// ============================================================================

export const MASONRY_COLUMNS = {
  // Portfolio projects - 2 on tablet, 3 on desktop
  projects: { sm: 2, md: 2, lg: 3 } satisfies ResponsiveValue<number>,
} as const;

// ============================================================================
// RESPONSIVE SX UTILITIES
// Pre-built sx props for common responsive patterns
// ============================================================================

// Centers content vertically with responsive padding
export const sectionCenteredSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  py: RESPONSIVE_SPACING.section,
};

// Responsive container horizontal padding
export const containerPaddingSx: SxProps<Theme> = {
  px: RESPONSIVE_SPACING.containerPadding,
};

// Responsive margin bottom for section headers
export const sectionHeaderSx: SxProps<Theme> = {
  mb: RESPONSIVE_SPACING.headerMargin,
};

// Hide on mobile (xs), show on sm+
export const hideOnMobileSx = createDisplayToggle({
  mobile: 'none',
  desktop: 'block',
});

// Show on mobile (xs), hide on sm+
export const showOnMobileSx = createDisplayToggle({
  mobile: 'block',
  desktop: 'none',
});

// Hide on mobile (xs), show as inline on sm+
export const hideOnMobileInlineSx = createDisplayToggle({
  mobile: 'none',
  desktop: 'inline',
});

// Hide on mobile (xs), show as flex on sm+
export const hideOnMobileFlexSx = createDisplayToggle({
  mobile: 'none',
  desktop: 'flex',
  breakpoint: 'md',
});

// Flexible text alignment (left on mobile, right on desktop)
export const textAlignResponsiveSx: SxProps<Theme> = {
  textAlign: { xs: 'left', sm: 'right' },
};

// Flexible justify content (start on mobile, end on desktop)
export const justifyResponsiveSx: SxProps<Theme> = {
  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
};

// Footer social link margin (margin on mobile, none on desktop)
export const footerSocialLinkMarginSx: SxProps<Theme> = {
  mb: { xs: 2, sm: 0 },
};

// Footer container margin (margin on mobile, none on desktop)
export const footerContainerMarginSx: SxProps<Theme> = {
  mt: { xs: 4, sm: 0 },
};

// Grid item that displays as flex (for equal height cards)
export const gridItemFlexSx: SxProps<Theme> = {
  display: 'flex',
};

// Full width box
export const fullWidthSx: SxProps<Theme> = {
  width: '100%',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Creates responsive bottom margin with optional mobile offset
export const createResponsiveMarginBottom = (
  mobile: number,
  desktop = 0
): SxProps<Theme> => ({
  mb: { xs: mobile, md: desktop },
});
