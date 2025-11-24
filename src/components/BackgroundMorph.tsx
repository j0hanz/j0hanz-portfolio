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
  willChange: 'transform, opacity',
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
              // Organic floating motion with subtle rotation - using separate properties
              x: ['0%', '8%', '-5%', '-6%', '3%', '0%'],
              y: ['0%', '5%', '7%', '-3%', '-5%', '0%'],
              scale: [1, 1.15, 1.08, 1.12, 1.1, 1],
              rotate: [0, 3, -1.5, 1.5, -3, 0],
              opacity: [0.85, 0.95, 0.9, 0.95, 0.85, 0.9],
            }
          : {
              x: '0%',
              y: '0%',
              scale: 1,
              rotate: 0,
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
      sx={backgroundSx}
      aria-hidden="true"
    />
  );
}

export default BackgroundMorph;
