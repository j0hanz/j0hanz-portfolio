// ============================================================================
// REACTBITS CONFIGURATION
// Aurora settings for section backgrounds
// ============================================================================

// Section-specific aurora color stops for background animations
// Each array contains [startColor, accentColor, endColor]
// Light mode: muted silver/gray tones, Dark mode: deeper/darker tones

type ColorTriplet = readonly [string, string, string];
type SectionColorStops = {
  readonly light: ColorTriplet;
  readonly dark: ColorTriplet;
};

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
} as const satisfies Record<string, SectionColorStops>;
