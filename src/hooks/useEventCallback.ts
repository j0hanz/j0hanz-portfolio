import { useLayoutEffect, useRef, useState } from 'react';

type AnyFunction = (...args: never[]) => unknown;

export function useEventCallback<T extends AnyFunction>(handler: T): T {
  const handlerRef = useRef<T>(handler);
  useLayoutEffect(() => {
    handlerRef.current = handler;
  });
  const [stableCallback] = useState(
    () => ((...args: Parameters<T>) => handlerRef.current(...args)) as T
  );

  return stableCallback;
}
