import type { JSX } from 'react';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

import { useThemeModeActions, useThemeModeState } from '@/hooks';

function DarkModeToggle(): JSX.Element {
  const { mode } = useThemeModeState();
  const { toggleMode } = useThemeModeActions();

  const isDark = mode === 'dark';

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
        sx={{
          '&:hover': { bgcolor: 'transparent' },
          '& svg': { transition: 'transform 0.2s, color 0.2s' },
          '&:hover svg': { transform: 'scale(1.15)', color: 'primary.main' },
        }}
      >
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;
