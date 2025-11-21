import { createContext } from 'react';

import { AlertColor } from '@mui/material';

export interface SnackbarOptions {
  message: string;
  severity?: AlertColor;
  duration?: number | null; // null for persistent
}

export interface SnackbarContextType {
  showSnackbar: (
    message: string,
    severity?: AlertColor,
    duration?: number | null
  ) => void;
  closeSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);
