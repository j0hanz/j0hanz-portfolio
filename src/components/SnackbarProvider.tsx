import React, { ReactNode, useReducer } from 'react';

import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
  type SxProps,
  type Theme,
} from '@mui/material';

import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useEventCallback } from '@/hooks';

const snackbarSx: SxProps<Theme> = {
  mt: { xs: 8, sm: 9 }, // Offset for navbar
};

const alertSx: SxProps<Theme> = {
  width: '100%',
  boxShadow: 3,
};

type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number | null;
};

type SnackbarAction =
  | { type: 'SHOW'; payload: Omit<SnackbarState, 'open'> }
  | { type: 'CLOSE' };

const INITIAL_SNACKBAR_STATE: SnackbarState = {
  open: false,
  message: '',
  severity: 'info',
  duration: 3000,
};

function snackbarReducer(
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState {
  switch (action.type) {
    case 'SHOW':
      return { open: true, ...action.payload };
    case 'CLOSE':
      return { ...state, open: false };
    default:
      return state;
  }
}

export function SnackbarProvider({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element {
  const [snackbarState, dispatch] = useReducer(
    snackbarReducer,
    INITIAL_SNACKBAR_STATE
  );

  const showSnackbar = useEventCallback(
    (
      message: string,
      severity: AlertColor = 'info',
      duration: number | null = 3000
    ) => {
      dispatch({
        type: 'SHOW',
        payload: { message, severity, duration },
      });
    }
  );

  const closeSnackbar = useEventCallback(() => {
    dispatch({ type: 'CLOSE' });
  });

  // Wrap with useEventCallback for stable reference in Snackbar onClose
  const handleClose = useEventCallback(
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') return;
      dispatch({ type: 'CLOSE' });
    }
  );

  // React 19: Render context directly without .Provider
  return (
    <SnackbarContext value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={snackbarState.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={snackbarSx}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarState.severity}
          variant="filled"
          sx={alertSx}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext>
  );
}
