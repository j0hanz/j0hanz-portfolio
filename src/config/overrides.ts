import { Components, Theme } from '@mui/material/styles';

// Extend Components type to include MUI Lab Timeline components
declare module '@mui/material/styles' {
  interface Components<Theme = unknown> {
    MuiTimeline?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
    MuiTimelineItem?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
    MuiTimelineSeparator?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
    MuiTimelineDot?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
        filled?: object | ((props: { theme: Theme }) => object);
        outlined?: object | ((props: { theme: Theme }) => object);
      };
    };
    MuiTimelineConnector?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
    MuiTimelineContent?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
    MuiTimelineOppositeContent?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
  }
}

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
  MuiTimeline: {
    styleOverrides: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
  },
  MuiTimelineDot: {
    styleOverrides: {
      root: ({ theme }) => ({
        margin: 0,
        padding: theme.spacing(1),
        boxShadow: theme.shadows[3],
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.2)',
          boxShadow: theme.shadows[6],
        },
      }),
    },
  },
  MuiTimelineConnector: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.divider,
        width: 1,
        transition: 'background-color 0.3s ease',
      }),
    },
  },
  MuiTimelineContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        [theme.breakpoints.up('md')]: {
          paddingBottom: theme.spacing(3),
        },
      }),
    },
  },
  MuiTimelineOppositeContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }),
    },
  },
};
