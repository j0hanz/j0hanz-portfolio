import { alpha, SxProps, Theme } from '@mui/material';

import { FONT_SIZE, SPACING } from '@/config/responsive';
import { CLIP_ROUNDED, LETTER_SPACING_NORMAL, SIZING } from '@/styles/shared';

// Animation configs
export const heroNameStyles: React.CSSProperties = {
  fontSize: FONT_SIZE.heroTitle,
  fontWeight: 500,
  lineHeight: 1,
  justifyContent: 'flex-start',
} as const;

// Cursor for typing effect - uses transform for hardware acceleration
export const cursorSx: SxProps<Theme> = {
  display: 'inline-block',
  width: 2, // 2px
  height: '1.1em',
  backgroundColor: 'currentColor',
  marginLeft: '0.1875em', // Relative to font size (~3px at 16px)
  willChange: 'opacity',
} as const;

export const subtitleClipPath = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)' },
} as const;

export const sectionSx: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  height: 1,
  pt: 0,
};

export const heroCardSx: SxProps<Theme> = {
  p: SPACING.card,
};

export const containerSx: SxProps<Theme> = {
  textAlign: 'center',
  px: 0,
};

// Profile image responsive dimensions - shared between wrapper and image
const PROFILE_SIZE = { xs: 225, sm: 260, md: 300, lg: 400 };

export const profileWrapperSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-flex',
  width: PROFILE_SIZE,
  height: PROFILE_SIZE,
  mb: { xs: 3, sm: 2.5, md: 0 },
};

export const profileImgSx: SxProps<Theme> = {
  width: 1,
  height: 1,
  aspectRatio: '1 / 1',
  clipPath: CLIP_ROUNDED,
  objectFit: 'cover',
  cursor: 'pointer',
  willChange: 'opacity, transform',
};

export const heroContentSx: SxProps<Theme> = {
  textAlign: 'left',
};

export const overlaySx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  clipPath: CLIP_ROUNDED,
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
  display: 'grid',
  placeItems: 'center',
  color: 'common.white',
  letterSpacing: LETTER_SPACING_NORMAL,
  fontSize: (theme) => theme.typography.caption.fontSize,
  pointerEvents: 'none',
  textTransform: 'uppercase',
};

export const subtitleSx: SxProps<Theme> = {
  fontSize: SIZING.iconMd, // Reuses medium icon scale for subtitle text
  letterSpacing: { xs: 0.5, sm: 1.5, md: 2, lg: 2.5 },
  textTransform: 'uppercase',
  color: 'text.primary',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  justifyContent: 'flex-start',
};

export const buttonsStackSx: SxProps<Theme> = {
  mt: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
};

export const downloadButtonSx: SxProps<Theme> = {
  // Responsive button dimensions
  minWidth: SIZING.buttonMinWidthHero,
  height: SIZING.buttonHeightLarge,
};
