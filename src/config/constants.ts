import type { RepoStats } from './types';

// ============================================================================
// PROJECT STATS CONSTANTS
// ============================================================================

export const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
export const GITHUB_API_BASE_URL = 'https://api.github.com/repos';

export const QUERY_CONFIG = {
  STALE_TIME_SHORT: 60 * 1000, // 1 minute
  GC_TIME_SHORT: 5 * 60 * 1000, // 5 minutes
  STALE_TIME_LONG: 10 * 60 * 1000, // 10 minutes
  GC_TIME_LONG: 30 * 60 * 1000, // 30 minutes
} as const;

export const ANIMATION_DURATION_STATS = 800;

export const EMPTY_STATS: RepoStats = {
  stars: 0,
  forks: 0,
  issues: 0,
};

// ============================================================================
// CONTACT CONSTANTS
// ============================================================================

export const CONTACT_EMAIL = 'l.johansson93@outlook.com';
export const SEND_ERROR_MESSAGE =
  'Failed to send message! Please try again later.';
export const FORM_RESET_DELAY = 3000;

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const NAME_PATTERN = /^[a-zA-Z\s]{2,}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const URL_PATTERN = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?$/;
export const MIN_MESSAGE_LENGTH = 10;

export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Name is required.',
  NAME_INVALID: 'Please enter a valid name (letters and spaces only).',
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_INVALID: 'Email address is invalid.',
  URL_INVALID: 'URL is invalid.',
  MESSAGE_REQUIRED: 'Message is required.',
  MESSAGE_TOO_SHORT: `Message must be at least ${MIN_MESSAGE_LENGTH} characters long.`,
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
      glass: 'rgba(255, 255, 255, 0.75)',
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
      glass: 'rgba(20, 20, 20, 0.6)',
    },
    github: {
      main: '#ffffff',
      dark: '#181717',
      contrastText: '#000000',
    },
  },
} as const;
