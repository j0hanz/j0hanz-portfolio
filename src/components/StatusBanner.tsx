import React from 'react';

import { Alert, Box, Collapse } from '@mui/material';

import type { StatusBannerProps } from '@/config/types';

export default function StatusBanner({
  statusBanner,
}: StatusBannerProps): React.JSX.Element {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <Collapse in={Boolean(statusBanner)} timeout={240} unmountOnExit>
        {statusBanner && (
          <Alert
            severity={statusBanner.severity}
            icon={false}
            sx={{
              borderRadius: 0,
              textAlign: 'center',
              fontSize: '0.85rem',
              letterSpacing: 0.5,
              py: 1,
            }}
          >
            {statusBanner.message}
          </Alert>
        )}
      </Collapse>
    </Box>
  );
}
