import { useContext } from 'react';

import type {
  NavigationActions,
  NavigationContextType,
  NavigationState,
} from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';

export function useNavigationState(): NavigationState {
  const context = useContext(NavigationStateContext);
  if (context === undefined) {
    throw new Error(
      'useNavigationState must be used within a NavigationProvider'
    );
  }
  return context;
}

export function useNavigationActions(): NavigationActions {
  const context = useContext(NavigationActionsContext);
  if (context === undefined) {
    throw new Error(
      'useNavigationActions must be used within a NavigationProvider'
    );
  }
  return context;
}

export function useNavigation(): NavigationContextType {
  const state = useNavigationState();
  const actions = useNavigationActions();
  return { ...state, ...actions };
}
