import { use } from 'react';

import {
  SnackbarContext,
  SnackbarContextType,
} from '@/contexts/SnackbarContext';

export function useSnackbar(): SnackbarContextType {
  const context = use(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}

export default useSnackbar;
