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
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      border: '1px solid rgba(255, 255, 255, 0.125)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    },
    glassHeavy: {
      backdropFilter: 'blur(25px) saturate(200%)',
      WebkitBackdropFilter: 'blur(25px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
    },
    glassLight: {
      backdropFilter: 'blur(8px) saturate(150%)',
      WebkitBackdropFilter: 'blur(8px) saturate(150%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
    },
  },
  components: componentOverrides,
});

export const appTheme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
});
