import React from 'react';

import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { useAnimationConfig, useAnimationPriority } from '@/hooks';

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
              scale: [1, 1.05, 1],
              x: ['0%', '3%', '0%'],
              y: ['0%', '2%', '0%'],
            }
          : { scale: 1, x: '0%', y: '0%' }
      }
      transition={
        shouldAnimate
          ? getTransition('smooth', {
              duration: 15,
              repeat: Infinity,
              repeatType: 'mirror',
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
      }}
      aria-hidden
    />
  );
}

export default BackgroundMorph;
