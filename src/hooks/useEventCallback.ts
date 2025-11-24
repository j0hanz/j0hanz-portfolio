import { useCallback, useInsertionEffect, useRef } from 'react';

// Creates stable callback ref with latest values (React 19 useEffectEvent polyfill)
// Note: useCallback here is required for stable reference - this is an exception to the
// "no manual memoization" rule because it's implementing useEffectEvent behavior
function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R {
  const ref = useRef<(...args: Args) => R>(fn);

  // useInsertionEffect fires before DOM mutations, ideal for ref updates
  useInsertionEffect(() => {
    ref.current = fn;
  });

  // Return a stable callback reference that calls the latest function
  // This useCallback is intentional and necessary for the polyfill
  return useCallback((...args: Args) => {
    return ref.current(...args);
  }, []);
}

export default useEventCallback;
