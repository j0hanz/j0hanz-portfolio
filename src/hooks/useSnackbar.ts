import { useContext } from 'react';

import {
  SnackbarContext,
  SnackbarContextType,
} from '@/contexts/SnackbarContext';

export function useSnackbar(): SnackbarContextType {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}

export default useSnackbar;
