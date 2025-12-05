import { AnimatePresence } from 'motion/react';

import ModalCv from '@/components/ModalCv';
import type { CvModalProviderProps } from '@/config/types';
import {
  CvModalActionsContext,
  CvModalStateContext,
} from '@/contexts/CvModalContext';
import { useEventCallback, useToggle } from '@/hooks';

// Centralized CV modal state management
// Eliminates duplicate useModal(false) calls in Hero, NavBar, and Footer
export function CvModalProvider({
  children,
}: CvModalProviderProps): React.JSX.Element {
  const {
    value: isCvModalOpen,
    setTrue: openModal,
    setFalse: closeModal,
  } = useToggle(false);

  // Wrap with useEventCallback for stable references
  const openCvModal = useEventCallback(() => openModal());
  const closeCvModal = useEventCallback(() => closeModal());

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
