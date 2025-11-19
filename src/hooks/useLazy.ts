import { useCallback, useEffect, useRef, useState } from 'react';

import { UseLazyReturn } from '@/config/types';

/**
 * Lazily evaluates an expensive computation only once until a manual refresh is requested.
 *
 * @param initializer - Function that produces the memoized value
 * @returns Latest cached value plus a refresh function to recompute on demand
 */
export function useLazy<T>(initializer: () => T): UseLazyReturn<T> {
  const initializerRef = useRef(initializer);

  useEffect(() => {
    initializerRef.current = initializer;
  }, [initializer]);

  const [value, setValue] = useState<T>(() => initializer());

  const refresh = useCallback(() => {
    setValue(initializerRef.current());
  }, []);

  return { value, refresh };
}

export default useLazy;
