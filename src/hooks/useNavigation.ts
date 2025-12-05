import type { NavigationActions, NavigationState } from '@/config/types';
import {
  NavigationActionsContext,
  NavigationStateContext,
} from '@/contexts/NavigationContext';
import { createSplitContextHooks } from '@/utils/context';

// Split context hooks - state and actions separated for render optimization
export const [useNavigationState, useNavigationActions] =
  createSplitContextHooks<NavigationState, NavigationActions>(
    { state: NavigationStateContext, actions: NavigationActionsContext },
    'Navigation',
    'NavigationProvider'
  );
