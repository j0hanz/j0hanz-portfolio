import React, { useEffect, useState } from 'react';

import { Box, useTheme } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import type { Transition } from 'motion/react';

import { BACKGROUND_ANIMATION_CONFIG } from '@/config/constants';
import {
  useAnimationConfig,
  useAnimationPriority,
  useNavigationState,
  useThemeModeState,
} from '@/hooks';
import { getBackgroundGradients } from '@/utils/background';

// Smooth easing for organic motion - defined once, reused across blobs
const ORGANIC_EASE = [0.37, 0, 0.63, 1] as const;

// Helper to create blob animation transition config
const createBlobTransition = (
  config: (typeof BACKGROUND_ANIMATION_CONFIG)[keyof typeof BACKGROUND_ANIMATION_CONFIG],
  durationMultiplier: number,
  getTransition: ReturnType<typeof useAnimationConfig>['getTransition'],
  shouldAnimate: boolean
): Transition | undefined =>
  shouldAnimate
    ? getTransition('easeInOut', {
        duration:
          'duration' in config ? config.duration * durationMultiplier : 0,
        repeat: Infinity,
        repeatType: 'mirror',
        delay: 'delayOffset' in config ? config.delayOffset : 0,
        ease: ORGANIC_EASE,
      })
    : undefined;

// Blob style configurations - DRY pattern for repeated blob styling
type BlobConfig = {
  inset: string;
  size: string;
  blur?: number;
  opacity?: number;
};
const BLOB_CONFIGS: Record<'primary' | 'secondary' | 'tertiary', BlobConfig> = {
  primary: { inset: '-38%', size: '178%' },
  secondary: { inset: '-34%', size: '165%', blur: 90, opacity: 0.72 },
  tertiary: { inset: '-26%', size: '152%', blur: 120, opacity: 0.52 },
};

const createBlobSx = (
  config: BlobConfig,
  shouldAnimate: boolean
): SxProps<Theme> => ({
  position: 'absolute',
  inset: config.inset,
  width: config.size,
  height: config.size,
  ...(config.blur && { filter: `blur(${config.blur}px)` }),
  ...(config.opacity && { opacity: config.opacity, mixBlendMode: 'screen' }),
  ...(!config.blur && {
    willChange: shouldAnimate ? 'transform, opacity' : 'auto',
  }),
});

function BackgroundMorph(): React.JSX.Element {
  const theme = useTheme();
  const { mode } = useThemeModeState();
  const priority = useAnimationPriority();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const { activeSectionId } = useNavigationState();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  // Pause animation when document is hidden
  useEffect(() => {
    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const shouldAnimate =
    priority === 'high' && !prefersReducedMotion && isDocumentVisible;

  const { primaryGradient, secondaryGradient, tertiaryGradient } =
    getBackgroundGradients(theme, mode, activeSectionId);

  // Key for AnimatePresence to trigger fade transition on color change
  const colorKey = `${activeSectionId}-${mode === 'dark' ? 'dark' : 'light'}`;

  // Create transition configs for each blob type
  const primaryTransition = (mult: number) =>
    createBlobTransition(
      BACKGROUND_ANIMATION_CONFIG.primary,
      mult,
      getTransition,
      shouldAnimate
    );
  const secondaryTransition = (mult: number) =>
    createBlobTransition(
      BACKGROUND_ANIMATION_CONFIG.secondary,
      mult,
      getTransition,
      shouldAnimate
    );
  const tertiaryTransition = (mult: number) =>
    createBlobTransition(
      BACKGROUND_ANIMATION_CONFIG.tertiary,
      mult,
      getTransition,
      shouldAnimate
    );

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
            opacity: BACKGROUND_ANIMATION_CONFIG.colorTransition,
            scale: BACKGROUND_ANIMATION_CONFIG.colorTransition,
            x: primaryTransition(1),
            y: primaryTransition(1.08),
            rotate: primaryTransition(0.92),
          }}
          style={{ background: primaryGradient }}
          sx={createBlobSx(BLOB_CONFIGS.primary, shouldAnimate)}
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
          x: secondaryTransition(1),
          y: secondaryTransition(1.12),
          scale: secondaryTransition(0.85),
        }}
        style={{ background: secondaryGradient }}
        sx={createBlobSx(BLOB_CONFIGS.secondary, shouldAnimate)}
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
          x: tertiaryTransition(1),
          y: tertiaryTransition(1.15),
          scale: tertiaryTransition(0.88),
        }}
        style={{ background: tertiaryGradient }}
        sx={createBlobSx(BLOB_CONFIGS.tertiary, shouldAnimate)}
      />
    </Box>
  );
}

export default BackgroundMorph;
