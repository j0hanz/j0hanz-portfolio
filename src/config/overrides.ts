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
    styleOverrides: () => `
      /* Invisible scrollbar - maintains scroll functionality */
      *::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      * {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
    `,
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        padding: theme.spacing(1, 2),
        transition: theme.transitions.create(
          ['background-color', 'box-shadow', 'border-color', 'transform'],
          { duration: theme.transitions.duration.short }
        ),
      }),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 12,
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }),
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
      root: ({ theme }) => ({
        fontWeight: 500,
        transition: theme.transitions.create(
          ['background-color', 'box-shadow', 'transform'],
          { duration: theme.transitions.duration.shorter }
        ),
      }),
    },
    variants: [
      {
        props: { variant: 'soft' },
        style: ({ theme }) => ({
          backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary.main} 12%, transparent)`,
          color: (theme.vars || theme).palette.primary.main,
          '&:hover': {
            backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.primary.main} 20%, transparent)`,
          },
        }),
      },
      {
        props: { variant: 'gradient' },
        style: ({ theme }) => ({
          background: `linear-gradient(135deg, ${(theme.vars || theme).palette.primary.main} 0%, ${(theme.vars || theme).palette.primary.dark} 100%)`,
          color: (theme.vars || theme).palette.primary.contrastText,
          border: 'none',
        }),
      },
    ],
  },
  MuiTextField: {
    defaultProps: {
      variant: 'standard',
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(
          ['transform', 'background-color'],
          {
            duration: theme.transitions.duration.shorter,
          }
        ),
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }),
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
      enterDelay: 300,
      leaveDelay: 100,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.grey[800],
        fontSize: theme.typography.pxToRem(12),
        padding: theme.spacing(0.75, 1.5),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
      }),
      arrow: ({ theme }) => ({
        color: (theme.vars || theme).palette.grey[800],
      }),
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.text.primary} 11%, transparent)`,
        borderRadius: theme.shape.borderRadius,
      }),
      rounded: ({ theme }) => ({
        borderRadius: Number(theme.shape.borderRadius) * 1.5,
      }),
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Uses alpha channel for backdrop (common.black for theme consistency)
        backgroundColor: `color-mix(in srgb, ${(theme.vars || theme).palette.common.black} 50%, transparent)`,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }),
      invisible: {
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      },
    },
  },
  MuiSpeedDial: {
    styleOverrides: {
      fab: ({ theme }) => ({
        boxShadow: theme.shadows[6],
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          boxShadow: theme.shadows[10],
        },
      }),
    },
  },
  MuiSpeedDialAction: {
    styleOverrides: {
      fab: ({ theme }) => ({
        boxShadow: theme.shadows[3],
        transition: theme.transitions.create(['transform', 'box-shadow'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          boxShadow: theme.shadows[6],
          transform: 'scale(1.1)',
        },
      }),
    },
  },
  MuiFab: {
    styleOverrides: {
      root: ({ theme }) => ({
        transition: theme.transitions.create(
          ['background-color', 'box-shadow', 'transform'],
          { duration: theme.transitions.duration.short }
        ),
      }),
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
