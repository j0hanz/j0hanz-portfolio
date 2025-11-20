import React from 'react';

import { Box, Stack } from '@mui/material';
import { motion } from 'motion/react';

import { useAnimationConfig } from '@/hooks';

// Component for displaying a loading spinner
function Spinner(): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const spinnerTransition = getTransition('smooth', {
    duration: 1.25,
    repeat: Infinity,
    ease: 'linear',
  });

  return (
    <Stack
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '60vh',
      }}
    >
      <Box
        component={motion.div}
        aria-hidden
        initial={false}
        animate={
          prefersReducedMotion
            ? { opacity: 0.7 }
            : { rotate: 360, scale: [1, 1.08, 1] }
        }
        transition={prefersReducedMotion ? undefined : spinnerTransition}
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.2)',
          borderTopColor: 'primary.main',
          position: 'relative',
          filter: 'drop-shadow(0 8px 20px rgba(15, 23, 42, 0.25))',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 10,
            borderRadius: '50%',
            border: '2px solid',
            borderColor: 'rgba(255,255,255,0.15)',
          },
        }}
      />
    </Stack>
  );
}

export default Spinner;
