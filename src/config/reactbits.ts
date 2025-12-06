// ============================================================================
// REACTBITS CONFIGURATION
// Gradient color palettes and Aurora settings
// ============================================================================

// Predefined gradient color palettes for GradientText
export const gradientPalettes = {
  default: ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  sunset: ['#ff6b6b', '#ffa06b', '#ff6b6b', '#ffa06b', '#ff6b6b'],
  ocean: ['#0077b6', '#00b4d8', '#90e0ef', '#00b4d8', '#0077b6'],
  forest: ['#2d6a4f', '#52b788', '#95d5b2', '#52b788', '#2d6a4f'],
  purple: ['#7b2cbf', '#9d4edd', '#c77dff', '#9d4edd', '#7b2cbf'],
  gold: ['#d4a373', '#e9c46a', '#f4e285', '#e9c46a', '#d4a373'],
  rainbow: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'],
  primary: ['#0067dd', '#3385e3', '#0067dd', '#3385e3', '#0067dd'],
} as const;

// Section-specific aurora color stops for background animations
// Each array contains [startColor, accentColor, endColor]
// Light mode: muted silver/gray tones, Dark mode: deeper/darker tones
export const auroraColorStops = {
  hero: {
    light: ['#c8d4e3', '#94a3b8', '#c8d4e3'],
    dark: ['#010d2e', '#021847', '#010d2e'],
  },
  aboutMe: {
    light: ['#cce5e9', '#a8c9d0', '#cce5e9'],
    dark: ['#01252f', '#013a49', '#01252f'],
  },
  portfolio: {
    light: ['#d4e8db', '#aed0b8', '#d4e8db'],
    dark: ['#012a10', '#01400f', '#012a10'],
  },
  workExperience: {
    light: ['#ddd6f0', '#c4b5e0', '#ddd6f0'],
    dark: ['#12012f', '#1a0145', '#12012f'],
  },
  contact: {
    light: ['#f0d4d8', '#dab0b8', '#f0d4d8'],
    dark: ['#32010c', '#4a0212', '#32010c'],
  },
  footer: {
    light: ['#d4dae3', '#b8c0cc', '#d4dae3'],
    dark: ['#00122c', '#001a3d', '#00122c'],
  },
} as const;
