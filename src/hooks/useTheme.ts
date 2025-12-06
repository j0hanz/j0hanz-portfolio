import type { ThemeModeActions, ThemeModeState } from '@/config/types';
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
