import { useToggle } from './useToggle';

// Reusable modal state management hook with semantic naming
export function useModal(initialState = false) {
  const { value: isOpen, open, close } = useToggle(initialState);

  return {
    isOpen,
    open,
    close,
  };
}

export default useModal;
