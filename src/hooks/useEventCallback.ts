import { useCallback, useInsertionEffect, useRef } from 'react';

// Creates stable callback ref with latest values (avoids useCallback dependency hell)
function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R {
  const ref = useRef<(...args: Args) => R>(fn);

  // useInsertionEffect fires before DOM mutations, ideal for ref updates
  useInsertionEffect(() => {
    ref.current = fn;
  });

  // Return a stable callback reference that calls the latest function
  return useCallback((...args: Args) => {
    return ref.current(...args);
  }, []);
}

export default useEventCallback;
