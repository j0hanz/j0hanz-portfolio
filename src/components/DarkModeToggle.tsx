import type { JSX } from 'react';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { SxProps } from '@mui/system';

import { useTheme } from '@/hooks';
import { TRANSITION_STANDARD } from '@/styles/shared';

const TOGGLE_ICON_SIZE = 24;

const toggleButtonSx: SxProps<Theme> = {
  color: 'primary.main',
  transition: TRANSITION_STANDARD,
  '&:hover': {
    backgroundColor: 'action.hover',
    transform: 'rotate(180deg)',
  },
};

const iconSx: SxProps<Theme> = {
  fontSize: TOGGLE_ICON_SIZE,
};

function DarkModeToggle(): JSX.Element {
  const { mode, toggleMode } = useTheme();

  const isDark = mode === 'dark';

  return (
    <Tooltip
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      arrow
    >
      <IconButton
        onClick={toggleMode}
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
        sx={toggleButtonSx}
      >
        {isDark ? <LightMode sx={iconSx} /> : <DarkMode sx={iconSx} />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;
