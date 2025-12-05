import type {
  ThemeModeActions,
  ThemeModeState,
  ThemeModeValue,
} from '@/config/types';
import {
  ThemeModeActionsContext,
  ThemeModeStateContext,
} from '@/contexts/themeContext';
import { createSplitContextHooks } from '@/utils/context';

// Split context hooks - state and actions separated for render optimization
export const [useThemeModeState, useThemeModeActions] = createSplitContextHooks<
  ThemeModeState,
  ThemeModeActions
>(
  { state: ThemeModeStateContext, actions: ThemeModeActionsContext },
  'ThemeMode',
  'AppThemeProvider'
);

// Combined hook for backwards compatibility
export const useTheme = (): ThemeModeValue => {
  const state = useThemeModeState();
  const actions = useThemeModeActions();
  return { ...state, ...actions };
};
