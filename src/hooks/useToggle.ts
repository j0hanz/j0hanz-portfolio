import { useState } from 'react';

import type { UseToggleReturn } from '@/config/types';

import useEventCallback from './useEventCallback';

// Boolean state with toggle/setTrue/setFalse helpers (defaults to false)
export function useToggle(initialState: boolean | (() => boolean) = false) {
  const [value, setValue] = useState<boolean>(
    typeof initialState === 'function' ? initialState : () => initialState
  );

  const toggle = useEventCallback((nextValue?: boolean) => {
    setValue((prev) => (nextValue !== undefined ? nextValue : !prev));
  });

  const setTrue = useEventCallback(() => setValue(true));
  const setFalse = useEventCallback(() => setValue(false));

  return { value, toggle, setTrue, setFalse } satisfies UseToggleReturn;
}

export default useToggle;
