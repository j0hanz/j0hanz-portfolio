import { Components, Theme } from '@mui/material/styles';

export const componentOverrides: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: (theme) => `
      /* Global scrollbar styles */
      *::-webkit-scrollbar {
        width: 0.9rem;
        transition: all 0.3s ease;
      }
      *::-webkit-scrollbar-thumb {
        background: ${(theme.vars || theme).palette.primary.main};
        border-bottom-left-radius: ${theme.shape.borderRadius}px;
        transition: all 0.3s ease;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: ${(theme.vars || theme).palette.primary.dark};
      }
      *::-webkit-scrollbar-track {
        background: transparent;
      }
    `,
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        padding: theme.spacing(1, 2),
      }),
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
};
