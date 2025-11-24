import { alpha, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

// Returns glassmorphism style with optional opacity override
export const getGlassStyle = (
  theme: Theme,
  opacity?: number
): SxProps<Theme> => ({
  ...theme.mixins.glass,
  backgroundColor: opacity
    ? alpha(theme.palette.background.paper, opacity)
    : 'backdrop.glass',
});

// Returns gradient style from gradient string (e.g., theme.palette.heroGradient)
export const getGradientStyle = (gradient: string): SxProps<Theme> => ({
  background: gradient,
});
