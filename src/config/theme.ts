import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles';

import { BASE_PALETTE, MODE_SPECIFIC_OVERRIDES } from './constants';
import type { PaletteModeKey } from './types';

const getBaseTheme = (): ThemeOptions => ({
  cssVariables: true,
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 400,
    },
    button: {
      textTransform: 'none',
      fontWeight: 300,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        /* Global scrollbar styles */
        *::-webkit-scrollbar {
          width: 0.9rem;
          transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb {
          background: ${theme.palette.primary.main};
          border-bottom-left-radius: ${theme.shape.borderRadius}px;
          transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: ${theme.palette.primary.dark};
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          '&:hover': {
            transform: 'none',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          '&:hover': {
            transform: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
});

const createResponsiveTheme = (mode: PaletteModeKey) => {
  const baseTheme = getBaseTheme();
  const modeOverrides = MODE_SPECIFIC_OVERRIDES[mode];
  const palette: PaletteOptions = {
    mode,
    primary: { ...BASE_PALETTE.primary },
    neutral: { ...BASE_PALETTE.neutral },
    heroGradient: BASE_PALETTE.heroGradient,
    background: { ...modeOverrides.background },
    text: { ...modeOverrides.text },
    backdrop: { ...modeOverrides.backdrop },
  };
  const theme = createTheme({
    ...baseTheme,
    palette,
  });

  return responsiveFontSizes(theme, {
    breakpoints: ['sm', 'md', 'lg'],
    factor: 2,
  });
};

export const lightTheme = createResponsiveTheme('light');
export const darkTheme = createResponsiveTheme('dark');
