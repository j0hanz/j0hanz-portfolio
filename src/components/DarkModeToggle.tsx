import type { JSX } from 'react';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { Box, type SxProps, type Theme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { AnimatePresence, m } from 'motion/react';

import { transitions } from '@/config/motion';
import {
  useAnimationConfig,
  useThemeModeActions,
  useThemeModeState,
} from '@/hooks';

const iconButtonSx: SxProps<Theme> = {
  '&:hover': { bgcolor: 'transparent' },
};

const iconWrapperSx: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function DarkModeToggle(): JSX.Element {
  const { mode } = useThemeModeState();
  const { toggleMode } = useThemeModeActions();
  const { prefersReducedMotion } = useAnimationConfig();

  const isDark = mode === 'dark';

  // Motion props respecting reduced motion preference
  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.15 },
        whileTap: { scale: 0.9 },
        transition: transitions.springSnappy,
      };

  // Icon transition animation
  const iconVariants = {
    initial: { rotate: -90, opacity: 0, scale: 0.5 },
    animate: { rotate: 0, opacity: 1, scale: 1 },
    exit: { rotate: 90, opacity: 0, scale: 0.5 },
  };

  return (
    <Tooltip
      title={isDark ? 'Light mode' : 'Dark mode'}
      placement="bottom"
      enterDelay={300}
      arrow
      slots={{ transition: Zoom }}
    >
      <IconButton
        onClick={toggleMode}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={isDark}
        size="small"
        sx={iconButtonSx}
      >
        <Box component={m.span} {...motionProps} sx={iconWrapperSx}>
          <AnimatePresence mode="wait" initial={false}>
            <Box
              component={m.span}
              key={mode}
              variants={prefersReducedMotion ? undefined : iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transitions.springSnappy}
              sx={iconWrapperSx}
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </Box>
          </AnimatePresence>
        </Box>
      </IconButton>
    </Tooltip>
  );
}

export { DarkModeToggle };
