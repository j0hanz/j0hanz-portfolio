import { useEffect, useRef, useSyncExternalStore } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, Fab, Fade, type SxProps, type Theme } from '@mui/material';

import { SCROLL_CONFIG } from '@/config/constants';
import type { Direction } from '@/config/types';
import {
  useMenuState,
  useNavigationActions,
  useNavigationState,
} from '@/hooks';
import { SIZING } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  position: 'fixed',
  bottom: (theme) => theme.spacing(3),
  right: (theme) => theme.spacing(3),
  zIndex: 'tooltip',
};

const fabSx: SxProps<Theme> = {
  bgcolor: 'divider',
  borderRadius: 1,
  '&:hover': {
    backgroundColor: 'action.hover',
  },
};

const iconSx: SxProps<Theme> = {
  fontSize: SIZING.iconFab,
  color: 'text.primary',
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
  const { activeSectionIndex, isPending, isLast } = useNavigationState();
  const { navigateTo } = useNavigationActions();
  const { isMenuOpen } = useMenuState();
  const wheelDir = useWheelDirection(activeSectionIndex);
  const show =
    activeSectionIndex > 0 && !isMenuOpen && !isLast && wheelDir === 'up';

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
        </Fab>
      </Box>
    </Fade>
  );
}

export { ScrollToTop };
