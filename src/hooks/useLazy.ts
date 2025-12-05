import { useState } from 'react';

import type { UseLazyReturn } from '@/config/types';

// Lazily computes expensive value once (with manual refresh option)
export function useLazy<T>(init: () => T): UseLazyReturn<T> {
  const [value, setValue] = useState(init);
  return { value, refresh: () => setValue(init()) };
}

export default useLazy;
