import type { Components, CSSObject, Theme } from '@mui/material/styles';

// Extend Components type to include MUI Lab Timeline components
declare module '@mui/material/styles' {
  interface Components<Theme = unknown> {
    MuiTimeline?: {
      styleOverrides?: {
        root?: CSSObject | ((props: { theme: Theme }) => CSSObject);
      };
    };
    MuiTimelineItem?: {
      styleOverrides?: {
        root?: CSSObject | ((props: { theme: Theme }) => CSSObject);
      };
    };
    MuiTimelineConnector?: {
      styleOverrides?: {
        root?: CSSObject | ((props: { theme: Theme }) => CSSObject);
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
      '.glitch': {
        color: 'var(--portfolio-palette-text-primary, currentColor)',
        fontWeight: 600,
        position: 'relative',
        whiteSpace: 'nowrap',
        margin: '0 auto',
        userSelect: 'none',
        cursor: 'pointer',
        '&::after, &::before': {
          content: 'attr(data-text)',
          position: 'absolute',
          top: 0,
          color: 'var(--portfolio-palette-text-primary, currentColor)',
          backgroundColor:
            'var(--portfolio-palette-background-default, transparent)',
          overflow: 'hidden',
          clipPath: 'inset(0 0 0 0)',
        },
        '&:not(.enable-on-hover)::after': {
          left: 10,
          textShadow: 'var(--after-shadow, -10px 0 red)',
          animation:
            'animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse',
        },
        '&:not(.enable-on-hover)::before': {
          left: -10,
          textShadow: 'var(--before-shadow, 10px 0 cyan)',
          animation:
            'animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse',
        },
        '&.enable-on-hover::after, &.enable-on-hover::before': {
          content: '""',
          opacity: 0,
          animation: 'none',
        },
        '&.enable-on-hover:hover::after': {
          content: 'attr(data-text)',
          opacity: 1,
          left: 10,
          textShadow: 'var(--after-shadow, -10px 0 red)',
          animation:
            'animate-glitch var(--after-duration, 3s) infinite linear alternate-reverse',
        },
        '&.enable-on-hover:hover::before': {
          content: 'attr(data-text)',
          opacity: 1,
          left: -10,
          textShadow: 'var(--before-shadow, 10px 0 cyan)',
          animation:
            'animate-glitch var(--before-duration, 2s) infinite linear alternate-reverse',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&:not(.enable-on-hover)::after, &:not(.enable-on-hover)::before, &.enable-on-hover:hover::after, &.enable-on-hover:hover::before':
            {
              animation: 'none',
              opacity: 0,
              content: '""',
            },
        },
      },
      '.shiny-text': {
        color: 'var(--portfolio-palette-text-secondary, #b5b5b5a4)',
        background:
          'linear-gradient(120deg, transparent 40%, var(--portfolio-palette-text-primary, rgba(255, 255, 255, 0.8)) 50%, transparent 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        display: 'inline-block',
        animation: 'shine 5s linear infinite',
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          color: 'var(--portfolio-palette-text-primary, currentColor)',
          background: 'none',
          WebkitBackgroundClip: 'unset',
          backgroundClip: 'unset',
        },
      },
      '.shiny-text.disabled': {
        animation: 'none',
      },
      '.text-type': {
        display: 'inline-block',
        whiteSpace: 'pre-wrap',
      },
      '.text-type__cursor': {
        marginLeft: '0.25rem',
        display: 'inline-block',
        opacity: 1,
      },
      '.text-type__cursor--hidden': {
        display: 'none',
      },
      '@keyframes shine': {
        '0%': {
          backgroundPosition: '100%',
        },
        '100%': {
          backgroundPosition: '-100%',
        },
      },
      '@keyframes animate-glitch': {
        '0%': {
          clipPath: 'inset(20% 0 50% 0)',
        },
        '5%': {
          clipPath: 'inset(10% 0 60% 0)',
        },
        '10%': {
          clipPath: 'inset(15% 0 55% 0)',
        },
        '15%': {
          clipPath: 'inset(25% 0 35% 0)',
        },
        '20%': {
          clipPath: 'inset(30% 0 40% 0)',
        },
        '25%': {
          clipPath: 'inset(40% 0 20% 0)',
        },
        '30%': {
          clipPath: 'inset(10% 0 60% 0)',
        },
        '35%': {
          clipPath: 'inset(15% 0 55% 0)',
        },
        '40%': {
          clipPath: 'inset(25% 0 35% 0)',
        },
        '45%': {
          clipPath: 'inset(30% 0 40% 0)',
        },
        '50%': {
          clipPath: 'inset(20% 0 50% 0)',
        },
        '55%': {
          clipPath: 'inset(10% 0 60% 0)',
        },
        '60%': {
          clipPath: 'inset(15% 0 55% 0)',
        },
        '65%': {
          clipPath: 'inset(25% 0 35% 0)',
        },
        '70%': {
          clipPath: 'inset(30% 0 40% 0)',
        },
        '75%': {
          clipPath: 'inset(40% 0 20% 0)',
        },
        '80%': {
          clipPath: 'inset(20% 0 50% 0)',
        },
        '85%': {
          clipPath: 'inset(10% 0 60% 0)',
        },
        '90%': {
          clipPath: 'inset(15% 0 55% 0)',
        },
        '95%': {
          clipPath: 'inset(25% 0 35% 0)',
        },
        '100%': {
          clipPath: 'inset(30% 0 40% 0)',
        },
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
