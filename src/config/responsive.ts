// ============================================================================
// RESPONSIVE DESIGN TOKENS
//
// Keep this file minimal - only values not available in MUI theme.
// For typography, use theme.typography variants (h1, body1, caption, etc.)
// For spacing in components, prefer inline { xs: 2, md: 3 } patterns.
// ============================================================================
import type { Breakpoint } from '@mui/material/styles';

import type { ResponsiveValue } from '@/config/types';

// Re-export types from centralized types.ts for convenience
export type { BreakpointKey, ResponsiveValue } from '@/config/types';

// ============================================================================
// SPACING
// Centralized spacing values using theme.spacing() factor (8px base)
// ============================================================================
export const SPACING = {
  /** Section vertical padding: py */
  section: { xs: 4, md: 10 },
  /** Card/container internal padding */
  card: { xs: 2, sm: 3, md: 3 },
  /** Grid gaps between items */
  grid: { xs: 2, sm: 3, md: 4 },
  /** Masonry spacing - reduced at lg to prevent overflow */
  masonry: { sm: 3, md: 3, lg: 3, xl: 4 },
  /** Stack gaps */
  stack: { xs: 1.5, md: 2 },
  /** Section header margin bottom */
  headerMargin: { xs: 3, md: 4 },
  /** Container horizontal padding - reduced on xs to maximize content width */
  containerPadding: { xs: 1.5, sm: 2.5, md: 3 },
  /** Form field gaps */
  formField: { xs: 1.25, md: 2 },
} as const satisfies Record<string, ResponsiveValue<number>>;

// ============================================================================
// GRID COLUMNS
// MUI v7 Grid `size` prop patterns
// ============================================================================

export const GRID = {
  /** Full width always */
  full: { xs: 12 },
  /** Full mobile, half desktop */
  half: { xs: 12, md: 6 },
  /** Full mobile, half at sm-lg, third at xl (used for project cards, skills, etc.) */
  third: { xs: 12, sm: 6, xl: 4 },
  /** Form field layout */
  formField: { xs: 12, md: 6 },
} as const;

// ============================================================================
// CONTAINER WIDTHS
// ============================================================================

/** Default max width for all sections - use xl for better large screen utilization */
export const DEFAULT_SECTION_MAX_WIDTH = 'xl' as const;

export const CONTAINER_WIDTH = {
  /** Narrow containers for focused content (forms, modals) */
  narrow: 'sm',
  /** Medium containers for balanced layouts */
  medium: 'md',
  /** Wide containers - default for sections */
  wide: DEFAULT_SECTION_MAX_WIDTH,
  /** Full width containers */
  full: 'xl',
  /** Fluid containers (no max width) */
  fluid: false,
} as const satisfies Record<string, Breakpoint | false>;

// ============================================================================
// PROJECT-SPECIFIC SIZES
// Values unique to this portfolio that don't map to MUI defaults
// NOTE: For icon/button/nav sizing, use SIZING from @/styles/shared
// ============================================================================

export const SIZE = {
  /** Profile image dimensions */
  profileImage: { xs: 200, sm: 240, md: 280, lg: 340, xl: 400 },
  /** Credential badge dimensions (pixels for fixed image sizing) */
  badge: { xs: 80, sm: 95, md: 105, lg: 120, xl: 140 },
  /** Credential hover text size (uses h4/h3 scale) */
  credentialText: {
    xs: 'h6.fontSize',
    sm: 'h5.fontSize',
    md: 'h5.fontSize',
    lg: 'h4.fontSize',
  },
  /** WCAG 2.1 AA minimum touch target */
  touchTarget: 44,
} as const;

// ============================================================================
// FONT SIZES
// For custom sizing not covered by theme.typography variants
// Prefer theme.typography.h1, body1, caption, etc. when possible
// ============================================================================

export const FONT_SIZE = {
  /** Hero name - fluid scaling (clamp for smooth responsive) */
  heroTitle: 'clamp(2rem, 4vw + 1rem, 3.5rem)',
  /** Hero subtitle - fluid scaling (clamp for smooth responsive) */
  heroSubtitle: 'clamp(0.95rem, 2vw + 0.5rem, 1.4rem)',
  /** Section headings - maps to theme h3 variant */
  sectionTitle: 'h3.fontSize',
} as const;
