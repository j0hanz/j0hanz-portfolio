import { useContext } from 'react';

import type {
  ThemeModeActions,
  ThemeModeState,
  ThemeModeValue,
} from '@/config/types';
import {
  ThemeModeActionsContext,
  ThemeModeStateContext,
} from '@/contexts/themeContext';

// Read-only state hook - won't re-render when actions change
export function useThemeModeState(): ThemeModeState {
  const context = useContext(ThemeModeStateContext);
  if (!context) {
    throw new Error('useThemeModeState must be used within AppThemeProvider');
  }
  return context;
}

// Actions-only hook - won't re-render when state changes
export function useThemeModeActions(): ThemeModeActions {
  const context = useContext(ThemeModeActionsContext);
  if (!context) {
    throw new Error('useThemeModeActions must be used within AppThemeProvider');
  }
  return context;
}

// Combined hook for backwards compatibility
export const useTheme = (): ThemeModeValue => {
  const state = useThemeModeState();
  const actions = useThemeModeActions();
  return { ...state, ...actions };
};
