import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { PALETTES } from './constants';
import { componentOverrides } from './overrides';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'portfolio',
  },
  colorSchemes: {
    light: {
      palette: PALETTES.light,
    },
    dark: {
      palette: PALETTES.dark,
    },
  },
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
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  mixins: {
    glass: {
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      border: '1px solid var(--portfolio-palette-divider)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    glassHeavy: {
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid var(--portfolio-palette-divider)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
    glassLight: {
      backdropFilter: 'blur(3px)',
      WebkitBackdropFilter: 'blur(3px)',
      border: '1px solid var(--portfolio-palette-divider)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    },
  },
  components: componentOverrides,
});

export const appTheme = responsiveFontSizes(theme, {
  // Breakpoints where typography scales: sm (600px), md (900px), lg (1200px)
  breakpoints: ['sm', 'md', 'lg'],
  // Factor determines scaling ratio between breakpoints
  // Factor 2 = ~12% size reduction per breakpoint down
  factor: 2,
  // Variants to apply responsive scaling (all heading variants)
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2'],
});
