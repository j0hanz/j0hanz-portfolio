import { ReactNode, useReducer, useRef, useTransition } from 'react';

import {
  Alert,
  AlertColor,
  Snackbar,
  SnackbarCloseReason,
  type SxProps,
  type Theme,
} from '@mui/material';

import { UI_TIMING } from '@/config/constants';
import type {
  SnackbarAction,
  SnackbarActions,
  SnackbarReducerState,
} from '@/config/types';
import {
  SnackbarActionsContext,
  SnackbarStateContext,
} from '@/contexts/SnackbarContext';
import { useEventCallback } from '@/hooks';

// Styles extracted as constants for reusability
const SNACKBAR_SX: SxProps<Theme> = { mt: { xs: 8, sm: 9 } };
const ALERT_SX: SxProps<Theme> = { width: 1, boxShadow: 3 };

const INITIAL_STATE: SnackbarReducerState = {
  open: false,
  message: '',
  severity: 'info',
  duration: UI_TIMING.SNACKBAR_DURATION_DEFAULT,
};

const snackbarReducer = (
  state: SnackbarReducerState,
  action: SnackbarAction
): SnackbarReducerState =>
  action.type === 'CLOSE'
    ? { ...state, open: false }
    : { open: true, ...action.payload };

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [, startTransition] = useTransition();
  const [state, dispatch] = useReducer(snackbarReducer, INITIAL_STATE);

  // Wrap snackbar updates in transition for non-blocking notifications
  const showSnackbar = useEventCallback(
    (
      message: string,
      severity: AlertColor = 'info',
      duration: number | null = UI_TIMING.SNACKBAR_DURATION_DEFAULT
    ) => {
      startTransition(() => {
        dispatch({ type: 'SHOW', payload: { message, severity, duration } });
      });
    }
  );

  const closeSnackbar = useEventCallback(() => {
    startTransition(() => dispatch({ type: 'CLOSE' }));
  });

  const handleClose = useEventCallback(
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason !== 'clickaway') closeSnackbar();
    }
  );

  // Split context values for render optimization
  const stateValue = {
    open: state.open,
    message: state.message,
    severity: state.severity,
  };
  const actionsRef = useRef<SnackbarActions | null>(null);
  if (!actionsRef.current) {
    actionsRef.current = { showSnackbar, closeSnackbar };
  } else {
    actionsRef.current.showSnackbar = showSnackbar;
    actionsRef.current.closeSnackbar = closeSnackbar;
  }
  const actionsValue = actionsRef.current as SnackbarActions;

  return (
    <SnackbarActionsContext value={actionsValue}>
      <SnackbarStateContext value={stateValue}>
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
      </SnackbarStateContext>
    </SnackbarActionsContext>
  );
}
