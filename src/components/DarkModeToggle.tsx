import React from 'react';

import { HiMiniMoon, HiMiniSun } from 'react-icons/hi2';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useTheme } from '@/hooks/useTheme';

function DarkModeToggle(): React.JSX.Element {
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
        sx={{
          color: 'primary.main',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'action.hover',
            transform: 'rotate(180deg)',
          },
        }}
      >
        {isDark ? <HiMiniSun size={24} /> : <HiMiniMoon size={24} />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;
