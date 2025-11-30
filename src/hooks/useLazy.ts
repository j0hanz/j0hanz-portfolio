import { useState } from 'react';

import { UseLazyReturn } from '@/config/types';

// Lazily computes expensive value once (with manual refresh option)
export function useLazy<T>(initializer: () => T): UseLazyReturn<T> {
  const [value, setValue] = useState<T>(() => initializer());

  // React Compiler auto-stabilizes this callback
  const refresh = () => setValue(initializer());

  return { value, refresh };
}

export default useLazy;
