import type {
  SnackbarActions,
  SnackbarContextType,
  SnackbarState,
} from '@/config/types';
import {
  SnackbarActionsContext,
  SnackbarStateContext,
} from '@/contexts/SnackbarContext';
import { createSplitContextHooks } from '@/utils/context';

// Split context hooks - state and actions separated for render optimization
export const [useSnackbarState, useSnackbarActions] = createSplitContextHooks<
  SnackbarState,
  SnackbarActions
>(
  { state: SnackbarStateContext, actions: SnackbarActionsContext },
  'Snackbar',
  'SnackbarProvider'
);

// Combined hook for backwards compatibility
export function useSnackbar(): SnackbarContextType {
  const state = useSnackbarState();
  const actions = useSnackbarActions();
  return { ...state, ...actions };
}

export default useSnackbar;
