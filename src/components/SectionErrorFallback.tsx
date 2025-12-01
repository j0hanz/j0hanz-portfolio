import { Box, Typography } from '@mui/material';

import { centeredFullViewportSx } from '@/styles/shared';

// Fallback for section-level errors - prevents app from breaking
export function SectionErrorFallback() {
  return (
    <Box sx={{ ...centeredFullViewportSx, height: '100vh' }}>
      <Typography variant="body1" color="text.secondary">
        This section failed to load. Please try refreshing the page.
      </Typography>
    </Box>
  );
}
