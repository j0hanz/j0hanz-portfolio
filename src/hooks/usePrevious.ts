import { useEffect, useState } from 'react';

/**
 * Returns the previous value of a given input after each render cycle.
 * Useful for comparing prop/state changes without storing extra component state.
 *
 * @template T Type of the tracked value
 * @param value - Current value to keep track of
 * @returns The previous value or `undefined` on the initial render
 */
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>(undefined);

  useEffect(() => {
    setPrevious(value);
  }, [value]);

  return previous;
}

export default usePrevious;
