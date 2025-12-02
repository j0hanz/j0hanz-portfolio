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
      /* Print styles */
      @media print {
        body {
          background: white !important;
          color: black !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        // Responsive padding: smaller on mobile, larger on desktop
        padding: theme.spacing(1, 2),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(1.25, 2.5),
        },
        // Ensure minimum touch target on mobile
        [theme.breakpoints.down('sm')]: {
          minHeight: 44, // WCAG 2.1 AA touch target
        },
        transition: theme.transitions.create(
          ['background-color', 'box-shadow', 'border-color', 'transform'],
          { duration: theme.transitions.duration.short }
        ),
      }),
      // Size variants with responsive adjustments
      sizeSmall: ({ theme }) => ({
        padding: theme.spacing(0.75, 1.5),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0.75, 2),
        },
      }),
      sizeLarge: ({ theme }) => ({
        padding: theme.spacing(1.5, 3),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(1.75, 4),
        },
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
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive card padding
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(2.5),
        },
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(3),
        },
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        // Responsive dialog sizing
        margin: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          margin: theme.spacing(4),
        },
        // Full width on mobile for better usability
        [theme.breakpoints.down('sm')]: {
          width: `calc(100% - ${theme.spacing(4)})`,
          maxWidth: '100%',
        },
        '&:hover': {
          transform: 'none',
        },
      }),
      // Responsive dialog container positioning
      container: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          alignItems: 'flex-end', // Bottom sheet style on mobile
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        // Responsive drawer width
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 320,
        },
        [theme.breakpoints.up('md')]: {
          width: 360,
        },
        '&:hover': {
          transform: 'none',
        },
      }),
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
        // Responsive tooltip font size
        fontSize: theme.typography.pxToRem(11),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(12),
        },
        // Responsive padding
        padding: theme.spacing(0.5, 1),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0.75, 1.5),
        },
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
        // Better touch device support
        [theme.breakpoints.down('sm')]: {
          maxWidth: 200,
        },
      }),
      arrow: ({ theme }) => ({
        color: (theme.vars || theme).palette.grey[800],
      }),
      // Touch-friendly tooltip positioning
      popper: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          // Ensure tooltips don't overflow on mobile
          maxWidth: `calc(100vw - ${theme.spacing(4)})`,
        },
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
        // Responsive FAB sizes
        [theme.breakpoints.down('sm')]: {
          width: 48,
          height: 48,
        },
      }),
      // Small FAB responsive
      sizeSmall: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          width: 40,
          height: 40,
        },
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive input font size for better mobile readability
        fontSize: theme.typography.pxToRem(14),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(16),
        },
      }),
      // Ensure inputs meet touch target requirements
      input: ({ theme }) => ({
        [theme.breakpoints.down('sm')]: {
          padding: theme.spacing(1.5, 1),
          minHeight: 44, // WCAG touch target
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive label font size
        fontSize: theme.typography.pxToRem(12),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(14),
        },
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive helper text
        fontSize: theme.typography.pxToRem(11),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(12),
        },
        marginTop: theme.spacing(0.5),
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive alert padding
        padding: theme.spacing(1, 1.5),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(1, 2),
        },
        borderRadius: theme.shape.borderRadius,
      }),
      message: ({ theme }) => ({
        // Responsive alert message font size
        fontSize: theme.typography.pxToRem(13),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(14),
        },
      }),
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive snackbar positioning
        [theme.breakpoints.down('sm')]: {
          left: theme.spacing(2),
          right: theme.spacing(2),
          bottom: theme.spacing(2),
        },
      }),
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive avatar sizing
        width: 32,
        height: 32,
        [theme.breakpoints.up('sm')]: {
          width: 40,
          height: 40,
        },
        [theme.breakpoints.up('md')]: {
          width: 48,
          height: 48,
        },
        fontSize: theme.typography.pxToRem(16),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(18),
        },
      }),
    },
  },
  MuiBadge: {
    styleOverrides: {
      badge: ({ theme }) => ({
        // Responsive badge font size
        fontSize: theme.typography.pxToRem(10),
        [theme.breakpoints.up('sm')]: {
          fontSize: theme.typography.pxToRem(11),
        },
        minWidth: 18,
        height: 18,
        [theme.breakpoints.up('sm')]: {
          minWidth: 20,
          height: 20,
        },
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
        // Responsive dot size
        padding: theme.spacing(0.75),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(1),
        },
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
        backgroundColor: (theme.vars || theme).palette.divider,
        width: 1,
        transition: 'background-color 0.3s ease',
      }),
    },
  },
  MuiTimelineContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Responsive timeline content padding
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(0.5),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(1),
        },
        [theme.breakpoints.up('md')]: {
          paddingLeft: theme.spacing(2.5),
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
        // Responsive padding
        paddingRight: theme.spacing(1.5),
        [theme.breakpoints.up('sm')]: {
          paddingRight: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }),
    },
  },
};
