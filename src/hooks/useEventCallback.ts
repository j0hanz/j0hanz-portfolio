import { useEffectEvent } from 'react';

export function useEventCallback<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(fn: T): T {
  return useEffectEvent(fn) as T;
}
