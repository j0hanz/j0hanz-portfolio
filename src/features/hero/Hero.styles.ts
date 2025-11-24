import { alpha, SxProps, Theme } from '@mui/material';
import { MotionStyle } from 'motion/react';

// Animation configs
export const heroNameStyles: React.CSSProperties = {
  fontSize: 'clamp(2.5rem, 5vw, 3.2rem)',
  letterSpacing: '2px',
  fontWeight: 500,
  lineHeight: 1.2,
  justifyContent: 'center',
} as const;

export const cursorStyle: MotionStyle = {
  display: 'inline-block',
  width: 2,
  height: '1.3em',
  backgroundColor: 'currentColor',
  marginLeft: '0.35rem',
} as const;

export const cursorAnimation = {
  opacity: [0, 1, 0],
};

export const cursorTransition = {
  duration: 0.9,
  repeat: Infinity,
};

export const subtitleClipPath = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)' },
} as const;

export const sectionSx: SxProps<Theme> = {
  pt: 8,
};

export const containerSx: SxProps<Theme> = {
  textAlign: 'center',
  px: 0,
  pb: 5,
};

export const profileWrapperSx: SxProps<Theme> = {
  position: 'relative',
  display: 'inline-flex',
};

export const profileImgSx: SxProps<Theme> = {
  width: { xs: 185, md: 245, lg: 280 },
  height: { xs: 185, md: 245, lg: 280 },
  borderRadius: 2,
  objectFit: 'cover',
  cursor: 'pointer',
  mb: { xs: 3, lg: 0 },
};

export const overlaySx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  borderRadius: 2,
  bgcolor: (theme) => alpha(theme.palette.common.black, 0.4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'common.white',
  letterSpacing: 1,
  fontSize: '0.9rem',
  pointerEvents: 'none',
  textTransform: 'uppercase',
};

export const rightGridSx: SxProps<Theme> = {
  textAlign: { xs: 'center', lg: 'left' },
};

export const subtitleSx: SxProps<Theme> = {
  my: 2,
  fontSize: { xs: '1.2rem', sm: '1.3rem' },
  letterSpacing: { xs: '0.5px', sm: '2px' },
  textTransform: 'uppercase',
  color: 'text.primary',
  fontWeight: 500,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
};

export const buttonsStackSx: SxProps<Theme> = {
  mt: 3,
};

export const downloadButtonSx: SxProps<Theme> = {
  minWidth: 180,
  height: 45,
  bgcolor: 'primary.main',
};

export const contactButtonSx: SxProps<Theme> = {
  minWidth: 180,
  height: 45,
  bgcolor: 'neutral.main',
  '&:hover': { bgcolor: 'neutral.dark' },
};
