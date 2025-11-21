import { alpha, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

/**
 * Returns a glassmorphism style object using the theme's glass mixin and backdrop color.
 * @param theme - The MUI theme
 * @param opacity - Optional opacity override for the background color (default: theme value)
 * @returns SxProps object
 */
export const getGlassStyle = (
  theme: Theme,
  opacity?: number
): SxProps<Theme> => ({
  ...theme.mixins.glass,
  backgroundColor: opacity
    ? alpha(theme.palette.background.paper, opacity)
    : 'backdrop.glass',
});

/**
 * Returns a gradient style object.
 * @param gradient - The gradient string (e.g., from theme.palette.heroGradient)
 * @returns SxProps object
 */
export const getGradientStyle = (gradient: string): SxProps<Theme> => ({
  background: gradient,
});
