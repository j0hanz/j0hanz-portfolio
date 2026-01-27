import { useEffect, useRef, useSyncExternalStore } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, Fab, Fade, type SxProps, type Theme } from '@mui/material';
import { m, useSpring } from 'motion/react';

import { SCROLL_CONFIG } from '@/config/constants';
import type { Direction } from '@/config/types';
import {
  useAnimationConfig,
  useMenuState,
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
  color: 'text.primary',
  border: 1,
  borderColor: 'divider',
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

const iconSx: SxProps<Theme> = {
  fontSize: SIZING.iconFab,
  color: 'primary.main',
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

let wheelDirection: Direction = null;
const listeners = new Set<() => void>();

function subscribeToWheelDirection(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getWheelDirectionSnapshot(): Direction {
  return wheelDirection;
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function useWheelDirection(activeSectionIndex: number): Direction {
  const isTransitioningRef = useRef(false);
  const currentDir = useSyncExternalStore(
    subscribeToWheelDirection,
    getWheelDirectionSnapshot,
    getWheelDirectionSnapshot
  );

  useEffect(() => {
    wheelDirection = null;
    isTransitioningRef.current = true;
    notifyListeners();

    const transitionTimeout = setTimeout(() => {
      isTransitioningRef.current = false;
    }, SCROLL_CONFIG.LOCK_DURATION_MS);

    const onWheel = (e: WheelEvent): void => {
      if (isTransitioningRef.current) return;
      if (Math.abs(e.deltaY) < SCROLL_CONFIG.WHEEL_THRESHOLD_PX) return;

      const dir: Direction = e.deltaY < 0 ? 'up' : 'down';
      if (dir !== wheelDirection) {
        wheelDirection = dir;
        notifyListeners();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      clearTimeout(transitionTimeout);
      window.removeEventListener('wheel', onWheel);
    };
  }, [activeSectionIndex]);

  return currentDir;
}

function ScrollToTop(): React.JSX.Element {
  const { activeSectionIndex, isPending, totalSections, isLast } =
    useNavigationState();
  const { navigateTo } = useNavigationActions();
  const { isMenuOpen } = useMenuState();
  const { prefersReducedMotion } = useAnimationConfig();
  const wheelDir = useWheelDirection(activeSectionIndex);
  const show =
    activeSectionIndex > 0 && !isMenuOpen && !isLast && wheelDir === 'up';

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
            <m.circle
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

export { ScrollToTop };
