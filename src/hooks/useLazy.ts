import { useState } from 'react';

import { UseLazyReturn } from '@/config/types';

import useEventCallback from './useEventCallback';

// Lazily computes expensive value once (with manual refresh option)
export function useLazy<T>(initializer: () => T): UseLazyReturn<T> {
  const [value, setValue] = useState<T>(() => initializer());

  // useEventCallback captures latest initializer without effect synchronization
  const refresh = useEventCallback(() => {
    setValue(initializer());
  });

  return { value, refresh };
}

export default useLazy;
