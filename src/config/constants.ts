export const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes
export const MAX_CACHE_SIZE = 20;

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

// UI Color Constants
export const COLORS = {
  NAV_HOVER: '#40a9ff',
  TEXT_LIGHT: '#f5f4f4',
  BG_DARK: '#181818f5',
  BTN_BG_DARK: '#313131',
  BTN_BG_DARK_HOVER: '#242424',
  PRIMARY_BLUE: '#0067dd',
  PRIMARY_BLUE_HOVER: '#004797',
} as const;
