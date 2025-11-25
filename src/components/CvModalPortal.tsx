import { AnimatePresence } from 'motion/react';

import ModalCv from '@/components/ModalCv';

interface CvModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reusable CV modal portal with AnimatePresence wrapper
// Eliminates duplicate AnimatePresence + ModalCv pattern across components
function CvModalPortal({
  isOpen,
  onClose,
}: CvModalPortalProps): React.JSX.Element {
  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && <ModalCv show={isOpen} handleClose={onClose} />}
    </AnimatePresence>
  );
}

export default CvModalPortal;
