import React from 'react';

import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import { Theme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { SxProps } from '@mui/system';

import { useTheme } from '@/hooks';

const toggleButtonSx: SxProps<Theme> = {
  color: 'primary.main',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'action.hover',
    transform: 'rotate(180deg)',
  },
};

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
        sx={toggleButtonSx}
      >
        {isDark ? (
          <LightMode sx={{ fontSize: 24 }} />
        ) : (
          <DarkMode sx={{ fontSize: 24 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;
