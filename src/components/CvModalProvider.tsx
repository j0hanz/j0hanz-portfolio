import { lazy, Suspense, useTransition } from 'react';

import { AnimatePresence } from 'motion/react';

import type { CvModalActions, CvModalProviderProps } from '@/config/types';
import {
  CvModalActionsContext,
  CvModalStateContext,
} from '@/contexts/CvModalContext';
import { useEventCallback, useToggle } from '@/hooks';

const ModalCv = lazy(async () => {
  const module = await import('@/components/ModalCv');
  return { default: module.ModalCv };
});

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
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            {isCvModalOpen && (
              <ModalCv
                key="cv-modal"
                open={isCvModalOpen}
                onClose={closeCvModal}
              />
            )}
          </AnimatePresence>
        </Suspense>
      </CvModalStateContext>
    </CvModalActionsContext>
  );
}
