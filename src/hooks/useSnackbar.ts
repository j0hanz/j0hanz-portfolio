import { use } from 'react';

import type {
  SnackbarActions,
  SnackbarContextType,
  SnackbarState,
} from '@/config/types';
import {
  SnackbarActionsContext,
  SnackbarStateContext,
} from '@/contexts/SnackbarContext';

// Read-only state hook - won't re-render when actions change
export function useSnackbarState(): SnackbarState {
  const context = use(SnackbarStateContext);
  if (!context) {
    throw new Error('useSnackbarState must be used within SnackbarProvider');
  }
  return context;
}

// Actions-only hook - won't re-render when state changes
export function useSnackbarActions(): SnackbarActions {
  const context = use(SnackbarActionsContext);
  if (!context) {
    throw new Error('useSnackbarActions must be used within SnackbarProvider');
  }
  return context;
}

// Combined hook for backwards compatibility
export function useSnackbar(): SnackbarContextType {
  const state = useSnackbarState();
  const actions = useSnackbarActions();
  return { ...state, ...actions };
}

export default useSnackbar;
