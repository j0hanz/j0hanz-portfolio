import type { JSX } from 'react';

import { Alert, Box, Collapse } from '@mui/material';

import type { StatusBannerProps } from '@/config/types';

export function StatusBanner({
  statusBanner,
}: Readonly<StatusBannerProps>): JSX.Element {
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
              fontSize: (theme) => theme.typography.caption.fontSize,
              letterSpacing: (theme) =>
                theme.custom.typography.letterSpacing.tight,
              py: { xs: 0.75, sm: 0.875, md: 1, lg: 1.25 },
            }}
          >
            {statusBanner.message}
          </Alert>
        )}
      </Collapse>
    </Box>
  );
}
