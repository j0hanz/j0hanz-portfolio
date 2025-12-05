import { createContext } from 'react';

import type { SnackbarActions, SnackbarState } from '@/config/types';

// Re-export types from config
export type {
  SnackbarOptions,
  SnackbarContextType,
  SnackbarState,
  SnackbarActions,
} from '@/config/types';

// Split contexts for render optimization - components only needing to show snackbars
// won't re-render when snackbar state changes
export const SnackbarStateContext = createContext<SnackbarState | null>(null);
export const SnackbarActionsContext = createContext<SnackbarActions | null>(
  null
);
