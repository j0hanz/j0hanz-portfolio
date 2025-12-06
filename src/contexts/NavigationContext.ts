import { createContext } from 'react';

import type { NavigationActions, NavigationState } from '@/config/types';

// Standardized to null for consistency with other contexts
export const NavigationStateContext = createContext<NavigationState | null>(
  null
);

export const NavigationActionsContext = createContext<NavigationActions | null>(
  null
);
