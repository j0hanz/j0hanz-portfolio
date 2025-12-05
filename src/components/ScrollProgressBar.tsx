import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { useEnhancedScrollProgress } from '@/hooks';
import { SIZING } from '@/styles/shared';

// Smooth scroll progress bar using useSpring with velocity tracking
export function ScrollProgressBar() {
  const { smoothProgress } = useEnhancedScrollProgress();

  return (
    <Box
      component={motion.div}
      sx={{
        transformOrigin: '0 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: SIZING.progressBarHeight,
        backgroundColor: 'primary.main',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        willChange: 'transform',
      }}
      style={{ scaleX: smoothProgress }}
      aria-hidden="true"
    />
  );
}
