import type { SxProps, Theme } from '@mui/material';

// Shared style constants to eliminate duplication across components

// Standard dimensions
export const ICON_SIZE = '1rem';
export const BUTTON_MIN_WIDTH = 120;
export const BUTTON_MIN_WIDTH_WIDE = 140;
export const BUTTON_MIN_WIDTH_HERO = 180;
export const BUTTON_HEIGHT_STANDARD = 30;
export const BUTTON_HEIGHT_LARGE = 45;

// Common badge dimensions
export const BADGE_MIN_WIDTH = 45;
export const BADGE_HEIGHT = 21;

// Common icon sx patterns
export const iconSx: SxProps<Theme> = {
  fontSize: ICON_SIZE,
};

export const iconBody2Sx: SxProps<Theme> = {
  fontSize: (theme) => theme.typography.body2.fontSize,
};

export const buttonMinWidthSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH,
};

export const neutralButtonSx: SxProps<Theme> = {
  bgcolor: 'neutral.main',
  '&:hover': {
    bgcolor: 'neutral.dark',
  },
};

// Shared button styles for consistent appearance
export const contactButtonSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH_HERO,
  height: BUTTON_HEIGHT_LARGE,
  ...neutralButtonSx,
};

export const sectionGridItemSx: SxProps<Theme> = {
  mb: 4,
};

export const sectionSpacingSx: SxProps<Theme> = {
  px: 0,
  pb: 5,
};

export const credentialButtonSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH_WIDE,
  height: BUTTON_HEIGHT_STANDARD,
  bgcolor: 'neutral.main',
  '&:hover': {
    bgcolor: 'neutral.dark',
  },
};

// Shared text constants
export const TEXT_LINE_HEIGHT = 1.8;

// Common transforms
export const SKEW_TRANSFORM = 'skew(-5deg)';

// Common description text style used across sections
export const descriptionTextSx: SxProps<Theme> = {
  lineHeight: TEXT_LINE_HEIGHT,
  color: 'text.secondary',
};

// Common list container style
export const listContainerSx: SxProps<Theme> = {
  pl: 2.5,
  m: 0,
  lineHeight: 1.8,
  color: 'text.secondary',
};

// Base card styling for consistent appearance
export const cardBaseSx: SxProps<Theme> = {
  height: 1,
  display: 'flex',
  flexDirection: 'column',
  clipPath: 'inset(0 round 8px)',
  backgroundColor: 'backdrop.glass',
};
