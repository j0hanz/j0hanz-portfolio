import { SxProps, Theme } from '@mui/material';

export const mainContainerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  bgcolor: 'background.default',
  overflow: 'hidden',
};

export const loaderContainerSx: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
  height: '100vh',
};

export const contentContainerSx: SxProps<Theme> = {
  flex: 1,
  position: 'relative',
  zIndex: 1,
};
