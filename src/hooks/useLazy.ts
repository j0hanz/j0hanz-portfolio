import { useEffect, useRef, useState } from 'react';

import { UseLazyReturn } from '@/config/types';

// Lazily computes expensive value once (with manual refresh option)
export function useLazy<T>(initializer: () => T): UseLazyReturn<T> {
  const initializerRef = useRef(initializer);

  useEffect(() => {
    initializerRef.current = initializer;
  }, [initializer]);

  const [value, setValue] = useState<T>(() => initializer());

  const refresh = () => {
    setValue(initializerRef.current());
  };

  return { value, refresh };
}

export default useLazy;
