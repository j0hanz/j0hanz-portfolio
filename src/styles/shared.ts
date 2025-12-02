import type { SxProps, Theme } from '@mui/material';

// ============================================================================
// SHARED STYLE CONSTANTS
// Single source of truth for reusable styling patterns
// Organized by category for discoverability
// ============================================================================

// ============================================================================
// SIZING CONSTANTS
// ============================================================================

export const SIZING = {
  // Icon sizes
  icon: '1rem',
  iconSmall: '0.9rem',
  // Button dimensions
  buttonMinWidth: 120,
  buttonMinWidthWide: 140,
  buttonMinWidthHero: 140,
  buttonHeightStandard: 30,
  buttonHeightLarge: 44, // WCAG minimum touch target
  // Badge dimensions
  badgeMinWidth: 45,
  badgeHeight: 21,
} as const;

// Responsive sizing variants for sx prop usage
export const SIZING_RESPONSIVE = {
  /** Responsive icon size */
  icon: { xs: '0.9rem', sm: '1rem' },
  /** Responsive small icon size */
  iconSmall: { xs: '0.8rem', sm: '0.9rem' },
  /** Responsive button minimum width */
  buttonMinWidth: { xs: 100, sm: 120 },
  /** Responsive wide button minimum width */
  buttonMinWidthWide: { xs: 120, sm: 140 },
  /** Responsive hero button minimum width */
  buttonMinWidthHero: { xs: 125, sm: 140 },
  /** Responsive standard button height */
  buttonHeightStandard: { xs: 28, sm: 30 },
  /** Responsive large button height (touch target) */
  buttonHeightLarge: { xs: 40, sm: 44 },
} as const;

// Direct destructured exports for cleaner imports
export const {
  icon: ICON_SIZE,
  iconSmall: ICON_SIZE_SMALL,
  buttonMinWidth: BUTTON_MIN_WIDTH,
  buttonMinWidthWide: BUTTON_MIN_WIDTH_WIDE,
  buttonMinWidthHero: BUTTON_MIN_WIDTH_HERO,
  buttonHeightStandard: BUTTON_HEIGHT_STANDARD,
  buttonHeightLarge: BUTTON_HEIGHT_LARGE,
  badgeMinWidth: BADGE_MIN_WIDTH,
  badgeHeight: BADGE_HEIGHT,
} = SIZING;

// ============================================================================
// TYPOGRAPHY CONSTANTS
// ============================================================================

export const TYPOGRAPHY = {
  lineHeight: 2,
  letterSpacingTight: 0.5,
  letterSpacingNormal: 1,
  letterSpacingWide: 1.5,
} as const;

// Direct destructured exports
export const {
  lineHeight: TEXT_LINE_HEIGHT,
  letterSpacingTight: LETTER_SPACING_TIGHT,
  letterSpacingNormal: LETTER_SPACING_NORMAL,
  letterSpacingWide: LETTER_SPACING_WIDE,
} = TYPOGRAPHY;

// ============================================================================
// ANIMATION & TRANSFORM CONSTANTS
// ============================================================================

export const TRANSFORMS = {
  transitionStandard: 'all 0.3s ease',
  clipRounded: 'inset(0 round 8px)',
  skew: 'skew(-5deg)',
} as const;

// Direct destructured exports
export const {
  transitionStandard: TRANSITION_STANDARD,
  clipRounded: CLIP_ROUNDED,
  skew: SKEW_TRANSFORM,
} = TRANSFORMS;

// ============================================================================
// REUSABLE SX PROPS - ICONS
// ============================================================================

export const iconSx: SxProps<Theme> = {
  fontSize: SIZING.icon,
};

export const iconBody2Sx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.body2.fontSize,
};

// ============================================================================
// REUSABLE SX PROPS - BUTTONS
// ============================================================================

export const buttonMinWidthSx: SxProps<Theme> = {
  minWidth: SIZING.buttonMinWidth,
};

export const contactButtonSx: SxProps<Theme> = {
  minWidth: SIZING.buttonMinWidthHero,
  height: SIZING.buttonHeightLarge,
};

export const credentialButtonSx: SxProps<Theme> = {
  minWidth: SIZING.buttonMinWidthWide,
  height: SIZING.buttonHeightStandard,
};

// ============================================================================
// REUSABLE SX PROPS - LAYOUT
// ============================================================================

export const tooltipWrapperSx: SxProps<Theme> = {
  display: 'inline-block',
};

export const sectionGridItemSx: SxProps<Theme> = {
  mb: 4,
};

export const sectionSpacingSx: SxProps<Theme> = {
  px: 0,
  pb: 5,
};

export const centeredFullViewportSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  p: 3,
};

// ============================================================================
// REUSABLE SX PROPS - TEXT
// ============================================================================

export const descriptionTextSx: SxProps<Theme> = {
  lineHeight: TYPOGRAPHY.lineHeight,
  color: 'text.secondary',
};

export const listContainerSx: SxProps<Theme> = {
  pl: 2.5,
  m: 0,
  lineHeight: 1.8,
  color: 'text.secondary',
};

export const textEllipsisSx: SxProps<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  minWidth: 0,
};

/** Multi-line text clamp - limits text to specified number of lines */
export const textClampSx = (lines: number): SxProps<Theme> => ({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
});

/** Responsive line height for improved mobile readability */
export const responsiveLineHeightSx: SxProps<Theme> = {
  lineHeight: { xs: 1.6, md: 1.75 },
};

/** Responsive letter spacing for headings */
export const headingLetterSpacingSx: SxProps<Theme> = {
  letterSpacing: { xs: '-0.02em', md: '-0.015em' },
};

// ============================================================================
// REUSABLE SX PROPS - CARDS & CONTAINERS
// ============================================================================

export const cardBaseSx: SxProps<Theme> = {
  height: 1,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 2,
  backgroundColor: 'backdrop.glass',
};

export const timelineCardWrapperSx: SxProps<Theme> = {
  position: 'relative',
  zIndex: 1,
};

export const timelineDescriptionWrapperSx: SxProps<Theme> = {
  mb: 2,
};

export const transparentModalContentSx: SxProps<Theme> = {
  p: 0,
  bgcolor: 'transparent',
  overflow: 'hidden',
};

// ============================================================================
// REUSABLE SX PROPS - ACCESSIBILITY
// ============================================================================

// Visually hidden content for screen readers (WCAG compliant)
export const visuallyHiddenSx: SxProps<Theme> = {
  position: 'absolute',
  width: 1,
  height: 1,
  p: 0,
  m: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};
