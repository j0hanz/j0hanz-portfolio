import { useTransition } from 'react';

import { AnimatePresence } from 'motion/react';

import { ModalCv } from '@/components/ModalCv';
import type { CvModalActions, CvModalProviderProps } from '@/config/types';
import {
  CvModalActionsContext,
  CvModalStateContext,
} from '@/contexts/CvModalContext';
import { useEventCallback, useToggle } from '@/hooks';

// Centralized CV modal state management
export function CvModalProvider({
  children,
}: Readonly<CvModalProviderProps>): React.JSX.Element {
  const [isPending, startTransition] = useTransition();
  const { value: isCvModalOpen, setTrue, setFalse } = useToggle(false);

  // Wrap modal transitions for non-blocking updates
  const openCvModal = useEventCallback(() => {
    startTransition(() => setTrue());
  });

  const closeCvModal = useEventCallback(() => {
    startTransition(() => setFalse());
  });

  const stateValue = { isCvModalOpen, isPending };
  const actionsValue: CvModalActions = { openCvModal, closeCvModal };

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
