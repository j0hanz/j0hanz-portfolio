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
      fontWeight: 300,
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
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
  },
  components: componentOverrides,
});

export const appTheme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
});
