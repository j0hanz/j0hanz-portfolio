import { useState } from 'react';

import { InitialToggleState, UseToggleReturn } from '@/config/types';
import useEventCallback from '@/hooks/useEventCallback';

// Boolean state with toggle/setTrue/setFalse/open/close helpers (defaults to false)
export function useToggle(initialState: InitialToggleState = false) {
  const [value, setValue] = useState<boolean>(() =>
    typeof initialState === 'function' ? initialState() : initialState
  );

  const toggle = useEventCallback((nextValue?: boolean) => {
    setValue((prev) => (typeof nextValue === 'boolean' ? nextValue : !prev));
  });

  const setTrue = useEventCallback(() => {
    setValue(true);
  });

  const setFalse = useEventCallback(() => {
    setValue(false);
  });

  const open = setTrue;
  const close = setFalse;

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    open,
    close,
  } satisfies UseToggleReturn;
}

export default useToggle;
