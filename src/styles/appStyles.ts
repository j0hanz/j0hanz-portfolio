import { SxProps, Theme } from '@mui/material';

export const mainContainerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexFlow: 'column nowrap',
  minHeight: '100vh',
  maxWidth: 1500,
  mx: 'auto',
  overflow: 'hidden',
};

export const loaderContainerSx: SxProps<Theme> = {
  flex: 1,
  display: 'grid',
  placeItems: 'center',
  position: 'relative',
  zIndex: 1,
  height: '100vh',
};

export const contentContainerSx: SxProps<Theme> = {
  flex: 1,
  position: 'relative',
  zIndex: 1,
};
