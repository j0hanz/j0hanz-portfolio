import { createContext } from 'react';

import type { SnackbarContextType } from '@/config/types';

export type { SnackbarOptions, SnackbarContextType } from '@/config/types';

// Standardized to null for consistency with other contexts
export const SnackbarContext = createContext<SnackbarContextType | null>(null);
