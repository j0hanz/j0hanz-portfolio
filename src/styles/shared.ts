import type { SxProps, Theme } from '@mui/material';

// Shared style constants to eliminate duplication across components

export const iconSx: SxProps<Theme> = {
  fontSize: '1rem',
};

export const buttonMinWidthSx: SxProps<Theme> = {
  minWidth: 120,
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
  minWidth: 140,
  height: 30,
  bgcolor: 'neutral.main',
  '&:hover': {
    bgcolor: 'neutral.dark',
  },
};
