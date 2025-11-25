import { useToggle } from './useToggle';

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

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
