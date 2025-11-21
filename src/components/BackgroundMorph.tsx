import React from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { useAnimationConfig, useAnimationPriority } from '@/hooks';

/**
 * Animated background morphing effect
 * Uses transform property for hardware acceleration
 */
function BackgroundMorph(): React.JSX.Element {
  const priority = useAnimationPriority();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const shouldAnimate = priority === 'high' && !prefersReducedMotion;

  return (
    <Box
      component={motion.div}
      initial={false}
      animate={
        shouldAnimate
          ? {
              // Use transform for hardware acceleration
              transform: [
                'translate3d(0%, 0%, 0) scale(1) rotate(0deg)',
                'translate3d(8%, 5%, 0) scale(1.15) rotate(2deg)',
                'translate3d(-5%, -3%, 0) scale(1.15) rotate(-1deg)',
                'translate3d(0%, 0%, 0) scale(1) rotate(0deg)',
              ],
            }
          : {
              transform: 'translate3d(0%, 0%, 0) scale(1) rotate(0deg)',
            }
      }
      transition={
        shouldAnimate
          ? getTransition('smooth', {
              duration: 20,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            })
          : undefined
      }
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'linear-gradient(150deg, rgba(26, 29, 204, 0.35), rgba(87, 89, 214, 0.25))',
        filter: 'blur(30px)',
        willChange: 'transform',
      }}
      aria-hidden
    />
  );
}

export default BackgroundMorph;
