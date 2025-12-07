import { alpha, SxProps, Theme } from '@mui/material';

import { FONT_SIZE, SIZE, SPACING } from '@/config/responsive';
import { CLIP_ROUNDED, LETTER_SPACING_NORMAL, SIZING } from '@/styles/shared';

// Hero name animation styles - converted to SxProps for MUI compatibility
export const heroNameStyles: SxProps<Theme> = {
  fontSize: FONT_SIZE.heroTitle,
  fontWeight: 500,
  lineHeight: 1,
  justifyContent: 'flex-start',
  letterSpacing: { xs: 2, sm: 3, md: 6, lg: 8 },
  marginY: { xs: 2, lg: 2 },
};

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
  px: SPACING.card,
  pt: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
  pb: SPACING.card,
};

export const containerSx: SxProps<Theme> = {
  textAlign: 'center',
  px: 0,
};

export const profileWrapperSx: SxProps<Theme> = {
  position: 'relative',
  display: { xs: 'inline-flex', lg: 'block' },
  // Fixed square on mobile/tablet, height-sync on large screens
  width: {
    xs: SIZE.profileImage.xs,
    sm: SIZE.profileImage.sm,
    md: SIZE.profileImage.md,
    lg: 'auto',
  },
  height: {
    xs: SIZE.profileImage.xs,
    sm: SIZE.profileImage.sm,
    md: SIZE.profileImage.md,
    lg: '100%',
  },
  // Minimum dimensions for large screens to prevent collapse
  minWidth: { lg: 280, xl: 320 },
  minHeight: { lg: 380, xl: 420 },
  // Max width constraint to prevent over-stretching
  maxWidth: { lg: 400, xl: 480 },
  mb: { xs: 3, sm: 2.5, md: 0 },
  // Smooth transition when resizing
  transition: 'all 0.3s ease',
};

export const profileImgSx: SxProps<Theme> = {
  width: 1,
  height: 1,
  // Square on mobile, auto-fit on large screens
  aspectRatio: { xs: '1 / 1' },
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
  bgcolor: (theme) =>
    alpha(
      theme.palette.mode === 'dark'
        ? theme.palette.common.black
        : theme.palette.grey[800],
      0.5
    ),
  display: 'grid',
  placeItems: 'center',
  color: 'grey.100',
  letterSpacing: LETTER_SPACING_NORMAL,
  fontSize: (theme) => theme.typography.caption.fontSize,
  pointerEvents: 'none',
  textTransform: 'uppercase',
};

export const subtitleSx: SxProps<Theme> = {
  fontSize: FONT_SIZE.heroSubtitle,
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
