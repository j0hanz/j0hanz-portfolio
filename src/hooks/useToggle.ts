import { useState } from 'react';

import { InitialToggleState, UseToggleReturn } from '@/config/types';
import useEventCallback from '@/hooks/useEventCallback';

/**
 * Boolean state helper that provides ergonomic helpers for toggling UI flags.
 *
 * @param initialState - Optional initial value or initializer function (defaults to `false`)
 * @returns Current boolean value alongside toggle/setters
 */
export function useToggle(
  initialState: InitialToggleState = false
): UseToggleReturn {
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

  return { value, toggle, setTrue, setFalse };
}

export default useToggle;
