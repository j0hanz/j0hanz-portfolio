import { useState } from 'react';

import { InitialToggleState, UseToggleReturn } from '@/config/types';

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
    typeof initialState === 'function'
      ? (initialState as () => boolean)()
      : initialState
  );

  const toggle = (nextValue?: boolean) => {
    setValue((prev) => (typeof nextValue === 'boolean' ? nextValue : !prev));
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return { value, toggle, setTrue, setFalse };
}

export default useToggle;
