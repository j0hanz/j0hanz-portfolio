import { createContext } from 'react';

import type {
  NavigationActions,
  NavigationContextType,
  NavigationState,
} from '@/config/types';

export type { NavigationContextType };

export const NavigationStateContext = createContext<
  NavigationState | undefined
>(undefined);

export const NavigationActionsContext = createContext<
  NavigationActions | undefined
>(undefined);
