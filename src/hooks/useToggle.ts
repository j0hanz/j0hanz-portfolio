import { useState } from 'react';

import type { UseToggleReturn } from '@/config/types';

// Boolean state with toggle/setTrue/setFalse helpers (defaults to false)
export function useToggle(initialState: boolean | (() => boolean) = false) {
  const [value, setValue] = useState<boolean>(
    typeof initialState === 'function' ? initialState : () => initialState
  );

  // React Compiler auto-stabilizes these callbacks
  const toggle = (nextValue?: boolean) => {
    setValue((prev) => (nextValue !== undefined ? nextValue : !prev));
  };

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse } satisfies UseToggleReturn;
}

export default useToggle;
