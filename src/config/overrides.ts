import type { Components, Theme } from '@mui/material/styles';

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
    MuiTimelineConnector?: {
      styleOverrides?: {
        root?: object | ((props: { theme: Theme }) => object);
      };
    };
  }
}

// ============================================================================
// MUI COMPONENT OVERRIDES
//
// PRINCIPLES (per MUI v7 best practices):
// 1. Prefer defaultProps over styleOverrides for behavior changes
// 2. Use component variants for design system extensions (not ownerState callbacks)
// 3. Global overrides should be minimal - use sx prop for one-off customizations
// 4. Don't override built-in size/spacing - use MUI's size props instead
// 5. Avoid transforms on interactive elements (breaks positioning/touch targets)
// ============================================================================

export const getComponentOverrides = (theme: Theme): Components<Theme> => ({
  // ---------------------------------------------------------------------------
  // GLOBAL BASELINE (Scrollbar hiding while maintaining functionality)
  // ---------------------------------------------------------------------------

  MuiCssBaseline: {
    styleOverrides: {
      // Hide scrollbar globally while keeping scroll functionality
      '*': {
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE/Edge
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari, Opera
        },
      },
      // Ensure html/body don't show scrollbars
      'html, body': {
        overflow: 'hidden',
        height: '100%',
      },
      '#root': {
        height: '100%',
      },
    },
  },
  // ---------------------------------------------------------------------------
  // FORM INPUTS
  // ---------------------------------------------------------------------------

  MuiTextField: {
    defaultProps: {
      variant: 'standard',
      slotProps: {
        inputLabel: { shrink: true },
      },
    },
  },

  MuiInputBase: {
    defaultProps: {
      disableInjectingGlobalStyles: true,
    },
  },

  // ---------------------------------------------------------------------------
  // FEEDBACK
  // ---------------------------------------------------------------------------

  MuiTooltip: {
    defaultProps: {
      arrow: true,
      enterDelay: 200,
      leaveDelay: 100,
    },
  },

  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // BACKDROP (Glass effect for modals)
  // ---------------------------------------------------------------------------

  MuiBackdrop: {
    styleOverrides: {
      root: {
        // Use CSS variable so backdrop responds to light/dark color scheme
        backgroundColor: 'var(--portfolio-palette-backdrop-glass)',
        ...theme.mixins.glass,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // CHIP VARIANTS (Design system extension)
  // ---------------------------------------------------------------------------

  MuiChip: {
    variants: [
      {
        props: { variant: 'soft' as const },
        style: {
          backgroundColor: theme.palette.action.selected,
          color: theme.palette.text.primary,
          fontWeight: 500,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
      {
        props: { variant: 'gradient' as const },
        style: {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.primary.contrastText,
          fontWeight: 600,
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // TIMELINE (@mui/lab components)
  // ---------------------------------------------------------------------------

  MuiTimeline: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },

  MuiTimelineItem: {
    styleOverrides: {
      root: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },

  MuiTimelineConnector: {
    styleOverrides: {
      root: {
        backgroundColor: theme.palette.divider,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // DIALOG (Minimal overrides)
  // ---------------------------------------------------------------------------

  MuiDialog: {
    defaultProps: {
      scroll: 'paper',
    },
    styleOverrides: {
      paper: {
        borderRadius: Number(theme.shape.borderRadius) * 2,
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
    },
  },

  // ---------------------------------------------------------------------------
  // DRAWER
  // ---------------------------------------------------------------------------

  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
      },
    },
  },
});
