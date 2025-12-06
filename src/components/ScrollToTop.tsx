import { useEffect } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, Fab, Fade, type SxProps, type Theme } from '@mui/material';
import { motion, useSpring } from 'motion/react';

import {
  useAnimationConfig,
  useNavigationActions,
  useNavigationState,
} from '@/hooks';
import { SIZING } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  position: 'fixed',
  bottom: (theme) => theme.spacing(2.5),
  right: (theme) => theme.spacing(1),
  zIndex: 'tooltip',
};

const fabSx: SxProps<Theme> = {
  backgroundColor: 'backdrop.glass',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

const iconSx: SxProps<Theme> = {
  fontSize: SIZING.iconFab,
};

// Progress ring wraps FAB (40px small size + 8px padding for stroke)
const PROGRESS_RING_SIZE = 48;
const PROGRESS_RING_OFFSET = -4;

const progressRingSx: SxProps<Theme> = {
  position: 'absolute',
  top: PROGRESS_RING_OFFSET,
  left: PROGRESS_RING_OFFSET,
  width: PROGRESS_RING_SIZE,
  height: PROGRESS_RING_SIZE,
  pointerEvents: 'none',
  color: 'primary.main',
};

function ScrollToTop(): React.JSX.Element {
  const { activeSectionIndex, isPending, totalSections } = useNavigationState();
  const { navigateTo } = useNavigationActions();
  const { prefersReducedMotion } = useAnimationConfig();
  const show = activeSectionIndex > 0;

  // Calculate progress based on section position (0 to 1)
  const clampedTotal = totalSections > 0 ? totalSections : 1;
  const sectionProgress =
    clampedTotal > 1 ? activeSectionIndex / (clampedTotal - 1) : 0;

  // Use spring for smooth progress animation
  const springProgress = useSpring(sectionProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update spring value when section changes
  useEffect(() => {
    if (prefersReducedMotion) return;
    springProgress.set(sectionProgress);
  }, [sectionProgress, springProgress, prefersReducedMotion]);

  const pathProgress = prefersReducedMotion ? sectionProgress : springProgress;

  const handleClick = (): void => {
    if (isPending) return;
    navigateTo('hero');
  };

  return (
    <Fade in={show}>
      <Box onClick={handleClick} role="presentation" sx={containerSx}>
        <Fab
          size="small"
          color="primary"
          aria-label="scroll back to top"
          disabled={isPending}
          sx={fabSx}
        >
          <ExpandLessIcon sx={iconSx} />
          {/* Circular progress indicator */}
          <Box
            component="svg"
            sx={progressRingSx}
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              opacity="0.2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              // Motion requires style prop for motion values (not sx)
              style={{
                pathLength: pathProgress,
                rotate: -90,
                transformOrigin: '50% 50%',
              }}
              strokeDasharray="0 1"
            />
          </Box>
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollToTop;
