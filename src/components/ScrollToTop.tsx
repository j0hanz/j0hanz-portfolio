import { useEffect } from 'react';

import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { Box, Fab, Fade, type SxProps, type Theme } from '@mui/material';
import { motion, useSpring } from 'motion/react';

import {
  useAnimationConfig,
  useNavigationActions,
  useNavigationState,
} from '@/hooks';

const containerSx: SxProps<Theme> = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 100,
};

const iconSx: SxProps<Theme> = {
  fontSize: 20,
};

const progressRingSx: SxProps<Theme> = {
  position: 'absolute',
  top: -4,
  left: -4,
  width: 48,
  height: 48,
  pointerEvents: 'none',
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
          sx={{ position: 'relative' }}
        >
          <KeyboardArrowUpRounded sx={iconSx} />
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
              strokeWidth="2"
              opacity="0.2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
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
