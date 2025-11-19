import { createTheme, ThemeOptions } from '@mui/material/styles';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        /* Global scrollbar styles */
        *::-webkit-scrollbar {
          width: 0.9rem;
          transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb {
          background: #0067dd;
          border-bottom-left-radius: 7.5px;
          transition: all 0.3s ease;
        }
        *::-webkit-scrollbar-thumb:hover {
          background: #004797;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
      `,
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#0067dd',
    },
    background: {
      default: '#cccccc',
      paper: '#ececec',
    },
    text: {
      primary: '#0a0a0a',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0067dd',
    },
    background: {
      default: '#242424',
      paper: '#202020',
    },
    text: {
      primary: '#ececec',
    },
  },
});
