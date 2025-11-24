import React from 'react';

import { alpha, Box, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import { useAnimationConfig, useAnimationPriority } from '@/hooks';

const backgroundSx: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  zIndex: 0,
  pointerEvents: 'none',
  background: (theme) => {
    const isDark = theme.palette.mode === 'dark';
    const opacity = isDark ? 0.4 : 0.3;

    return `radial-gradient(
      circle at 50% 20%,
      ${alpha(theme.palette.primary.main, opacity)},
      ${alpha(theme.palette.primary.light, opacity * 0.5)} 50%,
      transparent 70%
    )`;
  },
  filter: 'blur(40px)',
};

// Animated background with organic floating motion (respects device capability)
function BackgroundMorph(): React.JSX.Element {
  const priority = useAnimationPriority();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const shouldAnimate = priority === 'high' && !prefersReducedMotion;

  return (
    <Box
      component={motion.div}
      animate={
        shouldAnimate
          ? {
              // Organic floating motion - combined transform for hardware acceleration
              transform: [
                'translateX(0%) translateY(0%) scale(1) rotate(0deg)',
                'translateX(8%) translateY(5%) scale(1.15) rotate(3deg)',
                'translateX(-5%) translateY(7%) scale(1.08) rotate(-1.5deg)',
                'translateX(-6%) translateY(-3%) scale(1.12) rotate(1.5deg)',
                'translateX(3%) translateY(-5%) scale(1.1) rotate(-3deg)',
                'translateX(0%) translateY(0%) scale(1) rotate(0deg)',
              ],
              opacity: [0.85, 0.95, 0.9, 0.95, 0.85, 0.9],
            }
          : {
              transform: 'translateX(0%) translateY(0%) scale(1) rotate(0deg)',
              opacity: 0.9,
            }
      }
      transition={
        shouldAnimate
          ? getTransition('easeInOut', {
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              ease: [0.45, 0.05, 0.55, 0.95],
            })
          : undefined
      }
      sx={{
        ...backgroundSx,
        willChange: shouldAnimate ? 'transform, opacity' : 'auto',
      }}
      aria-hidden="true"
    />
  );
}

export default BackgroundMorph;
