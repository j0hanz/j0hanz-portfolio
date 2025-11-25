import React, { ReactNode, useState } from 'react';

import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
  type SxProps,
  type Theme,
} from '@mui/material';

import { SnackbarContext, SnackbarOptions } from '@/contexts/SnackbarContext';
import { useEventCallback } from '@/hooks';

const snackbarSx: SxProps<Theme> = {
  mt: { xs: 8, sm: 9 }, // Offset for navbar
};

const alertSx: SxProps<Theme> = {
  width: '100%',
  boxShadow: 3,
};

export function SnackbarProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<SnackbarOptions>({
    message: '',
    severity: 'info',
    duration: 3000,
  });

  const showSnackbar = useEventCallback(
    (
      message: string,
      severity: AlertColor = 'info',
      duration: number | null = 3000
    ) => {
      setConfig({ message, severity, duration });
      setOpen(true);
    }
  );

  const closeSnackbar = useEventCallback(() => {
    setOpen(false);
  });

  // Wrap with useEventCallback for stable reference in Snackbar onClose
  const handleClose = useEventCallback(
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    }
  );

  // React 19: Render context directly without .Provider
  return (
    <SnackbarContext value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={config.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={snackbarSx}
      >
        <Alert
          onClose={handleClose}
          severity={config.severity}
          variant="filled"
          sx={alertSx}
        >
          {config.message}
        </Alert>
      </Snackbar>
    </SnackbarContext>
  );
}
