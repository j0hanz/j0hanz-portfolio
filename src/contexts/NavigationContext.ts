import { createContext } from 'react';

import type { Direction, NavigationContextType } from '@/config/types';

export type { Direction, NavigationContextType };

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);
