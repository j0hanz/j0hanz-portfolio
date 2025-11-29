import { useContext } from 'react';

import {
  CvModalActions,
  CvModalActionsContext,
  CvModalState,
  CvModalStateContext,
} from '@/contexts/CvModalContext';

// Read-only state hook - won't re-render when actions change
export function useCvModalState(): CvModalState {
  const context = useContext(CvModalStateContext);
  if (!context) {
    throw new Error('useCvModalState must be used within CvModalProvider');
  }
  return context;
}

// Actions-only hook - won't re-render when state changes
export function useCvModalActions(): CvModalActions {
  const context = useContext(CvModalActionsContext);
  if (!context) {
    throw new Error('useCvModalActions must be used within CvModalProvider');
  }
  return context;
}
