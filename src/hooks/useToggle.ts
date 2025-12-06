import { useState } from 'react';

import type { UseToggleReturn } from '@/config/types';

// Boolean state with toggle/setTrue/setFalse helpers
export function useToggle(
  initial: boolean | (() => boolean) = false
): UseToggleReturn {
  const [value, setValue] = useState(initial);

  return {
    value,
    toggle: (next?: boolean) => setValue((prev) => next ?? !prev),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
  };
}
