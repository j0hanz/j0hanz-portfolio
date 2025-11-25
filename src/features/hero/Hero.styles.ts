import { alpha, SxProps, Theme } from '@mui/material';

import { cursorBlinkAnimation, cursorBlinkTransition } from '@/config/motion';
import {
  BUTTON_HEIGHT_LARGE,
  BUTTON_MIN_WIDTH_HERO,
  CLIP_ROUNDED,
  LETTER_SPACING_NORMAL,
} from '@/styles/shared';

// Animation configs
export const heroNameStyles: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 5vw, 3.2rem)',
  letterSpacing: '2px',
  fontWeight: 500,
  lineHeight: 1,
  justifyContent: 'flex-start',
} as const;

// Cursor for typing effect - uses transform for hardware acceleration
export const cursorStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '2px',
  height: '1.1em',
  backgroundColor: 'currentColor',
  marginLeft: '0.35rem',
  willChange: 'opacity',
} as const;

// Re-export from centralized motion config
export const cursorAnimation = cursorBlinkAnimation;
export const cursorTransition = cursorBlinkTransition;

export const subtitleClipPath = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)' },
} as const;

export const sectionSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  pt: 0,
};

export const heroCardSx: SxProps<Theme> = {
  p: { xs: 2, sm: 3, md: 3 },
};

export const containerSx: SxProps<Theme> = {
  textAlign: 'center',
  px: 0,
};

export const profileWrapperSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-flex',
};

export const profileImgSx: SxProps<Theme> = {
  width: { xs: 225, md: 300, lg: 400 },
  height: { xs: 225, md: 300, lg: 400 },
  clipPath: CLIP_ROUNDED,
  objectFit: 'cover',
  cursor: 'pointer',
  mb: { xs: 3, md: 0 },
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'common.white',
  letterSpacing: LETTER_SPACING_NORMAL,
  fontSize: '0.9rem',
  pointerEvents: 'none',
  textTransform: 'uppercase',
};

export const subtitleSx: SxProps<Theme> = {
  fontSize: { xs: '1.2rem', sm: '1.3rem' },
  letterSpacing: { xs: '0.5px', sm: '2px' },
  textTransform: 'uppercase',
  color: 'text.primary',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  justifyContent: 'flex-start',
};

export const buttonsStackSx: SxProps<Theme> = {
  mt: 2,
};

export const downloadButtonSx: SxProps<Theme> = {
  minWidth: BUTTON_MIN_WIDTH_HERO,
  height: BUTTON_HEIGHT_LARGE,
  bgcolor: 'primary.main',
};
