import React, { useEffect, useState } from 'react';

import { alpha, Box, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import { SECTION_THEME_COLORS } from '@/config/constants';
import {
  useAnimationConfig,
  useAnimationPriority,
  useNavigationState,
  useThemeModeState,
} from '@/hooks';

// Animation timing constants for consistent feel
const ANIMATION_CONFIG = {
  // Primary blob - slow, organic movement
  primary: {
    duration: 28,
    delayOffset: 0,
  },
  // Secondary blob - slightly faster, creates depth
  secondary: {
    duration: 22,
    delayOffset: 3,
  },
  // Tertiary blob - fastest, adds visual interest
  tertiary: {
    duration: 18,
    delayOffset: 6,
  },
  // Color transition timing
  colorTransition: {
    duration: 0.4,
    ease: [0.16, 0, 0.1, 1] as const,
  },
} as const;

// Gradient opacity values for light/dark modes
const GRADIENT_OPACITY = {
  light: { primary: 0.24, secondary: 0.14, tertiary: 0.09 },
  dark: { primary: 0.38, secondary: 0.24, tertiary: 0.16 },
} as const;

// Animated background with organic floating motion and section-based colors
function BackgroundMorph(): React.JSX.Element {
  const theme = useTheme();
  const { mode } = useThemeModeState();
  const priority = useAnimationPriority();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const { activeSectionId } = useNavigationState();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  const isDark = mode === 'dark';
  const opacitySet = isDark ? GRADIENT_OPACITY.dark : GRADIENT_OPACITY.light;

  // Pause animation when document is hidden
  useEffect(() => {
    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const shouldAnimate =
    priority === 'high' && !prefersReducedMotion && isDocumentVisible;

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

  // Key for AnimatePresence to trigger fade transition on color change
  const colorKey = `${activeSectionId}-${isDark ? 'dark' : 'light'}`;

  // Smooth easing for organic motion
  const organicEase = [0.37, 0, 0.63, 1] as const;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {/* Primary Morphing Blob - section color, organic floating */}
        <Box
          component={motion.div}
          key={colorKey}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: shouldAnimate ? ['0%', '2.4%', '-1.8%', '1%', '0%'] : '0%',
            y: shouldAnimate ? ['0%', '2.2%', '3%', '1.4%', '0%'] : '0%',
            rotate: shouldAnimate ? [0, 1.2, -0.8, 0.4, 0] : 0,
          }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{
            opacity: ANIMATION_CONFIG.colorTransition,
            scale: ANIMATION_CONFIG.colorTransition,
            x: shouldAnimate
              ? getTransition('easeInOut', {
                  duration: ANIMATION_CONFIG.primary.duration,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: organicEase,
                })
              : undefined,
            y: shouldAnimate
              ? getTransition('easeInOut', {
                  duration: ANIMATION_CONFIG.primary.duration * 1.08,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: organicEase,
                })
              : undefined,
            rotate: shouldAnimate
              ? getTransition('easeInOut', {
                  duration: ANIMATION_CONFIG.primary.duration * 0.92,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: organicEase,
                })
              : undefined,
          }}
          style={{ background: primaryGradient }}
          sx={{
            position: 'absolute',
            inset: '-38%',
            width: '178%',
            height: '178%',
            willChange: shouldAnimate ? 'transform, opacity' : 'auto',
          }}
        />
      </AnimatePresence>

      {/* Secondary Ambient Blob - theme accent, slower movement */}
      <Box
        component={motion.div}
        animate={{
          x: shouldAnimate ? ['0%', '-3%', '1.6%', '-0.6%', '0%'] : '0%',
          y: shouldAnimate ? ['0%', '-2.2%', '-0.6%', '1.6%', '0%'] : '0%',
          scale: shouldAnimate ? [1, 1.06, 1.02, 1.04, 1] : 1,
        }}
        transition={{
          x: shouldAnimate
            ? getTransition('easeInOut', {
                duration: ANIMATION_CONFIG.secondary.duration,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: ANIMATION_CONFIG.secondary.delayOffset,
                ease: organicEase,
              })
            : undefined,
          y: shouldAnimate
            ? getTransition('easeInOut', {
                duration: ANIMATION_CONFIG.secondary.duration * 1.12,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: ANIMATION_CONFIG.secondary.delayOffset,
                ease: organicEase,
              })
            : undefined,
          scale: shouldAnimate
            ? getTransition('easeInOut', {
                duration: ANIMATION_CONFIG.secondary.duration * 0.85,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: ANIMATION_CONFIG.secondary.delayOffset,
                ease: organicEase,
              })
            : undefined,
        }}
        style={{ background: secondaryGradient }}
        sx={{
          position: 'absolute',
          inset: '-34%',
          width: '165%',
          height: '165%',
          filter: 'blur(90px)',
          opacity: 0.72,
          mixBlendMode: 'screen',
          willChange: shouldAnimate ? 'transform, filter' : 'auto',
        }}
      />

      {/* Tertiary Depth Blob - subtle, adds layered depth */}
      <Box
        component={motion.div}
        animate={{
          x: shouldAnimate ? ['0%', '1.6%', '-2%', '0.6%', '0%'] : '0%',
          y: shouldAnimate ? ['0%', '2.2%', '-1.4%', '0.8%', '0%'] : '0%',
          scale: shouldAnimate ? [1, 0.97, 1.03, 0.99, 1] : 1,
        }}
        transition={{
          x: shouldAnimate
            ? getTransition('easeInOut', {
                duration: ANIMATION_CONFIG.tertiary.duration,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: ANIMATION_CONFIG.tertiary.delayOffset,
                ease: organicEase,
              })
            : undefined,
          y: shouldAnimate
            ? getTransition('easeInOut', {
                duration: ANIMATION_CONFIG.tertiary.duration * 1.15,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: ANIMATION_CONFIG.tertiary.delayOffset,
                ease: organicEase,
              })
            : undefined,
          scale: shouldAnimate
            ? getTransition('easeInOut', {
                duration: ANIMATION_CONFIG.tertiary.duration * 0.88,
                repeat: Infinity,
                repeatType: 'mirror',
                delay: ANIMATION_CONFIG.tertiary.delayOffset,
                ease: organicEase,
              })
            : undefined,
        }}
        style={{ background: tertiaryGradient }}
        sx={{
          position: 'absolute',
          inset: '-26%',
          width: '152%',
          height: '152%',
          filter: 'blur(120px)',
          opacity: 0.52,
          mixBlendMode: 'screen',
          willChange: shouldAnimate ? 'transform, filter' : 'auto',
        }}
      />
    </Box>
  );
}

export default BackgroundMorph;
