import type { UseModalReturn } from '@/config/types';

import { useToggle } from './useToggle';

// Reusable modal state management hook with semantic naming
export function useModal(initialState = false): UseModalReturn {
  const {
    value: isOpen,
    setTrue: open,
    setFalse: close,
  } = useToggle(initialState);
  return { isOpen, open, close };
}

export default useModal;
