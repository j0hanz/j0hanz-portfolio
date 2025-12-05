import { AnimatePresence } from 'motion/react';

import ModalCv from '@/components/ModalCv';
import type { CvModalProviderProps } from '@/config/types';
import {
  CvModalActionsContext,
  CvModalStateContext,
} from '@/contexts/CvModalContext';
import { useToggle } from '@/hooks';

// Centralized CV modal state management
export function CvModalProvider({
  children,
}: CvModalProviderProps): React.JSX.Element {
  const {
    value: isCvModalOpen,
    setTrue: openCvModal,
    setFalse: closeCvModal,
  } = useToggle(false);

  const stateValue = { isCvModalOpen };
  const actionsValue = { openCvModal, closeCvModal };

  return (
    <CvModalActionsContext value={actionsValue}>
      <CvModalStateContext value={stateValue}>
        {children}
        <AnimatePresence initial={false} mode="wait">
          {isCvModalOpen && (
            <ModalCv open={isCvModalOpen} onClose={closeCvModal} />
          )}
        </AnimatePresence>
      </CvModalStateContext>
    </CvModalActionsContext>
  );
}
