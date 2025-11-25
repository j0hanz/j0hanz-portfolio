import type { SxProps, Theme } from '@mui/material';

// ============================================================================
// SHARED STYLE CONSTANTS
// Eliminates duplication across components and ensures consistency
// ============================================================================

// ============================================================================
// SIZING CONSTANTS
// ============================================================================

// Icon sizes
export const ICON_SIZE = '1rem';
export const ICON_SIZE_SMALL = '0.9rem';

// Button dimensions
export const BUTTON_MIN_WIDTH = 120;
export const BUTTON_MIN_WIDTH_WIDE = 140;
export const BUTTON_MIN_WIDTH_HERO = 180;
export const BUTTON_HEIGHT_STANDARD = 30;
export const BUTTON_HEIGHT_LARGE = 45;

// Badge dimensions
export const BADGE_MIN_WIDTH = 45;
export const BADGE_HEIGHT = 21;

// ============================================================================
// TYPOGRAPHY CONSTANTS
// ============================================================================

// Text line height
export const TEXT_LINE_HEIGHT = 1.8;

// Letter spacing presets
export const LETTER_SPACING_TIGHT = 0.5;
export const LETTER_SPACING_NORMAL = 1;
export const LETTER_SPACING_WIDE = 1.5;

// ============================================================================
// ANIMATION & TRANSFORM CONSTANTS
// ============================================================================

// CSS transition for non-Motion elements
export const TRANSITION_STANDARD = 'all 0.3s ease';

// Hardware-accelerated clipPath for rounded corners
export const CLIP_ROUNDED = 'inset(0 round 8px)';

// Skew transform for stylized elements
export const SKEW_TRANSFORM = 'skew(-5deg)';

// ============================================================================
// REUSABLE SX PROPS
// ============================================================================

// Icon styles
export const iconSx: SxProps<Theme> = {
  fontSize: ICON_SIZE,
};

export const iconBody2Sx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.body2.fontSize,
};

// Tooltip wrapper for inline elements
export const tooltipWrapperSx: SxProps<Theme> = {
  display: 'inline-block',
};

// Button styles
export const buttonMinWidthSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH,
};

export const neutralButtonSx: SxProps<Theme> = {
  bgcolor: 'neutral.main',
  '&:hover': {
    bgcolor: 'neutral.dark',
  },
};

export const contactButtonSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH_HERO,
  height: BUTTON_HEIGHT_LARGE,
  ...neutralButtonSx,
};

export const credentialButtonSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH_WIDE,
  height: BUTTON_HEIGHT_STANDARD,
  ...neutralButtonSx,
};

// Section layout styles
export const sectionGridItemSx: SxProps<Theme> = {
  mb: 4,
};

export const sectionSpacingSx: SxProps<Theme> = {
  px: 0,
  pb: 5,
};

// Text styles
export const descriptionTextSx: SxProps<Theme> = {
  lineHeight: TEXT_LINE_HEIGHT,
  color: 'text.secondary',
};

export const listContainerSx: SxProps<Theme> = {
  pl: 2.5,
  m: 0,
  lineHeight: 1.8,
  color: 'text.secondary',
};

// Card base styling
export const cardBaseSx: SxProps<Theme> = {
  height: 1,
  display: 'flex',
  flexDirection: 'column',
  clipPath: CLIP_ROUNDED,
  backgroundColor: 'backdrop.glass',
};
