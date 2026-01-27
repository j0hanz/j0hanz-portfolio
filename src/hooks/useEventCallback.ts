import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEventCallback<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(fn: T): T {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
}
