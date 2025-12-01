import { use } from 'react';

import {
  CvModalActions,
  CvModalActionsContext,
  CvModalState,
  CvModalStateContext,
} from '@/contexts/CvModalContext';

// Read-only state hook - won't re-render when actions change
export function useCvModalState(): CvModalState {
  const context = use(CvModalStateContext);
  if (!context) {
    throw new Error('useCvModalState must be used within CvModalProvider');
  }
  return context;
}

// Actions-only hook - won't re-render when state changes
export function useCvModalActions(): CvModalActions {
  const context = use(CvModalActionsContext);
  if (!context) {
    throw new Error('useCvModalActions must be used within CvModalProvider');
  }
  return context;
}
