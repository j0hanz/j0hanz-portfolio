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

export const iconSx: SxProps<Theme> = {
  fontSize: ICON_SIZE,
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
