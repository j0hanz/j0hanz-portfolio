import { alpha, Box, Stack, type SxProps, type Theme } from '@mui/material';
import { motion } from 'motion/react';

import { useAnimationConfig } from '@/hooks';

const stackSx: SxProps<Theme> = {
  height: '60vh',
};

const spinnerSx: SxProps<Theme> = {
  width: 120,
  height: 120,
  borderRadius: '50%',
  borderWidth: 3,
  borderStyle: 'solid',
  borderColor: (theme) => alpha(theme.palette.common.white, 0.2),
  borderTopColor: 'primary.main',
  position: 'relative',
  filter: (theme) =>
    `drop-shadow(0 8px 20px ${alpha(theme.palette.common.black, 0.25)})`,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 10,
    borderRadius: '50%',
    border: '2px solid',
    borderColor: (theme) => alpha(theme.palette.common.white, 0.15),
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
            ? { opacity: 0.7 }
            : { rotate: 360, scale: [1, 1.08, 1] }
        }
        transition={prefersReducedMotion ? undefined : spinnerTransition}
        sx={spinnerSx}
      />
    </Stack>
  );
}

export default Spinner;
