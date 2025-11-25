import { createContext } from 'react';

import type { SnackbarContextType } from '@/config/types';

export type { SnackbarOptions, SnackbarContextType } from '@/config/types';

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);
