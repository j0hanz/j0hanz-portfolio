import { createContext } from 'react';

export interface CvModalActions {
  openCvModal: () => void;
  closeCvModal: () => void;
}

export interface CvModalState {
  isCvModalOpen: boolean;
}

// Split context for render optimization - components only subscribing to state won't re-render when actions change
export const CvModalStateContext = createContext<CvModalState | null>(null);
export const CvModalActionsContext = createContext<CvModalActions | null>(null);
