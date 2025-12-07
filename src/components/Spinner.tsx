import { alpha, Box, Stack, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import { useAnimationConfig } from '@/hooks';
import { SIZING } from '@/styles/shared';

const stackSx: SxProps<Theme> = {
  height: '60vh',
};

const spinnerSx: SxProps<Theme> = {
  width: SIZING.spinner,
  height: SIZING.spinner,
  borderRadius: '50%', // Circle shape - not a theme multiplier
  borderWidth: { xs: 2, sm: 3 },
  borderStyle: 'solid',
  borderColor: (theme) => alpha(theme.palette.divider, 0.4),
  borderTopColor: 'primary.main',
  position: 'relative',
  filter: (theme) =>
    `drop-shadow(0 8px 20px ${alpha(theme.palette.common.black, 0.15)})`,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: { xs: 6, sm: 8, md: 10 },
    borderRadius: '50%', // Circle shape
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: (theme) => alpha(theme.palette.divider, 0.3),
  },
};

// Component for displaying a loading spinner
function Spinner({ sx }: { sx?: SxProps<Theme> }): React.JSX.Element {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const spinnerTransition = getTransition('smooth', {
    duration: 1.15,
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
      sx={[
        ...(Array.isArray(stackSx) ? stackSx : [stackSx]),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component={motion.div}
        aria-hidden="true"
        initial={false}
        animate={
          prefersReducedMotion
            ? { opacity: [0.6, 0.9, 0.6] }
            : { rotate: 360, scale: [1, 1.08, 1] }
        }
        transition={
          prefersReducedMotion
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : spinnerTransition
        }
        sx={spinnerSx}
      />
    </Stack>
  );
}

export { Spinner };
