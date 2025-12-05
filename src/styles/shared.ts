import type { SxProps, Theme } from '@mui/material';

// ============================================================================
// SHARED STYLE CONSTANTS
// Single source of truth for reusable styling patterns
// Organized by category for discoverability
// ============================================================================

// ============================================================================
// PROJECT CARD SHARED STYLES
// Used by both ProjectCard and ProjectCardSkeleton for consistency
// ============================================================================

export const PROJECT_CARD_ARTICLE_SX: SxProps<Theme> = {
  display: 'flex',
  flexFlow: 'column nowrap',
  height: 1,
  p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
};

export const PROJECT_CARD_CONTENT_SX: SxProps<Theme> = {
  flex: '1 1 auto',
};

// ============================================================================
// SIZING CONSTANTS (Responsive - mobile-first)
// All sizing uses responsive values for consistent mobile/desktop experience
// SINGLE SOURCE OF TRUTH - import these instead of hardcoding values
// ============================================================================

export const SIZING = {
  // ---------------------------------------------------------------------------
  // ICON SIZES (pixels - icons use absolute pixel values, not theme spacing)
  // ---------------------------------------------------------------------------
  /** Extra small icon (close buttons, inline indicators) */
  iconXs: { xs: 14, sm: 15, md: 16, lg: 16 },
  /** Small icon (badges, metadata, form field icons) */
  iconSm: { xs: 15, sm: 16, md: 17, lg: 18 },
  /** Default icon (standard UI icons, buttons) */
  icon: { xs: 16, sm: 18, md: 20, lg: 20 },
  /** Medium icon (stat icons, action buttons, subtitles) */
  iconMd: { xs: 18, sm: 20, md: 22, lg: 24 },
  /** Large icon (feature icons, skill badges) */
  iconLg: { xs: 22, sm: 24, md: 28, lg: 32 },
  /** Extra large icon (section headers, decorative) */
  iconXl: { xs: 28, sm: 32, md: 36, lg: 40 },
  /** Scroll/FAB icons */
  iconFab: { xs: 24, sm: 26, md: 28, lg: 28 },
  /** Flag icons (CV modal) */
  iconFlag: { xs: 42, sm: 48, md: 56, lg: 64 },
  /** Spinner/loading size */
  spinner: { xs: 80, sm: 100, md: 120, lg: 120 },

  // ---------------------------------------------------------------------------
  // BUTTON DIMENSIONS
  // ---------------------------------------------------------------------------
  /** Standard button minimum width */
  buttonMinWidth: { xs: 80, sm: 100, md: 120, lg: 120 },
  /** Wide button minimum width */
  buttonMinWidthWide: { xs: 100, sm: 120, md: 130, lg: 140 },
  /** Hero CTA button minimum width */
  buttonMinWidthHero: { xs: 115, sm: 130, md: 145, lg: 150 },
  /** Standard button height */
  buttonHeightStandard: { xs: 26, sm: 28, md: 30, lg: 32 },
  /** Large button height (WCAG 44px touch target on mobile) */
  buttonHeightLarge: { xs: 44, sm: 44, md: 46, lg: 48 },
  /** Action button minimum width (project cards) - smaller on xs to prevent overflow */
  actionButtonMinWidth: { xs: 70, sm: 90, md: 100, lg: 110 },

  // ---------------------------------------------------------------------------
  // BADGE & CHIP DIMENSIONS
  // ---------------------------------------------------------------------------
  /** Badge minimum width */
  badgeMinWidth: { xs: 38, sm: 43, md: 48, lg: 52 },
  /** Badge height */
  badgeHeight: { xs: 16, sm: 19, md: 22, lg: 24 },

  // ---------------------------------------------------------------------------
  // NAVIGATION & TOOLBAR
  // ---------------------------------------------------------------------------
  /** NavBar height */
  navBarHeight: { xs: 44, sm: 50, md: 56, lg: 56 },
  /** NavBar button min width */
  navButtonMinWidth: { xs: 36, sm: 40, md: 44, lg: 44 },
  /** Logo image width */
  logoWidth: { xs: 30, sm: 35, md: 38, lg: 40 },
  /** Modal close button size (WCAG touch target) */
  closeButton: { xs: 44, sm: 40, md: 38, lg: 38 },

  // ---------------------------------------------------------------------------
  // PROGRESS & INDICATORS
  // ---------------------------------------------------------------------------
  /** Scroll progress bar height (spacing units, not pixels) */
  progressBarHeight: { xs: 0.5, sm: 0.4375, md: 0.375, lg: 0.375 },
} as const;

// Convenience exports for badge sizing (responsive)
export const BADGE_MIN_WIDTH = SIZING.badgeMinWidth;
export const BADGE_HEIGHT = SIZING.badgeHeight;

// Alias for backwards compatibility
export const SIZING_RESPONSIVE = SIZING;

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
  fontSize: SIZING.iconXs,
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

export const centeredFullViewportSx: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
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
  m: 0,
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
  lineHeight: { xs: 1.6, sm: 1.7, md: 1.75, lg: 1.8 },
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
  flexFlow: 'column nowrap',
  borderRadius: 2,
  bgcolor: 'backdrop.glass',
};

export const timelineCardWrapperSx: SxProps<Theme> = {
  position: 'relative',
  zIndex: 1,
};

export const timelineDescriptionWrapperSx: SxProps<Theme> = {
  mb: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
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
