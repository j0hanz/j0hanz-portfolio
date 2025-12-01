import { ReactNode, useReducer } from 'react';

import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
  type SxProps,
  type Theme,
} from '@mui/material';

import { UI_TIMING } from '@/config/constants';
import { SnackbarContext } from '@/contexts/SnackbarContext';
import { useEventCallback } from '@/hooks';

// Styles extracted as constants for reusability
const SNACKBAR_SX: SxProps<Theme> = { mt: { xs: 8, sm: 9 } };
const ALERT_SX: SxProps<Theme> = { width: '100%', boxShadow: 3 };

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number | null;
}

type SnackbarAction =
  | { type: 'SHOW'; payload: Omit<SnackbarState, 'open'> }
  | { type: 'CLOSE' };

const INITIAL_STATE: SnackbarState = {
  open: false,
  message: '',
  severity: 'info',
  duration: UI_TIMING.SNACKBAR_DURATION_DEFAULT,
};

const snackbarReducer = (
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState =>
  action.type === 'CLOSE'
    ? { ...state, open: false }
    : { open: true, ...action.payload };

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(snackbarReducer, INITIAL_STATE);

  const showSnackbar = useEventCallback(
    (
      message: string,
      severity: AlertColor = 'info',
      duration: number | null = UI_TIMING.SNACKBAR_DURATION_DEFAULT
    ) => dispatch({ type: 'SHOW', payload: { message, severity, duration } })
  );

  const closeSnackbar = useEventCallback(() => dispatch({ type: 'CLOSE' }));

  const handleClose = useEventCallback(
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason !== 'clickaway') closeSnackbar();
    }
  );

  return (
    <SnackbarContext value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={state.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={SNACKBAR_SX}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={ALERT_SX}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext>
  );
}
