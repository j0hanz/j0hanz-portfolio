import React from 'react';

import { Box, Collapse, LinearProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

import type { GlobalLoaderProps } from '@/config/types';

export default function GlobalLoader({
  isLoading,
}: GlobalLoaderProps): React.JSX.Element {
  const isFetching = useIsFetching();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 2,
        height: 3,
      }}
    >
      <Collapse in={isFetching > 0 && !isLoading} timeout={200}>
        <LinearProgress
          color="primary"
          sx={{
            height: 3,
            '& .MuiLinearProgress-bar': {
              transition: 'transform 0.2s linear',
            },
          }}
        />
      </Collapse>
    </Box>
  );
}
