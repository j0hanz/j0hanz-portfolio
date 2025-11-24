import { SxProps, Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

export const socialLinkButtonSx: SxProps<Theme> = {
  '&:hover': {
    color: 'primary.main',
    bgcolor: 'action.hover',
  },
};

export const navLogoStackSx: SxProps<Theme> = {
  height: 50,
  textDecoration: 'none',
  cursor: 'pointer',
};

export const navLogoImgSx: SxProps<Theme> = {
  width: '2.2rem',
};

export const navLinksListSx: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  p: 2,
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

export const listItemButtonSx: SystemStyleObject<Theme> = {
  clipPath: 'inset(0 round 8px)',
  py: 1.5,
  px: 2,
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
  bgcolor: 'action.selected',
  '& .MuiListItemIcon-root': {
    color: 'primary.main',
    transform: 'scale(1.1)',
  },
  '& .MuiListItemText-primary': {
    color: 'primary.main',
    fontWeight: 600,
  },
};

export const listItemIconSx: SystemStyleObject<Theme> = {
  minWidth: 40,
  color: 'text.secondary',
};

export const listItemIconSelectedSx: SystemStyleObject<Theme> = {
  color: 'primary.main',
};

export const listItemTextPrimarySx: SxProps<Theme> = {
  letterSpacing: '0.5px',
};

export const socialLinksBoxSx: SxProps<Theme> = { mt: 'auto' };

export const drawerPaperSx: SxProps<Theme> = {
  width: { xs: '85%', sm: 350 },
  backgroundColor: 'background.paper',
  backgroundImage: 'none',
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
  overflowX: 'hidden',
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
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
};

export const drawerFooterSx: SxProps<Theme> = {
  p: 3,
  backgroundColor: 'background.paper',
};

export const connectTextSx: SxProps<Theme> = {
  mb: 2,
  fontWeight: 500,
  letterSpacing: 1.5,
};

export const darkModeToggleBoxSx: SxProps<Theme> = {
  position: 'fixed',
  top: 0,
  left: 0,
  bgcolor: 'background.paper',
  borderRadius: '0 0 16px 0px',
  zIndex: (theme) => theme.zIndex.appBar,
  cursor: 'pointer',
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
};

export const menuButtonSx: SxProps<Theme> = {
  position: 'fixed',
  bgcolor: 'background.paper',
  color: 'text.primary',
  borderRadius: '0 0 0 16px',
  height: 56,
  width: 64,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: (theme) => theme.zIndex.appBar,
  top: 0,
  right: 0,
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  '&:hover': {
    bgcolor: 'background.default',
    color: 'primary.main',
  },
};
