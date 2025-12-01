import { use } from 'react';

import type { NavigationActions, NavigationState } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';

// Full state hook - subscribes to all navigation state changes
export function useNavigationState(): NavigationState {
  const context = use(NavigationStateContext);
  if (!context) {
    throw new Error(
      'useNavigationState must be used within a NavigationProvider'
    );
  }
  return context;
}

// Actions-only hook - never causes re-renders on state changes
export function useNavigationActions(): NavigationActions {
  const context = use(NavigationActionsContext);
  if (!context) {
    throw new Error(
      'useNavigationActions must be used within a NavigationProvider'
    );
  }
  return context;
}
