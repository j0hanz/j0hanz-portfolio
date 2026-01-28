import { Box, Typography } from '@mui/material';

// Fallback for section-level errors - prevents app from breaking
export function SectionErrorFallback() {
  return (
    <Box sx={(theme) => theme.custom.layout.centeredFullViewport}>
      <Typography variant="body1" color="text.secondary">
        This section failed to load. Please try refreshing the page.
      </Typography>
    </Box>
  );
}
