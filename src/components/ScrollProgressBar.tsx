import { Box } from '@mui/material';
import { motion } from 'motion/react';

import { useSmoothScrollProgress } from '@/hooks';

// Smooth scroll progress bar using useSpring for 120fps updates without re-renders
export function ScrollProgressBar() {
  const { smoothProgress } = useSmoothScrollProgress();

  return (
    <Box
      component={motion.div}
      style={{
        scaleX: smoothProgress,
        transformOrigin: '0%',
      }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'primary.main',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
