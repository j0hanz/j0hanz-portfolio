import type { SxProps, Theme } from '@mui/material';
import type { SystemStyleObject } from '@mui/system';

import {
  CLIP_ROUNDED,
  LETTER_SPACING_TIGHT,
  LETTER_SPACING_WIDE,
  SIZING,
} from '@/styles/shared';

export const navLogoStackSx: SxProps<Theme> = {
  height: SIZING.navBarHeight,
  textDecoration: 'none',
  cursor: 'pointer',
};

export const navLogoImgSx: SxProps<Theme> = {
  width: SIZING.logoWidth,
};

export const navLinksListSx: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  flexFlow: 'column nowrap',
  position: 'relative',
  p: 2,
  m: 0,
  listStyle: 'none',
  // Replicating .cardBgImage
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0,
    backgroundImage: 'var(--card-bg-image-url)',
    opacity: 0.03,
    pointerEvents: 'none',
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
};

// These use SystemStyleObject because they're used in sx arrays
export const listItemButtonSx: SystemStyleObject<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  clipPath: CLIP_ROUNDED,
  // Responsive padding for better mobile touch targets
  py: { xs: 1.25, sm: 1.5 },
  px: { xs: 1.5, sm: 2 },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  '&:hover': {
    bgcolor: 'action.hover',
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
    },
    '& .MuiListItemText-primary': {
      color: 'primary.main',
    },
  },
};

export const listItemButtonSelectedSx: SystemStyleObject<Theme> = {
  '& .MuiListItemIcon-root': {
    transform: 'scale(1.1)',
  },
  '& .MuiListItemText-primary': {
    fontWeight: 500,
  },
};

export const listItemIconSx: SystemStyleObject<Theme> = {
  minWidth: SIZING.navButtonMinWidth,
  color: 'text.secondary',
};

export const listItemIconSelectedSx: SystemStyleObject<Theme> = {
  color: 'primary.main',
};

export const listItemTextPrimarySx: SxProps<Theme> = {
  letterSpacing: `${LETTER_SPACING_TIGHT}px`,
};

export const socialLinksBoxSx: SxProps<Theme> = { mt: 'auto' };

export const drawerPaperSx: SxProps<Theme> = {
  width: { xs: '100%', sm: 320, md: 380 },
  backgroundColor: 'backdrop.glass',
  backgroundImage: 'none',
  height: '100dvh',
  display: 'flex',
  flexFlow: 'column nowrap',
  overflowX: 'hidden',
  backdropFilter: 'blur(10px) saturate(180%)',
  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: (theme) =>
    `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
};

export const drawerHeaderSx: SxProps<Theme> = {
  p: 2,
  pt: 3,
  borderBottom: 1,
  borderColor: 'divider',
};

export const closeButtonSx: SxProps<Theme> = {
  overflow: 'hidden',
  '&:hover': {
    color: 'error.main',
    bgcolor: 'error.light',
    opacity: 0.2,
  },
};

export const drawerContentSx: SxProps<Theme> = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexFlow: 'column nowrap',
};

export const drawerFooterSx: SxProps<Theme> = {
  p: 3,
  backgroundColor: 'transparent',
};

export const connectTextSx: SxProps<Theme> = {
  mb: 2,
  fontWeight: 500,
  letterSpacing: LETTER_SPACING_WIDE,
};

export const navBarContainerSx: SystemStyleObject<Theme> = {
  position: 'fixed',
  top: (theme: Theme) => theme.spacing(1),
  right: (theme: Theme) => theme.spacing(1),
  zIndex: (theme: Theme) => theme.zIndex.appBar,
  bgcolor: 'backdrop.glass',
  borderRadius: 2,
  p: 0.5,
};

export const menuButtonSx: SxProps<Theme> = {
  '&:hover': { bgcolor: 'transparent' },
  '& svg': { transition: 'transform 0.2s, color 0.2s' },
  '&:hover svg': {
    transform: 'scale(1.15)',
    color: 'primary.main',
  },
};
