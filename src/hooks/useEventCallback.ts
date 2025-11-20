import { useLayoutEffect, useRef } from 'react';

/**
 * Creates a stable callback reference that always has access to the latest values.
 * Useful for avoiding useCallback dependency hell while maintaining stable references.
 *
 * Use cases:
 * - Event handlers passed to memoized components that need fresh state/props
 * - Callbacks in useEffect with complex dependencies
 * - Event handlers with async operations that need current state
 *
 * @param fn - The callback function to stabilize
 * @returns A memoized callback with a stable reference
 *
 * @example
 * const handleClick = useEventCallback(() => {
 *   // console.log(currentState); // Always gets fresh state
 * });
 */
function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined
): ((...args: Args) => R) | undefined;

function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R
): (...args: Args) => R;

function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined
): ((...args: Args) => R) | undefined {
  const ref = useRef<((...args: Args) => R) | undefined>(fn);

  // Update ref to always point to the latest function
  useLayoutEffect(() => {
    ref.current = fn;
  });

  // Return a stable callback reference that calls the latest function
  return (...args: Args) => {
    const currentFn = ref.current;
    if (!currentFn) {
      throw new Error('Cannot call useEventCallback with undefined function');
    }
    return currentFn(...args);
  };
}

export default useEventCallback;
