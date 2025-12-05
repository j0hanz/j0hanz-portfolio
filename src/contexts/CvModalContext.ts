import { createContext } from 'react';

import type { CvModalActions, CvModalState } from '@/config/types';

// Split context for render optimization - components only subscribing to state won't re-render when actions change
export const CvModalStateContext = createContext<CvModalState | null>(null);
export const CvModalActionsContext = createContext<CvModalActions | null>(null);
