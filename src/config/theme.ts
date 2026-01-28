import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { PALETTES } from './constants';
import { getComponentOverrides } from './overrides';

const SPACING_TOKENS = {
  section: { xs: 6, lg: 10 },
  card: { xs: 2, sm: 2.5, md: 3, lg: 3.5 },
  grid: { xs: 2.5, sm: 3, md: 3.5, lg: 4 },
  masonry: { xs: 1.5, sm: 2, md: 2.5, lg: 3, xl: 3.5 },
  stack: { xs: 1.5, sm: 1.75, md: 2, lg: 2.5 },
  headerMargin: { xs: 1 },
  containerPadding: { xs: 1, sm: 2, md: 4, lg: 6 },
  formField: { xs: 1.25, sm: 1.5, md: 2 },
  projectCard: { xs: 2, sm: 2.5, md: 3 },
} as const;

const GRID_TOKENS = {
  full: { xs: 12 },
  half: { xs: 12, md: 6 },
  third: { xs: 12, sm: 6, xl: 4 },
  formField: { xs: 12, md: 6 },
} as const;

const SIZING_TOKENS = {
  iconXs: { xs: 16, sm: 18 },
  iconSm: { xs: 15, sm: 16, md: 17, lg: 18 },
  icon: { xs: 16, sm: 18, md: 20, lg: 20 },
  iconMd: { xs: 18, sm: 20, md: 22, lg: 24 },
  iconLg: { xs: 22, sm: 24, md: 28, lg: 32 },
  iconXl: { xs: 30, sm: 34, lg: 38 },
  iconFab: { xs: 32, sm: 34, md: 36, lg: 40 },
  iconFlag: { xs: 42, sm: 48, md: 56, lg: 64 },
  spinner: { xs: 80, sm: 100, md: 120, lg: 120 },
  buttonMinWidth: { xs: 80, sm: 85, md: 110, lg: 120 },
  buttonMinWidthWide: { xs: 100, sm: 120, md: 130, lg: 140 },
  buttonMinWidthHero: { xs: 115, sm: 130, md: 145, lg: 150 },
  buttonHeightSmall: { xs: 32, md: 36 },
  buttonHeightLarge: { xs: 40, md: 46 },
  actionButtonMinWidth: { xs: 65, sm: 90, md: 100, lg: 110 },
  badgeMinWidth: { xs: 38, sm: 43, md: 48, lg: 52 },
  badgeHeight: { xs: 14, sm: 16, md: 20, lg: 22 },
  socialAvatar: { xs: 36, md: 38, lg: 40 },
  socialIcon: { xs: 24, md: 24, lg: 26 },
  awardBadge: { xs: 80, sm: 90, md: 120, lg: 140, xl: 160 },
  navBarHeight: { xs: 44, sm: 50, md: 56, lg: 56 },
  navButtonMinWidth: { xs: 36, sm: 40, md: 44, lg: 44 },
  logoWidth: { xs: 30, sm: 35, md: 38, lg: 40 },
  closeButton: { xs: 44, sm: 40, md: 38, lg: 38 },
  profileImage: { xs: 225, sm: 260, md: 300, lg: 400, xl: 500 },
} as const;

const TYPOGRAPHY_TOKENS = {
  lineHeight: { relaxed: 2 },
  letterSpacing: { tight: 0.5, normal: 1, wide: 1.5 },
  fontSize: {
    heroTitle: 'clamp(2rem, 4vw + 1rem, 3.5rem)',
    heroSubtitle: 'clamp(0.95rem, 2vw + 0.5rem, 1.4rem)',
    sectionTitle: 'clamp(2rem, 3vw + 1rem, 3rem)',
    badgeDate: { xs: '0.65rem', sm: '0.7rem' },
    footerContact: { xs: '0.85rem', sm: '0.9rem' },
    footerCopyright: { xs: '0.8rem', sm: '0.9rem' },
    actionButton: { xs: '0.7rem', md: '0.85rem', lg: '0.9rem' },
  },
  credentialText: {
    xs: 'h6.fontSize',
    sm: 'h5.fontSize',
    md: 'h5.fontSize',
    lg: 'h4.fontSize',
  },
} as const;

const MOTION_TOKENS = {
  transitionStandard: 'all 0.3s ease',
  transitionFast: 'all 0.2s ease',
  transitionColor: 'color 0.2s ease',
  transitionTransform: 'transform 0.2s ease',
  transitionOpacity: 'opacity 0.2s ease',
  clipRounded: 'inset(0 round 10px)',
  skew: 'skew(-5deg)',
  backdropBlur: {
    soft: 'blur(8px)',
    strong: 'blur(20px)',
  },
} as const;

const CENTERED_GRID = {
  display: 'grid',
  placeItems: 'center',
} as const;

const INLINE_CENTERED_GRID = {
  display: 'inline-grid',
  placeItems: 'center',
} as const;

const PROJECT_TECH_STACK_TOKENS = {
  container: {
    transform: MOTION_TOKENS.skew,
    flex: 'none',
  },
  chip: {
    mr: { xs: 0.75, sm: 0.875, md: 1 },
    mb: { xs: 0.75, sm: 0.875, md: 1 },
    color: 'text.primary',
    fontSize: 'caption.fontSize',
    opacity: 0.85,
    transform: MOTION_TOKENS.skew,
    '& .MuiChip-label': {
      textTransform: 'uppercase',
    },
  },
} as const;

const PROJECT_STATS_TOKENS = {
  container: {
    position: 'relative',
    flex: 'none',
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: TYPOGRAPHY_TOKENS.letterSpacing.normal,
    color: 'text.secondary',
  },
  value: {
    fontWeight: 500,
    fontSize: 'body1.fontSize',
    color: 'text.primary',
  },
} as const;

const PROJECT_LINKS_TOKENS = {
  actionButton: {
    height: SIZING_TOKENS.buttonHeightSmall,
    fontSize: TYPOGRAPHY_TOKENS.fontSize.actionButton,
    minWidth: SIZING_TOKENS.buttonMinWidth,
  },
} as const;

const DESIGN_TOKENS = {
  spacing: SPACING_TOKENS,
  grid: GRID_TOKENS,
  sizing: SIZING_TOKENS,
  typography: TYPOGRAPHY_TOKENS,
  motion: MOTION_TOKENS,
  layout: {
    centeredGrid: CENTERED_GRID,
    inlineCenteredGrid: INLINE_CENTERED_GRID,
    centeredFullViewport: {
      ...CENTERED_GRID,
      minHeight: '100vh',
      p: 3,
    },
    transparentModalContent: {
      p: 0,
      bgcolor: 'transparent',
      overflow: 'hidden',
    },
    visuallyHidden: {
      position: 'absolute',
      width: 1,
      height: 1,
      p: 0,
      m: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
    },
    projectCard: {
      article: {
        display: 'flex',
        flexFlow: 'column nowrap',
        height: 1,
        p: SPACING_TOKENS.projectCard,
      },
      content: {
        flex: '1 1 auto',
      },
    },
    projectTechStack: PROJECT_TECH_STACK_TOKENS,
    projectStats: PROJECT_STATS_TOKENS,
    projectLinks: PROJECT_LINKS_TOKENS,
  },
} as const;

// Base theme without component overrides (needed to pass theme to overrides)
const baseTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'portfolio',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
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
      fontWeight: 400,
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
      border: '1px solid var(--portfolio-palette-divider)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    glassHeavy: {
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid var(--portfolio-palette-divider)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    },
    glassLight: {
      backdropFilter: 'blur(3px)',
      WebkitBackdropFilter: 'blur(3px)',
      border: '1px solid var(--portfolio-palette-divider)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
    },
  },
  custom: DESIGN_TOKENS,
});

// Full theme with component overrides
const theme = createTheme(baseTheme, {
  components: getComponentOverrides(baseTheme),
});

export const appTheme = responsiveFontSizes(theme, {
  // Breakpoints for responsive typography scaling
  // sm (600px), md (768px), lg (1024px), xl (1280px)
  breakpoints: ['sm', 'md', 'lg', 'xl'],
  // Factor 2 provides ~12% size reduction per breakpoint for balanced scaling
  factor: 2.5,
  // Variants to apply responsive scaling (all heading variants)
  variants: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2'],
});
