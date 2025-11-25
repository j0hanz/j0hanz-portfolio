import { createContext } from 'react';

import type { ThemeModeActions, ThemeModeState } from '@/config/types';

export type {
  ThemeModeActions,
  ThemeModeState,
  ThemeModeUpdater,
} from '@/config/types';

// Split context for render optimization - components that only read mode won't re-render on action changes
export const ThemeModeStateContext = createContext<ThemeModeState | null>(null);
export const ThemeModeActionsContext = createContext<ThemeModeActions | null>(
  null
);
