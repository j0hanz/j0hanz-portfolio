import { useEffect, useState } from 'react';

/**
 * Debounces a rapidly changing value by delaying updates until the specified
 * delay has elapsed since the last change.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
