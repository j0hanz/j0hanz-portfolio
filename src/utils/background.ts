import { alpha, Theme } from '@mui/material';

import {
  BACKGROUND_GRADIENT_OPACITY,
  SECTION_THEME_COLORS,
} from '@/config/constants';
import type { GradientConfig } from '@/config/types';

// Generates background gradients based on theme mode and active section
export function getBackgroundGradients(
  theme: Theme,
  mode: 'light' | 'dark',
  activeSectionId: string | null
): GradientConfig {
  const isDark = mode === 'dark';
  const opacitySet = isDark
    ? BACKGROUND_GRADIENT_OPACITY.dark
    : BACKGROUND_GRADIENT_OPACITY.light;

  // Determine current section color
  const sectionId = activeSectionId || 'hero';
  const sectionColors =
    SECTION_THEME_COLORS[sectionId as keyof typeof SECTION_THEME_COLORS] ||
    SECTION_THEME_COLORS.hero;
  const activeColor = isDark ? sectionColors.dark : sectionColors.light;

  // Primary blob gradient - section color, top-center positioned
  const primaryGradient = `radial-gradient(
    ellipse 82% 58% at 50% 28%,
    ${alpha(activeColor, opacitySet.primary)},
    ${alpha(activeColor, opacitySet.primary * 0.55)} 30%,
    ${alpha(activeColor, opacitySet.primary * 0.28)} 58%,
    transparent 100%
  )`;

  // Secondary blob gradient - theme accent, bottom-right
  const secondaryGradient = `radial-gradient(
    ellipse 105% 35% at 88% 52%,
    ${alpha(theme.palette.primary.main, opacitySet.secondary)},
    ${alpha(theme.palette.primary.main, opacitySet.secondary * 0.5)} 22%,
    ${alpha(theme.palette.primary.main, opacitySet.secondary * 0.24)} 48%,
    transparent 100%
  )`;

  // Tertiary blob gradient - complementary, adds depth
  const tertiaryGradient = `radial-gradient(
    ellipse 35% 58% at 15% 75%,
    ${alpha(activeColor, opacitySet.tertiary)},
    ${alpha(activeColor, opacitySet.tertiary * 0.42)} 24%,
    ${alpha(activeColor, opacitySet.tertiary * 0.18)} 52%,
    transparent 100%
  )`;

  return { primaryGradient, secondaryGradient, tertiaryGradient };
}
