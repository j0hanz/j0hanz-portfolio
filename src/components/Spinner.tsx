import React from 'react';

import { Box, CircularProgress } from '@mui/material';

// Component for displaying a loading spinner
function Spinner(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}

export default Spinner;
