import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles';

const getBaseTheme = (): ThemeOptions => ({
  cssVariables: true,
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
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
    MuiCard: {
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

const createResponsiveTheme = (mode: 'light' | 'dark') => {
  const baseTheme = getBaseTheme();
  const theme = createTheme({
    ...baseTheme,
    palette: {
      mode,
      primary: {
        main: '#0067dd',
        light: '#3385e3',
        dark: '#004797',
        contrastText: '#f5f4f4',
      },
      neutral: {
        main: '#313131',
        light: '#4a4a4a',
        dark: '#242424',
        contrastText: '#f5f4f4',
      },
      heroGradient:
        'linear-gradient(180deg, #017bb5 25%, #026a99 50%, #3a8cc1 75%)',
      ...(mode === 'light'
        ? {
            background: {
              default: '#cccccc',
              paper: '#ececec',
            },
            text: {
              primary: '#0a0a0a',
              secondary: '#4a4a4a',
            },
          }
        : {
            background: {
              default: '#242424',
              paper: '#202020',
            },
            text: {
              primary: '#ececec',
              secondary: '#b0b0b0',
            },
          }),
    },
  });

  return responsiveFontSizes(theme, {
    breakpoints: ['sm', 'md', 'lg'],
    factor: 2,
  });
};

export const lightTheme = createResponsiveTheme('light');
export const darkTheme = createResponsiveTheme('dark');
