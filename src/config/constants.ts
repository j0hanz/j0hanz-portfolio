import { PaletteOptions } from '@mui/material/styles';
import type { RepoStats } from './types';

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const BASE_DURATION = 0.6;
export const BASE_DELAY = 0.1;
export const BASE_STAGGER = 0.12;

export const REDUCED_MOTION_TARGET = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
} as const;

// ============================================================================
// PROJECT STATS CONSTANTS
// ============================================================================

export const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export const EMPTY_STATS: RepoStats = {
  stars: 0,
  forks: 0,
  issues: 0,
};

// ============================================================================
// CONTACT CONSTANTS
// ============================================================================

export const CONTACT_EMAIL = 'l.johansson93@outlook.com';
export const EMAIL_TOAST_ID = 'contact-email-toast';
export const SEND_ERROR_MESSAGE =
  'Failed to send message! Please try again later.';

// ============================================================================
// NETWORK STATUS CONSTANTS
// ============================================================================

export const NETWORK_STATUS_TOAST_ID = 'network-status-toast';

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

export const BASE_PALETTE = {
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
  heroGradient:
    'linear-gradient(180deg, #017bb5 25%, #026a99 50%, #3a8cc1 75%)',
} as const satisfies Pick<
  PaletteOptions,
  'primary' | 'neutral' | 'heroGradient'
>;

export const MODE_SPECIFIC_OVERRIDES = {
  light: {
    background: {
      default: '#cccccc',
      paper: '#ececec',
    },
    text: {
      primary: '#0a0a0a',
      secondary: '#4a4a4a',
    },
    backdrop: {
      glass: 'rgba(255, 255, 255, 0.2)',
    },
  },
  dark: {
    background: {
      default: '#242424',
      paper: '#202020',
    },
    text: {
      primary: '#ececec',
      secondary: '#b0b0b0',
    },
    backdrop: {
      glass: 'rgba(0, 0, 0, 0.2)',
    },
  },
} as const;
