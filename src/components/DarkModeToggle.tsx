import React from 'react';

import { DarkMode, LightMode } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useTheme } from '@/hooks';

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
