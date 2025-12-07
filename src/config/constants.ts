import type { RepoStats } from './types';

// ============================================================================
// SCROLL CONSTANTS
// ============================================================================

export const SCROLL_CONFIG = {
  CONTAINER_ID: 'active-section-container',
  TOLERANCE_PX: 2,
  LOCK_DURATION_MS: 1000,
  WHEEL_THRESHOLD_PX: 30,
  TOUCH_THRESHOLD_PX: 50,
  SWIPE_MIN_DISTANCE_PX: 40,
  SWIPE_MAX_DURATION_MS: 600,
} as const;

// ============================================================================
// UI TIMING CONSTANTS
// ============================================================================

export const UI_TIMING = {
  SNACKBAR_DURATION_DEFAULT: 3000,
  TRANSITION_FADE: 0.5,
  TRANSITION_SMOOTH: 0.3,
} as const;

/**
 * Initial loading splash duration in milliseconds.
 * Set to 2s to ensure smooth animation transition and prevent layout flash.
 */
export const INITIAL_LOADING_DELAY_MS = 2000;

// ============================================================================
// PROJECT STATS CONSTANTS
// ============================================================================

export const GITHUB_API_BASE_URL = 'https://api.github.com/repos';

export const QUERY_CONFIG = {
  CACHE_DURATION: 10 * 60 * 1000, // 10 minutes
  STALE_TIME_SHORT: 60 * 1000, // 1 minute
  GC_TIME_SHORT: 5 * 60 * 1000, // 5 minutes
  STALE_TIME_LONG: 10 * 60 * 1000, // 10 minutes
  GC_TIME_LONG: 30 * 60 * 1000, // 30 minutes
  ANIMATION_DURATION_STATS: 800,
  DEV_DELAY_MS: 2000, // Artificial delay in dev for skeleton visibility
} as const;

export const EMPTY_STATS: RepoStats = {
  stars: 0,
  forks: 0,
  issues: 0,
};

// ============================================================================
// CONTACT CONSTANTS
// ============================================================================

export const CONTACT_CONFIG = {
  EMAIL: 'l.johansson93@outlook.com',
  SEND_ERROR_MESSAGE: 'Failed to send message! Please try again later.',
  FORM_RESET_DELAY: 3000,
} as const;

export const CONTACT_COPY = {
  sectionTitle: 'Contact',
  successInline: 'Message sent!',
  successToast: 'Message sent successfully!',
  clearLabel: 'Clear',
  clearAriaLabel: 'Clear form',
  sendLabel: 'Send',
  sendingAriaLabel: 'Sending message',
  sendAriaLabel: 'Send message',
} as const;

// ============================================================================
// CONNECTIVITY CONSTANTS
// ============================================================================

export const CONNECTIVITY_COPY = {
  offlineBanner: 'Offline mode: some features may be unavailable.',
  onlineBanner: 'Back online. Changes will sync as soon as possible.',
  offlineSnackbar: 'You appear to be offline. Some features may not work.',
  onlineSnackbar: 'Connection restored',
} as const;

export const CONNECTIVITY_BANNER_AUTO_DISMISS = 3500;

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const VALIDATION = {
  NAME_PATTERN: /^[a-zA-Z\s]{2,}$/,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL_PATTERN: /^(https?:\/\/)?([\w-]+(\.\w[\w-]+)+)(\/[\w-]*)*\/?$/,
  MIN_MESSAGE_LENGTH: 10,
} as const;

export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Name is required.',
  NAME_INVALID: 'Please enter a valid name (letters and spaces only).',
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_INVALID: 'Email address is invalid.',
  URL_INVALID: 'URL is invalid.',
  MESSAGE_REQUIRED: 'Message is required.',
  MESSAGE_TOO_SHORT: `Message must be at least ${VALIDATION.MIN_MESSAGE_LENGTH} characters long.`,
} as const;

// ============================================================================
// THEME CONSTANTS
// ============================================================================

const COMMON_PALETTE = {
  primary: {
    main: '#0067dd',
    light: '#3385e3',
    dark: '#004797',
    contrastText: '#f5f4f4',
  },
  secondary: {
    main: '#6c757d',
    light: '#868e96',
    dark: '#495057',
    contrastText: '#ffffff',
  },
  success: {
    main: '#28a745',
    light: '#48c664',
    dark: '#1e7e34',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#ffc107',
    light: '#ffcd39',
    dark: '#d39e00',
    contrastText: '#000000',
  },
  info: {
    main: '#17a2b8',
    light: '#3fc3d9',
    dark: '#117a8b',
    contrastText: '#ffffff',
  },
  neutral: {
    main: '#313131',
    light: '#4a4a4a',
    dark: '#242424',
    contrastText: '#f5f4f4',
  },
  certificate: {
    main: '#ffc800',
    contrastText: '#000000',
  },
  linkedin: {
    main: '#0a66c2',
    contrastText: '#ffffff',
  },
  pdf: {
    main: '#dc1a1a',
    contrastText: '#ffffff',
  },
  sourceCode: {
    main: '#3fb950',
    contrastText: '#ffffff',
  },
  heroGradient:
    'linear-gradient(180deg, #017bb5 25%, #026a99 50%, #3a8cc1 75%)',
} as const;

export const PALETTES = {
  light: {
    ...COMMON_PALETTE,
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5a5a5a',
    },
    divider: '#e0e0e0',
    backdrop: {
      glass: 'rgba(255, 255, 255, 0.35)',
    },
    github: {
      main: '#181717',
      dark: '#181717',
      contrastText: '#000000',
    },
  },
  dark: {
    ...COMMON_PALETTE,
    background: {
      default: '#050505',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
    divider: '#333333',
    backdrop: {
      glass: 'rgba(18, 18, 18, 0.25)',
    },
    github: {
      main: '#ffffff',
      dark: '#181717',
      contrastText: '#000000',
    },
  },
} as const;

// Aurora background animation configuration
export const AURORA_CONFIG = {
  // Amplitude controls the height/intensity of the aurora waves
  amplitude: { light: 0.2, dark: 0.3 },
  // Blend controls the softness of the aurora edge
  blend: { light: 2.5, dark: 2 },
  // Speed controls the animation speed
  speed: { light: 2, dark: 2 },
  // Color transition timing when switching sections
  colorTransition: {
    duration: 0.4,
    ease: [0.16, 0, 0.1, 1] as const,
  },
} as const;
