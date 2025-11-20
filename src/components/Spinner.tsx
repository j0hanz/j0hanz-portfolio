import React from 'react';

import { CircularProgress, Stack } from '@mui/material';

// Component for displaying a loading spinner
function Spinner(): React.JSX.Element {
  return (
    <Stack
      role="status"
      aria-live="polite"
      aria-label="Loading content"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '60vh',
      }}
    >
      <CircularProgress size={60} thickness={4} aria-label="Loading" />
    </Stack>
  );
}

export default Spinner;
