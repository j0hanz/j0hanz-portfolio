import type { CvModalActions, CvModalState } from '@/config/types';
import {
  CvModalActionsContext,
  CvModalStateContext,
} from '@/contexts/CvModalContext';
import { createSplitContextHooks } from '@/utils/context';

// Split context hooks - state and actions separated for render optimization
export const [useCvModalState, useCvModalActions] = createSplitContextHooks<
  CvModalState,
  CvModalActions
>(
  { state: CvModalStateContext, actions: CvModalActionsContext },
  'CvModal',
  'CvModalProvider'
);
